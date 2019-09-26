import * as React from 'react';
import { HIR } from './hir';
import { LIRView } from './lir_view';
import { OptimizedMethod } from '../data';
import { PassDependencyGraph } from './pass_dependency_graph';
import { PassStatistics } from './pass_statistics';
import { Navigation, PageType } from './navigation';
import SplitterLayout from 'react-splitter-layout';
import { Util } from './util';

export interface AppProps {
  optimizedMethod: OptimizedMethod;
}

export interface AppState {
  pageType: PageType;
}

export class App extends React.Component<AppProps, AppState> {
  // enable this flag to generate a template for the NodeType and EdgeType enum in data.ts
  private showContainedTypes = false;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      pageType: PageType.MAIN
    };
  }

  render() {
    if (this.showContainedTypes) {
      Util.listNodeNames(this.props.optimizedMethod.passes);
      Util.listEdgeTypes(this.props.optimizedMethod.passes);
    }
    let content;
    switch (this.state.pageType) {
      case PageType.MAIN:
        content = <PassStatistics optimizedMethod={this.props.optimizedMethod} />;
        break;
      case PageType.HIR:
        content = <HIR optimizedMethod={this.props.optimizedMethod} />;
        break;
      case PageType.LIR:
        content = <LIRView optimizedMethod={this.props.optimizedMethod} />;
        break;
      case PageType.PASS_DEPENDENCY:
        content = <PassDependencyGraph optimizedMethod={this.props.optimizedMethod} />;
        break;
      default: content = (<div>unknown or unsupported page type: {this.state.pageType} </div>);
    }
    return (
      <SplitterLayout primaryIndex={1} secondaryInitialSize={70}>
        <div><Navigation selectedPage={this.state.pageType} onSelectPage={this._onSelectPage.bind(this)}></Navigation></div>
        <div>{content}</div>
      </SplitterLayout>
    );
  }

  private _onSelectPage(newPageType: PageType): void {
    console.log('_changeToPage: ' + newPageType);
    if (this.state.pageType != newPageType) {
      this.setState((prevState) => ({ ...prevState, pageType: newPageType }));
    }
  }
}
