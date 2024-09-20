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
import { CommodityProps } from "./CommodityContainer";

const Commodity: React.FC<CommodityProps> = (props) => {

  const { items, setFilterConfig } = useFilteredData(/* props.commodities */);
  const [pid, setPidSearch] = useState(props.pid);
  const [isEmpty, setIsEmpty] = useState(false);
  const [labelGroup, setLabelGroup] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const setCommodities = props.setCommodities;
  const [showTreeView, setShowTreeView] = useState(false);

//   if (!props.isInit) {

//     props.history.push('/settings');
//   }

  const propsSetPid = props.setPid;
  useEffect(() => {
    propsSetPid(pid)
  }, [pid]);

  useEffect(() => { //get groups & products
    if (!props.isLoaded && props.isInit) {
      props.setPid('0');
      props.getGroups();
    }
    if (!props.comIsLoaded && props.isInit) {
      props.getProducts(props.pid);
    }
    if (props.error) {
      alert(`${props.error.name}\n\r${props.error.message}`);
      props.setError(null);
    }
  }, [props])

  useEffect(() => {
    if (isSearching) {
      setCommodities(items);
      setLabelGroup(`Результаты поиска - ${items.length} позиций.`);
    }
  }, [items, setCommodities, isSearching])

  useEffect(() => {
    if (!props.commodities.length) setIsEmpty(true);
    return () => setIsEmpty(false);
  }, [props.commodities]);

  function newData() {
    props.getProductId(null);
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
        <div className={s.container}>
          <GroupsTree
            groups={props.groups}
            treeView={showTreeView}
            onClick={clickGroups}
            callbackTree={callbackTree}
            parent_id={props.pid}
            isEmpty={isEmpty}
            deleteProduct={props.deleteProduct}
            getProductId={props.getProductId}
            label={labelGroup}
            viewEdit={true}
          />
          <div className={s.list}>
            {/* <h3>{groupName}  {groupIsEmpty && <span className={s.del} onClick={delGroup}></span>}</h3> */}
            { !props.comIsLoaded && <ProgressBar limit={20} text={'Processing...'} /> }
            { props.comIsLoaded &&
              <Table
                records={props.commodities}
                // headers={headers}
                callback={props.getProductId}
                deleteRecord={props.deleteProduct}
                schema={props.schema}
              /> }
          </div>
        </div>
      </>
    );
  }
};

export default Commodity;
