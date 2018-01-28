import * as React from 'react';
import { HIR } from './hir';
import { OptimizedMethod, Graph, GraphType } from '../data';
import { PassDependencyGraph } from './pass_dependency_graph';
import { PassStatistics } from './pass_statistics';
import { Navigation, PageType } from './navigation';

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
        content = <div>not yet implemented</div>;
        break;
      case PageType.PASS_DEPENDENCY:
        content = <PassDependencyGraph networkGraphStyle={{ height: '1024px' }}
          optimizedMethod={this.props.optimizedMethod} />;
        break;
      default: content = (<div>unknown or unsupported page type: {this.state.pageType} </div>);
    }
    let gridTemplateColumns = '0.1fr 10fr';
    const style = {
      display: 'grid',
      height: '100%',
      gridTemplateColumns: gridTemplateColumns,
    };
    return (
      <div style={style}>
        <Navigation selectedPage={this.state.pageType} onSelectPage={this._onSelectPage.bind(this)}></Navigation>
        {content}
      </div>
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
      const HIR: Graph | undefined = pass.getGraph(GraphType.HIR);
      if (HIR) {
        HIR.nodes.forEach(node => nodeNameSet.add(node.name));
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
      const HIR: Graph | undefined = pass.getGraph(GraphType.HIR);
      if (HIR) {
        HIR.edges.forEach(edge => edgeTypeSet.add(edge.type));
      }
    });
    console.log(Array.from(edgeTypeSet).sort().join(',\n'));
  }
}
