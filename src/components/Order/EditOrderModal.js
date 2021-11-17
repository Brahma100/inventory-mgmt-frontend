import React,{Component} from 'react';
import { Col,Alert, Button, Modal,Form, Row, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import {updateOrder,getOrders} from '../../action/orderAction';
import back from '../../assets/images/back.jpg';
import {loginModalOpen} from '../../action/authActions'
import {clearErrors}  from '../../action/errorActions';
import {Formik} from 'formik';
import * as yup from 'yup';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const schemaOrder = yup.object({
    quantity: yup.number().positive().integer().min(1, "Price Should be More Than 1").max(1000, "Price Should be Less Than 500K"),   
    payment1: yup.number().positive().integer().min(1,"Choose Any Payment Status"),

})


class EditOrderModal extends Component{
    
    state={
        modal:false,   // modal for adding item is false initially
        product_id:'',
        customer_id:'',
        by_user_id:'',
        quantity:0,
        total:0,
        payment:0,
        msg:null,
        isUpdate:false
    };
    componentDidMount(){
        // this.props.loadUser();
        const {id,product_id,customer_id,by_user_id,quantity,total,payment}=this.props.order;
        this.setState({product_id:product_id,customer_id:customer_id,quantity:quantity,by_user_id:by_user_id,total:total,payment:payment});
    }
    componentDidUpdate(prevProps){
        const {error,isUpdate}=this.props;
        if(error!==prevProps.error){
            if(error.id==="UPDATE_FAIL"){
                this.setState({msg:error.msg.msg});
            }
            else{
                this.setState({msg:null});
            }
        }
        // if Update close Modal
        if(this.state.modal){
            
            if(isUpdate){
                this.toggle();
                this.props.loadUser();
            }
        }
        
    }
    static propTypes={
        isUpdate:PropTypes.bool,
        isAuthenticated:PropTypes.bool,
        error:PropTypes.object.isRequired,
        register:PropTypes.func.isRequired,
        clearErrors:PropTypes.func.isRequired
    }

    toggle=()=>{  
        // clear the error
        this.props.clearErrors();
        // to toggle the modal 
        console.log("Props",this.props);
        // if(!this.props.isAuthenticated){
        //     console.log("Authen");
        //     this.props.history.push('/')
        //     this.props.loginModalOpen(true);
           
        // }
        // console.log("from Toggle-> Modal Open:: "+this.state.modal)
        // else
            this.setState({
                modal:!this.state.modal
            })
    }


    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

render(){
    console.log("product Edit Modal:",this.props.product);
    return(
        <>
            <OverlayTrigger        
                        placement="bottom"
                    overlay={<Tooltip id="button-tooltip-2">Edit Order</Tooltip>}>
           
            <Button style={{height:'31px',fontSize:'10px',padding:'.5rem .5rem',margin:'0rem'}} onClick={this.toggle} variant="primary" size="sm">
                    <FontAwesomeIcon icon={faEdit}/>
            </Button>

            </OverlayTrigger>


            <Modal show={this.state.modal} onHide={this.toggle}   >
                <Modal.Header toggle={this.toggle} style={{color:'white', backgroundImage: `url("${back}")`,backgroundSize:'32rem',backgroundRepeat:'no-repeat'}} closeButton>Update</Modal.Header>
                <Modal.Body>
                    <Card style={{display:'flex'}}>
                        <Row style={{display:'flex',alignItems:'center'}}>
                               <div style={{display:'flex',width:'15rem'}}> 
                                <Col style={{marginLeft:'.5 rem'}} ><img alt="alt" style={{height:'80px',width:'80px'}} src={this.props.product_img}/></Col>
                                <Col  style={{marginTop:'1rem',display:'flex',flexDirection:'column',alignItems:'center'}}><h7><b>{this.props.product_name}</b></h7><span style={{fontSize:'12px',color:'gray'}}>Qnty:{this.props.order.quantity}</span></Col>
                                </div>
                                <div style={{display:'flex',width:'15rem'}}>
                                {/* <Col sm={2}></Col> */}
                                <Col style={{marginLeft:'1rem'}}><img  alt="alt" style={{borderRadius:'50%',border:'2px solid #3b44c1',height:'50px',width:'50px'}} src={this.props.customer_img}/></Col>
                                <Col style={{marginTop:'.8rem',display:'flex',flexDirection:'column',alignItems:'center'}} ><h7><b>{this.props.customer_name}</b></h7></Col>
                            </div>
                        </Row>
                    </Card>
    {this.state.msg?<Alert color="danger">{this.state.msg}</Alert>:null}
    <Formik
    // validator={() => ({})}
      validationSchema={schemaOrder}
      initialValues={{
        quantity:this.state.quantity,
        total:this.state.quantity*this.props.product_price,
        payment1:this.state.payment==="Completed"?"1":"2",
        price:this.props.product_price
        // mobile_number:''

      }}
        onSubmit={(values)=>{ 
        
            const {quantity,payment1}=values;
            const payment=payment1==="1"?"Completed":"Pending"
            const id=this.props.order.id;
            const product_id=this.state.product_id;
            const customer_id=this.state.customer_id;
            const by_user_id=this.state.by_user_id;
            const total=quantity*this.props.product_price;

                const editOrder={
                    id,product_id,customer_id,by_user_id,quantity,total,payment
                }
                console.log("Submit:",editOrder);
                this.props.updateOrder(editOrder);
                this.toggle();
                setTimeout(()=>{
                    this.props.getOrders();
                },1500);
            
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
            <Form.Group as={Col} md="6" controlId="validationFormik01">
           
              <Form.Label>Quantity</Form.Label>
              
              <Form.Control
                type="text"
                placeholder=""
                name="quantity"
                value={values.quantity}
                // onChangeCapture={(e)=>this.setState({isBlocking:e.target.value>0})}
                onChange={handleChange}//this.setState({isBlocking:e.target.value.length>0}); handleChange(e)}}
                isInvalid={!!errors.quantity}
              />
              <Form.Control.Feedback type="invalid">
                {errors.quantity}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationFormik01">
              <Form.Label>Payment</Form.Label>
              <Form.Control
                as="select"
                // type="password"
                placeholder=""
                name="payment1"
                value={values.payment1}
                onChange={handleChange}
                isInvalid={!!errors.payment1}
                
              >
                  <option value="0">Choose Payment</option>
                  
                <option value="1">Completed</option>
                <option value="2">Pending</option>

                  
                 
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.payment1}
              </Form.Control.Feedback>
            </Form.Group>
           

          </Form.Row>
         
         <Form.Row style={{fontWeight:'bold',color:'gray',border:'1px solid rgba(0,0,0,.125)',padding:'.5rem',borderRadius:'5px',marginBottom:'.5rem'}}><h7>Total:</h7><span><b>{this.props.product_price}</b></span>X<span><b>{values.quantity}</b>=<b>{values.quantity*values.price}</b></span></Form.Row>
          <Button type="submit">Update</Button>
          
         
                        </Form>
                        
                    )}
                    </Formik>
                </Modal.Body>

            </Modal>
        </>
    );
}
}
const mapStateToProps= state=>{
    return({
        error:state.error
    })
}


export default connect(mapStateToProps,{updateOrder,clearErrors,loginModalOpen,getOrders})(withRouter(EditOrderModal));