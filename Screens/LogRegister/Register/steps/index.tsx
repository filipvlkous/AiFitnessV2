import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StepOne from "./StepOne/stepOne";
import StepTwo from "./StepTwo/stepTwo";
import StepThree from "./StepThree";
import StepFour from "./SetpFour";
import StepFive from "./StepFive";
const Stack = createNativeStackNavigator();

export default function RegisterIndex() {
  return (
    <Stack.Navigator
      initialRouteName="step1"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="step1" component={StepOne} />
      <Stack.Screen name="step2" component={StepTwo} />
      <Stack.Screen name="step3" component={StepThree} />
      <Stack.Screen name="step4" component={StepFour} />
      <Stack.Screen name="step5" component={StepFive} />
    </Stack.Navigator>
  );
}
