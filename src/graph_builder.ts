import { BaseNode, BaseEdge } from './data';
import { string } from 'prop-types';

export class DisplayNode<IN_N extends BaseNode> {
    id: number;
    name: string;
    internalGroup?: string;

    private _node: IN_N;
    getNode = (): IN_N => {
        return this._node;
    }

    // display attributes
    label: string;
    color?: {};
    endInstLink?: number;
    level?: number;
    shapeProperties?: JSON;
    hidden: boolean;
    borderWidth?: number;
    group?: string;

    constructor(pNode: IN_N, label: string) {
        this._node = pNode;
        this.id = pNode.id;
        this.name = pNode.name;
        this.label = label;
        this.hidden = false;
    }

    public setColor(color: string) {
        this.color = {background: color, highlight: color};
    }
}

export class DisplayEdge<IN_E extends BaseEdge> {
    from: number;
    to: number;

    // display attributes
    label: string;
    color?: {};
    width?: number;
    dashes?: boolean;
    hidden?: boolean;
    arrows?: {};

    private _edge: IN_E;
    getEdge = (): IN_E => {
        return this._edge;
    }

    constructor(pEdge: IN_E, label: string) {
        this._edge = pEdge;
        this.from = pEdge.from;
        this.to = pEdge.to;
        this.label = label;
    }

    public setColor(color: string) {
        this.color = {color: color, highlight: color};
    }
}

export abstract class GraphBuilder<IN_N extends BaseNode, IN_E extends BaseEdge, N extends DisplayNode<IN_N>, E extends DisplayEdge<IN_E>> {
    protected _nodes: N[];
    protected _edges: E[];
    protected _displayNodeMap: Map<number, N> = new Map();
    protected _displayEdgeMap: Map<number, Array<E>> = new Map();

    init(nodes: IN_N[], edges: IN_E[]): void {
        this.nodes = nodes.map((n) => this.toDisplayNode(n));
        this.edges = edges.map((e) => this.toDisplayEdge(e));
        this.createLookupMaps();
    }

    protected abstract toDisplayNode(node: IN_N): N;
    protected abstract toDisplayEdge(edge: IN_E): E;

    protected set nodes(values: N[]) {
        this._nodes = values;
    }

    protected get nodes(): N[] {
        return this._nodes;
    }

    protected set edges(values: E[]) {
        this._edges = values;
    }

    protected get edges(): E[] {
        return this._edges;
    }

    protected get displayNodeMap(): Map<number, N> {
        return this._displayNodeMap;
    }

    protected get displayEdgeMap(): Map<number, Array<E>> {
        return this._displayEdgeMap;
    }

    // create node and edge lookups
    protected createLookupMaps(): void {
        this.displayNodeMap.clear();
        this.displayEdgeMap.clear();

        this.nodes.forEach((n) => { this.displayNodeMap.set(n.id, n); });
        this.edges.forEach((e) => {
            let edgeList = this.displayEdgeMap.get(e.from);
            if (edgeList == null) {
                edgeList = [];
                this.displayEdgeMap.set(e.from, edgeList);
            }
            edgeList.push(e);
        });
    }

    toJSONGraph = (): JSON => {
        let graph: any = {
            'nodes': JSON.parse(JSON.stringify(this.nodes)),
            'edges': JSON.parse(JSON.stringify(this.edges))
        };
        return graph as JSON;
    }

    toJSONGraphLegend (): JSON {
        let graph: any = {
          'nodes': {},
          'edges': {}
        };
        return graph as JSON;
      }
}