import { View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Card from "../../../../components/card";
import { MemoizedBotMsg } from "../BotTypeWrite";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import ButtonEmptyRounded from "../../../../components/ButtonEmptyRounded";
import Button from "../../../../components/ButtonDark";

const ButtonStyle = {
  backgroundColor: "#ffff",
  paddingVertical: 10,
  paddingHorizontal: 0,
  borderRadius: 10,
  width: "33%",
};

const SelectedButtonStyle = {
  backgroundColor: "#47646A",
  paddingVertical: 10,
  paddingHorizontal: 0,
  borderRadius: 10,
  width: "33%",
};

const TextColot = {
  color: "#FFFF",
};

export default function SingleRecepie({
  click,
  generateOneMeal,
  restart,
}: {
  click: boolean;
  generateOneMeal: (meal: string) => Promise<void>;
  restart: () => void;
}) {
  const [selected, setSelected] = useState<
    "" | "Lunch" | "Dinner" | "Breakfast"
  >("");
  const slideUp = useSharedValue(-300);
  const slideUpOpacity = useSharedValue(0);

  const config = {
    duration: 300,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };
  const AnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(slideUpOpacity.value, config),
      transform: [{ translateX: withSpring(slideUp.value) }],
    };
  });

  useEffect(() => {
    setTimeout(async () => {
      slideUp.value = 0;
      slideUpOpacity.value = 1;
    }, 600);
  }, []);

  return (
    <Animated.View
      style={[
        {
          display: "flex",
          flexDirection: "row",
          gap: 20,
          padding: 15,
        },
        AnimatedStyle,
      ]}
    >
      <Image source={require("../../../../assets/RobotIcon.png")} />

      <Card>
        <MemoizedBotMsg
          text={
            "🌟 Výborně! Zadejte, jaké jídlo preferujete - snídani, oběd nebo večeři, a stiskněte tlačítko Generovat, abych vám mohl poskytnout dokonalý recept, který uspokojí vaše chuťové pohárky! 🍳🥗🍛  "
          }
        />
        <View style={{ gap: 20 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              justifyContent: "center",
            }}
          >
            <ButtonEmptyRounded
              title={"Snídaně"}
              disabled={click}
              style={
                selected == "Breakfast" ? SelectedButtonStyle : ButtonStyle
              }
              textStyle={selected == "Breakfast" ? TextColot : {}}
              onPress={() => setSelected("Breakfast")}
            />

            <ButtonEmptyRounded
              title={"Oběd"}
              disabled={click}
              style={selected == "Lunch" ? SelectedButtonStyle : ButtonStyle}
              textStyle={selected == "Lunch" ? TextColot : {}}
              onPress={() => setSelected("Lunch")}
            />
            <ButtonEmptyRounded
              title={"Večeře"}
              disabled={click}
              style={selected == "Dinner" ? SelectedButtonStyle : ButtonStyle}
              textStyle={selected == "Dinner" ? TextColot : {}}
              onPress={() => setSelected("Dinner")}
            />
          </View>
        </View>
        {!click ? (
          <Button
            disabled={!selected}
            img={require("../../../../assets/GenerateIcon.png")}
            title={"Generovat"}
            style={{ paddingVertical: 10, marginTop: 10 }}
            onPress={() => {
              generateOneMeal(selected);
            }}
          />
        ) : null}

        {!click ? (
          <Button
            title={"Restartovat"}
            style={{ paddingVertical: 10 }}
            onPress={() => {
              restart();
            }}
          />
        ) : null}
      </Card>
    </Animated.View>
  );
}
