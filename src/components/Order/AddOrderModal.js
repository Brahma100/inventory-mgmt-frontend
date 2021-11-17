import React,{Component} from 'react';
import { Button,Col,Alert,NavLink, Modal,Form } from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {clearErrors}  from '../../action/errorActions';
import {Formik} from 'formik';
import * as yup from 'yup';

import back from '../../assets/images/back.jpg';
import {loadUser} from '../../action/authActions'
import {getItems} from '../../action/itemAction';
import {addOrder,getOrders} from '../../action/orderAction';
import {getCustomers} from '../../action/customerAction';
import {getCategories} from '../../action/categoryAction';



const schemaOrder = yup.object({
    customer_id: yup.number().positive().integer().min(1,"Choose Any Customer"),
    category_id: yup.number().positive().integer().min(1,"Choose Any Category"),
    product_id: yup.string().min(9,"Choose Any Product"),
    payment1: yup.number().positive().integer().min(1,"Choose Any Payment Status"),
    quantity:yup.number().integer().min(1,"Choose Atleast One Quantity").max(100,'Max 100 Allowed/Order'),   
    // total:yup.number().integer().min(1,"Choose Any Product")
          
})



class AddOrderModal extends Component{
    state={
       
        modal:false,   // modal for adding item is false initially
        msg:null,   
    };

    componentDidMount(){
      this.props.getCustomers();
      this.props.getCategories();
      this.props.getItems();

    }

    componentDidUpdate(prevProps){

        console.log("Add Order Called");
        const {error}=this.props;
        if(error!==prevProps.error){
            if(error.id==="UPDATE_FAIL"){
                this.setState({msg:error.msg.msg});
            }
            else{
                this.setState({msg:null});
            }
        }
        // if authenticated close Modal
        // if(this.state.modal){
            
        //     if(isAuthenticated){
        //         this.toggle();
        //     }
        // }
    }
    static propTypes={
        error:PropTypes.object.isRequired,
        clearErrors:PropTypes.func.isRequired
    }

   toggle=()=>{   
        this.props.clearErrors();
        this.setState({
            modal:!this.state.modal
        })
        console.log("Toggle:",this.state.modal);
        
    }
    

render(){

  
  
  var customers=this.props.customers.length===0?[]:this.props.customers;
  var products=this.props.products.length===0?[]:this.props.products;
  var categories=this.props.categories.length===0?[]:this.props.categories;
  
const  getCategory=(id)=>{
      return categories.filter(cat=>cat.id===parseInt(id))[0].name;
  }
  // console.log("Category:",getCategory("1254"));
const getProducts=(id,products)=>{
  if(id==="0")
  return [];
  let cat_name=getCategory(id);
  return products.filter(p=>p.category===cat_name)
}

const getPrice=(id)=>{
  if(id!=='0'){
    return products.filter(p=>p.id===id)[0].price;
  }
  return 0;
}

console.log("User:",this.props.user);
    return(
        <div>
          {/* <Prompt
              when={this.state.isBlocking}
                message={(location, action) => {
                  // if (action === 'POP') {
                    console.log("Backing up...",action,location)
                  // }

                  return location.pathname.startsWith("/")
                    ? true
                    : `Are you sure you want to Leave ${location.pathname}?`
            }}
          /> */}
             {/* <Prompt
                when={this.props.isBlocked}
                message={(location)=> `Are You Sure Want To Leave ${location}`}
/>  */}
            <NavLink href="#" onClick={this.toggle} >
               <Button  style={{paddingLeft:' 1.5rem',paddingRight:'1.5rem'}}><b>Add Order</b></Button>
            </NavLink>

            <Modal show={this.state.modal} onHide={this.toggle} >
                <Modal.Header  style={{color:'white', backgroundImage: `url("${back}")`,backgroundSize:'32rem',backgroundRepeat:'no-repeat'}} closeButton ><b>Add Order</b></Modal.Header>
                <Modal.Body>
    {this.state.msg?<Alert color="danger">{this.state.msg}</Alert>:null}
   
    <Formik
      validationSchema={schemaOrder}
      initialValues={{
        customer_id:'0',
        product_id:'0',
        quantity:0,
        total:0,
        category_id:'0',
        payment1:'0'

      }}
      onSubmit={(values)=>{ 
        
        const {product_id,customer_id,quantity,payment1}=values;
        let by_user_id=this.props.user?this.props.user._id:9;
        let payment=parseInt(payment1)===1?"Completed":"Pending";
        let total=quantity*getPrice(product_id)
        console.log(product_id,customer_id,by_user_id,quantity,total,payment);
        const newOrder={
          product_id,customer_id,by_user_id,quantity,total,payment
        }
        this.props.addOrder(newOrder);
        this.toggle();
        setTimeout(()=>{
          this.props.getOrders();
        },1500)
    }
    }
    >
       
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
         }) => (
        <Form noValidate onSubmit={handleSubmit}>
          
          <Form.Row>
            <Form.Group as={Col} md="6">
           
              <Form.Label>Customer</Form.Label>
              
              <Form.Control
                as="select"
                // type="password"
                placeholder=""
                name="customer_id"
                value={values.customer_id}
                onChange={handleChange}
                isInvalid={!!errors.customer_id}
                
              >
                  <option value='0'>Choose Customer</option>

                  {this.props.customers.map((customer,key)=>(
                      <option value={customer.id}>{customer.fname+" "+customer.lname}</option>
                  ))
                        
                  }
                
        
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.customer_id}
              </Form.Control.Feedback>


