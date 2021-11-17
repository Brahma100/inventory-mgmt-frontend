import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';
import './RegisterPage.css'
import { Prompt, withRouter } from 'react-router-dom';

import { loadUser, register, login, TokenExpireExtend, loginModalOpen, isBlockedF } from '../../action/authActions';
import { getCategories } from '../../action/categoryAction';
import { getItems, deleteItem } from "../../action/itemAction";
import { clearErrors } from '../../action/errorActions';
import AppNavbar from '../AppNavbar/AppNavbar';
import back from '../../assets/images/back.jpg'
import Footer from '../Footer/Footer';

import banner from '../../assets/images/LoginSVG.png'


import { Button, InputGroup, Col, Alert, NavLink, Modal, Form, Container, Row, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import store from '../../store';
import Loading from '../LazyLoadingPage/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faInfo } from '@fortawesome/free-solid-svg-icons';


const schemaLogin = yup.object({
  email: yup.string().email('Invalid email').required(),
  password: yup.string().min(0, 'Password must be at least 6 characters').max(24, 'Password can be maximum 24 characters').required()
})

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


const schemaRegister = yup.object({
  fname: yup.string().min(1, 'At least 1 characters').max(10, 'First Name can be maximum 10 characters').required(),
  lname: yup.string().min(1, 'At least 1 characters').max(10, 'Last Name can be maximum 10 characters').required(),
  city: yup.string().min(3, 'City must be at least 3 characters').max(24, 'City can be maximum 20 characters'),
  state: yup.string().min(3, 'State must be at least 3 characters').max(24, 'State can be maximum 20 characters'),
  country: yup.string().min(3, 'Country must be at least 3 characters').max(24, 'Country can be maximum 20 characters'),
  postal: yup.number().integer(),
  email: yup.string().email('Invalid email').required(),
  password: yup.string().min(6, 'Password must be at least 6 characters').max(24, 'Password can be maximum 24 characters').required(),
  // mobile_number:yup.number().max(9999999999,'Invalid Number').required()//.matches(phoneRegExp,"Number is Not Like Mobile number"),   
})


class RegisterPage extends Component {

  notificationSystem = React.createRef();

  state = {
    imageURL: "",
    signIn: false,
    remember: false,
    modal: this.props.isModalOpen,   // modal for adding item is false initially
    msg: null,
    city: '',
    State: '',
    country: '',
    postal: '',
    ip: '',
    isBlocking: false,
    startRender: false
  };

  addNotification = msg => {
    const notification = this.notificationSystem.current;
    notification.addNotification({
      title: <div><FontAwesomeIcon icon={faExclamationTriangle} /> Server Error</div>,
      message: this.state.msg,
      level: 'error',
      position: 'tc',
      autoDismiss: 5
    });
  };

  async componentDidMount() {
    if (this.props.history.location.state !== 'button') {
      let authenticate = window.confirm("You Need To Login To Get Full Access of ShopperZ")
      if (!authenticate) {
        this.props.history.push('/')
      }
    }
    let response = await fetch(`https://geolocation-db.com/json/`)
    let ipData = await response.json();

    this.setState({ ip: ipData.IPv4, city: ipData.city, country: ipData.country_name, postal: ipData.postal, State: ipData.state })
    // console.log("City:",this.state.city);  
  }


  componentWillMount() {
    store.dispatch(loadUser());
    console.log("Action Login Page:", this.props.history);
    if (this.props.history.action === 'POP') {
      setTimeout(() => {
        console.log("timeout");
        if (this.props.isAuthenticated) {
          this.props.history.push('/')
          // this.props.loginModalOpen(true);
        }
      }, 50)
    }
    else
      if (this.props.isAuthenticated) {
        console.log("Direct");
        this.props.history.push('/')
        // this.props.loginModalOpen(true);
      }
    setTimeout(() => {
      this.setState({ startRender: true })
    }, 60)
  }
  componentDidUpdate(prevProps) {

    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
        this.setState({ isBlocking: true });
        this.addNotification(this.state.msg);
      }
      else if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
        this.setState({ isBlocking: true });
        setTimeout(() => {

          this.addNotification(this.state.msg ? this.state.msg : "Something Went Wrong");
        }, 60);
        // console.log("Error R:",error.msg.msg,this.state.msg);
      }
      else {
        this.setState({ msg: null });

      }
    }


    store.dispatch(loadUser());
    if (this.props.isAuthenticated) {

      console.log("update Component");
      this.props.history.push('/')
      // this.props.loginModalOpen(true);
    }
  }

  handleSignIn = () => {
    console.log("Sign In Toggle Called", this.state.signIn);
    this.setState((prevState) => {
      return { signIn: !prevState.signIn }
    })
  }
  encodeImageFileAsURL = () => {
    console.log("image uploading func. called");
    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];

      var fileReader = new FileReader();

      fileReader.onload = (fileLoadedEvent) => {
        var srcData = fileLoadedEvent.target.result; // <--- data: base64

        var newImage = document.createElement('img');
        newImage.src = srcData;
        this.setState({ imageURL: newImage.src });


      }
      fileReader.readAsDataURL(fileToLoad);
    }
    // return newImage.src;
  }

  render() {
    return (

      <>
        <NotificationSystem ref={this.notificationSystem} />
        {!this.state.startRender ? <Loading /> :
          <div>
            <div className="App" style={{ alignItems: 'center', backgroundImage: `url("${back}")`,backgroundSize:'100%', backgroundRepeat: 'no-repeat' }} >
              <AppNavbar />

              <Container>
                <div className="content" >
                  <Container fluid>
                    <Prompt
                      when={this.state.isBlocking}
                      message={(location) => `Are You Sure Want To Go To ${location.pathname}`}
                    />
                    <Row>

                      <Col md={6} >
                        <Card style={{ marginTop: '5rem' }} >
                          {this.state.signIn ?
                            <>
                              <Card.Header >

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                  <h7 style={{ fontSize: '22px' }}><b>Create a New Account</b></h7>
                                  <span style={{ fontSize: '14px', color: 'rgba(59,62,102,.5)' }}>Start benefiting from our tools right away</span>
                                </div>
                                {/* {this.state.msg?<Alert color="danger">{this.state.msg}</Alert>:null}    */}
                              </Card.Header>
                              <Card.Body>
                                <Formik
                                  // validator={() => ({})}
                                  validationSchema={schemaRegister}
                                  initialValues={{
                                    fname: '',
                                    lname: '',
                                    email: '',
                                    password: '',
                                    city: this.state.city,
                                    state: this.state.State,
                                    postal: this.state.postal,
                                    country: this.state.country,
                                    // mobile_number:''

                                  }}
                                  onSubmit={(values) => {

                                    this.encodeImageFileAsURL();
                                    const imageURL = this.state.imageURL;
                                    console.log("Image URL", imageURL);
                                    const { fname, lname, email, password, city, state, postal, country } = values;
                                    let img = this.state.imageURL;
                                    let ip = this.state.ip;
                                    const newUser = {
                                      fname, lname, email, password, img,city: city || this.state.city , state: state || this.state.State, postal:postal||this.state.postal, country:country||this.state.country, ip
                                    }
                                    console.log(newUser);
                                    this.setState({ isBlocking: false });
                                    // console.log("Update:",this.state.isBlocking);
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
                                        <Form.Group as={Col} md="6" controlId="validationFormik01">

                                          <Form.Label>First Name</Form.Label>

                                          <Form.Control
                                            type="text"
                                            placeholder="First Name"
                                            name="fname"
                                            value={values.fname}
                                            // onChangeCapture={(e)=>this.setState({isBlocking:e.target.value>0})}
                                            onChange={e => { this.setState({ isBlocking: e.target.value.length > 0 }); handleChange(e) }}
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
                                            placeholder="Last Name"
                                            name="lname"
                                            value={values.lname}
                                            onChange={e => { this.setState({ isBlocking: e.target.value.length > 0 }); handleChange(e) }}
                                            isInvalid={!!errors.lname}
                                          />
                                          <Form.Control.Feedback type="invalid">
                                            {errors.lname}
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
                                              onChange={e => { this.setState({ isBlocking: e.target.value.length > 0 }); handleChange(e) }}
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
                                            onChange={e => { this.setState({ isBlocking: e.target.value.length > 0 }); handleChange(e) }}
                                            isInvalid={!!errors.password}
                                          />
                                          <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                          </Form.Control.Feedback>
                                        </Form.Group>

                                      </Form.Row>

                                      <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationFormik03">
                                          <Form.Label>City</Form.Label>
                                          <Form.Control
                                            type="text"
                                            placeholder="City"
                                            name="city"
                                            value={values.city ? values.city : this.state.city}
                                            onChange={e => { this.setState({ isBlocking: e.target.value.length > 0 }); handleChange(e) }}
                                            isInvalid={!!errors.city}
                                          />
                                          <Form.Control.Feedback type="invalid">
                                            {errors.city}
                                          </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationFormik03">
                                          <Form.Label>State</Form.Label>
                                          <Form.Control
                                            disabled
                                            type="text"
                                            placeholder="State"
                                            name="state"
                                            value={values.state ? values.state : this.state.State}
                                            onChange={e => { this.setState({ isBlocking: e.target.value.length > 0 }); handleChange(e) }}
                                            isInvalid={!!errors.state}
                                          />
                                          <Form.Control.Feedback type="invalid">
                                            {errors.state}
                                          </Form.Control.Feedback>
                                        </Form.Group>
                                      </Form.Row>
                                      <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationFormik03">
                                          <Form.Label>Postal</Form.Label>
                                          <Form.Control

                                            type="number"
                                            placeholder="Postal"
                                            name="postal"
                                            value={values.postal ? values.postal : this.state.postal}
                                            onChange={e => { this.setState({ isBlocking: e.target.value.length > 0 }); handleChange(e) }}
                                            isInvalid={!!errors.postal}
                                          />
                                          <Form.Control.Feedback type="invalid">
                                            {errors.postal}
                                          </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationFormik03">
                                          <Form.Label>Country</Form.Label>
                                          <Form.Control
                                            disabled
                                            type="text"
                                            placeholder="Country"
                                            name="country"
                                            value={values.country ? values.country : this.state.country}
                                            onChange={e => { this.setState({ isBlocking: e.target.value.length > 0 }); handleChange(e) }}
                                            isInvalid={!!errors.country}
                                          />
                                          <Form.Control.Feedback type="invalid">
                                            {errors.country}
                                          </Form.Control.Feedback>
                                        </Form.Group>
                                        {/* <Form.Group as={Col} md="12" controlId="validationFormik03">
              <Form.Label>Phone/Mobile Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Mobile Number"
                name="mobile"
                value={values.mobile_number}
                onChange={handleChange}
                isInvalid={!!errors.mobile_number}
              />
              <Form.Control.Feedback type="invalid">
                {errors.mobile_number}
              </Form.Control.Feedback>
            </Form.Group> */}

                                      </Form.Row>
                                      <Form.Row>
                                        <Form.Group as={Col} md="12">
                                          <div className="mb-3">
                                            <Form.File id="formcheck-api-regular">
                                              <Form.File.Label>Profile Image </Form.File.Label>
                                              <input id="inputFileToLoad" type="file" onChange={this.encodeImageFileAsURL} />
                                            </Form.File>
                                          </div>
                                        </Form.Group>

                                      </Form.Row>

                                      {/* <Form.Row>
          <Map
                google={this.props.google}
                center={{lat: 18.5204, lng: 73.8567}}
                height='300px'
                zoom={15}
    />
          </Form.Row>
          <Form.Row>
         
          </Form.Row>
          <Form.Row>
         
          </Form.Row>
          <Form.Row style={{marginBottom:'10rem'}}>
         <p>Hello</p>
          </Form.Row> */}
                                      <Button type="submit">Register</Button>

                                      <input defaultChecked={this.state.remember} style={{ marginLeft: '1rem', marginTop: '.5rem' }} type="checkbox" onChange={this.handleCheckboxChange} /><span>  Remember me!</span>
                                      <div style={{}} className="forgot-password text-right">
                                        Already registered <span onClick={this.handleSignIn} ><a ><b>Sign in?</b></a></span>
                                      </div>
                                      <div id="imgTest"></div>
                                    </Form>

                                  )}
                                </Formik>
                              </Card.Body></> :
                            <>
                              <Card.Header>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                  <h7 style={{ fontSize: '22px' }}><b>Login Now</b></h7>
                                  <span style={{ fontSize: '14px', color: 'rgba(59,62,102,.5)' }}>Login To Continue The Contribution with Our Advanced Tools!!</span>
                                </div>
                              </Card.Header>
                              <Card.Body>
                                <Formik
                                  validationSchema={schemaLogin}
                                  initialValues={{
                                    email: '',
                                    password: '',

                                  }}
                                  onSubmit={(values) => {
                                    this.setState({ isBlocking: false });
                                    console.log("Update:", this.state.isBlocking);
                                    const { email, password } = values;

                                    const user = {
                                      email, password
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
                                              onChange={e => { this.setState({ isBlocking: e.target.value.length > 0 }); handleChange(e) }}
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
                                            onChange={e => { this.setState({ isBlocking: e.target.value.length > 0 }); handleChange(e) }}
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
                                onChange={e=>{this.setState({isBlocking:e.target.value.length>0}); handleChange(e)}}
                                isInvalid={!!errors.terms}
                                feedback={errors.terms}
                                id="validationFormik0"
                                />
                            </Form.Group> */}
                                      <Button type="submit">Login</Button>
                                      <input defaultChecked={this.state.remember} style={{ marginLeft: '1rem', marginTop: '.5rem' }} type="checkbox" onChange={this.handleCheckboxChange} /><span>  Remember me!</span>
                                      <div style={{ marginTop: '1rem', }} className="forgot-password text-right">
                                        Don't have an account?  <span onClick={this.handleSignIn} ><a><b>Create an Account</b></a></span>
                                      </div>
                                    </Form>
                                  )}
                                </Formik>
                              </Card.Body>
                            </>}




                        </Card>
                      </Col>

                      <Col md={6}>
                        <Card style={{ marginTop: '5rem' }} className='banner-card '>
                          <div className='banner'>
                            <img alt="alt" src={banner} />
                          </div>
                        </Card>
                      </Col>

                    </Row>


                  </Container>


                </div>

              </Container>



            </div>

            <div >
              <Footer />
            </div>
          </div>}
      </>
    );
  }

};
const mapStateToProps = state => {
  return ({
    categories: state.category.categories,
    isAuthenticated: state.auth.isAuthenticated,
    isBlocked: state.auth.isBlocked,
    isLoading: state.auth.isLoading,
    user: state.auth.user,
    products: state.item.items,
    itemsLoading: state.item.itemsLoading,
    itemsLoaded: state.item.itemsLoaded,
    error: state.error
  })
}


export default connect(mapStateToProps, { loadUser, loginModalOpen, getItems, deleteItem, getCategories, login, register, clearErrors })(withRouter(RegisterPage));
