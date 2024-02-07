import React, { useState } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";

import { Exercise } from ".";

const DayFitness: React.FC<{
  index: number;
  exercise: Exercise;
  exercises: number;
}> = ({ index, exercise, exercises }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <TouchableOpacity onPress={() => setClicked(!clicked)}>
      <View
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          paddingHorizontal: 10,
          paddingVertical: 10,
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Image
          source={{ uri: exercise.gif }}
          style={{
            width: 200,
            height: 200,
            borderRadius: 5,
            shadowColor: "#000",
            shadowOpacity: 10,
            shadowRadius: 20,
          }}
          alt={exercise.name}
        />
        <View style={{ overflow: "hidden", flexShrink: 1, gap: 10 }}>
          <Text style={{ fontFamily: "Inter-ExtraBold", color: "#fff" }}>
            {exercise.name}
          </Text>
          <Text style={{ fontFamily: "Inter-SemiBold", color: "#fff" }}>
            {exercise.repsRange}
          </Text>
        </View>
        {index < exercises - 1 ? (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              borderColor: "#fff",
              borderWidth: 1,
              width: "100%",
              borderRadius: 10,
            }}
          ></View>
        ) : null}
      </View>
      {clicked ? (
        <Text
          style={{
            position: "absolute",
            top: "50%",
            alignSelf: "center",
            textAlignVertical: "center",
          }}
        >
          Odcviceno
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default DayFitness;
