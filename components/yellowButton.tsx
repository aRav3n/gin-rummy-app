import { Pressable, Text } from "react-native";

import { universalStyles } from "@/assets/styles/universalStyles";

type Props = {
  onPress: () => void;
  text: string;
};

export default function YellowButton({ onPress, text }: Props) {
  return (
    <Pressable
      style={[universalStyles.button, universalStyles.highlight]}
      onPress={onPress}
    >
      <Text
        style={{ alignSelf: "center", fontWeight: "bold", textAlign: "center" }}
      >
        {text}
      </Text>
    </Pressable>
  );
}
