
import  {DELETE_SELECTED_ITEM,UPDATE_ITEM,GET_ITEM,ADD_ITEM,DELETE_ITEM,ITEMS_LOAD} from '../action/types';

const initialState={
    items:[],
    itemsLoading:false,
    itemsLoaded:false
}

export default function(state=initialState,action){
    const {payload}=action; //destructuring action
    switch(action.type){
        case GET_ITEM:
            return{
                ...state,
                items:payload,
                itemsLoading:false,
                itemsLoaded:true
           };
           case DELETE_ITEM:
            return{
                ...state,
                items:state.items.filter(item=> item.id!==action.payload)

           };
           case DELETE_SELECTED_ITEM:
               console.log("Action Payload:",action.payload);
            return{
                    ...state,
                    items:state.items.filter(item=> 
                        {
                            // console.log("Action::",action.payload);
                            for(var id in action.payload)
                            if(item.id!==id)
                                return false;
                            return true;
                        }
                 )

           };
           case ADD_ITEM:
            return{
                ...state,
                items:[...state.items,payload]

           };
        case ITEMS_LOAD:
            return{
                ...state,
                itemsLoading:true,
                itemsLoaded:false
            };
            case UPDATE_ITEM:
            return{
                ...state,
               items:state.items.map((item)=>{
                   if(item.id===action.payload.id){
                       const updatedItem={
                           ...item,
                           name:action.payload.name,
                           description:action.payload.description,
                           manufacturer:action.payload.manufacturer,
                           price:action.payload.price,
                           stock:action.payload.stock,
                           rating:action.payload.rating,
                           editUser:item.editUser.push(action.payload.user),
                       }
                       return updatedItem;
                   }
                   return item;
               }),
               itemsLoading:false,
                itemsLoaded:true
               

            }; 
        default:
            return state;
    }
}