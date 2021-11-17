import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {getCustomers,deleteCustomer} from '../../action/customerAction';
import {Row,Container,Col, Spinner, Card, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCalendar, faEnvelope, faHome, faTrash} from '@fortawesome/free-solid-svg-icons';
import './CustomerList.css'
import AddCustomerModal from './AddCustomerModal';
import avatar from '../../assets/images/avatar.png'

const CustomerList=(props)=>{
    const [customers,setCustomers]=useState([]);
    useEffect(()=>{
        props.getCustomers();
    },[])
    useEffect(()=>{
        if(props.customers.length>0){
            setCustomers(props.customers);
            console.log("Customers:",customers);
        }
    },[props.customers]);
    return(
            <div>
            <Card style={{margin:'1rem',padding:'1rem'}}>
        <Row style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <Col sm={9}>
                <Row>
                    <Col style={{display:'flex',flexDirection:'column'}}><h7><b>Customers</b></h7><span style={{color:'gray'}}>Our Loving Customers</span></Col>
                    
                </Row>
            </Col>
            <Col sm={2}>
               <AddCustomerModal/>
            </Col>
        </Row>
    </Card>
            <Container>
               <Container>
                   
                    {props.customers.length===0?<Spinner style={{width:'5rem',height:'5rem'}} animation="border" variant="primary" />:
                   <Row>{props.customers.map((customer,key)=>(
                       <>
                       <div>
                        <Card style={{width:'18rem',height:'11.5rem',margin:'1rem'}} key={key}>
                            <Card.Header>

                                <Row style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-around'}}>{customer.img?<img alt="alt" src={customer.img?customer.img:{avatar}} style={{marginRight:'1rem',textAlign:'center',color:'white',borderRadius:'50%',width:'3rem',height:'3rem',background:'#ed3f2f'}}/>:<div style={{marginRight:'1rem',textAlign:'center',padding:'.8rem',color:'white',borderRadius:'50%',width:'3rem',height:'3rem',background:'#ed3f2f'}}>{customer.fname[0]+customer.lname[0]}</div>}<h7>{customer.fname+" "+customer.lname}</h7><div style={{flex:1}}><Button onClick={()=>props.deleteCustomer(customer.id)} style={{float:'right'}} variant="danger" size="sm"><FontAwesomeIcon icon={faTrash}/></Button></div></Row>

                            </Card.Header>
                            <Card.Body style={{marginLeft:'1rem'}}>
                                <Row style={{display:'flex',alignItems:'center',color:'gray'}}><FontAwesomeIcon style={{marginRight:'.5rem'}} icon={faEnvelope}/>{customer.email}</Row>
                                <Row style={{display:'flex',alignItems:'center',color:'gray'}}><FontAwesomeIcon style={{marginRight:'.5rem'}} icon={faHome}/>{customer.address?customer.address.substring(0,25):''}...</Row>
                                <Row style={{display:'flex',alignItems:'center',color:'gray'}}><FontAwesomeIcon style={{marginRight:'.5rem'}} icon={faCalendar}/>{customer.date}</Row>
                            </Card.Body>
                            
                        </Card>
                        </div>
                         
                         </>
                   ))

                    }</Row>
                    
                    }
                    
                </Container>
                </Container>
            </div>

    )
}


const mapStateToProps=state=>{
    return{
        customers:state.customer.customers
    }
}
export default connect(mapStateToProps,{getCustomers,deleteCustomer})(CustomerList);