import * as React from 'react';
import { Pass, LIRGraphData, MachineInstruction, BaseNode, BaseEdge } from '../data';
import { NetworkGraph } from './network_graph';
import { DisplayNode, DisplayEdge, GraphBuilder } from '../graph_builder';
import { NodeSearch } from './node_search';
import { Network } from 'vis';
import { Segment, Statistic, Popup } from 'semantic-ui-react';

export interface ILirGraphViewProps {
  pass: Pass;
  networkGraphStyle: React.CSSProperties;
}

export interface ILirGraphViewState {
}

export class LirGraphView extends React.Component<ILirGraphViewProps, {}> {
  private _lirNetwork: Network;

  constructor(props: ILirGraphViewProps) {
    super(props);
    this.state = {};
  }

  private _getDefaultOptions(): JSON {
    let options: any = {
      height: '100%',
      width: '100%',
      nodes: {
        shape: 'box',
        font: {
          face: 'monospace',
          align: 'left',
          multi: 'md'
        },
        color: {border: '#000000'},
        borderWidth: 1,
        borderWidthSelected: 4
      },
      edges: {
        arrows: {
          'to': {
            'enabled': true
          }
        },
        color: {
          inherit: false
        },
        smooth: {
          enabled: true,
          type: 'straightCross'
        },
        font: {
          align: 'top'
        },
        selectionWidth: 3
      },
      layout: {
        hierarchical: {
          enabled: false
        }
      },
      physics: {
        enabled: false
      }
    };
    return options as JSON;
  }

  render() {
    const lir: LIRGraphData | undefined = this.props.pass.lir;
    if (!lir) {
      return <div></div>;
    }

    const lirBuilder = new LirGraphBuilder(lir);
    const graph: JSON = lirBuilder.toJSONGraph();
    const options: JSON = this._getDefaultOptions();

    const events = {
      select: function (event: any) {
        let { nodes, edges } = event;
        console.log('Selected nodes:');
        console.log(nodes);
        console.log('Selected edges:');
        console.log(edges);
      }
    };

    let lirSearchValueSelected = (selection: any) => {
      // console.log('selected: ' + selection.id);
      const id = selection.id;
      this._lirNetwork.selectNodes([id]);
      this._lirNetwork.focus(id, { scale: 1.0 });
    };

    return (
      <div>
        <Segment.Group horizontal raised style={{ padding: 0, margin: 0 }} id='lirGraphSearchBar'>
          <Segment floated='left' compact>
            <NodeSearch graph={graph} valueSelectedHandler={lirSearchValueSelected} style={{ paddingRight: '20px', width: '100%' }} />
          </Segment>
          <Segment floated='right' compact size='mini'>
            <Popup trigger={
              <Statistic size='mini' floated='right'>
                <Statistic.Value>{lir.instructions.length}</Statistic.Value>
                <Statistic.Label>{'machine instructions'}</Statistic.Label>
              </Statistic>
            } content={'number of machine instructions'} />
            <Popup trigger={
              <Statistic size='mini' floated='right'>
                <Statistic.Value>{graph.nodes.length}</Statistic.Value>
                <Statistic.Label>{'MBB'}</Statistic.Label>
              </Statistic>
            } content={'number of machine basic blocks'} />
          </Segment>
        </Segment.Group>
        <div id='lirNetwork'>
          <div className='vis-network' width='100%'>
            <NetworkGraph graph={graph} options={options} events={events} style={this.props.networkGraphStyle}
              getVisNetwork={(network) => { this._lirNetwork = network; }} />
          </div>
        </div>
      </div>
    );
  }
}

class MachineBasicBlock extends BaseNode {
  public id: number;
  public name: string;
  public MBBId: string;
  public instructions: MachineInstruction[];

  constructor(_id: string, _instructions: MachineInstruction[], _name: string) {
    super();
    this.id = this._removeNonDigits(_id);
    this.MBBId = _id;
    this.instructions = _instructions;
    this.name = _name;
  }

  getSuccessors(): string[] {
    if (this.instructions.length == 0) {
      return [];
    }
    const lastInstruction = this.instructions[this.instructions.length - 1];
    if (lastInstruction.successors) {
      return lastInstruction.successors;
    }
    return [];
  }

  getNumberFromString(successor: string): number {
    const index = successor.indexOf('=');
    if (index == -1) {
      return this._removeNonDigits(successor);
    }
    return this._removeNonDigits(successor.substring(index + 1));
  }

  _removeNonDigits(value: string): number {
    return Number(value.replace(/\D/g, ''));
  }
}

