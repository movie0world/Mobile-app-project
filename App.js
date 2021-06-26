import React, { useState } from "react";
import { createStore, combineReducers } from "redux";
// import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import firebase from "./Firebase";
// import productsReducer from "./store/reducers/products";
// import cartReducer from "./store/reducers/cart";
// import ordersReducer from "./store/reducers/orders";
import ShopNavigator from "./navigation/ShopNavigator";
import Auth from "./navigation/AuthNavigator";
import Login from "./screens/user/Login";
import Registration from "./screens/user/Registration";
import { NavigationContainer } from "@react-navigation/native";
// import { CreditCardInput } from "react-native-payment-card";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

import { color } from "react-native-reanimated";

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [user, setuser] = useState(false);
  const [loading, setloading] = useState(false);

  const gettoken = async () => {};
  React.useEffect(() => {
    gettoken();
  }, []);

  React.useEffect(() => {
    setloading(true);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;

        setuser(true);
        setloading(false);
      } else {
        setuser(false);
        setloading(false);
      }
    });
    return () => {};
  }, [user]);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onError={(err) => console.log(err)}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {!fontLoaded && <Image source={{ uri: require("./assets/Ecom.png") }} />}
      {/* // or */}
      {/* <LiteCreditCardInput onChange={this._onChange} /> */}
      {/* <CreditCardInput
        autoFocus
        // requiresName
        allowScroll
        values={{ cardtype: "Debit" }}
        requiresCVC
        validColor={"black"}
        invalidColor={"red"}
        placeholderColor={"darkgray"}
        onChange={(item) => console.log("data", item)}
      /> */}
      <NavigationContainer>
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="teal" />
          </View>
        ) : user ? (
          <ShopNavigator />
        ) : (
          <Auth />
        )}
      </NavigationContainer>
    </View>
  );
}
