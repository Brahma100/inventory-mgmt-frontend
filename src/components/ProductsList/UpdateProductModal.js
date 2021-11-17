import React,{Component} from 'react';
import { Alert,NavLink, Button, Modal, ModalHeader, ModalBody,Form,FormGroup,Label, Input, Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import {loadUser,loginModalOpen} from '../../action/authActions';
import back from '../../assets/images/back.jpg';
import {clearErrors}  from '../../action/errorActions';

// import e from 'express';
import { getItems,updateItem } from '../../action/itemAction';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

class UpdateProductModal extends Component{
    
    state={
        modal:false,   // modal for adding item is false initially
        name:'',
        description:'',
        manufacturer:'',
        stock:0,
        price:0,
        rating:0,
        msg:null,
        isUpdate:false
    };
    componentDidMount(){
        // this.props.loadUser();
        const {name,description,manufacturer,price,stock,rating}=this.props.product;
        this.setState({name:name,description:description,manufacturer:manufacturer,price:price,stock:stock,rating:rating});
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
        if(!this.props.isAuthenticated){
            console.log("Authen");
            this.props.history.push('/')
            this.props.loginModalOpen(true);
           
        }
        // console.log("from Toggle-> Modal Open:: "+this.state.modal)
        else
            this.setState({
                modal:!this.state.modal
            })
    }


    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

    // On Submit  method 
    onSubmit=e=>{
        const {error,isUpdate}=this.props;
        console.log("From Submit-> isUpdate:: "+this.props.isUpdate)
        e.preventDefault();
        const id=this.props.product.id;
        var user=this.props.user;
        console.log("User Id Given for Update: :",user)
        const {name,description,manufacturer,stock,price}=this.state;
        let {rating}=this.state;
        if(rating===undefined)
        rating=4.5
        console.log("Data to Update:",rating);
        const editProduct={
            id,name,description,manufacturer,price,stock,rating,user
        }
        this.props.updateItem(editProduct);
        
        this.toggle();
        // this.props.getItems();
        // this.props.addItem(newItem);
   
        
    }

render(){
    const {name,description,manufacturer,price,stock,rating}=this.props.product;
    return(
        <>
            <OverlayTrigger        
                        placement="bottom"
                    overlay={<Tooltip id="button-tooltip-2">Edit Product</Tooltip>}>
           
            <Button onClick={this.toggle} variant="primary" size="sm">
                    <FontAwesomeIcon icon={faEdit}/>
            </Button>
            </OverlayTrigger>
            <Modal isOpen={this.state.modal}  >
                <ModalHeader toggle={this.toggle} style={{color:'white', backgroundImage: `url("${back}")`,backgroundSize:'32rem',backgroundRepeat:'no-repeat'}} closeButton>Update</ModalHeader>
                <ModalBody>
    {this.state.msg?<Alert color="danger">{this.state.msg}</Alert>:null}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder={name}
                                onChange={this.onChange}
                            />
                            <Label for="description">Description</Label>
                            <Input 
                                type="text"
                                name="description"
                                id="description"
                                placeholder={description}
                                onChange={this.onChange}
                            />
                            <Label for="manufacturer">Manufacturer</Label>
                            <Input 
                                type="text"
                                name="manufacturer"
                                id="manufacturer"
                                placeholder={manufacturer}
                                onChange={this.onChange}
                            />
                            <Label for="price">Price</Label>
                            <Input 
                                 type="text"
                                name="price"
                                id="price"
                                placeholder={price}
                                onChange={this.onChange}
                            />
                            <Label for="stock">Stock</Label>
                            <Input 
                                 type="text"
                                name="stock"
                                id="stock"
                                placeholder={stock}
                                onChange={this.onChange}
                            />
                            <Label for="rating">Rating</Label>
                            <Input 
                                type="text"
                                name="rating"
                                id="rating"
                                placeholder={rating}
                                onChange={this.onChange}
                            />
                            <Button  style={{marginTop:'2rem'}} block>

                            Update</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>

            </Modal>
        </>
    );
}
}
const mapStateToProps= state=>{
    return({
        isUpdate:state.auth.isUpdate,

        isAuthenticated:state.auth.isAuthenticated,
        error:state.error
    })
}


export default connect(mapStateToProps,{loadUser,loginModalOpen,getItems,updateItem,clearErrors})(withRouter(UpdateProductModal));