import React,{Component} from 'react';
import { Button,InputGroup,Col,Alert,NavLink, Modal,Form } from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register,login,TokenExpireExtend,loginModalOpen} from '../../action/authActions';
import {clearErrors}  from '../../action/errorActions';
import {Formik} from 'formik';
import * as yup from 'yup';
import back from '../../assets/images/back.jpg';


const schemaLogin = yup.object({
    email: yup.string().email('Invalid email').required(),
    password: yup.string().min(0, 'Password must be at least 6 characters').max(24, 'Password can be maximum 24 characters').required()
})
const schemaRegister = yup.object({
    name:yup.string().min(3, 'Name must be at least 3 characters').max(24, 'Password can be maximum 20 characters').required(),   
    email: yup.string().email('Invalid email').required(),
    password: yup.string().min(6, 'Password must be at least 6 characters').max(24, 'Password can be maximum 24 characters').required()
})



class RegisterModal extends Component{
    state={
        imageURL:"",
        signIn:false,
        remember:false,
        modal:this.props.isModalOpen,   // modal for adding item is false initially
        msg:null
    };





    componentDidUpdate(prevProps){
        const {error,isAuthenticated}=this.props;
        if(error!==prevProps.error){
            if(error.id==="REGISTER_FAIL"){
                this.setState({msg:error.msg.msg});
            }
            else if(error.id==="LOGIN_FAIL"){
                this.setState({msg:error.msg.msg});
            }
            else{
                this.setState({msg:null});
            }
        }
        // if authenticated close Modal
        if(this.state.modal){
            
            if(isAuthenticated){
                this.toggle();
            }
        }
    }
    static propTypes={
        isAuthenticated:PropTypes.bool,
        error:PropTypes.object.isRequired,
        register:PropTypes.func.isRequired,
        clearErrors:PropTypes.func.isRequired
    }

    toggle=()=>{  
        // clear the error
        this.props.clearErrors();
        // to toggle the modal 

        this.setState({
            modal:!this.state.modal
        })
        // this.props.loginModalOpen(this.state.modal)
    }

    handleCheckboxChange=(e)=>{
        e.preventDefault();
        this.setState((prevState)=>{
            return {remember:!prevState.remember}
        })
        
    }

