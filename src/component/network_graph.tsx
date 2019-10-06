import * as React from 'react';
import { Network, DataSet, Node, Edge, NetworkEvents, IdType } from 'vis';
import *  as ELK from 'elkjs';
import { v4 as uuid } from 'uuid';

export interface INetworkGraphProps {
  graph: any;
  options: any;
  events?: any;
  style: any;
  getVisNetwork?: (network: Network) => void;  // expose the vis.js network
  getNodeBlock?: (node: Node) => string; // optional method to group nodes into blocks (like ie. a BasicBlock in HIR)
  nodeSelector?: NodeSelectorHelper;
  getNetworkGraph?: (network: NetworkGraph) => void;  // expose the NetworkGraph
}

export interface INetworkGraphState {
  identifier?: string;
  highlightActive: boolean;
}

export class NetworkGraph extends React.Component<INetworkGraphProps, INetworkGraphState> {
  private _edges: DataSet<Edge>;
  private _nodes: DataSet<Node>;
  private _network: Network;
  private _elk: ELK;
  private _initialPositions: Map<string, Position>;
  private _viewport: ViewPort;
  private _nodeSelector: NodeSelectorHelper;

  constructor(props: INetworkGraphProps) {
    super(props);
    this.state = {
      'identifier': uuid(),
      'highlightActive': false
    };
    this._elk = new ELK();
    this.createGraph = this.createGraph.bind(this);
    this.computeCoordinates = this.computeCoordinates.bind(this);
    this.showSurroundingNodes = this.showSurroundingNodes.bind(this);

    this._initialPositions = new Map();
    this._viewport = new ViewPort(0.5, new Position(0, 0));
    if (this.props.nodeSelector == undefined) {
      this._nodeSelector = new NodeSelectorHelper();
    } else {
      this._nodeSelector = this.props.nodeSelector;
    }
  }

  componentDidMount() {
    this.createGraph();
  }

  createGraph() {
    let identifier = this.state.identifier || '';
    let container = document.getElementById(identifier);
    if (!container) {
      return;
    }
    this._edges = new DataSet(this.props.graph.edges);
    this._nodes = new DataSet(this.props.graph.nodes);

    this.computeCoordinates(() => { this.initializeGraph(); }, /*restoreInitialPositions*/ true);
  }

  private initializeGraph() {
    console.log('initializeGraph');
    let identifier = this.state.identifier || '';
    let container = document.getElementById(identifier);
    if (!container) {
      return;
    }

    container.style.height = '90vh';
    const graphContent = {
      'edges': this._edges,
      'nodes': this._nodes
    };
    this._network = new Network(container, graphContent, this.props.options);

    let events = this.props.events;
    if (events) {
      for (let eventName of Object.keys(events)) {
        this._network.on(eventName as NetworkEvents, events[eventName]);
      }
    }
    if (this.props.getVisNetwork) {
      this.props.getVisNetwork(this._network);
    }
    if (this.props.getNetworkGraph) {
      this.props.getNetworkGraph(this);
    }
    this._network.on('doubleClick', (params) => this.showSurroundingNodes(params.nodes));
  }

  public showSurroundingNodes(selectedNodes: number[]) {
    let highlightActive = this.state.highlightActive;
    const allNodes = this._nodes.get({returnType: 'Object'});

    if (selectedNodes.length > 0) {
      if (!highlightActive) {
        this.storeViewPort();
      }
      highlightActive = true;

      // hide all nodes and reset those which should stay visible
      for (let nodeId in allNodes) {
        allNodes[nodeId].hidden = true;
      }
      if (selectedNodes.length > 0) {
        for (const selectedNode of selectedNodes) {
          const nodesToShow = this._nodeSelector.getNodesForSelection(this._network, selectedNode, allNodes);
          nodesToShow.forEach(n => n.hidden = false);
        }
      }

    // show all nodes
    } else if (highlightActive === true) {
      for (let nodeId in allNodes) {
        allNodes[nodeId].hidden = false;
      }
      highlightActive = false;
    }

    this.setState((prevState) => ({ ...prevState, highlightActive: highlightActive }));

    // transform the object into an array
    const updateArray = [];
    for (let nodeId in allNodes) {
        updateArray.push(allNodes[nodeId]);
    }
    this._nodes.update(updateArray);
    this.computeCoordinates(() => {}, /*restoreInitialPositions*/ highlightActive === false);
  }

