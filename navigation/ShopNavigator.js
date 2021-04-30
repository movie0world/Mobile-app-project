import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import { Button, Image, Platform, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../Firebase";

import Colors from "../constants/Colors";

import { AntDesign } from "@expo/vector-icons";
import ProductsOverviewScreen, {
  screenOptions as productsOverviewScreenOptions,
} from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen, {
  screenOptions as productDetailScreenOptions,
} from "../screens/shop/ProductDetailScreen";
import CartScreen, {
  screenOptions as cartScreenOptions,
} from "../screens/shop/CartScreen";
import OrdersScreen, {
  screenOptions as ordersScreenOptions,
} from "../screens/shop/OrdersScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import { Badge } from "react-native-paper";
const ProductsStackNavigator = createStackNavigator();
const ProductsNavigator = () => {
  // const cartTotalAmount = useSelector((state) => state.cart.items);
  const userid = firebase.auth().currentUser.uid;
  const [cartcount, setcartcount] = useState(0);
  const db = firebase.firestore();
  useEffect(() => {
    db.collection("cart")
      .doc(userid)
      .collection("cartitem")
      .onSnapshot((querySnapshot) => {
        let testarr = [];
        querySnapshot.forEach((doc) => testarr.push(doc.data()));
        setcartcount(testarr.length);
      });
  }, []);

  const detailscreenOptions = (navData) => {
    return {
      headerTitle: "All Products",
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <View>
          <View style={{ position: "absolute", top: -5, right: 5, zIndex: 2 }}>
            <Badge>{cartcount}</Badge>
          </View>
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Cart"
              iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              onPress={() => {
                // console.log("cart item", Object.keys(cartTotalAmount).length);
                navData.navigation.navigate("Cart");
              }}
            />
          </HeaderButtons>
        </View>
      ),
    };
  };

  return (
    <ProductsStackNavigator.Navigator screenOptions={{ ...defaultNavOptions }}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={detailscreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ ...productDetailScreenOptions, headerShown: false }}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

const OrdersStackNavigator = createStackNavigator();

const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

const AdminStackNavigator = createStackNavigator();
const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={userProductsScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};
import { SafeAreaView } from "react-navigation";
import { Avatar } from "react-native-paper";

const ShopDrawerNavigator = createDrawerNavigator();

const ShopNavigator = () => {
  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <View style={{ flex: 1, paddingTop: 0 }}>
              <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
                <View
                  style={{
                    flex: 1,
                    height: 155,
                    borderTopWidth: 2,
                    borderColor: "teal",
                    backgroundColor: "#66b2b2",
                    borderBottomWidth: 2,
                    marginBottom: 10,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      style={{
                        width: 60,
                        height: 60,
                        marginLeft: 15,
                        marginTop: 15,
                        borderRadius: 60 / 2,
                      }}
                      source={{
                        uri:
                          "https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg",
                      }}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: 15,
                        alignItems: "center",
                        marginTop: 15,
                      }}
                    >
                      <Text style={{ fontSize: 15 }}>HELLO ,</Text>
                      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        {" "}
                        {firebase?.auth().currentUser.displayName}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 15,
                      marginTop: 15,
                      alignItems: "center",
                    }}
                  >
                    <AntDesign name="edit" size={24} color="teal" />
                    <Text
                      style={{
                        color: "white",
                        marginLeft: 15,
                        borderBottomColor: "white",
                        borderBottomWidth: 2,
                      }}
                    >
                      Edit Profile
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 15,
                      marginTop: 8,
                      marginBottom: 10,
                    }}
                  >
                    <Text>{firebase?.auth().currentUser.email}</Text>
                  </View>
                </View>

                <DrawerItemList {...props} />
                <Button
                  title="Logout"
                  color={Colors.primary}
                  onPress={() => {
                    firebase.auth().signOut();
                  }}
                />
              </SafeAreaView>
            </View>
          </DrawerContentScrollView>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
    >
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

export default ShopNavigator;
