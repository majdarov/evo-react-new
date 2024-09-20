import React, { useMemo } from 'react';
import useSortableData from '../../../Hooks';
import s from './Table.module.css'
import { clickTable, getMapSchema } from './utilsTable';

export default function Table(props) {
  const { records } = props;
  const { items, requestSort, sortConfig } = useSortableData(records);

  if (!items.length) return <p>Empty Group!</p>

  // const schema = props.schema || Object.keys(records[0]);
  const schema = useMemo(() => getMapSchema(props.schema), [props.schema]);

  const headers = schema.map(item => {
    return item[1];
  });

  const getClassName = name => {
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
    <div onClick={ev => clickTable(ev, props.callback, props.deleteRecord)}>
      {/* <caption>Commodities</caption> */}
      <table>
        <thead>
          <tr>
            {
              headers.map((item, idx) => {
                if (item === 'uuid' || item === 'id' || item === '_id') return null;
                return <th
                  key={item}
                  onClick={() => requestSort(schema[idx][0])}
                >{item}<i className={getClassName(schema[idx][0])}></i></th>
              })
            }
          </tr>
        </thead>
        <tbody>
          {items.map(record => (
            <tr key={record.uuid || record.id || record._id} id={record.uuid || record.id || record._id}>
              { schema.map(item => {
                if (item[0] === 'uuid' || item[0] === 'id' || item[0] === '_id') return null;
                return <td key={`${item[0]}_${record.id || record.uuid}`} name={item[0]}>{record[item[0]]}</td>
              })}
              <td key={`del_${record.id || record.uuid || record._id }`}><span className={s.del}></span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
