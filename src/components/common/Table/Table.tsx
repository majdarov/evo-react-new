import React, { useEffect, useMemo, useReducer } from 'react';
import useSortableData from '../../../Hooks';
import s from './Table.module.css'
import { clickTable, getMapSchema, getCheckedRecords } from './utilsTable';
import { schemaTableType } from '../../../redux/settingsSlice';
import { useAppDispatch } from '../../../redux/hooks';
import { setCheckedRecords } from '../../../redux/Actions';

interface IProps {
  records: Record<string, any>[];
  schema: schemaTableType;
  callbackClick: (row: string) => void | null;
  deleteRecord: (id: string, path: string) => any | null;
  advMenu?: TAdvMenuElem[] | null;// TODO:add advanse menu
}
export type TAdvMenuElem = {
  lable: string;
  className: string;
  onClick: () => void | null;
}

const initState = [{
  lable: 'Change Group',
  className: 'fa fa-list',
  onClick: () => { }
}] as TAdvMenuElem[]

function reducer(state = initState, action: { type: string; payload?: any; }) {
  if (action.type === 'setMenu') {
    return action.payload
  } else {
    state[0].onClick = action.payload
  }
  return state;
}

export default function Table({ records, schema, callbackClick, deleteRecord, advMenu }: React.PropsWithoutRef<IProps>) {

  const { items, requestSort, sortConfig } = useSortableData(records);

  const [checked, setChecked] = React.useState<string[]>([])

  const [menu, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    if (advMenu?.length) {
      dispatch({ type: 'setMenu', payload: advMenu })
    } else {
      dispatch({ type: 'resetMenu', payload: () => alert(`Change Group for ${getCheckedRecords()?.length || 0} items.`) })
    }
  }, [advMenu, dispatch])

  const appDispatch = useAppDispatch()
  useEffect(() => {
    setCheckedRecords(checked)(appDispatch)
  }, [appDispatch, checked])

  const schemaOut = useMemo(() => getMapSchema(schema), [schema]);

  if (!items.length) return <p>Empty Group!</p>


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
    <div onClick={ev => {
      clickTable(ev, callbackClick, deleteRecord);
      const checked = getCheckedRecords() || []
      setChecked(checked);
    }}>
      {!!checked.length && !!menu?.length &&
        <div className={s['chk_menu']}>
          {menu.map((item: TAdvMenuElem, idx: number) => {
            return <button key={idx} onClick={item.onClick}><i className={item.className} />{item.lable}</button>
          })}
        </div>
      }
      <table id='table'>
        <thead>
          <tr>
            <th key='chk' id='chk'><input id='chkAll' type='checkbox' /></th>
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
