import React, { Component } from 'react';
import { OverlayTrigger,Tooltip,Accordion,DropdownButton, Spinner, Row, Container, Col, Card, Button, Form, Pagination, } from 'react-bootstrap';
import {connect} from 'react-redux';
import './Products.css'
import default_product from '../../assets/images/default-pro.jpg'
import {NavLink, Prompt, withRouter} from 'react-router-dom';
import UpdateProductModal from '../ProductsList/UpdateProductModal'
// import E2 from './auth/E2';
// import EditModal from './auth/EditModal'
import {getCategories} from '../../action/categoryAction';
import { getItems,deleteItem } from "../../action/itemAction";
import {loginModalOpen,loadUser} from '../../action/authActions'
import AppNavbar from "../AppNavbar/AppNavbar";
import back from '../../assets/images/back.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrashAlt, faUser ,faShoppingBag,faCalendarAlt,faSearch,faFilter,  faChevronCircleDown, faChevronCircleRight, faArrowAltCircleUp, faArrowAltCircleDown, faEdit} from '@fortawesome/free-solid-svg-icons';
import Footer from '../Footer/Footer';
// import { , faFilter, faSearch, , } from '@fortawesome/free-solid-svg-icons';
// import Pagination from './Pagination';
// import { PropTypes } from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes,faEdit } from '@fortawesome/free-solid-svg-icons';
// import ProductList from './ProductsList/ProductList';


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

class Products extends Component {
  state = {
    products: this.props.products,
    pageOfItems: [],
    Index1:0,
    Index2:8,
    isManufacturer:true,
    isRating:true,
    isPrice:true,
    isStock:true,
    open1:false,
    open2:false,
    open3:false,
    open4:false,
    open10:false,
    chkBox:false,
    q:"",
    minRange:0,
    maxRange:1000000,
    isAscending:false,
    isDecending:false,
    categoryValue:0,
    currentPage: 1,
    productsPerPage: 6
  };


  handleClick=(event)=> {
console.log("Id:",event.target.id);
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

// componentWillUnmount(){
//   console.log("Blocked:",this.props.isBlocked);
//     console.log("History:",this.props.history);
//     if(this.props.isBlocked){
//           let authenticate = window.confirm("Are You Sure Want To Go ",this.props.history.location.pathname)
//           if(!authenticate){
//                   this.props.history.push(this.props.history.location.pathname)
//           }
//     }
// }
  componentDidMount(e){

    var myobj = document.getElementById("bodyClick");
    if(myobj!==null){
    document.documentElement.classList.toggle("nav-open");
    myobj.remove();}
    


 this.props.getItems();
 this.props.getCategories();
    this.setState({products:this.props.products})

  }

  handleView=()=>{
    if(!this.props.isAuthenticated){
      
    }
  }
  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });

}


  
    render(){
      const { currentPage, productsPerPage } = this.state;

      const paginaton=(products)=>{
        const indexOfLastTodo = currentPage * productsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - productsPerPage;
        return products.slice(indexOfFirstTodo, indexOfLastTodo);
      }
      const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.products.length / productsPerPage); i++) {
          pageNumbers.push(i);
        }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <Pagination.Item onClick={this.handleClick} id={number} key={number} active={number === currentPage}>
          {number}          
        </Pagination.Item>
        
      );
    });
      
      const sort=(products)=>{
        // console.log("Sorting Called",this.state.isAscending,this.state.isDecending);
        // let newProducts=products;
            // if(!isAscending && !isDecending)
            // newProducts=products;
            if(this.state.categoryValue!==0){
              // var Category=this.props.categories.filter(
                //   function (cat) {
                  //     console.log(this.state.categoryValue);
                  //     if(cat.id ===this.state.categoryValue)return cat.name 
                  //   }
                  // )
                  
                  // let CategoryName=Category[0].name;
                  let category_name=this.props.categories.filter(category=>parseInt(category.id)===parseInt(this.state.categoryValue));
                  console.log("category ID:",this.state.categoryValue,category_name);

              products= category_name.length>0?products.filter(product=>
                product.category===category_name[0].name):products;
            }
         if(this.state.isAscending ){
          //  this.setState({isDecending:false})
           return products.sort((a, b) => a.price - b.price)
          }
          else if(this.state.isDecending ){
          // this.setState({isAscending:false})
            return products.sort((a, b) => b.price - a.price)
        }
      return products;
}


      const Search=(products)=>{    
        return (products.filter(product=>
                product.name.toLowerCase().indexOf(this.state.q.toLowerCase())!==-1 || //str.includes(PATTERN)
                // product.price.toLowerCase().indexOf(q.toLowerCase())!==-1 ||
                product.manufacturer.toLowerCase().indexOf(this.state.q.toLowerCase())!==-1
                ));

        }
        const Range=(p)=>{
          console.log("min:",this.state.minRange,"  max:",this.state.maxRange," num:",p.length);

          return p.filter(product=>parseInt(product.price)>=this.state.minRange && parseInt(product.price)<=this.state.maxRange)
      }
