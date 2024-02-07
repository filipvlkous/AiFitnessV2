import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/testStore";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackType, TabMainNavigator } from "../../../types/navigatorTypes";
import { RouteProp } from "@react-navigation/native";
import SaveRecepieLogo from "../../../assets/saveRecepieIcon.png";
type ScreenANavigationProp = StackNavigationProp<TabMainNavigator, "Home">;
type ScreenARouteProp = RouteProp<HomeStackType, "Index">;

const LastSaved: React.FC<{
  navigation: ScreenANavigationProp;
  route: ScreenARouteProp;
}> = ({ navigation, route }) => {
  const data = useSelector((state: RootState) => state.counterReducer.recepies);
  const setData = data?.slice(0, -2); // Select the last 3 items from the array

  let testImage: any;

  if (data?.length == 0) {
    return (
      <View>
        <Text style={[styles.HeadText, { paddingTop: 20 }]}>
          Polsední uložené
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Ai")}
          style={{
            backgroundColor: "#47646A",
            display: "flex",
            flexDirection: "row",
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            padding: 10,
          }}
        >
          <View style={{ width: "50%" }}>
            <Text
              style={{
                fontFamily: "Inter-Bold",
                textAlign: "left",
                color: "#E5B973",
                fontSize: 20,
                paddingBottom: 5,
              }}
            >
              Začněte hned
            </Text>
            <Text
              style={{
                fontFamily: "Inter-SemiBold",
                textAlign: "left",
                color: "white",
                fontSize: 15,
              }}
            >
              Nechte si vygenerovat první recept a uložte si ho na pozěji
            </Text>
          </View>
          <Image style={{ width: 160, height: 140 }} source={SaveRecepieLogo} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.Container}>
      <Text style={styles.HeadText}>Polsední uložené</Text>

      {setData?.map((recipe, i) => {
        switch (recipe.option) {
          case "Snídaně":
            testImage = require("../../../assets/breakMenu.png");
            break;
          case "Oběd":
            testImage = require("../../../assets/lunchMenu.png");
            break;
          case "Večeře":
            testImage = require("../../../assets/dinnerMenu.png");
            break;
          case "Pantry recepie":
            testImage = require("../../../assets/pantryItem.png");
            break;
        }
        return (
          <TouchableOpacity
            key={i}
            onPress={() =>
              navigation.navigate("Cookbook", {
                screen: "Recepie",
                params: {
                  recepie: recipe,
                },
              })
            }
          >
            <View style={styles.ButtonContainer}>
              <View style={styles.ImageContainer}>
                <Image source={testImage} />
              </View>
              <View style={{ width: "70%", gap: 10 }}>
                <View
                  style={{
                    width: 110,
                    borderRadius: 7,
                    backgroundColor: "#000",
                  }}
                >
                  <Text
                    style={{
                      paddingHorizontal: 5,
                      paddingVertical: 5,
                      borderRadius: 8,
                      textAlign: "center",
                      fontSize: 11,
                      fontFamily: "Inter-SemiBold",
                      color: "#FFF",
                    }}
                  >
                    {recipe.option}
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Inter-Bold",
                  }}
                >
                  {recipe.name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default LastSaved;

const styles = StyleSheet.create({
  HeadText: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
  },
  Container: {
    paddingTop: 20,
  },
  ImageContainer: {
    backgroundColor: "#ffff",
    borderRadius: 15,
  },
  ButtonContainer: {
    padding: 15,
    marginTop: 15,
    height: 100,
    backgroundColor: "#D5E3E7",
    // width: "100%",
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
});
