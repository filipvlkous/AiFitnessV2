import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import SafeAreView from "../../../components/SafeAreView";
import ButtonPremium from "./button";
import { useStripe } from "@stripe/stripe-react-native";
import { fetchPaymentSheetParams } from "../../../Server/payment";

export default function PremiumIndex() {
  const [selected, setSelected] = useState<null | "year" | "month">(null);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");

  const initializePaymentSheet = async () => {
    try {
      // const { setupIntent, customer, id, ephemeralKey } =
      const { setupIntent, customer, id, ephemeralKey } =
        await fetchPaymentSheetParams();

      const { error } = await initPaymentSheet({
        merchantDisplayName: "Example, Inc.",
        customerId: customer,
        paymentIntentClientSecret: setupIntent,
        customerEphemeralKeySecret: ephemeralKey,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: "Jane Doe",
        },
      });
      setId(id);
      if (!error) {
        setLoading(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      setLoading(false);
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert(
        "Success",
        "Your payment method is successfully set up for future payments!"
      );
    }
  };
  const bgColor =
    selected == null
      ? { backgroundColor: "#967f62" }
      : { backgroundColor: "#e29f4c" };

  const init = () => {
    setLoading(true);

    initializePaymentSheet().then(() => openPaymentSheet());
  };

  const disableButton = () => {
    if (
      (selected === null && loading === false) ||
      (selected !== null && loading === true)
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <SafeAreView style={{ height: "100%", backgroundColor: "#126477" }}>
      <View
        style={{
          height: "100%",
          display: "flex",
          paddingHorizontal: 20,
        }}
      >
        <Text style={style.smallHeadText}>Try Premium functions</Text>
        <Text style={style.bigHeadText}>
          Say yes to more personalised recipes.
        </Text>
        <Image
          style={{ alignSelf: "center", marginVertical: 35 }}
          source={require("../../../assets/star.png")}
        />
        <View style={style.bodyTextContainer}>
          <Text style={[style.bodyText, { paddingRight: 10 }]}>•</Text>
          <Text style={style.bodyText}>
            Gain access generating recipes from your{"\n"} Pantry inventory
          </Text>
        </View>
        <View style={style.bodyTextContainer}>
          <Text style={[style.bodyText, { paddingRight: 10 }]}>•</Text>
          <Text style={style.bodyText}>Save resipes for the future</Text>
        </View>
        <View style={[style.bodyTextContainer, { paddingBottom: 25 }]}>
          <Text style={[style.bodyText, { paddingRight: 10 }]}>•</Text>
          <Text style={style.bodyText}>
            Generate recipes as many times you want
          </Text>
        </View>

        <ButtonPremium
          selected={selected}
          setSelected={() => setSelected("month")}
          sale={false}
          bigText={"Monthly Fee: $6.99"}
          smallText={"$83.88 a year"}
          id={"month"}
        />
        <ButtonPremium
          selected={selected}
          setSelected={() => setSelected("year")}
          sale={true}
          bigText={"Annual Fee: $49.99 "}
          smallText={"Only $4.09/month"}
          id={"year"}
        />
        <Text style={style.cancelText}>
          Subscriptions are auto rene-renewed. Cancel anytime.
        </Text>
        <TouchableOpacity disabled={disableButton()} onPress={init}>
          <View style={[style.buttonContainer, { marginTop: 20 }, bgColor]}>
            <Text
              style={[
                style.bigButtonText,
                { textAlign: "center", width: "100%" },
              ]}
            >
              Buy Premium
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreView>
  );
}

const style = StyleSheet.create({
  bigButtonText: {
    color: "#fff",
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    paddingBottom: 5,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  smallHeadText: {
    paddingTop: 10,
    color: "#FFC279",
    fontFamily: "Inter-SemiBold",
  },
  bigHeadText: {
    paddingTop: 10,
    fontFamily: "Inter-Bold",
    fontSize: 28,
    lineHeight: 40,
    color: "#fff",
  },
  bodyText: {
    color: "#fff",
    fontFamily: "Inter-SemiBold",
  },
  bodyTextContainer: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 5,
  },
  cancelText: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#76A6B1",
    textAlign: "center",
  },
});
