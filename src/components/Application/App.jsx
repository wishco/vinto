import React, {Component, useEffect} from 'react';
import '../../template/css/main.css';
import Footer from "../single/Footer";
import HeaderContainer from "../Header/HeaderContainer";
import MainContainer from "../Main/MainContainer";
import Alert from "react-bootstrap/Alert";
import AppContainer from './AppContainer';
import {Provider} from 'react-redux';

const App = (props) => {

  // запуск функции при запуске приложения (один раз)
  useEffect(() => {
      props.initializeApp();
    },
  );



  return (
    <>
      <HeaderContainer />
      <MainContainer/>

      <React.StrictMode>
      <Footer/>
      </React.StrictMode>


    </>
  )
}

export default App;