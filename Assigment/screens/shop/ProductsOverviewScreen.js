import React, { useEffect, useState } from "react";
import {
  FlatList,
  Button,
  Platform,
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";

import firebase from "../../Firebase";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";

import Colors from "../../constants/Colors";

import * as Animatable from "react-native-animatable";
const db = firebase.firestore();

const ProductsOverviewScreen = (props) => {
  const [product, setproduct] = useState([]);
  useEffect(() => {
    db.collection("product").onSnapshot((querySnapshot) => {
      const tempprod = [];
      querySnapshot.forEach((doc) => {
        const prod = { id: doc.id, ...doc.data() };
        tempprod.push(prod);
      });
      setproduct(tempprod);
    });
  }, []);

  const AddnewDoc = (cart) => {
    const userid = firebase.auth().currentUser.uid;

    db.collection("cart")
      .doc(userid)
      .collection("cartitem")
      .doc(cart.id)
      .get()
      .then((d) => {
        db.collection("cart")
          .doc(userid)
          .collection("cartitem")
          .doc(cart.id)
          .set({
            ...cart,
            quantity: d.exists ? d?.data()?.quantity + 1 : 1,
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

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  return (
    <FlatList
      data={product}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => {
        return (
          <ProductItem
            index={itemData.index}
            image={itemData.item.imageUrl}
            title={itemData.item.name}
            price={itemData.item.price}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.name);
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                backgroundColor: "#f0c14b",
                flex: 1,
                paddingVertical: 10,
              }}
              onPress={() => {
                AddnewDoc(itemData.item);
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
        );
      }}
    />
  );
};

export default ProductsOverviewScreen;
