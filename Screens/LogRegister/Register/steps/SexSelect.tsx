import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function SexSelect({
  ThisSex,
  selectedSex,
  onSexSelect,
  sex,
}: {
  ThisSex: any;
  selectedSex: string;
  onSexSelect: () => void;
  sex: string;
}) {
  return (
    <TouchableOpacity onPress={onSexSelect}>
      <View>
        <View
          style={{
            // flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Image style={styles.ImageShadow} source={ThisSex} />

          {selectedSex == sex ? <View style={styles.circle} /> : null}
        </View>
      </View>
      <Text style={styles.SexText}>{sex}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "#eaf2f3",
    shadowColor: "#47646a",
    shadowOpacity: 0.9,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 5,
    position: "absolute",
  },
  ImageShadow: {
    zIndex: 10,

    // borderRadius: 100,
  },
  SexText: {
    paddingTop: 10,
    textAlign: "center",
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#76a6b1",
  },
  SexContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
  },
});
