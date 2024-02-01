import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RegisterStackNav } from "../../../../../types/navigatorTypes";
import Button from "../../../../../components/ButtonDark";
import LoadBar from "../loadBar";

export default function StepOne({
  navigation,
}: NativeStackScreenProps<RegisterStackNav>) {
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.InnerCointainer}>
        <LoadBar percentage={25} />
        <Text style={styles.TextStyle}>
          Odpovězte upřímně na náš dotazník, abychom mohli sestavit plán, který
          bude pro tebe nejlepší.
        </Text>
        <Button
          title={"Začneme"}
          onPress={() => navigation.navigate("step2")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    display: "flex",
    alignContent: "center",
    height: "100%",
  },
  InnerCointainer: {
    justifyContent: "space-between",
    height: "100%",
    alignItems: "center",
    marginHorizontal: 40,
  },
  TextStyle: {
    fontSize: 30,
    fontFamily: "Inter-Bold",
    color: "#47646A",
  },
});
