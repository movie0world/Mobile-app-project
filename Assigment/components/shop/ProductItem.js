import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import Card from "../UI/Card";
import * as Animatable from "react-native-animatable";
const ProductItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card
      style={styles.product}
      animatedprops={{
        animation: "jello",
        // duration: 10000,
        // useNativeDriver: true,
        // delay: props.index * 100,
      }}
    >
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Animatable.Image
                animation="zoomIn"
                delay={1000}
                style={styles.image}
                source={{ uri: props.image }}
              />
            </View>
            <View style={styles.details}>
              <Animatable.Text
                animation="fadeInRight"
                delay={1000}
                style={styles.title}
              >
                {props.title}
              </Animatable.Text>
              <Animatable.Text
                animation="fadeInUp"
                delay={1000}
                style={styles.price}
              >
                ${props.price}
              </Animatable.Text>
            </View>
            <View style={styles.actions}>{props.children}</View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 25,
    // elevation: 5,
    // color: "blue",
    // shadowColor: "blue",
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    alignItems: "center",
    height: "17%",
    padding: 10,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 2,
  },
  price: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    // alignSelf: "stretch",
    // justifyContent: "space-around",

    alignItems: "center",
    // width: "100%",
    marginTop: 15.5,
    height: "18%",
    // paddingHorizontal: 20,
  },
});

export default ProductItem;
