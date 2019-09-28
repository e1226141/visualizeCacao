import * as React from 'react';
import { OptimizedMethod, DependencyGraphEdge, GraphDependencyEdgeType, PassDependencyGraphData, DependencyGraphNode} from '../data';
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
  hideRequireEdges: boolean;
  hideProvideEdges: boolean;
  hideModifyEdges: boolean;
  hideScheduleEdges: boolean;
}

export class PassDependencyGraph extends React.Component<IPassDependencyProps, IPassDependencyState> {
  private _detailNetwork: Network;

  constructor(props: IPassDependencyProps) {
    super(props);
    this.state = {
      showLegend: false,
      groupEdges: true,
      showOnlyEnabledPasses: true,
      hideRequireEdges: false,
      hideProvideEdges: false,
      hideModifyEdges: false,
      hideScheduleEdges: false
    };

    this._toggleShowOnlyEnabledPasses = this._toggleShowOnlyEnabledPasses.bind(this);
    this._toggleHideRequireEdges = this._toggleHideRequireEdges.bind(this);
    this._toggleHideProvideEdges = this._toggleHideProvideEdges.bind(this);
    this._toggleHideModifyEdges = this._toggleHideModifyEdges.bind(this);
    this._toggleHideScheduleEdges = this._toggleHideScheduleEdges.bind(this);
    this._onShowLegend = this._onShowLegend.bind(this);
    this._onHideLegend = this._onHideLegend.bind(this);
  }

  private _toggleShowOnlyEnabledPasses =
    () => this.setState((prevState) => ({ ...prevState, showOnlyEnabledPasses: !prevState.showOnlyEnabledPasses }))
  private _toggleHideRequireEdges =
    () => this.setState((prevState) => ({ ...prevState, hideRequireEdges: !prevState.hideRequireEdges }))
  private _toggleHideProvideEdges =
    () => this.setState((prevState) => ({ ...prevState, hideProvideEdges: !prevState.hideProvideEdges }))
  private _toggleHideModifyEdges =
    () => this.setState((prevState) => ({ ...prevState, hideModifyEdges: !prevState.hideModifyEdges }))
  private _toggleHideScheduleEdges =
    () => this.setState((prevState) => ({ ...prevState, hideScheduleEdges: !prevState.hideScheduleEdges }))
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
      this.state
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
                  <NodeSearch graph={graph} valueSelectedHandler={searchValueSelected} className='node-search-box'/>
                  <Popup trigger={<Icon name='info circle' size='big' onClick={this._onShowLegend} />}
                    content='displays the legend of the detail network graph' className='selection-checkbox'/>
                  <Popup trigger={<Checkbox label='only enabled passes'
                    checked={this.state.showOnlyEnabledPasses} onClick={() => this._toggleShowOnlyEnabledPasses()}
                    className='selection-checkbox'/>} content='hides all passes have not been enabled' className='selection-checkbox'/>
                  <Popup trigger={<Checkbox label='hide requires'
                    checked={this.state.hideRequireEdges} onClick={() => this._toggleHideRequireEdges()}
                    className='selection-checkbox'/>} content='hides all "require" edges' className='selection-checkbox'/>
                  <Popup trigger={<Checkbox label='hide provide'
                    checked={this.state.hideProvideEdges} onClick={() => this._toggleHideProvideEdges()}
                    className='selection-checkbox'/>} content='hides all "provide" edges' className='selection-checkbox'/>
                  <Popup trigger={<Checkbox label='hide modifies'
                    checked={this.state.hideModifyEdges} onClick={() => this._toggleHideModifyEdges()}
                    className='selection-checkbox'/>} content='hides all "modifies" edges' className='selection-checkbox'/>
                  <Popup trigger={<Checkbox label='hide schedule'
                    checked={this.state.hideScheduleEdges} onClick={() => this._toggleHideScheduleEdges()}
                    className='selection-checkbox'/>} content='hides all "schedule*" edges' className='selection-checkbox'/>

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
            <div className='vis-network'>
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
        shape: 'box',
        color: {border: '#000000'},
        borderWidth: 1,
        borderWidthSelected: 4
      },
      edges: {
        arrows: {
          'to': {
            'enabled': true
          }
        },
        smooth: {
          enabled: true,
          type: 'straightCross'
        },
        selectionWidth: 3,
        color: {
          inherit: false
        },
      },
      layout: {
        hierarchical: {
          enabled: false
        }
      },
      physics: {
        enabled: false
      }
    };
    return options as JSON;
  }

  private _getOptionsForLegend(): JSON {
    let options: any = {
      nodes: {
          shape: 'box',
          color: {border: '#000000'},
          borderWidth: 1
      },
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
          enabled: false
        }
      },
      interaction: { hover: true },
      physics: { enabled: false }
    };
    return options as JSON;
  }
}

