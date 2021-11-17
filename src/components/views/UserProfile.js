import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,InputGroup,Card, Spinner
} from "react-bootstrap";
import {update,loadUser} from '../../action/authActions'
import {Formik} from 'formik';
import * as yup from 'yup';
import { UserCard } from "../../components/UserCard/UserCard.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import { connect } from "react-redux";
import avatar from '../../assets/images/avatar.png' 
import { Prompt } from "react-router-dom";

const schemaRegister = yup.object({
  fname:yup.string().min(1, 'At least 1 characters').max(10, 'First Name can be maximum 10 characters').required(),   
  lname:yup.string().min(1, 'At least 1 characters').max(10, 'Last Name can be maximum 10 characters').required(),   
  city:yup.string().min(3, 'City must be at least 3 characters').max(24, 'City can be maximum 20 characters'),   
  state:yup.string().min(3, 'State must be at least 3 characters').max(24, 'State can be maximum 20 characters'),   
  country:yup.string().min(3, 'Country must be at least 3 characters').max(24, 'Country can be maximum 20 characters'),   
  postal:yup.number().integer(),   
  email: yup.string().email('Invalid email').required(),
  // password: yup.string().min(6, 'Password must be at least 6 characters').max(24, 'Password can be maximum 24 characters').required(),
  // mobile_number:yup.number().max(9999999999,'Invalid Number').required()//.matches(phoneRegExp,"Number is Not Like Mobile number"),   
})

