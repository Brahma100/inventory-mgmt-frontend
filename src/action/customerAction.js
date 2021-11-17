import  {GET_CUSTOMER,ADD_CUSTOMER,DELETE_CUSTOMER, CUSTOMERS_LOAD} from './types';
import axios from 'axios';

import {returnErrors} from './errorActions';

export const getCustomers=()=> dispatch =>{
    dispatch(setCustomerLoading());

    axios.get('/customers').then(res=>
    dispatch({
        type:GET_CUSTOMER,
        payload:res.data
    }))
    .catch(err=>dispatch(returnErrors(err.response.data,err.response.status)));   
};
export const addCustomer=customer=> dispatch =>{
    axios.post('/add_customer',customer)
    .then(res=> dispatch({
        type:ADD_CUSTOMER,
        payload:res.data?res.data:{}
    })).catch(err=>dispatch(returnErrors(err.response.data,err.response.status)));
};

export const deleteCustomer=id=>dispatch=>{
    console.log("Id of Customer",id);
    const config={
        headers:{'Content-Type':'application/json'}
    }
    const body=JSON.stringify({id});
    console.log("Action Order Id",id);
    axios.post('/delete_customer',body,config).then(
        res=>dispatch({
            type:DELETE_CUSTOMER,
            payload:id
        })
    ).catch(err=>dispatch(returnErrors(err.response.data,err.response.status)));
}


// export const deleteSelectedORDER=ids=>dispatch=>{
//     console.log("Id of ORDER",ids);
//     const config={
//         headers:{'Content-Type':'application/json'}
//     }
//     var body=JSON.stringify({ids});
//     var {ids}=body
//     console.log("Action Product Id",typeof ids);
//     console.log("Body",body,body[0],ids);
//     axios.post('/delete_selected_product',body,config).then(
//         res=>dispatch({
//             type:DELETE_SELECTED_ORDER,
//             payload:ids
//         })
//     ).catch(err=>dispatch(returnErrors(err.response.data,err.response.status)));
// }



// export const updateOrder=({id,name,manufacturer,description,stock,price,rating})=>dispatch=>{
//     console.log("Id of ORDER",id);
//     const config={
//         headers:{'Content-Type':'application/json'}
//     }
//     const body=JSON.stringify({id,name,description,manufacturer,price,stock,rating});
//     console.log("Action Product Id",id);
//     axios.post('/update_product',body,config).then(
//         res=>dispatch({
//             type:UPDATE_ORDER,
//             payload:res.data
//         })
//     ).catch(err=>dispatch(returnErrors(err.response.data,err.response.status)));
// }


export const setCustomerLoading=()=>{
    return{
        type:CUSTOMERS_LOAD
    };
}