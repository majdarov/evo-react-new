import React, { useEffect, useState } from 'react';
import s from './Header.module.css';
import logo from '@/Assets/img/terminal-5.png';
import ProgressBar from '@/components/common/ProgressBar/ProgressBar';
import { syncGroupsProducts, testNeedUpdate } from '@/api/apiUtils';
import NavbarContainer from '@/components/Navbar/NavbarContainer';
import { THeaderProps } from './HeaderContainer';

const Header: React.FC<THeaderProps & { path: string }> = (props) => {

    const [progressValue, setProgressValue] = useState(0);

    const [isInit, setIsInit] = useState(false);
    const [lastUpdate, setLastUpdate] = useState<string | number | null>(null);
    const [updated, setUpdated] = useState(false);
    const [needUpdate, setNeedUpdate] = useState(false);
    const [text, setText] = useState('');

    function clickLang(ev: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        let lng;
        let elem = ev.target as HTMLInputElement;
        if (elem.name === 'lng') {
            lng = elem.value;
            props.chooseLang(lng);
            props.getTitle(props.path);
        } else {
            return;
        }
    }

    const calllbackForProgress = (text: string, progressValue: number) => {
        setText(text)
        setProgressValue(progressValue)
    }

    async function clickDateUpdate() {
        setUpdated(true);
        let result = await syncGroupsProducts(calllbackForProgress);
        console.log('fetchGroupsProducts - ' + result.length);
        props.setLastUpdate();
        props.setGroups(result);
        setText('');
        setUpdated(false);
    }

    useEffect(() => {
        if (props.isInit) {
            setIsInit(true)
            setTimeout(() => {
                setIsInit(false)
                let date = new Date(props.lastUpdate);
                setLastUpdate(date.toString());
            }, 500);
        }
    }, [props.isInit, props.lastUpdate])

    useEffect(() => {
        setNeedUpdate(testNeedUpdate(lastUpdate, props.periodUpdate));
    }, [lastUpdate, props.periodUpdate])

    let styleH5 = (needUpdate && { color: 'red' }) || { color: 'blue' };

    return (
        <header>
            <div className={s['column-1']}>
                <div className={s['info']}>
                    {!props.isInit && <h4>Initializing App...</h4>}
                    {isInit && <h4>App Is Init!</h4>}
                    {updated && <ProgressBar value={progressValue} text={text} />}
                    {!isInit && !updated &&
                        <div style={{ cursor: 'pointer' }} onClick={clickDateUpdate}>
                            <h5 style={styleH5}>{lastUpdate && 'Синхронизировано - '}{lastUpdate}</h5>
                        </div>}
                </div>
                <div className={s['navbar']}>
                    <NavbarContainer />
                </div>
            </div>
            <div className={s['column-2']}>
                <div className={s['title']}>
                    <h2>{props.title}</h2>
                    <img src={logo} alt='Logo'></img>
                </div>
                <div className={s.lng} onClick={clickLang}>
                    <input name="lng" type="radio" value='ru' checked={!props.currentLang}
                        onChange={(ev) => ev.target.checked = !props.currentLang} />RU
                    <input name="lng" type="radio" value='en' checked={!!props.currentLang}
                        onChange={(ev) => ev.target.checked = !!props.currentLang} />EN
                </div>
            </div>
        </header>
    );
}

export default Header;
