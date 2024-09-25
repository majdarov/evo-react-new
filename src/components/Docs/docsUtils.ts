import { DocType } from "../../redux/docsSlice";
import { TreeNode } from "../common/Tree";

export function createDocsTree(docs: DocType[], rootLevel: 'seller' | 'docDate' = 'seller') {

    let roots: {rootId: string | number, children: any[]}[] = []
    let docsTree: TreeNode[] = []

    function getCondition(rootId: string | number, d: DocType) {
        if (rootLevel === "seller") {
            return (rootId === d[rootLevel]._id)
        } else {
            return (rootId === d[rootLevel])
        }
    }

    function getTreeElement(lvl: 'root' | 'child', d: DocType) {

        let childLevel = rootLevel === 'seller' ? 'docDate' : 'seller';

        let levels: Record<string, any> = {
            seller: {
                id: lvl === 'root' ? d.seller._id : `${d.docDate}${d.seller._id}`,
                label: d.seller.name,
                pid: lvl === 'root' ? '0' : `${d.docDate}`,
            } as TreeNode,

            docDate: {
                id: lvl === 'child' ? `${d.docDate}${d.seller._id}` : String(d.docDate),
                label: new Date(d.docDate).toLocaleDateString(),
                pid: lvl === 'child' ? d.seller._id : '0',
            } as TreeNode
        }

        return lvl === 'root' ? levels[rootLevel] : levels[childLevel]

    }

    docs.forEach((d) => {
        let root = roots.find(r => getCondition(r.rootId, d))
        // add root level
        if (!root) {
            root = {
                rootId: rootLevel === "seller" ? d.seller._id : d.docDate,
                children: []
            }
            roots.push(root);
            // add root group in docsTree
            docsTree.push(getTreeElement('root', d))
        }
        // add child level
        let _childId = rootLevel === 'seller' ? d.docDate : d.seller._id
        if (!root.children.includes(_childId)) {
            root.children.push(_childId)
            // add date group in docsTree
            docsTree.push(getTreeElement('child', d))
        }
    });

    return docsTree;
}

export function getFilterDocs(rootLevel: 'seller' | 'docDate', d: DocType, docsPid: string) {
    if (rootLevel === 'seller') {
        return (d.seller._id === docsPid || (d.docDate.toString() + d.seller._id) === docsPid)
    } else {
        return ((d.docDate.toString() + d.seller._id) === docsPid || d.docDate.toString() === docsPid)
    }
}
