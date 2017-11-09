import * as React from 'react';
import {IPass}  from '../data';

export interface IPassListInput {
  passes: IPass[];
}

export class PassList extends React.Component<IPassListInput, {}> {
  render() {
    return (
        <ul>
          {this.props.passes.map(function(pass){
            return <li>{pass.name}</li>;
          })}
        </ul>
    );
  }
}