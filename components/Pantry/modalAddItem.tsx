import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withSpring,
} from "react-native-reanimated";
import { Button as PaperButton } from "react-native-paper";
import FoodBuble from "../../Screens/LogRegister/Register/steps/StepThree/foodBuble";
import Button from "../ButtonDark";
import { savePantry } from "../../Server/recepies";
import ButtonLoading from "../ButtonDarkLoading";

export default function ModalAddItem({
  closeModal,
  option,
}: {
  closeModal: () => void;
  option: string;
}) {
  const [arr, setArr] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const slideUpOpacity = useSharedValue(0);
  const slideUpBg = useSharedValue(0);
  const slideUp = useSharedValue(530);

  const handleClick = () => {
    slideUpOpacity.value = 0;
    slideUp.value = 330;
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
  const deleteArr = useCallback((index: number) => {
    setArr((prevArr) => {
      const updatedArr = [...prevArr];
      updatedArr.splice(index, 1);
      return updatedArr;
    });
  }, []);

  const handleTextChange = useCallback(
    (newText: string) => {
      if (newText === ",") return;

      if (newText.length > text.length && newText.includes(",")) {
        if (!inputTest(newText)) return;

        const updatedArr = [...arr, text];
        setArr(updatedArr);
        setText("");
        return;
      }
      setText(newText);
    },
    [arr, text]
  );

  const inputTest = (text: string) => {
    const exerciseRegex = /^[A-Za-z0-9,./-:() ]{1,20}$/g;

    if (text.length < 20 && exerciseRegex.test(text)) return true;
  };

  const handleButtonClick = async () => {
    setLoading(true);
    try {
      await savePantry(option, arr);
      handleClick();
    } catch (error) {
      console.log(error);
      Alert.alert("Chyba během ukládání ingrediencí.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        slideUp.value = 650;
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        slideUp.value = 750;
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
    slideUp.value = 750;
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
              children={undefined}
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
            Přidat potraviny
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Inter-Regular",
              color: "#8b8b8b",
            }}
          >
            Přidejte potraviny do spíže.
          </Text>
          <FoodBuble list={arr} deleteArr={deleteArr} />
          <View style={{ width: "100%", gap: 20 }}>
            <Text style={{ fontSize: 18, fontFamily: "Inter-SemiBold" }}>
              Z přidaných potravin vymyslíme pokrm abychom využili vše co máte
              doma.
            </Text>
            <TextInput
              style={styles.InputStyle}
              placeholder="Napište potravinu a zmáčkněte čárku "
              onChangeText={handleTextChange}
              value={text}
            />
            {loading ? (
              <ButtonLoading />
            ) : (
              <Button
                disabled={arr.length == 0 ? true : false}
                title={"Uložit potraviny"}
                onPress={() => handleButtonClick()}
              />
            )}
          </View>
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
    position: "absolute",
    top: -240,
    width: widthDim,
  },
  WhiteContainer: {
    padding: 20,
    height: heightDim / 1.1,
    backgroundColor: "white", // Apply blue with opacity
    opacity: 1,
    borderRadius: 45,
    position: "absolute",
    bottom: 0,
    width: widthDim,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    position: "relative",
  },
  InputStyle: {
    width: "100%",
    fontSize: 17,
    color: "#8b8b8b",
    fontFamily: "Inter-Regular",
    borderBottomWidth: 2,
    borderBottomColor: "#d5e3e7",
  },
});
