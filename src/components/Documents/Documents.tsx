import React, { useEffect, useState } from 'react';
import { apiBack, apiEvotor } from '../../api';
import ProgressBar from '../common/ProgressBar/ProgressBar';
import { dateToString, getMinData } from '../common/utillites/utilites';
import { CardSell } from './components/CardSell/CardSell';
import { useAppSelector } from '../../redux/hooks';
import Table from '../common/Table';
import { AxiosError, isAxiosError } from 'axios';

const Documents = () => {

    // // TODO разобраться с history
    // if (!props.isInit) {
    //     props.history.push('/settings');
    // }

    const typesOfDocs = useAppSelector(state => state.settings.documents.typesOfDoc)
    //[
    //     ['ACCEPT', 'Приемка товаров'],
    //     ['INVENTORY', 'Документ инвентаризации'],
    //     ['REVALUATION', 'Переоценка'],
    //     ['RETURN', 'Возврат поставщику'],
    //     ['WRITE_OFF', 'Списание'],
    //     ['SELL', 'Продажа'],
    //     ['PAYBACK', 'Возврат'],
    //     ['employees', 'Сотрудники'],
    //     ['ofd', 'Документы ОФД'],
    //     ['invoice', 'Первичка']
    // ]
    const docsSchema = useAppSelector(state => state.settings.documents.table.schema)
    const baseUrl = useAppSelector(state => state.settings.documents.baseUrl)

    const [docs, setDocs] = useState([] as Record<string, any>[]);
    const [isLoading, setIsLoading] = useState(false);
    const [docType, setDocType] = useState(typesOfDocs[9][0]);

    const [period, setPeriod] = useState({
        dateStart: new Date(),
        dateEnd: new Date(),
        dateMin: getMinData()
    });

    useEffect(() => {
        period.dateStart.setHours(0, 0, 0);
    }, [period])

    async function butGetDocs() {
        setIsLoading(true);
        let res;
        try {
            if (docType === 'employees') {
                res = await apiEvotor.getEmployees();
            } else if (docType === 'ofd') {
                res = await apiEvotor.getOfdDocuments();
            } else if (docType === 'invoice') {
                res = await apiBack.getDocs(baseUrl);
                if (isAxiosError(res)) throw new Error(res.message);
                res.items ??= []
                res.items.map((d: any) => {
                    d.docDate = new Date(d.docDate).toLocaleDateString()
                    return d
                })
            } else {
                let p = {
                    dateStart: period.dateStart.getTime(),
                    dateEnd: period.dateEnd.getTime()
                }
                res = await apiEvotor.getDocuments(docType, p);
            }
            if (!res.items) {
                setDocs([]);
            } else {
                setDocs(res.items);
            }
        } catch (e: any) {
            alert(e.message);
            setDocs([]);
        }
        setIsLoading(false);
    }

    function changeDate(e: React.ChangeEvent<HTMLInputElement>) {
        let date = new Date(e.currentTarget.value);
        if (e.currentTarget.name === 'dateStart') {
            date.setHours(0);
        } else {
            date.setHours(23);
        }
        setPeriod({ ...period, [e.currentTarget.name]: date });
    }

    async function docClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        // console.log(e.target.tagName, e.currentTarget.tagName)
        const elem = e.target as HTMLElement
        if (elem.tagName !== 'SPAN') return;
        let id = e.currentTarget.id;
        if (id === 'Временно не работает!') {
            alert(id);
            return;
        }
        let doc: Record<string, any> = { id: 'no doc' };
        if (docType === 'employees') {
            doc = await apiEvotor.getEmployees(id);
            alert(String(doc.name).toUpperCase() + ' ' + String(doc.last_name).toUpperCase())
        } else if (docType === 'invoice') {
            doc = await apiBack.getDocById(id)
            alert(doc.summa)
        } else {
            doc = await apiEvotor.getDocuments('', null, id);
            console.log(doc)
            alert(doc)
        }

        // compose(blobToUrl, blobFromObj)({ obj: doc, fileName: docType });
    }

    function changeType(e: React.ChangeEvent<HTMLSelectElement>) {
        setDocType(e.target.value);
        setDocs([]);
    }

    const styleSpan: React.CSSProperties = {
        cursor: 'pointer',
        border: '1px solid green',
        paddingTop: '0.5rem',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        background: 'yellow'
    }

    return (
        <>
            <h1>Documents {docType}</h1>
            <div>
                <label htmlFor="dateStart">Date start:</label>
                <input type="date" name="dateStart"
                    id="dateStart"
                    value={dateToString(period.dateStart)}
                    min={period.dateMin}
                    max={dateToString()}
                    onChange={changeDate}
                />
                <label htmlFor="dateEnd">Date end:</label>
                <input type="date" name="dateEnd"
                    id="dateEnd"
                    value={dateToString(period.dateEnd)}
                    min={period.dateMin}
                    max={dateToString()}
                    onChange={changeDate}
                />
            </div>
            <label>
                DocType
                <select name="type_docs" id="typeDocs" onChange={changeType} defaultValue={docType[0]}>
                    {
                        typesOfDocs.map(item => {
                            return <option key={item[0]} value={item[0]}>{item[1]}</option>
                        })
                    }
                </select>
            </label>
            <button onClick={butGetDocs} disabled={isLoading}>get Documents</button>
            {isLoading && <ProgressBar limit={20} delay={500} text={'Loading '} />}
            {!docs.length &&
                <div>
                    <h2>No docs</h2>
                </div>
            }
            {!!docs.length &&
                (
                    ((docType === 'invoice') &&
                        <Table
                            records={docs}
                            callbackClick={null}
                            deleteRecord={null}
                            schema={docsSchema}
                            checkedHandler={null}
                        />) ||
                    <ul>
                        {
                            docs.map((item, idx) => {
                                if (docType === 'SELL') return <CardSell key={item.id} {...item} />
                                return (idx < 20) && <li key={item.id || item._id} id={item.id || item._id} onClick={docClick} style={{ margin: '0.5rem' }}>
                                    {!(docType === 'invoice') && <span style={styleSpan}>{item.id}</span>}

                                </li>
                            })
                        }
                    </ul>
                )
            }
        </>
    );
}

export default Documents
