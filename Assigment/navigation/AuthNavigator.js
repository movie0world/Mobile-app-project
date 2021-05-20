import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Registration from "../screens/user/Registration";
import Login from "../screens/user/Login";

const AuthStack = createStackNavigator();

export default function MyStack() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Registration"
        component={Registration}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
}
