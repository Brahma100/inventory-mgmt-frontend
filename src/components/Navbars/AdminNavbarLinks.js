
import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe} from '@fortawesome/free-solid-svg-icons';
import './AdminNavbarLinks.css'
import {NavLink} from 'react-router-dom';

class AdminNavbarLinks extends Component {
  render() {
    const notification = (
      <div>
        <FontAwesomeIcon icon={faGlobe} className="font-size-lg icon1 " />
        <b className="caret" />
      </div>
    );
    return (
      <>

          <div style={{margin:'5px 15px'}}>
               <li > <NavLink className="nav-link" to="/" >Home</NavLink></li>
               <li ><NavLink className="nav-link" to="/productsGrid">Products</NavLink></li>
             
               <hr style={{borderColor:'white',width:'14.3rem'}}/>  </div>

             

      </>
    );
  }
}

export default AdminNavbarLinks;
