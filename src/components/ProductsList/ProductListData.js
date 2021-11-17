import React, { useEffect, useState } from 'react'
import { Card, Row, Col,Button,Media,Tooltip, Accordion, DropdownButton, OverlayTrigger, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faFilter, faTimes,faTrash, faChevronCircleDown, faChevronCircleRight, faArrowAltCircleUp, faArrowAltCircleDown, faStar, faEdit } from '@fortawesome/free-solid-svg-icons';
import './ProductListData.css'
import {deleteItem, deleteSelectedItem} from '../../action/itemAction'
import { connect } from 'react-redux';
import UpdateProductModal from './UpdateProductModal';
import default_product from '../../assets/images/default-pro.jpg'
import {NavLink} from 'react-router-dom'
import CountUp from 'react-countup';



const styles = {
    mediaItem: {
    //   margin:'1rem',
    //   border: "1px solid gray",
      backgroundColor: "#f5f5f5",
 
    },
    mediaItemButtons: {
      paddingTop: "5px",
      paddingBottom: "5px"
    }
  };

  
function ProductList({products,deleteSelectedItem,deleteItem,user,isAuthenticated}) {

//     var notificationSystem = React.createRef();
//    const addNotification = (name) => {
//   // event.preventDefault();
//   let notification = notificationSystem.current;
//     notification.addNotification({
//     message:' has Been Deleted',
//     level: 'Danger',
//     autoDismiss:5
//   });
// };
    var f=0;
    let deleteAllClass="not-checked"
    const [state,setState]=useState({
        checkedBoxes:[],
        
    })
    // Column checkbox
    const [isManfacturer,setIsManufacturer]=useState(true);
    const [isRating,setIsRating]=useState(true);
    const [isPrice,setIsPrice]=useState(true);
    const [isStock,setIsStock]=useState(true);

    const [open1,setOpen1]=useState(false);
    const [open2,setOpen2]=useState(false);
    const [open3,setOpen3]=useState(false);
    const [open4,setOpen4]=useState(false);
    const [chkBox,setChkBox]=useState(false)
    const [q,setQ]=useState("")

    const [isNewest,setIsNewest]=useState(false);
    const [isAscending,setIsAscending]=useState(false);
    const [isDecending,setIsDecending]=useState(false);
    const [minRange,setMinRange]=useState(0);
    const [maxRange,setMaxRange]=useState(1000000);
    
    let newProducts=products;
    const Range=(p)=>{
        console.log("min:",minRange,"  max:",maxRange," num:",p.length);
        return p.filter(product=>parseInt(product.price)>=minRange && parseInt(product.price)<=maxRange)
    }
    const sort=()=>{
            console.log("Sorting Called",isAscending,isDecending);
            // let newProducts=products;
                // if(!isAscending && !isDecending)
                // newProducts=products;
             if(isAscending){
                setIsAscending(false);
                newProducts= products.sort((a, b) => b.price - a.price)
            }
            else if(isDecending){
                setIsDecending(false);
                newProducts=products.sort((a, b) => a.price - b.price)
            }
          else newProducts=products;
    }
    useEffect(()=>{
            // Range();
            sort();
    },[isDecending,isAscending,isNewest,newProducts]);

    const Search=(products)=>{    
    
        return (products.length>0?products.filter(product=>

               product?product.name.toLowerCase().indexOf(q.toLowerCase())!==-1 || //str.includes(PATTERN)
                // product.price.toLowerCase().indexOf(q.toLowerCase())!==-1 ||
                product.manufacturer.toLowerCase().indexOf(q.toLowerCase())!==-1
                :''):'');

        }

const deleteAll=(e)=>{
    deleteSelectedItem(state.checkedBoxes)
    // for(let i=0;i<state.checkedBoxes.length;i++){
    //     setTimeout(()=>
        
    //     {
            
    //         console.log("del Called")}
    //     ,3000);
    //     deleteItem(state.checkedBoxes[i]);
    // }
    setChkBox(false);
    setState(prevState=>{
            let {checkedBoxes}=prevState;
        checkedBoxes.splice(0, checkedBoxes.length)
        return {...prevState.checkedBoxes, checkedBoxes: checkedBoxes };
    });

}
const deleteProduct=()=>{
        
}
const handleCheck= async (e,product)=> {
        let itemName=e.target.name;
        let checked=e.target.checked;
      
        if(itemName==='checkAll'){
                    let searchedProduct=Search(products)
                    if(checked){
                        f=1
                        deleteAllClass+="checked"
                        console.log(deleteAllClass);
                        setChkBox(true)
                        setState(prevState=>{
                        let  {checkedBoxes}=prevState;

                            let categories = new Set(checkedBoxes)
                            for(var i=0;i<searchedProduct.length;i++)
                            categories.add(searchedProduct[i].id)
                            checkedBoxes=Array.from(categories)
                            return {...prevState.checkedBoxes,  checkedBoxes: checkedBoxes }

                        })
                console.log(state.checkedBoxes);
                    }
                    else{
                        f=0
                        deleteAllClass=""
                        setChkBox(false);
                        setState(prevState=>{
                                let {checkedBoxes}=prevState;
                            checkedBoxes.splice(0, checkedBoxes.length)
                            return {...prevState.checkedBoxes, checkedBoxes: checkedBoxes };
                        });
                        console.log(state.checkedBoxes);
                    }
        }

        else if(checked) {
            
            let arr = state.checkedBoxes;
            arr.push(product.id);
            console.log("Checked:",product.id,arr);
            
            setState(state=>({...state.checkedBoxes,checkedBoxes:arr}));
        } else {
            // if(f===1)
            setChkBox(false);
            let products=state.checkedBoxes.filter(id=>id!==product.id)
            // let products = state.checkedBoxes.splice(state.checkedBoxes.indexOf(product.id), 1);
            console.log("UnChecked:",product.id,products);
            setState(state=>({...state.checkedBoxes,checkedBoxes:products}));
        }	
    }
    
   

    return (
    
        <>
 {/* <NotificationSystem ref={notificationSystem} /> */}
        <Col>
          <div className='products'>
                 <Card  className='cardpl'>
                 <Card.Header className='header'>
                
                     <div className='header-filter'>
                        <div style={{marginTop:'1rem'}}>
                                <input id="_checkbox"
                                    //   id={111111}
                                    name='checkAll'
                                    type="checkbox"
                                    checked={chkBox}
                                    onChange={(e)=>handleCheck(e)}
                                    
                                />
                                <label for="_checkbox">
                                <div id="tick_mark"></div>
                                </label>
                               
                        </div>
                        <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip id="button-tooltip-2">Delete Selected (Not Working :( Some Issue with Function)</Tooltip>}
                                            >
                                                {/* onClick={(e)=>deleteAll(e)} */}
                        <Button  style={{display: state.checkedBoxes.length>0 ? 'block' : 'none' }} variant="danger" size="sm"><FontAwesomeIcon icon={faTrash}/></Button></OverlayTrigger>
                        <div className='search-bar' >
                          <FontAwesomeIcon icon={faSearch} />

                          <input type="text" value={q} placeholder="Search Products" onChange={(e)=>{setQ(e.target.value)}}/>
                          
                          
                          </div>
                          <div className='filter-icon'>
                          <DropdownButton title={<FontAwesomeIcon icon={faFilter} />} className='filter-button' style={{borderRadius:'50%',background:'transparent',color:'#3c44b1',border:'none',boxShadow:'none'}}> 
                                
                                <Row >
         <div >
                 <Card className="filter-card" >

                
                    <Card.Body className="filter-body" style={{width:'15rem',padding:'0rem'}}>
                        <Accordion defaultActiveKey="0">
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
                           
                            </Accordion>
                            <Accordion defaultActiveKey="1">

                            <Card>
                            <Accordion.Toggle  style={{background:!open2?"#fff":'#f3f3f3'}} eventKey="1" onClick={()=>setOpen2(!open2)}>
                                    <div className="accordion-header"><h6>Customize Columns</h6><FontAwesomeIcon style={{color:open2?"red":"#3b44c1"}} icon={open2?faChevronCircleRight:faChevronCircleDown}/></div>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <Row><Col style={{display:'flex',paddingBottom:'.3rem'}} sm={6}><input style={{marginRight:'.3rem'}} type="checkbox" checked={isManfacturer} onChange={()=>setIsManufacturer(!isManfacturer)}/><h6>Manfacturer</h6></Col><Col style={{display:'flex',paddingBottom:'.3rem'}} sm={6} sm={6}><input style={{marginRight:'.3rem'}} type="checkbox" checked={isRating} onChange={()=>setIsRating(!isRating)}/><h6>Rating</h6></Col></Row>
                                    <Row><Col style={{display:'flex',paddingBottom:'.3rem'}} sm={6} sm={6}><input style={{marginRight:'.3rem'}} type="checkbox" checked={isPrice} onChange={()=>setIsPrice(!isPrice)}/><h6>Price</h6></Col><Col style={{display:'flex',paddingBottom:'.3rem'}} sm={6} sm={6}><input style={{marginRight:'.3rem'}} type="checkbox" checked={isStock} onChange={()=>setIsStock(!isStock)}/><h6>Stock</h6></Col></Row>
                                   
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            </Accordion>
                           
                            <Accordion defaultActiveKey="5">

                            <Card>
                            <Accordion.Toggle style={{background:open4?"#fff":'#f3f3f3'}}  eventKey="3" onClick={()=>setOpen4(!open4)}>
                                    <div className="accordion-header"><h6>Sort By Price</h6><FontAwesomeIcon style={{color:open4?"#3b44c1":"red"}} icon={open4?faChevronCircleDown:faChevronCircleRight}/></div>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="3">
                                <Card.Body>
                                    <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around', alignItems:'center'}}>
                                        
                                        <div onClick={()=>{setIsAscending(!isAscending)}} className="asending" style={{marginBottom:'.6rem',display:'flex',alignItems:'center',cursor:'pointer'}}><a><FontAwesomeIcon style={{color:'#3b44c1'}} icon={faArrowAltCircleUp}/><h7>Ascending</h7></a></div>
                                        <div onClick={()=>{setIsDecending(!isDecending)}} className="desending" style={{display:'flex',alignItems:'center',cursor:'pointer'}}><FontAwesomeIcon style={{color:'red'}} icon={faArrowAltCircleDown}/><h7>Decending</h7></div>
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
                         
                   </div>
                  
                  </Card.Header>
                  <div className="title" style={{height:'2rem',marginLeft:'11rem'}}>
                    <Row style={{padding:'.5rem 0',fontWeight:'bold',color:'#3b44c1'}}>
                            {/* <Col xs={2}></Col> */}
                            <Col style={{display:isManfacturer?"block":"none"}} className='product-col' xs={2}>By</Col>
                            <Col style={{display:isRating?"block":"none"}} className='product-col' xs={1}>Rating</Col>
                            <Col style={{display:isPrice?"block":"none"}} className='product-col' xs={1}>Price</Col>
                            <Col style={{display:isStock?"block":"none"}} className='product-col' xs={2}>Stock</Col>
                            <Col  className='product-col' xs={3}></Col>

                    </Row>
                </div>
                 <Card.Body  className='productListBody overflow-auto custom-scrollbar-css '>



                 
            <p style={{display:'flex',alignItems:products.length<1?"center":"",flexDirection:'column-reverse'}}>{newProducts.length===0?<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><Spinner style={{ marginTop:'4rem',width: '5rem', height: '5rem', color:'green' }} animation="grow" variant="success" /></div>:Range(Search(newProducts)).map((product,id)=>(
                
                <div className="product-card-indentical" style={{color:'black',display:'flex',alignItems:'center',border:'1px solid #dee2e6',margin:'.5rem'}}>
             
              <div  style={{marginLeft:'1rem',marginTop:'2rem'}} className="checkBocAll">
              
                   
             <input
                style={{display:'none'}}
                className="singleCheckBox"
                id={id}
                type="checkbox"
                name={product.id}
                value={product.id}
                checked={state.checkedBoxes.includes(product.id)}
                onChange={(e) => handleCheck(e, product)}
            
        /><label for={id}>
        <div id="tick_mark"></div>
      </label></div>
            <Media key={product.id} 
                    style={{padding:'.5rem',flex:'1'}} className={styles.mediaItem}>
                           <NavLink to={{
                    pathname:`products/${product.id}`,
                    state: {item:product} 
                  }} >
                      
                       <img
                                width={100}
                                height={100}
                                className="align-self-center mr-3"
                                src={product.img?product.img:default_product}
                                alt="Generic placeholder"
                            />
                      </NavLink>
                            
                            <Media.Body className={styles.mediaBody}>
                            <NavLink to={{
                                    pathname:`products/${product.id}`,
                                    state: {item:product}  
                  }} > <p><b>{product.name}</b></p></NavLink>
                                <Row  className='product-row'>
                                <Col style={{display:isManfacturer?"block":"none"}} className='product-col' xs={2}>
                                    <span className="inside-label"><strong>By:</strong></span>{product.manufacturer}
                                </Col>
                                <Col style={{display:isRating?"block":"none"}} className='product-col' xs={1}><b><p style={{width:'2.7rem',margin:'0 0 0 .5rem',borderRadius:'5px',background:'green',color:'white',padding:'.1rem .3rem',fontSize:'12px'}}>{product.rating?product.rating:"4.5"} <FontAwesomeIcon  icon={faStar}/></p></b></Col>
                                <Col style={{display:isPrice?"block":"none"}} className='product-col' xs={1}>
                                    <strong>₹<CountUp
                                        start={0}
                                        end={product.price}
                                        duration={2}
                                        delay={0}
                                        separator=""
                                        decimals={0}
                                        decimal=","
                                    /></strong>
                                </Col>
                                <Col style={{display:isStock?"block":"none"}} className='product-col' xs={2}><span className="inside-label"><strong>Stock:</strong></span><span style={{color:product.stock>=10?'#1bc943':'#f83245',borderRadius:'5px',border:product.stock>=10?'1px solid #1bc943':' 1px solid #f83245',background:product.stock>=10?'#e5f9ed':'#fff5f6',padding:'.0rem .3rem'}}><b><CountUp
                                        start={0}
                                        end={product.stock}
                                        duration={3}
                                        delay={0}
                                        separator=""
                                        decimals={0}
                                        decimal=","
                                    /></b></span></Col>
                                
                                <Col xs={3} style={{minWidth:'10rem'}}>
                                    <div className='action-button'>
                                    
                                       
                                    {/* <UpdateProductModal user={user} product={product}/> */}
                                    <OverlayTrigger        
                                                placement="bottom"
                                            overlay={<Tooltip id="button-tooltip-2">Edit Product</Tooltip>}>
                                <NavLink 
                                to={{
                                    pathname:'/admin/updateProduct',
                                    state: {product:product,user:user} 
                                  }}
                                  >
                                            <Button variant="primary" size="sm">
                                                    <FontAwesomeIcon icon={faEdit}/>
                                            </Button>
                                </NavLink>
                                    </OverlayTrigger>
                                  
                                    <div>
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={<Tooltip id="button-tooltip-2">Delete Product</Tooltip>}>
                                                
                                            <Button variant="danger" onClick={()=>deleteItem(product.id)} size="sm">
                                                <FontAwesomeIcon icon={faTimes}/>
                                            </Button>
                                        </OverlayTrigger>
                                    </div>

                                    </div>
                                </Col>
                                </Row>                              
                            </Media.Body>
                            </Media></div> ))}
                           
                </p>    
                </Card.Body>   
                           
                         
                           </Card>
                           </div>
                           </Col>
                          
        </>
    )
}
const mapStateToProps=state=>{
    return{
        user:state.auth.user,
        isAuthenticated:state.auth.isAuthenticated
    }
}
export default connect(mapStateToProps,{deleteItem,deleteSelectedItem})(ProductList);