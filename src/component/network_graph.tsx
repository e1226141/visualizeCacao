import * as React from 'react';
import { Network, DataSet, Node, Edge, NetworkEvents } from 'vis';
import { DisplayNode, DisplayEdge } from '../graph_builder';
import *  as ELK from 'elkjs';
import { v4 as uuid } from 'uuid';
import { NodeType } from '../../out/visualizecacao-win32-x64/resources/app/src/data';

export interface INetworkGraphProps {
  graph: any;
  options: any;
  events?: any;
  style: any;
  getVisNetwork?: (network: Network) => void;  // expose the vis.js network
}

export interface INetworkGraphState {
  identifier?: string;
}

export class NetworkGraph extends React.Component<INetworkGraphProps, INetworkGraphState> {
  private _edges: DataSet<Edge>;
  private _nodes: DataSet<Node>;
  private _network: Network;
  private _elk: ELK;
  private _firstCall = true;

  constructor(props: INetworkGraphProps) {
    super(props);
    this.state = { 'identifier': uuid() };
    this.createGraph = this.createGraph.bind(this);
    this.computeCoordinates = this.computeCoordinates.bind(this);
    this._elk = new ELK();
  }

  componentDidMount() {
    this.createGraph();
  }

  //componentDidUpdate(prevProps: INetworkGraphProps, prevState: INetworkGraphState) {
  // // only update chart if the data has changed
  //  this._network.stabilize(1000);
  //  this._network.fit();
  //}

  createGraph() {
    let identifier = this.state.identifier || '';
    let container = document.getElementById(identifier);
    if (!container) {
      return;
    }
    this._edges = new DataSet(this.props.graph.edges);
    this._nodes = new DataSet(this.props.graph.nodes);
    this._network = new Network(container, {
      'edges': this._edges,
      'nodes': this._nodes
    }, this.props.options);

    let events = this.props.events;
    if (events) {
      for (let eventName of Object.keys(events)) {
        this._network.on(eventName as NetworkEvents, events[eventName]);
      }
    }
    if (this.props.getVisNetwork) {
      this.props.getVisNetwork(this._network);
    }
    this.computeCoordinates( this.props);
    this._network.on('stabilizationIterationsDone', () => {
      this._network.setOptions( { physics: false } );
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
        this._nodes.clear();
        if (nextProps.graph.nodes) {
          this._nodes.add(nextProps.graph.nodes);
        }
      }
      if (changedEdges && nextProps.graph.edges && this._edges) {
        this._edges.add(nextProps.graph.edges);
      }
      this.computeCoordinates(nextProps);
    }
    return false;
  }

  private computeCoordinates(props: INetworkGraphProps) {
    let elkGraph: any = {
      id: 'root',
      layoutOptions: {
        'elk.algorithm': 'layered',
        'elk.direction': 'DOWN',
        //'elk.layered.nodePlacement.strategy': 'SIMPLE',
        //'spacing.edgeNode': '40',
        //'spacing.nodeNode': '150',
        //'elk.layered.spacing.edgeNodeBetweenLayers': 35,
        //'elk.edgeRouting': 'POLYLINE',
        'elk.layered.layering.strategy': 'COFFMAN_GRAHAM',
        //'elk.layered.layering.minWidth.upperBoundOnWidth': -1,
        //'elk.layered.priority.straightness': 5
        'elk.edgeLabels.inline': true,
        'elk.padding': '[top=25,left=25,bottom=25,right=25]',
        'elk.spacing.componentComponent': 25,
        'elk.layered.spacing.nodeNodeBetweenLayers': 80,
        'elk.layered.spacing.edgeEdgeBetweenLayers': 50,
        'elk.edgeRouting': 'POLYLINE',
      },
      children: JSON.parse(JSON.stringify(this._nodes.map(n => { return {id: n.id, width: 150, height: 25 }; } ))),
      edges: JSON.parse(JSON.stringify(this._edges.get().map(e => { return {id: e.id, source: e.from, target: e.to }; } )))
    };

    console.log(JSON.stringify(elkGraph));

    let result = this._elk.layout(elkGraph)
      .then(g => {
        let myUpdateSet: any = [];
        let elkNodes = g.children;
        console.log('elkNodes: ' + elkNodes.length);
        elkNodes.forEach(n => {
          if (n.id > 0) {
            myUpdateSet.push({id: n.id, x: n.x, y: n.y});
          }
          if (n.children) {
            console.log('elkNodes-childs: ' + n.children.length);
            n.children.forEach(cn => {
              myUpdateSet.push({id: cn.id, x: cn.x, y: cn.y});
            });
          }
        });
        console.log('updateSet: ' + myUpdateSet.length);
        console.log(myUpdateSet);
        this._nodes.update(myUpdateSet);
        if (this._firstCall) {
          this._network.fit();
          this._firstCall = false;
        }
    })
    .catch(console.error);
  }

  render() {
    return (
      <div id={this.state.identifier} style={this.props.style} />
    );
  }
}