import * as React from 'react';
import { OptimizedMethod, Pass}  from '../data';
import { ControlFlow } from './control_flow';
import { PassList } from './passlist';

export interface IHIRProps {
    optimizedMethod: OptimizedMethod;
}

export interface IHIRState {
  selectedPass: Pass;
}

export class HIR extends React.Component<IHIRProps, IHIRState> {
  constructor(props: IHIRProps) {
    super(props);
    this.state = {selectedPass: props.optimizedMethod.passes[0]};
  }

  setSelectedPass(newSelectedPass: Pass): void {
    if (this.state.selectedPass != newSelectedPass) {
      this.setState({selectedPass: newSelectedPass});
    }
  }

  render() {
    return (
       <div className='grid'>
         <div>
          <PassList passes={this.props.optimizedMethod.passes} handleClick={(pass: Pass) => this.setSelectedPass(pass) } />
         </div>
         <div>
          <ControlFlow pass={this.state.selectedPass}></ControlFlow>
         </div>
         <div>
         </div>
       </div>
    );
  }
}