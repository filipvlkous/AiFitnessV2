import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { RegisterStackNav } from "../../../../../types/navigatorTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import LoadBar from "../loadBar";
import ButtonDark from "../../../../../components/ButtonDark";
import ButtonNoBackground from "../../../../../components/ButtonNoBackgorund";
import FoodBuble from "./foodBuble";
import SexSelect from "../SexSelect";
import Milk from "../../../../../assets/Milk.png";
import Brokoli from "../../../../../assets/Brocoli.png";
import Burger from "../../../../../assets/Burger.png";
import ErrorIcon from "../../../../../components/ErrorIcon";
import { styles as errorStyles } from "../../../styleSheet";
import { useDispatch } from "react-redux";
import { thirdStepRedux } from "../../../../../redux/actions/testregisterUser";

export default function StepThree({
  navigation,
}: NativeStackScreenProps<RegisterStackNav>) {
  const [text, setText] = useState("");
  const [arr, setArr] = useState(["Nuts"]);
  const [food, setFood] = useState<null | string>(null);
  const [touched, setTouched] = useState(false);
  const dispatch = useDispatch();

  const changeFood = (food: string) => {
    setFood(food);
  };

  const onNextPress = () => {
    if (food == null) return setTouched(true);
    dispatch(thirdStepRedux(food, arr));
    navigation.navigate("step4");
  };
  const handleTextChange = useCallback(
    (newText: string) => {
      if (newText === ",") return;
      if (newText.length > text.length && newText.includes(",")) {
        const updatedArr = [...arr, text];
        setArr(updatedArr);
        setText("");
        return;
      }
      setText(newText);
    },
    [arr, text]
  );

  const deleteArr = useCallback((index: number) => {
    setArr((prevArr) => {
      const updatedArr = [...prevArr];
      updatedArr.splice(index, 1);
      return updatedArr;
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.Container}
        behavior="padding"
        enabled
        keyboardVerticalOffset={0}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.InnerCointainer}>
            <View style={styles.HeaderContainer}>
              <LoadBar percentage={70} />
              <View style={{ width: "100%", gap: 15 }}>
                <Text style={styles.TextStyle}>Řekněte nám vše!</Text>
                <Text
                  style={{
                    width: "100%",
                    fontFamily: "Inter-Regular",
                    color: "#8b8b8b",
                    fontSize: 15,
                  }}
                >
                  Abychom pro vás mohli vytvořit co nejpřesnější plán, musíme o
                  tobě vědět více.
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <SexSelect
                ThisSex={Burger}
                selectedSex={food as string}
                onSexSelect={() => changeFood("Maso")}
                sex={"Maso"}
              />
              <SexSelect
                ThisSex={Brokoli}
                selectedSex={food as string}
                onSexSelect={() => changeFood("Vegan")}
                sex={"Vegan"}
              />
              <SexSelect
                ThisSex={Milk}
                selectedSex={food as string}
                onSexSelect={() => changeFood("Vegetarian")}
                sex={"Vegetarian"}
              />
              {food == null && touched ? (
                <View
                  style={[
                    errorStyles.ErrorContainer,
                    { position: "absolute", bottom: -30 },
                  ]}
                >
                  <ErrorIcon color="#f3f3f3" />
                  <Text style={errorStyles.errors}>
                    Vyberte prosím jednu dietu.
                  </Text>
                </View>
              ) : null}
            </View>

            <View style={{ width: "100%", gap: 10 }}>
              <Text style={{ fontSize: 20, fontFamily: "Inter-SemiBold" }}>
                Potravinové alergie a intolerance?
              </Text>
              <FoodBuble list={arr} deleteArr={deleteArr} />

              <TextInput
                style={styles.InputStyle}
                placeholder="Zadejte jídlo a stiskněte čárku"
                onChangeText={handleTextChange}
                value={text}
              />
            </View>

            <View style={{ width: "100%" }}>
              <ButtonDark title="Další" onPress={onNextPress as () => void} />
              <ButtonNoBackground
                title="Zpátky"
                onPress={() => navigation.navigate("step2")}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    display: "flex",
    alignContent: "center",
    height: "100%",
    flex: 1,
  },
  InnerCointainer: {
    justifyContent: "space-between",
    height: "100%",
    alignItems: "center",
    marginHorizontal: 40,
  },
  InputStyle: {
    width: "100%",
    fontSize: 18,
    color: "#8b8b8b",
    fontFamily: "Inter-Regular",
    borderBottomWidth: 2,
    borderBottomColor: "#d5e3e7",
  },
  TextStyle: {
    fontSize: 30,
    fontFamily: "Inter-Bold",
    color: "#47646A",
  },
  HeaderContainer: {
    width: "100%",
    alignItems: "center",
    gap: 25,
  },
});
