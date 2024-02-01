import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { CookBookStackType } from "../../types/navigatorTypes";
import Index from "./Screens";
import Recepie from "../../components/Recepie";

export default function CookBookIndex() {
  const Stack = createStackNavigator<CookBookStackType>();

  return (
    <Stack.Navigator
      initialRouteName="Index"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Index" component={Index} />
      <Stack.Screen name="Recepie" component={Recepie} />
    </Stack.Navigator>
  );
}
