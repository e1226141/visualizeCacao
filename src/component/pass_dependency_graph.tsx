import * as React from 'react';
import { OptimizedMethod, Edge, PassDependencyGraphData, DependencyGraphNode} from '../data';
import { DisplayNode, DisplayEdge, GraphBuilder } from '../graph_builder';
import { NetworkGraph } from './network_graph';
import { NodeSearch } from './node_search';
import { Network } from 'vis';
import { Segment, Statistic, Popup, Portal, Grid, Message, Icon, Checkbox } from 'semantic-ui-react';

export interface IPassDependencyProps {
  optimizedMethod: OptimizedMethod;
  networkGraphStyle: React.CSSProperties;
}

export interface IPassDependencyState {
  showLegend: boolean;
  groupEdges: boolean;
  showOnlyEnabledPasses: boolean;
}

export class PassDependencyGraph extends React.Component<IPassDependencyProps, IPassDependencyState> {
  private _detailNetwork: Network;

  constructor(props: IPassDependencyProps) {
    super(props);
    this.state = {
      showLegend: false,
      groupEdges: true,
      showOnlyEnabledPasses: true
    };

    this._toggleGroupEdges = this._toggleGroupEdges.bind(this);
    this._toggleShowOnlyEnabledPasses = this._toggleShowOnlyEnabledPasses.bind(this);
    this._onShowLegend = this._onShowLegend.bind(this);
    this._onHideLegend = this._onHideLegend.bind(this);
  }

  private _toggleGroupEdges = () => this.setState((prevState) => ({ ...prevState, groupEdges: !prevState.groupEdges }));
  private _toggleShowOnlyEnabledPasses =
    () => this.setState((prevState) => ({ ...prevState, showOnlyEnabledPasses: !prevState.showOnlyEnabledPasses }))
  private _onShowLegend = () => this.setState( (prevState) => ({...prevState, showLegend: !this.state.showLegend }));
  private _onHideLegend = () => this.setState( (prevState) => ({...prevState,  showLegend: false }));

  render() {
    const passDependencyGraph: PassDependencyGraphData | undefined = this.props.optimizedMethod.passDependencyGraph;
    if (!passDependencyGraph) {
      return;
    }
    const lastPass = this.props.optimizedMethod.passes[this.props.optimizedMethod.passes.length - 1];
    const graphBuilder = new DetailGraphBuilder(
      passDependencyGraph.nodes,
      passDependencyGraph.edges,
      lastPass.name,
      this.state.groupEdges,
      this.state.showOnlyEnabledPasses
    );
    const graph: JSON = graphBuilder.toJSONGraph();
    const legend: JSON = graphBuilder.toJSONGraphLegend();
    const options: JSON = this._getDefaultOptions();
    const legendOptions: JSON = this._getOptionsForLegend();

    const events = {
      select: function (event: any) {
        let { nodes, edges } = event;
        console.log('Selected nodes:');
        console.log(nodes);
        console.log('Selected edges:');
        console.log(edges);
      }
    };
    const statisticsLabel = 'passes';
    const statisticsTooltip = 'number of passes';
    let searchValueSelected = (selection: any) => {
      console.log('selected: ' + selection.id);
      const id = selection.id;
      this._detailNetwork.selectNodes( [id] );
      this._detailNetwork.focus(id, { scale: 1.1 });
    };

    return (
      <div>
          <Segment.Group horizontal raised style={{padding: 0, margin: 0}}>
            <Segment floated='left' horizontal='true'>
              <Segment.Inline>
                  <NodeSearch graph={graph} valueSelectedHandler={searchValueSelected}
                    style={{paddingRight: '20px', width: '100%'}} />
                  <Popup trigger={<Icon name='info circle' size='big' onClick={this._onShowLegend} />}
                    content='displays the legend of the detail network graph'/>
                  <Popup trigger={<Checkbox label='group edges' checked={this.state.groupEdges} onClick={() => this._toggleGroupEdges()}
                    style={{paddingRight: '20px'}}/>} content='group different edges between each pair nodes' style={{paddingRight: '20px'}}
                  />
                  <Popup trigger={<Checkbox label='only enabled passes'
                    checked={this.state.showOnlyEnabledPasses} onClick={() => this._toggleShowOnlyEnabledPasses()}
                    style={{paddingRight: '20px'}}/>} content='hides all passes have not been enabled' style={{paddingRight: '20px'}}
                  />

              </Segment.Inline>
            </Segment>
            <Segment floated='right' compact size='mini'>
              <Popup trigger={
                <Statistic size='mini' floated='right'>
                  <Statistic.Value>{graph.nodes.length}</Statistic.Value>
                  <Statistic.Label>{statisticsLabel}</Statistic.Label>
                </Statistic>
                } content={statisticsTooltip} />
            </Segment>
          </Segment.Group>
          <div id='detailNetwork'>
            <div className='vis-network' width='100%'>
              <NetworkGraph graph={graph} options={options} events={events} style={this.props.networkGraphStyle}
                getVisNetwork={ (network) => { this._detailNetwork = network; } } />
            </div>
            <Portal onClose={this._onHideLegend} open={this.state.showLegend}
              closeOnDocumentClick={false} closeOnPortalMouseLeave={false}>
              <Segment style={{ left: '30%', position: 'fixed', top: '10%', zIndex: 1000 }} >
                  <Grid>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <Message>
                          <Message.Header>legend by example</Message.Header>
                          <p>look at the tooltips on the nodes and edges for further details.</p>
                        </Message>
                      </Grid.Column>
                      <Grid.Column>
                        <Icon name='window close outline' size='big' onClick={this._onHideLegend} />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1} stretched>
                      <Grid.Column>
                        <NetworkGraph graph={legend} options={legendOptions} style={{width: '400px', height: '300px'}} />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
              </Segment>
            </Portal>
          </div>
      </div>
    );
  }

  private _getDefaultOptions(): JSON {
    let options: any = {
      height: '100%',
      width: '100%',
      nodes: {
        shape: 'box'
      },
      edges: {
        arrows: {
          'to': {
            'enabled': true
          }
        },
        smooth: {
          enabled: true,
          type: 'cubicBezier',
          forceDirection: true
        }
      },
      layout: {
        hierarchical: {
          enabled: false,
          levelSeparation: 150
        }
      },
      physics: {
        enabled: false,
        hierarchicalRepulsion: {
          nodeDistance: 250
        },
        stabilization: {
          enabled: false,
          iterations: 100
        }
      }
    };
    return options as JSON;
  }

  private _getOptionsForLegend(): JSON {
    let options: any = {
      nodes: { shape: 'box' },
      edges: {
        arrows: { 'to': { 'enabled': true } },
        color: {inherit: false },
        smooth: {
          enabled: true,
          type: 'discrete'
        },
        chosen: false
      },
      layout: {
        improvedLayout: true,
        hierarchical: {
          enabled: false,
          direction: 'DU',
          sortMethod: 'hubsize'
        }
      },
      interaction: { hover: true },
      physics: { enabled: false }
    };
    return options as JSON;
  }
}

