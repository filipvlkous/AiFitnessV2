import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  StyleSheet,
  Image,
  StyleProp,
  TextStyle,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  img?: boolean;
  textStyle?: StyleProp<TextStyle>;
}

const ButtonEmptyRounded: React.FC<ButtonProps> = ({
  title,
  img,
  style,
  textStyle,
  ...rest
}) => {
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
      <Text
        style={[
          styles.buttonText,
          textStyle,
          isPressed && styles.buttonTextPressed,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ffff",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#47646A",
  },
  buttonPressed: {
    backgroundColor: "#354B50",
  },
  buttonText: {
    color: "#47646A",
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
  buttonTextPressed: {
    color: "#CCCCCC",
  },
});

export default ButtonEmptyRounded;
