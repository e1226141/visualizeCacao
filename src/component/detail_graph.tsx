import * as React from 'react';
import { Pass, Node, NodeType, Edge, EdgeType, HIRGraphData } from '../data';
import { DisplayNode, DisplayEdge, GraphBuilder } from '../graph_builder';
import { NetworkGraph } from './network_graph';
import { NodeSearch } from './node_search';
import { Network } from 'vis';
import { Segment, Statistic, Popup, Portal, Grid, Message, Icon } from 'semantic-ui-react';

export interface IDetailGraphProps {
  pass: Pass;
  showAdjacentNodeDistance: number;
  networkGraphStyle: React.CSSProperties;
}

export interface IDetailGraphState {
  showLegend: boolean;
  selectedNode: number;
}

export class DetailGraph extends React.Component<IDetailGraphProps, IDetailGraphState> {
  private _detailNetwork: Network;

  constructor(props: IDetailGraphProps) {
    super(props);
    this.state = {
      showLegend: false,
      selectedNode: -1
    };
  }

  private _getDefaultOptions(): JSON {
    let options: any = {
      autoResize: true,
      height: '100%',
      width: '100%',
      nodes: {
        shape: 'box',
      },
      edges: {
        arrows: {
          'to': {
            'enabled': true
          }
        },
        color: {
          inherit: false
        },
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
          levelSeparation: 160,
          nodeSpacing: 200,
          blockShifting: true,
          edgeMinimization: false,
          parentCentralization: true,
          direction: 'UD',
          sortMethod: 'directed'
        }
      },
      physics: {
        enabled: false,
        hierarchicalRepulsion: {
            centralGravity: 0.10,
            springLength: 25,
            springConstant: 0.02,
            nodeDistance: 220,
            damping: 0.03
        },
        stabilization: {
            enabled: false,
            iterations: 100
        }
      }
    } ;
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
          enabled: true,
          direction: 'UD',
          sortMethod: 'hubsize'
        }
      },
      interaction: { hover: true },
      physics: { enabled: false }
    };
    return options as JSON;
  }

  private _onShowLegend = () => this.setState( (prevState) => ({...prevState, showLegend: !this.state.showLegend }));
  private _onHideLegend = () => this.setState( (prevState) => ({...prevState,  showLegend: false }));

  render() {
    const hir: HIRGraphData | undefined = this.props.pass.hir;
    if (!hir) {
      return;
    }

    const graphBuilder = new DetailGraphBuilder(
      hir.nodes,
      hir.edges,
      this.state.selectedNode,
      this.props.showAdjacentNodeDistance
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
    const statisticsLabel = 'instructions';
    const statisticsTooltip = 'number of instructions';
    let searchValueSelected = (selection: any) => {
      console.log('selected: ' + selection.id);
      const id = selection.id;
      this._detailNetwork.selectNodes( [id] );
      this._detailNetwork.focus(id, { scale: 1.1 });
    };

    return (
      <div>
          <Segment.Group horizontal raised style={{padding: 0, margin: 0}}>
          <Segment floated='left'>
              <div>
                <Popup trigger={<Icon name='info circle' size='big' onClick={this._onShowLegend} />}
                  content='displays the legend of the detail network graph'/>
              </div>
              <NodeSearch graph={graph} valueSelectedHandler={searchValueSelected} style={{paddingRight: '20px', width: '100%'}} />
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
}

class DetailGraphBuilder extends GraphBuilder<DisplayNode, DisplayEdge> {
  private selectedNode: number;
  private showAdjacentNodeDistance: number;

  constructor(nodes: Node[], edges: Edge[], pSelectedNode: number, pShowAdjacentNodeDistance: number) {
    super();
    this.selectedNode = pSelectedNode;
    this.showAdjacentNodeDistance = pShowAdjacentNodeDistance;
    this.init(nodes, edges);

    const root = this.findRoot();
    this.markBackedges(root, e => e.edgeType !== EdgeType.op, new Set<number>());
    this.edges = this.edges.filter((e: DisplayEdge) => e.edgeType != EdgeType.sched);
    this.edges.filter( (e: DisplayEdge) => e.backedge).forEach( (e: DisplayEdge) => { e.color = {color: '#EE0000'}; });
    // this.setHierarchy(root, (e) => e.edgeType == EdgeType.cfg || e.edgeType == EdgeType.sched || e.edgeType == EdgeType.bb);
  }

 toJSONGraphLegend (): JSON {
    const nodes = [
      {id: 1, label: 'BB', level: 0, color: this.getNodeBackgroundColor(NodeType.GOTOInst), title: 'basic block with "GOTO" as EndInst'},
      {id: 2, label: 'IF', level: 1, color: this.getNodeBackgroundColor(NodeType.IFInst), title: 'basic block with an "IF" as EndInst'},
      {id: 3, label: 'BB', level: 2, color: this.getNodeBackgroundColor(NodeType.GOTOInst), title: 'basic block with an "GOTO" as EndInst'},
      {id: 4, label: 'Return', level: 2, color: this.getNodeBackgroundColor(NodeType.RETURNInst), title: 'basic block with an "RETURN" as EndInst'}
    ];
    const edges = [
      {from: 1, to: 2, color: {color: '#87B2EC'}},
      {from: 2, to: 4, label: 'T', color: {color: '#5aa52b'}, title: 'true branch of an if statement'},
      {from: 2, to: 3, label: 'F', color: {color: '#7C29F0'}, title: 'false branch of an if statement'},
      {from: 3, to: 2, title: 'backedge', color: {color: '#EE0000'}}
    ];
    let graph: any = {
      'nodes': JSON.parse(JSON.stringify(nodes)),
      'edges': JSON.parse(JSON.stringify(edges))
    };
    return graph as JSON;
  }

  toDisplayNode (node: Node): DisplayNode {
    return new DisplayNode(node,
      this.getNodeDisplayString(node, false),
      this.getNodeBackgroundColor(node.nodeType)
    );
  }

  toDisplayEdge (edge: Edge): DisplayEdge {
    const dashes = edge.edgeType === EdgeType.bb;
    return new DisplayEdge(edge, edge.type, this.getEdgeColor(edge), 2, dashes);
  }
}
