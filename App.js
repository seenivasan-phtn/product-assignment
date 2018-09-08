import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import AppWithNavigationState, { middleware } from "./containers/AppNavigator";
import rootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import {productWatchers} from "./sagas/product";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  {
    productState: { 
    products: [],
    product: {},
    isLoading: false,
    isRefreshing: false,
    page: 1,
    limit:8,
    filterProducts:[]
 }
  },
  applyMiddleware(middleware, sagaMiddleware)
);
sagaMiddleware.run(productWatchers);

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
