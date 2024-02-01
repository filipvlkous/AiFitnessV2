import React, { useEffect, useState } from "react";
import LoginIndex from "./Screens/LogRegister";
import RegisterIndex from "./Screens/LogRegister/Register/steps";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginRegisterTypeStack } from "./types/navigatorTypes";
import { UserInfo } from "firebase/auth";
import firebase from "./initFirebase";
import HomeIndex from "./Screens/index";
import { View, Text } from "react-native";
import { useFonts } from "expo-font";
import { save } from "./secureToken";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store/testStore";

const Stack = createNativeStackNavigator<LoginRegisterTypeStack>();

export default function Index(): JSX.Element {
  const [authUser, setAuthUser] = useState<{
    loaded: boolean;
    currentUser: UserInfo | null;
    loggedIn: boolean;
  }>({ loaded: false, currentUser: null, loggedIn: false });

  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-ExtraLight": require("./assets/fonts/Inter-ExtraLight.ttf"),
    "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
    "Inter-ExtraBold": require("./assets/fonts/Inter-ExtraBold.ttf"),
    "Inter-Thin": require("./assets/fonts/Inter-Thin.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
  });
  const count = useSelector(
    (state: RootState) => state.counterReducer.numberDoc
  );

  useEffect(() => {
    const unsubscribeAuth = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        setAuthUser({
          loggedIn: false,
          loaded: true,
          currentUser: null,
        });
      } else {
        const id = user.uid;
        const token = await user.getIdToken();
        save(id, token);

        setAuthUser({
          loggedIn: true,
          loaded: true,
          currentUser: user,
        });
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  if (fontsLoaded == false) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  if (!authUser.loaded && fontsLoaded && !authUser.currentUser) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  if (!authUser.loggedIn && fontsLoaded && !authUser.currentUser) {
    return (
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginIndex} />
        <Stack.Screen name="Register" component={RegisterIndex} />
      </Stack.Navigator>
    );
  }
  return <HomeIndex numb={count} />;
}
