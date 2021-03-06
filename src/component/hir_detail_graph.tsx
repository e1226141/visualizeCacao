import * as React from 'react';
import { Pass, HIRNode, HIRNodeType, HIREdge, HIREdgeType, HIRGraphData } from '../data';
import { HirGraphBuilder } from './hir_base';
import { DisplayNode, DisplayEdge } from '../graph_builder';
import { NetworkGraph, NodeSelectorHelper } from './network_graph';
import { NodeSearch } from './node_search';
import { Network, Node} from 'vis';
import { Segment, Statistic, Popup, Portal, Grid, Message, Icon, Checkbox} from 'semantic-ui-react';

export interface IDetailGraphProps {
  pass: Pass;
  showAdjacentNodeDistance: number;
  networkGraphStyle: React.CSSProperties;
  getNetworkGraph?: (network: NetworkGraph) => void;  // expose the NetworkGraph
}

export interface IDetailGraphState {
  showLegend: boolean;
  selectedNode: number;
  hideSourceStates: boolean;
  hideSchedulingEdges: boolean;
}

export class DetailGraph extends React.Component<IDetailGraphProps, IDetailGraphState> {
  private _detailNetwork: Network;
  private _nodeSelector = new NodeSelector();

  constructor(props: IDetailGraphProps) {
    super(props);
    this.state = {
      showLegend: false,
      selectedNode: -1,
      hideSourceStates: true,
      hideSchedulingEdges: true,
    };

    this._toggleHideSourceStates = this._toggleHideSourceStates.bind(this);
    this._toggleHideSchedulingEdges = this._toggleHideSchedulingEdges.bind(this);
    this._onDownload = this._onDownload.bind(this);
  }

  private _toggleHideSourceStates =
    () => this.setState((prevState) => ({ ...prevState, hideSourceStates: !prevState.hideSourceStates }))

