import React, { useState } from "react";
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

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{ marginBottom: 12 }}
      onPress={() => {
        console.log("called");
        setShowDetails((prevState) => !prevState);
      }}
    >
      <Card style={styles.orderItem}>
        <View style={styles.summary}>
          <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
          <Text style={styles.date}>{props.date}</Text>
        </View>

        <AntDesign name={showDetails ? "up" : "down"} size={20} color="black" />

        {showDetails && (
          <View style={styles.detailItems}>
            {props.items.map((cartItem) => {
              console.log(cartItem);
              return (
                <Card>
                  <View>
                    <Image
                      source={{ uri: cartItem.imageUrl }}
                      resizeMode="cover"
                      style={{ width: "100%", height: 130 }}
                    />
                    <View style={{ padding: 8 }}>
                      <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                        {cartItem.title}
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
