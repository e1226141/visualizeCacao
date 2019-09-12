/**
 * This enum definition helps to avoid comparison against string constants later on.
 * A list containing all possible values for an input file can be generated in app.tsx.
 */
export enum NodeType {
  Unknown,      // artificial value when name can't be mapped
  ADDInst,
  ALOADInst,
  AREFInst,
  ARRAYBOUNDSCHECKInst,
  ARRAYLENGTHInst,
  ASTOREInst,
  BeginInst,
  CONSTInst,
  GOTOInst,
  IFInst,
  LOADInst,
  PHIInst,
  RETURNInst,
  SUBInst,
  IFAssumptionInst,
  SourceStateInst
}

/**
 * This enum definition helps to avoid comparison against string constants later on.
 * A list containing all possible values for an input file can be generated in app.tsx.
 */
export enum EdgeType {
  Unknown,    // artificial value when name can't be mapped
  bb,
  cfg,
  op,
  sched
}

export interface Serializable<T> {
  fromJSON(input: Object): T;
}

export class BaseNode {
  id: number;
  name: string;
}

export class DependencyGraphNode implements  Serializable<DependencyGraphNode>, BaseNode {
  id: number;
  name: string;
  pass: boolean;
  artifact: boolean;
  enabled: boolean;

  fromJSON(input: any) {
    this.id = input.id;
    this.name = input.name;
    this.pass = JSON.parse(input.pass);
    this.artifact = JSON.parse(input.artifact);
    this.enabled = JSON.parse(input.enabled);
    return this;
  }
}

export class HIRNode implements Serializable<HIRNode>, BaseNode {
    id: number;
    name: string;
    type: string;
    BB: number;
    root?: boolean;
    operands: number[];
    value?: number;
    condition: string;
    sideEffects?: boolean;
    nodeType: NodeType;

    fromJSON(input: any) {
      this.id = input.id;
      this.name = input.name;
      this.type = input.type;
      this.BB = input.BB;
      this.root = input.root;
      this.operands = input.operands;
      this.value = input.value;
      this.condition = input.condition;
      this.sideEffects = input.sideEffects;

      // map node name to NodeType enum
      let nodeTypeAssignment: NodeType | undefined = (<any>NodeType)[this.name];
      if (nodeTypeAssignment == undefined) {
        this.nodeType = NodeType.Unknown;
      } else {
        this.nodeType = nodeTypeAssignment;
      }
      return this;
    }

    isCfgNode = (): boolean => {
      return [NodeType.BeginInst, NodeType.GOTOInst, NodeType.RETURNInst, NodeType.IFInst].some(nameType => this.nodeType === nameType );
    }
}

export class MachineInstruction implements Serializable<MachineInstruction>, BaseNode {
  id: number;
  name: string;
  type: string;
  BB: string;
  result: string;
  operands: string[];
  successors: string[];

  fromJSON(input: any) {
    this.id = input.id;
    this.name = input.name;
    this.type = input.type;
    this.BB = input.BB;
    this.result = input.result;
    this.operands = input.operands;
    this.successors = input.successors;
    return this;
  }
}

export class BaseEdge {
  from: number;
  to: number;
}

export class Edge implements Serializable<Edge>, BaseEdge {
    from: number;
    to: number;
    type: string;
    trueBranch?: boolean;
    edgeType: EdgeType;

    fromJSON(input: any) {
      this.from = input.from;
      this.to = input.to;
      this.type = input.type;
      this.trueBranch = input.trueBranch;

      // map type to EdgeType enum
      let edgeTypeAssignment: EdgeType | undefined = (<any>EdgeType)[this.type];
      if (edgeTypeAssignment == undefined) {
        this.edgeType = EdgeType.Unknown;
      } else {
        this.edgeType = edgeTypeAssignment;
      }
      return this;
    }

    isCfgEdge = (): boolean => {
      return [EdgeType.cfg, EdgeType.bb].some(type => this.edgeType == type );
    }
}

export class PassDependencyGraphData implements Serializable<PassDependencyGraphData> {
  nodes: DependencyGraphNode[];
  edges: Edge[];

  fromJSON(input: any) {
    this.nodes = input.nodes.map((node: any) => new DependencyGraphNode().fromJSON(node));
    this.edges = input.edges.map((edge: any) => new Edge().fromJSON(edge));
    return this;
  }
}

export class HIRGraphData implements Serializable<HIRGraphData> {
  nodes: HIRNode[];
  edges: Edge[];

  fromJSON(input: any) {
    this.nodes = input.nodes.map((node: any) => new HIRNode().fromJSON(node));
    this.edges = input.edges.map((edge: any) => new Edge().fromJSON(edge));
    return this;
  }
}

export class LIRGraphData implements Serializable<LIRGraphData> {
  instructions: MachineInstruction[];
  fromJSON(input: any) {
    this.instructions = input.instructions.map((instruction: any) => new MachineInstruction().fromJSON(instruction));
    return this;
  }
}

export class Pass implements Serializable<Pass> {
    name: string;
    time: number;
    hir?: HIRGraphData;
    lir?: LIRGraphData;

    fromJSON(input: any) {
      this.name = input.name;
      this.time = input.time;
      if (input.HIR) {
        this.hir = new HIRGraphData().fromJSON(input.HIR);
      }
      if (input.LIR) {
        this.lir = new LIRGraphData().fromJSON(input.LIR);
      }
      return this;
    }
}

export class OptimizedMethod implements Serializable<OptimizedMethod> {
    class: string;
    method: string;
    desc: string;
    passDependencyGraph: PassDependencyGraphData;
    passes: Pass[];

    fromJSON(input: any) {
      this.class = input.class;
      this.method = input.method;
      this.desc = input.desc;
      this.passDependencyGraph = new PassDependencyGraphData().fromJSON(input.passDependencyGraph);
      this.passes = input.passes.map((pass: any) => new Pass().fromJSON(pass));
      return this;
    }
}