import axios from 'axios';
import { returnErrors} from './errorActions';

import { UPDATE_FAIL, UPDATE_SUCCESS, USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, EXPIRE_EXTEND } from './types';

// check token & load user
export const loadUser= ()=> (dispatch,getState)=>{
    // User loading
    dispatch({type:USER_LOADING});
    // get token from localstorage
    const token=getState().auth.token;
    console.log("Token from load User",token);
 
    // Header
const config={
    headers:{
        "Content-Type":"application/json"
    }
}
// if token , add to headers
if(token){
    config.headers['x-auth-token']=token;

    axios.get("/auth/user",config)
    .then(res=> dispatch({
        type:USER_LOADED,
        payload:res.data
        
    }))
    .catch(err=>{
        console.log(err);
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type:AUTH_ERROR
        });
    }) }
}

export const isBlockedF=(isBlocked)=>dispatch=>{
    const type=isBlocked?"BLOCK":"FREE_BLOCK";
    dispatch({
        type:type,
        payload:isBlocked
    })
}

export const TokenExpireExtend=({rememberMe})=>dispatch=>{
    // Headers
    dispatch({
        type:EXPIRE_EXTEND,
        payload:rememberMe
    })
   
    }



export const loginModalOpen=(isOpen)=>dispatch=>{
    const type=isOpen?"LOGIN_MODAL_OPEN":"LOGIN_MODAL_CLOSE";
    dispatch({
        type:type,
        payload:isOpen})
}


// Login User
export const login=({email,password})=>dispatch=>{
    // Headers
    const config={
        headers:{'Content-Type':'application/json'}
    }
    // Request body

    const body=JSON.stringify({email,password});
    console.log(body);

    axios.post("/auth/login",body,config)
    .then(res=> dispatch({
        type:LOGIN_SUCCESS,
        payload:res.data
    }))
    .catch(err=>{
        console.log("catch block error")
        dispatch(returnErrors(err.response.data, err.response.status,"LOGIN_FAIL"));
        dispatch({
            type:LOGIN_FAIL
        });
    })

}


// Register User

export const register=({fname,lname,email,password,img,city,state,postal,country,ip})=>dispatch=>{
    // Headers
    const config={
        headers:{'Content-Type':'application/json'}
    }
    // Request body

    const body=JSON.stringify({fname,lname,email,password,img,city,state,postal,country,ip});
    console.log(body);

    axios.post("/auth/register",body,config)
    .then(res=> dispatch({
        type:REGISTER_SUCCESS,
        payload:res.data
    }))
    .catch(err=>{
        console.log("catch block error")
        dispatch(returnErrors(err.response.data, err.response.status,"REGISTER_FAIL"));
        dispatch({
            type:REGISTER_FAIL
        });
    })

}


export const update=({id,fname,lname,email,password,img,city,state,postal,country,ip})=>(dispatch,getState)=>{
    // Headers
    const config={
        headers:{'Content-Type':'application/json'}
    }
    const token=getState().auth.token;
    if(token){
        config.headers['x-auth-token']=token;
    }
    // Request body

    const body=JSON.stringify({id,fname,lname,email,password,img,city,state,postal,country,ip});
    console.log(body);
    axios.post("/auth/update",body,config)
    .then(res=> dispatch({
        type:UPDATE_SUCCESS,
        payload:res.data
    }))
    .catch(err=>{
        console.log("catch block error-- ")
        dispatch(returnErrors(err.response.data, err.response.status,"UPDATE_FAIL"));
        dispatch({
            type:UPDATE_FAIL
        });
    })

}



// Logout uSER
export const logout=()=>{
    return{
        type:LOGOUT_SUCCESS
    };
};
