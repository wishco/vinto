import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {initializeApp} from '../../redux/app-reducer';

import {compose} from 'redux';
import App from './App.jsx';

// mapStateToProps и mapDispatchToProps
// это функции пердающие данные из 'контейнерной компоненты' в 'презентационную компоненту'
// mapStateToProps это переменные
// mapDispatchToProps это список Dispatch функций редьюсера

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
    // navPages: state.app.navPages,
    // currentUriState: state.app.currentUriState
  };
};

let AppContainer =
  compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))
  (App);

export default AppContainer;