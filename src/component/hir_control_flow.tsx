import * as React from 'react';
import { Pass, HIRNode, HIRNodeType, HIREdge, HIREdgeType, HIRGraphData } from '../data';
import { DisplayNode, DisplayEdge } from '../graph_builder';
import { HirGraphBuilder } from './hir_base';
import { NetworkGraph } from './network_graph';
import { NodeSearch } from './node_search';
import { Network } from 'vis';
import { Segment, Checkbox, Statistic, Popup, Portal, Grid, Message, Icon } from 'semantic-ui-react';

export interface IControlFlowProps {
  pass: Pass;
  showBB: boolean;
  showEdgeLabels: boolean;
  onClickShowBB: () => void;
  onClickShowEdgeLabels: () => void;
  networkGraphStyle: React.CSSProperties;
}

export interface IControlFlowState {
  showLegend: boolean;
}

export class ControlFlow extends React.Component<IControlFlowProps, IControlFlowState> {
  private _cfgNetwork: Network;

  constructor(props: IControlFlowProps) {
    super(props);
    this.state = {
      showLegend: false
    };
    this._onShowLegend = this._onShowLegend.bind(this);
    this._onHideLegend = this._onShowLegend.bind(this);
  }

  private _getDefaultOptions(): JSON {
    let options: any = {
      height: '100%',
      width: '100%',
      nodes: {
        shape: 'box',
        borderWidthSelected: 4
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
        font: {
          align: 'horizontal'
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

  private _onShowLegend = () => this.setState({ showLegend: !this.state.showLegend });
  private _onHideLegend = () => this.setState({ showLegend: false });

  render() {
    const hir: HIRGraphData | undefined = this.props.pass.hir;
    if (!hir) {
      return;
    }
    const cfgBuilder = new CfgGraphBuilder(
      hir.nodes.filter(n => n.isCfgNode()),
      hir.edges.filter(e => e.isCfgEdge()),
      this.props.showBB,
      this.props.showEdgeLabels
    );
    const graph: JSON = cfgBuilder.toJSONGraph();
    const legend: JSON = cfgBuilder.toJSONGraphLegend();
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
    const statisticsLabel = this.props.showBB ? 'BB' : 'cfg-inst';
    const statisticsTooltip = this.props.showBB ? 'number of basic blocks' : 'number of control flow instructions';
    let cfgSearchValueSelected = (selection: any) => {
      console.log('selected: ' + selection.id);
      const id = selection.id;
      this._cfgNetwork.selectNodes( [id] );
      this._cfgNetwork.focus(id, { scale: 1.0 });
    };

    return (
      <div>
          <Segment.Group horizontal raised style={{padding: 0, margin: 0}}>
          <Segment floated='left'>
              <div>
                <Popup trigger={<Checkbox label='BB' checked={this.props.showBB} onClick={() => this.props.onClickShowBB()}
                  style={{paddingRight: '20px'}}/>} content='combine HIR control flow to basic blocks' style={{paddingRight: '20px'}}
                />
                <Popup trigger={<Checkbox label='T/F branches' checked={this.props.showEdgeLabels}
                  onClick={() => this.props.onClickShowEdgeLabels()} style={{paddingRight: '20px'}} />}
                  content='display true/false branches'/>
                <Popup trigger={<Icon name='info circle' size='big' onClick={this._onShowLegend} />}
                  content='displays the legend of the cfg network graph'/>
              </div>
              <NodeSearch graph={graph} valueSelectedHandler={cfgSearchValueSelected} style={{paddingRight: '20px', width: '100%'}} />
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
        <div id='cfgNetwork'>
          <div className='vis-network' width='100%'>
            <NetworkGraph graph={graph} options={options} events={events} style={this.props.networkGraphStyle}
              getVisNetwork={ (network) => { this._cfgNetwork = network; } } />
          </div>
          <Portal onClose={this._onHideLegend} open={this.state.showLegend}
            closeOnDocumentClick={false} closeOnPortalMouseLeave={false}>
            <Segment style={{ left: '30%', position: 'fixed', top: '10%', zIndex: 1000 }} >
                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <Message>
                        <Message.Header>cfg legend by example</Message.Header>
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

class CfgGraphBuilder extends HirGraphBuilder {
  private showBB: boolean;
  private showEdgeLabels: boolean;

  constructor(cfgNodes: HIRNode[], cfgEdges: HIREdge[], pShowBB: boolean, pShowEdgeLabels: boolean) {
    super();
    this.showBB = pShowBB;
    this.showEdgeLabels = pShowEdgeLabels;

    cfgNodes = cfgNodes.filter(node => node.isCfgNode());
    cfgEdges = cfgEdges.filter(edge => edge.isCfgEdge());

    this.init(cfgNodes, cfgEdges);
    if (this.showBB) {
      this.collapseToBB();
      this.createLookupMaps(); // need to refresh the lookup maps
    }
    this.detectAndMarkBackedges(cfgNodes);
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

  protected getEdgeLabel(edge: HIREdge): string {
    if (this.showEdgeLabels && edge.trueBranch != undefined) {
        return edge.trueBranch ? 'T' : 'F';
    }
    return '';
  }

  private collapseToBB(): void {
    this.nodes = this.nodes.filter(node => node.getNode().nodeType === HIRNodeType.BeginInst);
    this.nodes.forEach((beginInst: DisplayNode<HIRNode>) => {

      // BeginInst and EndInst have a 1:1 relationship
      const bbEdgeArray = this.displayEdgeMap.get(beginInst.id);
      if (!bbEdgeArray) {
        return;
      }
      const bbEdge = bbEdgeArray.filter(e => e.getEdge().edgeType === HIREdgeType.bb)[0];
      const endInst = this.displayNodeMap.get(bbEdge.to);
      if (!endInst) {
        return;
      }

      // adjust the label
      beginInst.label = 'BB #' + beginInst.id + ' => #' + endInst.id;
      if (endInst.getNode().nodeType !== HIRNodeType.GOTOInst) {
        beginInst.label += '\n' + this.getNodeLabel(endInst.getNode(), true);
      }

      // adjust outgoing edges to the combined begin block
      const edgeList = this.displayEdgeMap.get(endInst.id);
      if (edgeList) {
        edgeList.forEach( (e: DisplayEdge<HIREdge>) => { e.from = beginInst.id; });
      }

      // color is based on the endInst
      beginInst.setColor(this.getNodeBackgroundColor(endInst.getNode().nodeType, this.showBB));
      beginInst.endInstLink = endInst.id;
    });

    // remove all 'bb' edges
    this.edges = this.edges.filter(e => e.getEdge().edgeType !== HIREdgeType.bb);
  }
}
