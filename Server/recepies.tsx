import axios from "axios";
import firebase from "../initFirebase";
import { Alert } from "react-native";
import { serverUrl } from ".";

export const fetchRecepiesForDay = async () => {
  try {
    const token = await firebase.auth().currentUser?.getIdToken();

    let respond = await axios.get(`${serverUrl}/openai/getDayRecepies`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = parseText(respond.data);
    return result;
  } catch (error) {
    console.log(error);
    Alert.alert("Can't connect to server now. Please try agin later.");
  }
};

export const fetchOneRecepie = async (
  recepie: string,
  keyText: string,
  option: string
) => {
  try {
    const token = await firebase.auth().currentUser?.getIdToken();
    // const token = await getValueFor(key);

    let respond = await axios.post(
      `${serverUrl}/openai/getRecepie`,
      {
        text: recepie,
        key: keyText,
        option: option,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(respond.data);
    return respond.data;
  } catch (error) {
    Alert.alert("Can't connect to server now. Please try agin later.");
  }
};

export const getOneMeal = async (meal: string) => {
  try {
    const token = await firebase.auth().currentUser?.getIdToken();

    let respond = await axios.post(
      `${serverUrl}/openai/getOneMeal`,
      { meal: meal },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return respond.data;
  } catch (error: any) {
    console.log(error.message);
    Alert.alert(
      "Can't connect to server now. Single meal Error. Please try agin later."
    );
  }
};

export const deleteRecepie = async (idRecepie: string) => {
  try {
    const token = await firebase.auth().currentUser?.getIdToken();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: { idRecepie }, // Use the "data" property to send the payload
    };
    await axios.delete(`${serverUrl}/firebase/deleteRecepie`, config);
    // console.log(response, "respond");
  } catch (error: any) {
    Alert.alert("Can't delete recepie. Please try agin later.");
  }
};

export const saveRecepie = async (
  option: string,
  text: string,
  allRecepie: boolean
) => {
  try {
    const token = await firebase.auth().currentUser?.getIdToken();

    let respond = await axios.post(
      `${serverUrl}/firebase/saveRecepie`,
      { text, option, parsed: false, allRecepie },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return respond.data;
  } catch (error) {
    Alert.alert("Can't save recepie now. Please try agin later.");
    return false;
  }
};

function parseText(text: string) {
  const keywords: Map<string, string[]> = new Map([
    ["Snídaně", []],
    ["Svačina", []],
    ["Oběd", []],
    ["Svačina2", []],
    ["Večeře", []],
  ]);
  const reg = /(?=Svačina|Oběd|Snídaně|Večeře|Svacina2)/;

  const lines = text.split(reg);

  for (const line of lines) {
    let foundKeyword = null;

    for (const [keyword, dataArray] of keywords) {
      if (line.includes(keyword)) {
        foundKeyword = dataArray.length > 0 ? "Svačina2" : keyword;
        break;
      }
    }

    if (foundKeyword) {
      keywords.get(foundKeyword)?.push(line);
    }
  }

  return keywords;
}
