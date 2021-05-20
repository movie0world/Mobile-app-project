import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import CartItem from "./CartItem";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";
import { TouchableRipple } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import firebase from "../../Firebase";

const db = firebase.firestore();
const OrderItem = (props) => {
  const userid = firebase.auth().currentUser.uid;
  const [orderitem, setorderitem] = useState([]);

  const [showDetails, setShowDetails] = useState(false);
  useEffect(() => {
    db.collection("order")
      .doc(userid)
      .collection("orderlist")
      .doc(props.orderid)
      .collection("orderitem")
      .onSnapshot((d) => {
        let temparr = [];
        d.forEach((data) => {
          temparr.push(data.data());
        });
        setorderitem(temparr);
      });
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{ marginBottom: 12 }}
      onPress={() => {
        setShowDetails((prevState) => !prevState);
      }}
    >
      <Card style={styles.orderItem}>
        <View>
          <Text style={styles.date}>{props.orderdate}</Text>
        </View>
        <View style={styles.summary}>
          <Text style={styles.totalAmount}>Total: ${props.total}</Text>
          <Text style={styles.date}>{props.status}</Text>
        </View>

        <AntDesign name={showDetails ? "up" : "down"} size={20} color="black" />

        {showDetails && (
          <View style={styles.detailItems}>
            {orderitem.map((cartItem, index) => {
              return (
                <Card
                  animatedprops={{
                    animation: "zoomIn",
                    // delay: index * 100,
                    useNativeDriver: true,
                  }}
                >
                  <View key={cartItem.productid}>
                    <Image
                      source={{ uri: cartItem.imageUrl }}
                      resizeMode="cover"
                      style={{ width: "100%", height: 130 }}
                    />
                    <View style={{ padding: 8 }}>
                      <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                        {cartItem.name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 8,
                      }}
                    >
                      <Text style={{ fontWeight: "700" }}>Quantity :</Text>
                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 15,
                          marginLeft: 15,
                        }}
                      >
                        {cartItem.quantity}
                      </Text>
                    </View>
                  </View>
                </Card>
                // <CartItem
                //   key={cartItem.productId}
                //   imageUrl={cartItem.imageUrl}
                //   quantity={cartItem.quantity}
                //   amount={cartItem.sum}
                //   title={cartItem.productTitle}
                // />
              );
            })}
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "#888",
  },
  detailItems: {
    width: "100%",
  },
});

export default OrderItem;
