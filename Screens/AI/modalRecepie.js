import { useEffect } from "react";
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
import Button from "../../components/ButtonDark";

const heightDim = Dimensions.get("screen").height;
const widthDim = Dimensions.get("screen").width;

export default function ModalRecepie({
  heightVal,
  closeModal,
  visible,
  selectedRecepie,
  onChildData,
}) {
  const slideUpOpacity = useSharedValue(0);
  const slideUpBg = useSharedValue(0);
  const slideUp = useSharedValue(530);

  const handleClick = () => {
    slideUpOpacity.value = 0;
    slideUp.value = 530;
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
    slideUpBg.value = 0.5;
    slideUpOpacity.value = 1;
    slideUp.value = 300;
  }, [visible]);

  const height = heightVal < 3 ? { height: heightDim } : { height: "100%" };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ height: "120%", position: "absolute" }}>
        <Animated.View style={[styles.ModalContainer, style, height]} />
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
          <View>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Inter-SemiBold",
                fontSize: 24,
                paddingBottom: 10,
              }}
            >
              Chose recepie
            </Text>
            <Text
              style={{
                color: "#8b8b8b",
                fontSize: 15,
                fontFamily: "Inter-Regular",
              }}
            >
              Please select which option you would like to have a recepie.
            </Text>
          </View>

          <Text>{selectedRecepie.value}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 15,
              justifyContent: "center",
            }}
          >
            <Button
              title="Option 1"
              style={{ width: "45%" }}
              onPress={() => {
                onChildData("Option 1");
                handleClick();
              }}
            />
            <Button
              title="Option 2"
              style={{ width: "45%" }}
              onPress={() => {
                onChildData("Option 2");
                handleClick();
              }}
            />
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  ModalContainer: {
    backgroundColor: "black", // Apply blue with opacity
    position: "absolute",
    top: 0,
    width: widthDim,
  },
  WhiteContainer: {
    gap: 30,
    padding: 20,
    backgroundColor: "white", // Apply blue with opacity
    borderRadius: 25,
    position: "absolute",
    width: widthDim * 0.9,
    margin: 20,
  },
});
