import * as React from 'react';
import { HIR } from './hir';
import { IOptimizedMethod } from '../data';

export interface AppProps {
  optimizedMethod: IOptimizedMethod;
}

export class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <HIR optimizedMethod={this.props.optimizedMethod} />
    );
  }
}
