import React from "react";
import { Avatar } from "react-native-paper";

export default function ErrorIcon({ color }: { color: string }) {
  return (
    <Avatar.Icon
      icon={"alert-circle-outline"}
      theme={{ colors: { primary: color } }}
      size={30}
      color="red"
    />
  );
}
