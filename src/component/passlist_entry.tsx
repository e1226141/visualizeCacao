import * as React from 'react';

export interface IPassListEntryProps {
  passName: string;
  index: number;
  disabled: boolean;
  className: string;
  onClick: (index: number) => void;
}

export class PassListEntry extends React.Component<IPassListEntryProps, {}> {

  handleClick(event: any): void {
    this.props.onClick(event.target.value);
  }

  render() {
    const name = this.props.passName.slice(0, this.props.passName.lastIndexOf('Pass'));
    return (
      <button disabled={this.props.disabled} className={this.props.className} value={this.props.index} onClick={this.handleClick.bind(this)}>
        {name}
      </button>
    );
  }
}