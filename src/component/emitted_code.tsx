import * as React from 'react';
import { OptimizedMethod } from '../data';
import { Table } from 'semantic-ui-react';

export interface IEmittedCodeProps {
  optimizedMethod: OptimizedMethod;
  show: boolean;
}

export class EmittedCode extends React.Component<IEmittedCodeProps, {}> {

  render() {
    if (!this.props.show) {
      return null;
    }
    console.log('asm:' + this.props.optimizedMethod.asm);
    const asm = this.props.optimizedMethod.asm;
    if (asm.length == 0) {
      return (<div>no emitted code available</div>);
    }

    const instructions = asm.split('\n');
    return (
      <Table basic compact striped className={'machine_code_table'}>
        <Table.Header>
          <Table.Header width={10}></Table.Header>
          <Table.Header width={10}></Table.Header>
          <Table.Header width={5}></Table.Header>
          <Table.Header width={10}></Table.Header>
        </Table.Header>
        <Table.Body>
          {instructions.map(instruction => this._print(instruction))}
        </Table.Body>
      </Table>
    );
  }

  private _print(instruction: string): any  {
    const parts = instruction.split('  ').filter(str => /\S/.test(str));
    console.log('instruction: ' + instruction);
    if (parts.length <= 1) {
      return (
       <Table.Row>
          <Table.Cell className={'machine_code_mbb'}>{instruction}</Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
      </Table.Row>);
    }
    return (
      <Table.Row>
        <Table.Cell className={'machine_code_address'} >{parts[0]}</Table.Cell>
        <Table.Cell className={'machine_code_bin'} >{parts[1]}</Table.Cell>
        <Table.Cell className={'machine_code_instruction'} >{parts[2]}</Table.Cell>
        <Table.Cell className={'machine_code_operands'} >{parts[3]}</Table.Cell>
      </Table.Row>);
  }
}