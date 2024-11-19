import React, { useEffect, useState } from 'react';
import './example.css'
import getDocs from '../Docs/get.docs.json'
import Tree, { TreeNode } from '../common/Tree';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { DocType, setDocs, setDocsPid } from '../../redux/docsSlice';
import Table from '../common/Table';
import { useRouteMatch } from 'react-router-dom';

const Example = () => {

    // let match = useRouteMatch()

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
            return { ...d, docDate: date.getTime() }
        })
        dispatch(setDocs(_docs))
    }, [])

    useEffect(() => {
        if (docsPid === '0') {
            setFilterDocs(stateDocs)
        } else {
            const _fDocs = stateDocs.filter(d => {
                return (
                    d.seller._id === docsPid
                    || (d.docDate.toString() + d.seller._id) === docsPid
                    || d.docDate.toString() === docsPid
                )
            })
            setFilterDocs(_fDocs)
        }
    }, [docsPid])


    // let sellers: {sellerId: string, dates: number[]}[] = []
    let dates: { timestamp: number, sellers: string[] }[] = []
    let docsTree: TreeNode[] = []

    stateDocs.forEach((d) => {
        let date = dates.find(s => s.timestamp === d.docDate)
        // add date level
        if (!date) {
            date = {
                timestamp: d.docDate,
                sellers: []
            }
            dates.push(date);
            // add seller group in docsTree
            docsTree.push({
                id: String(d.docDate),
                label: new Date(d.docDate).toLocaleDateString(),
                pid: '0',
            } as TreeNode)
        }
        // add seller level
        if (!date.sellers.includes(d.seller._id)) {
            date.sellers.push(d.seller._id)
            // add date group in docsTree
            docsTree.push({
                id: String(d.docDate) + d.seller._id,
                label: d.seller.name,
                pid: String(d.docDate)
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
                    {/* <li>{match.url}</li>
                <li>{match.path}</li>
                <li>{match.params.id}</li> */}

                    <Tree
                        pId='0'
                        data={docsTree}
                        rootLabel='Sellers'
                        treeLabel='Docs'
                        callback={callbackTree}
                        viewEdit={true}
                        key='docs_tree'
                    />
                </div>
                <div id='2' className="section blue">
                    {!!filterDocs.length &&
                        <Table
                            records={filterDocs}
                            callbackTree={null}
                            deleteRecord={null}
                            schema={docsSchema}
                        />}
                </div>
            </div>
        </>
    )
}

export default Example;
