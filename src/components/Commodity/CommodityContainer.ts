import Commodity from './Commodity';
import {
  setPid,
  getGroups,
  getProducts,
  setViewForm,
  getProductId,
  deleteProduct,
  setFormData,
  toggleFormPost,
  postFormData,
  setFormError,
  setError,
  setCommodities,
  setCheckedRecords,
} from '../../redux/Actions';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux/redux-store';

const mapState = (state: RootState) => {
  const isInit = state.app.isInit;
  const sch = state.settings.products.table.schema;
  const checkedRecords = state.app.checkedRecords;

  let _state = state.commodity;
  return {
    isLoaded: _state.isLoaded,
    groups: _state.groups,
    price: 'Price',
    pid: _state.pid,
    // commodities: _state.commodities.length > 100 ? _state.commodities.slice(0, 100) : _state.commodities,
    commodities: _state.commodities,
    comIsLoaded: _state.comIsLoaded,
    error: _state.error,
    viewForm: _state.viewForm,
    formData: _state.form.formData,
    isGroup: _state.form.isGroup,
    formPost: _state.form.formPost,
    formError: _state.form.formError,
    isInit,
    schema: sch,
    checkedRecords,
  };
};

const mapDispatch = {
  getGroups,
  getProducts,
  setPid,
  setViewForm,
  getProductId,
  deleteProduct,
  setFormData,
  toggleFormPost,
  postFormData,
  setFormError,
  setError,
  setCommodities,
  setCheckedRecords,
};

const connector = connect(mapState, mapDispatch);

export type CommodityProps = ConnectedProps<typeof connector>;

export default connector(Commodity);
