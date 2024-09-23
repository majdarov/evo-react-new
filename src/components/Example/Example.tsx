import React, { useEffect, useState } from 'react';
import './example.css'
import getDocs from '../Docs/get.docs.json'
import Tree, { TreeNode } from '../common/Tree';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { DocType, setDocs, setDocsPid } from '../../redux/docsSlice';
import Table from '../common/Table';

const Example = () => {

    const docsSchema = useAppSelector(state => state.settings.documents.table.schema)
    const stateDocs = useAppSelector(state => state.docs.docs)
    const docId = useAppSelector(state => state.docs.docId)
    const docsPid = useAppSelector(state => state.docs.docsPid)
    const [filterDocs, setFilterDocs] = useState([] as DocType[])
    const dispatch = useAppDispatch();

    useEffect(() => {
        let _docs = getDocs.items.map(d => {
            let date = new Date(d.docDate)
            date.setHours(0, 0, 0)
            return {...d, docDate: date.getTime()}
        })
        dispatch(setDocs(_docs))
    }, [])

    useEffect(() => {
        if (docsPid === '0') {
            setFilterDocs(stateDocs)
        } else {
            const _fDocs = stateDocs.filter(d => {
                return (d.seller._id === docsPid || (d.docDate.toString() + d.seller._id) === docsPid)
            })
            setFilterDocs(_fDocs)
        }
    }, [docsPid])


    let sellers: {sellerId: string, dates: number[]}[] = []
    let docsTree: TreeNode[] = []

    stateDocs.forEach((d) => {
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

    const callbackTree = (id: string, tagName: string, className: string) => {
        dispatch(setDocsPid(id))
      }

    return (
        <>
            <div className="parent">
                <div id='1' className="section yellow">
                <Tree
                    pId='0'
                    data={ docsTree }
                    rootLabel='Sellers'
                    treeLabel='Docs'
                    callback={ callbackTree }
                    viewEdit={true}
                    key='docs_tree'
                />
                </div>
                <div id='2' className="section blue">
                { !!filterDocs.length &&
                    <Table
                        records={ filterDocs }
                        callback={ null }
                        deleteRecord={ null }
                        schema={ docsSchema }
                    />}
                </div>
            </div>
        </>
    )
}

export default Example;
