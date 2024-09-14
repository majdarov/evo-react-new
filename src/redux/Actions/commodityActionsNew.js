import { apiForIdb } from '../../api/api';
import { apiIDB } from '../../api/apiIDB';
import { chooseError } from '../../components/Errors/chooseError';
import { setGroupsAC, setPidAC, setCommoditiesAC, setErrorAC, setFormErrorAC, setViewFormAC, toggleFormPostAC, setFormDataAC, setFormPhotosAC } from '../commoditySlice';

export const getProducts = (pId) => {
  return (dispatch) => {
    apiIDB.getProductsPid(pId).then((res) => {
      // console.log(res)
      dispatch(setCommoditiesAC(res));
    });
  };
};

export const getProductId = (id, isGroup = false) => {
  if (!id) return (dispatch) => dispatch(setViewFormAC(true));
  return (dispatch) => {
    let getData;
    if (isGroup) {
      getData = apiIDB.getGroup;
    } else {
      getData = apiIDB.getProduct;
    }
    getData(id)
      .then((res) => {
        // console.log(res)
        dispatch(setFormDataAC(res, isGroup));
        return true;
      })
      .then((result) => {
        if (result) dispatch(setViewFormAC(true));
      });
  };
};

export const getGroups = () => {
  return (dispatch) => {
    apiIDB.getGroup('all').then((res) => {
      dispatch(setGroupsAC(res));
    });
  };
};

export const setGroups = (groups) => (dispatch) => {
  dispatch(setGroupsAC(groups));
};

export const setViewForm = (view) => (dispatch) => {
  dispatch(setViewFormAC(view));
};

export const setFormData = (formData) => (dispatch) => {
  dispatch(setFormDataAC(formData));
};

export const postFormData = (typeData, typeQuery, body) => (dispatch) => {
  // debugger
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
      callbackApi = apiForIdb.postData;
      break;
    case 'put':
      callbackApi = apiForIdb.putData;
      break;
    default:
      callbackApi = apiForIdb.postData;
      break;
  }
  callbackApi(path, body)
    .then((res) => {
      if (res.status < 400 || res.id) {
        apiIDB.putData(`${path}s`, res);
      } else {
        throw chooseError(res);
      }
      return res;
    })
    .then((res) => {
      if (typeData === 'group') return res.id;
      return res.parent_id ? res.parent_id : '0';
    })
    .then((pid) => {
      dispatch(toggleFormPostAC(false));
      dispatch(setViewFormAC(false));
      dispatch(setFormDataAC(null));
      if (typeData === 'group') {
        apiIDB
          .getGroup('all')
          .then((res) => dispatch(setGroupsAC(res)))
          .then(dispatch(setPidAC(pid)));
      } else {
        dispatch(setPidAC(pid));
      }
    })
    .catch((err) => {
      console.dir(err);
      alert(err);
      dispatch(setFormErrorAC(chooseError(err)));
      dispatch(toggleFormPostAC(false));
    });
};

export const deleteProduct = (id, pid, path = 'product') => async (
  dispatch,
  getState,
) => {
  try {
    pid = !pid ? getState().commodityPage.pid : pid;
    let res = await apiForIdb.deleteData(path, id);
    // console.log(res.status);
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

export const setCommodities = (commodities) => (dispatch) =>
  dispatch(setCommoditiesAC(commodities));

export const setFormPhotos = (photos) => (dispatch) =>
  dispatch(setFormPhotosAC(photos));

export const setPid = (pId) => (dispatch) => dispatch(setPidAC(pId));

export const setError = (err) => (dispatch) => dispatch(setErrorAC(err));

export const setFormError = (err) => (dispatch) =>
  dispatch(setFormErrorAC(err));

export const toggleFormPost = (formPost) => (dispatch) =>
  dispatch(toggleFormPostAC(formPost));
