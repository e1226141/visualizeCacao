import * as React from 'react';
import { PassList } from './passlist';
import { ControlFlow } from './control_flow';
import { IOptimizedMethod, IPass } from '../data';

export interface AppProps {
  optimizedMethod: IOptimizedMethod;
}

export interface AppState {
  selectedPass: IPass;
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {selectedPass: props.optimizedMethod.passes[0]};
  }

  setSelectedPass(newPass: IPass): void {
    this.setState({selectedPass: newPass});
  }

  // <Title value={this.props.optimizedMethod.method} />

  render() {
    return (
      <div className='grid'>
        <PassList passes={this.props.optimizedMethod.passes} handleClick={(pass: IPass) => this.setSelectedPass(pass) } />
        <ControlFlow pass={this.state.selectedPass}></ControlFlow>
      </div>
    );
  }
}
