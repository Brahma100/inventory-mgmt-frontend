import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import CountUp from 'react-countup';
import React, { useState } from 'react';
import './AnimatedCard.css';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faQuestionCircle,faUserCircle,faCommentDollar, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import { easeQuadInOut } from "d3-ease";
import {Col,Row, Spinner} from 'react-bootstrap'
import {Card} from 'reactstrap';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import {getItems} from '../../action/itemAction';
import {getOrders} from '../../action/orderAction'
function AnimatedCard(props) {

    // const [products,setProducts]=useState([]);
    const [Expenses,setExpenses]=useState(0);


    const countExpenses=()=>{
        let total=0;
        props.products.map(product=>{
            total+=product.price*product.stock
            return
        })
        // console.log("Expenses:",total);
        setExpenses(total)
    }
    useEffect(()=>{
        props.getItems();
        props.getOrders();  
    },[])
    useEffect(()=>{
        if(props.products){
            countExpenses();
            // setProducts(props.products)

            // console.log("Products From Animated Card:",products);
        }
    },[props.products]);
    

        return (
            <>
            {props.products.length===0?<Spinner style={{width:'5rem',height:'5rem'}} animation="border" variant="primary" />:

            <div style={{margin:'0px 17px'}}>
                <Row  className="cardlist">
                    <Col lg={3} sm={6}>
                        <Card className="card-box card1 bg-midnight-bloom p-3 mb-5">
                        
                            <div className="d-flex align-items-center">

                            <AnimatedProgressProvider
                                    valueStart={0}
                                    
                                    valueEnd={props.orders.length+5}
                                    duration={3}
                                    easingFunction={easeQuadInOut}
                                    
                                >
                                    {value => {
                                   
                                    return (
                                        <CircularProgressbarWithChildren
                                        value={value}
                                        
                                        /* This is important to include, because if you're fully managing the
                                    animation yoursimport AnimatedProgressProvider from './AnimatedProgressProvider';
elf, you'll want to disable the CSS animation. */
                                        styles={buildStyles({pathTransition: "none",pathColor: "rgba(255,255,255,.95)", trailColor: "rgba(255,255,255,.1)"})}
                                        > 

                                    <div className="text-white d-40 rounded-circle btn-icon">
                                        <FontAwesomeIcon icon={faQuestionCircle} className="font-size-lg icon1 " />
                                    </div>
                                    </CircularProgressbarWithChildren>
                                    );
                                    }}
                                </AnimatedProgressProvider>
                                
                                <div className="pl-3">
                                    <div className=" text-white  font-weight-bold">Orders</div>
                                    <div className="value font-weight-bold pt-2 text-white ">
                                        <CountUp
                                            start={0}
                                            end={props.orders.length}
                                            duration={6}
                                            delay={0}
                                            separator=""
                                            decimals={0}
                                            decimal=","
                                        />
                                    </div>
                                </div>
                            </div>
                            
                        </Card>
                    </Col>
                    <Col lg={3} sm={6}>
                        <Card className="card-box card2 bg-royal p-3 mb-5">
                            <div className="d-flex align-items-center">
                            
                            <AnimatedProgressProvider
                                    valueStart={0}
                                    
                                    valueEnd={54}
                                    duration={6}
                                    easingFunction={easeQuadInOut}
                                    
                                >
                                    {value => {
                                   
                                    return (
                                        <CircularProgressbarWithChildren
                                        value={value}
                                        
                                        /* This is important to include, because if you're fully managing the
                                    animation yoursimport AnimatedProgressProvider from './AnimatedProgressProvider';
elf, you'll want to disable the CSS animation. */
                                        styles={buildStyles({ pathTransition: "none",pathColor: "rgba(255,255,255,.95)", trailColor: "rgba(255,255,255,.1)" })}
                                        >
                                    <div className="text-white d-40 rounded-circle btn-icon">
                                        <FontAwesomeIcon icon={faUserCircle} className="font-size-lg icon1 " />
                                    </div>
                                    </CircularProgressbarWithChildren>
                                    );
                                    }}
                                </AnimatedProgressProvider>
                                <div className="pl-3">
                                    <div className=" text-white font-weight-bold">Visitors</div>
                                    <div className="value font-weight-bold text-white pt-2  ">
                                        <CountUp
                                            start={0}
                                            end={54}
                                            duration={6}
                                            delay={2}
                                            separator=""
                                            decimals={0}
                                            decimal=","
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col lg={3} sm={6}>
                        <Card className="card-box card3 bg-deep-sky p-3 mb-5">
                            <div className="d-flex align-items-center">
                            <AnimatedProgressProvider
                                    valueStart={0}
                                    
                                    valueEnd={54}
                                    duration={6}
                                    easingFunction={easeQuadInOut}
                                    
                                >
                                    {value => {
                                   
                                    return (
                                        <CircularProgressbarWithChildren
                                        value={value}
                                        
                                        /* This is important to include, because if you're fully managing the
                                    animation yoursimport AnimatedProgressProvider from './AnimatedProgressProvider';
elf, you'll want to disable the CSS animation. */
                                        styles={buildStyles({ pathTransition: "none",pathColor: "rgba(255,255,255,.95)", trailColor: "rgba(255,255,255,.1)" })}
                                        >
                                    <div className="text-white d-40 rounded-circle btn-icon">
                                        <FontAwesomeIcon icon={faShoppingBag} className="font-size-lg icon1 " />
                                    </div>
                                    </CircularProgressbarWithChildren>
                                    );
                                    }}
                                </AnimatedProgressProvider>
                                <div className="pl-3">
                                    <div className=" text-white font-weight-bold">Products</div>
                                    <div className="value font-weight-bold pt-2 text-white ">
                                        <CountUp
                                            start={0}
                                            end={props.products.length}
                                            duration={6}
                                            delay={0}
                                            separator=""
                                            decimals={0}
                                            decimal=","
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col lg={3} sm={6}>
                        <Card className="card-box card4 bg-plum-plate p-3 mb-5">
                            <div className="d-flex align-items-center">
                            <AnimatedProgressProvider
                                    valueStart={0}
                                    
                                    valueEnd={75}
                                    duration={6}
                                    easingFunction={easeQuadInOut}
                                    
                                >
                                    {value => {
                                    const roundedValue = Math.round(value);
                                    return (
                                        <CircularProgressbarWithChildren
                                        value={value}


                                        styles={buildStyles({ pathTransition: "none",pathColor: "rgba(255,255,255,.95)", trailColor: "rgba(255,255,255,.1)" })}
                                        >
                                             <div className="text-white d-40 rounded-circle btn-icon">
                                        <FontAwesomeIcon icon={faCommentDollar} className="font-size-lg icon1 " />
                                    </div>
                                    </CircularProgressbarWithChildren>
                                    );
                                    }}
                                </AnimatedProgressProvider>
                                <div className="pl-3">
                                    <div className="text-white  font-weight-bold">Expenses</div>
                                    <div className="value font-weight-bold pt-2  text-white">
                                        ₹<CountUp
                                        start={0}
                                        end={Expenses}
                                        duration={6}
                                        delay={1}
                                        separator=""
                                        decimals={0}
                                        decimal=","
                                    />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
        </div>}
            </>
        );
    }
const mapStateToProps=state=>{
    return {
        itemsLoaded:state.item.itemsLoaded,
        products:state.item.items,
        orders:state.order.orders
    }
}
    export default connect(mapStateToProps,{getItems,getOrders})(AnimatedCard);