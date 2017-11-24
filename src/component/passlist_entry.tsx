import * as React from 'react';
import { FlatButton }  from 'material-ui';
import { cyan300 } from 'material-ui/styles/colors';

export interface IPassListEntryProps {
  passName: string;
  index: number;
  disabled: boolean;
  selected: boolean;
  onClick: (index: number) => void;
}

export class PassListEntry extends React.Component<IPassListEntryProps, {}> {

  handleClick(index: number): void {
    this.props.onClick(index);
  }

  shouldComponentUpdate(nextProps: IPassListEntryProps) {
    return nextProps.selected != this.props.selected || nextProps.index != this.props.index
    || nextProps.disabled != this.props.disabled || nextProps.passName != this.props.passName;
  }

  render() {
    const name = this.props.passName.slice(0, this.props.passName.lastIndexOf('Pass'));
    const backgroundColor = this.props.selected ? cyan300 : '';
    const fontSize = this.props.disabled ? 10 : 14;
    return (
      <FlatButton  labelStyle={{ 'fontSize': fontSize,  'padding': '0px', 'margin': '0px' }} backgroundColor={backgroundColor}
        style = {{ 'height': '28px'}} label={name} disabled={this.props.disabled}
        value={this.props.index} onClick={() => this.handleClick(this.props.index)}/>
    );
  }
}