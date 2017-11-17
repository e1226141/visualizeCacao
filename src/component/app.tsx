import * as React from 'react';
import { HIR } from './hir';
import { OptimizedMethod } from '../data';

export interface AppProps {
  optimizedMethod: OptimizedMethod;
}

export class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <HIR optimizedMethod={this.props.optimizedMethod} />
    );
  }
}
