import {combineReducers} from 'redux';

import loginReducer from './auth-reducers/auth-reducer';
import profileReducer from './profile-reducers/profile-reducers';
import orderReducer from './order-reducers/order-reducers';

let rootReducer;
export default rootReducer = combineReducers(
  Object.assign({
    login: loginReducer,
    profile: profileReducer,
    order: orderReducer,
  }),
);