  shouldComponentUpdate(nextProps: INetworkGraphProps) {
    // compare counts
    let changedEdges: boolean = this.props.graph.edges.length != nextProps.graph.edges.length
                               || JSON.stringify(this.props.graph.edges) !== JSON.stringify(nextProps.graph. edges);
    let changedNodes: boolean = this.props.graph.nodes.length != nextProps.graph.nodes.length
                                || JSON.stringify(this.props.graph.nodes) !== JSON.stringify(nextProps.graph. nodes);
    if (changedEdges || changedNodes) {
      if (changedEdges && this._edges) {
        this._edges.clear();
      }
      if (changedNodes && this._nodes) {
        // console.log('nodes cleared');
        this._nodes.clear();
        if (nextProps.graph.nodes) {
          this._nodes.add(nextProps.graph.nodes);
        }
      }
      if (changedEdges && nextProps.graph.edges && this._edges) {
        this._edges.add(nextProps.graph.edges);
      }
      // console.log('clear coordinates');
      this._initialPositions.clear();
      this.computeCoordinates(() => {}, false);
    }
    return false;
  }

  private computeCoordinates(initializeGraphFunction: Function, restoreInitialCoordinates: boolean) {
    if (restoreInitialCoordinates && this._initialPositions.size > 0) {
      // console.log('restore coordinates');
      let myUpdateSet: any = [];
      this._initialPositions.forEach((pos: Position, nodeId: string) => {
        myUpdateSet.push({id: nodeId, x: pos.x, y: pos.y});
      });
      this._nodes.update(myUpdateSet);
      this.restoreViewPort();
      return;
    }
    // console.log('compute coordinates: restoreInitialCoordinates:' + restoreInitialCoordinates + '; size' + this._initialPositions.size);
    let nodes = this._nodes.get({
      filter: function (item) {
        return item.hidden != true;
      }
    });
    const remainingNodes = new Set<string>();
    nodes.filter(n => n.id != undefined).forEach(n => remainingNodes.add(n.id) );

    let edges = this._edges.get({
      filter: function (item) {
        return remainingNodes.has(item.from) && remainingNodes.has(item.to);
      }
    });
    let elkGraph: any = {
      id: 'root',
      layoutOptions: {
        'elk.algorithm': 'layered',
        'elk.direction': 'DOWN',
        'elk.hierarchyHandling': 'INCLUDE_CHILDREN',
        'elk.layered.cycleBreaking.strategy': 'DEPTH_FIRST',
        'elk.layered.feedbackEdges': true,
        'elk.layered.wrapping.multiEdge.improveCuts': true,
        'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
        'elk.layered.wrapping.additionalEdgeSpacing': 10,
        'elk.padding': '[top=10,left=20,bottom=10,right=20]',
        'elk.layered.spacing.nodeNodeBetweenLayers': 70,
        'elk.layered.spacing.edgeEdgeBetweenLayers': 20,
        'elk.edgeRouting': 'SPLINE'
      },
      children: JSON.parse(this.mapNodes(nodes)),
      edges: JSON.parse(JSON.stringify(edges.map(e => this.mapToEdge(e))))
    };

    const initializeInitialPositions = this._initialPositions.size == 0;
    this._elk.layout(elkGraph)
        .then((g: any) => {
          let myUpdateSet: any = [];
          let elkNodes = g.children;
          elkNodes.forEach((n: any) => {
            if (n.children) {
              n.children.forEach((cn: any) => {
                const newX = cn.x + n.x;
                const newY = cn.y + n.y;
                // computed coordinates are always relative to the surrounding container
                myUpdateSet.push({id: cn.id, x: newX, y: newY});
                if (initializeInitialPositions) {
                  this._initialPositions.set(cn.id, new Position(newX, newY));
                }
              });
            } else {
              myUpdateSet.push({id: n.id, x: n.x, y: n.y});
              if (initializeInitialPositions) {
                this._initialPositions.set(n.id, new Position(n.x, n.y));
              }
            }
          });
          // console.log(myUpdateSet);
          this._nodes.update(myUpdateSet);

          initializeGraphFunction();

          this._network.fit();
          if (initializeInitialPositions) {
            this.storeViewPort();
          }
      });
  }

