import * as React from 'react';
import {IPass} from '../data';

export interface IControlFlowProps {
    pass: IPass;
}

export class ControlFlow extends React.Component<IControlFlowProps, {}> {
  render() {
    return (
        <h2>{this.props.pass.name}</h2>
    );
  }
}