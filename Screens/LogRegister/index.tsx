import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { LoginRegisterTypeStack } from "../../types/navigatorTypes";
import Frame15 from "../../assets/Frame15.png";
import ButtonDark from "../../components/ButtonDark";
import ButtonNoBackground from "../../components/ButtonNoBackgorund";
import ModalLogin from "./Login/ModalLogin";
import ModalRegister from "./Register/ModalRegister";

export default function LoginIndex({
  navigation,
  route,
}: NativeStackScreenProps<LoginRegisterTypeStack>) {
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  const LoginPress = () => {
    setLoginModal(!loginModal);
  };
  const RegisterPress = () => {
    setRegisterModal(!registerModal);
  };
  return (
    <View>
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.ViewContainer}>
            <View style={styles.HeaderContainer}>
              <Text style={styles.HeaderText}>AI fitness planner</Text>
              <Text style={styles.BodyText}>
                Denní fitness plány přizpůsobené vašemu životnímu stylu.
              </Text>
            </View>
            <Image source={Frame15} />

            <View style={styles.ButtonContainer}>
              <ButtonDark
                style={{ marginBottom: 20 }}
                title={"Vytvořit účet"}
                onPress={RegisterPress}
              />
              <ButtonNoBackground title="Přihlásit se" onPress={LoginPress} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
      {loginModal ? <ModalLogin closeModal={LoginPress} /> : null}
      {registerModal ? (
        <ModalRegister closeModal={RegisterPress} navigation={navigation} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  HeaderText: {
    fontFamily: "Inter-ExtraBold",
    fontSize: 30,
    paddingTop: 20,
    color: "#47646A",
  },
  ViewContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },
  ButtonContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingHorizontal: "10%",
  },
  HeaderContainer: {
    width: "80%",
  },
  BodyText: {
    paddingTop: 10,
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
  },
});
