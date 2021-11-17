import React, { Component } from 'react';

import {connect} from 'react-redux';
import './About.css'
import { NavLink, withRouter} from 'react-router-dom';

import {getCategories} from '../../action/categoryAction';
import { getItems,deleteItem } from "../../action/itemAction";
import {loginModalOpen,loadUser} from '../../action/authActions'
import AppNavbar from '../AppNavbar/AppNavbar';
import back from '../../assets/images/back.jpg'
import Footer from '../Footer/Footer';
import { Container,Row,Col,Card } from 'react-bootstrap';
import banner from '../../assets/images/aboutus.png' 
import journey from '../../assets/images/journey.png' 




class About extends Component {  
    render(){
        return (
            <>
<div className="App" style={{ backgroundImage: `url("${back}")`,backgroundSize:'100%',backgroundRepeat:'no-repeat'}} >
            <AppNavbar/>
           
            <Container>
          <div className="content" >
            <Container fluid>
              <Row>
              
                <Col md={5} >
                    <Card className="intro_card">
                        <div className="text-black mt-3 card-content">
                            <h1 className=" mb-3 font-weight-bold">About Us</h1>
                            <p className="font-size-lg text-black-70"><b>ShopperZ</b> is one of the leading Inventry Management Solution companies known for its state-of-the-art Inventry Management solutions which includes features like Product Page, admin Panel where admin can add and delete the products as well as users, This Project is designed in India and can Provide inventory solutions to the ecommerce businesses.</p>
                            <div className="divider border-2 border-dark my-4 border-light opacity-2 rounded-circle w-25"></div>
                                <div>
                                    <NavLink style={{color:'white',background:'#3b44c1'}} to='/about' className="d-block d-sm-inline-block btn btn-primary btn-lg" >
                                    <span className="btn-wrapper--icon">
                                    </span><span className="btn-wrapper--label" >Read More</span></NavLink>
                                    
                                </div>
                            </div>
                    </Card>
                </Col>
                
                <Col md={7}>
                  <Card style={{marginTop:'5rem'}} className='banner-card'>
                      <div className='banner'>
                          <img  alt="alt" src={banner}/>
                      </div>
                  </Card>
                </Col>
              
              </Row>
              
            
            </Container>
           
            
      </div>
  
      </Container>
            <Container style={{marginTop:'5rem',marginBottom:'5rem'}}>
          <div className="content" >
            <Container fluid>
              <Row>
              
              
                
                <Col md={6}>
                  <Card style={{marginTop:'5rem'}} className='banner-card'>
                      <div className='banner'>
                          <img  alt="alt" src={journey}/>
                      </div>
                  </Card>
                </Col>
                <Col md={5} >
                    <Card className="intro_card">
                        <div className="text-black mt-3 card-content">
                            <h1 className=" mb-3 font-weight-bold">Our Journey</h1>
                            <p >We began our journey as a startup in 2021, and it has taken us a lot more than resources and hard work to put ourselves on the map. During this period we learnt a lot about development and marketting.</p>
                            <div className="divider border-2 border-dark my-4 border-light opacity-2 rounded-circle w-25"></div>
                                <div>
                                    
                                    
                                </div>
                            </div>
                    </Card>
                </Col>
              
              </Row>
              
            
            </Container>
           
            
      </div>
  
      </Container>
      
      
      </div>

    <div>
    
 

<div className="about">
<h1 style={{fontWeight:'bold',color:'black'}}>Our Location</h1>
</div>

<div className="ourteam">
<p>7/A, Brahma Jaiswal Road, Navy Apartment (Second Floor)
Sector-8, Chennai - 600101</p>

</div>
<div className="location">

<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497511.1146356065!2d79.92880799953032!3d13.04804380118091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1582835093586!5m2!1sen!2sin" width="100%" height="500px" frameBorder="0"  allowFullScreen></iframe>

<div className="location_tag">
    <div>Location</div>
</div>
</div>
  
<Footer/>
     
 </div>  
            </>
          );
    }
  
};
const mapStateToProps= state=>{
    return({
      categories:state.category.categories,
        isAuthenticated:state.auth.isAuthenticated,
        isBlocked:state.auth.isBlocked,
        isLoading:state.auth.isLoading,
        user:state.auth.user,
        products:state.item.items,
        itemsLoading:state.item.itemsLoading,
        itemsLoaded:state.item.itemsLoaded
       
    })
}


export default connect(mapStateToProps,{loadUser,loginModalOpen,getItems,deleteItem,getCategories})(withRouter(About));
