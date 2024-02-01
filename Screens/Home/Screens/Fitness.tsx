import { View, Text, Image, Button } from "react-native";
import { useState } from "react";
import { getFitness } from "../../../Server/recepies";

interface Exercise {
  gif: string;
  name: string;
  repsRange: string;
}

interface ExerciseListProps {
  exercises: Exercise[];
  number: number;
}

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises, number }) => {
  return (
    <View>
      <Text style={{ fontSize: 20 }}>Den {number}</Text>
      {exercises.map((exercise, index) => (
        <View key={index}>
          <Image
            source={{ uri: exercise.gif }}
            style={{ width: 200, height: 200 }}
            alt={exercise.name}
          />
          <Text>{exercise.name}</Text>
          <Text>{exercise.repsRange}</Text>
        </View>
      ))}
    </View>
  );
};

export default function Fitness() {
  const [data, setData] = useState<
    | {
        gif: string;
        name: string;
        repsRange: string;
      }[][]
    | undefined
  >();
  const getData = async () => {
    const dataa = await getFitness();
    setData(dataa);
  };

  return (
    <View>
      <Text>Fitness</Text>
      <Button onPress={getData} title="Get Plan" />

      {data != undefined
        ? data.map((exerciseGroup, index) => (
            <ExerciseList
              key={index}
              exercises={exerciseGroup}
              number={index + 1}
            />
          ))
        : null}
    </View>
  );
}
