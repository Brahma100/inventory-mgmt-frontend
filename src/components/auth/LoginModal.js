import React,{Component} from 'react';
import {Col, Alert,NavLink, Button, Modal,Form,FormGroup,Label, Input, InputGroup} from 'react-bootstrap';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../action/authActions';
import {clearErrors}  from '../../action/errorActions';
import {Formik} from 'formik';
import * as yup from 'yup';
import back from '../../assets/images/back.jpg';

// import e from 'express';
const schema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
})

class LoginModal extends Component{
    state={
        modal:false,   // modal for adding item is false initially
        msg:null
    };
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
render(){
    return(
        <div>
            <NavLink onClick={this.toggle} href="#">
                Login
            </NavLink>

            <Modal show={this.state.modal} onHide={this.toggle} >
                <Modal.Header  style={{color:'white', backgroundImage: `url("${back}")`,backgroundSize:'32rem',backgroundRepeat:'no-repeat'}} closeButton ><b>Login</b></Modal.Header>
                <Modal.Body>
    {this.state.msg?<Alert color="danger">{this.state.msg}</Alert>:null}





    <Formik
      validationSchema={schema}
     

      initialValues={{
        email:'',
        password:'',

      }}
      onSubmit={(values)=>{ console.log("onSUbmit");
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
         }) => (
        <Form noValidate onSubmit={handleSubmit}>
          
          
          <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationFormikemail">
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
            <Form.Group as={Col} md="12" controlId="validationFormikPassword">
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
        isAuthenticated:state.auth.isAuthenticated,
        error:state.error
    })
}


export default connect(mapStateToProps,{login,clearErrors})(LoginModal);