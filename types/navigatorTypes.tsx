import { FormikErrors, FormikProps, FormikTouched } from "formik/dist/types";
import { PantryStore } from "../redux/store/testReducer";
// import MyEnum from "../components/LogRegister/Register/form";

export type TabMainNavigator = {
  Home: undefined;
  Pantry: undefined;
  Ai: undefined;
  Cookbook:
    | { screen: "Index" }
    | {
        screen: "Recepie";
        params?: {
          recepie: {
            id: string;
            option: string;
            ingredients: string;
            recepies?: string;
            created: any;
            name: string;
          };
        };
      };
  Profile: undefined;
};

export type LoginRegisterTypeStack = {
  Login: undefined;
  Register: { title: string };
};

export type PantryStackType = {
  Index: undefined;
  PantryType: { name: string; data: PantryStore };
};

export type DataType = {
  option: string;
  name: string;
  id: string;
  ingredients: string;
  instructions: string;
  timestampField: any;
  image: string;
};

export type DataRecepies = {
  recepie: DataType;
};

export type HomeStackType = {
  Index: undefined;
  Premium: undefined;
};

export type CookBookStackType = {
  Index: undefined;
  Recepie: DataRecepies;
};

export type ProfileStackType = {
  Index: undefined;
  Details: undefined;
  Sub: undefined;
};

export type RegisterStackNav = {
  step1: undefined;
  step2: undefined;
  step3: undefined;
  step4: undefined;
  step5: undefined;
};

export type FirstStepFormValue = {
  email: string;
  password: string;
};

export type SecondStepFormValue = {
  age: number;
  weight: number;
  sex: string;
  height: number;
  firstName: string;
};

export type ThirdStepFormValue = {
  diet: string;
  allergies: string[];
};

export type FourthStepFormValue = {
  aim: string;
};

export type FieldType = {
  errors: FormikErrors<{
    email: string;
    password: string;
  }>;
  touched: FormikTouched<{
    email: string;
    password: string;
  }>;
  values: {
    email: string;
    password: string;
  };
  handleBlur: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  type: string;
};

export type InitForm = {
  email: string;
  password: string;
  age: number;
  weight: number;
  sex: string;
  height: number;
  firstName: string;
  diet: string;
  allergies: string[];
  aim: string;
};

export interface ComponentBProps {
  formikProps: FormikProps<{
    email: string;
    firstName: string;
    password: string;
    passwordRepeat: string;

    agreeTerms: boolean;
  }>;
  text: string;
  placeholder: string;
}
