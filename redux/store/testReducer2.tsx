import {
  FIRST_STEP,
  SECOND_STEP,
  THIRD_STEP,
  FOURTH_STEP,
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
  password: string;
  firstName: string;
};

type ActionType = {
  type: "FIRST_STEP" | "SECOND_STEP" | "THIRD_STEP" | "FOURTH_STEP";
  first: {
    email: string;
    password: string;
  };
  second: {
    height: number;
    sex: string;
    weight: number;
    age: number;
    firstName: string;
  };
  third: {
    diet: string;
    allergies: string[];
  };
  fourth: {
    aim: string;
  };
};

const initialState: UserData = {
  email: "",
  sex: "",
  password: "",
  height: 0,
  age: 0,
  weight: 0,
  firstName: "",
  diet: "",
  allergies: [],
  aim: "",
  name: "",
  subscription: false,
};

const registerReducer: Reducer<UserData, ActionType | AnyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FIRST_STEP: {
      return {
        ...state,
        email: action.first.email,
        password: action.first.password,
      };
    }
    case SECOND_STEP: {
      return {
        ...state,
        height: action.second.height,
        sex: action.second.sex,
        weight: action.second.weight,
        age: action.second.age,
        firstName: action.second.firstName,
      };
    }
    case THIRD_STEP: {
      return {
        ...state,
        diet: action.third.diet,
        allergies: action.third.allergies,
      };
    }
    case FOURTH_STEP: {
      return { ...state, aim: action.fourth.aim };
    }
    default:
      return state;
  }
};

export default registerReducer;
