import { createSlice } from '@reduxjs/toolkit';
import { documentConstants, documentSchemaOfTable, productsSchemaOfTable } from '../config';

export type schemaTableType = {
  [key: string]: [ string, number ]
  // name: ['Наименование', 1],
  // code: ['', 0],
}

export type TypeOfDoc = [ string, string ]

export type SettingsState = {
  documents:{
    table: {
      schema: schemaTableType
    }
    typesOfDoc: TypeOfDoc[]
    baseUrl: string
  }
  products: {
    table: {
      schema: schemaTableType
    }
  }
};

const initialState: SettingsState = {
  documents: {
    baseUrl: localStorage.getItem('backUrl') || '',
    typesOfDoc: documentConstants.TYPES_OF_DOC,
    table: {
      schema: documentSchemaOfTable
    }
  },
  products: {
    table: {
      schema: productsSchemaOfTable
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
      setBaseUrl(state, action) {
        state.documents.baseUrl = action.payload
      }
  }
})

export const { setBaseUrl } = settingsSlice.actions;

export default settingsSlice;
