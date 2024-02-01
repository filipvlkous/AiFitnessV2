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
import Button from "../../components/ButtonDark";
import { savePantryRecepie } from "../../Server/recepies";

const heightDim = Dimensions.get("screen").height;
const widthDim = Dimensions.get("screen").width;

export default function ModalPantry({
  heightVal,
  closeModal,
  visible,
  modalData,
}: {
  heightVal: number;
  closeModal: () => void;
  visible: boolean;
  modalData:
    | {
        ingredients: string;
        name: string;
        instructions: string;
      }
    | undefined;
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

  const onSaveRecepie = () => {
    if (modalData != undefined) savePantryRecepie(modalData);
  };

  useEffect(() => {
    slideUpBg.value = 0.5;
    slideUpOpacity.value = 1;
    slideUp.value = 50;
  }, [visible]);

  const height = heightVal < 3 ? { height: heightDim } : { height: "100%" };
  if (modalData == undefined) return <Text>Loading</Text>;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ height: "120%", position: "absolute" }}>
        <Animated.View style={[styles.ModalContainer, style, height]} />
        <Animated.View style={[styles.WhiteContainer, stylee]}>
          <TouchableOpacity
            style={{ position: "absolute", right: 0, top: 15, zIndex: 20 }}
            onPress={handleClick}
          >
            <PaperButton
              labelStyle={{ fontSize: 40 }}
              theme={{ colors: { primary: "#597d85" } }}
              icon={"close-circle-outline"}
              children={undefined}
            />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Inter-SemiBold",
                fontSize: 18,
                paddingBottom: 10,
              }}
            >
              Generated Recepie
            </Text>
            <Text
              style={{
                color: "#000000",
                fontSize: 24,
                fontFamily: "Inter-SemiBold",
                paddingBottom: 10,
              }}
            >
              {modalData.name}
            </Text>
            <Text
              style={{
                color: "#343434",
                fontSize: 15,
                fontFamily: "Inter-Regular",
                paddingBottom: 10,
              }}
            >
              {modalData.ingredients}
            </Text>
            <Text
              style={{
                color: "#343434",
                fontSize: 15,
                fontFamily: "Inter-Regular",
              }}
            >
              {modalData.instructions}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              gap: 15,
              justifyContent: "center",
            }}
          >
            <Button
              img={false}
              title="Save"
              onPress={() => {
                onSaveRecepie();
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
