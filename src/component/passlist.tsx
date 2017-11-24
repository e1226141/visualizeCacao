import * as React from 'react';
import { Pass }  from '../data';
import { PassListEntry }  from './passlist_entry';
import { v4 as uuid } from 'uuid';

export interface IPassListProps {
  passes: Pass[];
  handleClick: (pass: IPass) => void;
}

export interface IPassListState {
  activeIndex: number;
}

export class PassList extends React.Component<IPassListProps, IPassListState> {

  constructor(props: IPassListProps) {
    super(props);
    this.state = {activeIndex: -1};
  }

  handleClick(index: number): void {
    this.setState(() => ({ activeIndex: index }));
    this.props.handleClick(this.props.passes[index]);
  }

  render() {
    const onClick = this.handleClick.bind(this);
    const state = this.state;
    const listItems = this.props.passes.map(function(pass, index) {
      const selected = state.activeIndex == index;
      const disabled = !pass.nodes || pass.nodes.length == 0;
      return (
        <div key={ pass.name + index}>
          <PassListEntry passName={pass.name} disabled={disabled} onClick={onClick} selected={selected} index={index} />
        </div>);
    });

    return (
        <div>{listItems}</div>
    );
  }
}