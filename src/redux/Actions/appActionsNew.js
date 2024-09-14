import {
  setAppKeyAC,
  setStoreKeyAC,
  toggleInitAppAC,
  setStoresAC,
  setLastUpdateAC,
  setPeriodUpdateAC,
  setSyncDataAC,
  clearSyncDataAC,

} from '../appSlice';

export const setAppKey = (key) => (dispatch) => {
  dispatch(setAppKeyAC(key));
};

export const setStoreKey = (key) => (dispatch) => {
  dispatch(setStoreKeyAC(key));
};

export const toggleInitApp = (init) => (dispatch) => {
  dispatch(toggleInitAppAC(init));
};

export const setStores = (stores) => (dispatch) => {
  dispatch(setStoresAC(stores));
};

export const initializeApp = () => (dispatch) => {
  if (localStorage.appKey) {
    dispatch(setAppKeyAC(localStorage.appKey));
    if (localStorage.storeKey) {
      dispatch(setStoreKeyAC(localStorage.storeKey));
    }
    if (localStorage.lastUpdate) {
      dispatch(setLastUpdateAC(localStorage.lastUpdate));
      dispatch(toggleInitAppAC(true));
    }
    if (localStorage.periodUpdate) {
      dispatch(setPeriodUpdate(localStorage.periodUpdate));
    }
  }
};

export const setLastUpdate = () => (dispatch, getState) => {
  // const dateBefore = getState().app.lastUpdate;
  // console.log('Date Before: ' + new Date(dateBefore).toString());
  dispatch(setLastUpdateAC(localStorage.lastUpdate));
  // const dateAfter = getState().app.lastUpdate;
  // console.log('Date After: ' + new Date(dateAfter).toString());
};

export const setPeriodUpdate = (periodUpdate) => (dispatch) => {
  dispatch(setPeriodUpdateAC(periodUpdate));
};

export const setSyncData = ({ products, groups }) => (dispatch) => {
  dispatch(setSyncDataAC({ products, groups }));
};

export const clearSyncData = () => (dispatch) => {
  dispatch(clearSyncDataAC());
};
