import  {GET_CATEGORY,ADD_CATEGORY} from './types';
import axios from 'axios';
import {returnErrors} from './errorActions';

export const getCategories=()=> dispatch =>{
    // dispatch(setItemsLoading());

    axios.get('/categories').then(res=>
    dispatch({
        type:GET_CATEGORY,
        payload:res.data
    }))
    .catch(err=>dispatch(returnErrors(err.response.data,err.response.status)));   
};
export const addCategory=category=> dispatch =>{
    axios.post('/add_category',category)
    .then(res=>dispatch({
        type:ADD_CATEGORY,
        payload:res.data
    })).catch(err=>dispatch(returnErrors(err.response.data,err.response.status)));
};