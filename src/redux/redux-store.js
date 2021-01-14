import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import appReducer from "./app-reducer";
import svgReducer from "./svg-reducer";
import headerReducer from "./header-reducer";
import buttonsReducer from './buttons-reducer';
import usersReducer from './users-reducer';
import modalMessagesReducer from './modal-message-reducer';
import windowReducer from './window-reducer';
import settingsBasicReducer from './pages/settings/settings-basic-reducer';


let reducers = combineReducers({
  app: appReducer,
  svg: svgReducer,
  header: headerReducer,
  users: usersReducer,
  buttons: buttonsReducer,
  modalMessages: modalMessagesReducer,
  windowState: windowReducer,
  settingsBasic: settingsBasicReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
window.__store__ = store;

export default store;