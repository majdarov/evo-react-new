import { configureStore } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import navSlice from './navSlice';
import settingsSlice from './settingsSlice';
import commoditySlice from './commoditySlice';

let store = configureStore({
  reducer: {
    navigation: navSlice.reducer,
    commodity: commoditySlice.reducer,
    app: appSlice.reducer,
    settings: settingsSlice.reducer,
  }
})

export default store;
