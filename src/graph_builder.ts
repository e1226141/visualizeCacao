import { Node, Edge } from './data';

export class DisplayNode {
    id: number;
    name: string;
    root: boolean;

    private _node: Node;
    getNode = (): Node => {
        return this._node;
    }

    // display attributes
    label: string;
    color?: string;
    endInstLink?: number;
    level?: number;

    constructor(pNode: Node, pLabel: string, pColor?: string) {
        Object.assign(this, pNode); // copy all attributes with same name
        this._node = pNode;
        this.label = pLabel;
        this.color = pColor;
    }
}

export class DisplayEdge {
    from: number;
    to: number;
    type: string;
    trueBranch: boolean;

    // display attributes
    label: string;
    color?: {};
    width?: number;
    backedge?: boolean;
    dashes?: boolean;

    constructor(pEdge: Edge, pLabel: string, pColor?: string, pWidth?: number, pDashes?: boolean) {
        Object.assign(this, pEdge); // copy all attributes with same name
        this.label = pLabel;
        this.color = { 'color': pColor };
        this.width = pWidth;
        this.dashes = pDashes;
    }
}

export abstract class GraphBuilder<N extends DisplayNode, E extends DisplayEdge> {
    protected _nodes: N[];
    protected _edges: E[];
    protected _displayNodeMap: Map<number, N> = new Map();
    protected _displayEdgeMap: Map<number, Array<E>> = new Map();
    private maxLevel: number = 0;

    init (nodes: Node[], edges: Edge[]): void {
        this.nodes = nodes.map((n) => this.toDisplayNode(n));
        this.edges = edges.map((e) => this.toDisplayEdge(e));
        this.createLookupMaps();
    }

    protected abstract toDisplayNode (node: Node): N;
    protected abstract toDisplayEdge (edge: Edge): E;
    protected abstract toJSONGraphLegend (): JSON;

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

    protected findRoot = (): N | undefined => {
        return this.nodes.find(node => node.root);
    }

    protected markBackedges(node: N | undefined, visitedNodes: Set<number>) {
        if (node == undefined) {
            return;
        }
        const edges = this.displayEdgeMap.get(node.id);
        if (!edges || edges.length == 0) {
            return;
        }
        visitedNodes.add(node.id);
        edges
            .filter(e => e.type !== 'op')
            .forEach(edge => {
                const childId = edge.to;
                if (visitedNodes.has(childId)) {
                    edge.backedge = true;
                } else {
                    const childNode = this.displayNodeMap.get(edge.to);
                    this.markBackedges(childNode, visitedNodes);
                }
                visitedNodes.delete(node.id);
            });
    }

    protected setHierarchy = (root: N | undefined): void => {
        this.maxLevel = 0;
        this.setHierarchyDfs(root, 0);
        // set all unreachable nodes to default level
        this.nodes.filter(n => n.level == undefined).forEach(n => { n.level = 0; });
    }

    private setHierarchyDfs = (node: N | undefined, level: number): void => {
        if (node == undefined || node.level != null) {
            return;
        }
        if (level > this.maxLevel) {
            this.maxLevel = level;
        }
        //console.log("set node.level to " + level + " for id: " + node.id + " and type " + node.name);
        if (node.level == undefined || node.level > level) {
            node.level = level;

            // todo use map instead of edges.filter...
            const edges = this.displayEdgeMap.get(node.id);
            if (edges) {
                edges.forEach(e => {
                    const childNode = this.displayNodeMap.get(e.to);
                    this.setHierarchyDfs(childNode, level + 1);
                });
            }
        }
    }

    protected getNodeBackgroundColor (nodeName: string): string {
        switch (nodeName) {
            case 'IFInst':
                return '#A1EC76';
            case 'RETURNInst':
                return '#FFA807';
            case 'GOTOInst':
                return '#97C2FC';
            case 'PHIInst':
                return '#FFCA66';
            default:
                return '#97C2FC';
        }
    }

    protected getEdgeColor(edge: Edge): string {
        switch (edge.type) {
            case 'cfg':
                if (edge.trueBranch) {
                    // the branches of an 'if' statement get different colors
                    if (edge.trueBranch) {
                        return '#5aa52b';
                    } else {
                        return '#7C29F0';
                    }
                }
                // otherwise normal control flow
                return '#87B2EC';
            case 'op':
                return '#AD85E4';
            case 'sched':
                return '#FDBFC9';
            default:
                return '#000000';
        }
    }

    protected getNodeDisplayString(node: Node, simpleDisplay: boolean): string {
        if (simpleDisplay) {
            return this.getSimpleNodeDisplayString(node);
        }
        let outputValue = '[' + node.id + ']: ' + node.name;
        if (node.name === 'CONSTInst') {
            outputValue += ': ' + node.value;
        }
        if (node.operands) {
            outputValue += '[';
            if (node.name === 'IFInst') {
                outputValue += '#' + node.operands[0] + ' ' + this.displayIFCondition(node.condition) + ' #' + node.operands[1];
            } else {
                outputValue += node.operands.map((id) => { return '#' + id; }).toString();
            }
            outputValue += ']';
        }
        return outputValue;
    }

    protected getSimpleNodeDisplayString(node: Node): string {
        if (node.name === 'CONSTInst') {
            return 'Const: ' + node.value;
        }
        if (node.name === 'RETURNInst') {
            return 'RETURN' + (node.operands ? ' #' + node.operands[0] : '');
        }
        if (node.name === 'IFInst') {
            return 'IF [#' + node.operands[0] + ' ' + this.displayIFCondition(node.condition) + ' #' + node.operands[1] + ']';
        }

        return node.name + (node.operands ? node.operands.map((id) => { return '#' + id; }).toString() : '');
    }

    protected displayIFCondition(cond: string): string {
        switch (cond) {
            case 'GE':
                return '>=';
            case 'GT':
                return '>';
            case 'LE':
                return '<=';
            case 'LT':
                return '<';
            case 'EQ':
                return '==';
            case 'NE':
                return '!=';
            default:
                return '?';
        }
    }
}