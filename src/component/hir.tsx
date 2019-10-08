import * as React from 'react';
import { OptimizedMethod, Pass, HIRGraphData } from '../data';
import { ControlFlow } from './hir_control_flow';
import { DetailGraph } from './hir_detail_graph';
import { PassList } from './passlist';
import { NetworkGraph } from './network_graph';
import { Button, Icon } from 'semantic-ui-react';
import SplitterLayout from 'react-splitter-layout';

export interface IHIRProps {
  optimizedMethod: OptimizedMethod;
  show: boolean;
}

export interface IHIRState {
  selectedPass: Pass;
  showBB: boolean;
  showPasses: boolean;
  showEdgeLabels: boolean;
  showAdjacentNodeDistance: number;
}

export class HIR extends React.Component<IHIRProps, IHIRState> {
  private _detailNetworkGraph: NetworkGraph;

  constructor(props: IHIRProps) {
    super(props);
    const firstHIRPass = props.optimizedMethod.passes.filter(p => p.hir != null)[0];
    this.state = {
      selectedPass: firstHIRPass,
      showBB: true,
      showPasses: true,
      showEdgeLabels: true,
      showAdjacentNodeDistance: 2
    };
    this._setSelectedPass = this._setSelectedPass.bind(this);
    this._toggleShowBB = this._toggleShowBB.bind(this);
    this._toggleShowPasses = this._toggleShowPasses.bind(this);
    this._toggleShowEdgeLabels = this._toggleShowEdgeLabels.bind(this);
    this._onSelectBB = this._onSelectBB.bind(this);
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
  private _onSelectBB = (selectedBB: number) => {
    if (selectedBB && selectedBB != '') {
      this._detailNetworkGraph.selectNodes([selectedBB]);
    }
    this._detailNetworkGraph.showSurroundingNodes([selectedBB]);
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    const passList = this.state.showPasses
      ? <PassList passes={this.props.optimizedMethod.passes} handleClick={(pass: Pass) => this._setSelectedPass(pass)} ignorePrinterPasses={true}
        showPass={ (pass: Pass) => {
          const graph: HIRGraphData | undefined = pass.hir;
          return graph != null && graph.nodes != null && graph.nodes.length > 0;
        }} initialIndex={this.state.selectedPass.index}/>
      : <div></div>;
    return (
      <div>
        <SplitterLayout vertical={false} percentage={true} primaryIndex={1} primaryInitialSize={85} secondaryInitialSize={10}>
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
                  networkGraphStyle={{ height: '1024px' }}
                  onSelectBB= {(selectedBB: number) => this._onSelectBB(selectedBB)} />
              </div>
              <div>
                <DetailGraph pass={this.state.selectedPass} showAdjacentNodeDistance={this.state.showAdjacentNodeDistance}
                  networkGraphStyle={{ height: '1024px' }}
                  getNetworkGraph={ (networkGraph) => { this._detailNetworkGraph = networkGraph } } />
              </div>
            </SplitterLayout>
          </div>
        </SplitterLayout>
      </div>
    );
  }
}