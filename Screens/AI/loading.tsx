import { useEffect, useRef } from "react";
import Lottie from "lottie-react-native";
import { Animated, Dimensions, Easing, View } from "react-native";

export default function AnimationWithImperativeApi({
  heightVal,
}: {
  heightVal: number;
}) {
  const animationProgress = useRef(new Animated.Value(0));
  const animation = Animated.timing(animationProgress.current, {
    toValue: 1,
    duration: 3000,
    easing: Easing.linear,
    useNativeDriver: false,
  });
  useEffect(() => {
    Animated.loop(animation).start();
  }, []);
  const heightDim = Dimensions.get("screen").height;
  const widthDim = Dimensions.get("screen").width;
  const height =
    heightVal < 4 ? { height: heightDim + 100 } : { height: "100%" };

  return (
    <View
      style={[
        {
          zIndex: 20,
          position: "absolute",
          width: widthDim,
        },
        height,
      ]}
    >
      <View
        style={{
          backgroundColor: "black",
          height: "100%",
          opacity: 0.5,
        }}
      />
      <Lottie
        //   ref={animationRef}
        style={{ position: "absolute", alignSelf: "center" }}
        loop={true}
        autoPlay={true}
        progress={animationProgress.current}
        source={require("../../assets/animations/loadingAnimation.json")}
      />
    </View>
  );
}
