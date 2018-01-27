import * as React from 'react';
import { HIR } from './hir';
import { OptimizedMethod, Pass, Graph } from '../data';
import { Navigation, PageType } from './navigation';
import { Segment, Header, List, Button, Icon } from 'semantic-ui-react';

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
        content = this._renderMainPage();
        break;
      case PageType.HIR:
        content = this._renderHIR();
        break;
      case PageType.MAIN:
        content = this._renderLIR();
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
      this.setState((prevState) => ({ ...prevState, pageType: newPageType}));
    }
  }

  //<HIR optimizedMethod={this.props.optimizedMethod} />
  private _renderMainPage(): any {
    const totalTime = this.props.optimizedMethod.passes.map(pass => pass.time).reduce((pv, cv) => pv + cv, 0);
    const returnType = this.getReturnType(this.props.optimizedMethod.desc);
    const parameterTypes = this.getParameterTypes(this.props.optimizedMethod.desc);
    return (
        <div>
          <Segment raised>
            <Header as='h2'>
              {this.props.optimizedMethod.class}
            </Header>
            <Header as='h1'>
            {returnType} {this.props.optimizedMethod.method} ({parameterTypes});
          </Header>
          </Segment>
          <Segment>
            <Header as='h3'>
              number of passes: {this.props.optimizedMethod.passes.length} <br/>
              total time: {totalTime} ns
            </Header>
            <List>
              {this.props.optimizedMethod.passes.map((pass, index) => this._createPassEntry(pass, index))}
            </List>
          </Segment>
        </div>
    );
  }

  private _renderHIR(): any {
    return (<HIR optimizedMethod={this.props.optimizedMethod} />);
  }

  private _renderLIR(): any {
    return (<div>not yet implemented</div>);
  }

  private _createPassEntry(pass: Pass, index: number): any {
    return (
      <List.Item key={index}>{pass.name} ({pass.time}ns)</List.Item>
    );
  }

  private getReturnType(signature: string): string {
    const index: number = signature.lastIndexOf(')') + 1;
    if (index == signature.length) {
      return 'void';
    }
    return this.getTypeDisplayName(signature.substring(index));
  }

  private getParameterTypes(signature: string): string {
    signature = signature.substring(signature.indexOf('(') + 1, signature.lastIndexOf(')'));

    let recognizedTypes: string = '';
    let nextParameterType = '';
    while (signature.length > 0) {
      const curChar = signature.charAt(0);
      signature = signature.substring(1);
      nextParameterType += curChar;

      if (curChar == '[') {
        continue;
      } else if (curChar == 'L') {
        // parse class name
        const index = signature.indexOf(';') + 1;
        nextParameterType += signature.substring(0, index);
        signature = signature.substring(index);
      }
      if (recognizedTypes.length > 0) {
        recognizedTypes += ', ';
      }
      recognizedTypes += this.getTypeDisplayName(nextParameterType);
      nextParameterType = '';
    }
    console.log('recognizedTypes: ' + recognizedTypes);
    return recognizedTypes;
  }

  // https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-4.html
  /*
  B	byte	signed byte
  C	char	Unicode character code point in the Basic Multilingual Plane, encoded with UTF-16
  D	double	double-precision floating-point value
  F	float	single-precision floating-point value
  I	int	integer
  J	long	long integer
  L ClassName ;	reference	an instance of class ClassName
  S	short	signed short
  Z	boolean	true or false
  [	reference	one array dimension
  */
  private getTypeDisplayName(typeString: string): string {
    switch (typeString) {
      case 'B': return 'byte';
      case 'C': return 'char';
      case 'D': return 'double';
      case 'F': return 'float';
      case 'I': return 'int';
      case 'L': return 'long';
      case 'S': return 'short';
      case 'Z': return 'boolean';
    }
    if (typeString.startsWith('L')) {
      return typeString.substring(1);
    }
    if (typeString.startsWith('[')) {
      return this.getTypeDisplayName(typeString.substring(1)) + '[]';
    }
    console.log('unsupported type string: ' + typeString);
    return typeString;
  }

  // helper method which lists all unique node names to create an enum
  private listNodeNames(): void {
    console.log('listNodeNames:');
    const nodeNameSet = new Set();
    nodeNameSet.add('Unknown');
    this.props.optimizedMethod.passes.forEach(pass => {
      const HIR: Graph | undefined = pass.getGraph('HIR');
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
      const HIR: Graph | undefined = pass.getGraph('HIR');
      if (HIR) {
        HIR.edges.forEach(edge => edgeTypeSet.add(edge.type));
      }
    });
    console.log(Array.from(edgeTypeSet).sort().join(',\n'));
  }
}
