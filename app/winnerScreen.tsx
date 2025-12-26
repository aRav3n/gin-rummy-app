import { Text, View } from "react-native";

import { universalStyles } from "@/assets/styles/universalStyles";
import YellowButton from "@/components/yellowButton";
import { winnerProps } from "@/assets/types";

export default function WinnerScreen({ winnerName, setPlaying }: winnerProps) {
  function onPressReset() {
    setPlaying(false);
  }

  return (
    <View style={universalStyles.spreadOutColumn}>
      <Text style={universalStyles.bannerText}>{`${winnerName} won!`}</Text>
      <YellowButton onPress={onPressReset} text="Play again!" />
    </View>
  );
}
