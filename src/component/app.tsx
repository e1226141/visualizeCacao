import * as React from 'react';
import { HIR } from './hir';
import { LIRView } from './lir_view';
import { OptimizedMethod } from '../data';
import { PassDependencyGraph } from './pass_dependency_graph';
import { PassStatistics } from './pass_statistics';
import { Navigation, PageType } from './navigation';
import SplitterLayout from 'react-splitter-layout';

export interface AppProps {
  optimizedMethod: OptimizedMethod;
}

export interface AppState {
  pageType: PageType;
}

export class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = {
      pageType: PageType.MAIN
    };
  }

  render() {
    return (
      <SplitterLayout primaryIndex={1} secondaryInitialSize={70}>
        <div>
          <Navigation selectedPage={this.state.pageType} onSelectPage={this._onSelectPage.bind(this)}></Navigation>
        </div>
        <div>
          <PassStatistics optimizedMethod={this.props.optimizedMethod} show={this.state.pageType == PageType.MAIN} />
          <HIR optimizedMethod={this.props.optimizedMethod} show={this.state.pageType == PageType.HIR} />
          <LIRView optimizedMethod={this.props.optimizedMethod} show={this.state.pageType == PageType.LIR} />
          <PassDependencyGraph optimizedMethod={this.props.optimizedMethod} show={this.state.pageType == PageType.PASS_DEPENDENCY} />
        </div>
      </SplitterLayout>
    );
  }

  private _onSelectPage(newPageType: PageType): void {
    // console.log('_changeToPage: ' + newPageType);
    if (this.state.pageType != newPageType) {
      this.setState((prevState) => ({ ...prevState, pageType: newPageType }));
    }
  }
}
