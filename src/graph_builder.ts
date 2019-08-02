import { Node, NodeType, Edge, EdgeType } from './data';

export class DisplayNode {
    id: number;
    name: string;
    root: boolean;
    nodeType: NodeType;
    container: string;

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
        this.container = String(pNode.BB);
    }
}

export class DisplayEdge {
    from: number;
    to: number;
    type: string;
    trueBranch: boolean;
    edgeType: EdgeType;

    // display attributes
    label: string;
    color?: {};
    width?: number;
    backedge?: boolean;
    dashes?: boolean;
    hidden?: boolean;

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

    init(nodes: Node[], edges: Edge[]): void {
        this.nodes = nodes.map((n) => this.toDisplayNode(n));
        this.edges = edges.map((e) => this.toDisplayEdge(e));
        this.createLookupMaps();
    }

    protected abstract toDisplayNode(node: Node): N;
    protected abstract toDisplayEdge(edge: Edge): E;
    protected abstract toJSONGraphLegend(): JSON;

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

    protected findRoot = (): N | undefined => {
        return this.nodes.find(node => node.root);
    }

    protected markBackedges(node: N | undefined, ignoredEdges: (edge: DisplayEdge) => boolean,  visitedNodes: Set<number>) {
        if (node == undefined) {
            return;
        }
        const edges = this.displayEdgeMap.get(node.id);
        if (!edges || edges.length == 0) {
            return;
        }
        visitedNodes.add(node.id);
        edges
            .filter(ignoredEdges)
            .filter(e => e.backedge != true)
            .forEach(edge => {
                const childId = edge.to;
                if (visitedNodes.has(childId)) {
                    edge.backedge = true;
                    // console.log('mark backedge: ' + edge.from + ' - ' + edge.to + ':' + edge.type);
                } else {
                    const childNode = this.displayNodeMap.get(edge.to);
                    this.markBackedges(childNode, ignoredEdges, visitedNodes);
                }
            });
        visitedNodes.delete(node.id);
    }

    protected setHierarchy = (root: N | undefined, edgeFilter: (edge: DisplayEdge) => boolean): void => {
        this.maxLevel = 0;
        this.setHierarchyDfs(root, 0, new Set<number>(), edgeFilter);

        // adjust the level of nodes, which have no parent nodes and therefore will be set to
        // level 0
        let nodesWithoutLevel = this.nodes.filter(node => node.level == undefined);
        while (nodesWithoutLevel.length > 0) {
            let nodeWithoutLevelCount = nodesWithoutLevel.length;
            nodesWithoutLevel.forEach(node => {
                const edges = this.displayEdgeMap.get(node.id);
                if (!edges || edges.length == 0) {
                    return;
                }

                let min = Number.MAX_SAFE_INTEGER;
                for (let e of edges) {
                    const nodeTo = this.displayNodeMap.get(e.to);
                    if (nodeTo && nodeTo.level && nodeTo.level != -1 && min > nodeTo.level ) {
                        min = nodeTo.level - 1;
                    }
                }
                if (min < Number.MAX_SAFE_INTEGER) {
                    node.level = min;
                }
            });
            nodesWithoutLevel = nodesWithoutLevel.filter(node => node.level == undefined);
            if (nodesWithoutLevel.length == nodeWithoutLevelCount) {
                break;
            }
        }
        this.nodes.filter(node => node.level == undefined).forEach(node => {
            node.level = this.maxLevel;
        });
    }

    private setHierarchyDfs = (node: N | undefined, level: number, visitedNodes: Set<number>, edgeFilter: (edge: DisplayEdge) => boolean): void => {
        if (node == undefined || level > this._nodes.length) {
            return;
        }
        if (level > this.maxLevel) {
            this.maxLevel = level;
        }

        visitedNodes.add(node.id);
        if (node.level == undefined || level > node.level) {
            // console.log('change node.level to ' + level + ' from ' + node.level + ' for id: ' + node.id + ' and type ' + node.label);
            node.level = level;
            const edges = this.displayEdgeMap.get(node.id);
            if (edges) {
                edges.filter(edgeFilter).forEach(e => {
                    // avoid cycles
                    if (visitedNodes.has(e.to)) {
                        return;
                    }
                    const childNode = this.displayNodeMap.get(e.to);
                    this.setHierarchyDfs(childNode, level + 1, visitedNodes, edgeFilter);
                });
            }
        }
        visitedNodes.delete(node.id);
    }

    protected getNodeBackgroundColor(nodeType: NodeType): string {
        switch (nodeType) {
            case NodeType.IFInst:
                return '#A1EC76';
            case NodeType.RETURNInst:
                return '#FFA807';
            case NodeType.GOTOInst:
                return '#97C2FC';
            case NodeType.PHIInst:
                return '#FFCA66';
            default:
                return '#97C2FC';
        }
    }

    protected getEdgeColor(edge: Edge): string {
        switch (edge.edgeType) {
            case EdgeType.cfg:
                // the branches of an 'if' statement get different colors
                if (edge.trueBranch == true) {
                    return '#5aa52b';
                } if (edge.trueBranch == false) {
                    return '#7C29F0';
                }
                // otherwise normal control flow
                return '#87B2EC';
            case EdgeType.op:
                return '#808080';
            case EdgeType.sched:
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
        if (node.nodeType === NodeType.CONSTInst) {
            outputValue += ': ' + node.value;
        }
        if (node.operands) {
            outputValue += '[';
            if (node.nodeType === NodeType.IFInst) {
                outputValue += '#' + node.operands[0] + ' ' + this.displayIFCondition(node.condition) + ' #' + node.operands[1];
            } else if (node.nodeType === NodeType.IFAssumptionInst) {
                    outputValue += '#' + node.operands[0] + ' ' + this.displayIFCondition(node.condition) + ' #' + node.operands[1];
            } else {
                outputValue += node.operands.map((id) => { return '#' + id; }).toString();
            }
            outputValue += ']';
        }
        return outputValue;
    }

    protected getSimpleNodeDisplayString(node: Node): string {
        if (node.nodeType === NodeType.CONSTInst) {
            return 'Const: ' + node.value;
        }
        if (node.nodeType === NodeType.RETURNInst) {
            return 'RETURN' + (node.operands ? ' #' + node.operands[0] : '');
        }
        if (node.nodeType === NodeType.IFInst) {
            return 'IF [#' + node.operands[0] + ' ' + this.displayIFCondition(node.condition) + ' #' + node.operands[1] + ']';
        }
        if (node.nodeType === NodeType.IFAssumptionInst) {
            return 'IFAssumption [#' + node.operands[0] + ' ' + this.displayIFCondition(node.condition) + ' #' + node.operands[1] + ']';
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