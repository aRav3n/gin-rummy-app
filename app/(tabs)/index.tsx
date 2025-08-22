import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import colorPalette from "@/assets/styles/colorPalette";
import { universalStyles } from "@/assets/styles/universalStyles";
import YellowButton from "@/components/yellowButton";

type gameplayProps = {
  maxScore: string;
  playerOneName: string;
  playerTwoName: string;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  winnerName: string | null;
  setWinnerName: Dispatch<SetStateAction<string | null>>;
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
  winnerName,
  setWinnerName,
}: gameplayProps) {
  const [additionalPoints, setAdditionalPoints] = useState<number>(0);
  const [playerOneScore, setPlayerOneScore] = useState<number>(0);
  const [playerTwoScore, setPlayerTwoScore] = useState<number>(0);
  const [scoringPlayer, setScoringPlayer] = useState<number>(0);

  const winningScore = Number(maxScore);

  function checkForWinOrUpdateScore(
    playerName: string,
    playerScore: number,
    setPlayerScore: Dispatch<SetStateAction<number>>
  ) {
    const totalPoints = playerScore + additionalPoints;
    if (totalPoints >= winningScore) {
      setWinnerName(playerName);
      return;
    }
    setPlayerScore(totalPoints);
  }

  function onAddPoints() {
    if (scoringPlayer === 1) {
      checkForWinOrUpdateScore(
        playerOneName,
        playerOneScore,
        setPlayerOneScore
      );
    } else if (scoringPlayer === 2) {
      checkForWinOrUpdateScore(
        playerTwoName,
        playerTwoScore,
        setPlayerTwoScore
      );
    } else {
      console.error("Wrong player selected");
    }
  }

  function onPressOne() {
    setScoringPlayer(1);
  }

  function onPressTwo() {
    setScoringPlayer(2);
  }

  type playerTileProps = {
    playerNumber: number;
  };

  const styles = StyleSheet.create({
    playerTile: {
      alignContent: "center",
      alignItems: "center",
      flexDirection: "row",
      gap: 12,
      justifyContent: "space-between",
    },
  });

  function PlayerTile({ playerNumber }: playerTileProps) {
    const name = playerNumber === 1 ? playerOneName : playerTwoName;
    const onPress = playerNumber === 1 ? onPressOne : onPressTwo;

    return (
      <View style={styles.playerTile}>
        <Text>{name}</Text>
        <YellowButton onPress={onPress} text="Gin!" />
      </View>
    );
  }

  return (
    <ScrollView>
      <PlayerTile playerNumber={1} />
      <PlayerTile playerNumber={2} />
      {scoringPlayer > 0 ? <View>
        <Text>Additional points:</Text>
        <TextInput keyboardType="numeric"></TextInput>
      </View> : null}
    </ScrollView>
  );
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

export default function Index() {
  const [maxScore, setMaxScore] = useState<string>("100");
  // temp names for testing only
  const [playerOneName, setPlayerOneName] = useState<string>("Player One");
  const [playerTwoName, setPlayerTwoName] = useState<string>("Player Two");
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
          winnerName={winnerName}
          setWinnerName={setWinnerName}
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
