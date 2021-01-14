import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import {addAllPrototypesLibMIC} from "./template/libs/libMIC";
import CrmJSApp from './components/Application/CrmJSApp.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';


// добавление всех прототипов из библиотеки libMIC (личная библиотека)
addAllPrototypesLibMIC();

// запуск React App
ReactDOM.render(<CrmJSApp/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

