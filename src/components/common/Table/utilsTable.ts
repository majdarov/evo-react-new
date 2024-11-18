import { schemaTableType } from '../../../redux/settingsSlice';
import s from './Table.module.css';

export function clickCell(ev: React.MouseEvent<HTMLElement, MouseEvent>) {
  let elem: HTMLElement = ev.target as HTMLElement;
  if (elem.tagName === 'INPUT') return;
  if (elem.tagName === 'TD' || elem.closest('td')) {
    if (elem.id.indexOf('chk') !== -1) return; // checkboxes
    let row = elem.closest('tr')!.id;
    let column = elem.getAttribute('name');
    let cell = elem.innerText;
    return { row, column, cell };
  } else {
    return;
  }
}

export function clickTable(
  ev: React.MouseEvent<HTMLElement, MouseEvent>,
  callback: (row: string) => void | null,
  delRowCallback: (id: string, path: string) => void | null,
) {
  let elem = ev.target as HTMLElement;
  // console.log(elem);
  if (elem.id === 'chkAll') {
    let el = elem as HTMLInputElement;
    let checked = el.checked as boolean;
    toggleCheckAll(checked);
  }
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
      let res = delRowCallback(id, 'product');
      console.log(res);
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
  let mapSchema: [string, string][] = [];
  Object.keys(schema).forEach((key) => {
    let lbl;
    if (!!schema[key][1]) {
      lbl = !!schema[key][0] ? schema[key][0] : key;
      mapSchema.push([key, lbl]);
    }
  });
  return mapSchema;
}

function getRowsFromTable() {
  const table = document.getElementById('table');
  if (!table) return;
  const rows = table.getElementsByTagName('tr');
  return rows;
}

// handler checked records
export function getCheckedRecords() {
  const checked = [];
  const rows = getRowsFromTable();
  if (!rows) return;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row.id) continue;
    const chk = row.getElementsByTagName('input')[0];
    if (chk.checked) {
      checked.push(row.id);
    }
  }
  return checked;
}

export function toggleCheckAll(checked: boolean) {
  const rows = getRowsFromTable();
  if (!rows) return;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const chk = row.getElementsByTagName('input')[0];
    chk.checked = checked;
  }
}
