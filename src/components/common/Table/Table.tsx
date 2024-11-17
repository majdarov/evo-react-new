import React, { useMemo } from 'react';
import useSortableData from '../../../Hooks';
import s from './Table.module.css'
import { clickTable, getMapSchema } from './utilsTable';
import { schemaTableType } from '../../../redux/settingsSlice';

interface Props {
  records: Record<string, any>[];
  schema: schemaTableType;
  callback: (row: string) => void | null;
  deleteRecord: (id: string, path: string) => any | null;
}

export default function Table({ records, schema, callback, deleteRecord }: React.PropsWithoutRef<Props>) {

  const { items, requestSort, sortConfig } = useSortableData(records);

  if (!items.length) return <p>Empty Group!</p>

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const schemaOut = useMemo(() => getMapSchema(schema), [schema]);

  const headers = schemaOut.map((item: [string, string]) => {
    return item[1];
  });

  const getClassName = (name: string) => {
    if (!sortConfig) return;
    let className = sortConfig.key === name ? sortConfig.direction : null;
    switch (className) {
      case 'asc':
        return 'fa fa-sort-amount-up-alt';
      case 'desc':
        return 'fa fa-sort-amount-down';
      default:
        break;
    }
  }

  return (
    <div onClick={ev => clickTable(ev, callback, deleteRecord)}>
      <table>
        <thead>
          <tr>
            <th key='chk' id='chk' /* onClick={} */><input type='checkbox' /></th>
            {
              headers.map((item: string, idx: number) => {
                if (item === 'uuid' || item === 'id' || item === '_id') return null;
                return <th
                  key={item}
                  onClick={() => requestSort(schemaOut[idx][0])}
                >{item}<i className={getClassName(schemaOut[idx][0])}></i></th>
              })
            }
          </tr>
        </thead>
        <tbody>
          {items.map(record => (
            <tr key={record.uuid || record.id || record._id} id={record.uuid || record.id || record._id}>
              <td
                key={`chk_${record.id || record.uuid || record._id}`}
                id={`chk_${record.id || record.uuid || record._id}`}
              >
                <input type='checkbox' />
              </td>
              {schemaOut.map((item: [string, string]) => {
                if (item[0] === 'uuid' || item[0] === 'id' || item[0] === '_id') return null;
                return <td key={`${item[0]}_${record.id || record.uuid || record._id}`} id={item[0]}>{record[item[0]]}</td>
              })}
              <td key={`del_${record.id || record.uuid || record._id}`}><span className={s.del}></span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
