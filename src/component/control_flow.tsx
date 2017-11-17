import * as React from 'react';
import { Pass, Node, Edge } from '../data';
import { Title } from './Title';
import Graph from 'react-graph-vis';

export interface IControlFlowProps {
  pass: Pass;
}

export class ControlFlow extends React.Component<IControlFlowProps, {}> {

  getDefaultOptions(): JSON {
    let options: any = {
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

  /*setHierarchy(nodeMap, edgeMap, node, level) {
    if (node.level != null) {
        return;
    }
    if (level > maxLevel) {
        maxLevel = level;
    }
    //console.log("set node.level to " + level + " for id: " + node.id + " and type " + node.name);
    if (typeof node.level == 'undefined' || node.level > level) {
        node.level = level;

        // todo use map instead of edges.filter...
        var edges = edgeMap[node.id];
        if (edges) {
            for (var i = 0; i < edges.length; i++) {
                var childNode = nodeMap[edges[i].to];
                setHierarchy(nodeMap, edgeMap, childNode, level + 1);
            }
        }
    }
  }
   
  function markBackedges(nodeMap, edgeMap, node, visitedNodes) {
  var edges = edgeMap[node.id];
  if (edges) {
      visitedNodes[node.id] = true;
      for (var i = 0; i < edges.length; i++) {
          var edge = edges[i];
          if (edge.type === "op") {
              continue;
          }
          var childId = edge.to;
          if (visitedNodes[childId]) {
              edge.backedge = true;
          } else {
              var childNode = nodeMap[edge.to];
              markBackedges(nodeMap, edgeMap, childNode, visitedNodes);
          }
          visitedNodes[node.id] = false;
      }
  }
}

    function isCfgNode(node) {
        return $.inArray(node.name, ["BeginInst", "GOTOInst", "RETURNInst", "IFInst"]) != -1;
    }

    function isCfgEdge(edge) {
        return $.inArray(edge.type, ["cfg", "bb"]) != -1;
    }

*/

  render() {
    const cfgBuilder = new CfgGraphBuilder(
      this.props.pass.nodes.filter(n => n.isCfgNode()),
      this.props.pass.edges.filter(e => e.isCfgEdge()),
      true /* showBB */
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

    return (
      <div>
        <div id='cfgNetwork'>
          <div className='vis-network' width='100%'>
            <Graph graph={graph} options={options} events={events} style={{ height: '640px' }} />
          </div>
        </div>
      </div>
    );
  }
}

class CfgGraphBuilder {
  nodes: Node[];
  edges: Edge[];
  showBB: boolean;
  private _cfgNodeMap: Map<number, Node> = new Map();
  private _cfgEdgeMap: Map<number, Array<Edge>> = new Map();

  constructor(n: Node[], e: Edge[], bb: boolean) {
    this.nodes = n;
    this.edges = e;
    this.showBB = bb;

    if (this.showBB) {
      this.nodes = this.nodes.slice();
      this.edges = this.edges.slice();
      this.createLookupMaps();
      this.collapseToBB();
    } else {
      this.createLookupMaps();
    }
  }

  // create node and edge lookups
  private createLookupMaps(): void {
    this.nodes.forEach((n) => { this._cfgNodeMap.set(n.id, n); });
    this.edges.forEach((e) => {
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
      'nodes': this.nodes.map(this.convertNode),
      'edges': this.edges.map(this.convertEdge)
    };
    return graph as JSON;
  }

  private convertNode = (node: Node): any => {
    return {
      'id': node.id,
      'label': this.getNodeDisplayString(node, true),
      'color': this.getNodeBackgroundColor(node.name),
      // 'group': node.BB
    };
  }

  private convertEdge = (edge: Edge): any => {
    return {
      'from': edge.from,
      'to': edge.to,
      'label': edge.type,
      'color': this.getEdgeColor(edge),
      'width': 2
    };
  }

  private collapseToBB(): void {
    let cfgNodeData: Node[] = this.nodes.filter((node) => { return node.name === 'BeginInst'; });
    cfgNodeData.forEach((beginInst) => {

      // BeginInst and EndInst have a 1:1 relationship
      let bbEdgeArray = this._cfgEdgeMap.get(beginInst.id);
      if (!bbEdgeArray) {
        return;
      }
      let bbEdge = bbEdgeArray[0];
      let endInst = this._cfgNodeMap.get(bbEdge.to);
      if (!endInst) {
        return;
      }

      // adjust the label
      /* TODO
      beginInst.label = 'BB #' + beginInst.id + ' => #' + endInst.id;
      if (endInst.name !== 'GOTOInst') {
        beginInst.label += '\n' + this.getNodeDisplayString(endInst, true);
      }*/

      // adjust outgoing edges to the combined begin block
      let edgeList = this._cfgEdgeMap.get(endInst.id);
      if (edgeList) {
        edgeList.forEach( e => e.from = beginInst.id );
      }

      // color is based on the endInst
      /*
      TODO
      beginInst.color = this.getNodeBackgroundColor(endInst);
      beginInst.endInstLink = endInst.id;
      */
    });

    // remove all 'bb' edges
    this.edges = this.edges.filter((e) => { return e.type !== 'bb'; });
  }

  private getNodeBackgroundColor = (nodeName: string): string => {
    switch (nodeName) {
      case 'IFInst':
        return '#A1EC76';
      case 'RETURNInst':
        return '#FFA807';
      case 'GOTOInst':
        if (!this.showBB) {
          return '#C7E2FC';
        }
        return '#97C2FC';
      case 'PHIInst':
        return '#FFCA66';
      default:
        return '#97C2FC';
    }
  }

  private getEdgeColor(edge: Edge): string {
    switch (edge.type) {
      case 'cfg':
        if (edge.backedge) {
          return '#EE0000';
        }
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

  private getNodeDisplayString(node: Node, simpleDisplay: boolean): string {
    if (simpleDisplay) {
      return this.getSimpleNodeDisplayString(node);
    }
    let outputValue = '[" + node.id + "]: ' + node.name;
    if (node.name === 'CONSTInst') {
      outputValue += ': ' + node.value;
    }
    if (node.operands) {
      outputValue += '[';
      if (node.name === 'IFInst') {
        outputValue += '#' + node.operands[0] + ' ' + this.displayIFCondition(node.condition) + ' #' + node.operands[1];
      } else {
        outputValue += node.operands.map((id) => { return '#' + id; }).toString();
      }
      outputValue += ']';
    }
    return outputValue;
  }

  private getSimpleNodeDisplayString(node: Node): string {
    if (node.name === 'CONSTInst') {
      return 'Const: ' + node.value;
    }
    if (node.name === 'RETURNInst') {
      let outputValue = '\nRETURN';
      // can be void!
      if (node.operands) {
        outputValue += ' #' + node.operands[0];
      }
      return outputValue;
    }
    if (node.name === 'IFInst') {
      return '\nIF [#' + node.operands[0] + ' ' + this.displayIFCondition(node.condition) + ' #' + node.operands[1] + ']';
    }

    let outputValue = node.name;
    if (node.operands) {
      outputValue += node.operands.map((id) => { return '#' + id; }).toString();
    }
    return outputValue;
  }

  private displayIFCondition(cond: string): string {
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
