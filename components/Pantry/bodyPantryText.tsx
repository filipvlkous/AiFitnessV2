import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import SafeAreView from "../SafeAreView";
import PantryItem from "./PantryItem";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PantryStackType } from "../../types/navigatorTypes";
import { ModalAddItem } from "./modalAddItem";
// import { deletePantry } from "../../Screens/Pantry/serverCall";
import { deletePantry } from "../../Server/pantry";
import { RootState } from "../../redux/store/testStore";
import { useSelector } from "react-redux";

export default function BodyPantryText({
  navigation,
  route,
  name,
}: NativeStackScreenProps<PantryStackType> & {
  name: string;
}) {
  const [openModal, setOpenModal] = useState(false);
  const reduxData = useSelector((state: RootState) => state.counterReducer);

  const LoginPress = () => {
    setOpenModal(!openModal);
  };

  const data = PantryStorage(name, reduxData);
  return (
    <SafeAreView
      style={{
        height: "100%",
        backgroundColor: "#FFFEFC",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          position: "relative",
          paddingVertical: 20,
        }}
      >
        <TouchableOpacity
          style={{ position: "absolute", zIndex: 15, top: 10 }}
          onPress={() => navigation.goBack()}
        >
          <Text>
            <Icon name="chevron-left" size={50} color="#47646A" />
          </Text>
        </TouchableOpacity>
        <Text style={styles.HeadText}>{name}</Text>
      </View>

      <View style={styles.Container}>
        <Text style={styles.SecondText}>
          {name} má celkem {data?.length} položek
        </Text>

        <View style={styles.PantryContainer}>
          {data?.map((m) => {
            return (
              <TouchableOpacity
                key={m.id}
                onPress={() => deletePantry(name, m.id)}
              >
                <PantryItem name={m.name} id={m.id} />
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity onPress={LoginPress}>
            <View style={styles.PantryDashContainer}>
              <Text style={styles.PantryDashText}>Přidat položky +</Text>
            </View>
          </TouchableOpacity>
        </View>
        {openModal ? (
          <View style={{ position: "absolute", top: 0 }}>
            <ModalAddItem option={name} closeModal={LoginPress} />
          </View>
        ) : null}
      </View>
    </SafeAreView>
  );
}

const PantryStorage = (name: string, data: any) => {
  let value;

  switch (name) {
    case "Lednice":
      value = data.fridge;
      if (data.fridge == undefined) {
        value = "Loading...";
      }
      break;
    case "Mrazák":
      value = data.freezer;
      if (data.freezer == undefined) {
        value = "Loading...";
      }
      break;
    case "Police a skříně":
      value = data.storage;
      if (data.storage == undefined) {
        value = "Loading...";
      }
      break;
    case "Ostatní":
      value = data.other;
      if (data.storage == undefined) {
        value = "Loading...";
      }
      break;
  }

  return value;
};

const styles = StyleSheet.create({
  HeadText: {
    fontSize: 26,
    fontFamily: "Inter-Bold",
    textAlign: "center",
    width: "100%",
  },
  SecondText: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
  },
  Container: {
    paddingTop: 20,
    display: "flex",
    paddingHorizontal: 20,
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
