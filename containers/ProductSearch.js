import React, { Component } from "react";
import ProductListItem from "../components/ProductListItem";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Alert,
  View,
  Text,
  TextInput
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActionCreators from "../actionCreators/product";
let URI = "http://10.100.100.173:4000";
class ProductSearch extends Component {
  constructor(props) {
    super(props);
    this._onSearch = this._onSearch.bind(this)
  }

  componentDidMount() {
    this.props.actions.getProducts(this.props.page, this.props.limit);
    //this.props.actions.searchProducts(this.props.products, "");
  }

  _getProducts = (page = 1, limit = 8) => {
    this.props.actions.getProducts(page, limit);
  };

  /*  flat list supporting methods */

  _getMore = () => {
    this._getProducts(++this.props.page, this.props.limit);
  };

  _renderItem = ({ index, item }) => {
    return (
      <ProductListItem
        {...this.props}
        id={item.id}
        title={`${item.id} - ${item.title}`}
        image={item.image ? `${URI}/images/${item.image}` : null}
        rating={item.rating}
        price={item.price}
      />
    );
  };

  _keyExtractor = (item, index) => {
    return `${index}`;
  };

  _onRefresh = () => {
    this._getProducts();
  };

  _renderRefreshControl() {
    return (
      <RefreshControl
        onRefresh={this._onRefresh}
        refreshing={this.props.isRefreshing}
        tintColor={"#00ff80"}
        title={"Refreshing..."}
        titleColor={"#00ff80"}
      />
    );
  }

  _onSearch(text) {
    console.log(text);
    let fillterItems = this.props.products.filter((el) =>
    el.title.toLowerCase().indexOf(text.toLowerCase()) > -1
  );
    this.props.actions.searchProducts(fillterItems, text);
  }

  /*  flat list supporting methods - END */

  render() {
    this.props.filterProducts.sort((a,b) => {
        return a.rating - b.rating;
      });
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
        <TextInput
          style={{height:40, borderColor: "black"}}
          placeholder="Type Here..."         
          onChangeText={this._onSearch}
          onClearText={this._onSearch}
        />

        {this.props.isLoading ? (
          <ActivityIndicator color="#0000ff" />
        ) : (
          <FlatList
            data={this.props.filterProducts}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            onEndReachedThreshold={0.5}
            onEndReached={this._getMore}
          />
        ) }
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.productState.products,
    isLoading: state.productState.isLoading,
    isRefreshing: state.productState.isRefreshing,
    page: state.productState.page,
    limit: state.productState.limit,
    filterProducts: state.productState.filterProducts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    ProductSearch
);
