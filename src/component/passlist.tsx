import * as React from 'react';
import {IPass}  from '../data';
import {PassListEntry}  from './passlist_entry';

export interface IPassListProps {
  passes: IPass[];
  handleClick: (pass: IPass) => void;
}

export class PassList extends React.Component<IPassListProps, {}> {
  render() {
    let clickHandler: (pass: IPass) => void = this.props.handleClick;
    return (
        <ul>
          {this.props.passes.map(function(pass) {
            return <div><PassListEntry pass={pass} handleClick={clickHandler}/></div>;
          })}
        </ul>
    );
  }
}