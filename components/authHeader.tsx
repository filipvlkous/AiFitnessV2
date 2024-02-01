import Constants from "expo-constants";
global.Buffer = require("buffer").Buffer;

export const generateHeader = () => {
  const authHeader = `Basic ${Buffer.from(
    `${Constants.expoConfig?.extra?.authName}:${Constants.expoConfig?.extra?.authPass}`
  ).toString("base64")}`;
  return authHeader;
};
