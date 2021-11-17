import {PRODUCT_FETCHED,P_FETCH_FAIL} from '../action/types';

const initialState={
    token:localStorage.getItem('token'),
    isLoading:false,
    isAuthenticated:null,
    isUpdate:null,
    s_product:null
};

export default function(state=initialState,action){
    switch(action.type){
        case PRODUCT_FETCHED:
            return{

                s_product:action.payload
            };
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                
                isLoading:false,
                user:action.payload,

            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            return{
                ...state,
                ...action.payload,
                isAuthenticated:true,
                isLoading:false,

            };
        case UPDATE_SUCCESS:
            return{
                ...state,
                ...action.payload,
                isUpdate:true,
                isAuthenticated:true,
                isLoading:false,

            }; 
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS: 
        case REGISTER_FAIL:  
        // case UPDATE_FAIL:
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                isLoading:false,
            };
        default:
            return state;
    }
}