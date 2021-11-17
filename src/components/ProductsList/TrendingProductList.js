import React, { Component } from "react";
import { Container, Row, Col,Button,Media,Form,Tooltip } from "react-bootstrap";
import './TrendingProductList.css'
import {Card} from 'react-bootstrap';   
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes,faEdit, faStar } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {getCategories} from '../../action/categoryAction';
import { getItems,deleteItem } from "../../action/itemAction";
import {loginModalOpen} from '../../action/authActions'
import CountUp from "react-countup";
import default_product from '../../assets/images/default-pro.jpg'

const styles = {
    mediaItem: {
      border: "1px solid gray",
      backgroundColor: "#f5f5f5",
 
    },
    mediaItemButtons: {
      paddingTop: "5px",
      paddingBottom: "5px"
    }
  };

class TrendingProductList extends Component {
  // createLegend(json) {
  //   var legend = [];
  //   for (var i = 0; i < json["names"].length; i++) {
  //     var type = "fa fa-circle text-" + json["types"][i];
  //     legend.push(<i className={type} key={i} />);
  //     legend.push(" ");
  //     legend.push(json["names"][i]);
  //   }
  //   return legend;
  // }
  componentDidMount(){
    // this.props.loadUser();
    this.props.getItems();
  }
  render() {
    // console.log("Products From  Trending:",this.props.user);
    const sort=(products)=>{
      return products.sort((a, b) => b.rank - a.rank)
    }
    return (
      <div className="content">
        <Container  fluid>
        
          <Row >
            
            <div className='products'>
                 <Card  className='cardp' style={{height:'30rem',marginTop:'5rem'}}>
                 <Card.Header className='header'><b>Trending Products</b><p>Explore All Top Viewed Products</p></Card.Header>
                 <Card.Body className='overflow-auto custom-scrollbar-css p-3'>
                 
                    {this.props.products.length!==0?sort(this.props.products).map((product)=>
                      
                      <NavLink  to={this.props.isAuthenticated?{
                        pathname:`admin/products/${product.id}`,
                        state: {item:product}}:'/login'}
                        >
                          
                        <Media key={product.id} style={{padding:'.5rem'}} className={styles.mediaItem}>
                      <img
                          width={100}
                          height={100}
                          className="align-self-center mr-3"
                          src={product.img?product.img:default_product}
                          alt="Product Image"
                      />
                      <Media.Body className={styles.mediaBody} >
                          <p style={{display:'flex',alignItems:'center'}}><b>{product.name}</b><span style={{color:product.stock>=10?'#1bc943':'#f83245',borderRadius:'5px',border:product.stock>=10?'1px solid #1bc943':' 1px solid #f83245',background:product.stock>=10?'#e5f9ed':'#fff5f6',padding:'.0rem .3rem',marginLeft:'.5rem',fontSize:'10px'}}><b><CountUp
                                        start={0}
                                        end={product.stock}
                                        duration={3}
                                        delay={0}
                                        separator=""
                                        decimals={0}
                                        decimal=","
                                    /></b></span></p>
                          <Row>
                          <Col xs={6}>
                              <h7 style={{fontSize:'12px',display:'flex'}}><strong>By:</strong> {product.manufacturer}</h7>
                          </Col>
                          <Col xs={6}><p style={{width:'2.7rem',margin:'0 0 0 .5rem',borderRadius:'5px',background:'green',color:'white',padding:'.1rem .3rem',fontSize:'12px'}}>{product.rating?product.rating:"4.5"} <FontAwesomeIcon  icon={faStar}/></p></Col>
                          </Row>
                          <Row>
                          <Col xs={6}>
                             <p style={{fontSize:'13px'}}> <strong>₹<CountUp
                                        start={0}
                                        end={product.price}
                                        duration={2}
                                        delay={0}
                                        separator=""
                                        decimals={0}
                                        decimal=","
                                    /></strong></p>
                          </Col>
                         
                          </Row>

                    
                      </Media.Body>
                      </Media></NavLink>
                    ):'Please Refresh The Page :('}
                </Card.Body>   
                  <NavLink className="m-3 p-2 btn btn-primary" style={{color:'white'}} to='/productsGrid'><span className="btn-wrapper--label">View All</span></NavLink>
                         
                    </Card>
             

            </div>
            
          </Row>

         
        </Container>
      </div>
    );
  }
}
const mapStateToProps= state=>{
  return({
    categories:state.category.categories,
      isAuthenticated:state.auth.isAuthenticated,
      isLoading:state.auth.isLoading,
      // user:state.auth.user,
      products:state.item.items,
      itemsLoading:state.item.itemsLoading,
      itemsLoaded:state.item.itemsLoaded
      // error:state.error
  })
}
export default connect(mapStateToProps,{loginModalOpen,getItems,deleteItem,getCategories})(TrendingProductList); ;
