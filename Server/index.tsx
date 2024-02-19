import Constants from "expo-constants";

// export const serverUrl = "http://10.0.0.70:8080";
// export const serverUrl = "http://192.168.158.159:8080";
// export const serverUrl = "http://172.20.10.5:8080";
export const serverUrl = Constants.expoConfig?.extra?.serverUrl;