            </Form.Group>
            <Form.Group as={Col} md="6">
             <Form.Label>Category</Form.Label>
              
              <Form.Control
                as="select"
                // type="password"
                placeholder=""
                name="category_id"
                value={values.category_id}
                onChange={handleChange}
                isInvalid={!!errors.category_id}
                
              >
                  <option value="0">Choose Category</option>

                  {categories.map((category,key)=>(
                      <option value={category.id}>{category.name}</option>
                  ))
                        
                  }
                
        
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.category_id}
              </Form.Control.Feedback>
            </Form.Group>
           

          </Form.Row>

          <Form.Row>
         <Form.Group as={Col} md="12">
             <Form.Label>Product Under Choosen Category</Form.Label>
              
              <Form.Control
                as="select"
                placeholder=""
                name="product_id"
                value={values.product_id}
                onChange={handleChange}
                isInvalid={!!errors.product_id}
              >
                  <option value="0">Choose Product</option>
                  {getProducts(values.category_id,products).map((product,key)=>(
                      <option style={{fontWeight:'bold'}} value={product.id}> #{key+1} | {product.name} | Price: ₹{product.price} | Stock: {product.stock}</option>
                  ))
                        
                  }
                
        
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.product_id}
              </Form.Control.Feedback>
            </Form.Group>
            </Form.Row>
            <Form.Row>
         <Form.Group as={Col} md="6">
             <Form.Label>Quantity</Form.Label>
              
              <Form.Control
                type="number"
                placeholder="Quantity"
                name="quantity"
                value={values.quantity}
                onChange={handleChange}
                isInvalid={!!errors.quantity}
              >
                  
                
        
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.quantity}
              </Form.Control.Feedback>
            </Form.Group>
         <Form.Group as={Col} md="6">
             <Form.Label>Total</Form.Label>
              
              <Form.Control
              disabled
                type="number"
                placeholder="total"
                name="total"
                value={values.quantity===0?values.total:values.quantity*parseInt(getPrice(values.product_id))}
                onChange={handleChange}
               
              >
            
        
              </Form.Control>
      
              
            </Form.Group>
            </Form.Row>
            <Form.Row>
            <Form.Group as={Col} md="12">
             <Form.Label>Payment</Form.Label>
              
              <Form.Control
                as="select"
                placeholder=""
                name="payment1"
                value={values.payment1}
                onChange={handleChange}
                isInvalid={!!errors.payment1}
              >
                  <option value="0">Choose Product</option>
                  <option value="1">Completed</option>
                  <option value="2">Pending</option>

              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.payment1}
              </Form.Control.Feedback>
            </Form.Group>
            </Form.Row>
          <Button type="submit">Add Order</Button>
          
                        </Form>
                        
                    )}
                    </Formik>
                </Modal.Body>          

            </Modal>
        </div>
    );
}
}
const mapStateToProps= state=>{
    return({
        customers:state.customer.customers,
        products:state.item.items,
        categories:state.category.categories,
        user:state.auth.user,
        error:state.error
    })
}


export default connect(mapStateToProps,{loadUser,clearErrors,addOrder,getOrders,getCategories,getCustomers,getItems})(AddOrderModal);