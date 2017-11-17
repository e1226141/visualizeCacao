import * as React from 'react';
import {IOptimizedMethod, IPass}  from '../data';
import { ControlFlow } from './control_flow';
import { PassList } from './passlist';

export interface IHIRProps {
    optimizedMethod: IOptimizedMethod;
}

export interface IHIRState {
  selectedPass: IPass;
}

export class HIR extends React.Component<IHIRProps, IHIRState> {
  constructor(props: IHIRProps) {
    super(props);
    this.state = {selectedPass: props.optimizedMethod.passes[0]};
  }

  setSelectedPass(newSelectedPass: IPass): void {
    this.setState({selectedPass: newSelectedPass});
  }

  render() {
    return (
       <div className='grid'>
         <PassList passes={this.props.optimizedMethod.passes} handleClick={(pass: IPass) => this.setSelectedPass(pass) } />
         <ControlFlow pass={this.state.selectedPass}></ControlFlow>
       </div>
    );
  }
}