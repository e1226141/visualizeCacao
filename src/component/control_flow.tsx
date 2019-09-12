import * as React from 'react';
import { Pass, HIRNode, NodeType, Edge, EdgeType, HIRGraphData } from '../data';
import { DisplayNode, DisplayEdge, GraphBuilder } from '../graph_builder';
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
          type: 'continuous'
        },
        chosen: false
      },
      layout: {
        improvedLayout: true,
        hierarchical: {
          enabled: false,
          levelSeparation: 100,
          nodeSpacing: 200,
          treeSpacing: 100,
          blockShifting: true,
          edgeMinimization: true,
          parentCentralization: true,
          direction: 'UD',
          sortMethod: 'hubsize'
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

class CfgGraphBuilder extends GraphBuilder<HIRNode, Edge, DisplayNode<HIRNode>, DisplayEdge<Edge>> {
  private showBB: boolean;
  private showEdgeLabels: boolean;

  constructor(cfgNodes: HIRNode[], cfgEdges: Edge[], pShowBB: boolean, pShowEdgeLabels: boolean) {
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

  private detectAndMarkBackedges(cfgNodes: HIRNode[]) {
    const root = cfgNodes.find(node => node.root === true);
    const backedgeSet = new Set<DisplayEdge<Edge>>();
    this.findBackedges(root, e => e && e.edgeType !== EdgeType.op, new Set<number>(), backedgeSet);
    this.edges
      .filter((e: DisplayEdge<Edge>) => backedgeSet.has(e))
      .forEach((e: DisplayEdge<Edge>) => { e.color = { color: '#EE0000' }; });
  }

  protected findBackedges(node: HIRNode | undefined, ignoredEdges: (edge: Edge) => boolean,
                          visitedNodes: Set<number>, backedgeSet: Set<DisplayEdge<Edge>>) {
    if (node == undefined) {
        return;
    }
    const edges = this.displayEdgeMap.get(node.id);
    if (!edges || edges.length == 0) {
        return;
    }
    visitedNodes.add(node.id);
    edges
        .filter(edge => !backedgeSet.has(edge))
        .forEach(edge => {
            const childId = edge.to;
            if (visitedNodes.has(childId)) {
                backedgeSet.add(edge);
            } else {
                const childNode = this.displayNodeMap.get(edge.to);
                if (childNode != undefined) {
                  this.findBackedges(childNode.getNode(), ignoredEdges, visitedNodes, backedgeSet);
                }
            }
        });
    visitedNodes.delete(node.id);
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

  protected toDisplayNode (node: HIRNode): DisplayNode<HIRNode> {
    const result: DisplayNode<HIRNode> = new DisplayNode<HIRNode>(node, this.getNodeLabel(node, false));
    result.color = this.getNodeBackgroundColor(node.nodeType);
    return result;
  }

  protected toDisplayEdge (edge: Edge): DisplayEdge<Edge> {
    const result: DisplayEdge<Edge> = new DisplayEdge<Edge>(edge, this.getEdgeLabel(edge));
    if (edge.edgeType == EdgeType.bb) {
      result.dashes = true;
    }
    return result;
  }

  private getNodeBackgroundColor(nodeType: NodeType): string {
    if (nodeType == NodeType.GOTOInst && !this.showBB) {
      return '#C7E2FC';
    }
    switch (nodeType) {
      case NodeType.IFInst:
          return '#A1EC76';
      case NodeType.RETURNInst:
          return '#FFA807';
      case NodeType.GOTOInst:
          return '#97C2FC';
      case NodeType.PHIInst:
          return '#FFCA66';
      default:
          return '#97C2FC';
    }
  }

  protected getEdgeLabel(edge: Edge): string {
    if (this.showEdgeLabels && edge.trueBranch != undefined) {
      return edge.trueBranch ? 'T' : 'F';
    }
    return '';
  }

  protected getNodeLabel(node: HIRNode, simpleDisplay: boolean): string {
    if (simpleDisplay) {
        return this.getSimpleNodeLabel(node);
    }
    let outputValue = '[' + node.id + ']: ' + node.name;
    if (node.nodeType === NodeType.CONSTInst) {
        outputValue += ': ' + node.value;
    }
    if (node.operands) {
        outputValue += '[';
        if (node.nodeType === NodeType.IFInst) {
            outputValue += '#' + node.operands[0] + ' ' + this.displayIFCondition(node.condition) + ' #' + node.operands[1];
        } else if (node.nodeType === NodeType.IFAssumptionInst) {
                outputValue += '#' + node.operands[0] + ' ' + this.displayIFCondition(node.condition) + ' #' + node.operands[1];
        } else {
            outputValue += node.operands.map((id) => { return '#' + id; }).toString();
        }
        outputValue += ']';
    }
    return outputValue;
  }

  protected getSimpleNodeLabel(node: HIRNode): string {
    if (node.nodeType === NodeType.CONSTInst) {
        return 'Const: ' + node.value;
    }
    if (node.nodeType === NodeType.RETURNInst) {
        return 'RETURN' + (node.operands ? ' #' + node.operands[0] : '');
    }
    if (node.nodeType === NodeType.IFInst) {
        return 'IF [#' + node.operands[0] + ' ' + this.displayIFCondition(node.condition) + ' #' + node.operands[1] + ']';
    }
    if (node.nodeType === NodeType.IFAssumptionInst) {
        return 'IFAssumption [#' + node.operands[0] + ' ' + this.displayIFCondition(node.condition) + ' #' + node.operands[1] + ']';
    }
    return node.name + (node.operands ? node.operands.map((id) => { return '#' + id; }).toString() : '');
  }

  protected displayIFCondition(condition: string): string {
    switch (condition) {
        case 'GE':
            return '>=';
        case 'GT':
            return '>';
        case 'LE':
            return '<=';
        case 'LT':
            return '<';
        case 'EQ':
            return '==';
        case 'NE':
            return '!=';
        default:
            return '?';
    }
  }

  private collapseToBB(): void {
    this.nodes = this.nodes.filter(node => node.getNode().nodeType === NodeType.BeginInst);
    this.nodes.forEach((beginInst: DisplayNode<HIRNode>) => {

      // BeginInst and EndInst have a 1:1 relationship
      const bbEdgeArray = this.displayEdgeMap.get(beginInst.id);
      if (!bbEdgeArray) {
        return;
      }
      const bbEdge = bbEdgeArray.filter(e => e.getEdge().edgeType === EdgeType.bb)[0];
      const endInst = this.displayNodeMap.get(bbEdge.to);
      if (!endInst) {
        return;
      }

      // adjust the label
      beginInst.label = 'BB #' + beginInst.id + ' => #' + endInst.id;
      if (endInst.getNode().nodeType !== NodeType.GOTOInst) {
        beginInst.label += '\n' + this.getNodeLabel(endInst.getNode(), true);
      }

      // adjust outgoing edges to the combined begin block
      const edgeList = this.displayEdgeMap.get(endInst.id);
      if (edgeList) {
        edgeList.forEach( (e: DisplayEdge<Edge>) => { e.from = beginInst.id; });
      }

      // color is based on the endInsts
      beginInst.color = this.getNodeBackgroundColor(endInst.getNode().nodeType);
      beginInst.endInstLink = endInst.id;
    });

    // remove all 'bb' edges
    this.edges = this.edges.filter(e => e.getEdge().edgeType !== EdgeType.bb);
  }

  /*
  private collapseToBB(): void {
    this.nodes = this.nodes.filter(node => node.nodeType === NodeType.BeginInst);
    this.nodes.forEach((beginInst: DisplayNode) => {

      // BeginInst and EndInst have a 1:1 relationship
      const bbEdgeArray = this.displayEdgeMap.get(beginInst.id);
      if (!bbEdgeArray) {
        return;
      }
      const bbEdge = bbEdgeArray.filter(e => e.edgeType === EdgeType.bb)[0];
      const endInst = this.displayNodeMap.get(bbEdge.to);
      if (!endInst) {
        return;
      }

      // adjust the label
      beginInst.label = 'BB #' + beginInst.id + ' => #' + endInst.id;
      if (endInst.nodeType !== NodeType.GOTOInst) {
        beginInst.label += '\n' + this.getNodeDisplayString(endInst.getNode(), true);
      }

      // adjust outgoing edges to the combined begin block
      const edgeList = this.displayEdgeMap.get(endInst.id);
      if (edgeList) {
        edgeList.forEach( (e: DisplayEdge) => { e.from = beginInst.id; });
      }

      // color is based on the endInsts
      beginInst.color = this.getNodeBackgroundColor(endInst.nodeType);
      beginInst.endInstLink = endInst.id;
    });

    // remove all 'bb' edges
    this.edges = this.edges.filter(e => e.edgeType !== EdgeType.bb);
  }

 */
}
