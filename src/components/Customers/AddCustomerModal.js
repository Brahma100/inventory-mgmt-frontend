import React,{Component} from 'react';
import {Col, Alert,NavLink, Button, Modal,Form, InputGroup} from 'react-bootstrap';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addItem} from '../../action/itemAction';
import {getCategories} from '../../action/categoryAction';

import {clearErrors}  from '../../action/errorActions';
import {Formik} from 'formik';
import * as yup from 'yup';
import back from '../../assets/images/back.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {addCustomer,getCustomers} from '../../action/customerAction';


// import e from 'express';
const schemaCustomer = yup.object({
    fname: yup.string().min(3, 'First Name must be at least 3 characters').max(24, 'Last Name can be maximum 20 characters').required(),
    lname: yup.string().min(3, 'Last Name must be at least 3 characters').max(24, 'Last Name can be maximum 20 characters').required(),
    address: yup.string().max(100,"Address length must be less than 100 Chars").required(),
    email: yup.string().email('Invalid email').required(),
})

class AddCustomerModal extends Component{
    state={
        modal:false,   // modal for adding item is false initially
        msg:null,
        imageURL:'',
        categories:this.props.categories
    };
    componentDidMount(){
      // this.props.getCategories();
      this.setState({categories:this.props.categories})
    }
    componentDidUpdate(prevProps){
        const {error,isAuthenticated}=this.props;
        if(error!==prevProps.error){
            if(error.id==="LOGIN_FAIL"){
                this.setState({msg:error.msg.msg});
            }
            else{
                this.setState({msg:null});
            }
        }
        
    }
    static propTypes={
        isAuthenticated:PropTypes.bool,
        error:PropTypes.object.isRequired,
        login:PropTypes.func.isRequired,
        clearErrors:PropTypes.func.isRequired
    }

    toggle=()=>{  
        // clear the error
        this.props.clearErrors();
        // to toggle the modal 
        console.log(this.state.modal)
        this.setState({
            modal:!this.state.modal
        })
    }


    encodeImageFileAsURL=()=> {
      console.log("image uploading func. called");
      var filesSelected = document.getElementById("inputFileToLoad").files;
      if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
  
        var fileReader = new FileReader();
  
        fileReader.onload = (fileLoadedEvent)=> {
          var srcData = fileLoadedEvent.target.result; // <--- data: base64
  
          var newImage = document.createElement('img');
          newImage.src = srcData;
          this.setState({imageURL:newImage.src});
          // console.log("ImageURL:",this.state.imageURL);
         
        }
        fileReader.readAsDataURL(fileToLoad);
      }

    }
render(){
  console.log("Categories:",this.state.categories);
    return(
        <div>
             <NavLink onClick={this.toggle} href="#">
            <Button><FontAwesomeIcon  icon={faPlus}/><h7 style={{marginLeft:'.3rem'}} className="newproductbuttontext">Add New</h7></Button>
            </NavLink>

            <Modal show={this.state.modal} onHide={this.toggle} >
                <Modal.Header  style={{color:'white', backgroundImage: `url("${back}")`,backgroundSize:'32rem',backgroundRepeat:'no-repeat'}} closeButton ><b>Add Customer</b></Modal.Header>
                <Modal.Body>
    {this.state.msg?<Alert color="danger">{this.state.msg}</Alert>:null}





    <Formik
      validationSchema={schemaCustomer}
     

      initialValues={{
        fname:"",
        lname:"",
        email:"",
        address:"",
        img:""
      }}
      onSubmit={(values)=>{ 
       
        const {fname,lname,address,email}=values;
        // this.encodeImageFileAsURL();   
        let img=this.state.imageURL;
        console.log("Image:",img);
        const by_user_id=this.props.user?this.props.user._id:'';
        const customer={
          fname,lname,email,address,img,by_user_id
        }
        console.log("New Customer:",customer);
      //  console.log("Name:",name," Des:",description," Manu:",manufacturer," price:",price," Stock:",stock," Img:",img,"  Cat",CategoryName," User:",user);
        this.props.addCustomer(customer);
        
        this.toggle();
        setTimeout(()=>{
            this.props.getCustomers();
        },1000);
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
              <Form.Label>First Name</Form.Label>
              
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  aria-describedby="inputGroupPrepend"
                  name="fname"
                  value={values.fname}
                  onChange={handleChange}
                  isInvalid={!!errors.fname}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fname}
                </Form.Control.Feedback>
              
            </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationFormik01">
              <Form.Label>Last Name</Form.Label>
              
                <Form.Control
                  type="text"
                  placeholder="Last  Name"
                  aria-describedby="inputGroupPrepend"
                  name="lname"
                  value={values.lname}
                  onChange={handleChange}
                  isInvalid={!!errors.lname}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lname}
                </Form.Control.Feedback>
              
            </Form.Group>
            </Form.Row>
            <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik02">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />

              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

          </Form.Row>
            <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik03">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                name="address"
                value={values.address}
                onChange={handleChange}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>

          </Form.Row>

            <Form.Row>

            <Form.Group as={Col} md="7" controlId="validationFormik07">
                <div className="mb-3">
                    <Form.File id="formcheck-api-regular">
                    <Form.File.Label>Customer Image</Form.File.Label>
                    <input id="inputFileToLoad"  type="file" onChange={this.encodeImageFileAsURL} />
                    </Form.File>
                </div>
            </Form.Group>

          </Form.Row>
          
          <Button type="submit">Submit</Button>
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
        categories:state.category.categories,
        user:state.auth.user,
        error:state.error
    })
}


export default connect(mapStateToProps,{getCustomers,clearErrors,addItem,getCategories,addCustomer})(AddCustomerModal);