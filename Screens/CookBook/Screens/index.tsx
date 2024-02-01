import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import renderRecipes from "../../../components/CookbookItem";
import { RootState, useAppDispatch } from "../../../redux/store/testStore";
import SafeAreView from "../../../components/SafeAreView";
import Button from "../../../components/ButtonDark";
import { numberOfDocs } from "../../../redux/actions/testLoginUser";
import ImgMain from "../../../assets/coockbookMain.png";

export default function CookIndex() {
  const { recepies, numberDoc } = useSelector(
    (state: RootState) => state.counterReducer
  );
  const dispatch = useAppDispatch();
  const renderedRecipes = renderRecipes(recepies);
  let showButton = true;

  if (recepies != undefined) {
    showButton = recepies?.length < numberDoc ? true : false;
  }
  return (
    <ScrollView
      style={{ backgroundColor: "#FFFEFC" }}
      // contentOffset={{ x: 0, y: 0 }}
      // contentInset={{ top: 25 }}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreView style={{ height: "100%", backgroundColor: "#FFFEFC" }}>
        <Text style={styles.TextStyle}>Uložené recepty</Text>

        <View style={styles.Container}>
          {renderedRecipes?.length != 0 ? (
            renderedRecipes
          ) : (
            <View>
              <Image
                style={{
                  marginTop: 100,
                  width: 290,
                  height: 300,
                }}
                source={ImgMain}
              />
              <Text
                style={{
                  paddingTop: 60,
                  fontFamily: "Inter-SemiBold",
                  color: "#808080",
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                Žádné uložené recepty...
              </Text>
            </View>
          )}
          {showButton ? null : (
            <Button
              title="Načíst další"
              style={{ marginTop: 20 }}
              onPress={() => dispatch(numberOfDocs())}
            />
          )}
        </View>
      </SafeAreView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  TextStyle: {
    paddingHorizontal: 20,
    fontSize: 30,
    fontFamily: "Inter-SemiBold",
    color: "#000000",
    zIndex: 10,
  },
  Container: {
    height: "100%",
    position: "relative",
    alignItems: "center",
    width: "100%",
    display: "flex",
    // marginHorizontal: 40,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
});
