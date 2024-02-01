import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  StyleSheet,
  Image,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  img?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, img, style, ...rest }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <TouchableOpacity
      style={[styles.button, style, isPressed && styles.buttonPressed]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...rest}
    >
      {img ? <Image source={require("../assets/GenerateIcon.png")} /> : null}
      <Text style={[styles.buttonText, isPressed && styles.buttonTextPressed]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#47646A",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  buttonPressed: {
    backgroundColor: "#354B50",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Inter-Medium",
  },
  buttonTextPressed: {
    color: "#CCCCCC",
  },
});

export default Button;
