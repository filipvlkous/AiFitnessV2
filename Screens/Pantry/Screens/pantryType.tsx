import React from "react";
import { PantryStackType } from "../../../types/navigatorTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BodyPantryText from "../../../components/Pantry/bodyPantryText";

export default function PantryType({
  navigation,
  route,
}: NativeStackScreenProps<PantryStackType, "PantryType">) {
  const name = route.params.name;

  return <BodyPantryText navigation={navigation} route={route} name={name} />;
}
