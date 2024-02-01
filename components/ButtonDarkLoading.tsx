import { View, TouchableOpacityProps, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import loadingAnim from "../assets/animations/loading.json";
import { useEffect, useRef } from "react";

const ButtonLoading: React.FC<TouchableOpacityProps> = () => {
  const animationRef = useRef<LottieView>(null);
  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <View style={[styles.button, styles.buttonPressed, { height: 52 }]}>
      <LottieView
        ref={animationRef}
        source={loadingAnim}
        autoPlay
        loop
        style={{ transform: [{ scale: 1.55 }] }}
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
  },
  buttonPressed: {
    backgroundColor: "#354B50",
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
