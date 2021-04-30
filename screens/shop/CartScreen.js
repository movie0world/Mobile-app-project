import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";

import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";

import { FAB, Button } from "react-native-paper";

const { width, height } = Dimensions.get("window");

import moment from "moment";

import firebase from "../../Firebase";

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
        });
        setcart(temparr);
      });
  }, []);

  const placeorder = () => {
    let total = cart.reduce(
      (total, item) => item.quantity * item.price + total,
      0
    );

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
            return (
              <CartItem
                quantity={itemData.item.quantity}
                id={itemData.item.id}
                title={itemData.item.name}
                // amount={itemData.item.sum}
                price={itemData.item.price}
                imageUrl={itemData.item.imageUrl}
                deletable
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
        onPress={() => placeorder()}
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
