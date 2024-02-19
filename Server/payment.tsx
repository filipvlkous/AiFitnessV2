import axios from "axios";
import firebase from "../initFirebase";
import { serverUrl } from ".";

export const fetchPaymentSheetParams = async () => {
  const token = await firebase.auth().currentUser?.getIdToken();

  const response = await axios.get(`${serverUrl}/payment/create-subscription`, {
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const { setupIntent, customer, status, id, ephemeralKey } = response.data;
  return {
    setupIntent,
    customer,
    status,
    id,
    ephemeralKey,
  };
};

export const fetchPaymentSheetParams2 = async () => {
  const response = await fetch(`${serverUrl}/payment/create-subscription2`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { paymentIntent, ephemeralKey, customer } = await response.json();

  return {
    paymentIntent,
    ephemeralKey,
    customer,
  };
};

export const fetchPaymentSheetParams3 = async () => {
  const token = await firebase.auth().currentUser?.getIdToken();

  const response = await axios.post(
    `${serverUrl}/payment/create-subscription`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response);
  const { setupIntent, customer, status, id } = response.data;
  console.log(id);
  return {
    setupIntent,
    customer,
    status,
    id,
  };
};

const cancelSub = async (id: string) => {
  const token = await firebase.auth().currentUser?.getIdToken();

  const response = await axios.post(
    `${serverUrl}/payment/subscriptionCancel`,
    { id: id },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response);
};
