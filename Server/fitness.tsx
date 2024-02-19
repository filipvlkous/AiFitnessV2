import firebase from "firebase/compat";
import axios from "axios";
import { serverUrl } from ".";
import { Alert } from "react-native";
import { date } from "yup";

export const getFitness = async () => {
  try {
    const token = await firebase.auth().currentUser?.getIdToken();

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

export const getSavedFitness = async () => {
  try {
    const token = await firebase.auth().currentUser?.getIdToken();

    let respond = await axios.get(`${serverUrl}/firebase/getFitnessData`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return respond.data.data;
  } catch (error) {
    throw Alert.alert("Error from getFitness:" + error.message);
  }
};
