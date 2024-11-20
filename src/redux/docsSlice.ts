import { createSlice } from '@reduxjs/toolkit';

export type DocsState = {
  docs: DocType[];
  docIsOpen: boolean;
  docId: string | null;
  docsPid: string;
};

export type Product = {
  name: string;
  code: string;
  price: number;
  cost_price: number;
  quantity: number;
  measure_name: string;
  barcodes: string[];
};

export type SellerType = {
  _id: string;
  name: string;
  other_data: object;
};

export type DocType = {
  [key: string]: any;
  _id: string;
  createStatus: number;
  docDate: number;
  docNumber: string;
  docSum: number;
  docType: number;
  paymentStatus: number;
  products: Product[];
  seller: SellerType;
  summa: number;
};

const initialState: DocsState = {
  docs: [],
  docIsOpen: false,
  docId: null,
  docsPid: '0',
};

const docsSlice = createSlice({
  name: 'docs',
  initialState,
  reducers: {
    setDocs(state, action) {
      state.docs = [...action.payload].map((d) => ({ ...d }));
    },
    setDocIsOpen(state, action) {
      state.docIsOpen = action.payload as boolean;
    },
    setDocId(state, action) {
      state.docId = action.payload as string | null;
    },
    setDocsPid(state, action) {
      state.docsPid = action.payload as string;
    },
  },
});

export const { setDocs, setDocIsOpen, setDocId, setDocsPid } =
  docsSlice.actions;

export default docsSlice;
