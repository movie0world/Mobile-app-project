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
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";
import Colors from "../../constants/Colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import CartItem from "../../models/cart-item";

const db = firebase.firestore();

const ProductsOverviewScreen = (props) => {
  const dispatch = useDispatch();
  const [product, setproduct] = useState([]);
  useEffect(() => {
    db.collection("product").onSnapshot((querySnapshot) => {
      const tempprod = [];
      querySnapshot.forEach((doc) => {
        const prod = { id: doc.id, ...doc.data() };
        tempprod.push(prod);
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
      });
      setproduct(tempprod);
    });
  }, []);
  dispatch(productActions.addProduct(product));
  // console.log("itno product", product);
  // console.log(product);

  const AddnewDoc = (cart) => {
    const userid = firebase.auth().currentUser.uid;
    // console.log("user id", userid);
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

  const products = useSelector((state) => state.products.availableProducts);

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
        // console.log("from flat list", itemData);
        return (
          <ProductItem
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

                // console.log("item detail", itemData.item);

                // dispatch(
                //   cartActions.addToCart({ ...itemData.item, fromcart: false })
                // );
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
