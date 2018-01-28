/**
 * This enum definitions help to avoid comparisons against the string constants later on.
 */
export enum GraphType {
  Unknown,      // artificial value when name can't be mapped
  PassDependencyGraph,
  HIR,
  LIR
}

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
  SUBInst
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

export class Node implements Serializable<Node> {
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

export class Edge implements Serializable<Edge> {
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

export class Graph implements Serializable<Graph> {
  type: string;
  graphType: GraphType;
  nodes: Node[];
  edges: Edge[];

  fromJSON(input: any) {
    this.type = input.type;
    let graphTypeAssignment: GraphType | undefined = (<any>GraphType)[this.type];
    if (graphTypeAssignment == undefined) {
      this.graphType = GraphType.Unknown;
    } else {
      this.graphType = graphTypeAssignment;
    }
    this.nodes = input.nodes.map((node: any) => new Node().fromJSON(node));
    this.edges = input.edges.map((edge: any) => new Edge().fromJSON(edge));
    return this;
  }
}

export class Pass implements Serializable<Pass> {
    name: string;
    time: number;
    graphs: Graph[];

    getGraph(graphType: GraphType): Graph | undefined {
      if (this.graphs) {
        return this.graphs.find( (graph) => graph.graphType == graphType);
      }
      return;
    }

    fromJSON(input: any) {
      this.name = input.name;
      this.time = input.time;
      this.graphs = input.graph.map((graph: any) => new Graph().fromJSON(graph));
      return this;
    }
}

export class OptimizedMethod implements Serializable<OptimizedMethod> {
    class: string;
    method: string;
    desc: string;
    graphs: Graph[];
    passes: Pass[];

    getGraph(graphType: GraphType): Graph | undefined {
      if (this.graphs) {
        return this.graphs.find( (graph) => graph.graphType == graphType);
      }
      return;
    }

    fromJSON(input: any) {
      this.class = input.class;
      this.method = input.method;
      this.desc = input.desc;
      this.graphs = input.graph.map((graph: any) => new Graph().fromJSON(graph));
      this.passes = input.passes.map((pass: any) => new Pass().fromJSON(pass));
      return this;
    }
}