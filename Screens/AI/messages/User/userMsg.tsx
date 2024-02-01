import { useEffect } from "react";
import { Text, Image } from "react-native";
import Card from "../../../../components/card";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export default function UserMsg({ value }: { value?: any }) {
  const slideUp = useSharedValue(300);
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
    slideUp.value = 0;
    slideUpOpacity.value = 1;
  }, []);
  return (
    <Animated.View
      style={[
        { display: "flex", flexDirection: "row", padding: 20 },
        AnimatedStyle,
      ]}
    >
      <Card>
        <Text style={{ fontFamily: "Inter-Regular", fontSize: 15 }}>
          {value.msg}
        </Text>
        {value.option ? (
          <Text style={{ fontFamily: "Inter-SemiBold", fontSize: 15 }}>
            {value.key} {value.option}
          </Text>
        ) : null}
        {value.meal ? (
          <Text style={{ fontFamily: "Inter-SemiBold", fontSize: 15 }}>
            {value.meal}
          </Text>
        ) : null}
      </Card>
      <Image
        style={{ height: 55, width: 55 }}
        source={require("../../../../assets/Male.png")}
      />
    </Animated.View>
  );
}
