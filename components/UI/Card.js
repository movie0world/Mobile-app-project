import React from "react";
import { View, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
const Card = (props) => {
  return (
    <Animatable.View
      {...props.animatedprops}
      style={{ ...styles.card, ...props.style }}
    >
      {props.children}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "yellow",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
});

export default Card;
