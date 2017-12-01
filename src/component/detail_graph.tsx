import * as React from 'react';
import { Pass, Node, Edge } from '../data';
import { NetworkGraph } from './network_graph';
import { NodeSearch } from './node_search';
import { Network } from 'vis';
import { Segment, Checkbox, Statistic, Popup, Portal, Grid, Message, Icon } from 'semantic-ui-react';

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
          enabled: true,
          levelSeparation: 80,
          nodeSpacing: 180,
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

  private _onShowLegend = () => this.setState( (prevState) => ({...prevState, showLegend: !this.state.showLegend }));
  private _onHideLegend = () => this.setState( (prevState) => ({...prevState,  showLegend: false }));

  render() {
    const graphBuilder = new DetailGraphBuilder(
      this.props.pass.nodes,
      this.props.pass.edges,
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

class DetailNode {
  id: number;
  name: string;
  root: boolean;

  private _node: Node;
  getNode = (): Node => {
    return this._node;
  }

  // display attributes
  label: string;
  color?: string;
  endInstLink?: number;
  level?: number;

  constructor(pNode: Node, pLabel: string, pColor?: string) {
    Object.assign(this, pNode); // copy all attributes with same name
    this._node = pNode;
    this.label = pLabel;
    this.color = pColor;
  }
}

class DetailEdge {
  from: number;
  to: number;
  type: string;
  trueBranch: boolean;

  // display attributes
  label: string;
  color?: {};
  width?: number;
  backedge?: boolean;
  dashes?: boolean;

  constructor(pEdge: Edge, pLabel: string, pColor?: string, pWidth?: number, pDashes?: boolean) {
    Object.assign(this, pEdge); // copy all attributes with same name
    this.label = pLabel;
    this.color = {'color': pColor};
    this.width = pWidth;
    this.dashes = pDashes;
  }
}

class DetailGraphBuilder {
  private _nodes: DetailNode[];
  private _edges: DetailEdge[];
  private _selectedNode: number;
  private _showAdjacentNodeDistance: number;
  private _detailNodeMap: Map<number, DetailNode> = new Map();
  private _detailEdgeMap: Map<number, Array<DetailEdge>> = new Map();
  private _maxLevel: number = 0;

  constructor(nodes: Node[], edges: Edge[], selectedNode: number, showAdjacentNodeDistance: number) {
    this._nodes = nodes.map(this._toDetailNode);
    this._edges = edges.map(this._toDetailEdge);
    this._selectedNode = selectedNode;
    this._showAdjacentNodeDistance = showAdjacentNodeDistance;

    this.createLookupMaps();
    const root = this._findRoot();
    this._markBackedges(root, new Set<number>());
    this._edges.filter(e => e.backedge).forEach(e => { e.color = {color: '#EE0000'}; });

    // set level 0 for all nodes which couldn't be reached by a dfs
    this._maxLevel = 0;
    this._setHierarchy(root, 0);
    this._nodes.filter(n => n.level == undefined).forEach(n => { n.level = 0; });
  }

  // create node and edge lookups
  private createLookupMaps(): void {
    this._nodes.forEach((n) => { this._detailNodeMap.set(n.id, n); });
    this._edges.forEach((e) => {
      let edgeList = this._detailEdgeMap.get(e.from);
      if (edgeList == null) {
        edgeList = [];
        this._detailEdgeMap.set(e.from, edgeList);
      }
      edgeList.push(e);
    });
  }

  toJSONGraph = (): JSON => {
    let graph: any = {
      'nodes': JSON.parse(JSON.stringify(this._nodes)),
      'edges': JSON.parse(JSON.stringify(this._edges))
    };
    return graph as JSON;
  }

  toJSONGraphLegend = (): JSON => {
    const nodes = [
      {id: 1, label: 'BB', level: 0, color: this._getNodeBackgroundColor('GOTOInst'), title: 'basic block with "GOTO" as EndInst'},
      {id: 2, label: 'IF', level: 1, color: this._getNodeBackgroundColor('IFInst'), title: 'basic block with an "IF" as EndInst'},
      {id: 3, label: 'BB', level: 2, color: this._getNodeBackgroundColor('GOTOInst'), title: 'basic block with an "GOTO" as EndInst'},
      {id: 4, label: 'Return', level: 2, color: this._getNodeBackgroundColor('RETURNInst'), title: 'basic block with an "RETURN" as EndInst'}
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

  private _toDetailNode = (node: Node): DetailNode => {
    return new DetailNode(node,
      this._getNodeDisplayString(node, false),
      this._getNodeBackgroundColor(node.name)
    );
  }

  private _toDetailEdge = (edge: Edge): DetailEdge => {
    const dashes = edge.type == 'bb' ? true : false;
    return new DetailEdge(edge, edge.type, this._getEdgeColor(edge), 2, dashes);
  }

  private _findRoot = (): DetailNode | undefined => {
    return this._nodes.find(node => node.root);
  }

  private _markBackedges(node: DetailNode | undefined, visitedNodes: Set<number> ) {
    if (node == undefined) {
      return;
    }
    const edges = this._detailEdgeMap.get(node.id);
    if (!edges || edges.length == 0) {
      return;
    }
    visitedNodes.add(node.id);
    edges
      .filter(e => e.type !== 'op')
      .forEach(edge => {
        const childId = edge.to;
        if (visitedNodes.has(childId)) {
            edge.backedge = true;
        } else {
            const childNode = this._detailNodeMap.get(edge.to);
            this._markBackedges(childNode, visitedNodes);
        }
        visitedNodes.delete(node.id);
    });
  }

 private _setHierarchy = (node: DetailNode | undefined, level: number): void => {
    if (node == undefined || node.level != null) {
        return;
    }
    if (level > this._maxLevel) {
        this._maxLevel = level;
    }
    //console.log("set node.level to " + level + " for id: " + node.id + " and type " + node.name);
    if (node.level == undefined || node.level > level) {
        node.level = level;

        // todo use map instead of edges.filter...
        const edges = this._detailEdgeMap.get(node.id);
        if (edges) {
          edges.forEach(e => {
            const childNode = this._detailNodeMap.get(e.to);
            this._setHierarchy(childNode, level + 1);
          });
        }
    }
  }

  private _getNodeBackgroundColor = (nodeName: string): string => {
    switch (nodeName) {
      case 'IFInst':
        return '#A1EC76';
      case 'RETURNInst':
        return '#FFA807';
      case 'GOTOInst':
        return '#97C2FC';
      case 'PHIInst':
        return '#FFCA66';
      default:
        return '#97C2FC';
    }
  }

  private _getEdgeColor(edge: Edge): string {
    switch (edge.type) {
      case 'cfg':
        if (edge.trueBranch) {
          // the branches of an 'if' statement get different colors
          if (edge.trueBranch) {
            return '#5aa52b';
          } else {
            return '#7C29F0';
          }
        }
        // otherwise normal control flow
        return '#87B2EC';
      case 'op':
        return '#AD85E4';
      case 'sched':
        return '#FDBFC9';
      default:
        return '#000000';
    }
  }

  private _getNodeDisplayString(node: Node, simpleDisplay: boolean): string {
    if (simpleDisplay) {
      return this._getSimpleNodeDisplayString(node);
    }
    let outputValue = '[' + node.id + ']: ' + node.name;
    if (node.name === 'CONSTInst') {
      outputValue += ': ' + node.value;
    }
    if (node.operands) {
      outputValue += '[';
      if (node.name === 'IFInst') {
        outputValue += '#' + node.operands[0] + ' ' + this._displayIFCondition(node.condition) + ' #' + node.operands[1];
      } else {
        outputValue += node.operands.map((id) => { return '#' + id; }).toString();
      }
      outputValue += ']';
    }
    return outputValue;
  }

  private _getSimpleNodeDisplayString(node: Node): string {
    if (node.name === 'CONSTInst') {
      return 'Const: ' + node.value;
    }
    if (node.name === 'RETURNInst') {
      return 'RETURN' + (node.operands ? ' #' + node.operands[0] : '');
    }
    if (node.name === 'IFInst') {
      return 'IF [#' + node.operands[0] + ' ' + this._displayIFCondition(node.condition) + ' #' + node.operands[1] + ']';
    }
    return node.name + (node.operands ? node.operands.map((id) => { return '#' + id; }).toString() : '') ;
  }

  private _displayIFCondition(cond: string): string {
    switch (cond) {
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
}
