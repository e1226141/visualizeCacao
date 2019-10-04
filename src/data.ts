/**
 * This enum definition helps to avoid comparison against string constants later on.
 * A list containing all possible values for an input file can be generated in app.tsx.
 */
export enum HIRNodeType {
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
 */
export enum GraphDependencyEdgeType {
  Unknown,      // artificial value when name can't be mapped
  requires,
  provides,
  modifies,
  scheduleBefore,
  scheduleAfter,
  scheduleImmediateBefore,
  scheduleImmediateAfter
}

/**
 * This enum definition helps to avoid comparison against string constants later on.
 * A list containing all possible values for an input file can be generated in app.tsx.
 */
export enum HIREdgeType {
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
    nodeType: HIRNodeType;

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
      let nodeTypeAssignment: HIRNodeType | undefined = (<any>HIRNodeType)[this.name];
      if (nodeTypeAssignment == undefined) {
        this.nodeType = HIRNodeType.Unknown;
      } else {
        this.nodeType = nodeTypeAssignment;
      }
      return this;
    }

    isCfgNode = (): boolean => {
      return [HIRNodeType.BeginInst, HIRNodeType.GOTOInst, HIRNodeType.RETURNInst, HIRNodeType.IFInst].some(nameType => this.nodeType === nameType );
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

export class DependencyGraphEdge implements Serializable<DependencyGraphEdge>, BaseEdge {
  from: number;
  to: number;
  type: string;
  edgeType: GraphDependencyEdgeType;

  fromJSON(input: any) {
    this.from = input.from;
    this.to = input.to;
    this.type = input.type;
    this.edgeType = this.mapGraphDependencEdgeType(input.type);
    return this;
  }

  mapGraphDependencEdgeType(type: string): GraphDependencyEdgeType {
    switch (type) {
      case 'requires': return GraphDependencyEdgeType.requires;
      case 'provides': return GraphDependencyEdgeType.provides;
      case 'modifies': return GraphDependencyEdgeType.modifies;
      case 'schedule-before': return GraphDependencyEdgeType.scheduleBefore;
      case 'schedule-after': return GraphDependencyEdgeType.scheduleAfter;
      case 'schedule-imm-before': return GraphDependencyEdgeType.scheduleImmediateBefore;
      case 'schedule-imm-after': return GraphDependencyEdgeType.scheduleImmediateAfter;
      default: return GraphDependencyEdgeType.Unknown;
    }
  }
}

export class HIREdge implements Serializable<HIREdge>, BaseEdge {
    from: number;
    to: number;
    type: string;
    trueBranch?: boolean;
    edgeType: HIREdgeType;

    fromJSON(input: any) {
      this.from = input.from;
      this.to = input.to;
      this.type = input.type;
      this.trueBranch = input.trueBranch;

      // map type to EdgeType enum
      let edgeTypeAssignment: HIREdgeType | undefined = (<any>HIREdgeType)[this.type];
      if (edgeTypeAssignment == undefined) {
        this.edgeType = HIREdgeType.Unknown;
      } else {
        this.edgeType = edgeTypeAssignment;
      }
      return this;
    }

    isCfgEdge = (): boolean => {
      return [HIREdgeType.cfg, HIREdgeType.bb].some(type => this.edgeType == type );
    }
}

export class PassDependencyGraphData implements Serializable<PassDependencyGraphData> {
  nodes: DependencyGraphNode[];
  edges: DependencyGraphEdge[];

  fromJSON(input: any) {
    this.nodes = input.nodes.map((node: any) => new DependencyGraphNode().fromJSON(node));
    this.edges = input.edges.map((edge: any) => new DependencyGraphEdge().fromJSON(edge));
    return this;
  }
}

export class HIRGraphData implements Serializable<HIRGraphData> {
  nodes: HIRNode[];
  edges: HIREdge[];

  fromJSON(input: any) {
    this.nodes = input.nodes.map((node: any) => new HIRNode().fromJSON(node));
    this.edges = input.edges.map((edge: any) => new HIREdge().fromJSON(edge));
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
    index: number; // unique index, will be set when creating the data from json
    name: string;
    time: number;
    hir?: HIRGraphData;
    lir?: LIRGraphData;

    constructor(_index: number) {
      this.index = _index;
    }

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
      this.passes = input.passes.map((pass: any, index: number) => new Pass(index).fromJSON(pass));
      return this;
    }
}