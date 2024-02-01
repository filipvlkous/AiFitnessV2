import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackType } from "../../types/navigatorTypes";
import firebase from "../../initFirebase";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ProfileIndex({
  navigation,
  route,
}: NativeStackScreenProps<ProfileStackType>) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        // Paddings to handle safe area
        paddingTop: insets.top,
        paddingHorizontal: 20,
        paddingBottom: 25,
      }}
    >
      <Text style={style.TextStyle}>Profil</Text>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Details")}
          style={style.buttonContainer}
        >
          <ButtonProfile
            h1={"Detaily uživatele"}
            h2={
              " Nastavte si své potravinové preference, alergie, cíle a další údaje pro přesnější výsledky."
            }
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={style.SignOutBtn}
        onPress={() => firebase.auth().signOut()}
      >
        <Icon name="logout-variant" size={35} color="#000" />

        <Text style={{ fontSize: 20, fontFamily: "Inter-Bold" }}>
          Odhlásit se
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const ButtonProfile = ({ h1, h2 }: { h1: string; h2: string }) => {
  return (
    <>
      <View style={style.textLogoContainer}>
        <Icon name="account-settings-outline" size={35} color="#47646A" />

        <Text
          style={{
            fontSize: 20,
            color: "#47646A",
            fontFamily: "Inter-SemiBold",
          }}
        >
          {h1}
        </Text>
      </View>
      <Text
        style={{ color: "#99948C", fontSize: 14, fontFamily: "Inter-Regular" }}
      >
        {h2}
      </Text>
    </>
  );
};

const style = StyleSheet.create({
  buttonContainer: {
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#76a6b135",
    display: "flex",
    gap: 10,
    marginTop: 20,
  },
  textLogoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    gap: 15,
  },
  TextStyle: {
    fontSize: 30,
    fontFamily: "Inter-SemiBold",
    color: "#000000",
    zIndex: 10,
  },
  SignOutBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 25,
    paddingVertical: 10,
  },
});