  private mapNodes(nodes: Node[]): string  {
    const getNodeBlockFkt = this.props.getNodeBlock;
    if (getNodeBlockFkt) {
      // console.log('mapNodes by getNodeBlockFkt');
      const containerMap = new Map<string, Node[]>();
      nodes.forEach(n => {
        const containerId = getNodeBlockFkt(n);
        let nodesInContainer = containerMap.get(containerId);
        if (!nodesInContainer) {
          nodesInContainer = [];
          containerMap.set(containerId, nodesInContainer);
        }
        nodesInContainer.push(n);
      });

      let result: any[] = [];
      containerMap.forEach((nodesInContainer: Node[], id: string) => {
          if (nodesInContainer.length == 1) {
            // console.log('add single node to computation: ' + id);
            result.push(this.mapToNode(nodesInContainer[0]));
          } else {
            // console.log('add multiple node to computation: ' + id);
            const  childNodes = nodesInContainer.map(n => this.mapToNode(n));
            const containerWidth = childNodes.map(n => n.width).reduce((a, b) => a + b);
            const containerHeight = childNodes.map(n => n.height).reduce((a, b) => a + b);
            result.push({ id: 'containerId-' + id, width: containerWidth, height: containerHeight, children: childNodes });
            // console.log('container id: ' + id + ': ' + containerWidth + '/' + containerHeight);
          }
      });
      return JSON.stringify(result);
    }
    return JSON.stringify(nodes.map(n => this.mapToNode(n)));
  }

  private mapToNode(n: Node): { id: string | number | undefined; width: number; height: number; } {
    let x = 200;
    let y = 45;
    const label = n.label;

    // increase size depending on length of node label
    if (label) {
      const lines =  label.split('\n');
      y = 20 + 25 * lines.length;
      const longestLine = Math.max(...(lines.map(el => el.length)));
      x = 50 + longestLine * 10;
    }
    return { id: n.id, width: x, height: y };
  }

  private mapToEdge(e: Edge): { id: string | number | undefined; source: string | number | undefined; target: string | number | undefined; } {
    return { id: e.id, source: e.from, target: e.to };
  }

  private storeViewPort(): void {
    if (this._network) {
      const scale = this._network.getScale();
      const viewPosition = this._network.getViewPosition();
      this._viewport = new ViewPort(scale, new Position(viewPosition.x, viewPosition.y));
      // console.log('stored viewport: :' + scale + '/' + viewPosition.x + '/' + viewPosition.y);
    }
  }

  private restoreViewPort(): void {
    if (this._network) {
      const val = {
        position: {x: this._viewport.viewPosition.x, y: this._viewport.viewPosition.y},
        scale: this._viewport.scale
      };
      // console.log('restore viewport: :' + JSON.stringify(val));
      this._network.moveTo(val);
    }
  }

  render() {
    return (
      <div id={this.state.identifier} style={this.props.style} className='visNetwork' />
    );
  }
}

class Position {
  constructor(public x: number, public y: number) { }
}

class ViewPort {
  constructor(public scale: number, public viewPosition: Position) { }
}

export class NodeSelectorHelper {
  /**
   * Returns a list of nodes which should be shown for the given selection.
   * This can depend on the type of graph.
   */
  public getNodesForSelection(networkRef: Network, selectedNodeId: any, allNodes: Node[]): Node[] {

    const nodesToShow: Node[] = this.getConnectedVisNodes(networkRef, selectedNodeId, allNodes);
    const mainNode = allNodes[selectedNodeId];
    if (mainNode) {
      nodesToShow.push(mainNode);
    }
    return nodesToShow;
  }

  protected getConnectedVisNodes(networkRef: Network, selectedNodeId: any, allNodes: Node[]): Node[] {
    const connectedNodes: IdType[] | Array<{
      fromId: IdType;
      toId: IdType;
    }> = networkRef.getConnectedNodes(selectedNodeId);
    const result: Node[] = [];
    for (let j = 0; j < connectedNodes.length; j++) {
      const node = allNodes[connectedNodes[j]];
      if (node) {
        result.push(node);
      }
    }
    return result;
  }
}