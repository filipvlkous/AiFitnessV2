import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";

export default function FoodBuble({
  list,
  deleteArr,
}: {
  list: string[];
  deleteArr: (int: number) => void;
}): JSX.Element {
  const dashes: JSX.Element[] = [];

  const renderDashes = () => {
    for (let i = 0; i < list.length; i++) {
      dashes.push(
        <TouchableOpacity key={i} onPressOut={() => deleteArr(i)}>
          <View style={styles.dash}>
            <Text style={{ color: "#fff", fontSize: 16 }}>{list[i]}</Text>
            <Avatar.Icon
              style={{
                padding: 0,
                margin: 0,
                backgroundColor: "#76a6b1",
              }}
              size={30}
              color="white"
              icon={"close-circle-outline"}
            />
          </View>
        </TouchableOpacity>
      );
    }
    return dashes;
  };
  return <View style={styles.container}>{renderDashes()}</View>;
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "100%",
    flexWrap: "wrap",
    paddingVertical: 5,
  },
  dash: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#76a6b1",
    paddingLeft: 15,
    paddingRight: 5,
    margin: 5,
    borderRadius: 20,
    paddingVertical: 3,
    position: "relative",
  },
});