  private _toggleHideSchedulingEdges =
    () => this.setState((prevState) => ({ ...prevState, hideSchedulingEdges: !prevState.hideSchedulingEdges }))

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
        font: {
          align: 'top'
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
  private _onDownload = () => {
    const canvas: HTMLCanvasElement = this._detailNetwork.canvas.frame.canvas;
    const link = document.createElement('a');
    link.download = 'HIR.jpg';
    link.href = canvas.toDataURL();
    link.click();
  }

  render() {
    const hir: HIRGraphData | undefined = this.props.pass.hir;
    if (!hir) {
      return;
    }

    const graphBuilder = new DetailGraphBuilder(
      hir.nodes,
      hir.edges,
      this.state.hideSourceStates,
      this.state.hideSchedulingEdges
    );

    const graph: JSON = graphBuilder.toJSONGraph();
    const legend: JSON = graphBuilder.toJSONGraphLegend();
    const options: JSON = this._getDefaultOptions();
    const legendOptions: JSON = this._getOptionsForLegend();

    const events = {
      select: function (event: any) {
        let { nodes } = event;
        console.log('Selected nodes:');
        console.log(nodes);
      }
    };
    const statisticsLabel = 'instructions';
    const statisticsTooltip = 'number of instructions';
    let searchValueSelected = (selection: any) => {
      // console.log('selected: ' + selection.id);
      const id = selection.id;
      this._detailNetwork.selectNodes( [id] );
      this._detailNetwork.focus(id, { scale: 1.1 });
    };

    return (
      <div>
          <Segment.Group horizontal raised style={{padding: 0, margin: 0}}>
          <Segment floated='left'>
              <div>
                <Popup trigger={<Checkbox label='hide source state'
                    checked={this.state.hideSourceStates} onClick={() => this._toggleHideSourceStates()}
                    className='selection-checkbox'/>} content='hides all source state instructions' className='selection-checkbox'/>
                <Popup trigger={<Checkbox label='hide scheduling edges'
                    checked={this.state.hideSchedulingEdges} onClick={() => this._toggleHideSchedulingEdges()}
                    className='selection-checkbox'/>} content='hides all scheduling edges' className='selection-checkbox'/>      
                <Popup trigger={<Icon name='download' size='big' onClick={this._onDownload} />}
                  content='download a screenshot of the HIR'/>
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
              getVisNetwork={ (network) => { this._detailNetwork = network } }
              getNetworkGraph={ (networkGraph) => { 
                if (this.props.getNetworkGraph) {
                    this.props.getNetworkGraph(networkGraph);
                  }
              } }            
              getNodeBlock={ (n: Node) => { return n.internalGroup ? n.internalGroup : n.id; } }
              nodeSelector={this._nodeSelector} />
          </div>
              <Portal onClose={this._onHideLegend} open={this.state.showLegend}
                closeOnDocumentClick={false} closeOnPortalMouseLeave={false}>
                <Segment style={{ left: '25%', width: '25%', position: 'fixed', top: '10%', zIndex: 1000 }} >
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
  private _hideSchedulingEdges: boolean;
  constructor(nodes: HIRNode[], edges: HIREdge[], hideSourceStates: boolean, hideSchedulingEdges: boolean) {
    super();

    let nodeIdsToRemove = new Set<Number>(
      nodes.filter(node => hideSourceStates && node.nodeType == HIRNodeType.SourceStateInst).map(node => node.id));
    if (nodeIdsToRemove.size > 0) {
      nodes = nodes.filter(node => !nodeIdsToRemove.has(node.id));
      edges = edges.filter(edge => !nodeIdsToRemove.has(edge.from)).filter(edge => !nodeIdsToRemove.has(edge.to));
    }
    this._hideSchedulingEdges = hideSchedulingEdges;
    this.init(nodes, edges);

    this._edges.filter(e => e.getEdge().edgeType == HIREdgeType.op).forEach(this.getOperandEdgeLabelWithIndex());
  }

  /**
   * add the operand index for the target node to the edge label.
   */
  private getOperandEdgeLabelWithIndex(): (value: DisplayEdge<HIREdge>, index: number, array: DisplayEdge<HIREdge>[]) => void {
    return e => {
      const sNode = this._displayNodeMap.get(e.from);
      const tNode = this._displayNodeMap.get(e.to);
      let index = '';
      if (sNode && tNode) {
        const sourceNode = sNode.getNode();
        index = ': ' + tNode.getNode().operands.findIndex(operandId => operandId == sourceNode.id);
      }
      e.label = 'op' + index;
    };
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
      result.width = 3;
    } else if (edge.edgeType == HIREdgeType.cfg) {
      result.width = 3;
    } else if (edge.edgeType == HIREdgeType.sched) {
      result.hidden = this._hideSchedulingEdges;
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
      {id: 1, label: '[0]: BeginInst', level: 0, group: 2, borderWidth: 3, title: 'basic block with "IF" statement as EndInst'},
      {id: 2, label: '[5]: IFInst [#9 >= #4]', level: 2, group: 2, borderWidth: 3, title: 'IFInst end-instruction at the end of basic block [0]'},
      {id: 3, label: '[1]: BeginInst', level: 3, group: 3, borderWidth: 3, title: 'basic block with an "RETURN" as last instruction'},
      {id: 4, label: '[8]: ReturnInst', level: 4, group: 3, borderWidth: 3, title: 'Return Instruction at the end of basic block [1]'},
      {id: 5, label: '[9]: ConstInst: 1', level: 1, group: 0, borderWidth: 2,
        shapeProperties: { 'borderDashes': [5, 5] }, title: 'a floating instruction is not assigned to any basic block'},
      {id: 6, label: '[3]: BeginInst', level: 3, group: 5, borderWidth: 3, title: 'basic block with "GOTO" as EndInst'},
      {id: 7, label: '[4]: PHIInst', level: 1, group: 2, borderWidth: 3, title: 'PHI statement belonging to basic block 2'}
    ];
    const edges = [
      {from: 1, to: 2, label: 'bb', color: {color: '#000000'}, dashes: true},
      {from: 3, to: 4, label: 'bb', color: {color: '#000000'}, dashes: true},
      {from: 2, to: 3, label: 'T', color: {color: '#5aa52b'}, title: 'true branch of an if statement'},
      {from: 2, to: 6, label: 'F', color: {color: '#7C29F0'}, title: 'false branch of an if statement'},
      {from: 5, to: 2, label: 'op: 0', color: {color: '#808080'}, title: 'first operand of the IF Statement'},
      {from: 7, to: 2, label: 'op: 1', color: {color: '#808080'}, title: 'second operand of the IF Statement'},
    ];
    let graph: any = {
      'nodes': JSON.parse(JSON.stringify(nodes)),
      'edges': JSON.parse(JSON.stringify(edges))
    };
    return graph as JSON;
  }

}

class NodeSelector extends NodeSelectorHelper {
  public getNodesForSelection(networkRef: Network, selectedNode: any, allNodes: vis.Node[]): vis.Node[] {
    const nodes = super.getNodesForSelection(networkRef, selectedNode, allNodes);
    nodes.forEach(n => this.getConnectedVisNodes(networkRef, n.id, allNodes).forEach(connNode => nodes.push(connNode)));
    return nodes;
  }
}