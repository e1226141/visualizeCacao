import * as React from 'react';
import { HIR } from './hir';
import { LIRView } from './lir_view';
import { OptimizedMethod, HIRGraphData } from '../data';
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
      this.listNodeNames();
      this.listEdgeTypes();
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
        content = <PassDependencyGraph networkGraphStyle={{ height: '1024px' }}
          optimizedMethod={this.props.optimizedMethod} />;
        break;
      default: content = (<div>unknown or unsupported page type: {this.state.pageType} </div>);
    }
    return (
      <SplitterLayout horizontal primaryIndex={1} secondaryInitialSize={70}>
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

  // helper method which lists all unique node names to create an enum
  private listNodeNames(): void {
    console.log('listNodeNames:');
    const nodeNameSet = new Set();
    nodeNameSet.add('Unknown');
    this.props.optimizedMethod.passes.forEach(pass => {
      const hir: HIRGraphData | undefined = pass.hir;
      if (hir) {
        hir.nodes.forEach(node => nodeNameSet.add(node.name));
      }
    });
    console.log(Array.from(nodeNameSet).sort().join(',\n'));
  }

  // helper method which lists all unique edge types to create an enum
  private listEdgeTypes(): void {
    console.log('listEdgeTypes:');
    const edgeTypeSet = new Set();
    edgeTypeSet.add('Unknown');
    this.props.optimizedMethod.passes.forEach(pass => {
      const hir: HIRGraphData | undefined = pass.hir;
      if (hir) {
        hir.edges.forEach(edge => edgeTypeSet.add(edge.type));
      }
    });
    console.log(Array.from(edgeTypeSet).sort().join(',\n'));
  }
}
