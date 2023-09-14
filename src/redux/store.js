import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import {rootSaga} from './saga';
import rootReducer from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore, persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['login', 'template', 'profile', 'dashboard'],
  // blackList: [],
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
};
const pReducer = persistReducer(persistConfig, rootReducer);

let middlewares = [];

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// dev tools middleware
// const reduxDevTools =
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

middlewares.push(sagaMiddleware);
middlewares.push(createLogger());

// create a redux store with our reducer above and middleware
let store = createStore(
  pReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);
export const persistor = persistStore(store);

// run the saga
sagaMiddleware.run(rootSaga);

export default store;
