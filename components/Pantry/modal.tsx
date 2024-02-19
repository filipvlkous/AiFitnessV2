import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withSpring,
} from "react-native-reanimated";
import { Button as PaperButton } from "react-native-paper";
import Button from "../ButtonDark";
import { savePantryRecepie } from "../../Server/pantry";
import ButtonLoading from "../ButtonDarkLoading";

const heightDim = Dimensions.get("screen").height;
const widthDim = Dimensions.get("screen").width;

export default function ModalPantry({
  closeModal,
  visible,
  modalData,
}: {
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
  const [loading, setLoading] = useState(false);
  const [save, setSave] = useState(false);
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

  const onSaveRecepie = async () => {
    setLoading(true);
    try {
      if (modalData != undefined) await savePantryRecepie(modalData);
      setSave(true);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    slideUpBg.value = 0.5;
    slideUpOpacity.value = 1;
    slideUp.value = 50;
  }, [visible]);

  if (modalData == undefined) return <Text>Loading</Text>;

  return (
    <View style={{ height: "120%", position: "absolute" }}>
      <Animated.View style={[styles.ModalContainer, style]} />
      <Animated.View style={[styles.WhiteContainer, stylee]}>
        <ScrollView
          style={{ position: "relative" }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={{ position: "absolute", right: -20, top: 0, zIndex: 20 }}
            onPress={handleClick}
          >
            <PaperButton
              labelStyle={{ fontSize: 40 }}
              theme={{ colors: { primary: "#597d85" } }}
              icon={"close-circle-outline"}
              children={undefined}
            />
          </TouchableOpacity>
          <View style={{ paddingBottom: 20 }}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Inter-SemiBold",
                fontSize: 18,
                paddingBottom: 10,
              }}
            >
              Navržený recept
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
          {!loading ? (
            <Button
              img={false}
              title={!save ? "Uložit" : "Recept byl uložen"}
              disabled={save}
              onPress={() => {
                onSaveRecepie();
              }}
            />
          ) : (
            <ButtonLoading />
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  ModalContainer: {
    backgroundColor: "black", // Apply blue with opacity
    position: "absolute",
    top: 0,
    width: widthDim,
    height: heightDim,
  },
  WhiteContainer: {
    gap: 30,
    padding: 20,
    backgroundColor: "white", // Apply blue with opacity
    borderRadius: 25,
    position: "absolute",
    width: widthDim * 0.9,
    margin: 20,
    height: "70%",
  },
});
