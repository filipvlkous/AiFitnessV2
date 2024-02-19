import { Image, View, Text, TouchableOpacity } from "react-native";
import Card from "../../../../components/card";
import { MemoizedBotMsg } from "../BotTypeWrite";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import Lottie from "lottie-react-native";
import { useRef } from "react";
import { deleteRecepie, saveRecepie } from "../../../../Server/recepies";

type IBotMsg = {
  value: {
    text: string;
    option: string;
    user: string;
  };
};

export default function BotMessage({ value }: IBotMsg) {
  const slideUp = useSharedValue(-300);
  const slideUpOpacity = useSharedValue(0);
  const ref = useRef<Lottie>(null);
  const [save, setSave] = useState(false);
  const [id, setId] = useState<null | string>(null);

  const onSeveRecepie = async () => {
    try {
      await saveRecepie(value.option, value.text, true).then((e) => {
        if (!e) return;
        setId(e);
        ref.current?.play();
        setSave(true);
      });
    } catch (error) {}
  };

  const onDeleteRecepie = async () => {
    if (id != null) {
      await deleteRecepie(id).then(() => {
        setId(null);
      });
      ref.current?.play(100, 0);
      setSave(false);
    }
  };

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
    }, 400);
  });

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

      <Card styles={{ paddingBottom: 0 }}>
        <MemoizedBotMsg text={value.text} />

        <TouchableOpacity onPress={save ? onDeleteRecepie : onSeveRecepie}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderTopWidth: 2,
              borderTopColor: "#BEBEBE",
            }}
          >
            <Lottie
              style={{
                height: 40,
                width: 40,
              }}
              ref={ref}
              loop={false}
              source={require("../../../../assets/animations/test/Book.json")}
              autoPlay={false}
            />
            <Text style={{ color: "#47646A" }}> Save Recepie</Text>
          </View>
        </TouchableOpacity>
      </Card>
    </Animated.View>
  );
}