class UserProfile extends Component {
  // constructor
  state={
    imageURL:"",  
    msg:null,
    isBlocking:false
};

componentDidMount(){
  // window.addEventListener('popstate', (event) => {
  //   alert("You message");
  // });

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
  render() {
    var isLoaded=this.props.isLoaded;
    var id=this.props.user?this.props.user._id:null;
    var email=this.props.user?this.props.user.email:"XYZ@gmail.com";
    var fname=this.props.user?this.props.user.fname:"Guest";
    var lname=this.props.user?this.props.user.lname:"Surname";
    var city=this.props.user?this.props.user.city:"Not Given";
    var state=this.props.user?this.props.user.state:"Not Given";
    var postal=this.props.user?this.props.user.postal:"Not Given";
    var country=this.props.user?this.props.user.country:"Not Given";
    var img=this.props.user?this.props.user.img:avatar;
    var date=this.props.user?this.props.user.date:"X:X:X:X";
    var ip=this.props.user?this.props.user.ip:"X:X:X:X";
    // console.log("user from UserProfile::",this.props.user.email);
    return (
      <div className="content">
        <Container fluid>
          <Prompt
                when={this.state.isBlocking}
                message={(location)=> `Are You Sure Want To Go To ${location.pathname}`}
/> 
          <Row>
            <Col md={8}>
<Card style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
  <Card.Header>
    <p style={{fontSize:'1.5rem',fontWeight:'bold',color:'#3b44c1'}}>Edit User</p>
  </Card.Header>
  {isLoaded?
  <Formik
    
      validationSchema={schemaRegister}
      initialValues={{
        fname:fname,
        lname:lname,
        email:email,
        password:'',
        city:city,
        state:state,
        postal:postal,
        country:country,
        ip:ip,
        date:date
        // mobile_number:''

      }}
      onSubmit={(values)=>{ 
        this.encodeImageFileAsURL();
        const img=this.state.imageURL;
        // console.log("Image URL",imageURL);
        const {fname,lname,email,password,city,state,postal,country,ip}=values;
        const updatedUser={
            id,fname,lname,email,password,img,city,state,postal,country,ip
        }
        this.props.update(updatedUser);
        setTimeout(() => {
          this.props.loadUser();
          
        }, 1500);
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
            <Form.Group as={Col} md="4" controlId="validationFormik01" style={{width:'92%',paddingLeft:'2rem'}}>
           
              <Form.Label>Company</Form.Label>
              
              <Form.Control
              disabled
                type="text"
                placeholder="Comnpany"
                name="company"
                value="ShopperZ Inc."
              
              />
             
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik01" style={{width:'92%',paddingLeft:'2rem'}}>
              <Form.Label>IP Address</Form.Label>
              <Form.Control
              disabled
                type="text"
                placeholder="Last Name"
                name="ip"
                value={values.ip}
              />
              
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik02" style={{width:'92%',paddingLeft:'2rem'}}>
              <Form.Label>Registered On</Form.Label>
              
                <Form.Control
                disabled
                  type="text"
                  placeholder="Email ID"
                 
                  name="date"
                  value={values.date?values.date:'Unable To Fetch'}
                  
                />
               
              
            </Form.Group>

          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="validationFormik01" style={{width:'92%',paddingLeft:'2rem'}}>
           
              <Form.Label>First Name</Form.Label>
              
              <Form.Control
                type="text"
                placeholder="First Name"
                name="fname"
                value={values.fname}
                // onChangeCapture={(e)=>this.setState({isBlocking:e.target.value>0})}
                onChange={e=>{this.setState({isBlocking:e.target.value.length>0}); handleChange(e)}}
                isInvalid={!!errors.fname}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fname}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik01" style={{width:'92%',paddingLeft:'2rem'}}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lname"
                value={values.lname}
                onChange={e=>{this.setState({isBlocking:e.target.value.length>0});handleChange(e)}}
                isInvalid={!!errors.lname}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lname}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik02" style={{width:'92%',paddingLeft:'2rem'}}>
              <Form.Label>Email ID</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                disabled
                  type="text"
                  placeholder="Email ID"
                  aria-describedby="inputGroupPrepend"
                  name="email"
                  value={values.email}
                  onChange={e=>{this.setState({isBlocking:e.target.value.length>0}); handleChange(e)}}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

          </Form.Row>
          <Form.Row>
         
            </Form.Row>
  
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationFormik03" style={{width:'92%',paddingLeft:'2rem'}}>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                name="city"
                value={values.city?values.city:this.state.city}
                onChange={e=>{this.setState({isBlocking:e.target.value.length>0}); handleChange(e)}}
                isInvalid={!!errors.city}
              />
              <Form.Control.Feedback type="invalid">
                {errors.city}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationFormik03" style={{width:'92%',paddingLeft:'2rem'}}>
              <Form.Label>State</Form.Label>
              <Form.Control
               disabled
                type="text"
                placeholder="State"
                name="state"
                value={values.state?values.state:this.state.State}
                onChange={e=>{this.setState({isBlocking:e.target.value.length>0}); handleChange(e)}}
                isInvalid={!!errors.state}
              />
              <Form.Control.Feedback type="invalid">
                {errors.state}
              </Form.Control.Feedback>
            </Form.Group>
            </Form.Row>
            <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationFormik03" style={{width:'92%',paddingLeft:'2rem'}}>
              <Form.Label>Postal</Form.Label>
              <Form.Control
             
                type="number"
                placeholder="Postal"
                name="postal"
                value={values.postal?values.postal:this.state.postal}
                onChange={e=>{this.setState({isBlocking:e.target.value.length>0}); handleChange(e)}}
                isInvalid={!!errors.postal}
              />
              <Form.Control.Feedback type="invalid">
                {errors.postal}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationFormik03" style={{width:'92%',paddingLeft:'2rem'}}>
              <Form.Label>Country</Form.Label>
              <Form.Control
               disabled
                type="text"
                placeholder="Country"
                name="country"
                value={values.country?values.country:this.state.country}
                onChange={e=>{this.setState({isBlocking:e.target.value.length>0}); handleChange(e)}}
                isInvalid={!!errors.country}
              />
              <Form.Control.Feedback type="invalid">
                {errors.country}
              </Form.Control.Feedback>
            </Form.Group>
            
          </Form.Row>
            <Form.Row>
            <Form.Group as={Col} md="12" style={{width:'92%',paddingLeft:'2rem'}}>
                <div className="mb-3">
                    <Form.File id="formcheck-api-regular">
                    <Form.File.Label >Profile Image </Form.File.Label>
                    <input id="inputFileToLoad"  style={{marginLeft:'1rem'}} type="file" onChange={this.encodeImageFileAsURL} />
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
          </Form.Row> */}
          {/* <Form.Row>
         
          </Form.Row> */}
          {/* <Form.Row>
         
          </Form.Row> */}
          <Form.Row  style={{margin:'0 1rem 1rem 1rem',width:'92%',paddingLeft:'2rem'}}>
          <Button type="submit">Update Your Account</Button>
         
          </Form.Row>


                        </Form>
                        
                    )}
                    </Formik>:<Spinner style={{width:'5rem',height:'5rem'}} animation="border" variant="primary" />}

</Card>

                        </Col>




            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={img?img:avatar}
                name={fname+" "+lname}
                userName={email}
                city={city}
                country={country}
                postal={postal}
                state={state}
                description={
                  <span>
                    City:{city}
                    <br />
                    State:{state}
                    <br />
                    Zip Code:{postal}
                  </span>
                }
                socials={
                  <div style={{display:'flex',justifyContent:'space-around',margin:'2rem'}}>
                    <Button simple>
                      <i className="fa fa-facebook-square" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-twitter" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-youtube-square" />
                    </Button>
                  </div>
                }
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return {
    user:state.auth.user,
    isLoaded:state.auth.isLoaded,
    isLoading:state.auth.isLoading,
  }
}

export default connect(mapStateToProps,{update,loadUser})(UserProfile);
