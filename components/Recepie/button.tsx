import { Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function ButtonTest({
  viewWidth,
  window,
}: {
  viewWidth: number;
  window: boolean;
}) {
  let OFFSET = viewWidth / 2.5;

  const offset = useSharedValue(-40);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const startAnimation = () => {
    offset.value = withTiming(window ? -40 : OFFSET, {
      duration: 400,
    });
  };

  useEffect(() => {
    startAnimation();
  }, [window]);

  if (viewWidth == 0) {
    return <Text>Loading</Text>;
  }

  return (
    <Animated.View
      style={[styles.box, animatedStyles, { width: viewWidth / 2 }]}
    />
  );
}
const styles = StyleSheet.create({
  box: {
    position: "absolute",
    height: 53,
    backgroundColor: "#000",
    borderRadius: 15,
    marginBottom: 30,
  },
});
