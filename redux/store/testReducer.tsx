import {
  USER_STATE_CHANGE,
  GET_FREEZER_PANTRY,
  GET_ALL_RECEPIES,
  GET_STORAGE_PANTRY,
  GET_FRIDGE_PANTRY,
  GET_OTHER_PANTRY,
  NUMBER_OF_DOCS,
} from "../ActionTypes/index";
import { AnyAction, Reducer } from "redux";

type UserData = {
  age: number;
  aim: string;
  allergies: string[]; // You can specify the type of the elements in the array if you know it
  diet: string;
  email: string;
  height: number;
  name: string;
  sex: string;
  subscription: boolean;
  weight: number;
};

export type PantryStore =
  | {
      id: string;
      name: string;
      created: any;
    }[]
  | undefined;

type CurrentUser = {
  data: UserData;
  uid: string;
};

type MyData = {
  currentUser: CurrentUser | undefined;
  recepies:
    | {
        id: string;
        option: string;
        recepies?: string;
        created: any;
        name: string;
        ingredients: string;
        instruction: string;
      }[]
    | undefined;
  freezer: PantryStore;
  fridge: PantryStore;
  storage: PantryStore;
  other: PantryStore;
  numberDoc: number;
};
type ActionType = {
  type: string;
  currentUser: CurrentUser;
  arr: any;
  numberDoc: number;
};
type ReducerActionType = ActionType | AnyAction;

const initialState: MyData = {
  currentUser: undefined,
  recepies: undefined,
  freezer: undefined,
  fridge: undefined,
  storage: undefined,
  other: undefined,
  numberDoc: 5,
};

const counterReducer: Reducer<MyData, ReducerActionType> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case USER_STATE_CHANGE: {
      return {
        ...state,
        currentUser: action.currentUser,
      };
    }
    case GET_ALL_RECEPIES: {
      return { ...state, recepies: action.arr };
    }
    case GET_FREEZER_PANTRY: {
      return { ...state, freezer: action.arr };
    }
    case GET_FRIDGE_PANTRY: {
      return { ...state, fridge: action.arr };
    }
    case GET_STORAGE_PANTRY: {
      return { ...state, storage: action.arr };
    }
    case GET_OTHER_PANTRY: {
      return { ...state, other: action.arr };
    }
    case NUMBER_OF_DOCS: {
      return { ...state, numberDoc: state.numberDoc + 5 };
    }
    default:
      return state;
  }
};

export default counterReducer;
