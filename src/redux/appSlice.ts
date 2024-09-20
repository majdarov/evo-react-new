import { createSlice } from '@reduxjs/toolkit';

// interface SyncDataType {
//   products: any[]
//   groups: any[]
// }

export type AppState = {
  appKey: string | null
  storeKey: string | null
  isInit: boolean
  stores: string[]
  lastUpdate: number
  periodUpdate: number
  // syncData?: SyncDataType
}

const initialState: AppState = {
  appKey: null,
  storeKey: null,
  isInit: false,
  stores: [],
  lastUpdate: 0,
  periodUpdate: 24,
  // syncData: {
  //   products: [],
  //   groups: [],
  // },
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
    // case SET_APP_KEY:
    setAppKeyAC(state, action) {
      state.appKey = action.payload
    },
    // case SET_STORE_KEY:
    setStoreKeyAC(state, action) {
      state.storeKey = action.payload
    },
    // case INIT_APP:
      // return { ...state, isInit: action.init };
    toggleInitAppAC(state, action) {
      state.isInit = action.payload
    },
    // case SET_STORES:
    // return { ...state, stores: [...action.stores] };
    setStoresAC(state, action) {
      state.stores = [...action.payload]
    },
    // case SET_LAST_UPDATE:
    // return { ...state, lastUpdate: +action.dateUpdate };
    setLastUpdateAC(state, action) {
      state.lastUpdate = +action.payload
    },
    // case SET_PERIOD_UPDATE:
    // return { ...state, periodUpdate: action.periodUpdate };
    setPeriodUpdateAC(state, action) {

      let { periodUpdate } = action.payload;

      if (isNaN(+periodUpdate)) {
        periodUpdate = 24;
      } else if (+periodUpdate < 1) {
        periodUpdate = 1;
      } else if (+periodUpdate > 24) {
        periodUpdate = 24;
      } else {
        periodUpdate = +periodUpdate;
      }

      state.periodUpdate = periodUpdate
    },

    // case SET_SYNC_DATA:
      // return {
      //   ...state,
      //   syncData: {
      //     products: [...action.products],
      //     groups: [...action.groups],
      //   },
      // };
    // setSyncDataAC(state, action) {

    //   const { products, groups } = action.payload;

    //   state.syncData = { products, groups }
    // },

    // // case CLEAR_SYNC_DATA:
    //   // return { ...state, syncData: { products: [], groups: [] } };
    // clearSyncDataAC(state) {
    //   state.syncData = { products: [], groups: [] }
    // },

  }
});

export const {
  setAppKeyAC, setStoreKeyAC, toggleInitAppAC, setStoresAC, setLastUpdateAC, setPeriodUpdateAC/* , setSyncDataAC, clearSyncDataAC */
} = appSlice.actions

export default appSlice;
