import React from "react";
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

const CartScreen = (props) => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        title: state.cart.items[key].productTitle,
        price: state.cart.items[key].productPrice,
        imageUrl: state.cart.items[key].productImage,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View>
        <Card style={styles.summary}>
          <Text style={styles.summaryText}>
            Total:{" "}
            <Text style={styles.amount}>
              ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
            </Text>
          </Text>
        </Card>
      </View>
      <View style={{ marginBottom: 50 }}>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          contentContainerStyle={{
            marginTop: 3,
            paddingHorizontal: 8,
          }}
          renderItem={(itemData) => {
            console.log("cart", itemData.item);

            return (
              <CartItem
                quantity={itemData.item.quantity}
                id={itemData.item.productId}
                title={itemData.item.title}
                amount={itemData.item.sum}
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
          right: 0,
          bottom: 0,
          backgroundColor: "teal",
        }}
        icon="check"
        color="white"
        disabled={cartItems.length === 0}
        onPress={() =>
          dispatch(ordersActions.addOrder(cartItems, cartTotalAmount))
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
