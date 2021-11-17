
import  {UPDATE_ORDER,GET_ORDER,ADD_ORDER,DELETE_ORDER,ORDERS_LOAD} from '../action/types';

const initialState={
    orders:[],
    ordersLoading:false,
    ordersLoaded:false
}

export default function(state=initialState,action){
    const {payload}=action; //destructuring action
    switch(action.type){
        case GET_ORDER:
            return{
                ...state,
                orders:payload,
                ordersLoading:false,
                ordersLoaded:true
           };
           case DELETE_ORDER:
            return{
                ...state,
                orders:state.orders.filter(order=> order.id!==action.payload)

           };
        //    case DELETE_SELECTED_ITEM:
        //        console.log("Action Payload:",action.payload);
        //     return{
        //             ...state,
        //             orders:state.orders.filter(order=> 
        //                 {
        //                     // console.log("Action::",action.payload);
        //                     for(var id in action.payload)
        //                     if(order.id!==id)
        //                         return false;
        //                     return true;
        //                 }
        //          )

        //    };
           case ADD_ORDER:
            return{
                ...state,
                orders:[...state.orders,payload]

           };
        case ORDERS_LOAD:
            return{
                ...state,
                ordersLoading:true,
                ordersLoaded:false
            };
            case UPDATE_ORDER:
            return{
                ...state,
               orders:state.orders.map((order)=>{
                   if(order.id===action.payload.id){
                       const updatedItem={
                           ...order,
                           payment:action.payload.payment,
                           total:action.payload.total,
                           quantity:action.payload.quantity,
                        
                       }
                       return updatedItem;
                   }
                   return order;
               }),
               ordersLoading:false,
                ordersLoaded:true
               

            }; 
        default:
            return state;
    }
}