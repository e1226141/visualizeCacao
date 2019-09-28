import * as React from 'react';
import { Pass, HIRNode, HIRNodeType, HIREdge, HIREdgeType, HIRGraphData } from '../data';
import { HirGraphBuilder } from './hir_base';
import { DisplayNode, DisplayEdge } from '../graph_builder';
import { NetworkGraph } from './network_graph';
import { NodeSearch } from './node_search';
import { Network, Node} from 'vis';
import { Segment, Statistic, Popup, Portal, Grid, Message, Icon, Checkbox} from 'semantic-ui-react';

export interface IDetailGraphProps {
  pass: Pass;
  showAdjacentNodeDistance: number;
  networkGraphStyle: React.CSSProperties;
}

export interface IDetailGraphState {
  showLegend: boolean;
  selectedNode: number;
  hideSourceStates: boolean;
}

export class DetailGraph extends React.Component<IDetailGraphProps, IDetailGraphState> {
  private _detailNetwork: Network;

  constructor(props: IDetailGraphProps) {
    super(props);
    this.state = {
      showLegend: false,
      selectedNode: -1,
      hideSourceStates: true
    };

    this._toggleHideSourceStates = this._toggleHideSourceStates.bind(this);
  }

  private _toggleHideSourceStates =
    () => this.setState((prevState) => ({ ...prevState, hideSourceStates: !prevState.hideSourceStates }))

  private _getDefaultOptions(): JSON {
    let options: any = {
      autoResize: true,
      height: '100%',
      width: '100%',
      nodes: {
        shape: 'box',
        font: {
          face: 'monospace',
          align: 'left',
          multi: 'html',
          bold: {
            color: '#343434',
            size: 16, // px
            face: 'monospace',
            mod: 'bold'
          },
          ital: {
            color: '#8B0000',
            size: 16, // px
            face: 'monospace',
            mod: 'italic',
          },
        },
        color: {border: '#000000'},
        borderWidthSelected: 2
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
          type: 'straightCross'
        },
        selectionWidth: 3
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
      nodes: { shape: 'box', color: {border: '#000000'} },
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
      this.state.hideSourceStates
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
                <Popup trigger={<Checkbox label='hide source state'
                    checked={this.state.hideSourceStates} onClick={() => this._toggleHideSourceStates()}
                    className='selection-checkbox'/>} content='hides all source state instructions' className='selection-checkbox'/>
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
              getVisNetwork={ (network) => { this._detailNetwork = network; } }
              getNodeBlock={ (n: Node) => { return n.internalGroup ? n.internalGroup : n.id; } } />
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

class DetailGraphBuilder extends HirGraphBuilder {

  constructor(nodes: HIRNode[], edges: HIREdge[], hideSourceStates: boolean) {
    super();

    let nodeIdsToRemove = new Set<Number>(
      nodes.filter(node => hideSourceStates && node.nodeType == HIRNodeType.SourceStateInst).map(node => node.id));
    if (nodeIdsToRemove.size > 0) {
      nodes = nodes.filter(node => !nodeIdsToRemove.has(node.id));
      edges = edges.filter(edge => !nodeIdsToRemove.has(edge.from)).filter(edge => !nodeIdsToRemove.has(edge.to));
    }
    this.init(nodes, edges);
  }

  protected toDisplayNode(node: HIRNode): DisplayNode<HIRNode> {
    let result = super.toDisplayNode(node);
    // floating instruction will be displayed with borderDashes
    if (node.BB == undefined) {
      result.internalGroup = undefined;
      result.group = undefined;
      result.shapeProperties = { 'borderDashes': [5, 5] };
      result.borderWidth = 1;
    } else {
      result.internalGroup = '' + node.BB;
      result.group = '' + node.BB % 8;
      if (node.isCfgNode()) {
        result.borderWidth = 3;
      } else {
        result.borderWidth = 2;
      }
    }
    return result;
  }

  protected getNodeLabel(node: HIRNode, simpleDisplay: boolean): string {
    const primaryLableText = super.getNodeLabel(node, simpleDisplay);
    const type = this.getNodeDisplayType(node.type);
    let htmlElement =
    '<b>' + primaryLableText + '</b>\n\n'
      +  '<i>' + type + '</i>'
       + (node.BB != undefined
        ? this._getSpacing(primaryLableText.length, type.length + (('BB ' + node.BB).length)) + '<i>BB ' + node.BB + '</i>'
        : '');
    return htmlElement;
  }

  getNodeDisplayType(type: string): any {
    return type.replace('TypeID', '');
  }

  private _getSpacing(primaryLabelLength: number, secondaryLabelLength: number): string {
    let nonBreakableSpaces = '';
    if (secondaryLabelLength >= primaryLabelLength) {
      primaryLabelLength = secondaryLabelLength;
    }
    primaryLabelLength += 2;
    for (let i = secondaryLabelLength; i < primaryLabelLength; i++) {
      nonBreakableSpaces += ' '; // special invisible char (alt + 255)
    }
    return nonBreakableSpaces;
  }

  protected toDisplayEdge(edge: HIREdge): DisplayEdge<HIREdge> {
    let result = super.toDisplayEdge(edge);
    if (edge.edgeType == HIREdgeType.op) {
      result.arrows = {to: {enabled: true, type: 'circle'}};
    } else if (edge.edgeType == HIREdgeType.bb) {
      result.arrows = {to: {enabled: false}};
    }

    return result;
}

  protected getEdgeLabel(edge: HIREdge): string {
    if (edge.edgeType == HIREdgeType.cfg && edge.trueBranch != undefined) {
      return edge.trueBranch ? 'T' : 'F';
    }

    switch (edge.edgeType) {
      case HIREdgeType.bb: return 'bb';
      case HIREdgeType.op: return 'op';
      case HIREdgeType.sched: return 'sched';
      case HIREdgeType.cfg: return 'cfg';
      default: return 'unknown';
    }
  }

  toJSONGraphLegend (): JSON {
    const nodes = [
      {id: 1, label: 'BB', level: 0, color: this.getNodeBackgroundColor(HIRNodeType.GOTOInst, false), title: 'basic block with "GOTO" as EndInst'},
      {id: 2, label: 'IF', level: 1, color: this.getNodeBackgroundColor(HIRNodeType.IFInst, false), title: 'basic block with an "IF" as EndInst'},
      {id: 3, label: 'BB', level: 2, color: this.getNodeBackgroundColor(HIRNodeType.GOTOInst, false), title: 'basic block with an "GOTO" as EndInst'},
      {id: 4, label: 'Return', level: 2, color: this.getNodeBackgroundColor(HIRNodeType.RETURNInst, false), title: 'basic block with an "RETURN" as EndInst'}
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
}
