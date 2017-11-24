import * as React from 'react';
import { OptimizedMethod, Pass}  from '../data';
import { ControlFlow } from './control_flow';
import { PassList } from './passlist';

export interface IHIRProps {
    optimizedMethod: OptimizedMethod;
}

export interface IHIRState {
  selectedPass: Pass;
  showBB: boolean;
}

export class HIR extends React.Component<IHIRProps, IHIRState> {
  constructor(props: IHIRProps) {
    super(props);
    this.state = {
      selectedPass: props.optimizedMethod.passes[0],
      showBB: true
    };
  }

  setSelectedPass(newSelectedPass: Pass): void {
    if (this.state.selectedPass != newSelectedPass) {
      this.setState((prevState) => ({ ...prevState, selectedPass: newSelectedPass }));
    }
  }

  toggleShowBB(): void {
    this.setState((prevState) => ({ ...prevState, showBB: !prevState.showBB }));
  }

  render() {
    return (
       <div className='grid'>
         <div>
          <PassList passes={this.props.optimizedMethod.passes} handleClick={(pass: Pass) => this.setSelectedPass(pass) } />
         </div>
         <div>
          <ControlFlow pass={this.state.selectedPass} showBB={this.state.showBB} onClickShowBB={this.toggleShowBB.bind(this)}></ControlFlow>
         </div>
         <div>
         </div>
       </div>
    );
  }
}