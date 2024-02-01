import TypeWriter from "react-native-typewriter";
import { Text, View } from "react-native";
import { useMemo } from "react";

type TypeBotMsg = {
  text: string;
};

type TypeBotBoldMsg = {
  boldText: string;
};

const BotMsg = ({ message }: { message: TypeBotMsg }) => {
  return (
    <TypeWriter typing={1} maxDelay={15}>
      <View>
        <Text style={{ fontFamily: "Inter-Regular", fontSize: 15 }}>
          {message.text}
        </Text>
      </View>
    </TypeWriter>
  );
};

export const MemoizedBotMsg = (message: TypeBotMsg) =>
  useMemo(() => <BotMsg message={message} />, []);

const BotBoldMsg = ({ message }: { message: TypeBotBoldMsg }) => {
  return (
    <TypeWriter typing={1} maxDelay={15}>
      <View>
        <Text style={{ fontFamily: "Inter-SemiBold", fontSize: 15 }}>
          {message.boldText}
        </Text>
      </View>
    </TypeWriter>
  );
};

export const MemoizedBotBoldMsg = (message: TypeBotBoldMsg) =>
  useMemo(() => <BotBoldMsg message={message} />, []);
