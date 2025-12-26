import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";

import colorPalette from "@/assets/styles/colorPalette";
import { universalStyles } from "@/assets/styles/universalStyles";
import YellowButton from "@/components/yellowButton";
import { setupProps } from "@/assets/types";

export default function SetupScreen({
  maxScore,
  setMaxScore,
  playerOneName,
  setPlayerOneName,
  playerTwoName,
  setPlayerTwoName,
  setPlaying,
}: setupProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [firstTimeCheckingErrors, setFirstTimeCheckingErrors] =
    useState<boolean>(true);

  function checkForErrorFree() {
    const maxScoreNumber = Number(maxScore);
    if (playerOneName.length === 0 && playerTwoName.length === 0) {
      setErrorMessage("Both players need names before you can begin!");
    } else if (playerOneName.length === 0) {
      setErrorMessage("Player one needs a name before you can begin!");
    } else if (playerTwoName.length === 0) {
      setErrorMessage("Player two needs a name before you can begin!");
    } else if (isNaN(maxScoreNumber) || maxScoreNumber <= 0) {
      setErrorMessage(
        "You need to pick a number greater than 0 for the winning score!"
      );
    } else {
      setFirstTimeCheckingErrors(false);
      setErrorMessage(null);
      return true;
    }
    setFirstTimeCheckingErrors(false);
    return false;
  }

  function onChange() {
    if (!firstTimeCheckingErrors) {
      checkForErrorFree();
    }
  }

  useEffect(() => {
    onChange();
  }, [playerOneName, playerTwoName, maxScore]);

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: colorPalette.light,
      flexGrow: 1,
      gap: 24,
      padding: 12,
    },
    heading: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
    },
    input: {
      borderColor: colorPalette.dark,
      borderRadius: 4,
      borderWidth: 1,
      padding: 2,
      width: 200,
    },
    inputContainer: {
      alignItems: "flex-start",
      gap: 6,
    },
  });

  function onPress() {
    if (checkForErrorFree()) {
      setPlaying(true);
    }
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.heading}>Who's playing?</Text>
          <View style={universalStyles.inputContainer}>
            <Text>Player One:</Text>
            <TextInput
              accessibilityLabel="player one name"
              onChangeText={setPlayerOneName}
              style={universalStyles.input}
              value={playerOneName}
            />
          </View>
          <View style={universalStyles.inputContainer}>
            <Text>Player Two:</Text>
            <TextInput
              accessibilityLabel="player two name"
              onChangeText={setPlayerTwoName}
              style={universalStyles.input}
              value={playerTwoName}
            />
          </View>
          <View style={universalStyles.inputContainer}>
            <Text>Winning score:</Text>
            <TextInput
              accessibilityLabel="player one name"
              keyboardType="numeric"
              onChangeText={setMaxScore}
              style={universalStyles.input}
              value={maxScore}
            />
          </View>
        </View>
      </ScrollView>
      {errorMessage ? (
        <Text style={universalStyles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <YellowButton onPress={onPress} text="Let's go!" />
    </>
  );
}
