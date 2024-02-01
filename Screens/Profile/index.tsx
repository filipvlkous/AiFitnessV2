import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ProfileStackType } from "../../types/navigatorTypes";
import ProfileDetails from "./profileDetails";
import ProfileIndex from "./profileIndex";

export default function StackIndex() {
  const Stack = createStackNavigator<ProfileStackType>();

  return (
    <Stack.Navigator
      initialRouteName="Index"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Index" component={ProfileIndex} />
      <Stack.Screen name="Details" component={ProfileDetails} />
    </Stack.Navigator>
  );
}
