import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import PantryItem from "../../../components/Pantry/PantryItem";
export default function Pantry() {
  type TabParamList = {
    Home: undefined;
    Pantry: undefined;
  };

  type ProfileScreenNavigationProp = BottomTabNavigationProp<
    TabParamList,
    "Pantry"
  >;

  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <View style={styles.Container}>
      <Text style={styles.HeadText}>Your Pantry Inventory (1)</Text>

      <View style={styles.PantryContainer}>
        <PantryItem name="Ketchup" id="dsd" />
        <TouchableOpacity onPress={() => navigation.navigate("Pantry")}>
          <View style={styles.PantryDashContainer}>
            <Text style={styles.PantryDashText}>Add Pantry +</Text>
          </View>
        </TouchableOpacity>
      </View>
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
    backgroundColor: "#EAEAEA",
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