var user=this.props.user;
        return (
            <>

<div style={{ backgroundImage: `url("${back}")`,backgroundSize:'100%',backgroundRepeat:'no-repeat'}}>
      
    <Prompt
                when={this.props.isBlocked}
                // message={(location)=> `Are You Sure Want To Leave ${location.pathname}`}
                message={(location, action) => {
                  if (action === 'POP') {
                    console.log("Backing up...",this.props.history)
                  } 
              
                  let check= location.pathname.startsWith("/app")
                    ? true
                    : `Are you sure you want to go to ${this.props.history.location.pathname}?`
                    // if(check)this.props.history.push(this.props.history.location.pathname)
                    return check
                }}
/>
    <AppNavbar/>
    
    <Container  style={{marginTop:'2rem',width:'100%'}}>

          <p   className="content" >
          {this.props.products.length===0?<><Spinner style={{ width: '3rem', height: '3rem', color:'green' }} type="grow" /></>
               :<>

                <Container  className="filter-box" >
                  <div>
                  <Row style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  
                  <div style={{color:'gray',paddingLeft:'.4rem',borderRadius:'20px',border:'1px solid gray'}}>
                            <FontAwesomeIcon icon={faSearch}/>
                            <input onChange={(e)=>{this.setState({q:e.target.value})}} style={{width:'80%',border:'none',padding:'.2rem 0 .2rem.5rem',color:'black'}} placeholder="Search Products" type="text"/>
                        </div>

                  <div className='filter-icon'>
                          <DropdownButton title={<FontAwesomeIcon icon={faFilter} />} className='filter-button' style={{borderRadius:'50%',background:'transparent',color:'#3c44b1',border:'none',boxShadow:'none'}}> 
                                
                                <Row >
         <div >
                 <Card className="filter-card" >

                
                    <Card.Body className="filter-body" style={{width:'15rem',padding:'0rem'}}>
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Accordion.Toggle style={{background:!this.state.open1?"#fff":'#f3f3f3'}} eventKey="0" onClick={() => this.setState(prevState => ({open1: !prevState.open1}))}>
                                    <div className="accordion-header" ><h6>Price</h6><FontAwesomeIcon style={{color:this.state.open1?"red":"#3b44c1"}} icon={this.state.open1?faChevronCircleRight:faChevronCircleDown} /></div>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                <Card.Body >
                                  <div className="range-input" ><span style={{color:'gray'}}><b>Min:</b></span><input  type='number' value={this.state.minRange} onChange={(e)=>this.setState({minRange:e.target.value})}/>
                                  </div>
                                  <div className="range-input"><span style={{color:'gray'}} ><b>Max:</b></span><input  type='number' value={this.state.maxRange} onChange={(e)=>this.setState({maxRange:e.target.value})}/>
                                </div>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                           
                            </Accordion>
                            <Accordion defaultActiveKey="1">

                            <Card>
                            <Accordion.Toggle  style={{background:!this.state.open2?"#fff":'#f3f3f3'}} eventKey="1" onClick={()=>this.setState(prevState => ({open2: !prevState.open2}))}>
                                    <div className="accordion-header"><h6>Customize Columns</h6><FontAwesomeIcon style={{color:this.state.open2?"red":"#3b44c1"}} icon={this.state.open2?faChevronCircleRight:faChevronCircleDown}/></div>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <Row><Col style={{display:'flex',paddingBottom:'.3rem'}} sm={6}><input style={{marginRight:'.3rem'}} type="checkbox" checked={this.state.isManufacturer} onChange={()=>this.setState(prevState => ({isManufacturer: !prevState.isManufacturer}))}/><h6>Added By</h6></Col><Col style={{display:'flex',paddingBottom:'.3rem'}} sm={6} sm={6}><input style={{marginRight:'.3rem'}} type="checkbox" checked={this.state.isRating} onChange={()=>this.setState(prevState => ({isRating: !prevState.isRating}))}/><h6>Rating</h6></Col></Row>
                                    <Row><Col style={{display:'flex',paddingBottom:'.3rem'}} sm={6} sm={6}><input style={{marginRight:'.3rem'}} type="checkbox" checked={this.state.isPrice} onChange={()=>this.setState(prevState => ({isPrice: !prevState.isPrice}))}/><h6>Price</h6></Col><Col style={{display:'flex',paddingBottom:'.3rem'}} sm={6} sm={6}><input style={{marginRight:'.3rem'}} type="checkbox" checked={this.state.isStock} onChange={()=>this.setState(prevState => ({isStock: !prevState.isStock}))}/><h6>Stock</h6></Col></Row>
                                   
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            </Accordion>


                            <Accordion defaultActiveKey="10">

                            <Card>
                            <Accordion.Toggle  style={{background:!this.state.open2?"#fff":'#f3f3f3'}} eventKey="10" onClick={()=>this.setState(prevState => ({open10: !prevState.open10}))}>
                                    <div className="accordion-header"><h6>Category</h6><FontAwesomeIcon style={{color:this.state.open2?"red":"#3b44c1"}} icon={this.state.open2?faChevronCircleRight:faChevronCircleDown}/></div>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="10">
                                <Card.Body>

                                    <Form.Group as={Col}>
              
                                            <Form.Control className="category-box"
                                              as="select"
                                              // type="password"
                                              placeholder=""
                                              name="category"
                                              value={this.state.categoryValue}
                                              onChange={(e)=>this.setState({categoryValue:e.target.value})}
                                              // isInvalid={!!errors.category}
                                              
                                            >
                                                <option value="0">Choose Category</option>
                                                {this.props.categories.map((category)=>(
                                                      <option value={category.id}>{category.name}</option>

                                                ))}
                                                {/* <option value="2">Laptop</option>
                                                <option value="3">HeadPhone</option> */}
                                            </Form.Control>
                                          
                                          </Form.Group>                                   
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            </Accordion>

                            <Accordion defaultActiveKey="5">

                            <Card>
                            <Accordion.Toggle style={{background:this.state.open4?"#fff":'#f3f3f3'}}  eventKey="3" onClick={()=>this.setState(prevState => ({open4: !prevState.open4}))}>
                                    <div className="accordion-header"><h6>Sort By Price</h6><FontAwesomeIcon style={{color:this.state.open4?"#3b44c1":"red"}} icon={this.state.open4?faChevronCircleDown:faChevronCircleRight}/></div>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="3">
                                <Card.Body>
                                    <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around', alignItems:'center'}}>
                                        
                                        <div onClick={()=>{this.setState(prev=>({isAscending:!prev.isAscending}))}} className="asending" style={{border:this.state.isAscending?'1px solid green':'',background:this.state.isAscending?' rgb(194, 255, 194)':'',marginBottom:'.6rem',display:'flex',alignItems:'center',cursor:'pointer'}}><a><FontAwesomeIcon style={{color:!this.state.isDecending?'#3b44c1':'gray'}} icon={faArrowAltCircleUp}/><h7>Ascending</h7></a></div>
                                        <div onClick={()=>{this.setState(prev=>({isDecending:!prev.isDecending}))}} className="desending" style={{border:this.state.isDecending?'1px solid red':'',background:this.state.isDecending?' rgb(255, 213, 213)':'',display:'flex',alignItems:'center',cursor:'pointer'}}><FontAwesomeIcon style={{color:!this.state.isAscending?'red':'gray'}} icon={faArrowAltCircleDown}/><h7>Decending</h7></div>
                                    </div>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            </Accordion>
   
                </Card.Body>   
                           
                         
                           </Card>
                           </div>
         </Row>    
                                </DropdownButton>
                          </div>
      
                  </Row>
                  </div>
                </Container>
                 
                  <Row style={{marginTop:'1rem'}} >
                
                  {paginaton(sort(Range(Search(this.props.products)))).map(product=>(
                    <Col m-8 key={product.id}>
                  <Card className="product-card" style={{ width:'19rem',margin:'1rem'}}>
                      <NavLink  to={this.props.isAuthenticated?{
                    pathname:`admin/products/${product.id}`,
                    state: {item:product}}:'/login'}
                    ><Card.Img top style={{height:'8rem',marginLeft:'5.3rem',marginTop:'1rem',width:'8rem'}} src={product.img?product.img:default_product} alt="Card image cap" />
                      <Card.Body style={{display:'flex',flexDirection:'column',paddingLeft:'3rem',maxWidth:'30rem'}}>
                                                                           
                        <Card.Title><b>{product.name}</b></Card.Title>
                        <Card.Subtitle style={{marginLeft:'0rem'}}>
                        {/* <Row>
                                <span style={{color:'#3b44c1',fontSize:'.8rem'}}>{product.manufacturer}</span>
                            </Row> */}
                            {/* <Row>
                                <h3 style={{margin:'0rem'}}>{product.name}</h3 >
                            </Row> */}
                            <Row style={{display:'flex',alignItems:'center'}}>
                             
                                <h4  style={{display:this.state.isPrice?'flex':'none',margin:'0rem 0rem',fontWeight:'bold',fontSize:'16px'}}>₹{product.price}</h4>
                                <p style={{display:this.state.isRating?'':'none',margin:'0 0 0 .5rem',borderRadius:'5px',background:'green',color:'white',padding:'.1rem .3rem',fontSize:'12px'}}>{product.rating?product.rating:"0"} <FontAwesomeIcon  icon={faStar}/></p> 
                             
                            </Row>
                            {/* <Row style={{display:'flex',fontSize:'12px'}}>
                            </Row> */}
                            <Row style={{fontSize:"12px",paddingBottom:'.2rem'}}>
                               <div style={{display:this.state.isStock?'flex':'none'}}> <h7 style={{color:'gray',alignItems:'center'}}><FontAwesomeIcon style={{marginRight:'.2rem'}} icon={faShoppingBag}/><b style={{marginRight:'.2rem'}}>Available Stock:</b></h7><span style={{color:product.stock>=10?'#1bc943':'#f83245',borderRadius:'5px',border:product.stock>=10?'1px solid #1bc943':' 1px solid #f83245',background:product.stock>=10?'#e5f9ed':'#fff5f6',padding:'.0rem .3rem'}}><b>{product.stock}</b></span>
                            </div></Row>
                            <Row style={{fontSize:"12px",paddingBottom:'.2rem'}}>
                               <div style={{display:this.state.isManufacturer?'flex':'none'}}> <h7 style={{color:'gray',display:'flex',alignItems:'center'}}><FontAwesomeIcon style={{marginRight:'.2rem'}} icon={faUser}/><b style={{marginRight:'.2rem'}}>Added By:</b></h7><span><b>{product.user?product.user.name:null}</b></span>
                           </div> </Row>
                            <Row style={{fontSize:"12px"}}>
                                <h7 style={{color:'gray',display:'flex',alignItems:'center'}}><FontAwesomeIcon style={{marginRight:'.2rem'}} icon={faCalendarAlt}/><b style={{marginRight:'.2rem'}}>Created Date:</b></h7><span>{product.date}</span>
                            </Row>
                        </Card.Subtitle>
                       
                      </Card.Body>
                      </NavLink>
                      <div className="bottom-button" >
                        {/* <UpdateProductModal isAuthenticated={this.props.isAuthenticated} product={product}/> */}
                        <NavLink 
                                to={{
                                    pathname:'/admin/updateProduct',
                                    state: {product:product,user:user} 
                                  }}>
                                      <Button variant="primary" size="sm" style={{marginLeft:'1rem'}} ><FontAwesomeIcon icon={faEdit}/></Button>
                                  </NavLink>

                      {this.props.isAuthenticated?<Button variant="danger" size="sm" style={{marginLeft:'1rem'}} onClick={()=>{this.props.deleteItem(product.id)}}><FontAwesomeIcon icon={faTrashAlt}/></Button>      
                        :
                        <div>
                        <OverlayTrigger
                            placement="right"
                            overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}>
                                
                        <Button disabled variant="danger" size="sm" style={{marginLeft:'1rem'}} onClick={()=>{this.props.deleteItem(product.id)}}><FontAwesomeIcon icon={faTrashAlt}/></Button>      
                            
                        </OverlayTrigger>
                    </div>
                        
                        
                        
                        
                          }
                        </div>
                    </Card>
                    </Col>
                  ))}
                  
                </Row>
                  </>} 
                
           
            
         </p>
         <div style={{justifyContent:'space-around',display:'flex',alignItems:'center'}}>
         <Pagination >
           {renderPageNumbers}
         </Pagination>
         
      </div>
      </Container>
      
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
        // error:state.error
    })
}


export default connect(mapStateToProps,{loadUser,loginModalOpen,getItems,deleteItem,getCategories})(withRouter(Products));