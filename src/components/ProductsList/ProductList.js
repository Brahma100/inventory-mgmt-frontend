import React, { useState, useEffect } from "react";
import './ProductList.css'
import { Card, Container, Row, Col, Button, Spinner, NavLink } from "react-bootstrap";
import { connect } from 'react-redux';
import { getItems } from './../../action/itemAction';
import { Suspense } from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ProductListData = React.lazy(() => import('./ProductListData'));
// import ProductListData from './ProductListData';


function ProductList(props) {
  // const [chkBox,setChkBox]=useState(false)
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);



  return (
    <div className="content">
      <Container style={{ marginTop: '1rem' }} fluid>
        <Row >
          <Col sm={12}>
            <div className='products'>
              <Card className='cardpt'>
                <Card.Header className='header'>
                  <div className="product-list-header">
                    <div><b>All Products</b><p>Explore All Electronics Products</p></div>

                    <div style={{paddingBottom:'8px'}}>
                      <NavLink href="/admin/addProduct">
                        <Button><FontAwesomeIcon icon={faPlus} /><h7 style={{ marginLeft: '.3rem' }} className="newproductbuttontext">Create Product</h7></Button>
                      </NavLink>
                    </div>
                  </div>
                </Card.Header>

              </Card>


            </div>
          </Col>
        </Row>
        <Row  >


          <Suspense fallback={<Container><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} ><Spinner style={{ width: '5rem', height: '5rem' }} animation="border" variant="primary" /></div></Container>}>

            <ProductListData products={products} />
          </Suspense>






        </Row>


      </Container>
    </div>
  );
}
const mapStateToProps = (state) => {
  return ({
    products: state.item.items
  })
}

export default connect(mapStateToProps, { getItems })(ProductList);
