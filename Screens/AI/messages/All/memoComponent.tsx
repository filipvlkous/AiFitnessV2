import { useMemo } from "react";
import {
  GestureResponderEvent,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  View,
} from "react-native";
import TypeWriter from "react-native-typewriter";
import Card from "../../../../components/card";
import React from "react";

const ChildComponent = ({
  index,
  keyValue,
  value,
  setModal,
}: {
  index: number;
  keyValue: string;
  value: string;
  setModal: (event: GestureResponderEvent) => void;
}) => {
  let testImage = null;
  let name: string | null = null;
  switch (keyValue.toLowerCase()) {
    case "snídaně":
      testImage = require("../../../../assets/icons/brekfast.png");
      name = "Snídaně";
      break;
    case "oběd":
      testImage = require("../../../../assets/icons/lunch.png");
      name = "Oběd";
      break;
    case "večeře":
      testImage = require("../../../../assets/icons/dinner.png");
      name = "Večeře";
      break;
    case "svačina":
      name = "Svačina";
      testImage = require("../../../../assets/icons/snack.png");
      break;
    case "svačina2":
      name = "Svačina";
      testImage = require("../../../../assets/icons/snack.png");
      break;
    default:
      break;
  }

  if (name != null) {
    return (
      <TouchableOpacity key={index} onPress={setModal}>
        <Card styles={{ width: 300, marginHorizontal: 20, minHeight: 200 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingRight: 20,
            }}
          >
            <Text style={styles.TextStyle}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Text>
            {testImage != null ? (
              <Image source={testImage} style={{ width: 45, height: 45 }} />
            ) : null}
          </View>

          <TypeWriter typing={1} maxDelay={50}>
            <Text style={{ fontSize: 15, fontFamily: "Inter-Regular" }}>
              {value}
            </Text>
          </TypeWriter>
        </Card>
      </TouchableOpacity>
    );
  } else {
    return <Text>Loading</Text>;
  }
};

export const MemoizedChildComponent = ({
  index,
  keyValue,
  value,
  setModal,
}: {
  index: number;
  keyValue: string;
  value: string;
  setModal: (event: GestureResponderEvent) => void;
}) =>
  useMemo(
    () => (
      <ChildComponent
        index={index}
        keyValue={keyValue}
        value={value}
        setModal={setModal}
      />
    ),
    []
  );

const styles = StyleSheet.create({
  TextStyle: {
    fontSize: 20,
    fontFamily: "Inter-SemiBold",
    color: "#000",
  },
});
