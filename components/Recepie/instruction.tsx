import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export default function Instruction({ text }: { text: string }) {
  const slideUpOpacity = useSharedValue(0);
  const slideUp = useSharedValue(-230);

  const config = {
    duration: 1000,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  useEffect(() => {
    slideUp.value = 1;
    slideUpOpacity.value = 1;
  }, []);

  const stylee = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(slideUp.value) }],
      opacity: withTiming(slideUpOpacity.value, config),
    };
  });
  return (
    <Animated.View style={[stylee, { paddingBottom: 40 }]}>
      <View>
        {/* <View style={style.SecondContainer}>
          <View
            style={{
              padding: 10,
              backgroundColor: "#fff",
              borderRadius: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.4,
              shadowRadius: 10,
              elevation: 100,
            }}
          >
            <Image
              style={style.image}
              source={require("../../assets/instruction.png")}
            />
          </View>

          <View
            style={{
              display: "flex",
              gap: 10,
            }}
          >
            <Text style={{ fontFamily: "Inter-SemiBold", fontSize: 20 }}>
              Instruction
            </Text>
          </View>
        </View> */}
        <Text
          style={{
            paddingVertical: 25,
            fontSize: 16,
            fontFamily: "Inter-SemiBold",
            color: "#6a6a6a",
          }}
        >
          {text}
        </Text>
      </View>
    </Animated.View>
  );
}

const style = StyleSheet.create({
  image: {
    width: 40,
    height: 45,
  },
  itemContainer: {
    borderBottomColor: "#47474733",
    borderBottomWidth: 2,
  },
  item: {
    margin: 15,
    marginHorizontal: 10,
    padding: 5,
    fontSize: 16,
    fontFamily: "Inter-Bold",
  },
  SecondContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
});
