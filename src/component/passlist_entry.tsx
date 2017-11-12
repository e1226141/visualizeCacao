import * as React from 'react';
import {IPass}  from '../data';

export interface IPassListEntryProps {
  pass: IPass;
  handleClick: (pass: IPass) => void;
}

export class PassListEntry extends React.Component<IPassListEntryProps, {}> {

  constructor(props: IPassListEntryProps) {
    super(props);
    // this.props.handleClick = this.props.handleClick.bind(this);
  }

  render() {
    return (
      <button onClick={() => this.props.handleClick(this.props.pass)}>
        {this.props.pass.name}
      </button>
    );
  }
}