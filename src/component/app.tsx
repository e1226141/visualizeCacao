import * as React from 'react';
import { HIR } from './hir';
import { OptimizedMethod } from '../data';

export interface AppProps {
  optimizedMethod: OptimizedMethod;
}

export class App extends React.Component<AppProps, {}> {
  // enable this flag to generate a template for the NodeType enum from data.ts
  private showNodeNames = false;

  // helper method which lists all unique node names to create an enum
  private listNodeNames(): void {

    const nodeNameSet = new Set();
    this.props.optimizedMethod.passes.forEach(pass => {
      pass.nodes.forEach(node => nodeNameSet.add(node.name));
    });
    console.log(Array.from(nodeNameSet).sort().join(',\n'));
  }

  render() {
    if (this.showNodeNames) {
      this.listNodeNames();
    }
    return (
      <HIR optimizedMethod={this.props.optimizedMethod} />
    );
  }
}
