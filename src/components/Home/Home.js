import React, { Component } from "react";
import { Container, Row, Col} from "react-bootstrap";
import './Home.css'
import {Card} from 'react-bootstrap';   
import NotificationSystem from 'react-notification-system';
import banner from '../../assets/images/Banner.png'
import back from '../../assets/images/back.jpg'
import AppNavbar from "../AppNavbar/AppNavbar";
import Home1 from './Home1'
import {Prompt, NavLink, withRouter} from 'react-router-dom';
import { loginModalOpen,loadUser } from '../../action/authActions';
import { connect } from 'react-redux';
import ApexChart from './ApexChart';
import Footer from "../Footer/Footer";


class Home extends Component {

notificationSystem = React.createRef();
addNotification = event => {
  // event.preventDefault();
  const notification = this.notificationSystem.current;
  notification.addNotification({
    message: 'Welcome To ShopperZ Inventory Management System',
    level: 'success',
    autoDismiss:5
  });
};


componentDidMount(e){
  this.addNotification();
  console.log("History:",this.props.history);
    if(this.props.isBlocked){
          let authenticate = window.confirm("Are You Sure Want To Go ",this.props.history.pathname)
          if(!authenticate){
                  this.props.history.push(this.props.history.pathname)
          }
    }

  var myobj = document.getElementById("bodyClick");
  if(myobj!==null){
  document.documentElement.classList.toggle("nav-open");
  myobj.remove();

}

this.props.loadUser();
 if(this.props.isAuthenticated){
  //  <Redirect from='/' to='/admin/dashboard' />
  // this.props.history.push('/admin/dashboard')
  // this.props.loginModalOpen(false);
  // ,backgroundPosition: 'center',backgroundSize: '150rem',
 }
}
  render() {
    return (
      <div>
         <NotificationSystem ref={this.notificationSystem} />
        <div className="App" style={{ backgroundImage: `url("${back}")`,backgroundSize:'100%',backgroundRepeat:'no-repeat'}} >
            <AppNavbar/>
            <Prompt
                when={this.props.isBlocked}
                message={(location)=> `Are You Sure Want To Leave ${location.pathname}`}
/>
            <Container>
          <div className="content" >
            <Container fluid>
              <Row>
              
                <Col md={6} >
                    <Card className="intro_card">
                        <div className="text-black mt-3 card-content">
                            <h1 className=" mb-3 font-weight-bold">Product Inventory Management Application</h1>
                            <p>Keep calm and let statistics help you with your stocktaking process!</p><p className="font-size-lg text-black-50">Use this individual application for a head start in building a product that is related to the commerce niche. This template comes with pre-built pages for orders, customers and various sales releated analytics.</p>
                            <div className="divider border-2 border-dark my-4 border-light opacity-2 rounded-circle w-25"></div>
                                <div>
                                    <NavLink style={{color:'white'}} to={this.props.isAuthenticated?'/admin/dashboard':'/login'} className="d-block d-sm-inline-block btn btn-primary btn-lg" >
                                    <span className="btn-wrapper--icon">
                                    </span><span className="btn-wrapper--label" >Dashboard</span></NavLink>
                                    <NavLink className="d-block d-sm-inline-block ml-0 mt-3 mt-sm-0 ml-sm-3 btn btn-outline-primary btn-lg" to={this.props.isAuthenticated?"/admin/products":"/login"}><span>Products Filters</span></NavLink>
                                </div>
                            </div>
                    </Card>
                </Col>
                
                <Col md={6}>
                  <Card className='banner-card'>
                      <div className='banner'>
                          <img alt="alt" src={banner}/>
                      </div>
                  </Card>
                </Col>
              
              </Row>
              
            
            </Container>
           
            
      </div>
      <ApexChart/>
      </Container>
      
      
      <Home1/>
      </div>
      <Footer/>
       
      </div>
    );
  }
}
const mapStateToProps=state=>{
  return({
    isBlocked:state.auth.isBlocked,
    isAuthenticated:state.auth.isAuthenticated
  })
}

export default connect(mapStateToProps,{loginModalOpen,loadUser})(withRouter(Home));
