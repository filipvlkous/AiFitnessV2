import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import { RegisterStackNav } from "../../../../../types/navigatorTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import LoadBar from "../loadBar";
import ButtonDark from "../../../../../components/ButtonDark";
import ButtonNoBackground from "../../../../../components/ButtonNoBackgorund";
import Data from "../../../../../assets/Data.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ButtonLoading from "../../../../../components/ButtonDarkLoading";
import { createInDb } from "../../../../../Server/register";
import { RootState } from "../../../../../redux/store/testStore";
import { generateHeader } from "../../../../../components/authHeader";
import firebase from "../../../.././../initFirebase";
export default function StepFive({
  navigation,
}: NativeStackScreenProps<RegisterStackNav>) {
  const data = useSelector((state: RootState) => state.registerReducer);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleRegister = async () => {
    const authHeader = generateHeader();
    setLoading(true);
    try {
      await createInDb({ user: data, authHeader });
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);

      //DODELAT DISPATCH DELETEALLDATA
      // dispatch(removeAll());
    } catch (e) {
      //MOZNA DODELAT SMAZANI UZIVATELE KDYZ BUDE CHYBNE ZAPSANI DAT DO DB
      console.log(e);
      Alert.alert("There is some problem, please repeat later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 25,
        }}
      >
        <LoadBar percentage={99} />
        <View style={{ width: "100%", gap: 15 }}>
          <Text style={styles.TextStyle}>
            Téměř hotovo... Už jen jedna věc!
          </Text>
          <Text
            style={{
              width: "100%",
              fontFamily: "Inter-Regular",
              color: "#8b8b8b",
              fontSize: 15,
            }}
          >
            Kliknutím na tlačítko "Dokončit" nám udělujete souhlas se
            zpracováním vašich údajů. A použít je pro budoucí vylepšení.
          </Text>
        </View>
      </View>
      <Image source={Data} />
      <View style={{ width: "100%" }}>
        {loading ? (
          <ButtonLoading />
        ) : (
          <ButtonDark title="Dokončit" onPress={handleRegister} />
        )}

        <ButtonNoBackground
          title="Zpátky"
          onPress={() => navigation.navigate("step4")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    display: "flex",
    height: "100%",
    justifyContent: "space-between",
    marginHorizontal: 40,
  },
  TextStyle: {
    fontSize: 30,
    fontFamily: "Inter-Bold",
    color: "#47646A",
  },
});
