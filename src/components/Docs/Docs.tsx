import React, { useEffect, useState } from 'react'
import s from './Docs.module.css'
import Table from '../common/Table';
import Tree, { TreeNode } from '../common/Tree';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { DocType, setDocs, setDocsPid } from '../../redux/docsSlice';
import { apiBack } from '../../api'
import { createDocsTree, getFilterDocs } from './docsUtils';
import { Callback } from '../common/Tree/types';

const Docs = () => {

    const docsSchema = useAppSelector(state => state.settings.documents.table.schema)
    const stateDocs = useAppSelector(state => state.docs.docs)
    const docId = useAppSelector(state => state.docs.docId)
    const docsPid = useAppSelector(state => state.docs.docsPid)
    const [filterDocs, setFilterDocs] = useState([] as any[])
    const baseUrl = useAppSelector(state => state.settings.documents.baseUrl)
    const dispatch = useAppDispatch();
    const [rootLevel, setRootLevevl] = useState<'seller' | 'docDate'>('seller')
    const [rootLabel, setRootLabel] = useState('')

    const getDocs = async () => {
        return await apiBack.getDocs(baseUrl)
    }

    useEffect(() => {
        rootLevel === 'seller' ? setRootLabel('Sellers') : setRootLabel('Dates')
    })

    useEffect(() => {
        getDocs().then(res => {
            let _docs = res.items.map((d: DocType) => {
                let date = new Date(d.docDate)
                date.setHours(0, 0, 0)
                return { ...d, docDate: date.getTime() }
            })
            dispatch(setDocs(_docs))
        }
        )
    }, [])

    useEffect(() => {
        if (docsPid === '0') {
            setFilterDocs(stateDocs.map(d => ({ ...d, docDate: new Date(d.docDate).toLocaleDateString() })))
        } else {
            const _fDocs = stateDocs.filter(d => getFilterDocs(rootLevel, d, docsPid))
            setFilterDocs(_fDocs.map(d => ({ ...d, docDate: new Date(d.docDate).toLocaleDateString() })))
        }
    }, [docsPid])


    const docsTree = createDocsTree(stateDocs, rootLevel)

    const callbackTree: Callback = (id: string, tagName: string, className: string) => {
        dispatch(setDocsPid(id))
    }

    return (
        <div className={s.parent}>
            <div className={s.docnumber}>
                <button
                    className='fa fa-search'
                    onClick={() => setRootLevevl(rootLevel === 'seller' ? 'docDate' : 'seller')}
                    style={{ margin: 0.5, padding: 5, display: 'inline-flex' }}
                >{rootLevel === 'seller' ? 'setDates' : 'setSellers'}</button>

                <Tree
                    pId='0'
                    data={docsTree}
                    rootLabel={rootLabel}
                    treeLabel=''
                    callback={callbackTree}
                    viewEdit={false}
                    key='docs_tree'
                />
            </div>
            <div className={s.docdetail}>
                {!!filterDocs.length &&
                    <Table
                        records={filterDocs}
                        callbackTree={null}
                        deleteRecord={null}
                        schema={docsSchema}
                    />
                }
            </div>
        </div>
    )
}

export default Docs;
