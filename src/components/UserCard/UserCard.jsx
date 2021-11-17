
import React, { Component } from "react";

export class UserCard extends Component {
  render() {
    return (
      <div className="card card-user">
        <div className="image">
          <img src={this.props.bgImage} alt="..." />
        </div>
        <div className="content">
          <div className="author">
            <a href="#pablo">
              <img
                className="avatar border-gray"
                src={this.props.avatar}
                alt="..."
              />
              <h4 className="title">
                {this.props.name}
                <br />
                <small>{this.props.userName}</small>
              </h4>
            </a>
          </div>
          <div style={{display:'flex',marginTop:'2.5rem'}}>
          <div style={{display:'flex',alignItems:'center',width:'90%',marginLeft:'1rem'}}>
            <h7 style={{marginRight:'.5rem', fontWeight:'bold',color:'#3b44c1'}}>City:</h7><span>{this.props.city}</span>
          </div>
          <div style={{display:'flex',alignItems:'center',width:'90%',marginLeft:'1rem'}}>
            <h7 style={{marginRight:'.5rem', fontWeight:'bold',color:'#3b44c1'}}>State:</h7><span>{this.props.state}</span>
          </div>
          </div>
          <div style={{display:'flex'}}>
          <div style={{display:'flex',alignItems:'center',width:'90%',marginLeft:'1rem'}}>
            <h7 style={{marginRight:'.5rem', fontWeight:'bold',color:'#3b44c1'}}>Zip Code:</h7><span>{this.props.postal}</span>
          </div>
          <div style={{display:'flex',alignItems:'center',width:'90%',marginLeft:'1rem'}}>
            <h7 style={{marginRight:'.5rem', fontWeight:'bold',color:'#3b44c1'}}>Country:</h7><span>{this.props.country}</span>
          </div>
          </div>
          {/* <p className="description text-center">{this.props.description}</p> */}
        </div>
        <hr />
        <div className="text-center">{this.props.socials}</div>
      </div>
    );
  }
}

export default UserCard;
