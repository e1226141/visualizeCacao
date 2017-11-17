import * as React from 'react';
import {IPass, INode, IEdge} from '../data';
import Graph from 'react-graph-vis';

export interface IControlFlowProps {
    pass: IPass;
}

// style='position: relative; touch-action: none; user-select: none; -webkit-user-drag: none;
//  -webkit-tap-highlight-color: rgba(0, 0, 0, 0); width: 100%; height: 100%;'

//  style='position: relative; overflow: hidden; touch-action: pan-y; user-select: none;
//  -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); width: 100%; height: 100%;'

export class ControlFlow extends React.Component<IControlFlowProps, {}> {

  convertNode(node: INode): any {
    return {
      'id' : node.id,
      'label' :  node.name,
      'color' : '#e04141'
      };
  }

  convertEdge(edge: IEdge): any {
    return {
      'from': edge.from,
      'to':  edge.to,
      'label': edge.type
      };
  }

  toGraph(pass: IPass): JSON {
    let graph: any = {
      'nodes': pass.nodes.map(this.convertNode),
      'edges': pass.edges.map(this.convertEdge)
    };
    return graph as JSON;
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

  render() {
    const graph: JSON = this.toGraph(this.props.pass);
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
        <h2>{this.props.pass.name}</h2>
        <div id='cfgNetwork'>
            <div className='vis-network'>
            <Graph graph={graph} options={options} events={events} style={{ height: '640px' }} />
          </div>
        </div>
      </div>
    );
  }
}