class DetailGraphBuilder
  extends GraphBuilder<DependencyGraphNode, DependencyGraphEdge, DisplayNode<DependencyGraphNode>, DisplayEdge<DependencyGraphEdge>> {

  constructor(nodes: DependencyGraphNode[], edges: DependencyGraphEdge[], nameOfLastPass: string, state: IPassDependencyState) {
    super();
    let nodeIdsToRemove = new Set<Number>(nodes.filter(node => state.showOnlyEnabledPasses && node.enabled === false).map(node => node.id));
    edges = edges.filter(edge => !state.hideRequireEdges || edge.edgeType != GraphDependencyEdgeType.requires);
    edges = edges.filter(edge => !state.hideProvideEdges || edge.edgeType != GraphDependencyEdgeType.provides);
    edges = edges.filter(edge => !state.hideModifyEdges || edge.edgeType != GraphDependencyEdgeType.modifies);
    edges = edges.filter(edge => !state.hideScheduleEdges ||
      (edge.edgeType != GraphDependencyEdgeType.scheduleAfter && edge.edgeType != GraphDependencyEdgeType.scheduleBefore
        && edge.edgeType != GraphDependencyEdgeType.scheduleImmediateAfter && edge.edgeType != GraphDependencyEdgeType.scheduleImmediateBefore));

    nodes = nodes.filter(node => !nodeIdsToRemove.has(node.id));
    edges = edges.filter(edge => !nodeIdsToRemove.has(edge.from)).filter(edge => !nodeIdsToRemove.has(edge.to));

    this.init(nodes, this.prepareEdges(edges, state.groupEdges));

    const root = this.nodes.find(node => node.name == nameOfLastPass);
    if (!root) {
      return;
    }
  }

  private prepareEdges(edges: DependencyGraphEdge[], groupEdges: boolean): DependencyGraphEdge[] {
    if (groupEdges === false) {
      return edges;
    }

    // collect edge types for each node pair
    const separator = ';';
    let edgeMap = new Map<String, Array<DependencyGraphEdge>>();
    edges.forEach(edge => {
      const key = edge.from + separator + edge.to;
      let types: undefined | Array<DependencyGraphEdge> = edgeMap.get(key);
      if (types == undefined) {
        types = new Array<DependencyGraphEdge>();
        edgeMap.set(key, types);
      }
      types.push(edge);
    });

    // create new grouped edges
    const groupedEdges: DependencyGraphEdge[] = [];
    for (let [key, value] of edgeMap) {
      const splitKey = key.split(separator);
      const edge = new DependencyGraphEdge();
      edge.from = Number(splitKey[0]);
      edge.to = Number(splitKey[1]);
      edge.type = value.sort().map(e => e.type).join('/');
      if (value.length > 1) {
        edge.edgeType = GraphDependencyEdgeType.Unknown;
      } else {
        edge.edgeType = value[0].edgeType;
      }
      groupedEdges.push(edge);
    }
    return groupedEdges;
  }

  toDisplayNode (node: DependencyGraphNode): DisplayNode<DependencyGraphNode> {
    const result: DisplayNode<DependencyGraphNode> = new DisplayNode<DependencyGraphNode>(node, node.name);

    if (!node.enabled) {
      result.shapeProperties = { 'borderDashes': [5, 5] };
    }
    result.setColor(this.getNodeColor(node));
    return result;
  }

  private getNodeColor(node: DependencyGraphNode): string {
    if (!node.enabled) {
      return '#DCDCDC';
    }
    if (node.pass) {
        if (node.artifact) {
          return '#BA55D3';
        }
        return '#87CEEB';
    }
    return '#8FBC8F';
  }

  toDisplayEdge (edge: DependencyGraphEdge): DisplayEdge<DependencyGraphEdge> {
    const result: DisplayEdge<DependencyGraphEdge> = new DisplayEdge<DependencyGraphEdge>(edge, edge.type);
    result.setColor(this._getEdgeColor(edge.edgeType));
    return result;
  }
  private _getEdgeLabel(edgeType: GraphDependencyEdgeType): string {
    switch (edgeType) {
      case GraphDependencyEdgeType.provides:
        return 'provides';
      case GraphDependencyEdgeType.modifies:
        return 'modifies';
      case GraphDependencyEdgeType.requires:
        return 'requires';
      case GraphDependencyEdgeType.scheduleAfter:
        return 'schedule-after';
      case GraphDependencyEdgeType.scheduleBefore:
        return 'schedule-before';
      case GraphDependencyEdgeType.scheduleImmediateBefore:
        return 'schedule-imm-before';
      case GraphDependencyEdgeType.scheduleImmediateAfter:
        return 'schedule-imm-before';
      default:
        return 'unknown';
    }
  }

  private _getEdgeColor(edgeType: GraphDependencyEdgeType): string {
    switch (edgeType) {
      case GraphDependencyEdgeType.modifies:
        return '#DC143C';
      case GraphDependencyEdgeType.scheduleAfter:
      case GraphDependencyEdgeType.scheduleBefore:
        return '#66CDAA';
      case GraphDependencyEdgeType.scheduleImmediateBefore:
        return '#FF7F50';
      case GraphDependencyEdgeType.requires:
      case GraphDependencyEdgeType.provides:
      default:
        return '#A9A9A9';
    }
  }
}
