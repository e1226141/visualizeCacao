import { HIRGraphData } from '../data';
import { Pass } from '../data';

/**
 * class containing utility methods.
 */
export class Util {

    // helper method which lists all unique node names to create an enum
    public static listNodeNames(passes: Pass[]): void {
        console.log('listNodeNames:');
        const nodeNameSet = new Set();
        nodeNameSet.add('Unknown');
        passes.forEach(pass => {
            const hir: HIRGraphData | undefined = pass.hir;
            if (hir) {
                hir.nodes.forEach(node => nodeNameSet.add(node.name));
            }
        });
        console.log(Array.from(nodeNameSet).sort().join(',\n'));
    }

    // helper method which lists all unique edge types to create an enum
    public static listEdgeTypes(passes: Pass[]): void {
        console.log('listEdgeTypes:');
        const edgeTypeSet = new Set();
        edgeTypeSet.add('Unknown');
        passes.forEach(pass => {
            const hir: HIRGraphData | undefined = pass.hir;
            if (hir) {
                hir.edges.forEach(edge => edgeTypeSet.add(edge.type));
            }
        });
        console.log(Array.from(edgeTypeSet).sort().join(',\n'));
    }
}