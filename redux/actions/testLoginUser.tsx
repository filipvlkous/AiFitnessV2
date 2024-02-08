import {
  USER_STATE_CHANGE,
  GET_ALL_RECEPIES,
  GET_FREEZER_PANTRY,
  GET_FRIDGE_PANTRY,
  GET_STORAGE_PANTRY,
  GET_OTHER_PANTRY,
  NUMBER_OF_DOCS,
} from "../ActionTypes/index";
import db from "../../initFirebase";
import { Dispatch } from "redux";
import { changeWord } from "./addInfoRedux";

export function fetchUser() {
  return async (dispatch: Dispatch) => {
    const currentUser = db.auth().currentUser;
    if (currentUser) {
      try {
        const snapshot = await db
          .firestore()
          .collection("users")
          .doc(currentUser.uid)
          .get();

        if (snapshot.exists) {
          dispatch({
            type: USER_STATE_CHANGE,
            currentUser: {
              data: snapshot.data(),
              uid: currentUser.uid,
            },
          });
        } else {
          alert("Uživatel neexistuje");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };
}

export const getAllRecepies = (
  id: string | undefined,
  ITEMS_PER_PAGE: number
) => {
  return (dispatch: Dispatch) => {
    let query = db
      .firestore()
      .collection("users")
      .doc(id)
      .collection("dayRecepies")
      .orderBy("timestampField", "desc");

    const unsubscribe = query
      .limit(ITEMS_PER_PAGE)
      .onSnapshot((querySnapshot) => {
        const arr = querySnapshot.docs.map((voziky) => {
          const data = voziky.data();
          const id = voziky.id;
          changeWord(data);
          return { id, ...data };
        });

        dispatch({
          type: GET_ALL_RECEPIES,
          arr,
        });
      });

    return unsubscribe;
  };
};

export const numberOfDocs = () => {
  return { type: NUMBER_OF_DOCS };
};

export const getFreezer = (id: string | undefined) => {
  return (dispatch: Dispatch) => {
    const docRef = db
      .firestore()
      .collection("users")
      .doc(id)
      .collection("Mrazák")
      .orderBy("created", "desc");

    const listener = docRef.onSnapshot((querySnapshot) => {
      const arr = querySnapshot.docs.map((voziky) => {
        const data = voziky.data();
        const id = voziky.id;
        return { id, ...data };
      });
      dispatch({ type: GET_FREEZER_PANTRY, arr });
    });
    return listener;
  };
};

export const getFridge = (id: string | undefined) => {
  return (dispatch: Dispatch) => {
    const docRef = db
      .firestore()
      .collection("users")
      .doc(id)
      .collection("Lednice")
      .orderBy("created", "desc");

    const listener = docRef.onSnapshot((querySnapshot) => {
      const arr = querySnapshot.docs.map((voziky) => {
        const data = voziky.data();
        const id = voziky.id;
        return { id, ...data };
      });
      dispatch({ type: GET_FRIDGE_PANTRY, arr });
    });
    return listener;
  };
};

export const getStorage = (id: string | undefined) => {
  return (dispatch: Dispatch) => {
    const docRef = db
      .firestore()
      .collection("users")
      .doc(id)
      .collection("Skříně")
      .orderBy("created", "desc");

    const listener = docRef.onSnapshot((querySnapshot) => {
      const arr = querySnapshot.docs.map((voziky) => {
        const data = voziky.data();
        const id = voziky.id;
        return { id, ...data };
      });
      dispatch({ type: GET_STORAGE_PANTRY, arr });
    });
    return listener;
  };
};

export const getOther = (id: string | undefined) => {
  return (dispatch: Dispatch) => {
    const docRef = db
      .firestore()
      .collection("users")
      .doc(id)
      .collection("Ostatní")
      .orderBy("created", "desc");

    const listener = docRef.onSnapshot((querySnapshot) => {
      const arr = querySnapshot.docs.map((voziky) => {
        const data = voziky.data();
        const id = voziky.id;
        return { id, ...data };
      });
      dispatch({ type: GET_OTHER_PANTRY, arr });
    });
    return listener;
  };
};
