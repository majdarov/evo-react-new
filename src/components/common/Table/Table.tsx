import React, { useEffect, useMemo, useReducer } from 'react';
import useSortableData from '../../../Hooks';
import s from './Table.module.css'
import { clickTable, getMapSchema, getCheckedRecords } from './utilsTable';
import { schemaTableType } from '../../../redux/settingsSlice';
import { useAppDispatch } from '../../../redux/hooks';
import { setCheckedRecordsAC } from '../../../redux/appSlice';
import { apiIDB } from '../../../api/apiIDB';
import { Button } from '../Forms/Button/Button';

interface IProps {
  records: Record<string, any>[];
  schema: schemaTableType;
  callbackClick: ((row: string) => void) | null;
  deleteRecord: Function/* (id: string, path: string) => any  */ | null;
  checkedHandler: Function | null;
  advMenu?: TAdvMenuElem[] | null; //add advanse menu
}
export type TAdvMenuElem = {
  lable: string;
  className: string;
  onClick: () => void | null;
}

const initMenu = [{
  lable: 'Change Group',
  className: 'fa fa-list',
  onClick: () => { }
}] as TAdvMenuElem[]

function reducer(menu = initMenu, action: { type: string; payload?: any; }) {
  if (action.type === 'setMenu') {
    return action.payload
  } else {
    menu[0].onClick = action.payload
  }
  return menu;
}

export default function Table({ records, schema, callbackClick, deleteRecord, advMenu, checkedHandler }: React.PropsWithoutRef<IProps>) {

  const { items, requestSort, sortConfig } = useSortableData(records);

  const [checked, setChecked] = React.useState<string[]>([])

  const [menu, dispatch] = useReducer(reducer, initMenu);

  const ids = ['uuid', 'id', '_id'];

  useEffect(() => {
    if (advMenu?.length) {
      dispatch({ type: 'setMenu', payload: advMenu })
    } else {
      dispatch({ type: 'resetMenu', payload: () => alert(`Change Group for ${getCheckedRecords()?.length || 0} items.`) })
    }
  }, [advMenu, dispatch])

  const appDispatch = useAppDispatch()
  useEffect(() => {
    const checkedRecords = [] as any[]
    checked.forEach(async id => {
      // const item = await checkedHandler(id)
      const item = await apiIDB.getProduct(id)
      checkedRecords.push(item);
      appDispatch(setCheckedRecordsAC(checkedRecords));
    })
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
            // return <button key={idx} onClick={item.onClick}><i className={item.className} />{item.lable}</button>
            return <Button
              label={item.lable} key={idx} callback={item.onClick} icon={item.className}
            />
          })}
        </div>
      }
      <table id='table'>
        <thead>
          <tr>
            <th key='chk' id='chk'><input id='chkAll' type='checkbox' /></th>
            {
              headers.map((item: string, idx: number) => {
                if (ids.includes(item[0])) return null;
                return <th key={item} onClick={() => requestSort(schemaOut[idx][0])}>
                  {item}<i className={getClassName(schemaOut[idx][0])}></i>
                </th>;;
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            items.map(record => {
              const id = record.uuid || record.id || record._id;
              return (
                <tr key={id} id={id}>
                  <td key={`chk_${id}`} id={`chk_${id}`}>
                    <input type='checkbox' />
                  </td>
                  {schemaOut.map((item: [string, string]) => {
                    if (ids.includes(item[0])) return null;
                    return <td key={`${item[0]}_${id}`} id={item[0]}>{record[item[0]]}</td>
                  })}
                  <td key={`del_${id}`}><span className={s.del}></span></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}
