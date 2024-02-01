import React from "react";
import { PantryStackType } from "../../../types/navigatorTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BodyPantryText from "../../../components/Pantry/bodyPantryText";

export default function PantryType({
  navigation,
  route,
}: NativeStackScreenProps<PantryStackType, "PantryType">) {
  const name = route.params.name;
  const data = route.params.data;

  return (
    <BodyPantryText
      navigation={navigation}
      data={data}
      route={route}
      name={name}
    />
  );
}
