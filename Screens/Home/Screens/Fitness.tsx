import { View, Alert, Text } from "react-native";
import { useEffect, useState } from "react";
import { getFitness } from "../../../Server/fitness";
import firebase from "../../../initFirebase";
import ExerciseList from "../../../components/FItness";
import Button from "../../../components/ButtonDark";
import ButtonEmptyRounded from "../../../components/ButtonEmptyRounded";
type FitnessData = {
  gif: string;
  name: string;
  repsRange: string;
};

interface TransformedItem {
  gif: string;
  name: string;
  repsRange: string;
}

export default function Fitness() {
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoaidng] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [data, setData] = useState<FitnessData[][] | undefined>();

  let fintesButtonText = dataLoading ? "Načítání" : "Vygeneruj nový plán";
  const getData = async () => {
    setDataLoading(true);
    try {
      const data = await getFitness();
      console.log(data);
      setData(data);
    } catch (error) {
      Alert.alert("Chyba serveru, opakujte pozdeji");
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    const genRandomKey = async () => {
      try {
        const { transformedArray, TimeDate } = await getFbData();

        const old = dateCalcul(TimeDate);

        if (old < 14) {
          setShowButton(true);
        }

        setData(transformedArray);
      } catch (error) {
        Alert.alert("Chyba pri nacitani fitness");
      } finally {
        setLoaidng(false);
      }
    };

    genRandomKey();
  }, []);

  if (loading)
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );

  return (
    <View>
      <Text
        style={[
          {
            fontSize: 20,
            fontFamily: "Inter-SemiBold",
            color: "#000000",
            paddingTop: 20,
          },
        ]}
      >
        Fitness plan
      </Text>
      {showButton ? (
        <ButtonEmptyRounded
          disabled={dataLoading}
          onPress={() => getData()}
          title={fintesButtonText}
          style={{ borderRadius: 10 }}
        />
      ) : null}
      <View>
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
    </View>
  );
}

const dateCalcul = (date) => {
  const timestampMilliseconds =
    date.seconds * 1000 + Math.floor(date.nanoseconds / 1e6);

  // Create a Date object from the timestamp
  const timestampDate = new Date(timestampMilliseconds);

  // Get the current time
  const currentDate = new Date();

  // Calculate the difference in days
  const daysDifference = Math.floor(
    ((currentDate as any) - (timestampDate as any)) / (24 * 60 * 60 * 1000)
  );

  return daysDifference;
};

const getFbData = async () => {
  try {
    const snapshot = await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("fitness")
      .doc("5LWUp7KzV0d6G3p4Y7Ki")
      .get();
    // setData(snapshot.data().newArr);

    const transformedArray: TransformedItem[][] = snapshot
      .data()
      .newArr.map((innerObj: any) => {
        const tArray: any[] = innerObj.day;
        return tArray.map((tItem: any) => ({
          gif: tItem.gif,
          name: tItem.name,
          repsRange: tItem.repsRange,
        }));
      });

    const TimeDate = snapshot.data().timeStamp;

    return { transformedArray, TimeDate };
  } catch (error) {
    throw Alert.alert("chyba fitness");
  }
};
