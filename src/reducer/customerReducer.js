
import  {UPDATE_CUSTOMER,GET_CUSTOMER,ADD_CUSTOMER,DELETE_CUSTOMER, CUSTOMERS_LOAD} from '../action/types';

const initialState={
    customers:[],
    customersLoading:false,
    customersLoaded:false
}

export default function(state=initialState,action){
   
    switch(action.type){
        case GET_CUSTOMER:
            return{
                ...state,
                customers:action.payload,
                customersLoading:false,
                customersLoaded:true
           };
           case DELETE_CUSTOMER:
            return{
                ...state,
                customers:state.customers.filter(customer=> customer.id!==action.payload)

           };
        //    case DELETE_SELECTED_ITEM:
        //        console.log("Action Payload:",action.payload);
        //     return{
        //             ...state,
        //             customers:state.customers.filter(order=> 
        //                 {
        //                     // console.log("Action::",action.payload);
        //                     for(var id in action.payload)
        //                     if(order.id!==id)
        //                         return false;
        //                     return true;
        //                 }
        //          )

        //    };
           case ADD_CUSTOMER:
            return{
                ...state,
                customers:[...state.customers,action.payload]

           };
        case CUSTOMERS_LOAD:
            return{
                ...state,
                customersLoading:true,
                customersLoaded:false
            };
            case UPDATE_CUSTOMER:
            return{
                ...state,
               customers:state.customers.map((order)=>{
                   if(order.id===action.payload.id){
                       const updatedItem={
                           ...order,
                           name:action.payload.name,
                           description:action.payload.description,
                           manufacturer:action.payload.manufacturer,
                           price:action.payload.price,
                           stock:action.payload.stock,
                           rating:action.payload.rating,
                           editUser:order.editUser.push(action.payload.user),
                       }
                       return updatedItem;
                   }
                   return order;
               }),
               customersLoading:false,
                customersLoaded:true
               

            }; 
        default:
            return state;
    }
}