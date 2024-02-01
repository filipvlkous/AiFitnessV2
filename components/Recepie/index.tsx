import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import SafeAreView from "../SafeAreView";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ingredients from "./ingredients";
import Instruction from "./instruction";
import ButtonTest from "./button";
import Bubble from "./bubble";
import { deleteRecepie } from "../../Server/recepies";
import Lottie from "lottie-react-native";

export default function Recepie(props: any) {
  const ref = useRef<Lottie>(null);
  const [window, setWindow] = useState(true);
  const [viewWidth, setViewWidth] = useState(0);

  const data = props.route.params.recepie;
  const onViewLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setViewWidth(width);
  };

  const onDeleteRecepie = async () => {
    if (props.route.params.recepie.id != null) {
      ref.current?.play(100, 0);

      try {
        await deleteRecepie(props.route.params.recepie.id);

        props.navigation.goBack();
      } catch (error) {
        Alert.alert("Error, please repeat later.");
      }
    }
  };

  const IngredientsStyle = !window ? style.nonButton : style.selectedButton;
  const InstructionStyle = window ? style.nonButton : style.selectedButton;

  const ingredientsArray: string[] = data.ingredients.match(/- .+$/gm);
  return (
    <ScrollView style={{ backgroundColor: "#FFFEFC", height: "100%" }}>
      <SafeAreView style={{ height: "100%", backgroundColor: "#FFFEFC" }}>
        <View style={style.MainCointainer}>
          <TouchableOpacity
            style={{ position: "absolute", zIndex: 15, top: 10 }}
            onPress={() => props.navigation.navigate("Index")}
          >
            <Text>
              <Icon name="chevron-left" size={50} color="#47646A" />
            </Text>
          </TouchableOpacity>
          <View style={{ width: "100%", position: "relative" }}>
            <Text style={style.ScreenText}>Recept</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                paddingVertical: 15,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Bubble txt={data.option} />
                <Bubble txt={`${ingredientsArray.length} ingredijencí`} />
              </View>

              <TouchableOpacity onPress={onDeleteRecepie}>
                <Lottie
                  style={{
                    height: 35,
                    width: 35,
                    zIndex: 10,
                  }}
                  ref={ref}
                  loop={false}
                  source={require("../../assets/animations/test/Book.json")}
                  autoPlay={false}
                  progress={1}
                />
              </TouchableOpacity>
            </View>
            <Text style={style.HeadText}>{data.name}</Text>

            <View onLayout={onViewLayout} style={style.ButtonContainer}>
              <ButtonTest window={window} viewWidth={viewWidth} />

              <TouchableOpacity onPress={() => setWindow(true)}>
                <Text style={IngredientsStyle}>Ingredience</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setWindow(false)}>
                <Text style={InstructionStyle}>Instrukce</Text>
              </TouchableOpacity>
            </View>
            {window ? (
              <Ingredients ingredientsArray={ingredientsArray} />
            ) : (
              <Instruction text={data.instructions} />
            )}
          </View>
        </View>
      </SafeAreView>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  ButtonContainer: {
    marginVertical: 30,
    paddingVertical: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#EAEAEA",
    width: "100%",
    borderRadius: 10,
  },
  nonButton: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    width: "100%",
  },
  selectedButton: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: "#FFF",
    width: "100%",
  },
  MainCointainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    position: "relative",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  HeadText: {
    fontSize: 26,
    fontFamily: "Inter-Bold",
    width: "100%",
  },
  ScreenText: {
    fontSize: 20,
    fontFamily: "Inter-SemiBold",
    color: "#000000",
    zIndex: 10,
    textAlign: "center",
  },
});
