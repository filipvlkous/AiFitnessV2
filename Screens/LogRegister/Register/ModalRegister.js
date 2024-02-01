import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withSpring,
} from "react-native-reanimated";
import { Button as PaperButton } from "react-native-paper";
import RegisterForm from "./formRegister";

export default function ModalRegister({ closeModal, navigation }) {
  const slideUpOpacity = useSharedValue(0);
  const slideUpBg = useSharedValue(0);
  const slideUp = useSharedValue(500);

  const handleClick = () => {
    slideUpOpacity.value = 0;
    slideUp.value = 500;
    slideUpBg.value = 0;

    Keyboard.dismiss();
    setTimeout(() => closeModal(), 500);
  };
  const config = {
    duration: 200,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      opacity: withTiming(slideUpBg.value, config),
    };
  });
  const stylee = useAnimatedStyle(() => {
    return {
      opacity: withTiming(slideUpOpacity.value, config),
      transform: [{ translateY: withSpring(slideUp.value) }],
    };
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        slideUp.value = -100;
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        slideUp.value = 80;
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    slideUpBg.value = 0.5;
    slideUpOpacity.value = 1;
    slideUp.value = 100;
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ position: "relative" }}>
        <Animated.View style={[styles.ModalContainer, style]}></Animated.View>

        <Animated.View style={[styles.WhiteContainer, stylee]}>
          <TouchableOpacity
            style={{ position: "absolute", right: 5, top: 20, zIndex: 20 }}
            onPress={handleClick}
          >
            <PaperButton
              labelStyle={{ fontSize: 40 }}
              theme={{ colors: { primary: "#597d85" } }}
              icon={"close-circle-outline"}
            />
          </TouchableOpacity>

          <Text
            style={{
              textAlign: "center",
              fontFamily: "Inter-SemiBold",
              fontSize: 24,
              paddingBottom: 10,
            }}
          >
            Vytvořit účet
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Inter-Regular",
              color: "#8b8b8b",
            }}
          >
            Jsme rádi, že se k nám připojíte!
          </Text>
          <RegisterForm navigation={navigation} />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const heightDim = Dimensions.get("screen").height;
const widthDim = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  ModalContainer: {
    height: heightDim,
    backgroundColor: "black", // Apply blue with opacity
    opacity: 1,
    borderRadius: 45,
    position: "absolute",
    bottom: 0,
    width: widthDim,
  },
  WhiteContainer: {
    padding: 20,
    height: heightDim / 1.25,
    backgroundColor: "white", // Apply blue with opacity
    opacity: 1,
    borderRadius: 45,
    position: "absolute",
    bottom: -90,

    width: widthDim,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    position: "relative",
  },
});
