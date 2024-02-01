import { View, Image } from "react-native";
import React, { useEffect } from "react";
import Card from "../../../components/card";
import Button from "../../../components/ButtonDark";
import { MemoizedBotBoldMsg, MemoizedBotMsg } from "./BotTypeWrite";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function Init({
  click,
  dayRecepies,
  singleRecepies,
}: {
  click: boolean;
  dayRecepies: () => void;
  singleRecepies: () => void;
}) {
  const slideUp = useSharedValue(-300);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(slideUp.value) }],
    };
  });

  useEffect(() => {
    slideUp.value = 0;
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
        style,
      ]}
    >
      <Image source={require("../../../assets/RobotIcon.png")} />

      <Card>
        <MemoizedBotMsg
          text={
            "Ahoj jmenuji se Anička a asem tu, abych vám pomohla uvařit chutná a zdravá jídla. Ať už vám jde o jeden recept, nebo o celodenní stravovací plán, mám pro vás vše. \n"
          }
        />
        <MemoizedBotBoldMsg
          boldText={
            "S čím vám mohu dnes pomoci? Vyberte si mezi jedním receptem nebo plánem na celý den! 🍽️🌼"
          }
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            justifyContent: "center",
          }}
        >
          {!click ? (
            <>
              <Button
                disabled={click}
                title="Plán"
                style={{ paddingVertical: 10, width: "47%" }}
                onPress={dayRecepies}
              />
              <Button
                disabled={click}
                title="Recept"
                style={{ paddingVertical: 10, width: "47%" }}
                onPress={singleRecepies}
              />
            </>
          ) : null}
        </View>
      </Card>
    </Animated.View>
  );
}