    handleSignIn=()=>{
        console.log("Sign in  Toggle Called",this.state.signIn);
        this.props.clearErrors();
        this.setState((prevState)=>{
            return {signIn:!prevState.signIn}
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
            // document.getElementById("imgTest").innerHTML = newImage.outerHTML;
            // alert("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
            // console.log("Converted Base64 version is " + this.state.imageURL);
           
          }
          fileReader.readAsDataURL(fileToLoad);
        }
        // return newImage.src;
      }


render(){
    return(
        <div>
            <NavLink onClick={this.toggle} href="#">
               <Button style={{paddingLeft:' 1.5rem',paddingRight:'1.5rem'}}><b> Register</b></Button>
            </NavLink>

            <Modal show={this.state.modal} onHide={this.toggle} >
            {this.state.signIn?           <>
            {/* <Modal.Header toggle={this.toggle}>Register</Modal.Header> */}
                <Modal.Header  style={{color:'white', backgroundImage: `url("${back}")`,backgroundSize:'32rem',backgroundRepeat:'no-repeat'}} closeButton ><b>Register</b></Modal.Header>
                <Modal.Body>
    {this.state.msg?<Alert color="danger">{this.state.msg}</Alert>:null}

    <Formik
    // validator={() => ({})}
      validationSchema={schemaRegister}
      initialValues={{
        name:'',
        email:'',
        password:'',

      }}
      onSubmit={(values)=>{ 
        this.encodeImageFileAsURL();
        const imageURL=this.state.imageURL;
        console.log("Image URL",imageURL);
        const {name,email,password}=values;
        let img=this.state.imageURL;
        const newUser={
            name,email,password,img
        }
        this.props.register(newUser);
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
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
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
              <Form.Label>Email ID</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Email ID"
                  aria-describedby="inputGroupPrepend"
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
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

          </Form.Row>
            <Form.Row>
            <Form.Group as={Col} md="12">
                <div className="mb-3">
                    <Form.File id="formcheck-api-regular">
                    <Form.File.Label>Profile Image</Form.File.Label>
                    <input id="inputFileToLoad"  type="file" onChange={this.encodeImageFileAsURL} />
                    </Form.File>
                </div>
            </Form.Group>

          </Form.Row>
          <Button type="submit">Register</Button>
          <input defaultChecked={this.state.remember} style={{marginLeft:'1rem',marginTop:'.5rem'}} type="checkbox" onChange={this.handleCheckboxChange}/><span>  Remember me!</span>
                            <div style={{}} className="forgot-password text-right">
                                Already registered <span onClick={this.handleSignIn} ><a href="#"><b>Sign in?</b></a></span>
                            </div>
                            <div id="imgTest"></div>
                        </Form>
                        
                    )}
                    </Formik>
                </Modal.Body>            </>:
                <>
                <Modal.Header  style={{color:'white', backgroundImage: `url("${back}")`,backgroundSize:'32rem',backgroundRepeat:'no-repeat'}} closeButton ><b>Login</b></Modal.Header>
                    <Modal.Body>
                      {this.state.msg?<Alert color="danger">{this.state.msg}</Alert>:null}
                       
                       
                 <Formik
                        validationSchema={schemaLogin}
                        initialValues={{
                            email:'',
                            password:'',

                        }}
                        onSubmit={(values)=>{ 
                            console.log("onSUbmit");
                        const {email,password}=values;
                        console.log("On Submit Called",email);
                        const user={
                            email,password
                        }
                        this.props.login(user);
                        }
                        }
                        >
                        {({
                            handleSubmit,
                            handleChange,
                            values,
                            errors,
                            touched
                            }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                            
                            
                            <Form.Row>
                            <Form.Group as={Col} md="12" controlId="validationFormik02">
                                <Form.Label>Email ID</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                    type="text"
                                    placeholder="Email ID"
                                    aria-describedby="inputGroupPrepend"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    isInvalid={!!errors.email}
                                    />
                                     <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                    {touched.email && errors.email}
                                    </Form.Control.Feedback>
                                   
                                </InputGroup>
                                </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                
                                <Form.Group as={Col} md="12" controlId="validationFormik03">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    isInvalid={!!errors.password}
                                />
                                 <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    {touched.password && errors.password}
                                </Form.Control.Feedback>
                                </Form.Group>

                            </Form.Row>
                            {/* <Form.Group>
                                <Form.Check
                                required
                                name="terms"
                                label="Agree to terms and conditions"
                                onChange={handleChange}
                                isInvalid={!!errors.terms}
                                feedback={errors.terms}
                                id="validationFormik0"
                                />
                            </Form.Group> */}
                            <Button type="submit">Login</Button>
                            <input defaultChecked={this.state.remember} style={{marginLeft:'1rem',marginTop:'.5rem'}} type="checkbox" onChange={this.handleCheckboxChange}/><span>  Remember me!</span>
                                                    <div style={{marginTop:'1rem',}} className="forgot-password text-right">
                                                    Don't have an account?  <span onClick={this.handleSignIn} ><a href="#"><b>Create an Account</b></a></span>
                                    </div> 
                            </Form>
                        )}
                        </Formik>
                </Modal.Body>
            </>
            
 }
            
            </Modal>
        </div>
    );
}
}
const mapStateToProps= state=>{
    return({
        isModalOpen:state.auth.isModalOpen,
        isAuthenticated:state.auth.isAuthenticated,
        rememberMe:state.auth.rememberMe,
        error:state.error
    })
}


export default connect(mapStateToProps,{loginModalOpen,login,register,clearErrors,TokenExpireExtend})(RegisterModal);