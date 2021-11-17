import React, {Component, Fragment} from 'react';
import {NavLink} from 'react-router-dom'
import {Navbar, Nav,Container,Dropdown, Button} from 'react-bootstrap';
import Logout from '../auth/Logout';
import RegisterModal from '../auth/RegisterModal1';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import avatar from '../../assets/images/avatar.png'
import logo from '../../assets/images/logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCog, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import './AppNavBar.css'
import store from '../../store';
import { loadUser } from '../../action/authActions';

class AppNavbar extends Component{
    componentDidMount(){
        store.dispatch(loadUser());
    }
    state={
        
        dropdownOpen:false,
        isOpen:false
    }
    static propTypes={
        auth:PropTypes.object.isRequired
    }
    toggle=()=>{
        this.setState({
            isOpen:!this.state.isOpen
        });
    }
    toggled=()=>{
        this.setState({
            dropdownOpen:!this.state.dropdownOpen
        });
    }
    render(){
        const {isAuthenticated, user}=this.props.auth;
       
        console.log("from Nav:",user?user:'Hello');
        const authLinks=(
            <Fragment >
                {/* <Nav.Item>About</Nav.Item> */}
                <Nav.Item>
                    
                <Dropdown className="user-dropdown" style={{padding:'0rem !important'}} isOpen={this.state.dropdownOpen} toggle={this.toggled}>
                    
                    <Dropdown.Toggle id="dropdown-basic" caret>
                        {user? <div className="user-avatar">
                        <img alt="alt" className="avatar" style={{width:'2rem',borderRadius:'50%'}} src={user.img?user.img:avatar} />
                        <div class="status-overlay">
                            <i class="bowtie-icon bowtie-status-success success"></i>
                        </div>
                        </div>:'X'}
                    <div>
                        <span style={{color:'red',fontWeight:400,fontSize:'80%'}}>Shop Admin</span>
                        <div style={{color:'#3b3e66'}}>{user? user.fname+" "+user.lname:'Hello Gest'}</div>
                    </div>
                   
                    
                    </Dropdown.Toggle>
                    <Dropdown.Menu bottom>
                            <Dropdown.Item header>
                            {user? <div className="user-avatar">
                    <img alt="alt" className="avatar" style={{width:'2rem',borderRadius:'50%'}} src={user.img?user.img:avatar} />
                    {/* <div class="status-overlay">
                        <i class="bowtie-icon bowtie-status-success success"></i>
                    </div> */}
                    </div>:'X'}
                    <div>
                        <span style={{color:'red',fontWeight:400,fontSize:'80%'}}>Shop Admin</span>
                        <div style={{color:'#3b3e66'}}>{user? user.email:'Hello Guest'}</div>
                    </div>
                            </Dropdown.Item><hr/>
                             <Dropdown.Item className="dropdown-list-nav"> <Nav.Item  >
                            <div className="dropdown-list-item">
                            <FontAwesomeIcon style={{marginRight:'.5rem'}} icon={faCog}/><h7>Settings</h7>    
                            </div>    
                    </Nav.Item></Dropdown.Item>
                             <Dropdown.Item className="dropdown-list-nav" > <Nav.Item >
                               <NavLink to="/admin/user">
                            <div className="dropdown-list-item">
                            <FontAwesomeIcon style={{marginRight:'.5rem'}} icon={faUserEdit}/><h7>Profile</h7>    
                            </div>    
                            </NavLink> 
                    </Nav.Item></Dropdown.Item>
                    <Dropdown.Item> <Nav.Item ><Logout/></Nav.Item></Dropdown.Item>
                   
                    </Dropdown.Menu>
                   
                </Dropdown>
   
                </Nav.Item>    
            </Fragment>
        );
        const guestLinks=(
            <Fragment>
                <Nav.Item>
                   
                <NavLink to={{pathname:'/login',state:'button'}}
                 >
               <Button style={{paddingLeft:' 1.5rem',paddingRight:'1.5rem'}}><b> Register</b></Button>
            </NavLink>

                   
                </Nav.Item>
                <Nav.Item>
                        <NavLink onClick={this.toggle} to='/about'>
                    <       Button style={{background:'#7a7b97',paddingLeft:' 1.5rem',paddingRight:'1.5rem'}}><b> About</b></Button>
                        </NavLink>
                </Nav.Item>
                {/* <Nav.Item>
                    <LoginModal/>
                </Nav.Item> */}
            </Fragment>
        );
        return(
            <>
            <div  style={{color:'#000',textDecoration:'none'}}>
            <Navbar expand="sm"> 
                <Container>
                    <Navbar.Brand ><NavLink to='/'><div className="nav-brand"><img alt="alt" className="nav-logo" src={logo}/><div className="brand-text"><span><b>inventory</b></span><b>ShopperZ</b></div></div></NavLink></Navbar.Brand>
                    <Navbar.Toggle onClick={this.toggle}/>
                    <Navbar.Collapse className="mainNavCollapse" isOpen={this.state.isOpen} navbar>
                        <NavLink className="ml-auto"  to='/'><b>Home</b></NavLink>
                        {/* <NavLink  href='/admin/dashboard'><b>Dashboard</b></NavLink> */}
                        <NavLink className="ml-3 mr-3" to='/productsGrid'><b>Products</b></NavLink>
                        <Nav  navbar>
                        {isAuthenticated?authLinks:guestLinks}    
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
       </>
        );
    }
}

const mapStateToProps=state=>({
    auth:state.auth
})
export default connect(mapStateToProps,null)(AppNavbar);