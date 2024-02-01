import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function PantryItem({ name, id }: { name: string; id: string }) {
  return (
    <View style={styles.PantryTextContainer}>
      <Text style={styles.PantryText}>{name}</Text>
      <Text style={{ paddingLeft: 5 }}>
        <Icon name="delete-outline" size={20} color="#fff" />
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  HeadText: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
  },
  Container: {
    paddingTop: 20,
    display: "flex",
  },

  PantryText: {
    color: "#fff",
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
  PantryTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#47646A",
    borderColor: "#47646A",
    borderWidth: 2,
    paddingHorizontal: 23,
    margin: 5,
    borderRadius: 8,
    paddingVertical: 5,
    position: "relative",
  },
  PantryContainer: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "100%",
    flexWrap: "wrap",
  },
  PantryDashContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#47646A",
    borderWidth: 2,
    paddingHorizontal: 23,
    margin: 5,
    borderRadius: 8,
    paddingVertical: 5,
    position: "relative",
    borderStyle: "dashed",
  },
  PantryDashText: {
    color: "#47646A",
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
});
