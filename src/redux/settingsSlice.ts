import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './appSlice';

interface ISchemaTable {
  [key: string]: [string, number]
  // name: ['Наименование', 1],
  // code: ['', 0],
  // measure_name: ['', 0],
  // tax: ['', 0],
  // allow_to_sell: ['', 0],
  // description: ['', 0],
  // article_number: ['Артикул', 1],
  // parent_id: ['', 0],
  // type: ['', 0],
  // price: ['Цена', 1],
  // cost_price: ['', 0],
  // quantity: ['Количество', 1],
  // barcodes: ['', 0],
}



export type SettingsState = {
  // app: AppState
  products: {
    table: {
      schema: ISchemaTable//{
    }
  }
};

const initialState: SettingsState = {
  // app: {
  //   appKey: null,
  //   storeKey: null,
  //   isInit: false,
  //   stores: [],
  //   lastUpdate: 0,
  //   periodUpdate: 24,
  // },
  products: {
    table: {
      schema: {
        id: ['', 0],
        name: ['Наименование', 1],
        code: ['', 0],
        measure_name: ['', 0],
        tax: ['', 0],
        allow_to_sell: ['', 0],
        description: ['', 0],
        article_number: ['Артикул', 1],
        parent_id: ['', 0],
        type: ['', 0],
        price: ['Цена', 1],
        cost_price: ['', 0],
        quantity: ['Количество', 1],
        barcodes: ['', 0],
      }
    }
  }
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // setSchemaAC(state, action) {
    //   state.products.table.schema = action.payload;
    // }
  }
})

// export const { setSchemaAC } = settingsSlice.actions;

export default settingsSlice;
