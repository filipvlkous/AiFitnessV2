import {
  GestureResponderEvent,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import AiTab from "../assets/AiTab.png";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./Home/StackIndex";
import PantryScreen from "./Pantry/index";
import AiScreen from "./AI/index";
import CookBookIndex from "./CookBook";
import ProfileScreen from "./Profile/index";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import { CustomTab } from "./TabIcon";
import { useIsFocused } from "@react-navigation/native";
import { useAppDispatch } from "../redux/store/testStore";
import {
  fetchUser,
  getAllRecepies,
  getFreezer,
  getFridge,
  getOther,
  getStorage,
} from "../redux/actions/testLoginUser";
import db from "../initFirebase";
import { TabMainNavigator } from "../types/navigatorTypes";

export default function Index({ numb }: { numb: number }) {
  const Tab = createBottomTabNavigator<TabMainNavigator>();
  const dispatch = useAppDispatch();
  const user = db.auth().currentUser;

  useEffect(() => {
    const freeyzSub = dispatch(getFreezer(user.uid));
    const fridgeSub = dispatch(getFridge(user.uid));
    const storageSub = dispatch(getStorage(user.uid));
    const otherSub = dispatch(getOther(user.uid));

    return () => {
      //clean up
      freeyzSub();
      fridgeSub();
      storageSub();
      otherSub();
    };
  }, []);

  useEffect(() => {
    dispatch(fetchUser());
    const subscriber = dispatch(getAllRecepies(user?.uid, numb));
    return () => {
      //clean up
      subscriber();
    };
  }, [numb]);

  const CustomButton = ({
    children,
    onPress,
  }: {
    children: React.ReactNode;
    onPress?: (event: GestureResponderEvent) => void;
  }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={{ height: 50 }}>{children}</View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
      >
        <Tab.Screen
          options={({ route, navigation }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <CustomTab
                  style={{ zIndex: 20, position: "absolute" }}
                  focused={useIsFocused()}
                  color={color}
                  size={50}
                  route={route}
                />
              );
            },
          })}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          name="Pantry"
          component={PantryScreen}
          options={({ route, navigation }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <View
                  style={{
                    width: 50,
                    overflow: "hidden",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 10,
                    marginRight: 10,
                  }}
                >
                  <CustomTab
                    focused={useIsFocused()}
                    color={null}
                    size={200}
                    route={route}
                  />
                </View>
              );
            },
          })}
        />
        <Tab.Screen
          options={{
            tabBarIcon: () => {
              return (
                <View style={{ position: "absolute", top: -35 }}>
                  <Image source={AiTab} />
                </View>
              );
            },
            tabBarButton: (props) => {
              return <CustomButton {...props} />;
            },
          }}
          name="Ai"
          component={AiScreen}
        />
        <Tab.Screen
          name="Cookbook"
          component={CookBookIndex}
          options={({ route, navigation }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <CustomTab
                  style={{ marginTop: 13, marginLeft: 20 }}
                  focused={useIsFocused()}
                  color={color}
                  size={60}
                  route={route}
                />
              );
            },
          })}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={({ route, navigation }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <CustomTab
                  focused={useIsFocused()}
                  color={color}
                  size={35}
                  route={route}
                />
              );
            },
          })}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}
