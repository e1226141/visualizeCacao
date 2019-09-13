import * as React from 'react';
import { Pass, LIRGraphData, MachineInstruction } from '../data';
import { NetworkGraph } from './network_graph';
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
      <div style={{borderAll: 0, margin: 0}}>
        <Segment.Group horizontal raised style={{ padding: 0, margin: 0 }}>
          <Segment floated='left' attached={true}>
            <NodeSearch graph={graph} valueSelectedHandler={lirSearchValueSelected} style={{ paddingRight: '20px', width: '100%' }} />
          </Segment>
          <Segment floated='right' compact size='mini' attached={true}>
            <Popup trigger={
              <Statistic size='mini' floated='right'>
                <Statistic.Value>{lir.instructions.length}</Statistic.Value>
                <Statistic.Label>{'machine instructions'}</Statistic.Label>
              </Statistic>
            } content={'number of machine instructions'} />
            <Popup trigger={
              <Statistic size='mini' floated='right'>
                <Statistic.Value>{lirBuilder.getNodes().length}</Statistic.Value>
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

class MachineBasicBlock {
  constructor(public id: string, public instructions: MachineInstruction[], public label: string) { }

  getSuccessors(): string[] {
    if (this.instructions.length == 0) {
      return [];
    }
    const lastInstruction = this.instructions[this.instructions.length - 1];
    // console.log(this.id + ': successors: ' + lastInstruction.successors);
    if (lastInstruction.successors) {
      return lastInstruction.successors.map(successor => this.removeMBBFromString(successor));
    }
    return [];
  }

  removeMBBFromString(successor: string): string {
    const index = successor.indexOf('=');
    if (index == -1) {
      return successor;
    }
    return successor.substring(index + 1);
  }
}

class MachineBasicBlockEdges {
  constructor(public from: string, public to: string) { }
}

class LirGraphBuilder {
  protected _nodes: MachineBasicBlock[];
  protected _edges: MachineBasicBlockEdges[];

  constructor(lir: LIRGraphData) {
    this._nodes = this.createMachineBasicBlocks(lir.instructions);
    this._edges = this.createMachineBasicBlockEdges(this._nodes);
  }

  public getNodes() {
    return this._nodes;
  }

  public getEdges() {
    return this._edges;
  }

  private createMachineBasicBlocks(instructions: MachineInstruction[]): MachineBasicBlock[] {
    // split instructions to machine basic blocks
    const MBBs: MachineBasicBlock[] = [];
    let currentMBB: MachineBasicBlock;
    instructions.forEach(instruction => {
      if (currentMBB == undefined || currentMBB.id != instruction.BB) {
        currentMBB = new MachineBasicBlock(instruction.BB, [], instruction.BB);
        MBBs.push(currentMBB);
      }
      currentMBB.instructions.push(instruction);
    });

    // create display values
    const maxPadding = instructions.map(i => i.id).reduce( (a, b) => Math.max(a, b)).toString().length;
    MBBs.forEach(MBB => {
      MBB.label = '*' + MBB.id + '*\n' + MBB.instructions.map(i => this.instructionToString(i, maxPadding)).join('\n');
    });
    return MBBs;
  }

  private createMachineBasicBlockEdges(MBBs: MachineBasicBlock[]): MachineBasicBlockEdges[] {
    const concat = (x: MachineBasicBlockEdges[], y: MachineBasicBlockEdges[]) => x.concat(y);
    return MBBs.map(MBB => this.mapToEdges(MBB.id, MBB.getSuccessors())).reduce(concat, []);
  }

  private mapToEdges = (id: string, successors: string[]): MachineBasicBlockEdges[] => {
    const result: MachineBasicBlockEdges[] = [];
    successors.forEach(successor => result.push(new MachineBasicBlockEdges(id, successor)));
    return result;
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

  toJSONGraph = (): JSON => {
    let graph: any = {
      'nodes': JSON.parse(JSON.stringify(this._nodes)),
      'edges': JSON.parse(JSON.stringify(this._edges))
    };
    return graph as JSON;
  }
}
