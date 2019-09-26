import { HIRNode, HIRNodeType, HIREdge, HIREdgeType } from '../data';
import { DisplayNode, DisplayEdge, GraphBuilder } from '../graph_builder';

export abstract class HirGraphBuilder extends GraphBuilder<HIRNode, HIREdge, DisplayNode<HIRNode>, DisplayEdge<HIREdge>> {

    protected toDisplayNode(node: HIRNode): DisplayNode<HIRNode> {
        const result: DisplayNode<HIRNode> = new DisplayNode<HIRNode>(node, this.getNodeLabel(node, false));
        result.setColor(this.getNodeBackgroundColor(node.nodeType, false));
        return result;
    }

    protected toDisplayEdge(edge: HIREdge): DisplayEdge<HIREdge> {
        const result: DisplayEdge<HIREdge> = new DisplayEdge<HIREdge>(edge, this.getEdgeLabel(edge));
        if (edge.edgeType == HIREdgeType.bb) {
            result.dashes = true;
        }
        const color = this.getEdgeColor(edge);
        result.setColor(color);
        return result;
    }

    protected detectAndMarkBackedges(nodes: HIRNode[]) {
        const root = nodes.find(node => node.root === true);
        const backedgeSet = new Set<DisplayEdge<HIREdge>>();
        this.findBackedges(root, e => e && e.edgeType !== HIREdgeType.op, new Set<number>(), backedgeSet);
        this.edges
            .filter((e: DisplayEdge<HIREdge>) => backedgeSet.has(e))
            .forEach((e: DisplayEdge<HIREdge>) => e.setColor('#EE0000'));
    }

    protected findBackedges(node: HIRNode | undefined, ignoredEdges: (edge: HIREdge) => boolean,
                            visitedNodes: Set<number>, backedgeSet: Set<DisplayEdge<HIREdge>>) {
        if (node == undefined) {
            return;
        }
        const edges = this.displayEdgeMap.get(node.id);
        if (!edges || edges.length == 0) {
            return;
        }
        visitedNodes.add(node.id);
        edges
            .filter(edge => !backedgeSet.has(edge))
            .forEach(edge => {
                const childId = edge.to;
                if (visitedNodes.has(childId)) {
                    backedgeSet.add(edge);
                } else {
                    const childNode = this.displayNodeMap.get(edge.to);
                    if (childNode != undefined) {
                        this.findBackedges(childNode.getNode(), ignoredEdges, visitedNodes, backedgeSet);
                    }
                }
            });
        visitedNodes.delete(node.id);
    }

    protected getNodeBackgroundColor(nodeType: HIRNodeType, showBB: boolean): string {
        if (nodeType == HIRNodeType.GOTOInst && !showBB) {
            return '#C7E2FC';
        }
        switch (nodeType) {
            case HIRNodeType.IFInst:
                return '#A1EC76';
            case HIRNodeType.RETURNInst:
                return '#FFA807';
            case HIRNodeType.GOTOInst:
                return '#97C2FC';
            case HIRNodeType.PHIInst:
                return '#FFCA66';
            default:
                return '#97C2FC';
        }
    }

    protected getEdgeLabel(edge: HIREdge): string {
        if (edge.trueBranch != undefined) {
            return edge.trueBranch ? 'T' : 'F';
        }
        return '';
    }

    protected getEdgeColor(edge: HIREdge): string {
        switch (edge.edgeType) {
            case HIREdgeType.cfg:
                // the branches of an 'if' statement get different colors
                if (edge.trueBranch == true) {
                    return '#5aa52b';
                } if (edge.trueBranch == false) {
                    return '#7C29F0';
                }
                // otherwise normal control flow
                return '#87B2EC';
            case HIREdgeType.op:
                return '#808080';
            case HIREdgeType.sched:
                return '#FDBFC9';
            default:
                return '#000000';
        }
    }

    protected getNodeLabel(node: HIRNode, simpleDisplay: boolean): string {
        if (simpleDisplay) {
            return this.getSimpleNodeLabel(node);
        }
        let outputValue = '[' + node.id + ']: ' + node.name;
        if (node.nodeType === HIRNodeType.CONSTInst) {
            outputValue += ': ' + node.value;
        }
        if (node.operands) {
            outputValue += '[';
            if (node.nodeType === HIRNodeType.IFInst) {
                outputValue += '#' + node.operands[0] + ' ' + this.displayIFCondition(node.condition) + ' #' + node.operands[1];
            } else if (node.nodeType === HIRNodeType.IFAssumptionInst) {
                outputValue += '#' + node.operands[0] + ' ' + this.displayIFCondition(node.condition) + ' #' + node.operands[1];
            } else {
                outputValue += node.operands.map((id) => { return '#' + id; }).toString();
            }
            outputValue += ']';
        }
        return outputValue;
    }

    protected getSimpleNodeLabel(node: HIRNode): string {
        if (node.nodeType === HIRNodeType.CONSTInst) {
            return 'Const: ' + node.value;
        }
        if (node.nodeType === HIRNodeType.RETURNInst) {
            return 'RETURN' + (node.operands ? ' #' + node.operands[0] : '');
        }
        if (node.nodeType === HIRNodeType.IFInst) {
            return 'IF [#' + node.operands[0] + ' ' + this.displayIFCondition(node.condition) + ' #' + node.operands[1] + ']';
        }
        if (node.nodeType === HIRNodeType.IFAssumptionInst) {
            return 'IFAssumption [#' + node.operands[0] + ' ' + this.displayIFCondition(node.condition) + ' #' + node.operands[1] + ']';
        }
        return node.name + (node.operands ? node.operands.map((id) => { return '#' + id; }).toString() : '');
    }

    protected displayIFCondition(condition: string): string {
        switch (condition) {
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