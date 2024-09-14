import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  groups: [],
  commodities: [],
  pid: '0',
  isLoaded: false,
  comIsLoaded: false,
  error: null,
  lastUpdate: 1585166400000,
  isUpdated: false,
  viewForm: false,
  form: {
    formData: {
      id: null,
      name: '',
      code: '',
      measure_name: 'шт',
      tax: 'NO_VAT',
      allow_to_sell: true,
      description: '',
      article_number: '',
      parent_id: null,
      type: 'NORMAL',
      price: 0,
      cost_price: 0,
      quantity: 0,
      photos: [],
      barcodes: [],
    },
    formPost: false,
    resMessage: null,
    formError: null,
    isGroup: false,
    photos: [],
  },
};

const commoditySlice = createSlice({
  name: 'commodity',
  initialState,
  reducers: {
    setGroupsAC(state, action) {
      let groups = [];
      let _groups = action.payload;
      _groups.forEach((item) => {
        let group = {
          id: item.id,
          pid: item.parent_id ? item.parent_id : null,
          label: item.name,
          // code: Date.parse(item.createdAt)
        };
        groups.push(group);
      });
      // groups.sort((a,b) => a.code - b.code);
      state.groups = [...groups];
      state.isLoaded = true;
    },
    setPidAC(state, action) {
     state.pid = action.payload;
     state.comIsLoaded = false;
    },
    setCommoditiesAC(state, action) {
      state.commodities = [...action.payload];
      state.comIsLoaded = true;
    },
    setErrorAC(state, action) {
      state.error = action.payload
    },
    setFormErrorAC(state, action) {
      state.form.formError = action.payload
    },
    setViewFormAC(state, action) {
      state.viewForm = action.payload
    },
    toggleFormPostAC(state, action) {
      state.form.formPost = action.payload
    },
    setFormDataAC(state, action) {
      const formData = action.payload ?? initialState.form.formData
        // action.payload === null ? initialState.form.formData : action.payload;
      const isGroup = true && action.isGroup;
      state.form.formData = formData;
      state.form.isGroup = isGroup;
    },
    setFormPhotosAC(state, action) {
      state.form.photos = [...action.payload]
    }
  }
})

export const { setGroupsAC, setPidAC, setCommoditiesAC, setErrorAC, setFormErrorAC, setViewFormAC, toggleFormPostAC, setFormDataAC, setFormPhotosAC } = commoditySlice.actions;

export default commoditySlice;
