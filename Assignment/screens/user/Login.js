import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  TouchableNativeFeedback,
} from "react-native";
import {
  Button,
  Divider,
  TextInput,
  TouchableRipple,
} from "react-native-paper";

import * as yup from "yup";
import { Formik, useFormikContext } from "formik";

let userschema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});

import firebase from "../../Firebase";
export default function Login(props) {
  const [error, seterror] = useState("");
  const submit = (value, action) => {
    seterror("");
    firebase
      .auth()
      .signInWithEmailAndPassword(value.email, value.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        action.resetForm();
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        seterror(errorMessage);

        // ..
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ padding: 10, backgroundColor: "teal", marginTop: 25 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
          Login
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{ justifyContent: "center", flexGrow: 1 }}
        style={{
          width: "100%",
          height: 500,
          paddingHorizontal: 10,

          //   backgroundColor: "yellow",
          //   alignItems: "center",
        }}
      >
        <Formik
          validationSchema={userschema}
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={submit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <View style={{ justifyContent: "space-between" }}>
              <Text style={{ color: "red", marginBottom: 15 }}>
                {" "}
                {error && error}
              </Text>

              <TextInput
                style={!errors.email && { marginBottom: 15 }}
                mode="outlined"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Enter your Email"
                theme={{
                  colors: {
                    primary: "teal",
                    placeholder: "teal",
                    background: "white",
                  },
                }}
                selectionColor="teal"
                underlineColor="teal"
                label="Email"
              />
              {errors.email && touched.email && (
                <Text style={{ color: "red", marginBottom: 15 }}>
                  {" "}
                  {errors.email}
                </Text>
              )}
              <TextInput
                style={!errors.password && { marginBottom: 15 }}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                mode="outlined"
                placeholder="Please Enter your Password"
                theme={{
                  colors: {
                    primary: "teal",
                    placeholder: "teal",
                    background: "white",
                  },
                }}
                selectionColor="teal"
                underlineColor="teal"
                label="Password"
              />
              {errors.password && touched.password && (
                <Text style={{ color: "red", marginBottom: 15 }}>
                  {errors.password}
                </Text>
              )}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <TouchableRipple>
                  <Button
                    style={{
                      padding: 8,
                      paddingHorizontal: 15,
                      backgroundColor: "teal",
                    }}
                    compact
                    mode="contained"
                    onPress={handleSubmit}
                  >
                    SignIN
                  </Button>
                </TouchableRipple>
              </View>
            </View>
          )}
        </Formik>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <Text>
            Don't have account ?
            <TouchableNativeFeedback
              onPress={() => props.navigation.replace("Registration")}
            >
              <Text
                style={{ color: "teal", fontWeight: "bold", paddingTop: 5 }}
              >
                Sign Up
              </Text>
            </TouchableNativeFeedback>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({});
