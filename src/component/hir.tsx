import * as React from 'react';
import { OptimizedMethod, Pass}  from '../data';
import { ControlFlow } from './control_flow';
import { PassList } from './passlist';
import { IconButton}  from 'material-ui';
import SubjectIcon from 'material-ui/svg-icons/action/subject';

export interface IHIRProps {
    optimizedMethod: OptimizedMethod;
}

export interface IHIRState {
  selectedPass: Pass;
  showBB: boolean;
  showPasses: boolean;
}

export class HIR extends React.Component<IHIRProps, IHIRState> {
  constructor(props: IHIRProps) {
    super(props);
    this.state = {
      selectedPass: props.optimizedMethod.passes[0],
      showBB: true,
      showPasses: true
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

  toggleShowPasses = () => this.setState((prevState) => ({...prevState, showPasses: !this.state.showPasses}));

  render() {
    let gridTEmplateColumns = this.state.showPasses ? '0.1fr 1fr 3fr 3fr' : '0.1fr 0fr 3fr 3fr';
    const style = {
        display: 'grid',
        height: '100%',
        gridTemplateColumns: gridTEmplateColumns,
    };
    let passList = this.state.showPasses
      ? <PassList passes={this.props.optimizedMethod.passes} handleClick={(pass: Pass) => this.setSelectedPass(pass) } />
      : <div></div>;
    return (
        <div>
          <div style={style}>
            <div>
              <IconButton tooltip='show/hide Pass-List' onClick={this.toggleShowPasses}>
                <SubjectIcon/>
              </IconButton>
            </div>
            {passList}
            <ControlFlow pass={this.state.selectedPass} showBB={this.state.showBB} onClickShowBB={this.toggleShowBB.bind(this)} />
            <ControlFlow pass={this.state.selectedPass} showBB={this.state.showBB} onClickShowBB={this.toggleShowBB.bind(this)} />
          </div>
        </div>
    );
  }
}