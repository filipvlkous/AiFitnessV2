import React from "react";
import { View, StyleSheet } from "react-native";

interface LoadBarProps {
  percentage: number;
}

const LoadBar: React.FC<LoadBarProps> = ({ percentage }) => {
  const fillPercentage = Math.min(Math.max(0, percentage), 100);

  const barStyle = StyleSheet.create({
    container: {
      width: "50%",
      height: 7,
      backgroundColor: "#d5e3e7",
      borderRadius: 5,
    },
    fill: {
      height: "100%",
      backgroundColor: "#76a6b1",
      borderRadius: 5,
      width: `${fillPercentage}%`,
    },
  });

  return (
    <View style={barStyle.container}>
      <View style={barStyle.fill} />
    </View>
  );
};

export default LoadBar;
