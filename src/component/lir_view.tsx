import * as React from 'react';
import { OptimizedMethod, Pass } from '../data';
import { PassList } from './passlist';
import { Button, Icon } from 'semantic-ui-react';
import { LirGraphView } from './lir_graph_view';
import { LirListView } from './lir_list_view';
import { Tab } from 'semantic-ui-react';
import SplitterLayout from 'react-splitter-layout';

export interface ILIRViewProps {
  optimizedMethod: OptimizedMethod;
}

export interface ILIRViewState {
  selectedPass: Pass;
  showPasses: boolean;
}

export class LIRView extends React.Component<ILIRViewProps, ILIRViewState> {
  constructor(props: ILIRViewProps) {
    super(props);
    this.state = {
      selectedPass: props.optimizedMethod.passes.filter(p => p.lir != null)[0],
      showPasses: true,
    };
  }

  render() {
    const tabpanes = [
      { menuItem: 'Graph', render: () =>
        <Tab.Pane>
          <LirGraphView pass={this.state.selectedPass} networkGraphStyle={{ height: '1024px' }}/>
        </Tab.Pane> },
      { menuItem: 'List', render: () =>
        <Tab.Pane>
          <LirListView pass={this.state.selectedPass} />
        </Tab.Pane> },
    ];

    let passList = this.state.showPasses
    ? <PassList passes={this.props.optimizedMethod.passes} handleClick={(pass: Pass) => this._setSelectedPass(pass)} ignorePrinterPasses={true}
      showPass={ (pass: Pass) => pass.lir != null } />
    : <div></div>;
    return (
      <div>
        <SplitterLayout horizontal primaryIndex={1} secondaryInitialSize={220}>
          <div>
            <div>
              <Button onClick={() => this._toggleShowPasses()} title='show/hide pass-list'><Icon name='list' size='big' /></Button>
            </div>
            {passList}
          </div>
          <Tab menu={{attached: 'top', secondary: false}} panes={tabpanes} />
        </SplitterLayout>
      </div>
    );
  }

  private _setSelectedPass(newSelectedPass: Pass): void {
    if (this.state.selectedPass != newSelectedPass) {
      this.setState((prevState) => ({ ...prevState, selectedPass: newSelectedPass }));
    }
  }

  private _toggleShowPasses = () => this.setState((prevState) => ({ ...prevState, showPasses: !this.state.showPasses }));
}