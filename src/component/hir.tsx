import * as React from 'react';
import { OptimizedMethod, Pass, GraphType } from '../data';
import { ControlFlow } from './control_flow';
import { DetailGraph } from './detail_graph';
import { PassList } from './passlist';
import { Button, Icon } from 'semantic-ui-react';
import SplitterLayout from 'react-splitter-layout';

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
      selectedPass: props.optimizedMethod.passes.filter(p => p.getGraph(GraphType.HIR) != null)[0],
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
  private _toggleShowPasses = () => this.setState((prevState) => ({ ...prevState, showPasses: !this.state.showPasses }));
  private _toggleShowEdgeLabels = () => {
    this.setState((prevState) => ({ ...prevState, showEdgeLabels: !this.state.showEdgeLabels }));
  }

  render() {
    let passList = this.state.showPasses
      ? <PassList passes={this.props.optimizedMethod.passes} handleClick={(pass: Pass) => this._setSelectedPass(pass)} ignorePrinterPasses={true}
        showPass={ (pass: Pass) => {
          const graph = pass.getGraph(GraphType.HIR);
          return graph != null && graph.nodes != null && graph.nodes.length > 0;
        }} />
      : <div></div>;
    return (
      <div>
        <SplitterLayout horizontal percentage primaryIndex={1} primaryInitialSize={90} secondaryInitialSize={10}>
          <div>
            <div>
              <Button onClick={() => this._toggleShowPasses()} title='show/hide pass-list'><Icon name='list' size='big' /></Button>
            </div>
            {passList}
          </div>
          <div>
            <SplitterLayout horizontal primaryIndex={1} percentage primaryInitialSize={60}>
              <div>
                <ControlFlow pass={this.state.selectedPass} showBB={this.state.showBB} showEdgeLabels={this.state.showEdgeLabels}
                  onClickShowEdgeLabels={this._toggleShowEdgeLabels} onClickShowBB={this._toggleShowBB}
                  networkGraphStyle={{ height: '1024px' }} />
              </div>
              <div>
                <DetailGraph pass={this.state.selectedPass} showAdjacentNodeDistance={this.state.showAdjacentNodeDistance}
                  networkGraphStyle={{ height: '1024px' }} />
              </div>
            </SplitterLayout>
          </div>
        </SplitterLayout>
      </div>
    );
  }
}