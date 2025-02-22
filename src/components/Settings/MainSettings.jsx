import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setAppKey, setStoreKey, setStores, toggleInitApp, setPeriodUpdate } from "../../redux/Actions";
import { apiEvotor } from "../../api";
import { readJsonFile, saveConfig } from "../../api/apiFile";
import { apiIDB } from "../../api/apiIDB";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setBaseUrl } from "../../redux/settingsSlice";
import { Button } from "../common/Forms";

function addKey(id) {
    var key = document.getElementById(id).value;
    if (!key) return;
    window.localStorage[id] = key;
    return key;
}

const MainSettings = props => {

    let inpRef = React.createRef();

    const backLink = useAppSelector(state => state.settings.documents.baseUrl);

    const dispatch = useAppDispatch()

    const changeBackLink = link => (dispatch(setBaseUrl(link)))
    const setBackLink = link => localStorage.setItem('backUrl', link)

    async function saveData() {

        await saveConfig({ fileName: `backup_config_${new Date().toJSON()}` });

        console.log('File with config saved');
        let saveData = window.confirm('Сохранить список товаров?');
        if (saveData) {
            await saveConfig({ type: 'commodities', fileName: `backup_commodities_${new Date().toJSON()}` });
            console.log('File with Data saved');
        }
    }

    async function setAppKeyAndStores(key) {
        localStorage.appKey = key;
        props.setAppKey(key);
        try {
            let stores = await apiEvotor.getStores();
            props.setStores(stores);
        } catch (err) {
            delete localStorage.appKey;
            props.setAppKey(null);
            console.error(err);
        }
    }

    async function clickAddAppKey() {
        var key = addKey('appKey');
        if (!key) return;
        await setAppKeyAndStores(key);
    }

    function liClick(e) {
        let storeKey = e.target.id;
        localStorage.storeKey = storeKey;
        props.setStoreKey(storeKey);
        // props.initApp(true);
    }

    const [clean, setClean] = useState(false);

    async function cleareStorage(storageName) {
        setClean(true);
        localStorage.clear();
        await apiIDB.delDb(storageName);
        props.setAppKey(null);
        props.setStoreKey(null);
        props.toggleInitApp(false);
        setClean(false);
        window.location.reload();
    }

    async function restoreConfig() {
        let file = inpRef.current;
        let config = (await readJsonFile(file)).config;
        await setAppKeyAndStores(config.appKey);
        localStorage.storeKey = config.storeKey;
        props.setStoreKey(config.storeKey);
    }

    const [periodUpdate, setPUpdate] = useState(props.periodUpdate);

    useEffect(() => setPUpdate(props.periodUpdate), [props.periodUpdate]);

    function blurPeriodUpdate(ev) {
        localStorage.setItem('periodUpdate', periodUpdate);
        props.setPeriodUpdate(periodUpdate);
    }

    return (
        <div>
            {props.appKey && props.storeKey && !props.isInit &&
                <div>
                    <h2>Идет инициализация приложения...</h2>
                </div>
            }
            {!props.appKey &&
                <div>
                    <h2>Необходимо инициализировать приложение!</h2>
                    <p>Введите токен приложения...</p>
                </div>
            }
            {clean &&
                <div>
                    <h2>Идет очистка хранилища...</h2>
                    <p>Страница перезагрузится автоматически.</p>
                    <p>Если процесс затянулся, перезагрузите страницу вручную.</p>
                </div>
            }
            {!props.appKey &&
                <div>
                    <input id={'appKey'} />
                    <button onClick={clickAddAppKey}>Установить токен приложения</button>
                </div>
            }
            {!!props.appKey && !props.isInit &&
                <div>
                    <h3>Токен приложения</h3>
                    <p>{props.appKey}</p>
                </div>
            }
            {props.appKey && !!props.stores.length && !props.storeKey &&
                <div style={{ cursor: 'pointer' }}>
                    <h3>Выберите магазин</h3>
                    <ul>
                        {props.stores.map(item => {
                            return (
                                <li key={item.id} id={item.id} onClick={liClick}>{item.id}: {item.name}</li>
                            )
                        })}
                    </ul>
                </div>
            }
            {!!props.storeKey && !props.isInit &&
                <div>
                    <h3>Выбранный магазин</h3>
                    <p>{props.storeKey}</p>
                </div>
            }
            {props.isInit && !clean && <h2>Приложение инициализировано!</h2>}
            {props.isInit && !clean &&
                <>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '1rem'
                    }}>
                        <Button
                            label="Save Config"
                            callback={saveData}
                        />
                        <Button
                            label="Clear Storage"
                            callback={() => cleareStorage('Evo')}
                            class_name="attention"
                        />
                    </div>
                    <div>
                        <label htmlFor="periodUpdate">Период обновления(час.):</label>
                        <input type="number" name="periodUpdate" id="periodUpdate"
                            style={{ width: '3rem' }}
                            value={periodUpdate} onChange={ev => setPUpdate(ev.target.value)}
                            onBlur={blurPeriodUpdate}
                        />
                    </div>
                    <div>
                        <label htmlFor="backLink">Адрес сервера документов</label>
                        <input type="url" name="backLink" id="backLink"
                            style={{ width: '15rem' }}
                            value={backLink}
                            onChange={ev => changeBackLink(ev.target.value)}
                            onBlur={ev => setBackLink(ev.target.value)}
                            placeholder="http://localhost:3000"
                        />
                    </div>
                </>
            }
            {
                !props.appKey &&
                <div>
                    <p>или выберите восстановление конфигурации...</p>
                    <label>Восстановить конфигурацию из файла
                        <input type="file" ref={inpRef} onChange={restoreConfig} hidden />
                    </label>
                </div>
            }
        </div>
    );
}

const mapState = state => {
    return {
        appKey: state.app.appKey,
        storeKey: state.app.storeKey,
        isInit: state.app.isInit,
        stores: state.app.stores,
        periodUpdate: state.app.periodUpdate,
    }
}

export default connect(mapState, { setAppKey, setStoreKey, setStores, toggleInitApp, setPeriodUpdate })(MainSettings);
