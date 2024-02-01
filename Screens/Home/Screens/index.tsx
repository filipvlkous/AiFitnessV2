import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import GoPremium from "./GoPremium";
import LastSaved from "./LastSaved";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/testStore";
import Pantry from "./Pantry";
import SafeAreView from "../../../components/SafeAreView";
import Fitness from "./Fitness";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackType, TabMainNavigator } from "../../../types/navigatorTypes";
import { RouteProp } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
type ScreenANavigationProp = StackNavigationProp<TabMainNavigator, "Home">;
type ScreenARouteProp = RouteProp<HomeStackType, "Index">;
const HomeIndex: React.FC<{
  navigation: ScreenANavigationProp;
  route: ScreenARouteProp;
}> = ({ navigation, route }) => {
  const count = useSelector(
    (state: RootState) => state.counterReducer.currentUser
  );

  if (count == undefined) {
    return <Text>Načítání</Text>;
  }

  //on focus change the anim will play

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#FFFEFC" }}
    >
      <SafeAreView style={{ height: "100%", backgroundColor: "#FFFEFC" }}>
        <View style={styles.Container}>
          <View style={styles.WellcomeContainer}>
            <Text style={styles.TextStyle}>Uživatel {count.data.name}</Text>
            <Image
              style={{ height: 40, width: 40 }}
              source={require("../../../assets/Male.png")}
            />
          </View>
          {count.data.subscription ? <GoPremium /> : null}
          <LastSaved route={route} navigation={navigation} />
          <Fitness />
          <Pantry />
        </View>
      </SafeAreView>
    </ScrollView>
  );
};

export default HomeIndex;
const styles = StyleSheet.create({
  Container: {
    width: "100%",
    display: "flex",
    height: "100%",
    // marginHorizontal: 40,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  WellcomeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  TextStyle: {
    fontSize: 30,
    fontFamily: "Inter-SemiBold",
    color: "#000000",
  },
});
