import * as React from 'react';
import { Pass, MachineInstruction, LIRGraphData } from '../data';
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
    const lir: LIRGraphData | undefined = this.props.pass.lir;
    if (!lir) {
      return <div></div>;
    }

    const maxPadding = lir.instructions.map(i => i.id).reduce( (a, b) => Math.max(a, b)).toString().length;
    return (
      <List key='instructionList'>
        {this.getListItems(lir.instructions, maxPadding)}
      </List>
    );
  }

  private getListItems(machineInstructions: MachineInstruction[], maxPadding: number) {
    let result: any = [];
    let previousBasicBlock = '';
    for (let i = 0; i < machineInstructions.length; i++) {
      const instruction = machineInstructions[i];
      if (previousBasicBlock != instruction.BB) {
        previousBasicBlock = instruction.BB;
        result.push(
          <List.Item className='machine-instruction-basic-block' key={previousBasicBlock}>
            <span>{previousBasicBlock}</span>
          </List.Item>
        );
      }
      result.push(this.createListItem(instruction, maxPadding));
    }
    return result;
  }

  private createListItem(instruction: MachineInstruction, maxPadding: number) {
    let operands = <span></span>;
    let result = <span></span>;
    let successors = <span></span>;

    if (instruction.operands != null && instruction.operands.length > 0) {
      operands = <span className='machine-instruction-operands'>{this.formatArgs(instruction.operands)}</span>;
    }

    if (instruction.result != null && instruction.result.length > 0) {
      result = <span className='machine-instruction-result'> -> {instruction.result}</span>;
    }

    if (instruction.successors != null && instruction.successors.length > 0) {
      successors = <span className='machine-instruction-successor'>{this.formatArgs(instruction.successors)}</span>;
    }

    let style = 'machine-instruction';
    let instructionName = instruction.name;

    return (
      <List.Item className={style} key={instruction.id}>
        <span>{this.leftPad(instruction.id, maxPadding)}</span>
        <span>:</span>
        <span className='machine-instruction-name'>{instructionName}</span>
        {operands}
        {result}
        {successors}
      </List.Item>
    );
  }

  private formatArgs(values: string[]): string {
    let result = '';
    for (let i = 0; i < values.length; i++) {
      if (i > 0) {
        result += ', ';
      }
      result += values[i];
    }
    return result;
  }

  private leftPad(value: number, padLength: number) {
    let pad = new Array(1 + padLength).join('0');
    return (pad + value).slice(-pad.length);
  }

  removeMBBFromString(successor: string): string {
    const index = successor.indexOf('=');
    if (index == -1) {
      return successor;
    }
    return successor.substring(index + 1);
  }
}
