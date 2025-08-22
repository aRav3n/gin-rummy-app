import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import colorPalette from "@/assets/styles/colorPalette";
import { universalStyles } from "@/assets/styles/universalStyles";

type gameplayProps = {
  maxScore: string;
  playerOneName: string;
  playerTwoName: string;
  setPlaying: Dispatch<SetStateAction<boolean>>;
};

type indexProps = {
  maxScore: string;
  setMaxScore: Dispatch<SetStateAction<string>>;
  playerOneName: string;
  setPlayerOneName: Dispatch<SetStateAction<string>>;
  playerTwoName: string;
  setPlayerTwoName: Dispatch<SetStateAction<string>>;
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
};

type setupProps = {
  maxScore: string;
  setMaxScore: Dispatch<SetStateAction<string>>;
  playerOneName: string;
  setPlayerOneName: Dispatch<SetStateAction<string>>;
  playerTwoName: string;
  setPlayerTwoName: Dispatch<SetStateAction<string>>;
  setPlaying: Dispatch<SetStateAction<boolean>>;
};

function GameplayScreen({
  maxScore,
  playerOneName,
  playerTwoName,
  setPlaying,
}: gameplayProps) {
  return <></>;
}

function SetupScreen({
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
    console.log({ playerOneName, playerTwoName, maxScore });
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
          <View style={styles.inputContainer}>
            <Text>Player One:</Text>
            <TextInput
              accessibilityLabel="player one name"
              onChangeText={setPlayerOneName}
              style={styles.input}
              value={playerOneName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Player Two:</Text>
            <TextInput
              accessibilityLabel="player two name"
              onChangeText={setPlayerTwoName}
              style={styles.input}
              value={playerTwoName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Winning score:</Text>
            <TextInput
              accessibilityLabel="player one name"
              keyboardType="numeric"
              onChangeText={setMaxScore}
              style={styles.input}
              value={maxScore}
            />
          </View>
        </View>
      </ScrollView>
      {errorMessage ? (
        <Text style={universalStyles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Pressable
        style={[universalStyles.button, universalStyles.highlight]}
        onPress={onPress}
      >
        <Text style={{ fontWeight: "bold" }}>Let's go!</Text>
      </Pressable>
    </>
  );
}

export default function Index() {
  const [maxScore, setMaxScore] = useState<string>("100");
  const [playerOneName, setPlayerOneName] = useState<string>("");
  const [playerTwoName, setPlayerTwoName] = useState<string>("");
  const [playing, setPlaying] = useState<boolean>(false);
  const [winnerName, setWinnerName] = useState<string | null>(null);

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: colorPalette.light,
      flexGrow: 1,
      gap: 24,
      justifyContent: "space-evenly",
      padding: 6,
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {playing ? (
        <GameplayScreen
          maxScore={maxScore}
          playerOneName={playerOneName}
          playerTwoName={playerTwoName}
          setPlaying={setPlaying}
        />
      ) : (
        <SetupScreen
          maxScore={maxScore}
          setMaxScore={setMaxScore}
          playerOneName={playerOneName}
          setPlayerOneName={setPlayerOneName}
          playerTwoName={playerTwoName}
          setPlayerTwoName={setPlayerTwoName}
          setPlaying={setPlaying}
        />
      )}
    </KeyboardAvoidingView>
  );
}
