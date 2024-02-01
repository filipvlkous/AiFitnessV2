import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

const ButtonNoBackground: React.FC<ButtonProps> = ({
  title,
  style,
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
      <Text style={[styles.buttonText, isPressed && styles.buttonTextPressed]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // backgroundColor: "#47646A",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonPressed: {
    //backgroundColor: "#354B50",
  },
  buttonText: {
    color: "#47646A",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextPressed: {
    color: "#47646A",
  },
});

export default ButtonNoBackground;
