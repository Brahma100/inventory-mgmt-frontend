import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import  Card  from "../Card/Card.js";
import  StatsCard  from "../StatsCard/StatsCard.js";
import {
  legendPie,
  responsiveSales,

} from "../Variables/Variables.js";
import AnimatedCard from "../AnimatedCard/AnimatedCard";
import { connect } from "react-redux";
import {getItems} from '../../action/itemAction';
import {getOrders} from '../../action/orderAction';
import { faCubes, faTruckLoading } from "@fortawesome/free-solid-svg-icons";

class Dashboard extends Component {

  state={

      lowStock:0,
      highStock:0,
      trending:0,
      outOfStock:0,
      showArea:true
  }

  componentDidMount(){
    this.props.getItems();

  }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  
  render() {
    var products=this.props.products;

    var highStock=0;
    var lowStock=0;
    var OutOfStock=0;
    var trending=0;

    var optionsSales = {
      low: 0,
      high: this.props.products.length/2*3,
      showArea: this.state.showArea,
      height: "245px",
      axisX: {
        showGrid: false
      },
      lineSmooth: true,
      showLine: true,
      showPoint: true,
      fullWidth: true,
      chartPadding: {
        right: 50
      }
    };
    var legendSales = {
      names: ["Orders", "Product Added"],
      types: ["info", "danger"]
    };


    const OrderDate=()=>{
      let labels=[]
      let Orders=[]
      let Products=[]
      var date = new Date();
      var dates=[]
      function pad(n) {
          return (n < 10) ? ("0" + n) : n;
      }
      for (let i = 6; i >=0; i--){
        var tempDate = new Date();
        tempDate.setDate(date.getDate()-i);
        console.log("Current date:",tempDate.toLocaleDateString());
        var str = pad(tempDate.getFullYear()) + "-" + pad(tempDate.getMonth()+1)+ "-" + pad(tempDate.getDate());
        var shortdate=tempDate.toLocaleDateString().split("/");
        dates.push(shortdate[0]+"/"+shortdate[1])
        labels.push(str);  
      }

    //  console.log("Dates:",labels);

      if(this.props.orders.length!==0){
          for(let i=0;i<labels.length;i++){
            let j=0;
            this.props.orders.map(order=>{
              if(order.date.split(" ")[0]===labels[i])
                   j+=1
                   return
            })
            Orders.push(j);
          }
      }
      if(this.props.products.length!==0){
          for(let i=0;i<labels.length;i++){
            let j=0;
            this.props.products.map(product=>{
              if(product.date.split(" ")[0]===labels[i])
                   j+=1
                   return
            })
            Products.push(j);
          }
      }
     return {labels:dates,series:[Orders,Products]}
    }
    // OrderDate();
    const stock=()=>{
      // console.log("Stock:",products);
      products.map(product=>{
        if(parseInt(product.stock)>100)
          highStock+=1;
        else if(parseInt(product.stock)===0) 
        OutOfStock+=1;
        else if(parseInt(product.stock)<10)
          lowStock+=1;
        if(product.rank && parseInt(product.rank)>0)
        trending+=1;
      })
     
    }
    stock();
    var total=highStock+ trending+ OutOfStock+lowStock;

    var dataPie1 = {
      labels: [parseInt(highStock/total*100)+"%", parseInt(trending/total*100)+"%",parseInt(OutOfStock/total*100)+"%",parseInt(lowStock/total*100)+"%"],
      series: [highStock, trending, OutOfStock,lowStock]
    };
    return (
      <div className="content">
        <AnimatedCard/>
        <Container fluid>
          {products.length===0?<Container><div style={{display:'flex',justifyContent:'center',alignItems:'center'}} ><Spinner style={{width:'5rem',height:'5rem'}} animation="border" variant="primary" /></div></Container>:<>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                color="#87CB16"
                bigIcon={<i class="fa fa-stack-overflow text-success" ></i>}
                statsText="High Stock"
                statsValue={highStock}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
              color="#1D62F0"
                bigIcon={<i class="fa fa-bolt text-primary"></i>}
                statsText="Trending"
                statsValue={trending}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
              color="#FF4A55"
                bigIcon={<i class="fa fa-exclamation-triangle text-danger"></i>}
                statsText="Out Of Stock"
                statsValue={OutOfStock}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
              color="#1DC7EA"
                bigIcon={<i class="fa fa-info text-info"></i>}
                statsText="Low Stock(<10)"
                statsValue={lowStock}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
          </Row></>}
          
          <Row>
            <Col md={8}>
              <Card
               icon={faTruckLoading}
                statsIcon="fa fa-history"
                id="chartHours"
                title="Inventory Statistics"
                category="Weekly Performance of Order/Products"
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={OrderDate()}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col>
            <Col md={4}>
              <Card
              icon={faCubes}
                statsIcon="fa fa-clock-o"
                title="Products Stock"
                category="Last Campaign Performance"
                stats="Updated Now"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie1} type="Pie"  />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
              />
            </Col>
          </Row>

         
        </Container>
      </div>
    );
  }
}
const mapStateToProps=state=>{
  return{
    orders:state.order.orders,
    products:state.item.items
  }
}
export default connect(mapStateToProps,{getItems,getOrders})(Dashboard);
