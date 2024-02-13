import axios from "axios";
import { getValueFor } from "../secureToken";
import firebase from "../initFirebase";
import { Alert } from "react-native";
import { serverUrl } from ".";

export const fetchRecepiesForDay = async () => {
  try {
    const key = firebase.auth().currentUser?.uid;
    const token = await getValueFor(key);

    let respond = await axios.get(`${serverUrl}/openai/getDayRecepies`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = parseText(respond.data);
    return result;
  } catch (error) {
    Alert.alert("Can't connect to server now. Please try agin later.");
  }
};

export const fetchOneRecepie = async (
  recepie: string,
  keyText: string,
  options: string
) => {
  try {
    const key = firebase.auth().currentUser?.uid;
    const token = await getValueFor(key);

    let respond = await axios.post(
      `${serverUrl}/openai/getRecepie`,
      {
        text: recepie,
        key: keyText,
        options: options,
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
    const key = firebase.auth().currentUser?.uid;
    const token = await getValueFor(key);

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
    const key = firebase.auth().currentUser?.uid;
    const token = await getValueFor(key);

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

export const fetchPantryRecepie = async (items: any[] | undefined) => {
  try {
    const key = firebase.auth().currentUser?.uid;
    const token = await getValueFor(key);

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

export const saveRecepie = async (option: string, text: string) => {
  try {
    const key = firebase.auth().currentUser?.uid;
    const token = await getValueFor(key);

    let respond = await axios.post(
      `${serverUrl}/firebase/saveRecepie`,
      { text, option },
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

export const savePantryRecepie = async (text: {
  ingredients: string;
  name: string;
  instructions: string;
}) => {
  try {
    const key = firebase.auth().currentUser?.uid;
    const token = await getValueFor(key);

    let respond = await axios.post(
      `${serverUrl}/firebase/savePantryRecepie`,
      { text, option: "Pantry recepie" },
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
    Alert.alert("Can't connect to server now. Please try agin later.");
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
