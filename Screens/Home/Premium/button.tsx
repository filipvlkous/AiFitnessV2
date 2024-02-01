import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";

export default function ButtonPremium({
  selected,
  setSelected,
  sale,
  bigText,
  smallText,
  id,
}: {
  setSelected: () => void;
  sale: boolean;
  bigText: string;
  smallText: string;
  id: string;
  selected: string | null;
}) {
  const bgColor =
    selected == id
      ? { backgroundColor: "rgba(8, 167, 203, 0.909)" }
      : { backgroundColor: "#0F5364" };
  const img =
    selected == id
      ? require("../../../assets/EllipseFull.png")
      : require("../../../assets/EllipseEmpty.png");
  return (
    <TouchableOpacity onPress={setSelected}>
      <View style={[style.buttonContainer, bgColor]}>
        <Image source={img} />

        <View>
          <Text style={style.bigButtonText}>{bigText}</Text>
          <Text style={style.smallButtonText}>{smallText}</Text>
        </View>

        {sale ? (
          <View style={style.sale}>
            <Text style={{ fontSize: 13 }}>Save 20%</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  bigButtonText: {
    color: "#fff",
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    paddingBottom: 5,
  },
  smallButtonText: {
    color: "#fff",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-around",
    gap: 30,

    marginBottom: 10,
  },
  sale: {
    backgroundColor: "#D5E3E7",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 14,
  },
});
