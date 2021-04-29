import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";
import * as cartActions from "../../store/actions/cart";
import * as ordersActions from "../../store/actions/orders";
import { FAB, Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

import moment from "moment";

import firebase from "../../Firebase";
import Firebase from "firebase";

const CartScreen = (props) => {
  const db = firebase.firestore();
  const [cart, setcart] = useState([]);
  const userid = firebase.auth().currentUser.uid;
  useEffect(() => {
    db.collection("cart")
      .doc(userid)
      .collection("cartitem")
      .onSnapshot((querySnapshot) => {
        const temparr = [];
        querySnapshot.forEach((doc) => {
          temparr.push(doc.data());
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
        });
        setcart(temparr);
      });
  }, []);

  const requireddata = cart.map((item) => item.id);
  const cartitem = useSelector((state) =>
    state.products.availableProducts.filter((item) =>
      requireddata.includes(item.id)
    )
  );
  const finalcart = cartitem.map((item, index) => {
    const quantity = cart[index].quantity;
    return { ...item, quantity };
  });

  const placeorder = () => {
    let total = finalcart.reduce(
      (total, item) => item.quantity * item.price + total,
      0
    );

    console.log(moment().format("MMMM Do YYYY, h:mm:ss a"));
    db.collection("order")
      .doc(userid)
      .collection("orderlist")
      .add({
        status: "pending",
        total: total,
        order_at: moment().format("MMMM Do YYYY, h:mm:ss a"),
      })
      .then((d) => {
        cart.forEach((item) => {
          db.collection("order")
            .doc(userid)
            .collection("orderlist")
            .doc(d.id)
            .collection("orderitem")
            .add({
              ...item,
            })
            .then(() => {
              cart.forEach((item) => {
                db.collection("cart")
                  .doc(userid)
                  .collection("cartitem")
                  .doc(item.id)
                  .delete();
              });
            });
        });
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View>
        <Card style={styles.summary}>
          <Text style={styles.summaryText}>
            Total:{" "}
            <Text style={styles.amount}>
              $
              {cart.reduce(
                (total, item) => item.quantity * item.price + total,
                0
              )}
            </Text>
          </Text>
        </Card>
      </View>
      <View style={{ marginBottom: 50 }}>
        <FlatList
          ListFooterComponent={<View style={{ height: 25 }}></View>}
          data={cart}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            marginTop: 3,
            paddingHorizontal: 8,
            marginBottom: 50,
          }}
          renderItem={(itemData) => {
            console.log("cart", itemData.item);

            return (
              <CartItem
                quantity={itemData.item.quantity}
                id={itemData.item.id}
                title={itemData.item.name}
                // amount={itemData.item.sum}
                price={itemData.item.price}
                imageUrl={itemData.item.imageUrl}
                deletable
                onRemove={() => {
                  dispatch(cartActions.removeFromCart(itemData.item.productId));
                }}
              />
            );
          }}
        />
      </View>

      <FAB
        style={{
          position: "absolute",
          margin: 16,
          right: -20,
          bottom: -15,
          backgroundColor: "teal",
        }}
        icon="check"
        color="white"
        disabled={cart.length === 0}
        onPress={
          () => placeorder()
          // dispatch(ordersActions.addOrder(cartItems, cartTotalAmount))
        }
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Your Cart",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: { textAlign: "right", color: Colors.primary },
});

export default CartScreen;
