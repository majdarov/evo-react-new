import React, { useEffect, useState } from 'react'
import s from './Docs.module.css'
import Table from '../common/Table';
import Tree, { TreeNode } from '../common/Tree';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { DocType, setDocs, setDocsPid } from '../../redux/docsSlice';
import { apiBack } from '../../api'
import { createDocsTree } from './docsUtils';
import { Callback } from '../common/Tree/types';

const Docs = () => {

    const docsSchema = useAppSelector(state => state.settings.documents.table.schema)
    const stateDocs = useAppSelector(state => state.docs.docs)
    const docId = useAppSelector(state => state.docs.docId)
    const docsPid = useAppSelector(state => state.docs.docsPid)
    const [filterDocs, setFilterDocs] = useState([] as DocType[])
    const baseUrl = useAppSelector(state => state.settings.documents.baseUrl)
    const dispatch = useAppDispatch();

    const getDocs = async () => {
        return await apiBack.getDocs(baseUrl)
    }

    useEffect(() => {
        getDocs().then( res => {
            let _docs = res.items.map((d: DocType) => {
                let date = new Date(d.docDate)
                date.setHours(0, 0, 0)
                return {...d, docDate: date.getTime()}
            })
            dispatch(setDocs(_docs))}
        )
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


    const docsTree = createDocsTree(stateDocs)

    const callbackTree: Callback = (id: string, tagName: string, className: string) => {
        dispatch(setDocsPid(id))
      }

    return (
        <div className={s.parent}>
            <div className={s.docnumber}>
                <Tree
                    pId='0'
                    data={ docsTree }
                    rootLabel='Sellers'
                    treeLabel='Docs'
                    callback={ callbackTree }
                    viewEdit={false}
                    key='docs_tree'
                />
            </div>
            <div className={s.docdetail}>
                { !!filterDocs.length &&
                    <Table
                        records={ filterDocs }
                        callback={ null }
                        deleteRecord={ null }
                        schema={ docsSchema }
                    />
                }
            </div>
        </div>
    )
}

export default Docs;
