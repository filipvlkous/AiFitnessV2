import {
  FIRST_STEP,
  FOURTH_STEP,
  SECOND_STEP,
  THIRD_STEP,
} from "../ActionTypes";

export const firstStepRedux = (email: string, password: string) => {
  return {
    type: FIRST_STEP,
    first: {
      email,
      password,
    },
  };
};

export const secondStepRedux = (
  firstName: string,
  sex: string,
  age: number,
  weight: number,
  height: number
) => {
  return {
    type: SECOND_STEP,
    second: {
      firstName,
      age,
      weight,
      sex,
      height,
    },
  };
};

export const thirdStepRedux = (diet: string, allergies: string[]) => {
  return {
    type: THIRD_STEP,
    third: {
      diet,
      allergies,
    },
  };
};

export const fourthStepRedux = (aim: string) => {
  return {
    type: FOURTH_STEP,
    fourth: {
      aim,
    },
  };
};
