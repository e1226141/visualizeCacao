import * as React from 'react';

export interface ITitleProps {
    value: string;
}

export class Title extends React.Component<ITitleProps, {}> {
  render() {
    return (
        <h2>{this.props.value}</h2>
    );
  }
}