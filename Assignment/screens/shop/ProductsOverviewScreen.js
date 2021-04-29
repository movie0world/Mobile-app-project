import React from "react";
import {
  FlatList,
  Button,
  Platform,
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import Colors from "../../constants/Colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ backgroundColor: "#f0c14b", flex: 1, paddingVertical: 10 }}
            onPress={() => {
              // console.log("item detail", itemData.item);
              dispatch(
                cartActions.addToCart({ ...itemData.item, fromcart: false })
              );
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 23,
                color: "teal",
              }}
            >
              Add To Cart
            </Text>
          </TouchableOpacity>
        </ProductItem>
      )}
    />
  );
};

export default ProductsOverviewScreen;
