import { apiIDB } from '../../../api/apiIDB';
import { randomMax } from '../../common/utillites/utilites';

export const setNewCode = async () => {
  //let maxCode = Math.floor(Math.random() * 1e5);
  //await productsApi.getData('products', { max: 'code' });
  let arr: any[] = await apiIDB.getProduct('all');
  // debugger
  let codes = arr.map((item) => +item.code || 0);
  let maxCode = Math.max.apply(null, codes);
  let newCode = maxCode + 1;
  return newCode;
};

export function newBarcode(code: string, prefix = '0000') {
  // if (!prefix) prefix = '0000';
  code = '';
  for (let i = 1; i <= 6; i++) {
    code += randomMax(9).toString();
  }
  let A1 = '20'.concat(prefix) + code;
  // '0'.repeat(6 - code.toString().length) + code.toString();
  let A2 = 0;
  A1.split('').forEach((item, i) => {
    if (i % 2 !== 0) {
      A2 += Number(item) * 3;
    } else {
      A2 += Number(item);
    }
  });
  A2 = (10 - (A2 % 10)) % 10;
  return A1.concat(String(A2));
}

export function viewBarcode(barcode: string) {
  let f1 = 65;
  let f2 = 75;
  let s = [
    [f1, f1, f1, f1, f1, f1],
    [f1, f1, f2, f1, f2, f2],
    [f1, f1, f2, f2, f1, f2],
    [f1, f1, f2, f2, f2, f1],
    [f1, f2, f1, f1, f2, f2],
    [f1, f2, f2, f1, f1, f2],
    [f1, f2, f2, f2, f1, f1],
    [f1, f2, f1, f2, f1, f2],
    [f1, f2, f1, f2, f2, f1],
    [f1, f2, f2, f1, f2, f1],
  ];

  try {
    let bcStr = barcode.split('')[0];
    let n = Number(bcStr);

    for (let i = 1; i <= 6; i++) {
      bcStr += String.fromCharCode(
        Number(barcode.slice(i, i + 1)) + s[n][i - 1],
      );
    }
    bcStr += String.fromCharCode(42);
    for (let i = 7; i <= 12; i++) {
      bcStr += String.fromCharCode(Number(barcode.slice(i, i + 1)) + 97);
    }

    bcStr += String.fromCharCode(43);
    return { str: bcStr, err: null };
  } catch (err: any) {
    return { str: null, err: err.message };
  }
}

export function validateBarcode(barcode: string) {
  function testBarcode(barcode: string) {
    if (isNaN(Number(barcode))) return false;
    if (![7, 8, 12, 13].includes(barcode.length)) {
      return false; //`Not valid Length barcode: ${barcode.length}`;
    }
    let res = 0;
    barcode.split('').forEach((item, i) => {
      if (i % 2 !== 0) {
        res += Number(item) * 3;
        res = res % 10;
      } else {
        res += Number(item);
        res = res % 10;
      }
    });
    return res;
  }

  let res = testBarcode(barcode);

  if (res && res !== 0) {
    let message = '';
    if (barcode.length === 13 || barcode.length === 8) {
      let errDig = barcode.slice(-1);
      message += 'Not valid control digit: ' + errDig + '\r\n';
      message += validateBarcode(barcode.slice(0, -1));
    } else if (barcode.length === 12 || barcode.length === 7) {
      let newRes = 10 - res;
      message += 'Need add control digit: ' + newRes;
    } else {
      message += 'Not valid Length barcode: ' + barcode.length;
    }
    return message;
  }
  return res;
}

export function validateZeroData(curr: any /* , prev */) {
  for (let key in curr) {
    /* let arrNotChanged = false;
    if (Array.isArray(curr[key])) {
      let compare = arrCompare(curr[key], prev[key]);
      arrNotChanged = !compare.resArrMinus.length && !compare.resArrPlus.length;
    } */

    let isNotData = curr[key] === null || curr[key] === undefined;
    // (curr.isNewData && !curr[key]);

    // let isNotChanged = !curr.isNewData && curr[key] === prev[key];

    if (/* arrNotChanged || */ isNotData /* || isNotChanged */) {
      delete curr[key];
    }
  }
}

export function validateRequiredData(body: any, isGroup = false) {
  let requiredData;

  if (isGroup) {
    requiredData = ['name'];
  } else {
    requiredData = [
      'type',
      'name',
      // 'price',
      'measure_name',
      'tax',
      'allow_to_sell',
    ];
  }
  let missData: string[] = [];

  Object.keys(body).forEach((key) => {
    if (!body[key] && requiredData.includes(key)) {
      missData.push(key);
    }
  });

  return missData;
}

export function arrCompare(arr1 = [], arr2 = []) {
  let resArrPlus: any[] = [];
  arr2.forEach((item) => {
    if (!arr1.includes(item)) {
      resArrPlus.push(item);
    }
  });
  let resArrMinus: any[] = [];
  arr1.forEach((item) => {
    if (!arr2.includes(item)) {
      resArrMinus.push(item);
    }
  });
  return { resArrPlus, resArrMinus };
}

export function dateToLocaleString(date = new Date()) {
  let days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пят', 'Суб'];
  let day = date.getDay();
  return `${days[day]} ${date.toLocaleString()}`;
}

export function clearFormElements(formName: any) {
  let form: HTMLFormElement = document.forms[formName];
  Array.from(form.elements).forEach((elem: any) => {
    if (elem.tagName === 'INPUT') {
      if (elem.type === 'checkbox') {
        elem.checked = false;
      } else {
        elem.value = '';
      }
    }
  });
  // form['name'].focus();
}
