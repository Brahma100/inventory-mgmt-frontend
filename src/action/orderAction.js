import  {UPDATE_ORDER,GET_ORDER,ADD_ORDER,DELETE_ORDER, ORDERS_LOAD} from './types';
import axios from 'axios';
import {returnErrors} from './errorActions';

export const getOrders=()=> dispatch =>{
    dispatch(setOrderLoading());

    axios.get('/orders').then(res=>
    dispatch({
        type:GET_ORDER,
        payload:res.data
    }))
    .catch(err=>dispatch(returnErrors(err.response.data,err.response.status)));   
};
export const addOrder=order=> dispatch =>{
    axios.post('/add_order',order)
    .then(res=>dispatch({
        type:ADD_ORDER,
        payload:res.data
    })).catch(err=>{
        console.log("catch block error")
        dispatch(returnErrors(err.response.data, err.response.status,"ORDER_ADD_FAIL"));
        // dispatch({
        //     type:ORDER_ADD_FAIL
        // });
    })
};

export const deleteOrder=id=>dispatch=>{
    console.log("Id of Order",id);
    const config={
        headers:{'Content-Type':'application/json'}
    }
    const body=JSON.stringify({id});
    console.log("Action Order Id",id);
    axios.post('/delete_order',body,config).then(
        res=>dispatch({
            type:DELETE_ORDER,
            payload:id
        })
    ).catch(err=>dispatch(returnErrors(err.response.data,err.response.status)));
}

export const updateOrder=({id,product_id,customer_id,by_user_id,quantity,total,payment})=>dispatch=>{
    console.log("Id of ORDER",id);
    const config={
        headers:{'Content-Type':'application/json'}
    }
    const body=JSON.stringify({id,product_id,customer_id,by_user_id,quantity,total,payment});
    console.log("Action Order Id",id);
    axios.post('/update_order',body,config).then(
        res=>dispatch({
            type:UPDATE_ORDER,
            payload:res.data
        })
    ).catch(err=>dispatch(returnErrors(err.response.data,err.response.status)));
}


export const setOrderLoading=()=>{
    return{
        type:ORDERS_LOAD
    };
}