import  {DELETE_SELECTED_ITEM,UPDATE_ITEM,GET_ITEM,ADD_ITEM,DELETE_ITEM, ITEMS_LOAD} from './types';
import axios from 'axios';

import {returnErrors} from './errorActions';


export const getItems=()=> dispatch =>{
    dispatch(setItemsLoading());

    axios.get('/products').then(res=>
    dispatch({
        type:GET_ITEM,
        payload:res.data
    }))
    .catch(err=>dispatch(returnErrors(err.response.data,err.response.status)));   
};
export const addItem=item=> dispatch =>{
    axios.post('/add_product',item)
    .then(res=>dispatch({
        type:ADD_ITEM,
        payload:res.data
    })).catch(err=>dispatch(returnErrors(err.response.data,err.response.status)));
};

export const deleteItem=id=>dispatch=>{
    console.log("Id of Item",id);
    const config={
        headers:{'Content-Type':'application/json'}
    }
    const body=JSON.stringify({id});
    console.log("Action Product Id",id);
    axios.post('/delete_product',body,config).then(
        res=>dispatch({
            type:DELETE_ITEM,
            payload:id
        })
    ).catch(err=>dispatch(returnErrors(err.response.data,err.response.status)));
}


export const deleteSelectedItem=ids=>dispatch=>{

    const config={
        headers:{'Content-Type':'application/json'}
    }
    var body=JSON.stringify({ids});
    var {ids}=body
    console.log("Action Product Id",typeof ids);
    console.log("Body",body,body[0],ids);
    axios.post('/delete_selected_product',body,config).then(
        res=>dispatch({
            type:DELETE_SELECTED_ITEM,
            payload:ids
        })
    ).catch(err=>dispatch(returnErrors(err.response.data,err.response.status)));
}

export const rankItem=(id)=>dispatch=>{
    const config={
        headers:{'Content-Type':'application/json'}
    }
    const body=JSON.stringify({id});
    console.log("Action Product Id",id);
    axios.post('/rank_product',body,config).then(
        res=>dispatch({
            type:UPDATE_ITEM,
            payload:res.data
        })
    ).catch(err=>dispatch(returnErrors(err.response.data,err.response.status)));
}

export const updateItem=({id,name,manufacturer,description,stock,price,rating,user,img})=>dispatch=>{
    dispatch(setItemsLoading());
    console.log("Id of Item",id,user);
    const config={
        headers:{'Content-Type':'application/json'}
    }
    const body=JSON.stringify({id,name,description,manufacturer,price,stock,rating,user,img});
    console.log("Action Product Id",id);
    axios.post('/update_product',body,config).then(
        res=>dispatch({
            type:UPDATE_ITEM,
            payload:res.data
        })
    ).catch(err=>dispatch(returnErrors(err.response.data,err.response.status)));
    // Wait for 1/2 Seconds 
    setTimeout(() => {
        dispatch(getItems());
    }, 500);
}


export const setItemsLoading=()=>{
    return{
        type:ITEMS_LOAD
    };
}