import * as React from 'react';
import { Pass, MachineInstruction } from '../data';
import { List } from 'semantic-ui-react';

export interface ILirListViewProps {
  pass: Pass;
}

export class LirListView extends React.Component<ILirListViewProps, {}> {
  constructor(props: ILirListViewProps) {
    super(props);
    this.state = {};
  }
  render() {
    const LIR = this.props.pass.lir;
    if (!LIR) {
      return <div></div>;
    }
    console.log('test');

    const maxPadding = LIR.instructions.map(i => i.id).reduce( (a, b) => Math.max(a, b)).toString().length;
    const instructionList = LIR.instructions.map(instruction => this.instructionToString(instruction, maxPadding));
    console.log(instructionList);
    return (
      <List>
        {instructionList.map(item => this.createListItem(item))}
      </List>
    );
  }

  private createListItem(text: string) {
    return (
      <List.Item>{text}</List.Item>
    );
  }

  private leftPad(value: number, padLength: number) {
    let pad = new Array(1 + padLength).join('0');
    return (pad + value).slice(-pad.length);
  }

  private instructionToString = (instruction: MachineInstruction, maxPadding: number): string => {
    let result = this.leftPad(instruction.id, maxPadding) + ': ' + instruction.name + '';
    if (instruction.operands != null && instruction.operands.length > 0) {
      result += ' ' + instruction.operands;
    }
    if (instruction.result != null && instruction.result != '') {
      result += ' -> ' + instruction.result;
    }
    if (instruction.successors != null && instruction.successors.length > 0) {
      result += ' ' + instruction.successors;
    }
    return result;
  }

  removeMBBFromString(successor: string): string {
    const index = successor.indexOf('=');
    if (index == -1) {
      return successor;
    }
    return successor.substring(index + 1);
  }
}
