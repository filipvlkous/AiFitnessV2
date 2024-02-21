import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useState } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import DayFitness from "./DayFitness";

export interface Exercise {
  gif: string;
  name: string;
  repsRange: string;
}

interface ExerciseListProps {
  exercises: Exercise[];
  number: number;
}
const ExerciseList: React.FC<ExerciseListProps> = ({ exercises, number }) => {
  const [collapesd, setColapsed] = useState<boolean>(true);
  const aniHeight = useSharedValue(50);

  const changeCollapsed = () => {
    setColapsed(!collapesd);
  };

  const animatedStyles = useAnimatedStyle(() => ({
    height: aniHeight.value,
  }));

  const startAnimation = () => {
    aniHeight.value = withTiming(
      collapesd ? (exercises.length + 1) * 225 : 50,
      {
        duration: 500,
      }
    );
  };

  return (
    <Animated.View
      style={[
        animatedStyles,
        {
          // backgroundColor: "#D5E3E7",
          borderWidth: 3,
          borderColor: "#D5E3E7",
          marginTop: 20,
          borderRadius: 10,
          padding: 10,

          overflow: "hidden",
        },
      ]}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Inter-Bold",
            color: "#1c1c1c",
          }}
        >
          Den {number}
        </Text>
        <TouchableOpacity
          onPress={() => {
            changeCollapsed();
            startAnimation();
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Inter-Medium",
              color: "#1c1c1c",
              marginBottom: 10,
            }}
          >
            {collapesd ? "Rozbalit" : "Zavřít"}
          </Text>
        </TouchableOpacity>
      </View>

      {exercises.map((exercise, index) => (
        <DayFitness
          key={index}
          index={index}
          exercise={exercise}
          exercises={exercises.length}
        />
      ))}
    </Animated.View>
  );
};

export default ExerciseList;
