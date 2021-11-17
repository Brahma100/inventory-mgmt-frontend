import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux'
import {getOrders,deleteOrder} from '../../action/orderAction';
import {getItems} from '../../action/itemAction';
import {getCustomers} from '../../action/customerAction';
import {NavLink} from 'react-router-dom'
import {Accordion, Button, Card, Col, Container,  DropdownButton, Row, Spinner, } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown, faChevronCircleRight, faTrashAlt,faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import avatar from '../../assets/images/avatar.png'
import EditOrderModal from './EditOrderModal';
import AddOrderModal from './AddOrderModal';
import './OrderList.css'
const OrderList=(props)=>{
    
const [orders,setOrders]=useState([]);
const [q,setQ]=useState('');
const [isClient,setIsClient]=useState(true);
const [isProduct,setIsProduct]=useState(true);
const [isPayment,setIsPayment]=useState(true);
const [isTotal,setIsTotal]=useState(true);
const [open1,setOpen1]=useState(true);
const [open2,setOpen2]=useState(true);


useEffect(()=>{
    props.getCustomers();
    props.getItems();
    props.getOrders();
},[])
useEffect(()=>{ 
    if(props.orders.length!==0){
    setOrders(props.orders)
        // console.log("Order:",props.orders);
        // console.log("Order:",props.products);
}
},[props.orders,props.products])



const getProductName=id=>{
    if(props.products.length>0)
    {
    let product=props.products.filter(product=>product.id===id)
    // console.log("Product from Order:",product,id);
    return product[0].name;
    }
    else
    return "Loading...."
}
const getCustomerName=id=>{
    if(props.customers.length>0)
    {
    let customer=props.customers.filter(customer=>customer.id===id)
    // console.log("Product from Order:",customer,id);
    return customer[0].fname+" "+customer[0].lname ;
    }
    else
    return "Loading...."
}


const getCustomerImage=id=>{
    if(props.customers.length>0)
    {
    let customer=props.customers.filter(customer=>customer.id===id)
    console.log("Customer:",customer,id);
    if(customer[0].img.length===0)
    return avatar
    else return customer[0].img
    }
    else
    return "Loading...."
}


// const getCustomerAddress=id=>{
//     if(props.customers.length>0)
//     {
//     let customer=props.customers.filter(customer=>customer.id===id)
//     console.log("Product from Order:",customer,id);
//      return customer[0].address
//     }
//     else
//     return "Loading...."
// }
const getProductImage=id=>{
    if(props.products.length>0)
    {
    let product=props.products.filter(product=>product.id===id)
    // console.log("Product from Order:",product,id);
    return product[0].img;
    }
    else
    return "Loading...."
}
const getProductPrice=id=>{
    if(props.products.length>0)
    {
    let product=props.products.filter(product=>product.id===id)
    // console.log("Product from Order:",product,id);
    return product[0].price;
    }
    else
    return "Loading...."
}
const Search=(products)=>{    
    
    return (products.length!==0?products.filter(product=>

           product.payment?product.payment.toLowerCase().indexOf(q.toLowerCase())!==-1 //str.includes(PATTERN)
            // product.price.toLowerCase().indexOf(q.toLowerCase())!==-1 ||
           
            :''):'');

    }

return(
    <>
    
    <Card style={{margin:'1rem',padding:'1rem'}}>
        <Row style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <Col sm={8}>
                <Row>
                    <Col style={{display:'flex',flexDirection:'column'}}><h7><b>Orders</b></h7><span style={{color:'gray'}}>Pending/Completed Orders</span></Col>
                    
                </Row>
            </Col>
            <Col sm={2}>
                <AddOrderModal/>
            </Col>
        </Row>
    </Card>
    <Card style={{margin:'1rem',padding:'0rem'}}>
        <Container className="order-list" >


            <Card.Header>



            <div className='header-filter'>
                       
                        <div className='search-bar' >
                          <FontAwesomeIcon icon={faSearch} />

                          <input type="text" value={q} placeholder="Search Orders By Payments Only..." onChange={(e)=>{setQ(e.target.value)}}/>
                          
                          
                          </div>
                          <div className='filter-icon'>
                          <DropdownButton title={<FontAwesomeIcon icon={faFilter} />} className='filter-button' style={{borderRadius:'50%',background:'transparent',color:'#3c44b1',border:'none',boxShadow:'none'}}> 
                                
                                <Row >
         <div >
                 <Card className="filter-card" >

                
                    <Card.Body className="filter-body" style={{width:'15rem',padding:'0rem'}}>
                        {/* <Accordion defaultActiveKey="0">
                            <Card>
                                <Accordion.Toggle style={{background:!open1?"#fff":'#f3f3f3'}} eventKey="0" onClick={() => setOpen1(!open1)}>
                                    <div className="accordion-header" ><h6>Price</h6><FontAwesomeIcon style={{color:open1?"red":"#3b44c1"}} icon={open1?faChevronCircleRight:faChevronCircleDown} /></div>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                <Card.Body >
                                  <div className="range-input" ><span style={{color:'gray'}}><b>Min:</b></span><input  type='number' value={minRange} onChange={(e)=>setMinRange(e.target.value)}/>
                                  </div>
                                  <div className="range-input"><span style={{color:'gray'}} ><b>Max:</b></span><input  type='number' value={maxRange} onChange={(e)=>setMaxRange(e.target.value)}/>
                                </div></Card.Body>
                                </Accordion.Collapse>
                            </Card>
                           
                            </Accordion> */}
                            <Accordion defaultActiveKey="1">

                            <Card>
                            <Accordion.Toggle  style={{background:!open2?"#fff":'#f3f3f3'}} eventKey="1" onClick={()=>setOpen2(!open2)}>
                                    <div className="accordion-header"><h6>Customize Columns</h6><FontAwesomeIcon style={{color:open2?"red":"#3b44c1"}} icon={open2?faChevronCircleRight:faChevronCircleDown}/></div>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <Row><Col style={{display:'flex',paddingBottom:'.3rem'}} sm={6}><input style={{marginRight:'.3rem'}} type="checkbox" checked={isClient} onChange={()=>setIsClient(!isClient)}/><h6>Client</h6></Col><Col style={{display:'flex',paddingBottom:'.3rem'}} sm={6} sm={6}><input style={{marginRight:'.3rem'}} type="checkbox" checked={isProduct} onChange={()=>setIsProduct(!isProduct)}/><h6>Product</h6></Col></Row>
                                    <Row><Col style={{display:'flex',paddingBottom:'.3rem'}} sm={6} sm={6}><input style={{marginRight:'.3rem'}} type="checkbox" checked={isTotal} onChange={()=>setIsTotal(!isTotal)}/><h6>Total</h6></Col><Col style={{display:'flex',paddingBottom:'.3rem'}} sm={6} sm={6}><input style={{marginRight:'.3rem'}} type="checkbox" checked={isPayment} onChange={()=>setIsPayment(!isPayment)}/><h6>Payment</h6></Col></Row>
                                   
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
                         
                   </div>
                   
                <Row style={{width:'105%',fontWeight:'bold',color:'#3b44c1'}}>
                    <Col  sm={1}>Order</Col>
                    <Col style={{display:isClient?'':'none'}} sm={3}>Client</Col>
                    <Col style={{display:isProduct?'':'none'}} sm={2}>Product</Col>
                    <Col style={{display:isPayment?'':'none'}} sm={2}>Payment</Col>
                    <Col style={{display:isTotal?'':'none'}} sm={2}>Total</Col>
                </Row>
            </Card.Header>
        </Container>
         <Container className="order-list">
        {orders.length===0?<Container><div style={{display:'flex',justifyContent:'center',alignItems:'center'}} ><Spinner style={{width:'5rem',height:'5rem'}} animation="border" variant="primary" /></div></Container>:
            <>
                {Search(orders).map((order,key)=>(
                  
                    <Card style={{padding:'0'}}>
                       <Card.Body>
                            <Row style={{display:'flex',alignItems:'center'}}>
                                <Col sm={1} ><h7><b>#{key+1}</b></h7></Col>
                                <Col style={{display:isClient?'':'none'}} sm={3} ><Row style={{display:'flex',alignItems:'center',width:'15rem'}}><img style={{borderRadius:'50%',border:'2px solid #3b44c1',height:'50px',width:'50px'}} src={getCustomerImage(order.customer_id)}/><Col style={{display:'flex',flexDirection:'column'}}><NavLink to='/admin/customers'><h7><b>{getCustomerName(order.customer_id)}</b></h7></NavLink></Col></Row></Col>
                                <Col style={{display:isProduct?'':'none'}} sm={2} ><Row style={{display:'flex',alignItems:'center',width:'15rem'}}><img style={{height:'80px',width:'80px'}} src={getProductImage(order.product_id)}/><Col style={{display:'flex',flexDirection:'column'}}><NavLink to='/admin/products'><h7><b>{getProductName(order.product_id)}</b></h7></NavLink><span style={{color:'gray',fontSize:'12px'}}>Qty:<b>{order.quantity}</b></span></Col></Row></Col>
                                <Col style={{display:isPayment?'':'none'}} sm={2} ><h7 style={{border:order.payment==="Completed"?'2px solid #1bc943':'2px solid #f83245',padding:'5px 15px',background:order.payment==="Completed"?'#e5f9ed':'#fff5f6',fontSize:'12px',fontWeight:'bold',color:order.payment==="Pending"?'#f83245':'#1bc943'}}>{order.payment}</h7></Col>
                                <Col style={{display:isTotal?'':'none'}} sm={2} ><h7 style={{width:'10px'}}><b>₹{order.total}</b></h7></Col>
                                <Col  sm={2} style={{display:'flex',justifyContent:'space-around'}}><EditOrderModal customer_img={getCustomerImage(order.customer_id)} product_price={getProductPrice(order.product_id)} customer_name={getCustomerName(order.customer_id)} product_img={getProductImage(order.product_id)} product_name={getProductName(order.product_id)} order={order}/><Button onClick={()=>props.deleteOrder(order.id)} style={{height:'31px',fontSize:'10px',padding:'.5rem .5rem',margin:'0rem'}} variant="danger"><FontAwesomeIcon icon={faTrashAlt}/></Button></Col>
                                
                            </Row>
                        </Card.Body>
                            <Card.Footer style={{padding:'.2rem 2rem'}}>
                                <Row style={{color:'gray',fontSize:'10px',padding:'0rem'}}><h7>Created On:</h7><span><b>{order.date}</b></span></Row>
                            </Card.Footer>
                    </Card>
                ))}
            </>
        }
    </Container>

        <Container className="order-grid">
            <Row>
            {orders.length===0?<Container><div style={{display:'flex',justifyContent:'center',alignItems:'center'}} ><Spinner style={{width:'5rem',height:'5rem'}} animation="border" variant="primary" /></div></Container>:
            <>
                {Search(orders).map((order,key)=>(
                  
                    <Card key={key} style={{width:'100%',padding:'0',margin:'1rem'}}>
                       <Card.Header>
                       <Row style={{display:'flex',alignItems:'center',width:'15rem'}}><img style={{borderRadius:'10px',border:'2px Solid #ebebeb',height:'90px',width:'90px'}} src={getProductImage(order.product_id)}/><Col style={{display:'flex',flexDirection:'column'}}><NavLink to='/admin/products'><h7><b>{getProductName(order.product_id)}</b></h7></NavLink><span style={{color:'gray',fontSize:'12px'}}>Qty:<b>{order.quantity}</b></span></Col></Row>
                       </Card.Header>
                       <Card.Body style={{color:'gray',fontSize:'12px'}}>

                                {/* <Col sm={1} ><h7>#{key+1}</h7></Col>
                                <Col sm={3} ><Row style={{display:'flex',alignItems:'center',width:'15rem'}}><img style={{borderRadius:'50%',border:'2px solid #3b44c1',height:'50px',width:'50px'}} src={getCustomerImage(order.customer_id)}/><Col style={{display:'flex',flexDirection:'column'}}><NavLink to='/admin/customers'><h7><b>{getCustomerName(order.customer_id)}</b></h7></NavLink></Col></Row></Col> */}
                                
                                <Row ><Col><h7 >Order:</h7><span><b>#{key+1}</b></span></Col></Row>
                                <Row ><Col><div><h7>Client:</h7><NavLink to='/admin/customers'><span><b>{getCustomerName(order.customer_id)}</b></span></NavLink></div></Col></Row>
                                <Row ><Col><div><h7>Created On:</h7><span><b>{order.date}</b></span></div></Col></Row>
                                <Row ><Col><h7>Status:</h7><span style={{border:order.payment==="Completed"?'1px solid #1bc943':'1px solid #f83245',padding:'1px 5px',background:order.payment==="Completed"?'#e5f9ed':'#fff5f6',fontSize:'10px',fontWeight:'bold',color:order.payment==="Pending"?'#f83245':'#1bc943'}}>{order.payment}</span></Col><Col><h7 >Total:</h7><span><b>₹{order.total}</b></span></Col></Row>
                               
                                
                           
                        </Card.Body>
                        <Card.Footer className="text-muted">
                                <Row style={{marginTop:'.5rem',display:'flex',justifyContent:'space-around',width:'50%'}}><EditOrderModal  customer_img={getCustomerImage(order.customer_id)} product_price={getProductPrice(order.product_id)} customer_name={getCustomerName(order.customer_id)} product_img={getProductImage(order.product_id)} product_name={getProductName(order.product_id)} order={order}/><Button  onClick={()=>props.deleteOrder(order.id)} style={{height:'31px',fontSize:'10px',padding:'.5rem .5rem',margin:'0rem'}} variant="danger"><FontAwesomeIcon icon={faTrashAlt}/></Button></Row>
                                   
                        </Card.Footer>

                    </Card>
                ))}
            </>
        }
            </Row>
        </Container>
    </Card>
    </>
)
}
const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.isAuthenticated,
        orders:state.order.orders,
        products:state.item.items,
        customers:state.customer.customers
    }
}
export default connect(mapStateToProps,{getOrders,getItems,getCustomers,deleteOrder})(OrderList);