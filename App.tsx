import { StatusBar } from "expo-status-bar";
import { TouchableWithoutFeedback, Keyboard, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./redux/store/testStore";
import Index from "./Index";
import { NavigationContainer } from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";
import Constants from "expo-constants";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <NavigationContainer>
          <Provider store={store}>
            <StripeProvider
              publishableKey={Constants.expoConfig?.extra?.stripe}
              merchantIdentifier="merchant.identifier" // required for Apple Pay
            >
              <Index />
            </StripeProvider>
          </Provider>
        </NavigationContainer>
      </TouchableWithoutFeedback>
    </SafeAreaProvider>
  );
}
