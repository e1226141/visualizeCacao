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

export class Edge implements Serializable<Edge> {
    from: number;
    to: number;
    type: string;
    trueBranch?: boolean;

    fromJSON(input: any) {
      this.from = input.from;
      this.to = input.to;
      this.type = input.type;
      this.trueBranch = input.trueBranch;
      return this;
    }

    isCfgEdge = (): boolean => {
      return ['cfg', 'bb'].some(type => this.type == type );
    }
}

export class Pass implements Serializable<Pass> {
    name: string;
    nodes: Node[];
    edges: Edge[];

    fromJSON(input: any) {
      this.name = input.name;
      this.nodes = input.nodes.map((node: any) => new Node().fromJSON(node));
      this.edges = input.edges.map((edge: any) => new Edge().fromJSON(edge));
      return this;
    }
}

export class OptimizedMethod implements Serializable<OptimizedMethod> {
    class: string;
    method: string;
    desc: string;
    passes: Pass[];

    fromJSON(input: any) {
      this.class = input.class;
      this.method = input.method;
      this.desc = input.desc;
      this.passes = input.passes.map((pass: any) => new Pass().fromJSON(pass));
      return this;
    }
}