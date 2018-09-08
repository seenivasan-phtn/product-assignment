import { createStackNavigator, createBottomTabNavigator } from "react-navigation";
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";
import { connect } from "react-redux";
import React from "react";

import { Ionicons } from "@expo/vector-icons"
import ProductListWithFlatList from "./ProductListWithFlatList";
import ProductSearch from "./ProductSearch";

const ListStack = createStackNavigator(
  {
    List: {
      screen: ProductListWithFlatList
    }
  },
  {
    initialRouteName: "List",
    navigationOptions: {
      title: "Product Manager",
      headerStyle: {
        backgroundColor: "blue"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center"
      }
    }
  }
);

const SearchStack = createStackNavigator(
  {
    Search: {
      screen: ProductSearch
    }
  },
  {
    initialRouteName: "Search",
    navigationOptions: {
      title: "Product Search",
      headerStyle: {
        backgroundColor: "blue"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center"
      }
    }
  }
);

export const AppNavigator = createBottomTabNavigator(
  {
    List: ListStack,
    Search: SearchStack
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "List") {
          iconName = `ios-list-box${focused ? "list-ul" : "-outline"}`;
        } else if (routeName === "Search") {
          iconName = `ios-list-box${focused ? "search" : "-outline"}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "brown",
      inactiveTintColor: "gray"
    }
  }
);

export const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.navState
);
const addListener = createReduxBoundAddListener("root");

class App extends React.Component {
  render() {
    return (
      <AppNavigator
        navigation={{
          dispatch: this.props.dispatch,
          state: this.props.navState,
          addListener
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  navState: state.navState
});

const AppWithNavigationState = connect(mapStateToProps)(App);

export default AppWithNavigationState;
