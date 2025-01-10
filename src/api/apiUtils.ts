import apiEvotor from './apiEvotor';
import { apiIDB } from './apiIDB';

export function compose(...fns: any) {
  return (x: any) =>
    fns.reduceRight((acc: any, fn: (...args: any | null) => {}) => fn(acc), x);
}

export function map(cb: (...args: any | null) => {}) {
  return (arr: any[]) => arr.map(cb);
}

export function testNeedUpdate(
  date: string | number | null,
  periodUpdate = 24,
) {
  if (!date) return true;
  if (typeof date === 'string') {
    date = new Date(date).getTime();
  }
  let needUpdate = (Date.now() - date) / 1000 / 3600;
  if (needUpdate > periodUpdate) {
    return true;
  } else {
    return false;
  }
}

export async function fetchGroupsProducts() {
  // Get groups
  try {
    let res = await apiEvotor.fetchGroupsEvo();
    let groups = await res.items;
    await apiIDB.pushItems('groups', groups);
    // Get products
    res = await apiEvotor.fetchProductsEvo();
    let products = await res.items;
    products = map((item) => {
      if (!item.parent_id) item.parent_id = '0';
      if (!item.barcodes) item.barcodes = [];
      if (!item.photos) item.photos = [];
      return item;
    })(products);
    await apiIDB.pushItems('products', products);
    localStorage.setItem('lastUpdate', String(Date.now()));
    console.log('LS: ' + new Date(+localStorage.lastUpdate));
    return true;
    // return { groups, products, load: true };
  } catch (e: any) {
    console.error(e.message);
    return e;
  }
}

export async function isEmptyGroup(pId: string) {
  let groupsLength = (await apiIDB.getGroupsPid(pId)).length;
  let productsLength = (await apiIDB.getProductsPid(pId)).length;
  if (pId === '0' || !pId) return false;
  if (!(groupsLength + productsLength)) {
    return true;
  } else {
    return false;
  }
}

export async function syncGroupsProducts(callback: Function | null = null) {
  const log = (text: string, progress: number) => {
    console.log(text);
    if (callback) callback(text, progress);
  };
  try {
    // Get groups
    log('Get groups...', 0.25);
    let res = await apiEvotor.fetchGroupsEvo();
    let groups = await res.items;
    // Get products
    log('Get products...', 0.5);
    res = await apiEvotor.fetchProductsEvo();
    let products = await res.items;
    products = map((item) => {
      if (!item.parent_id) item.parent_id = '0';
      if (!item.barcodes) item.barcodes = [];
      if (!item.photos) item.photos = [];
      item.created_at = Date.parse(item.created_at);
      item.updated_at = Date.parse(item.updated_at);
      return item;
    })(products);
    localStorage.setItem('lastUpdate', String(Date.now()));
    console.log('LS: ' + new Date(+localStorage.lastUpdate));
    log('Clear storage...', 0.75);
    await apiIDB.clearStore('products');
    await apiIDB.clearStore('groups');
    log('Write groups in IDB...', 0.8);
    await apiIDB.pushItems('groups', groups);
    log('Write products in IDB...', 0.9);
    await apiIDB.pushItems('products', products);
    return groups;
  } catch (e: any) {
    console.error(e.message);
    return e;
  }
}
