import React, { useEffect, useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RegisterStackNav } from "../../../../../types/navigatorTypes";
import ButtonNoBackground from "../../../../../components/ButtonNoBackgorund";
import ButtonDark from "../../../../../components/ButtonDark";
import LoadBar from "../loadBar";
import Male from "../../../../../assets/Male.png";
import Female from "../../../../../assets/Female.webp";
import SexSelect from "../SexSelect";
import SliderSelect from "./SliderSelect";
import { useDispatch } from "react-redux";
import ErrorIcon from "../../../../../components/ErrorIcon";
import { styles as errorStyles } from "../../../styleSheet";
import { Formik } from "formik";
import * as Yup from "yup";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { secondStepRedux } from "../../../../../redux/actions/testregisterUser";

export default function StepTwo({
  navigation,
}: NativeStackScreenProps<RegisterStackNav>) {
  const [selectedSex, setSelectedSex] = useState<null | string>(null);
  const [thisWeight, setThisWeight] = useState(30);
  const [thisAge, setThisAge] = useState(15);
  const [thisHeight, setThisHeight] = useState(80);
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();

  const slideUpOpacity = useSharedValue(0);
  const config = {
    duration: 1000,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const onSexSelect = (Sex: string) => {
    setSelectedSex(Sex);
  };

  const commonSetter = (
    numb: number,
    funct: React.Dispatch<React.SetStateAction<number>>
  ) => {
    funct(Math.floor(numb));
  };

  const onNextPress = (name: string) => {
    if (selectedSex == null) return setIsValid(true);
    dispatch(
      secondStepRedux(name, selectedSex, thisAge, thisWeight, thisHeight)
    );

    navigation.navigate("step3");
  };

  useEffect(() => {
    slideUpOpacity.value = 1;
  }, []);

  const stylee = useAnimatedStyle(() => {
    return {
      opacity: withTiming(slideUpOpacity.value, config),
    };
  });

  return (
    <Animated.View style={stylee}>
      <Formik
        validationSchema={SignupSchema}
        initialValues={{ name: "" }}
        onSubmit={(values) => onNextPress(values.name)}
      >
        {({ handleChange, handleBlur, handleSubmit, touched, errors }) => (
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.Container}>
              <View style={styles.InnerCointainer}>
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 25,
                  }}
                >
                  <LoadBar percentage={50} />
                  <View style={{ width: "100%" }}>
                    <Text style={styles.TextStyle}>Nejprve základy!</Text>
                  </View>
                </View>
                <View style={{ width: "100%" }}>
                  <TextInput
                    style={styles.InputStyle}
                    placeholder="Tvoje jméno"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                  />
                  {errors.name && touched.name ? (
                    <View
                      style={[
                        errorStyles.ErrorContainer,
                        { position: "absolute", bottom: -35 },
                      ]}
                    >
                      <ErrorIcon color="#c1c1c1sd" />
                      <Text style={errorStyles.errors}>{errors.name}</Text>
                    </View>
                  ) : null}
                </View>

                <View style={{ width: "100%", position: "relative" }}>
                  <View style={styles.SexContainer}>
                    <SexSelect
                      ThisSex={Male}
                      selectedSex={selectedSex as string}
                      sex="Muž"
                      onSexSelect={() => onSexSelect("Muž")}
                    />
                    <SexSelect
                      ThisSex={Female}
                      selectedSex={selectedSex as string}
                      sex="Žena"
                      onSexSelect={() => onSexSelect("Žena")}
                    />
                  </View>
                  {selectedSex == null && isValid ? (
                    <View
                      style={[
                        errorStyles.ErrorContainer,
                        { position: "absolute", bottom: -30 },
                      ]}
                    >
                      <ErrorIcon color="#f3f3f3" />
                      <Text style={errorStyles.errors}>
                        Prosím vyberte si pohlaví
                      </Text>
                    </View>
                  ) : null}
                </View>
                <SliderSelect
                  valu={thisWeight}
                  name="Váha:"
                  number={thisWeight}
                  setDispatch={(val) => commonSetter(val, setThisWeight)}
                  min={30}
                  max={250}
                  val="Kg"
                />
                <SliderSelect
                  valu={thisAge}
                  name="Věk:"
                  number={thisAge}
                  setDispatch={(val) => commonSetter(val, setThisAge)}
                  min={15}
                  max={99}
                />
                <SliderSelect
                  valu={thisHeight}
                  name="Výška:"
                  number={thisHeight}
                  setDispatch={(val) => commonSetter(val, setThisHeight)}
                  min={80}
                  max={240}
                  val="cm"
                />

                <View style={{ width: "100%" }}>
                  <ButtonDark
                    title="Další"
                    onPress={handleSubmit as () => void}
                  />
                  <ButtonNoBackground
                    title="Zpátky"
                    onPress={() => navigation.navigate("step1")}
                  />
                </View>
              </View>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        )}
      </Formik>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    display: "flex",
    alignContent: "center",
    height: "100%",
  },
  InnerCointainer: {
    justifyContent: "space-between",
    height: "100%",
    alignItems: "center",
    marginHorizontal: 40,
  },

  SexContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
  },
  InputStyle: {
    width: "100%",
    fontSize: 20,
    color: "#8b8b8b",
    fontFamily: "Inter-Regular",
    borderBottomWidth: 2,
    borderBottomColor: "#d5e3e7",
    height: 30,
  },
  TextStyle: {
    fontSize: 30,
    fontFamily: "Inter-Bold",
    color: "#47646A",
  },
});
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Your name should be at least 2 \n characters long.")
    .matches(
      /^[a-zA-Z\s\W]*$/,
      "Your Name should include at least \n one uppercase letter, one lowercase \n letter and one number."
    ),
});
