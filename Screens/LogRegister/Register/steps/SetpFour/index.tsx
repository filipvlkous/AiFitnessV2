import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { RegisterStackNav } from "../../../../../types/navigatorTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import LoadBar from "../loadBar";
import ButtonDark from "../../../../../components/ButtonDark";
import ButtonNoBackground from "../../../../../components/ButtonNoBackgorund";
import SexSelect from "../SexSelect";
import Weight from "../../../../../assets/Weight.png";
import Shoes from "../../../../../assets/Shoes.png";
import Scale from "../../../../../assets/Scale.png";
import { styles as errorStyles } from "../../../styleSheet";
import ErrorIcon from "../../../../../components/ErrorIcon";
import { useDispatch } from "react-redux";
import { fourthStepRedux } from "../../../../../redux/actions/testregisterUser";

export default function StepFour({
  navigation,
}: NativeStackScreenProps<RegisterStackNav>) {
  const [aim, setAim] = useState<null | string>(null);
  const [touched, setTouched] = useState(false);
  const dispatch = useDispatch();
  const changeAim = (food: string) => {
    setAim(food);
  };

  const onButtonPress = () => {
    if (aim == null) {
      return setTouched(true);
    }
    dispatch(fourthStepRedux(aim));
    navigation.navigate("step5");
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 25,
        }}
      >
        <LoadBar percentage={85} />
        <View style={{ width: "100%", gap: 15 }}>
          <Text style={styles.TextStyle}>Co je tvým cílem?</Text>
          <Text
            style={{
              width: "100%",
              fontFamily: "Inter-Regular",
              color: "#8b8b8b",
              fontSize: 15,
            }}
          >
            Vaše cíle jsou pro nás velmi důležité. Pomáhá nám to určit nejlepší
            jídla a cviky pro vás.
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          height: "60%",
          gap: 30,
        }}
      >
        <SexSelect
          ThisSex={Weight}
          selectedSex={aim as string}
          onSexSelect={() => changeAim("Nabrat váhu")}
          sex={"Nabrat váhu"}
        />
        <SexSelect
          ThisSex={Shoes}
          selectedSex={aim as string}
          onSexSelect={() => changeAim("Udržet váhu")}
          sex={"Udržet váhu"}
        />
        <SexSelect
          ThisSex={Scale}
          selectedSex={aim as string}
          onSexSelect={() => changeAim("Shodit váhu")}
          sex={"Shodit váhu"}
        />
        {aim == null && touched ? (
          <View
            style={[
              errorStyles.ErrorContainer,
              { position: "absolute", bottom: -50 },
            ]}
          >
            <ErrorIcon color="#f3f3f3" />
            <Text style={errorStyles.errors}>Vyberte prosím jednu dietu.</Text>
          </View>
        ) : null}
      </View>

      <View style={{ width: "100%" }}>
        <ButtonDark title="Další" onPress={onButtonPress} />
        <ButtonNoBackground
          title="Zpátky"
          onPress={() => navigation.navigate("step3")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    display: "flex",
    height: "100%",
    justifyContent: "space-between",
    marginHorizontal: 40,
  },
  TextStyle: {
    fontSize: 30,
    fontFamily: "Inter-Bold",
    color: "#47646A",
  },
});
