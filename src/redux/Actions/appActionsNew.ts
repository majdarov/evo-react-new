import {
  setAppKeyAC,
  setStoreKeyAC,
  toggleInitAppAC,
  setStoresAC,
  setLastUpdateAC,
  setPeriodUpdateAC,
  // setCheckedRecordsAC,
  // setSyncDataAC,
  // clearSyncDataAC,
} from '../appSlice';
import { AppDispatch } from '../redux-store';

export const setAppKey = (key: string) => (dispatch: AppDispatch) => {
  dispatch(setAppKeyAC(key));
};

export const setStoreKey = (key: string) => (dispatch: AppDispatch) => {
  dispatch(setStoreKeyAC(key));
};

export const toggleInitApp = (init: boolean) => (dispatch: AppDispatch) => {
  dispatch(toggleInitAppAC(init));
};

export const setStores = (stores: string[]) => (dispatch: AppDispatch) => {
  dispatch(setStoresAC(stores));
};

export const initializeApp = () => (dispatch: AppDispatch) => {
  if (localStorage.appKey) {
    dispatch(setAppKeyAC(localStorage.appKey));
    if (localStorage.storeKey) {
      dispatch(setStoreKeyAC(localStorage.storeKey));
    }
    if (localStorage.lastUpdate) {
      dispatch(setLastUpdateAC(+localStorage.lastUpdate));
      dispatch(toggleInitAppAC(true));
    }
    if (localStorage.periodUpdate) {
      dispatch(setPeriodUpdate(+localStorage.periodUpdate));
    } else {
      localStorage.setItem('periodUpdate', '24');
    }
  }
};

export const setLastUpdate = () => (dispatch: AppDispatch) => {
  dispatch(setLastUpdateAC(+localStorage.lastUpdate));
};

export const setPeriodUpdate =
  (periodUpdate: number) => (dispatch: AppDispatch) => {
    dispatch(setPeriodUpdateAC(periodUpdate));
  };

// export const setCheckedRecords =
//   (records: string[]) => (dispatch: AppDispatch) => {
//     dispatch(setCheckedRecordsAC(records));
//   };

// export const setSyncData = ({ products, groups }: { products: any[], groups: any[] }) => (dispatch: AppDispatch) => {
//   dispatch(setSyncDataAC({ products, groups }));
// };

// export const clearSyncData = () => (dispatch: AppDispatch) => {
//   dispatch(clearSyncDataAC());
// };
