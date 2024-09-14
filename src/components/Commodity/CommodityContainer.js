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
} from '../../redux/Actions';
import { connect } from 'react-redux';

const mapState = (state) => {
  const isInit = state.app.isInit;
  let sch = state.settings.products.table.schema;

  state = state.commodity;
  return {
    isLoaded: state.isLoaded,
    groups: state.groups,
    price: 'Price',
    pid: state.pid,
    commodities: state.commodities.length > 100 ? state.commodities.slice(0, 100) : state.commodities,
    // commodities: state.commodities,
    comIsLoaded: state.comIsLoaded,
    error: state.error,
    viewForm: state.viewForm,
    formData: state.form.formData,
    isGroup: state.form.isGroup,
    formPost: state.form.formPost,
    formError: state.form.formError,
    isInit,
    schema: sch,
  };
};

export default connect(mapState, {
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
})(Commodity);
