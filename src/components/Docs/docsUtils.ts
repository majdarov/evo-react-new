import { DocType } from "../../redux/docsSlice";
import { TreeNode } from "../common/Tree";

export function createDocsTree(docs: DocType[]) {
    let sellers: {sellerId: string, dates: number[]}[] = []
    let docsTree: TreeNode[] = []

    docs.forEach((d) => {
        let seller = sellers.find(s => s.sellerId === d.seller._id)
        // add seller level
        if (!seller) {
            seller = {
                sellerId: d.seller._id,
                dates: []
            }
            sellers.push(seller);
            // add seller group in docsTree
            docsTree.push({
                id: d.seller._id,
                label: d.seller.name,
                pid: '0',
            } as TreeNode)
        }
        // add date level
        if (!seller.dates.includes(d.docDate)) {
            seller.dates.push(d.docDate)
            // add date group in docsTree
            docsTree.push({
                id: String(d.docDate) + d.seller._id,
                label: new Date(d.docDate).toLocaleDateString(),
                pid: d.seller._id,
            } as TreeNode)
        }
    });

    return docsTree;
}
