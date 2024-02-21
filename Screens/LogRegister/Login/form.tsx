import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { LoginRegisterTypeStack } from "/Users/filipvlk/Desktop/aiFitnes/aifitness/types/navigatorTypes";
import firebase from "../../../initFirebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { TextInput as NewInput } from "react-native-paper";
import DarkButton from "../../../components/ButtonDark";
import ButtonNoBackground from "../../../components/ButtonNoBackgorund";
import ErrorIcon from "../../../components/ErrorIcon";
import { styles } from "../styleSheet";
import ButtonLoading from "../../../components/ButtonDarkLoading";

export default function LoginForm({
  navigation,
}: NativeStackScreenProps<LoginRegisterTypeStack>) {
  const [loading, setLoading] = useState(false);

  const submitLogin = async (
    email: string,
    password: string
  ): Promise<void> => {
    setLoading(true);

    const lowEmail = email.toLowerCase();
    try {
      if (email != "" || password != "")
        signInWithEmailAndPassword(firebase.auth(), lowEmail, password);
    } catch (error: any) {
      let errorMessage: string;
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "User not found.";
          Alert.alert(errorMessage);

          break;
        case "auth/wrong-password":
          errorMessage = "Invalid password.";
          Alert.alert(errorMessage);
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      validationSchema={SignupSchema}
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => submitLogin(values.email, values.password)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
      }) => (
        <View style={{ width: "100%" }}>
          <View
            style={{
              marginTop: 20,
            }}
          >
            <NewInput
              theme={{
                roundness: 5,
                colors: {
                  primary: "#5e858e",
                  background: "#f1f6f7",
                },
              }}
              mode="outlined"
              label={"Email"}
              textContentType="oneTimeCode"
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              scrollEnabled={false}
            />
            {errors.email && touched.email ? (
              <View style={styles.ErrorContainer}>
                <ErrorIcon color={""} />
                <Text style={styles.errors}>{errors.email}</Text>
              </View>
            ) : (
              <Text style={[styles.errors, { color: "#ffffff" }]}>s</Text>
            )}
          </View>
          <View
            style={{
              paddingVertical: 10,
              marginBottom: 20,
            }}
          >
            <NewInput
              theme={{
                roundness: 5,
                colors: {
                  primary: "#5e858e",
                  background: "#f1f6f7",
                },
              }}
              mode="outlined"
              label="Password"
              textContentType="oneTimeCode"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              scrollEnabled={false}
              secureTextEntry
            />
            {errors.password && touched.password ? (
              <View style={styles.ErrorContainer}>
                <ErrorIcon color={""} />
                <Text style={styles.errors}>{errors.password}</Text>
              </View>
            ) : (
              <Text style={[styles.errors, { color: "#fff" }]}>s</Text>
            )}
          </View>
          <View style={styles.ButtonContainer}>
            {loading ? (
              <ButtonLoading />
            ) : (
              <DarkButton
                title={"Log in to your account"}
                onPress={handleSubmit as () => void}
              />
            )}

            <ButtonNoBackground
              title={"Don’t have an account? Register"}
              style={{ paddingTop: 30 }}
            />
          </View>
        </View>
      )}
    </Formik>
  );
}

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Please enter correct email format."
    )
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
});
