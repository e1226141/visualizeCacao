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
    let onClick = this.handleClick.bind(this);
    let state: IPassListState = this.state;
    return (
        <div>
          {this.props.passes.map(function(pass, index) {
            const disabled = !pass.nodes || pass.nodes.length == 0;
            const className = (state.activeIndex == index) ? 'pass_button pass_button_active' : 'pass_button';

            return (
              <div key={uuid()}>
                <PassListEntry passName={pass.name} disabled={disabled} onClick={onClick} className={className} index={index} />
              </div>
            );
           })}
        </div>
    );
  }
}