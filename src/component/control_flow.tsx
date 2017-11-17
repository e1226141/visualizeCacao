import * as React from 'react';
import {Pass, Node, Edge} from '../data';
import {Title} from './Title';
import Graph from 'react-graph-vis';

export interface IControlFlowProps {
    pass: Pass;
}

export class ControlFlow extends React.Component<IControlFlowProps, {}> {

  convertNode(node: Node): any {
    return {
      'id' : node.id,
      'label' :  node.name,
      'color' : '#e04141'
      };
  }

  convertEdge(edge: Edge): any {
    return {
      'from': edge.from,
      'to':  edge.to,
      'label': edge.type
      };
  }

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
    const cfgNodes = this.props.pass.nodes.filter(n => n.isCfgNode());
    const cfgEdges = this.props.pass.edges.filter(e => e.isCfgEdge());
    const graph: JSON = Pass.toJSON(cfgNodes, cfgEdges, this.convertNode, this.convertEdge);
    
    const options: JSON = this.getDefaultOptions();

    const events = {
      select: function(event: any) {
        let { nodes, edges } = event;
        console.log('Selected nodes:');
        console.log(nodes);
        console.log('Selected edges:');
        console.log(edges);
      }
    };

    return (
      <div>
        <Title value={this.props.pass.name} />
        <div id='cfgNetwork'>
            <div className='vis-network' width='100%'>
              <Graph graph={graph} options={options} events={events} style={{ height: '640px' }} />
          </div>
        </div>
      </div>
    );
  }
}