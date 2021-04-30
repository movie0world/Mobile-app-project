import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "../UI/Card";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import firebase from "../../Firebase";
import { TouchableRipple } from "react-native-paper";
const db = firebase.firestore();

const CartItem = (props) => {
  const userid = firebase.auth().currentUser.uid;

  const deleteCartItem = (cartid) => {
    db.collection("cart")
      .doc(userid)
      .collection("cartitem")
      .doc(cartid)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const AddnewDoc = (cartid, type) => {
    db.collection("cart")
      .doc(userid)
      .collection("cartitem")
      .doc(cartid)
      .get()
      .then((d) => {
        let cond;
        if (type == "-") {
          if (d.data().quantity == 1) return;
          cond = d?.data()?.quantity - 1;
        } else cond = d?.data()?.quantity + 1;

        db.collection("cart")
          .doc(userid)
          .collection("cartitem")
          .doc(cartid)
          .update({
            quantity: d.exists ? cond : 1,
          })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      });

    //
  };

  return (
    <Card
      animatedprops={{
        animation: "wobble",
        useNativeDriver: true,
        // delay: props.index * 100,
      }}
      style={{ marginBottom: 20, overflow: "hidden" }}
    >
      <View style={styles.cartItem}>
        <View style={{ marginBottom: 5, alignItems: "flex-end" }}>
          <TouchableWithoutFeedback onPress={() => deleteCartItem(props.id)}>
            <MaterialIcons name="cancel" size={24} color="black" />
          </TouchableWithoutFeedback>
        </View>
        <Image
          source={{ uri: props.imageUrl }}
          resizeMode="cover"
          style={{ width: "100%", height: 130 }}
        />
        <View style={styles.itemData}>
          <Text style={styles.mainText}>{props.title}</Text>
          <Text style={styles.mainText}>${props.price}</Text>
        </View>
        <View style={styles.sec}>
          <TouchableRipple>
            <TouchableNativeFeedback onPress={() => AddnewDoc(props.id, "-")}>
              <Entypo name="minus" size={24} color="black" />
            </TouchableNativeFeedback>
          </TouchableRipple>
          <Text style={styles.quantity}>{props.quantity} </Text>
          <TouchableNativeFeedback onPress={() => AddnewDoc(props.id, "+")}>
            <Entypo name="plus" size={24} color="black" />
          </TouchableNativeFeedback>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  sec: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  cartItem: {
    // marginBottom: 20,
    padding: 10,
    // overflow: "hidden",
    // backgroundColor: "white",
    // flexDirection: "col",
    justifyContent: "space-between",
    // marginHorizontal: 20,
  },
  itemData: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
    marginHorizontal: 20,
  },
  mainText: {
    fontFamily: "open-sans-bold",
    color: "black",
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
