import { View, TouchableOpacityProps, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import loadingAnim from "../assets/animations/loading.json";
import { useEffect, useRef } from "react";

const ButtonLoading: React.FC<TouchableOpacityProps> = ({ style }) => {
  const animationRef = useRef<LottieView>(null);
  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <View style={[styles.button, styles.buttonPressed, { height: 52 }, style]}>
      <LottieView
        ref={animationRef}
        source={loadingAnim}
        autoPlay
        loop
        style={{
          transform: [{ scale: 1.55 }],
          height: 100,
          width: 100,
          position: "absolute",
          top: -25,
        }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#47646A",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  buttonPressed: {
    backgroundColor: "#47646A",
  },
  buttonText: {
    color: "#FFFFFF",
    // fontSize: 16,
    fontFamily: "Inter-Medium",
  },
  buttonTextPressed: {
    color: "#CCCCCC",
  },
});

export default ButtonLoading;
