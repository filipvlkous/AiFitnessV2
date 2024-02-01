// import axios from "axios";
// import { getValueFor } from "../../secureToken";
// import firebase from "../../initFirebase";
// import { Alert } from "react-native";

// // 192.168.158.173
// // 10.0.0.54
// //172.20.10.5
// const id = "192.168.1.193";

// export const fetchRecepiesForDay = async () => {
//   try {
//     const key = firebase.auth().currentUser?.uid;
//     const token = await getValueFor(key);

//     let respond = await axios.get(`http://${id}:8080/openai/getDayRecepies`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const result = parseText(respond.data);
//     return result;
//   } catch (error) {
//     Alert.alert("Can't connect to server now. Please try agin later.");
//   }
// };

// export const fetchOneRecepie = async (
//   recepie: string,
//   keyText: string,
//   options: string
// ) => {
//   try {
//     const key = firebase.auth().currentUser?.uid;
//     const token = await getValueFor(key);

//     let respond = await axios.post(
//       `http://${id}:8080/openai/getRecepie`,
//       {
//         text: recepie,
//         key: keyText,
//         options: options,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     return respond.data;
//   } catch (error) {
//     Alert.alert("Can't connect to server now. Please try agin later.");
//   }
// };

// export const getOneMeal = async (meal: string) => {
//   try {
//     const key = firebase.auth().currentUser?.uid;
//     const token = await getValueFor(key);

//     let respond = await axios.post(
//       `http://${id}:8080/openai/getOneMeal`,
//       { meal: meal },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return respond.data;
//   } catch (error) {
//     Alert.alert("Can't connect to server now. Please try agin later.");
//   }
// };

// export const deleteRecepie = async (idRecepie: string) => {
//   try {
//     const key = firebase.auth().currentUser?.uid;
//     const token = await getValueFor(key);

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       data: { idRecepie }, // Use the "data" property to send the payload
//     };
//     await axios.delete(`http://${id}:8080/firebase/deleteRecepie`, config);
//     // console.log(response, "respond");
//   } catch (error: any) {
//     Alert.alert("Can't delete recepie. Please try agin later.");
//   }
// };

// export const fetchPantryRecepie = async (items: any[] | undefined) => {
//   try {
//     const key = firebase.auth().currentUser?.uid;
//     const token = await getValueFor(key);

//     let respond = await axios.post(
//       `http://${id}:8080/openai/getPantryRecepie`,
//       { items },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (respond.status == 200) {
//       return respond.data;
//     }
//   } catch (error) {
//     Alert.alert("Can't connect to server. Please try agin later.");
//   }
// };

// export const saveRecepie = async (option: string, text: string) => {
//   try {
//     const key = firebase.auth().currentUser?.uid;
//     const token = await getValueFor(key);

//     let respond = await axios.post(
//       `http://${id}:8080/firebase/saveRecepie`,
//       { text, option },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return respond.data;
//   } catch (error) {
//     Alert.alert("Can't save recepie now. Please try agin later.");
//     return false;
//   }
// };

// export const savePantryRecepie = async (text: {
//   ingredients: string;
//   name: string;
//   instructions: string;
// }) => {
//   try {
//     const key = firebase.auth().currentUser?.uid;
//     const token = await getValueFor(key);

//     let respond = await axios.post(
//       `http://${id}:8080/firebase/savePantryRecepie`,
//       { text, option: "Pantry recepie" },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return respond.data;
//   } catch (error) {
//     Alert.alert("Can't save recepie now. Please try agin later.");
//     return false;
//   }
// };

// export const getFitness = async () => {
//   try {
//     const key = firebase.auth().currentUser?.uid;
//     const token = await getValueFor(key);

//     let respond = await axios.get(`http://${id}:8080/openai/getTrainingPlan`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return respond.data;
//   } catch (error) {
//     console.log(error);
//     Alert.alert("error from getFitness");
//     return false;
//   }
// };

// export const updateUserDetails = async ({
//   diet,
//   height,
//   weight,
//   allergies,
//   aim,
// }: {
//   diet: string;
//   height: number;
//   weight: number;
//   allergies: string[];
//   aim: string;
// }) => {
//   try {
//     const key = firebase.auth().currentUser?.uid;
//     const token = await getValueFor(key);

//     let respond = await axios.post(
//       `http://${id}:8080/firebase/updateUserDetails`,
//       { data: { diet, height, weight, allergies, aim }, uid: key },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     if (respond.status == 200) {
//       Alert.alert("Changes have been saved");
//       return respond.data;
//     } else throw Alert.alert("Error status 500");
//   } catch (error) {
//     Alert.alert("Can't save your data now. Please try agin later.");
//   }
// };

// export const savePantry = async (option: string, arr: string[]) => {
//   try {
//     const key = firebase.auth().currentUser?.uid;
//     const token = await getValueFor(key);

//     let respond = await axios.post(
//       `http://${id}:8080/firebase/savePantryItems`,
//       { option, arr },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return respond.data;
//   } catch (error: any) {
//     Alert.alert("Can't connect to server now. Please try agin later.");
//     return false;
//   }
// };

// export const deletePantry = async (option: string, idPantry: string) => {
//   try {
//     const key = firebase.auth().currentUser?.uid;
//     const token = await getValueFor(key);

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       data: { option, idPantry }, // Use the "data" property to send the payload
//     };
//     let response = await axios.delete(
//       `http://${id}:8080/firebase/deletePantryItems`,
//       config
//     );
//   } catch (error) {
//     Alert.alert("Can't connect to server now. Please try agin later.");
//     return false;
//   }
// };

// function parseText(text: string) {
//   const keywords: Map<string, string[]> = new Map([
//     ["Snídaně", []],
//     ["Svačina", []],
//     ["Oběd", []],
//     ["Svačina2", []],
//     ["Večeře", []],
//   ]);
//   const reg = /(?=Svačina|Oběd|Snídaně|Večeře|Svacina2)/;

//   const lines = text.split(reg);

//   for (const line of lines) {
//     let foundKeyword = null;

//     for (const [keyword, dataArray] of keywords) {
//       if (line.includes(keyword)) {
//         foundKeyword = dataArray.length > 0 ? "Svačina2" : keyword;
//         break;
//       }
//     }

//     if (foundKeyword) {
//       keywords.get(foundKeyword)?.push(line);
//     }
//   }

//   return keywords;
// }
