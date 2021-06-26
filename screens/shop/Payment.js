import React, { useState } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
var stripe = require("stripe-client")(
  "pk_test_51HQ9l9Bl9xvRzSgF4XvG4gBXqc3CVKZInopwgCbk65afFSNC2PFY0jQEAhrheGkFJ7U9OeFABi1OnSbgjHfjddWQ00TX0dcQWl"
);

import { CreditCardInput } from "react-native-credit-card-input-view";
import { Button, FAB, Snackbar } from "react-native-paper";
// import { ScrollView } from "react-navigation";
import firebase from "../../Firebase";

import moment from "moment";
const Payment = (props) => {
  //   console.log(props);
  const db = firebase.firestore();
  const [cardstats, setcardstats] = useState("");
  const [loading, setloading] = useState(false);
  const [visible, setvisible] = useState(false);
  const [token, settoken] = useState("");
  const userid = firebase.auth().currentUser.uid;

  const _createtoken = async () => {
    setvisible(false);
    setloading(true);
    const str = cardstats.values.expiry;

    const words = str.split("/");
    var card = await stripe.createToken({
      card: {
        number: cardstats.values.number,
        exp_month: words[0],
        exp_year: 20 + words[1],
        cvc: cardstats.values.cvc,
      },
    });
    settoken(card.id);
    console.log(props.route.params);
    console.log("Token", token);
    let { total, cart } = props.route.params;
    console.log("called");
    if (token) {
      console.log("inside");
      db.collection("order")
        .doc(userid)
        .collection("orderlist")
        .add({
          status: "pending",
          total,
          order_at: moment().format("MMMM Do YYYY, h:mm:ss a"),
        })
        .then((d) => {
          cart.forEach((item) => {
            db.collection("order")
              .doc(userid)
              .collection("orderlist")
              .doc(d.id)
              .collection("orderitem")
              .add({
                ...item,
              })
              .then(() => {
                cart.forEach((item) => {
                  db.collection("cart")
                    .doc(userid)
                    .collection("cartitem")
                    .doc(item.id)
                    .delete();
                });
              });
          });
          props.navigation.reset({
            index: 0,
            routes: [{ name: "Orders" }],
          });
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
      setloading(false);
      setvisible(true);
    }
  };
  return (
    <View style={{ marginTop: 23, flexGrow: 1, backgroundColor: "#fff" }}>
      {loading && (
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 1,
            backgroundColor: "rgba(0,0,0,0.7)",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="teal" />
        </View>
      )}
      <Snackbar
        o
        duration={500}
        onDismiss={() => {
          setvisible(false);
        }}
        visible={visible}
        action={{
          label: "Try Again",
          onPress: () => {
            _createtoken();
          },
        }}
      >
        Something Went Wrong Please Try Again
      </Snackbar>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <CreditCardInput
            requiresName
            autoFocus
            labelStyle={{ color: "teal" }}
            inputStyle={{ color: "teal" }}
            useVertical
            allowScroll
            inputContainerStyle={{ borderColor: "teal", borderBottomWidth: 2 }}
            onChange={(data) => {
              //   console.log(data);
              setcardstats(data);
              console.log(cardstats.valid);
            }}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Button
            mode="contained"
            style={{
              marginTop: 10,
              marginBottom: 13,
              backgroundColor: "teal",
              width: "35%",
            }}
            disabled={!cardstats.valid}
            onPress={_createtoken}
          >
            Check Out
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default Payment;
