import { apiEvotor } from '../../api';
import { apiIDB } from '../../api/apiIDB';
import { chooseError } from '../../components/Errors/chooseError';
import {
  setGroupsAC,
  setPidAC,
  setCommoditiesAC,
  setErrorAC,
  setFormErrorAC,
  setViewFormAC,
  toggleFormPostAC,
  setFormDataAC,
  setFormPhotosAC,
  IFormData,
} from '../commoditySlice';
import store, { AppDispatch } from '../redux-store';

export const getProducts = (pId: string) => {
  return (dispatch: AppDispatch) => {
    apiIDB.getProductsPid(pId).then((res) => {
      dispatch(setCommoditiesAC(res));
    });
  };
};

export const getProductId = (id: string | null, isGroup = false) => {
  if (!id) return (dispatch: AppDispatch) => dispatch(setViewFormAC(true));
  return (dispatch: AppDispatch) => {
    let getData;
    if (isGroup) {
      getData = apiIDB.getGroup;
    } else {
      getData = apiIDB.getProduct;
    }
    getData(id)
      .then((res) => {
        dispatch(setFormDataAC({ formData: res, isGroup }));
        return true;
      })
      .then((result) => {
        if (result) dispatch(setViewFormAC(true));
      });
  };
};

export const getGroups = () => {
  return (dispatch: AppDispatch) => {
    apiIDB.getGroup('all').then((res) => {
      dispatch(setGroupsAC(res));
    });
  };
};

export const setGroups = (groups: any[]) => (dispatch: AppDispatch) => {
  dispatch(setGroupsAC(groups));
};

export const setViewForm = (view: boolean) => (dispatch: AppDispatch) => {
  dispatch(setViewFormAC(view));
};

export const setFormData = (formData: any) => (dispatch: AppDispatch) => {
  dispatch(setFormDataAC(formData));
};

export const postFormData =
  (
    typeData: 'product' | 'group',
    typeQuery: 'post' | 'put',
    body: IFormData, // TODO define type of Body
  ) =>
  (dispatch: AppDispatch) => {
    let path;
    switch (typeData) {
      case 'product':
        path = 'product';
        break;
      case 'group':
        path = 'group';
        break;
      default:
        path = 'product';
        break;
    }
    let callbackApi;
    switch (typeQuery) {
      case 'post':
        callbackApi = apiEvotor.postData;
        break;
      case 'put':
        callbackApi = apiEvotor.putData;
        break;
      default:
        callbackApi = apiEvotor.postData;
        break;
    }
    callbackApi(path, body)
      .then((res: any) => {
        if (res.status < 400 || res.id) {
          apiIDB.putData(`${path}s`, res);
        } else {
          throw chooseError(res);
        }
        return res;
      })
      .then((res: any) => {
        if (typeData === 'group') return res.id;
        return res.parent_id ? res.parent_id : '0';
      })
      .then((pid: string | null) => {
        dispatch(toggleFormPostAC(false));
        dispatch(setViewFormAC(false));
        dispatch(setFormDataAC(null));
        if (typeData === 'group') {
          apiIDB.getGroup('all').then((res) => {
            dispatch(setGroupsAC(res));
            dispatch(setPidAC(pid));
          });
          //   .then(dispatch(setPidAC(pid)));
        } else {
          dispatch(setPidAC(pid));
        }
      })
      .catch((err: any) => {
        console.dir(err);
        alert(err);
        dispatch(setFormErrorAC(chooseError(err)));
        dispatch(toggleFormPostAC(false));
      });
  };

export const deleteProduct =
  (id: string, path = 'product') =>
  async (dispatch: AppDispatch) => {
    try {
      let pid = store.getState().commodity.pid;
      let res = await apiEvotor.deleteData(path, id);
      if (res.status >= 400) {
        throw new Error(`Error deleting object \n\r id: ${id}`);
      } else {
        await apiIDB.deleteData(`${path}s`, id);
        if (path === 'group') {
          let groups = await apiIDB.getGroup('all');
          dispatch(setGroupsAC(groups));
          pid = '0';
        }
        dispatch(setPidAC(pid || '0'));
        return id;
      }
    } catch (err) {
      console.dir(err);
      dispatch(setErrorAC(chooseError(err)));
    }
  };

export const setCommodities = (commodities: any[]) => (dispatch: AppDispatch) =>
  dispatch(setCommoditiesAC(commodities));

export const setFormPhotos = (photos: any[]) => (dispatch: AppDispatch) =>
  dispatch(setFormPhotosAC(photos));

export const setPid = (pId: string) => (dispatch: AppDispatch) =>
  dispatch(setPidAC(pId));

export const setError = (err: any) => (dispatch: AppDispatch) =>
  dispatch(setErrorAC(err));

export const setFormError = (err: any) => (dispatch: AppDispatch) =>
  dispatch(setFormErrorAC(err));

export const toggleFormPost = (formPost: boolean) => (dispatch: AppDispatch) =>
  dispatch(toggleFormPostAC(formPost));
