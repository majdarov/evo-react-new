import { useAppSelector } from '../../../redux/hooks';
import { schemaTableType } from '../../../redux/settingsSlice';
import s from './Table.module.css';

export function clickCell(ev: React.MouseEvent<HTMLElement, MouseEvent>) {
  let elem: HTMLElement = ev.target as HTMLElement;
  if (elem.tagName === 'TD' || elem.closest('td')) {
    let row = elem.closest('tr')!.id;
    let column = elem.getAttribute('name');
    let cell = elem.innerText;
    return { row, column, cell };
  } else {
    return;
  }
}

export async function clickTable(
  ev: React.MouseEvent<HTMLElement, MouseEvent>,
  callback: (row: string) => {},
  delRowCallback: (id: string, path: string) => {} | null
) {
  let elem = ev.target as HTMLElement;
  let result = clickCell(ev);
  if (!result) return;
  if (elem.tagName === 'SPAN') {
    let isRealyDelete =
      !!delRowCallback &&
      elem.className === s.del &&
      window.confirm(
        `${elem.innerText}\n\rYou'r realy wanted delete this product?`,
      );

    if (isRealyDelete) {
      let id = result.row;
      let res = await delRowCallback(id, 'product');
      alert(`Product id: ${res}\n\rDELETED!`);
    } else {
      alert('CANCEL DELETED!');
    }
    return;
  }
  if (!!callback) {
    callback(result.row);
  } else {
    alert(JSON.stringify(result, null, 2));
  }

}


export function getMapSchema(schema: schemaTableType) {

  let mapSchema: any[] = [];
  Object.keys(schema).forEach((key) => {
    let lbl;
    if (!!schema[key][1]) {
      lbl = !!schema[key][0] ? schema[key][0] : key;
      mapSchema.push([key, lbl]);
    }
  });
  return mapSchema;

}
