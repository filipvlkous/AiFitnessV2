import { View, TouchableOpacityProps, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import loadingAnim from "../assets/animations/loading.json";
import { useEffect, useRef } from "react";

const ButtonEmptyLoading: React.FC<TouchableOpacityProps> = ({ style }) => {
  const animationRef = useRef<LottieView>(null);
  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <View style={[styles.button, { height: 52 }, style]}>
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
    backgroundColor: "#ffff",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#47646A",
    position: "relative",
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

export default ButtonEmptyLoading;
