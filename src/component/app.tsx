import * as React from 'react';
import { Title } from './title';
import { PassList } from './passlist';
import { IOptimizedMethod } from '../data';

export interface AppInput {
  optimizedMethod: IOptimizedMethod;
}

export class App extends React.Component<AppInput, undefined> {

  render() {
    return (
      <div>
        <Title value={this.props.optimizedMethod.method} />
        <PassList passes={this.props.optimizedMethod.passes} />
      </div>
    );
  }
}
