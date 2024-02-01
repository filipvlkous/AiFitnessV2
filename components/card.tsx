import React from "react";
import { View, StyleSheet } from "react-native";

export default function Card({ children, styles }: any) {
  return <View style={[style.textContainer, styles]}>{children}</View>;
}

const style = StyleSheet.create({
  textContainer: {
    width: "80%",
    backgroundColor: "#E7E7E7",
    borderRadius: 15,
    gap: 10,
    padding: 15,
  },
});
