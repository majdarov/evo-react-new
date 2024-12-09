import React, { useEffect, useState } from 'react'
import s from './Docs.module.css'
import Table from '../common/Table';
import Tree from '../common/Tree';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { DocType, setDocs, setDocsPid } from '../../redux/docsSlice';
import { apiBack } from '../../api'
import { createDocsTree, getFilterDocs } from './docsUtils';
import { TreeCallback } from '../common/Tree/types';
import { DocForm, IDocFormData } from './DocsForm';
import { docLifeCircle, docPaymentStatus, docTypes } from '../../types/doc_types';

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

    const [viewForm, setViewForm] = useState(false)
    const [formData, setFormData] = useState({}) as any

    useEffect(() => {
        rootLevel === 'seller' ? setRootLabel('Sellers') : setRootLabel('Dates')
    }, [rootLevel])

    useEffect(() => { // Get docs from backend service

        const getDocs = async () => {
            return await apiBack.getDocs(baseUrl)
        }
        getDocs().then(res => {
            let _docs;
            if (!!res?.items?.length) {
                _docs = res.items.map((d: DocType) => {
                    let date = new Date(d.docDate)
                    date.setHours(0, 0, 0)
                    return { ...d, docDate: date.getTime() }
                })
                dispatch(setDocs(_docs))
            }
        }
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [baseUrl])

    useEffect(() => { // Filter docs
        if (docsPid === '0') {
            setFilterDocs(stateDocs.map(d => ({ ...d, docDate: new Date(d.docDate).toLocaleDateString() })))
        } else {
            const _fDocs = stateDocs.filter(d => getFilterDocs(rootLevel, d, docsPid))
            setFilterDocs(_fDocs.map(d => ({ ...d, docDate: new Date(d.docDate).toLocaleDateString() })))
        }
    }, [docsPid, rootLevel, stateDocs])


    const docsTree = createDocsTree(stateDocs, rootLevel)

    const callbackTree: TreeCallback = (id: string, tagName?: string, className?: string) => {
        dispatch(setDocsPid(id))
    }

    const tableClick = (id: string) => {
        const doc = filterDocs.find(d => d._id === id)
        let formData: IDocFormData = {
            ...doc,
            createStatus: docLifeCircle[doc.createStatus],
            docType: docTypes[doc.docType],
            paymentStatus: docPaymentStatus[doc.paymentStatus],
        }
        setFormData(formData);
        setViewForm(true);
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
                {viewForm &&
                    <DocForm
                        formData={formData}
                        callback={() => setViewForm(false)}
                    />
                }
                {!!filterDocs.length && !viewForm &&
                    <Table
                        records={filterDocs}
                        callbackClick={tableClick}
                        deleteRecord={null}
                        schema={docsSchema}
                        checkedHandler={null}
                    />
                }
            </div>
        </div>
    )
}

export default Docs;
