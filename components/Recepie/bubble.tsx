import { View, Text } from "react-native";
import React from "react";

export default function Bubble({ txt }: { txt: string }) {
  return (
    <View style={{ backgroundColor: "#76A6B1", borderRadius: 8 }}>
      <Text
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 8,
          textAlign: "center",
          fontSize: 13,
          fontFamily: "Inter-SemiBold",
        }}
      >
        {txt}
      </Text>
    </View>
  );
}
