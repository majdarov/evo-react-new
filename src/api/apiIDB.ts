import { deleteDB, openDB } from 'idb';

export async function initDb() {
  const db = await openDB('Evo', 4, {
    async upgrade(db, oldVersion, newVersion) {
      if (!!newVersion && oldVersion < newVersion) {
        alert('База данных будет обновлена до версии: ' + newVersion);
        // await db.delete();
        console.log(`New version: ${newVersion}`);
      }
      if (!db.objectStoreNames.contains('groups')) {
        const store = db.createObjectStore('groups', { keyPath: 'id' });
        store.createIndex('name', 'name');
        store.createIndex('date', 'created_at');
        store.createIndex('parent_id', 'parent_id');
      }
      if (!db.objectStoreNames.contains('products')) {
        const store = db.createObjectStore('products', { keyPath: 'id' });
        store.createIndex('name', 'name');
        store.createIndex('date', 'created_at');
        store.createIndex('parent_id', 'parent_id');
        store.createIndex('code', 'code');
        store.createIndex('price', 'price');
      }
    },
  });

  return db;
}

export const apiIDB = {
  async getGroup(id: string | undefined) {
    if (!id) return { name: 'Root', id: '0' };
    try {
      const db = await initDb();
      let group;
      if (id === 'all') {
        group = await db.getAll('groups');
      } else if (id === '0') {
        return { name: 'Root', id: '0' };
      } else {
        group = await db.get('groups', id);
      }
      return group;
    } catch (e) {
      console.error(e);
    }
  },

  async getProduct(id?: string | 'all') {
    const db = await initDb();
    let product;
    if (id === 'all' || !id) {
      product = await db.getAll('products');
    } else {
      product = await db.get('products', id);
    }
    return product;
  },

  async getGroupsPid(pid: string) {
    const db = await initDb();
    const groups = await db.getAllFromIndex('groups', 'parent_id', pid);
    return groups;
  },
  async getProductsPid(pid: string) {
    const db = await initDb();
    const products = await db.getAllFromIndex('products', 'parent_id', pid);
    return products;
  },

  async getProductsName(name: string) {
    const db = await initDb();
    const products = await db.getAllFromIndex('products', 'name', name);
    return products;
  },

  async pushItems(store: string, items: any[]) {
    let resItems: any[] = [];
    items.forEach((item) => {
      resItems.push(item);
    });
    /* Init IDB */
    const db = await initDb();
    const tx = db.transaction(store, 'readwrite');
    const promises = resItems.map((item) => {
      return tx.store.put(item);
    });
    // promises.push(tx.done);
    await Promise.all(promises);
    await tx.done;
  },

  async delDb(nameDb: string) {
    await deleteDB(nameDb);
  },

  async putData(storeName: string, data: any) {
    const db = await initDb();
    await db.put(storeName, data);
    return data;
  },

  async deleteData(storeName: string, id: string) {
    const db = await initDb();
    await db.delete(storeName, id);
    return id;
  },

  async clearStore(storeName: string) {
    const db = await initDb();
    await db.clear(storeName);
    return true;
  },
};
