import firebase from "firebase/compat";
import { getValueFor } from "../secureToken";
import axios from "axios";
import { serverUrl } from ".";
import { Alert } from "react-native";

export const getFitness = async () => {
  try {
    const key = firebase.auth().currentUser?.uid;
    const token = await getValueFor(key);

    let respond = await axios.get(`${serverUrl}/openai/getTrainingPlan`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return respond.data;
  } catch (error) {
    console.log(error);
    Alert.alert("error from getFitness");
    return false;
  }
};
