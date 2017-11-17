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
      return this;
    }

    isCfgNode = (): boolean => {
      return ['BeginInst', 'GOTOInst', 'RETURNInst', 'IFInst'].some(name => this.name === name );
    }
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

export type TransformNode = (n: Node) => any;
export type TransformEdge = (e: Edge) => any;

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

    static toJSON = ( nodes: Node[], edges: Edge[], tn: TransformNode, te: TransformEdge): JSON => {
      let graph: any = {
        'nodes': nodes.map(tn),
        'edges': edges.map(te)
      };
      return graph as JSON;
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
