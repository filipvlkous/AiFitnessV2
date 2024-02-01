import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import { HomeStackType } from "../../../types/navigatorTypes";

type homeScreenProp = StackNavigationProp<HomeStackType, "Index">;

export default function GoPremium() {
  const navigation = useNavigation<homeScreenProp>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Premium")}>
      <View style={styles.ButtonPremiumContainer}>
        <Image
          style={styles.PremiumImg}
          source={require("../../../assets/GoPremium.png")}
        />
        <View style={styles.PremiumTxt}>
          <Text style={styles.GoPremiumText}>Go Premium</Text>
          <Text style={styles.PremiumText}>
            Vylepšete na premium,{"\n"}a užívejte si víc funkcí
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ButtonPremiumContainer: {
    position: "relative",
    marginTop: 20,
    height: 120,
    backgroundColor: "#126477",
    width: "100%",
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    // alignItems: "baseline",
    justifyContent: "flex-end",
  },
  GoPremiumText: {
    color: "#E5B973",
    fontFamily: "Inter-Bold",
    fontSize: 20,
    paddingBottom: 5,
  },
  PremiumText: {
    lineHeight: 22,
    color: "white",
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
  },
  PremiumImg: {
    position: "absolute",
    left: 5,
    bottom: 0,
    width: 180,
    height: 110,
  },
  PremiumTxt: {
    height: "100%",
    marginRight: 10,
    justifyContent: "center",
  },
});