class DetailGraphBuilder extends GraphBuilder<DependencyGraphNode, Edge, DisplayNode<DependencyGraphNode>, DisplayEdge<Edge>> {

  constructor(nodes: DependencyGraphNode[], edges: Edge[], nameOfLastPass: string, groupEdges: boolean, showOnlyEnabledPasses: boolean) {
    super();
    let nodeIdsToRemove = new Set<Number>(nodes.filter(node => showOnlyEnabledPasses && node.enabled === false).map(node => node.id));
    nodes = nodes.filter(node => !nodeIdsToRemove.has(node.id));
    edges = edges.filter(edge => !nodeIdsToRemove.has(edge.from)).filter(edge => !nodeIdsToRemove.has(edge.to));

    this.init(nodes, this.prepareEdges(edges, groupEdges));

    const root = this.nodes.find(node => node.name == nameOfLastPass);
    if (!root) {
      return;
    }
  }

  private prepareEdges(edges: Edge[], groupEdges: boolean): Edge[] {
    if (groupEdges === false) {
      return edges;
    }

    // collect edge types for each node pair
    const separator = ';';
    let edgeMap = new Map<String, Array<String>>();
    edges.forEach(edge => {
      const key = edge.from + separator + edge.to;
      let types: undefined | Array<String> = edgeMap.get(key);
      if (types == undefined) {
        types = new Array<String>();
        edgeMap.set(key, types);
      }
      types.push(edge.type);
    });

    // create new grouped edges
    const groupedEdges: Edge[] = [];
    for (let [key, value] of edgeMap) {
      const splitKey = key.split(separator);
      const edge = new Edge();
      edge.from = Number(splitKey[0]);
      edge.to = Number(splitKey[1]);
      edge.type = value.sort().join('/');
      groupedEdges.push(edge);
    }
    return groupedEdges;
  }

  toDisplayNode (node: DependencyGraphNode): DisplayNode<DependencyGraphNode> {
    const result: DisplayNode<DependencyGraphNode> = new DisplayNode<DependencyGraphNode>(node, node.name);

    // set color
    if (!node.enabled) {
      result.color = '#DCDCDC';
      result.shapeProperties = {'borderDashes': [5,5]};
    } else {
      if (node.pass) {
        if (node.artifact) {
          result.color = '#BA55D3';
        } else {
          result.color = '#87CEEB';
        }
      } else if (node.artifact) {
        result.color = '#8FBC8F';
      }
    }
    return result;
  }

  toDisplayEdge (edge: Edge): DisplayEdge<Edge> {
    const result: DisplayEdge<Edge> = new DisplayEdge<Edge>(edge, edge.type);
    return result;
  }
}
