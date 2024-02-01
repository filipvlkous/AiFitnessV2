import React, { FC } from "react";
import { View, StyleSheet } from "react-native";

interface DashedLineComponentProps {
  numberOfDashes: number;
}

const DashedLineComponent: FC<DashedLineComponentProps> = ({
  numberOfDashes,
}) => {
  const renderDashes = () => {
    const dashes = [];
    for (let i = 1; i <= 4; i++) {
      const dashColor = i <= numberOfDashes ? "#76a6b1" : "#dfdfdf";
      dashes.push(
        <View key={i} style={[styles.dash, { backgroundColor: dashColor }]} />
      );
    }
    return dashes;
  };

  return <View style={styles.container}>{renderDashes()}</View>;
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dash: {
    width: 50,
    height: 3,
    marginHorizontal: 5,
    borderRadius: 15,
  },
});

export default DashedLineComponent;
