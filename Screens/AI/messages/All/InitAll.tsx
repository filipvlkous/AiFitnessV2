import React, { useEffect } from "react";
import { Image } from "react-native";
import Button from "../../../../components/ButtonDark";
import Card from "../../../../components/card";
import { MemoizedBotBoldMsg, MemoizedBotMsg } from "../BotTypeWrite";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface BotMsgProps {
  click: boolean;
  fetchRecipe?: () => Promise<void>;
  loading: boolean;
  restart: () => void;
}

const InitMsg: React.FC<BotMsgProps> = ({
  fetchRecipe,
  loading,
  click,
  restart,
}) => {
  const slideUp = useSharedValue(-300);
  const slideUpOpacity = useSharedValue(0);

  const config = {
    duration: 200,
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
          text={`🌟 Super volba, jdeme na to! Vytvořím vám vyvážený soubor receptů na celý den. Připravte se na chuťově bohatou a výživnou kulinářskou cestu! 🍽️🥦🍎\n`}
        />
        <MemoizedBotBoldMsg
          boldText={`Chcete-li začít s personalizovaným stravovacím plánem, jednoduše klikněte na tlačítko "Vytvořit denní plán".`}
        />
        {!click ? (
          <Button
            disabled={click}
            img={true}
            title="Vytvořit denní plán"
            style={{ paddingVertical: 10 }}
            onPress={fetchRecipe}
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
};

export default InitMsg;
