
import  {GET_CATEGORY,ADD_CATEGORY} from '../action/types';

const initialState={
    categories:[],
    // itemsLoading:false,
    // itemsLoaded:false
}

export default function(state=initialState,action){
    const {payload}=action; //destructuring action
    switch(action.type){
        case GET_CATEGORY:
            return{
                ...state,
                categories:payload,
                // itemsLoading:false,
                // itemsLoaded:true
           };
           
           case ADD_CATEGORY:
            return{
                ...state,
                categories:[...state.categories,payload]

           };
        default:
            return state;
    }
}