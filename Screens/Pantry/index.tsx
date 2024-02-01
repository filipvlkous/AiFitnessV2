import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { PantryStackType } from "../../types/navigatorTypes";
import PantryType from "./Screens/pantryType";
import Index from "./Screens";

export default function PantryScreenIndex() {
  const Stack = createStackNavigator<PantryStackType>();

  return (
    <Stack.Navigator
      initialRouteName="Index"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Index" component={Index} />
      <Stack.Screen name="PantryType" component={PantryType} />
    </Stack.Navigator>
  );
}
