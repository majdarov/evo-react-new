import { useCallback, useEffect, useState } from "react";
import ComponentsSearch from './schemas/ComponentsSearch';
import s from './FormSearch.module.css';
import { useAppSelector } from "../../../redux/hooks";
import { clearFormElements } from "./frmUtilites";
import { Button } from "../../common/Forms";

const initialPeriod = {
  created_at: false,
  updated_at: false,
  price: false,
  cost_price: false,
}

const FormSearch = (props) => {

  const { setFilterConfig, returnBeforeSearch, isSearching, setIsSearching, cleanFlag, setCleanFlag } = props

  const [view, setView] = useState(false);
  const [formData, setFormData] = useState({});
  const [period, setPeriod] = useState(initialPeriod);
  const [name, setName] = useState('');

  const pId = useAppSelector(state => state.commodity.pid)

  const clearSearch = useCallback(function () {
    clearFormElements('form-search')
    setFormData({});
    setName('');
    setPeriod(initialPeriod);
    setView(false);
    returnBeforeSearch();
  }, [returnBeforeSearch])

  useEffect(() => {
    if (cleanFlag) clearSearch();
  }, [cleanFlag, clearSearch]);

  const getObj = useCallback(() => {
    let isCurrentGroup = document.forms['form-search']['current-pid'];
    let obj = { ...formData };

    if (!isCurrentGroup.checked) {
      delete obj.parent_id;
    }

    Object.keys(obj).forEach(key => {
      if (!obj[key] || !obj[key].length) delete obj[key];
      if (period[key] && obj[key].length === 1) obj[key][1] = null;
    })

    if (!!name.length) obj.name = name;
    return obj;
  }, [formData, name, period])

  if (!!Object.keys(formData).length && !isSearching) {
    setIsSearching(true);
  }

  function changeFormElement(ev) {
    let elem = ev.target;
    let [name, idxName] = elem.name.split('-');
    let value = formData[name];

    if (idxName) {
      let idx;
      switch (idxName) {
        case 'from':
          idx = 0;
          break;
        case 'to':
          idx = 1;
          break;
        default:
          idx = 0;
          break;

      }
      let elemValue = elem.value;
      if (ev.target.type === 'date') elemValue = Date.parse(elemValue);
      if (ev.target.type === 'number') elemValue = Number(elemValue);
      if (!value) {
        value = [];
        value = idx === 0 ? [elemValue] : [null, elemValue];
      } else {
        value[idx] = elemValue ?? null;
      }
    }
    setFormData({ ...formData, [name]: value });
  }

  useEffect(() => {
    if (name.length > 2 && name.slice(0, 3) !== 'rgx') {
      setFilterConfig(getObj());
      if (!isSearching) setIsSearching(true);
    }
  }, [getObj, name, setIsSearching, setFilterConfig, isSearching])

  function selectParentID(ev) {
    let isCurrentGroup = ev.target.checked;
    if (isCurrentGroup) {
      setFormData({ ...formData, parent_id: pId || '0' });
    }
    setFilterConfig(getObj());
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    setFilterConfig(getObj());
    if (!isSearching) setIsSearching(true);
  };



  function changePeriod(ev) {
    let name = (ev.target.name).split('-')[0];
    let checked = ev.target.checked;
    setPeriod({ ...period, [name]: checked });
    if (!checked) {
      if (!formData[name]) return;
      let arr = [formData[name][0]];
      setFormData({ ...formData, [name]: arr })
    }
  }

  return (
    <div className={s['form-container']}>
      <form name='form-search' id={s['form-search']} onSubmit={handleSubmit}>
        <div className={s.search}>
          <div className={s['form-search-row']}>
            <Button
              label='Очистить фильтр'
              icon='fa fa-times'
              callback={() => setCleanFlag(true)}
            />
            <div className={s['search-name']}>
              <label htmlFor='name'>Поиск</label>
              <input type="text" name='name' id='name' value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label>В текущей группе
                <input type="checkbox" name='current-pid' onChange={selectParentID}
                  className={s['current-pid']} id={pId} />
              </label>
            </div>
          </div>
          <Button
            label='Расширенный фильтр'
            icon='fa fa-filter'
            callback={() => setView(view => !view)}
          />
          <Button
            label='Искать'
            icon='fa fa-search'
            callback={handleSubmit}
            type='submit'
          />
        </div>
        <fieldset className={!view ? s.hidden : ''}>
          <div className={s['form-search-date']}>
            <ComponentsSearch.SearchPeriod
              head='Дата создания'
              name='created_at'
              type='date'
              viewPeriod={period.created_at}
              changeFormElement={changeFormElement}
              changePeriod={changePeriod}
            />
            <ComponentsSearch.SearchPeriod
              head='Дата изменения'
              name='updated_at'
              type='date'
              viewPeriod={period.updated_at}
              changeFormElement={changeFormElement}
              changePeriod={changePeriod}
            />
          </div>
          <div className={s['form-search-price']}>
            <ComponentsSearch.SearchPeriod
              head='Цена'
              name='price'
              type='number'
              viewPeriod={period.price}
              changeFormElement={changeFormElement}
              changePeriod={changePeriod}
            />
            <ComponentsSearch.SearchPeriod
              head='Цена по приходу'
              name='cost_price'
              type='number'
              viewPeriod={period.cost_price}
              changeFormElement={changeFormElement}
              changePeriod={changePeriod}
            />
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default FormSearch;
