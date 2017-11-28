import * as React from 'react';
import { Pass, Node, Edge } from '../data';
import { NetworkGraph } from './network_graph';
import { NodeSearch } from './node_search';
import { Network } from 'vis';
import { Segment, Checkbox, Statistic, Popup } from 'semantic-ui-react';

export interface IControlFlowProps {
  pass: Pass;
  showBB: boolean;
  onClickShowBB: () => void;
}

export class ControlFlow extends React.Component<IControlFlowProps, {}> {
  private _cfgNetwork: Network;

  getDefaultOptions(): JSON {
    let options: any = {
      'height': '100%',
      'width': '100%',
      'nodes': {
        'shape': 'box',
      },
      'edges': {
        'arrows': {
          'to': {
            'enabled': true
          }
        },
        'smooth': {
          'enabled': true,
          'type': 'discrete'
        }
      },
      'layout': {
        'randomSeed': 5,
        'improvedLayout': true,
        'hierarchical': {
          'enabled': true,
          'levelSeparation': 80,
          'nodeSpacing': 180,
          'blockShifting': true,
          'edgeMinimization': true,
          'parentCentralization': true,
          'direction': 'UD', // UD, DU, LR, RL
          'sortMethod': 'hubsize' // hubsize, directed
        }
      },
      'physics': {
        'enabled': false
      }
    };
    return options as JSON;
  }
  render() {
    const cfgBuilder = new CfgGraphBuilder(
      this.props.pass.nodes.filter(n => n.isCfgNode()),
      this.props.pass.edges.filter(e => e.isCfgEdge()),
      this.props.showBB
    );
    const graph: JSON = cfgBuilder.toJSONGraph();
    const options: JSON = this.getDefaultOptions();

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
      this._cfgNetwork.focus(id, { scale: 1.2 });
    };
    return (
      <div>
          <Segment.Group>
          <Segment floated='left'>
              <NodeSearch graph={graph} valueSelectedHandler={cfgSearchValueSelected}></NodeSearch>
              <Popup trigger={<Checkbox label='BB' checked={this.props.showBB} onClick={() => this.props.onClickShowBB()} />}
                content='combine HIR control flow to basic blocks'
              />
          </Segment>
          <Segment floated='right'>
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
            <NetworkGraph graph={graph} options={options} events={events} style= {{height: '1024px', width: '640px'}} 
            getVisNetwork={ (network) => { this._cfgNetwork = network; } }/>
          </div>
        </div>
      </div>
    );
  }
}

class CfgNode {
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

class CfgEdge {
  from: number;
  to: number;
  type: string;
  trueBranch: boolean;

  // display attributes
  label: string;
  color?: string;
  width?: number;
  backedge?: boolean;
  dashes?: boolean;

  constructor(pEdge: Edge, pLabel: string, pColor?: string, pWidth?: number, pDashes?: boolean) {
    Object.assign(this, pEdge); // copy all attributes with same name
    this.label = pLabel;
    this.color = pColor;
    this.width = pWidth;
    this.dashes = pDashes;
  }
}

class CfgGraphBuilder {
  private _nodes: CfgNode[];
  private _edges: CfgEdge[];
  private _showBB: boolean;
  private _cfgNodeMap: Map<number, CfgNode> = new Map();
  private _cfgEdgeMap: Map<number, Array<CfgEdge>> = new Map();
  private _maxLevel: number = 0;

  constructor(n: Node[], e: Edge[], bb: boolean) {
    this._nodes = n.map(this._toCfgNode);
    this._edges = e.map(this._toCfgEdge);
    this._showBB = bb;

    this.createLookupMaps();
    if (this._showBB) {
      this._collapseToBB();
    }
    const root = this._findRoot();
    this._markBackedges(root, new Set<number>());
    this._edges.filter(e => e.backedge).forEach(e => e.color = '#EE0000');
    this._setHierarchy(root, 0);
  }

  // create node and edge lookups
  private createLookupMaps(): void {
    this._nodes.forEach((n) => { this._cfgNodeMap.set(n.id, n); });
    this._edges.forEach((e) => {
      let edgeList = this._cfgEdgeMap.get(e.from);
      if (edgeList == null) {
        edgeList = [];
        this._cfgEdgeMap.set(e.from, edgeList);
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

  private _toCfgNode = (node: Node): CfgNode => {
    return new CfgNode(node,
      this._getNodeDisplayString(node, true),
      this._getNodeBackgroundColor(node.name)
    );
  }

  private _toCfgEdge = (edge: Edge): CfgEdge => {
    let dashes = edge.type == 'bb' ? true : false;
    return new CfgEdge(edge, edge.type, this._getEdgeColor(edge), 2, dashes);
  }

  private _findRoot = (): CfgNode | undefined => {
    return this._nodes.find(node => node.root);
  }

  private _markBackedges(node: CfgNode | undefined, visitedNodes: Set<number> ) {
    if (node == undefined) {
      return;
    }
    const edges = this._cfgEdgeMap.get(node.id);
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
            const childNode = this._cfgNodeMap.get(edge.to);
            this._markBackedges(childNode, visitedNodes);
        }
        visitedNodes.delete(node.id);
    });
  }

  private _collapseToBB(): void {
    this._nodes = this._nodes.filter((node) => { return node.name === 'BeginInst'; });
    this._nodes.forEach((beginInst) => {

      // BeginInst and EndInst have a 1:1 relationship
      const bbEdgeArray = this._cfgEdgeMap.get(beginInst.id);
      if (!bbEdgeArray) {
        return;
      }
      const bbEdge = bbEdgeArray.filter((e) => { return e.type == 'bb'; })[0];
      const endInst = this._cfgNodeMap.get(bbEdge.to);
      if (!endInst) {
        return;
      }

      // adjust the label
      beginInst.label = 'BB #' + beginInst.id + ' => #' + endInst.id;
      if (endInst.name !== 'GOTOInst') {
        beginInst.label += '\n' + this._getNodeDisplayString(endInst.getNode(), true);
      }

      // adjust outgoing edges to the combined begin block
      const edgeList = this._cfgEdgeMap.get(endInst.id);
      if (edgeList) {
        edgeList.forEach( e => { e.from = beginInst.id; });
      }

      // color is based on the endInsts
      beginInst.color = this._getNodeBackgroundColor(endInst.name);
      beginInst.endInstLink = endInst.id;
    });

    // remove all 'bb' edges
    this._edges = this._edges.filter((e) => { return e.type !== 'bb'; });
  }

 private _setHierarchy = (node: CfgNode | undefined, level: number): void => {
    if (node == undefined || !node.level) {
        return;
    }
    if (level > this._maxLevel) {
        this._maxLevel = level;
    }
    //console.log("set node.level to " + level + " for id: " + node.id + " and type " + node.name);
    if (node.level == undefined || node.level > level) {
        node.level = level;

        // todo use map instead of edges.filter...
        const edges = this._cfgEdgeMap.get(node.id);
        if (edges) {
          edges.forEach(e => {
            const childNode = this._cfgNodeMap.get(e.to);
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
        if (!this._showBB) {
          return '#C7E2FC';
        }
        return '#97C2FC';
      case 'PHIInst':
        return '#FFCA66';
      default:
        return '#97C2FC';
    }
  }

  private _getEdgeColor(edge: Edge): string {
    if (1 == 1) {
      return "red";
    }
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
    let outputValue = '[" + node.id + "]: ' + node.name;
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
