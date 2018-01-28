import * as React from 'react';
import { OptimizedMethod, Pass, GraphType }  from '../data';
import { ControlFlow } from './control_flow';
import { DetailGraph } from './detail_graph';
import { PassList } from './passlist';
import { Button, Icon } from 'semantic-ui-react';

export interface IHIRProps {
    optimizedMethod: OptimizedMethod;
}

export interface IHIRState {
  selectedPass: Pass;
  showBB: boolean;
  showPasses: boolean;
  showEdgeLabels: boolean;
  showAdjacentNodeDistance: number;
}

export class HIR extends React.Component<IHIRProps, IHIRState> {
  constructor(props: IHIRProps) {
    super(props);
    this.state = {
      selectedPass: props.optimizedMethod.passes[0],
      showBB: true,
      showPasses: true,
      showEdgeLabels: true,
      showAdjacentNodeDistance: 2
    };
    this._setSelectedPass = this._setSelectedPass.bind(this);
    this._toggleShowBB = this._toggleShowBB.bind(this);
    this._toggleShowPasses = this._toggleShowPasses.bind(this);
    this._toggleShowEdgeLabels = this._toggleShowEdgeLabels.bind(this);
  }

  private _setSelectedPass(newSelectedPass: Pass): void {
    if (this.state.selectedPass != newSelectedPass) {
      this.setState((prevState) => ({ ...prevState, selectedPass: newSelectedPass }));
    }
  }

  private _toggleShowBB = () => this.setState((prevState) => ({ ...prevState, showBB: !prevState.showBB }));
  private _toggleShowPasses = () => this.setState((prevState) => ({...prevState, showPasses: !this.state.showPasses}));
  private _toggleShowEdgeLabels = () => {
    this.setState((prevState) => ({...prevState, showEdgeLabels: !this.state.showEdgeLabels}));
  }

  render() {
    let gridTemplateColumns = this.state.showPasses ? '0.1fr 1fr 3fr 3fr' : '0.1fr 0fr 3fr 3fr';
    const style = {
        display: 'grid',
        height: '100%',
        gridTemplateColumns: gridTemplateColumns,
    };
    let passList = this.state.showPasses
      ? <PassList passes={this.props.optimizedMethod.passes} handleClick={(pass: Pass) => this._setSelectedPass(pass)} ignorePrinterPasses={true}
                graphType={GraphType.HIR} />
      : <div></div>;
    return (
        <div>
          <div style={style}>
            <div>
              <Button onClick={() => this._toggleShowPasses()} title='show/hide pass-list'><Icon name='list' size='big' /></Button>
            </div>
            {passList}
            <ControlFlow pass={this.state.selectedPass} showBB={this.state.showBB} showEdgeLabels={this.state.showEdgeLabels}
              onClickShowEdgeLabels={this._toggleShowEdgeLabels} onClickShowBB={this._toggleShowBB}
              networkGraphStyle={{height: '1024px'}}/>
            <DetailGraph pass={this.state.selectedPass} showAdjacentNodeDistance={this.state.showAdjacentNodeDistance}
              networkGraphStyle={{height: '1024px'}}/>
          </div>
        </div>
    );
  }
}