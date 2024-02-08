import axios from "axios";
import { getValueFor } from "../secureToken";
import firebase from "../initFirebase";
import { Alert } from "react-native";
import { serverUrl } from ".";

export const savePantry = async (option: string, arr: string[]) => {
  try {
    const key = firebase.auth().currentUser?.uid;
    const token = await getValueFor(key);

    let respond = await axios.post(
      `${serverUrl}/firebase/savePantryItems`,
      { option, arr },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return respond.data;
  } catch (error: any) {
    Alert.alert(error.message);
    return false;
  }
};

export const deletePantry = async (option: string, id: string) => {
  try {
    const key = firebase.auth().currentUser?.uid;
    const token = await getValueFor(key);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: { option, id }, // Use the "data" property to send the payload
    };
    await axios.delete(`${serverUrl}/firebase/deletePantryItems`, config);
  } catch (error) {
    Alert.alert("error  while deleting item");
    return false;
  }
};
