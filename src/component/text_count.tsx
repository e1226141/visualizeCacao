import * as React from 'react';

export interface ITextCountProps {
    value: string;
    type: string;
    title: string;
}

export class TextCount extends React.Component<ITextCountProps, {}> {

  render() {
    return (
      <div style={{justifyContent: 'space-between'}}>
          <div style={{fontWeight: 'bold', fontSize: '120%', display: 'inline', marginRight: '4px'}} title={this.props.title}>
            {this.props.value}
          </div>
          {this.props.type}
      </div>
    );
  }
}