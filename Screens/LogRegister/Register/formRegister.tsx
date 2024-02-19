import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { LoginRegisterTypeStack } from "/Users/filipvlk/Desktop/aiFitnes/aifitness/types/navigatorTypes";
import { TextInput as NewInput } from "react-native-paper";
import DarkButton from "../../../components/ButtonDark";
import ErrorIcon from "../../../components/ErrorIcon";
import { styles } from "../styleSheet";
import zxcvbn from "zxcvbn";
import DashedLineComponent from "./dashedLine";
import ButtonLoading from "../../../components/ButtonDarkLoading";
import { checkIfUserExists } from "../../../Server/register";
import { firstStepRedux } from "../../../redux/actions/testregisterUser";
import { generateHeader } from "../../../components/authHeader";
export default function RegisterForm({
  navigation,
}: NativeStackScreenProps<LoginRegisterTypeStack>) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
  });

  const submitLogin = async (
    email: string,
    password: string,
    rePassword: string
  ): Promise<void> => {
    setLoading(true);
    const lowEmail = email.toLowerCase();

    if (password !== rePassword) {
      setLoading(false);

      return Alert.alert("Hesla se neshoduji");
    }

    const authHeader = generateHeader();

    try {
      const userExists = await checkIfUserExists(lowEmail, authHeader);
      if (!userExists) {
        dispatch(firstStepRedux(lowEmail, password));
        navigation.navigate("Register");
      } else {
        Alert.alert("Email is already in use");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (password: string) => {
    const strength = zxcvbn(password) as any;
    setPasswordStrength({
      score: strength.score,
      feedback: strength.feedback.warning || strength.feedback.suggestions[0],
    });
  };

  return (
    <Formik
      validationSchema={SignupSchema}
      initialValues={{ email: "", password: "", rePassword: "" }}
      onSubmit={(values) =>
        submitLogin(values.email, values.password, values.rePassword)
      }
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
              paddingVertical: 10,
            }}
          >
            {errors.email && touched.email ? (
              <View style={styles.ErrorContainer}>
                <ErrorIcon color="white" />
                <Text style={styles.errors}>{errors.email}</Text>
              </View>
            ) : (
              <Text style={[styles.errors, { color: "#fff" }]}>s</Text>
            )}
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
              textContentType="emailAddress"
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              scrollEnabled={false}
            />
          </View>
          <View>
            {errors.password && touched.password ? (
              <View style={styles.ErrorContainer}>
                <ErrorIcon color="white" />
                <Text style={styles.errors}>{errors.password}</Text>
              </View>
            ) : (
              <Text style={[styles.errors, { color: "#fff" }]}>s</Text>
            )}
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
              textContentType="newPassword"
              value={values.password}
              onChangeText={(text) => {
                handleChange("password")(text);
                handlePasswordChange(text);
              }}
              onBlur={handleBlur("password")}
              scrollEnabled={false}
              secureTextEntry
            />
            <DashedLineComponent numberOfDashes={passwordStrength.score} />
          </View>

          <View>
            {errors.rePassword && touched.rePassword ? (
              <View style={styles.ErrorContainer}>
                <ErrorIcon color="white" />
                <Text style={styles.errors}>{errors.rePassword}</Text>
              </View>
            ) : (
              <Text style={[styles.errors, { color: "#fff" }]}>s</Text>
            )}
            <NewInput
              theme={{
                roundness: 5,
                colors: {
                  primary: "#5e858e",
                  background: "#f1f6f7",
                },
              }}
              mode="outlined"
              label="Re-password"
              value={values.rePassword}
              onChangeText={handleChange("rePassword")}
              onBlur={handleBlur("rePpassword")}
              scrollEnabled={false}
              secureTextEntry
            />
          </View>
          <View style={styles.ButtonContainer}>
            {loading ? (
              <ButtonLoading />
            ) : (
              <DarkButton
                title={"Vytvořit účet"}
                onPress={handleSubmit as () => void}
              />
            )}
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
    .required("Password is required")
    .min(8, "Your password should be at least 8 \n characters long.")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
      "Your password should include at least \n one uppercase letter, one lowercase \n letter and one number."
    ),
  rePassword: Yup.string().test(
    "passwords-match",
    "Passwords must match",
    function (value) {
      return this.parent.password === value;
    }
  ),
});
