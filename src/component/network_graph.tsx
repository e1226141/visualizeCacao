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

  constructor(props: INetworkGraphProps) {
    super(props);
    this.state = {
      'identifier': uuid(),
      'highlightActive': false
    };
    this._elk = new ELK();
    this.createGraph = this.createGraph.bind(this);
    this.computeCoordinates = this.computeCoordinates.bind(this);
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

    this.computeCoordinates(() => { this.initializeGraph(); }, true);
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

    const networkRef = this._network;
    let highlightActive = this.state.highlightActive;
    const allNodes = this._nodes.get({returnType: 'Object'});
    let _this = this;

    this._network.on('doubleClick', function (params) {
      if (params.nodes.length > 0) {
        highlightActive = true;
        const selectedNode = params.nodes[0];

        // hide all nodes and reset those which should stay visible
        for (let nodeId in allNodes) {
          allNodes[nodeId].hidden = true;
        }
        let connectedNodes: IdType[] | Array<{ fromId: IdType, toId: IdType }> = networkRef.getConnectedNodes(selectedNode);
        for (let j = 0; j < connectedNodes.length; j++) {
          const node = allNodes[connectedNodes[j]];
          if (node) {
            node.hidden = false;
          }
        }
        const mainNode = allNodes[selectedNode];
        if (mainNode) {
          mainNode.hidden = false;
        }

      // show all nodes
      } else if (highlightActive === true) {
        for (let nodeId in allNodes) {
          allNodes[nodeId].hidden = false;
        }
        highlightActive = false;
      }

      // transform the object into an array
      const updateArray = [];
      for (let nodeId in allNodes) {
          updateArray.push(allNodes[nodeId]);
      }
      graphContent.nodes.update(updateArray);
      _this.computeCoordinates(() => {}, true);
    });
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
        console.log('nodes cleared');
        this._nodes.clear();
        if (nextProps.graph.nodes) {
          this._nodes.add(nextProps.graph.nodes);
        }
      }
      if (changedEdges && nextProps.graph.edges && this._edges) {
        this._edges.add(nextProps.graph.edges);
      }
      this.computeCoordinates(() => {}, false);
    }
    return false;
  }

  private computeCoordinates(initializeGraphFunction: Function, fitNetwork: boolean): Promise<any> {
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

    return this._elk.layout(elkGraph)
        .then((g: any) => {
          let myUpdateSet: any = [];
          let elkNodes = g.children;
          elkNodes.forEach((n: any) => {
            if (n.children) {
              n.children.forEach((cn: any) => {
                // computed coordinates are always relative to the surrounding container
                myUpdateSet.push({id: cn.id, x: cn.x + n.x, y: cn.y + n.y});
              });
            } else {
              myUpdateSet.push({id: n.id, x: n.x, y: n.y});
            }
          });
          //console.log(myUpdateSet);
          this._nodes.update(myUpdateSet);

          initializeGraphFunction();

          if (fitNetwork) {
            this._network.fit();
          }
      });
  }

  private mapNodes(nodes: Node[]): string  {
    const getNodeBlockFkt = this.props.getNodeBlock;
    if (getNodeBlockFkt) {
      console.log('mapNodes by getNodeBlockFkt');
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
            //console.log('add single node to computation: ' + id);
            result.push(this.mapToNode(nodesInContainer[0]));
          } else {
            //console.log('add multiple node to computation: ' + id);
            const  childNodes = nodesInContainer.map(n => this.mapToNode(n));
            const containerWidth = childNodes.map(n => n.width).reduce((a, b) => a + b);
            const containerHeight = childNodes.map(n => n.height).reduce((a, b) => a + b);
            result.push({ id: 'containerId-' + id, width: containerWidth, height: containerHeight, children: childNodes });
            //console.log('container id: ' + id + ': ' + containerWidth + '/' + containerHeight);
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

  render() {
    return (
      <div id={this.state.identifier} style={this.props.style} className='visNetwork' />
    );
  }
}