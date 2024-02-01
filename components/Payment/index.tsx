import React from "react";
import {
  Keyboard,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CheckoutScreen from "../Payment/test";
import CheckoutScreen2 from "./test2";

export default function PremiumScreen() {
  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>index</Text>
          {/* <CheckoutScreen /> */}
          <CheckoutScreen2 />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
