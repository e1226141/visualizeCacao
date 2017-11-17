export interface Serializable<T> {
  fromJson(input: Object): T;
}

export interface INode {
  id: number;
  name: string;
  type: string;
  BB: number;
  root?: boolean;
  operands: number[];
  value?: number;
  condition: string;
  sideEffects?: boolean;
}

export class Node implements Serializable<INode>, INode {
    id: number;
    name: string;
    type: string;
    BB: number;
    root?: boolean;
    operands: number[];
    value?: number;
    condition: string;
    sideEffects?: boolean;

    fromJson(input: any) {
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
}

export interface IEdge {
  from: number;
  to: number;
  type: string;
  trueBranch?: boolean;
}

export class Edge implements Serializable<IEdge>, IEdge {
    from: number;
    to: number;
    type: string;
    trueBranch?: boolean;

    fromJson(input: any) {
      this.from = input.from;
      this.to = input.to;
      this.type = input.type;
      this.trueBranch = input.trueBranch;
      return this;
    }
}

export interface IPass {
  name: string;
  nodes: INode[];
  edges: IEdge[];
}

export class Pass implements Serializable<IPass>, IPass {
    name: string;
    nodes: INode[];
    edges: IEdge[];

    fromJson(input: any) {
      this.name = input.name;
      this.nodes = input.nodes.map((node: any) => new Node().fromJson(node));
      this.edges = input.edges.map((edge: any) => new Edge().fromJson(edge));
      return this;
    }
}

export interface IOptimizedMethod {
  class: string;
  method: string;
  desc: string;
  passes: IPass[];
}

export class OptimizedMethod implements Serializable<IOptimizedMethod>, IOptimizedMethod {
    class: string;
    method: string;
    desc: string;
    passes: IPass[];

    fromJson(input: any) {
      this.class = input.class;
      this.method = input.method;
      this.desc = input.desc;
      this.passes = input.passes.map((pass: any) => new Pass().fromJson(pass));
      return this;
    }
}
