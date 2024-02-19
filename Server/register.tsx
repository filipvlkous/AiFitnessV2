import axios from "axios";
import { InitForm } from "../types/navigatorTypes";
import { Alert } from "react-native";
import firebase from "../initFirebase";
import { serverUrl } from ".";

export const checkIfUserExists = async (params: String, authHeader: string) => {
  try {
    const result = await axios.post(
      `${serverUrl}/firebase/emailTest`,
      {
        email: params,
      },
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );
    return result.data;
  } catch (error) {
    Alert.alert("Nastala nečekaná chyba.");
  }
};

export const createInDb = async ({
  user,
  authHeader,
}: {
  user: InitForm;
  authHeader: string;
}) => {
  try {
    await axios.post(
      `${serverUrl}/firebase/createUser`,
      {
        password: user.password,
        firstName: user.firstName,
        email: user.email,
        age: user.age,
        weight: user.weight,
        sex: user.sex,
        height: user.height,
        diet: user.diet,
        allergies: user.allergies,
        aim: user.aim,
      },
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );
    console.log("ok");
  } catch (error: any) {
    Alert.alert("Chyba serveru:" + error.message);
    console.log(error.message);
  }
};

export const updateUserDetails = async ({
  diet,
  height,
  weight,
  allergies,
  aim,
}: {
  diet: string;
  height: number;
  weight: number;
  allergies: string[];
  aim: string;
}) => {
  try {
    const user = firebase.auth().currentUser;
    const token = await user.getIdToken();

    let respond = await axios.post(
      `${serverUrl}/firebase/updateUserDetails`,
      { data: { diet, height, weight, allergies, aim }, uid: user.uid },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    Alert.alert("Changes have been saved");
    return respond.data;
  } catch (error) {
    Alert.alert("Can't save your data now. Please try agin later.");
  }
};
