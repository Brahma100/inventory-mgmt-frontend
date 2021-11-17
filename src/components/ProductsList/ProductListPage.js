import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getItems,deleteItem } from "../../action/itemAction";
import ProductList from './ProductList';


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

class ProductListPage extends Component {
  state = {
    products: this.props.products,
    pageOfItems: [],
    Index1:0,
    Index2:8,

  };
  

  componentDidMount(){
 this.props.getItems()
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
      
      const maxlimit=100;
      var products=this.props.products;
      
      products=products.slice(this.state.Index1,this.state.Index2)
     
    
        return (
            <div>
              <ProductList/>  
            </div>
          );
    }
  
};
const mapStateToProps= state=>{
    return({
        isAuthenticated:state.auth.isAuthenticated,
        isLoading:state.auth.isLoading,
        user:state.auth.user,
        products:state.item.items,
        itemsLoading:state.item.itemsLoading,
        itemsLoaded:state.item.itemsLoaded
        // error:state.error
    })
}


export default connect(mapStateToProps,{getItems,deleteItem})(ProductListPage);