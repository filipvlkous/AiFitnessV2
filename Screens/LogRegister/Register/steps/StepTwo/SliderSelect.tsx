import Slider from "@react-native-community/slider";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SliderSelect({
  name,
  number,
  setDispatch,
  min,
  max,
  valu,
  val,
}: {
  min: number;
  max: number;
  name: string;
  number: number;
  valu: number;
  val?: string;
  setDispatch: (numb: number) => void;
}) {
  return (
    <View style={{ width: "100%" }}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={[styles.SliderText, { paddingLeft: 20 }]}>{name}</Text>
        <Text style={[styles.SliderText, { paddingLeft: 5 }]}>
          {number.toString()}
        </Text>
        <Text style={[styles.SliderText, { paddingLeft: 2 }]}>{val}</Text>
      </View>
      <Slider
        value={valu}
        onValueChange={(val) => setDispatch(val)}
        style={{ width: "100%", height: "10px" }}
        minimumValue={min}
        maximumValue={max}
        minimumTrackTintColor="#76a6b1"
        maximumTrackTintColor="#FFFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  SliderText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#76a6b1",
    paddingLeft: 20,
  },
});
