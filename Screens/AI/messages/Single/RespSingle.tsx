import { Image, View, Text, TouchableOpacity, Alert } from "react-native";
import Card from "../../../../components/card";
import { MemoizedBotMsg } from "../BotTypeWrite";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useRef, useState } from "react";
import { deleteRecepie, saveRecepie } from "../../../../Server/recepies";
import Lottie from "lottie-react-native";

export default function BotOneMeal({ value }: { value: any }) {
  const ref = useRef<Lottie>(null);
  const ref2 = useRef<Lottie>(null);
  const [loading, setLoading] = useState(false);
  const [save, setSave] = useState(false);
  const [id, setId] = useState<null | string>(null);

  const onSeveRecepie = async () => {
    setLoading(true);
    try {
      await saveRecepie(value.option, value.text).then((e) => {
        setId(e);
        ref.current?.play();
        setSave(true);
      });
    } catch (error: any) {
      console.log(error.message);
      Alert.alert("Chyba během ukládání, opakujte později.");
    } finally {
      setLoading(false);
    }
  };

  const onDeleteRecepie = async () => {
    setLoading(true);

    if (id != null) {
      try {
        await deleteRecepie(id);
        setId(null);
        ref.current?.play(100, 0);
        setSave(false);
      } catch (error) {
        Alert.alert("Chyba během smazání receptu, opakujte později.");
      } finally {
        setLoading(false);
      }
    }
  };

  const refreshRecepie = async () => {
    try {
      ref2.current?.play();
    } catch (error) {}
  };

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
    }, 400);
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

      <Card styles={{ paddingBottom: 5 }}>
        <View style={{ display: "flex" }}>
          <MemoizedBotMsg text={value.text} />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              borderTopWidth: 2,
              borderColor: "#BEBEBE",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              disabled={loading}
              onPress={save ? onDeleteRecepie : onSeveRecepie}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 13, color: "#47646A" }}>
                  Uložit recept
                </Text>
                <Lottie
                  style={{
                    height: 35,
                    width: 35,
                    zIndex: 10,
                  }}
                  ref={ref}
                  loop={false}
                  source={require("../../../../assets/animations/test/Book.json")}
                  autoPlay={false}
                />
              </View>
            </TouchableOpacity>
            <View style={{ borderLeftWidth: 2, borderColor: "#BEBEBE" }}></View>
            <TouchableOpacity
              onPress={refreshRecepie}
              // onPress={save ? onDeleteRecepie : onSeveRecepie}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Lottie
                  style={{
                    height: 35,
                    width: 35,
                    zIndex: 10,
                  }}
                  ref={ref2}
                  loop={false}
                  source={require("../../../../assets/animations/refreshLottie.json")}
                  autoPlay={false}
                />
                <Text style={{ fontSize: 13, color: "#47646A" }}>
                  Vygenerovat nový
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </Animated.View>
  );
}
