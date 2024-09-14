import { getTitleAC, chooseLangAC } from "../navSlice";

export const getTitle = (path) => {
  return (dispatch) => {
    dispatch(getTitleAC(path));
  };
};

export const chooseLang = (lng) => {
  return (dispatch) => {
    dispatch(chooseLangAC(lng));
  };
};
