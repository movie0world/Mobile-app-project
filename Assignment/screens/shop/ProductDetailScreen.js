import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";
import { Ionicons } from "@expo/vector-icons";
import { Badge } from "react-native-paper";

const ProductDetailScreen = (props) => {
  console.log("in product detial", props);
  const productId = props.route.params.productId;
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );
  const dispatch = useDispatch();
  const cartTotalAmount = useSelector((state) => state.cart.items);
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.pop();
        }}
        style={{ position: "absolute", top: 28, zIndex: 2, left: 10 }}
      >
        <Ionicons name="arrow-back-circle-sharp" size={35} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.pop();
        }}
        style={{ position: "absolute", top: 28, zIndex: 2, right: 10 }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.push("Cart")}
          style={{ position: "absolute", top: -5, right: -2, zIndex: 2 }}
        >
          <Badge>{Object.keys(cartTotalAmount).length}</Badge>
        </TouchableOpacity>
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={35}
          color="black"
        />
      </TouchableOpacity>

      <ScrollView>
        <View style={{ backgroundColor: "yellow" }}>
          <Image
            style={styles.image}
            source={{ uri: selectedProduct.imageUrl }}
          />
          <View
            style={{
              justifyContent: "flex-end",
              padding: 10,

              backgroundColor: "teal",
            }}
          >
            <Text style={{ fontSize: 25, textAlign: "center" }}>
              {selectedProduct.title}
            </Text>
          </View>
        </View>
        <View style={styles.actions}>
          <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
          <Button
            color={Colors.primary}
            title="Add to Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(selectedProduct));
            }}
          />
        </View>
        <Card style={{ padding: 15, marginHorizontal: 10, marginVertical: 10 }}>
          <Text>Description</Text>
        </Card>
        <Text style={styles.description}>{selectedProduct.description}</Text>
      </ScrollView>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.productTitle,
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  actions: {
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold",
  },
  description: {
    fontFamily: "open-sans",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
    color: "black",
  },
});

export default ProductDetailScreen;
