import React, {useRef, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "../../redux/redux-store";
import AppContainer from "./AppContainer";


const CrmJSApp = () => {

  return <BrowserRouter>

    <Provider store={store}>
      <AppContainer/>
    </Provider>
  </BrowserRouter>
};

export default CrmJSApp;