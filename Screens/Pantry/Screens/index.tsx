import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PantryStackType } from "../../../types/navigatorTypes";
import Button from "../../../components/ButtonDark";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SafeAreView from "../../../components/SafeAreView";
import { RootState, useAppDispatch } from "../../../redux/store/testStore";
import {
  getFreezer,
  getFridge,
  getStorage,
  getOther,
} from "../../../redux/actions/testLoginUser";
import { useSelector } from "react-redux";
import { fetchPantryRecepie } from "../../../Server/recepies";
import ModalPantry from "../modal";

export default function Index({
  navigation,
  route,
}: NativeStackScreenProps<PantryStackType>) {
  const data = useSelector((state: RootState) => state.counterReducer);
  const [loaded, setLoaded] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState<
    | {
        ingredients: string;
        name: string;
        instructions: string;
      }
    | undefined
  >();
  const dispatch = useAppDispatch();
  let combinedArray: any[] = [];
  // let dataLenght =data.freezer?.length? + data.fridge?.length? + data.other?.length? + data.storage?.length
  const callFetchPantryRecepie = async () => {
    if (
      data.freezer != undefined &&
      data.fridge != undefined &&
      data.other != undefined &&
      data.storage != undefined
    ) {
      combinedArray = data.freezer.concat(
        data.fridge,
        data.storage,
        data.other
      );
    }
    const newArray: string[] = [];
    combinedArray.map((i: any) => {
      newArray.push(i.name);
    });
    await fetchPantryRecepie(newArray).then((e) => {
      if (e != undefined) {
        console.log(e);
        setModalShow(true);
        setModalData(e);
      }
    });
  };

  useEffect(() => {
    const freeyzSub = dispatch(getFreezer(data.currentUser?.uid));
    const fridgeSub = dispatch(getFridge(data.currentUser?.uid));
    const storageSub = dispatch(getStorage(data.currentUser?.uid));
    const otherSub = dispatch(getOther(data.currentUser?.uid));
    setLoaded(false);

    return () => {
      //clean up
      freeyzSub();
      fridgeSub();
      storageSub();
      otherSub();
    };
  }, []);
  return (
    <SafeAreView style={{ height: "100%", backgroundColor: "#FFFEFC" }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={styles.HeadTextStyle}>Spižírna</Text>

        <PantryStorage
          route={route}
          navigation={navigation}
          name={"Lednice"}
          icon="fridge-outline"
        />
        <PantryStorage
          route={route}
          navigation={navigation}
          name={"Mrazák"}
          icon={"snowflake"}
        />
        <PantryStorage
          route={route}
          navigation={navigation}
          name={"Police a skříně"}
          icon={"library-shelves"}
        />
        <PantryStorage
          route={route}
          navigation={navigation}
          name="Ostatní"
          icon="basket-outline"
        />
        <Text style={[styles.SecondTxt, { color: "#4a4a4a", paddingTop: 15 }]}>
          Vaše potraviny proměním ve tři chutné recepty, a vy si můžete vybrat
          ten, který nejlépe vyhovuje vašim chuťovým buňkám.
        </Text>
        <Text
          style={[
            styles.SecondTxt,
            { color: "#4a4a4a", paddingTop: 15, fontSize: 13 },
          ]}
        >
          Prosím, uložte si alespoň 5 potravin.
        </Text>

        <Button
          onPress={callFetchPantryRecepie}
          disabled={combinedArray.length >= 5}
          style={
            combinedArray.length <= 5
              ? { marginTop: 30 }
              : { marginTop: 30, backgroundColor: "#47646a70" }
          }
          img={true}
          title="Generovat recepty"
        />
        {modalData != undefined ? (
          <Button
            img={false}
            title="Show recepie"
            style={{ marginTop: 15 }}
            onPress={() => setModalShow(true)}
          />
        ) : null}
      </View>
      {modalShow ? (
        <ModalPantry
          heightVal={0}
          closeModal={() => setModalShow(false)}
          visible={modalShow}
          modalData={modalData}
        />
      ) : null}
    </SafeAreView>
  );
}

const PantryStorage = ({
  navigation,
  route,
  name,
  icon,
}: NativeStackScreenProps<PantryStackType> & {
  name: string;
  icon: string;
}) => {
  let value;
  const data = useSelector((state: RootState) => state.counterReducer);

  switch (name) {
    case "Lednice":
      value = data.fridge?.length;
      if (data.fridge == undefined) {
        value = "Loading...";
      }
      break;
    case "Mrazák":
      value = data.freezer?.length;
      if (data.freezer == undefined) {
        value = "Loading...";
      }
      break;
    case "Police a skříně":
      value = data.storage?.length;
      if (data.storage == undefined) {
        value = "Loading...";
      }
      break;
    case "Ostatní":
      value = data.other?.length;
      if (data.storage == undefined) {
        value = "Loading...";
      }
      break;
    default:
      break;
  }
  const navigateToScreen = () => {
    // Use the name prop to navigate to the corresponding screen
    if (name === "Lednice") {
      navigation.navigate("PantryType", { name: "Lednice", data: data.fridge });
    } else if (name === "Mrazák") {
      navigation.navigate("PantryType", { name: "Mrazák", data: data.freezer });
    } else if (name === "Police a skříně") {
      navigation.navigate("PantryType", {
        name: "Police a skříně",
        data: data.storage,
      });
    } else if (name === "Ostatní") {
      navigation.navigate("PantryType", { name: "Ostatní", data: data.other });
    }
    // Add more conditions for other screen names as needed
  };
  return (
    <TouchableOpacity style={styles.container} onPress={navigateToScreen}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#EAF2F3",
            padding: 3,
            marginRight: 10,
            borderRadius: 10,
          }}
        >
          <Icon name={icon} size={50} color="#47646A" />
        </View>

        <View>
          <Text style={styles.MainTxt}>{name}</Text>
          <Text style={styles.SecondTxt}>{value} ks</Text>
        </View>
      </View>

      <Text>
        <Icon name="chevron-right" size={50} color="#47646A" />
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  HeadTextStyle: {
    fontSize: 30,
    fontFamily: "Inter-SemiBold",
    color: "#000000",
  },
  container: {
    paddingVertical: 10,
    borderBottomColor: "#E6DED2",
    borderBottomWidth: 2,
    margin: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  MainTxt: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: "#000",
    paddingBottom: 5,
  },
  SecondTxt: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#9c9c9c",
  },
});
