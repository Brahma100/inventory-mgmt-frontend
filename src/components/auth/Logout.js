import React, { Component,Fragment } from 'react'
import {logout} from '../../action/authActions';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';

class Logout extends Component {
    static propTypes={
        logout:PropTypes.func.isRequired
    };
    render() {
        return (
            <Fragment>
                <div className="dropdown-list-item-logout" onClick={this.props.logout}>
                            <FontAwesomeIcon style={{marginRight:'.5rem'}} icon={faSignOutAlt}/><h7>Logout</h7>    
                            </div> 
                {/* <NavLink style={{color:'red'}} onClick={this.props.logout} href="#">Logout</NavLink>  */}
            </Fragment>
        )
    }
}

export default connect(null,
    {logout}
    )(Logout);