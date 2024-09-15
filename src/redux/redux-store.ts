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

// Infer the `RootState` and `AppDispatch` types from the store itself

// Inferred state type: {todos: TodosState, counter: CounterState}
export type RootState = ReturnType<typeof store.getState>

// Inferred dispatch type: Dispatch & ThunkDispatch<RootState, undefined, UnknownAction>
export type AppDispatch = typeof store.dispatch

export type AppStore = typeof store

export default store;
