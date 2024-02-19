import axios from "axios";
import firebase from "../initFirebase";
import { Alert } from "react-native";
import { serverUrl } from ".";

export const fetchPantryRecepie = async (items: any[] | undefined) => {
  try {
    const token = await firebase.auth().currentUser?.getIdToken();

    let respond = await axios.post(
      `${serverUrl}/openai/getPantryRecepie`,
      { items },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (respond.status == 200) {
      return respond.data;
    }
  } catch (error) {
    Alert.alert("Can't connect to server. Please try agin later.");
  }
};

export const savePantryRecepie = async (text: {
  ingredients: string;
  name: string;
  instructions: string;
}) => {
  try {
    const token = await firebase.auth().currentUser?.getIdToken();

    let respond = await axios.post(
      `${serverUrl}/firebase/saveRecepie`,
      { text, option: "Pantry recepie", parsed: true },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return respond.data;
  } catch (error) {
    console.log(error.message);
    Alert.alert("Can't save recepie now. Please try agin later.");
    return false;
  }
};

export const savePantry = async (option: string, arr: string[]) => {
  try {
    const token = await firebase.auth().currentUser?.getIdToken();

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
    console.log(error);
    Alert.alert("Can't connect to server now. Please try agin later.");
    return false;
  }
};

export const deletePantry = async (option: string, id: string) => {
  try {
    const token = await firebase.auth().currentUser?.getIdToken();

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
