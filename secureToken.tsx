import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

export async function save(key: string, value: string) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (e: unknown) {
    if (typeof e === "string") {
      Alert.alert(e);
    }
    //CONSOLE LOG CHYBA
    console.log(e);
  }
}

export async function getValueFor(key: string | undefined) {
  try {
    if (key == undefined) return;
    const token = await SecureStore.getItemAsync(key);
    if (token) return token;
  } catch (e) {
    if (typeof e === "string") {
      Alert.alert(e);
    }
    //CONSOLE LOG CHYBA
    console.log(e);
  }
}
