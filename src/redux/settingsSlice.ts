import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './appSlice';

interface ISchemaTable {
  [key: string]: [string, number]
  // name: ['Наименование', 1],
  // code: ['', 0],
}

export type TypeOfDoc = [ string, string ]

export type SettingsState = {
  documents:{
    typesOfDoc: TypeOfDoc[]
  }
  products: {
    table: {
      schema: ISchemaTable//{
    }
  }
};

const initialState: SettingsState = {
  documents: {
    typesOfDoc: [
      ['ACCEPT', 'Приемка товаров'],
      ['INVENTORY', 'Документ инвентаризации'],
      ['REVALUATION', 'Переоценка'],
      ['RETURN', 'Возврат поставщику'],
      ['WRITE_OFF', 'Списание'],
      ['SELL', 'Продажа'],
      ['PAYBACK', 'Возврат'],
      ['employees', 'Сотрудники'],
      ['ofd', 'Документы ОФД'],
      ['invoice', 'Первичка']
    ]
  },
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
