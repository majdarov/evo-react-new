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
  }
  products: {
    table: {
      schema: schemaTableType
    }
  }
};

const initialState: SettingsState = {
  documents: {
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
  }
})

// export const { setSchemaAC } = settingsSlice.actions;

export default settingsSlice;
