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
import { useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";

const CartItem = (props) => {
  const dispatch = useDispatch();
  return (
    <Card style={{ marginBottom: 20, overflow: "hidden" }}>
      <View style={styles.cartItem}>
        <View style={{ marginBottom: 5, alignItems: "flex-end" }}>
          <TouchableWithoutFeedback
            onPress={() => dispatch(cartActions.removefullitem(props.id))}
          >
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
          <Text style={styles.mainText}>${props?.amount?.toFixed(2)}</Text>
        </View>
        <View style={styles.sec}>
          <TouchableNativeFeedback onPress={props.onRemove}>
            <Entypo name="minus" size={24} color="black" />
          </TouchableNativeFeedback>
          <Text style={styles.quantity}>{props.quantity} </Text>
          <TouchableNativeFeedback
            onPress={() => {
              dispatch(cartActions.addToCart({ ...props, fromcart: true }));
            }}
          >
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
