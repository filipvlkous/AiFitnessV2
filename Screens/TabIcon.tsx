import { ParamListBase, RouteProp } from "@react-navigation/native";
import LottieView from "lottie-react-native";
// import Lottie from "lottie-react-native";
import React from "react";

interface CustomTabProps {
  focused: boolean;
  size: number;
  route: RouteProp<ParamListBase, "Cookbook" | "Pantry" | "Profile" | "Home">;
  style?: any;
}

export const CustomTab = ({ focused, size, route, style }: CustomTabProps) => {
  const ref = React.useRef<LottieView>(null);
  let filePath;

  //on focus change the anim will play
  React.useEffect(() => {
    if (focused && ref.current) {
      ref.current?.play();
    }

    return () => {
      // ref.current?.reset();
      ref.current?.play(100, 0);
    };
  }, [focused]);

  switch (route.name) {
    case "Home":
      filePath = require("../assets/animations/home.json");
      break;
    case "Pantry":
      filePath = require("../assets/animations/test2/pantry.json");
      break;
    case "Profile":
      filePath = require("../assets/animations/profile.json");
      break;
    case "Cookbook":
      filePath = require("../assets/animations/test2/cook1.json");
      break;
  }

  return (
    <LottieView
      ref={ref}
      loop={false}
      source={filePath}
      autoPlay={false}
      style={[{ width: size, height: size }, style]}
    />
  );
};
