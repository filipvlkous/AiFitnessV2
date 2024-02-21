import { View, Alert, Text } from "react-native";
import { useEffect, useState } from "react";
import { getFitness, getSavedFitness } from "../../../Server/fitness";
import ExerciseList from "../../../components/FItness";
import LottieView from "lottie-react-native";
import Button from "../../../components/ButtonDark";
import ButtonLoading from "../../../components/ButtonDarkLoading";
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
  const [showButton, setShowButton] = useState(true);
  const [data, setData] = useState<FitnessData[][] | undefined | false>();

  let fintesButtonText = dataLoading ? "Načítání" : "Vygeneruj nový plán";
  const getData = async () => {
    setDataLoading(true);
    try {
      const data = await getFitness();
      setData(data);
      // setShowButton(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Chyba serveru, opakujte pozdeji");
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    const genRandomKey = async () => {
      try {
        const data = await getSavedFitness();

        if (data == false) {
          return setData(false), setShowButton(true);
        }
        const { transformedArray, TimeDate } = getFbData(data);
        const old = dateCalcul(TimeDate);

        if (old < 14) {
          setShowButton(true);
        }

        setData(transformedArray);
      } catch (error) {
        console.log(error.message);
        Alert.alert("Chyba pri nacitani fitness");
      } finally {
        setLoaidng(false);
      }
    };

    genRandomKey();
  }, []);

  if (loading)
    return (
      <View
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <LottieView
          loop={true}
          autoPlay={true}
          speed={1.5}
          style={{ width: 200, height: 200 }}
          source={require("../../../assets/animations/fitnessLoading.json")}
        />
        <Text
          style={[
            {
              fontSize: 16,
              fontFamily: "Inter-SemiBold",
              color: "#000000",
              paddingTop: 20,
              position: "absolute",
              bottom: 10,
            },
          ]}
        >
          Načítání fitness tréniku
        </Text>
      </View>
    );

  return (
    <View style={{ backgroundColor: "#4cb52cks9" }}>
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

      {!dataLoading ? (
        showButton ? (
          <Button
            disabled={dataLoading}
            onPress={() => getData()}
            title={fintesButtonText}
            style={{ borderRadius: 10, marginTop: 10 }}
          />
        ) : null
      ) : (
        <ButtonLoading style={{ borderRadius: 10, marginTop: 10 }} />
      )}
      <View>
        {data != undefined && data != false
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

const getFbData = (snapshot) => {
  try {
    const transformedArray: TransformedItem[][] = snapshot.newArr.map(
      (innerObj: any) => {
        const tArray: any[] = innerObj.day;
        return tArray.map((tItem: any) => ({
          gif: tItem.gif,
          name: tItem.name,
          repsRange: tItem.repsRange,
        }));
      }
    );

    const TimeDate = snapshot.timeStamp;

    return { transformedArray, TimeDate };
  } catch (error) {
    console.log(error);
    throw Alert.alert("chyba fitness");
  }
};
