import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { HomeStackType } from "../../types/navigatorTypes";
import Index from "./Screens";
import PremiumIndex from "./Premium";

export default function StackIndex() {
  const Stack = createStackNavigator<HomeStackType>();

  return (
    <Stack.Navigator
      initialRouteName="Index"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Index" component={Index} />
      <Stack.Screen name="Premium" component={PremiumIndex} />
    </Stack.Navigator>
  );
}
