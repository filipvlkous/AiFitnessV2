import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/functions";
import { initializeFirestore } from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.apiKey,
  authDomain: Constants.expoConfig?.extra?.authDomain,
  projectId: Constants.expoConfig?.extra?.projectId,
  storageBucket: Constants.expoConfig?.extra?.storageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.messagingSenderId,
  appId: Constants.expoConfig?.extra?.appId,
  measurementId: Constants.expoConfig?.extra?.measurementId,
};

export let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

firebase
  .firestore()
  .settings({ experimentalAutoDetectLongPolling: true, merge: true }); //add this..
// firebase
//   .firestore()
//   .settings({ merge: true, experimentalForceLongPolling: true });
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default firebase;
