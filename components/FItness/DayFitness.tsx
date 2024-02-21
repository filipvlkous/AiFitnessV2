import React, { useState } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import done from "../../assets/done.png";
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
          paddingVertical: 20,
          alignItems: "center",
          justifyContent: "center",
          gap: 15,
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
          <Text style={{ fontFamily: "Inter-ExtraBold", color: "#1c1c1c" }}>
            {exercise.name}
          </Text>
          <Text style={{ fontFamily: "Inter-SemiBold", color: "#1c1c1c" }}>
            {exercise.repsRange}
          </Text>
        </View>
        {index < exercises - 1 ? (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              borderColor: "#D5E3E7",
              borderWidth: 1,
              width: "100%",
              borderRadius: 10,
            }}
          ></View>
        ) : null}
        {clicked ? (
          <View
            style={{
              position: "absolute",
              width: "105%",
              height: "105%",
              backgroundColor: "#0000007c",
              borderRadius: 10,
              justifyContent: "center",
            }}
          >
            <Image
              style={{ width: 150, height: 150, marginLeft: 20 }}
              source={done}
            />
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default DayFitness;
