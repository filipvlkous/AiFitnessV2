import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import { DataType, CookBookStackType } from "../types/navigatorTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type homeScreenProp = StackNavigationProp<CookBookStackType, "Index">;

const RenderRecipes = (recipesData: any) => {
  if (!recipesData) {
    return null;
  }

  const navigation = useNavigation<homeScreenProp>();
  const renderedRecipes = [];

  for (let i = 0; i < recipesData.length; i++) {
    const recipe: DataType = recipesData[i];

    let image = null;
    switch (recipe.option) {
      case "Snídaně":
        image = require("../assets/breakMenu.png");
        break;
      case "Oběd":
        image = require("../assets/lunchMenu.png");
        break;
      case "Večeře":
        image = require("../assets/dinnerMenu.png");
        break;
      case "Pantry recepie":
        image = require("../assets/pantryItem.png");
        break;
      default:
        break;
    }

    renderedRecipes.push(
      <TouchableOpacity
        key={i}
        onPress={() => navigation.navigate("Recepie", { recepie: recipe })}
      >
        <View style={styles.ButtonContainer}>
          <View style={styles.ImageContainer}>
            <Image source={image} />
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
  }

  return renderedRecipes;
};

export default RenderRecipes;

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
