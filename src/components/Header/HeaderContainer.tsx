import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getTitle, chooseLang, setLastUpdate, setGroups } from '@/redux/Actions';
import { RootState } from '@/redux/redux-store';

const HeaderContainer: React.FC<THeaderProps> = (props) => {

    const path = '/' + useLocation().pathname.split('/')[1];
    // console.log(path);

    useEffect(() => {
        props.getTitle(path);
    }, [path, props])

    return <Header {...props} path={path} />
}

const mapStateToProps = (state: RootState) => {

    let className;
    return {
        navBar: state.navigation.navBar,
        title: state.navigation.title,
        className,
        currentLang: state.navigation.currentLang,
        isInit: state.app.isInit,
        lastUpdate: state.app.lastUpdate,
        periodUpdate: state.app.periodUpdate,
    }
}

const connector = connect(
    mapStateToProps,
    { getTitle, chooseLang, setLastUpdate, setGroups }
)
export type THeaderProps = ConnectedProps<typeof connector>;

// export default connector(withRouter(HeaderContainer) as any);
export default connector(HeaderContainer);
