import React,{Component} from 'react';
import {Col, Card, Button, Row,Form,Container, InputGroup,Spinner, Tooltip} from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {updateItem} from '../../action/itemAction';
import {getCategories} from '../../action/categoryAction';
import {clearErrors}  from '../../action/errorActions';
import {Formik} from 'formik';
import * as yup from 'yup';
import default_product from '../../assets/images/default-pro.jpg'
import { NavLink, Prompt, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes, faCalendarAlt, faIndustry, faShoppingBag, faStar, faUser } from '@fortawesome/free-solid-svg-icons';

// Product Schema Formik Form Validation Using Yup 
const schemaPro = yup.object({
    name: yup.string().min(3, 'Name must be at least 3 characters').max(24, 'Password can be maximum 20 characters').required(),
    description: yup.string().required(),
    manufacturer: yup.string().required(),
    price: yup.number().positive().integer().min(1, "Price Should be More Than 1").max(500000, "Price Should be Less Than 500K"),
    stock: yup.number().integer().min(1, "Stock Should be More Than 1").max(1000, "Stock Should be Less Than 1K"),
    rating: yup.number().min(1, "Rating Should be More Than 1").max(5, "Rating Should be Less Than 5"),
    

})

class UpdateProduct extends Component {
  // constructor
    product=this.props.history.location.state.product;
  state={
    modal:false,   // modal for adding item is false initially
    msg:null,
    isBlocking:false,
    imageURL:this.product.img,
    id:this.product.id,
    name:this.product.name,
    description:this.product.description,
    manufacturer:this.product.manufacturer,
    price:this.product.price,
    stock:this.product.stock,
    rating:this.product.rating,
    img:"",
    category:0,
    pcategory:this.product.category,
    categories:this.props.categories
};
componentDidMount(){
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
    this.props.clearErrors();
    console.log(this.state.modal)
    this.setState({
        modal:!this.state.modal
    })
}

// Function For Converting Image To Base-64
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

onChange=(e)=>{
    this.setState({[e.target.name]:e.target.value})
}
  render() {
    var isLoaded=this.props.isLoaded;
    
    console.log("History:",this.props.history.location.state);
    // console.log("user from UpdateProduct::",this.props.user.email);
    return (
      <div className="content">
        <Container fluid>


          <Prompt
                when={this.state.isBlocking}
                message={(location)=> `Are You Sure Want To Go To ${location.pathname}`}
/> 
          <Row>
            <Col md={6}>
<Card style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
  <Card.Header>
    <p style={{fontSize:'1.5rem',fontWeight:'bold',color:'#3b44c1'}}>Update Product</p>
  </Card.Header>    
  <Card.Body>
  <Formik
  validationSchema={schemaPro}
 
  initialValues={{
    name:this.state.name,
    description:this.state.description,
    manufacturer:this.state.manufacturer,
    price:this.state.price,
    stock:this.state.stock,
    img:this.state.imageURL,
    rating:this.state.rating?this.state.rating:0
    
    // createdBy:'Admin',
    // rank:0,
  }}
  onSubmit={(values)=>{ 
    console.log("onSUbmit");
    const {name,description,manufacturer,price,stock,rating}=values;
    console.log("On Submit Called",name);
    // this.encodeImageFileAsURL();
    
    const user=this.props.user;
    let img=this.state.imageURL;
    let id=this.state.id;
    // console.log("Image:",img);
    const product={
        id,name,description,manufacturer,price,stock,rating,user,img
    }
    this.setState({isBlocking:false})
  //  console.log("Name:",name," Des:",description," Manu:",manufacturer," price:",price," Stock:",stock," Img:",img,"  Cat",CategoryName," User:",user);
    this.props.updateItem(product);
    this.toggle();
   }
 }
>
  {  ({ handleSubmit, handleChange, values, errors}) => (
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
              onChange={(e)=>{this.setState({isBlocking:e.target.value.length>0});handleChange(e);this.onChange(e)}} 
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
            onChange={(e)=>{this.setState({isBlocking:e.target.value.length>0});handleChange(e);this.onChange(e)}} 
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
            onChange={(e)=>{this.setState({isBlocking:e.target.value.length>0});handleChange(e);this.onChange(e)}} 
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
            onChange={(e)=>{this.setState({isBlocking:e.target.value.length>0});handleChange(e);this.onChange(e)}} 
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
            onChange={(e)=>{this.setState({isBlocking:e.target.value.length>0});handleChange(e);this.onChange(e)}} 
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
        </Form.Group>

      </Form.Row>
        <Form.Row>
        <Form.Group as={Col} md="5" controlId="validationFormik06">
          <Form.Label>Rating</Form.Label>
          <Form.Control
           
            type="number"
            placeholder={values.rating}
            name="rating"
            value={values.rating}
            onChange={handleChange}
            isInvalid={!!errors.rating}
            
          >
              
             
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.rating}
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
</Card.Body>
</Card>
</Col>




            <Col md={4}>
            <Card className="product-card" style={{ width:'19rem',margin:'1rem'}}>
                   <Card.Header>
                     <div>
                       <h7 style={{fontSize:'20px',color:'gray'}}><b>Selected Product</b></h7>
                     </div>
                   </Card.Header>
                   <Card.Img top style={{height:'8rem',marginLeft:'3.5rem',marginTop:'1rem',width:'12rem'}} src={this.state.imageURL?this.state.imageURL:default_product} alt="Card image cap" />
                      <Card.Body style={{display:'flex',flexDirection:'column',paddingLeft:'3rem',maxWidth:'30rem'}}>
                                                                           
                        <Card.Title><b>{this.state.name}</b></Card.Title>
                        <Card.Subtitle style={{marginLeft:'0rem'}}>
                        {/* <Row>
                                <span style={{color:'#3b44c1',fontSize:'.8rem'}}>{this.state.manufacturer}</span>
                            </Row> */}
                            {/* <Row>
                                <h3 style={{margin:'0rem'}}>{this.state.name}</h3 >
                            </Row> */}
                            <Row style={{display:'flex',alignItems:'center'}}>
                             
                                <h4  style={{display:this.state.price?'flex':'none',margin:'0rem 0rem',fontWeight:'bold',fontSize:'16px'}}>₹{this.state.price}</h4>
                                <p style={{margin:'0 0 0 .5rem',borderRadius:'5px',background:'green',color:'white',padding:'.1rem .3rem',fontSize:'12px'}}>{this.state.rating?this.state.rating:"0"} <FontAwesomeIcon  icon={faStar}/></p> 
                             
                            </Row>
                            {/* <Row style={{display:'flex',fontSize:'12px'}}>
                            </Row> */}
                            <Row style={{fontSize:"12px",paddingBottom:'.2rem'}}>
                               <div style={{display:this.state.stock?'flex':'none'}}> <h7 style={{color:'gray',alignItems:'center'}}><FontAwesomeIcon style={{marginRight:'.2rem'}} icon={faShoppingBag}/><b style={{marginRight:'.2rem'}}>Available Stock:</b></h7><span style={{color:this.state.stock>=10?'#1bc943':'#f83245',borderRadius:'5px',border:this.state.stock>=10?'1px solid #1bc943':' 1px solid #f83245',background:this.state.stock>=10?'#e5f9ed':'#fff5f6',padding:'.0rem .3rem'}}><b>{this.state.stock}</b></span>
                            </div></Row>
                            <Row style={{fontSize:"12px",paddingBottom:'.2rem'}}>
                               <div style={{display:'flex'}}> <h7 style={{color:'gray',display:'flex',alignItems:'center'}}><FontAwesomeIcon style={{marginRight:'.2rem'}} icon={faUser}/><b style={{marginRight:'.2rem'}}>Added By:</b></h7><span><b>{this.props.history.location.state.user?this.props.history.location.state.user.fname+" "+this.props.history.location.state.user.lname:null}</b></span>
                           </div> </Row>
                            <Row style={{fontSize:"12px",paddingBottom:'.2rem'}}>
                               <div style={{display:'flex'}}> <h7 style={{color:'gray',display:'flex',alignItems:'center'}}><FontAwesomeIcon style={{marginRight:'.2rem'}} icon={faBoxes}/><b style={{marginRight:'.2rem'}}>Category:</b></h7><span><b>{this.state.pcategory}</b></span>
                           </div> </Row>
                            <Row style={{fontSize:"12px",paddingBottom:'.2rem'}}>
                               <div style={{display:'flex'}}> <h7 style={{color:'gray',display:'flex',alignItems:'center'}}><FontAwesomeIcon style={{marginRight:'.2rem'}} icon={faIndustry}/><b style={{marginRight:'.2rem'}}>Manufacturer:</b></h7><span><b>{this.state.manufacturer}</b></span>
                           </div> </Row>
                           
                        </Card.Subtitle>
                       
                      </Card.Body>
                    
                    </Card>

            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return {
    categories:state.category.categories,
        user:state.auth.user,
        isAuthenticated:state.auth.isAuthenticated,
        error:state.error
  }
}

export default connect(mapStateToProps,{clearErrors,updateItem,getCategories})(withRouter(UpdateProduct));
