import { useStripe } from "@stripe/stripe-react-native";
import { useState } from "react";
import { Alert, Button, View } from "react-native";

export default function CheckoutScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");

  const initializePaymentSheet = async () => {
    console.log("init");
    const { setupIntent, customer, id } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      paymentIntentClientSecret: setupIntent,
    });
    setId(id);
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      await cancelSub();
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert(
        "Success",
        "Your payment method is successfully set up for future payments!"
      );
    }
  };

  const init = () => {
    initializePaymentSheet().then(() => openPaymentSheet());
  };

  return (
    <View>
      <Button title="init" onPress={init} />
      <Button title="Cancel" onPress={cancelSub} />
    </View>
  );
}
