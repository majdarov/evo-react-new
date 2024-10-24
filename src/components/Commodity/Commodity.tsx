import React, { useEffect, useMemo, useState } from "react";
import s from "./Commodity.module.css";
import Preloader from "../common/Preloader/Preloader";
import FormProduct from "./Forms/FormProduct";
import Table from "../common/Table";
import { ProgressBar } from "../common/ProgressBar";
import FormSearch from "./Forms/FormSearch";
import useFilteredData from "../../Hooks/useFilteredData";
import GroupsTree from "../common/GroupsTree";
import { Modal } from "../common/Modal/Modal";
import type { CommodityProps } from "./CommodityContainer";
import { getPaging } from "../common/utillites";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setCurrentPage } from "../../redux/commoditySlice";

const Commodity: React.FC<CommodityProps> = (props) => {

  const { commodities, schema, isLoaded, isInit, comIsLoaded, error } = props;
  const { setPid, getGroups, getProducts, setError, setCommodities, getProductId, deleteProduct } = props;
  const { items, setFilterConfig } = useFilteredData(/* props.commodities */);
  const [pid, setPidSearch] = useState(props.pid);
  const [isEmpty, setIsEmpty] = useState(false);
  const [labelGroup, setLabelGroup] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showTreeView, setShowTreeView] = useState(false);

  // Use new redux
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(state => state.commodity.currentPage);
  const [productsWithPaging, setProductsWithPaging] = useState([] as any[])
  const [pagesCount, setPagesCount] = useState(1)

  useEffect(() => {
    const { pagesCount, sliceStart, sliceEnd } = getPaging(commodities.length, 20, currentPage);
    setPagesCount(pagesCount);
    setProductsWithPaging(commodities.slice(sliceStart, sliceEnd))
  })

  const incrementPage = () => {
    if (currentPage < pagesCount) {
      dispatch(setCurrentPage(currentPage + 1))
    }
  }

  const decrementPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1))
    }
  }


//   if (!props.isInit) {

//     props.history.push('/settings');
//   }

  useEffect(() => {
    setPid(pid)
  }, [ pid, setPid ]);


  useEffect(() => { //get groups & products
    if (!isLoaded && isInit) {
      setPid('0');
      getGroups();
    }
    if (!comIsLoaded && isInit) {
      getProducts(pid);
    }
    if (error) {
      alert(`${error.name}\n\r${error.message}`);
      setError(null);
    }
  }, [ isLoaded, isInit, comIsLoaded, error, setPid, getGroups, getProducts, setError ])

  useEffect(() => { // set serching result
    if (isSearching) {
      setCommodities(items);
      setLabelGroup(`Результаты поиска - ${items.length} позиций.`);
    }
  }, [ items, setCommodities, isSearching ])

  useEffect(() => {
    if (!commodities.length) setIsEmpty(true);
    return () => setIsEmpty(false);
  }, [ commodities ]);

  function newData() {
    getProductId(null);
  }

  function clickGroups() {
    setShowTreeView(!showTreeView);
  }

  const callbackTree = (id: string, tagName: string, className: string) => {
    let parent_id = id ? id : '0';
    if (tagName !== 'SPAN' && className !== 'fa fa-edit') return;
    if (className !== 'fa fa-edit') {
      changePid(parent_id);
    } else {
      props.getProductId(id, true);
    }
    setShowTreeView(false);
  }

  function changePid(eId: string) {
    // if (props.pid === eId) return;
    props.setPid(eId);
    setPidSearch(eId);
  }

  const searchProducts = (formData: any) => {
    setFilterConfig(formData);
  }

  function returnBeforeSearch() {
    props.getProducts(props.pid);
    setIsSearching(false);
    setLabelGroup('');
  }

  const formSearchProps = { searchProducts, returnBeforeSearch, setIsSearching, parent_id: pid }

  if (props.error) {
    return <div>Ошибка...{props.error.message}</div>;
  } else if (!props.isLoaded) {
    return <Preloader />
  } else {
    return (
      <>
        <div className={s.head}>
          <div className={s.buttons}>
            <span className={`${s['button-add']} fa`} onClick={newData}>
              + Товар/Группу
            <i className='fa fa-file'></i>
            </span>
          </div>
          <FormSearch {...formSearchProps} />
        </div>
        { props.viewForm &&
          // <FormModalWrapper>
          <Modal>
            <FormProduct
              groups={props.groups}
              formData={props.formData}
              formPost={props.formPost}
              formError={props.formError}
              setViewForm={props.setViewForm}
              setFormData={props.setFormData}
              toggleFormPost={props.toggleFormPost}
              postFormData={props.postFormData}
              setFormError={props.setFormError}
              pid={props.pid}
              isGroup={props.isGroup}
            />
          </Modal>
          // </FormModalWrapper>
        }
        <div className={ s.container }>
          <GroupsTree
            groups={ props.groups }
            treeView={ showTreeView }
            onClick={ clickGroups }
            callbackTree={ callbackTree }
            parent_id={ props.pid }
            isEmpty={ isEmpty }
            deleteProduct={ props.deleteProduct }
            getProductId={ props.getProductId }
            label={ labelGroup }
            countP={ commodities.length }
            viewEdit={ true }
          />
          <div className={s.list}>
            {/* <h3>{groupName}  {groupIsEmpty && <span className={s.del} onClick={delGroup}></span>}</h3> */}
            { !props.comIsLoaded && <ProgressBar limit={20} text={'Processing...'} /> }
            { props.comIsLoaded && !!commodities.length &&
              <Table
                records={ /*commodities*/ productsWithPaging }
                // headers={headers}
                callback={ getProductId }
                deleteRecord={ deleteProduct }
                schema={ schema }
              /> }
          </div>
        </div>
        <div>
          <div className={s.buttons} style={{display: "inline-block", margin: 5}}>
              <span className={`${s['button-add']} fa`} onClick={decrementPage}>
                Назад
              <i className='fa fa-file'></i>
              </span>
            </div>
            <div className={s.buttons} style={{display: "inline-block", margin: 5}}>
              <span className={`${s['button-add']} fa`} onClick={incrementPage}>
                Вперед
              <i className='fa fa-file'></i>
              </span>
            </div>
            <span>Page {currentPage} of {pagesCount}</span>
        </div>
      </>
    );
  }
};

export default Commodity;