class MachineBasicBlockEdges extends BaseEdge {
  public thenBranch: boolean = false;
  public elseBranch: boolean = false;
  constructor(MBB: MachineBasicBlock, to: string) {
    super();
    this.from = MBB.id;
    this.to = MBB._removeNonDigits(to);
    if (to.indexOf('then') != -1) {
      this.thenBranch = true;
    }
    if (to.indexOf('else') != -1) {
      this.elseBranch = true;
    }
  }
}

class LirGraphBuilder
  extends GraphBuilder<MachineBasicBlock, MachineBasicBlockEdges, DisplayNode<MachineBasicBlock>, DisplayEdge<MachineBasicBlockEdges>> {

  private _maxPadding: number;

  constructor(lir: LIRGraphData) {
    super();

    // structure of LIR is different than the other graphs, so first convert each instruction into MBBs
    const MBBs = this.createMachineBasicBlocks(lir.instructions);
    const MBBEdges = this.createMachineBasicBlockEdges(MBBs);
    this._maxPadding = lir.instructions.map(i => i.id).reduce((a, b) => Math.max(a, b)).toString().length;

    this.init(MBBs, MBBEdges);
  }

  private createMachineBasicBlocks(instructions: MachineInstruction[]): MachineBasicBlock[] {
    // split instructions to machine basic blocks
    const MBBs: MachineBasicBlock[] = [];
    let currentMBB: MachineBasicBlock;
    instructions.forEach(instruction => {
      if (currentMBB == undefined || currentMBB.MBBId != instruction.BB) {
        currentMBB = new MachineBasicBlock(instruction.BB, [], instruction.BB);
        MBBs.push(currentMBB);
      }
      currentMBB.instructions.push(instruction);
    });
    return MBBs;
  }

  protected toDisplayNode(node: MachineBasicBlock): DisplayNode<MachineBasicBlock> {
    const label = node.name = '*' + node.MBBId + '*\n\n' + node.instructions.map(i => this.instructionToString(i, this._maxPadding)).join('\n');
    const result: DisplayNode<MachineBasicBlock> = new DisplayNode<MachineBasicBlock>(node, label);
    result.setColor(this.getNodeBackgroundColor(node.getSuccessors().length));
    return result;
  }

  protected getNodeBackgroundColor(successorCount: number): string {
    // RETURN
    if (successorCount == 0) {
      return '#FFA807';
    }
    // GOTO
    if (successorCount == 1) {
      return '#97C2FC';
    }
    // IF Instruction
    return '#D1F6BC';
}

  protected toDisplayEdge(edge: MachineBasicBlockEdges): DisplayEdge<MachineBasicBlockEdges> {
    const result: DisplayEdge<MachineBasicBlockEdges> = new DisplayEdge<MachineBasicBlockEdges>(edge, this.getEdgeLabel(edge));
     result.setColor(this.getEdgeColor(edge));
    return result;
  }

  private getEdgeColor(edge: MachineBasicBlockEdges): string {
    if (edge.thenBranch === true) {
      return '#5aa52b';
    }
    if (edge.elseBranch === true) {
        return '#7C29F0';
    }
    return '#000000';
  }

  protected getEdgeLabel(edge: MachineBasicBlockEdges): string {
    if (edge.thenBranch === true) {
      return 'then';
    }
    if (edge.elseBranch === true) {
        return 'else';
    }
    return '';
  }

  private createMachineBasicBlockEdges(MBBs: MachineBasicBlock[]): MachineBasicBlockEdges[] {
    const concat = (x: MachineBasicBlockEdges[], y: MachineBasicBlockEdges[]) => x.concat(y);
    return MBBs.map(MBB => this.mapToEdges(MBB)).reduce(concat, []);
  }

  private mapToEdges = (MBB: MachineBasicBlock): MachineBasicBlockEdges[] => {
    return MBB.getSuccessors().map(s => new MachineBasicBlockEdges(MBB, s));
  }

  private leftPad(value: number, padLength: number) {
    let pad = new Array(1 + padLength).join('0');
    return (pad + value).slice(-pad.length);
  }

  private instructionToString = (instruction: MachineInstruction, maxPadding: number): string => {
    let result = this.leftPad(instruction.id, maxPadding) + ': *' + instruction.name + '*';
    if (instruction.operands != null && instruction.operands.length > 0) {
      result += ' _' + instruction.operands + '_';
    }
    if (instruction.result != null && instruction.result != '') {
      result += ' *->* _' + instruction.result + '_';
    }
    if (instruction.successors != null && instruction.successors.length > 0) {
      result += ' _' + instruction.successors + '_';
    }
    return result;
  }
}
