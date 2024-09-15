import { getTitleAC, chooseLangAC } from "../navSlice";
import { AppDispatch } from "../redux-store";

export const getTitle = (path: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(getTitleAC(path));
  };
};

export const chooseLang = (lng: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(chooseLangAC(lng));
  };
};
