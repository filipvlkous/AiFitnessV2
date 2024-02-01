import { ExpoConfig, ConfigContext } from "@expo/config";
import manifiest from "./package.json";
import * as dotenv from "dotenv";

const Mode = {
  DEVELOPMENT: "DEVELOPMENT",
  QA: "QA",
  PRODUCTION: "PRODUCTION",
};

dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "aifitness",
  slug: "aifitness",
  version: manifiest.version,
  // All values in extra will be passed to your app.
  extra: {
    mode: Mode.DEVELOPMENT,
    stripe: process.env.REACT_APP_STRIPE_KEY,
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSENGER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_ANALYTICS,
    serverUrl: process.env.SERVER_URL,
    authName: process.env.AUTH_NAME,
    authPass: process.env.AUTH_PASS,
  },
  plugins:[
    "expo-font",
    "expo-secure-store"
  ]
});
