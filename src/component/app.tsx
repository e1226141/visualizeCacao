import * as React from 'react';
import { HIR } from './hir';
import { OptimizedMethod } from '../data';

export interface AppProps {
  optimizedMethod: OptimizedMethod;
}

export class App extends React.Component<AppProps, {}> {
  // enable this flag to generate a template for the NodeType and EdgeType enum in data.ts
  private showContainedTypes = false;

  render() {
    if (this.showContainedTypes) {
      this.listNodeNames();
      this.listEdgeTypes();
    }
    return (
      <HIR optimizedMethod={this.props.optimizedMethod} />
    );
  }

  // helper method which lists all unique node names to create an enum
  private listNodeNames(): void {
    console.log('listNodeNames:');
    const nodeNameSet = new Set();
    nodeNameSet.add('Unknown');
    this.props.optimizedMethod.passes.forEach(pass => {
      pass.nodes.forEach(node => nodeNameSet.add(node.name));
    });
    console.log(Array.from(nodeNameSet).sort().join(',\n'));
  }

  // helper method which lists all unique edge types to create an enum
  private listEdgeTypes(): void {
    console.log('listEdgeTypes:');
    const edgeTypeSet = new Set();
    edgeTypeSet.add('Unknown');
    this.props.optimizedMethod.passes.forEach(pass => {
      pass.edges.forEach(edge => edgeTypeSet.add(edge.type));
    });
    console.log(Array.from(edgeTypeSet).sort().join(',\n'));
  }
}
