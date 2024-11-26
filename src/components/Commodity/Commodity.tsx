import React, { useEffect, useState } from "react";
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
import { useAppStore } from "../../redux/hooks";
import { FormBulk } from "./Forms/FormBulk";
import { apiIDB } from "../../api/apiIDB";

const Commodity: React.FC<CommodityProps> = (props) => {

  const { commodities, schema, isLoaded, isInit, comIsLoaded, error, pid } = props;
  const { setPid, getGroups, getProducts, setError, setCommodities, getProductId, deleteProduct } = props;
  const { checkedRecords, setCheckedRecords, postFormData } = props;
  const { items, setFilterConfig } = useFilteredData(/* props.commodities */);
  const [labelGroup, setLabelGroup] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showTreeView, setShowTreeView] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20)

  /* Handlers of checkedRecords */
  const [viewFormBulk, setViewFormBulk] = useState(false);

  function formBulkSubmit(parent_id: string) {
    const newCheckedRecords: typeof checkedRecords = [];
    checkedRecords.forEach(item => {
      newCheckedRecords.push({ ...item, parent_id });
    })
    // setCheckedRecords(newCheckedRecords);
    postFormData('array_products', "put", newCheckedRecords)
    setViewFormBulk(false)
    setCheckedRecords([]);
  }

  function formBulkView() {
    setViewFormBulk(true)
  }

  const handleCheckedRecords = async (id: string) => {
    return await apiIDB.getProduct(id);
  };
  /*Handlers of checkedRecords */

  if (error) {
    alert(`${error.name}\n\r${error.message}`);
    setError(null);
  }
  if (!isLoaded && isInit) {
    setPid('0');
    getGroups();
  }
  if (!comIsLoaded && isInit) {
    getProducts(pid);
  }

  const { pagesCount, sliceStart, sliceEnd } = getPaging(commodities.length, pageSize, currentPage);
  const productsWithPaging = commodities.slice(sliceStart, sliceEnd);

  const childGroupsLenght = useAppStore().getState().commodity.groups.filter(g => g.pid === pid).length;
  let isEmpty = !commodities.length && !childGroupsLenght;

  useEffect(() => {
    // set serching result
    if (isSearching) {
      setCommodities(items);
      setLabelGroup(`Результаты поиска - ${items.length} позиций.`);
      if (currentPage > pagesCount) setCurrentPage(1);
    }
  }, [items, isSearching, setCommodities, currentPage, pagesCount]);


  const incrementPage = () => {
    if (currentPage + 1 > pagesCount) return;
    setCurrentPage(currentPage + 1)
  }

  const decrementPage = () => {
    if (currentPage - 1 < 1) return;
    setCurrentPage(currentPage - 1)
  }

  const callbackTree = (id: string, tagName: string, className: string) => {
    const isSpan = tagName === 'SPAN';
    const isEditIcon = className === 'fa fa-edit';

    if (!isSpan && !isEditIcon) return;

    if (!isEditIcon) {
      changePid(id || '0');
    } else {
      getProductId(id, true);
    }

    setShowTreeView(false);
  };


  function changePid(eId: string) {
    setPid(eId);
    setCurrentPage(1);
  }

  function returnBeforeSearch() {
    setFilterConfig({});
    getProducts(pid);
    setIsSearching(false);
    setLabelGroup('');
  }

  function selectPageSize(e: React.SyntheticEvent<HTMLSelectElement>) {
    const value = e.currentTarget.value
    const pSize = value ? +value : 20
    setPageSize(pSize);
  }

  const formSearchProps = { setFilterConfig, returnBeforeSearch, isSearching, setIsSearching }

  if (error) {
    return <div>Ошибка...{error.message}</div>;
  } else if (!isLoaded) {
    return <Preloader />
  } else {
    return (
      <>
        <div className={s.head}>
          <div className={s.buttons}>
            <span className={`${s['button-add']} fa`} onClick={() => getProductId(null)}>
              + Товар/Группу
              <i className='fa fa-file'></i>
            </span>
          </div>
          <FormSearch {...formSearchProps} />
        </div>
        {props.viewForm &&
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
              pid={pid}
              isGroup={props.isGroup}
            />
          </Modal>
          // </FormModalWrapper>
        }
        <div className={s.container}>
          <GroupsTree
            groups={props.groups}
            treeView={showTreeView}
            onClick={() => setShowTreeView(!showTreeView)}
            callbackTree={callbackTree}
            parent_id={props.pid}
            isEmpty={isEmpty}
            deleteProduct={props.deleteProduct}
            getProductId={props.getProductId}
            label={labelGroup}
            countP={commodities.length}
            viewEdit={true}
            disabled={false}
          />
          <div className={s.list}>
            {!props.comIsLoaded && <ProgressBar limit={20} text={'Processing...'} />}
            {!!viewFormBulk && <FormBulk
              items={checkedRecords}
              onSubmit={formBulkSubmit}
              onAbort={() => setViewFormBulk(false)}
            />}
            {props.comIsLoaded && !!productsWithPaging.length &&
              <Table
                records={ /*commodities*/ productsWithPaging}
                callbackClick={getProductId}
                deleteRecord={deleteProduct}
                schema={schema}
                checkedHandler={handleCheckedRecords}
                advMenu={[
                  {
                    lable: 'Test',
                    className: 'fa fa-bomb',
                    onClick: () => alert(`Test ${checkedRecords.length} items.`)
                  },
                  {
                    lable: 'Test2',
                    className: 'fa fa-home',
                    onClick: formBulkView
                  },
                ]}
              />}
          </div>
        </div>
        <div>
          <select name="page-size" id="page-size" onChange={selectPageSize}>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          {currentPage > 1 &&
            <div className={s.buttons} style={{ display: "inline-block", margin: 5 }}>
              <span className={`${s['button-add']} fa`} onClick={decrementPage}>
                Назад
                <i className='fa fa-file'></i>
              </span>
            </div>
          }
          {currentPage < pagesCount &&
            <div className={s.buttons} style={{ display: "inline-block", margin: 5 }}>
              <span className={`${s['button-add']} fa`} onClick={incrementPage}>
                Вперед
                <i className='fa fa-file'></i>
              </span>
            </div>
          }
          <span>Page {currentPage} of {pagesCount}</span>
        </div>
      </>
    );
  }
};

export default Commodity;
