import {combineReducers} from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import orderReducer from './orderReducer';
import customerReducer from './customerReducer';

export default combineReducers({
    item:itemReducer,
    error:errorReducer,
    auth:authReducer,
    order:orderReducer,
    category:categoryReducer,
    customer:customerReducer
});