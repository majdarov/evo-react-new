import { useAppSelector } from '../../../redux/hooks';
import s from './Table.module.css';

export function clickCell(ev) {
  let elem = ev.target;
  if (elem.tagName === 'TD' || elem.closest('td')) {
    let row = elem.closest('tr').id;
    let column = elem.getAttribute('name');
    let cell = elem.innerText;
    return { row, column, cell };
  } else {
    return;
  }
}

export async function clickTable(ev, callback, delRowCallback) {
  let elem = ev.target;
  let result = clickCell(ev);
  if (!result) return;
  if (elem.tagName === 'SPAN') {
    let isRealyDelete =
      delRowCallback &&
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
  if (callback) {
    callback(result.row);
  } else {
    alert(JSON.stringify(result, null, 2));
  }
}
