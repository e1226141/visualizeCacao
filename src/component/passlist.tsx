import * as React from 'react';
import { Pass }  from '../data';
import { Button } from 'semantic-ui-react';

export interface IPassListProps {
  passes: Pass[];
  handleClick: (pass: Pass) => void;
  ignorePrinterPasses: boolean;
  showPass: (pass: Pass) => boolean;
}

export interface IPassListState {
  activeIndex: number;
}

export class PassList extends React.Component<IPassListProps, IPassListState> {

  constructor(props: IPassListProps) {
    super(props);
    this.state = {activeIndex: -1};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(index: number): void {
    this.setState(() => ({ activeIndex: index }));
    this.props.handleClick(this.props.passes[index]);
  }

  render() {
    return (
      <div>
        <Button.Group vertical>
        {this.props.passes.map( (pass, index) => this._createListEntry(this.state, pass, index))}
      </Button.Group>
      </div>
    );
  }

  private _getPassDisplayName(passName: string): string {
    let passIndex = passName.lastIndexOf('Pass');
    if (passIndex == undefined) {
      passIndex = passName.length - 1;
    }
    return passName.slice(0, passIndex);
  }

  private _createListEntry(state: IPassListState, pass: Pass, index: number): any  {

    if (!this.props.showPass(pass)) {
      return;
    }
    const name = this._getPassDisplayName(pass.name);
    if (this.props.ignorePrinterPasses && name.endsWith('Printer')) {
      return;
    }
    const active = state.activeIndex === index;
    return (
      <Button
        key={ name + index}
        active={active}
        fluid={true}
        compact={true}
        value={index}
        size='tiny'
        onClick={() => this.handleClick(index)}>
      {name}
      </Button>
    );
  }
}