import React,{Component} from 'react';
import {Col, Alert,NavLink, Button, Modal,Form,FormGroup,Label, Input, InputGroup, ButtonGroup} from 'react-bootstrap';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../action/authActions';
import {addItem} from '../../action/itemAction';
import {getCategories} from '../../action/categoryAction';

import {clearErrors}  from '../../action/errorActions';
import {Formik} from 'formik';
import * as yup from 'yup';
import back from '../../assets/images/back.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


// import e from 'express';
const schemaPro = yup.object({
    name: yup.string().min(3, 'Name must be at least 3 characters').max(24, 'Password can be maximum 20 characters').required(),
    description: yup.string().required(),
    manufacturer: yup.string().required(),
    // img: yup.string().required(),
    price: yup.number().positive().integer().min(1, "Price Should be More Than 1").max(500000, "Price Should be Less Than 500K"),
    stock: yup.number().integer().min(1, "Stock Should be More Than 1").max(1000, "Stock Should be Less Than 1K"),
    
    // rating: yup.number().positive().integer().min(1,"Min").max(5,"Max"),
    
    category: yup.number().positive().integer().min(1,"Choose Any Category"),
    // img: yup.string().required(),
})

class NewProductModal extends Component{
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
            <Button><FontAwesomeIcon  icon={faPlus}/><h7 style={{marginLeft:'.3rem'}} className="newproductbuttontext">Create Product</h7></Button>
            </NavLink>

            <Modal show={this.state.modal} onHide={this.toggle} >
                <Modal.Header  style={{color:'white', backgroundImage: `url("${back}")`,backgroundSize:'32rem',backgroundRepeat:'no-repeat'}} closeButton ><b>Create Product</b></Modal.Header>
                <Modal.Body>
    {this.state.msg?<Alert color="danger">{this.state.msg}</Alert>:null}





    <Formik
      validationSchema={schemaPro}
     

      initialValues={{
        name:"",
        description:"",
        manufacturer:"",
        price:'',
        stock:'',
        // rating:'',
        img:"",
        category:0,
        // createdBy:'Admin',
        // rank:0,
      }}
      onSubmit={(values)=>{ 
        console.log("onSUbmit");
        const {name,description,manufacturer,price,stock,category}=values;
        console.log("On Submit Called",name);
        // this.encodeImageFileAsURL();
        
        const user=this.props.user;

        var Category=this.props.categories.filter(
          function (cat) {
            if(cat.id ===parseInt(category))return cat.name 
          }
        )
        
        let CategoryName=Category[0].name;
        let img=this.state.imageURL;
        console.log("Image:",img);
        const product={
          name,description,manufacturer,price,stock,img,CategoryName,user
        }
      //  console.log("Name:",name," Des:",description," Manu:",manufacturer," price:",price," Stock:",stock," Img:",img,"  Cat",CategoryName," User:",user);
        this.props.addItem(product);
        this.toggle();
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
          <Form.Group as={Col} md="12" controlId="validationFormik01">
              <Form.Label>Product Name</Form.Label>
              
                <Form.Control
                  type="text"
                  placeholder="Product Name"
                  aria-describedby="inputGroupPrepend"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              
            </Form.Group>
            </Form.Row>
            <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik02">
              <Form.Label>Price</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">₹</InputGroup.Text>
                </InputGroup.Prepend>
              <Form.Control
                type="number"
                placeholder="Price"
                name="price"
                value={values.price}
                onChange={handleChange}
                isInvalid={!!errors.price}
              />

              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

          </Form.Row>
            <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik03">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Quantity"
                name="stock"
                value={values.stock}
                onChange={handleChange}
                isInvalid={!!errors.stock}
              />
              <Form.Control.Feedback type="invalid">
                {errors.stock}
              </Form.Control.Feedback>
            </Form.Group>

          </Form.Row>
            <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik04">
              <Form.Label>Manufacturer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Manufacturer"
                name="manufacturer"
                value={values.manufacturer}
                onChange={handleChange}
                isInvalid={!!errors.manufacturer}
              />
              <Form.Control.Feedback type="invalid">
                {errors.manufacturer}
              </Form.Control.Feedback>
            </Form.Group>

          </Form.Row>
            <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik05">
              <Form.Label>Description</Form.Label>
              <Form.Control
              as="textarea"
                type="textarea"
                placeholder="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

          </Form.Row>
            <Form.Row>
            <Form.Group as={Col} md="5" controlId="validationFormik06">
              <Form.Label>Select Category</Form.Label>
              <Form.Control
                as="select"
                // type="password"
                placeholder=""
                name="category"
                value={values.category}
                onChange={handleChange}
                isInvalid={!!errors.category}
                
              >
                  <option value="0">Choose Category</option>
                  {this.props.categories.map((category)=>(
                        <option value={category.id}>{category.name}</option>

                  ))}
                 
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.category}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="7" controlId="validationFormik07">
                <div className="mb-3">
                    <Form.File id="formcheck-api-regular">
                    <Form.File.Label>Product Image</Form.File.Label>
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
        isAuthenticated:state.auth.isAuthenticated,
        error:state.error
    })
}


export default connect(mapStateToProps,{clearErrors,addItem,getCategories})(NewProductModal);