import {
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

type player = {
  number: Number;
  name: string;
  score: string;
};

type gameplayProps = {
  maxScore: string;
  playerOne: player;
  setPlayerOne: Dispatch<SetStateAction<player>>;
  playerTwo: player;
  setPlayerTwo: Dispatch<SetStateAction<player>>;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  setWinnerName: Dispatch<SetStateAction<string | null>>;
};

type setupProps = {
  maxScore: string;
  setMaxScore: Dispatch<SetStateAction<string>>;
  playerOneName: string;
  setPlayerOneName: (newName: string) => void;
  playerTwoName: string;
  setPlayerTwoName: (newName: string) => void;
  setPlaying: Dispatch<SetStateAction<boolean>>;
};

type winnerProps = {
  winnerName: string | null;
  setPlaying: Dispatch<SetStateAction<boolean>>;
};

function GameplayScreen({
  maxScore,
  playerOne,
  setPlayerOne,
  playerTwo,
  setPlayerTwo,
  setPlaying,
  setWinnerName,
}: gameplayProps) {
  const [additionalPoints, setAdditionalPoints] = useState<string>("");
  const [scoringPlayer, setScoringPlayer] = useState<number>(0);

  function setPlayerScore(
    player: player,
    setPlayer: Dispatch<SetStateAction<player>>,
    newScore: Number
  ) {
    const newPlayerObject = {
      number: player.number,
      name: player.name,
      score: newScore.toString(),
    };

    setPlayer(newPlayerObject);
  }
  function setPlayerOneScore(newScore: Number) {
    setPlayerScore(playerOne, setPlayerOne, newScore);
  }
  function setPlayerTwoScore(newScore: Number) {
    setPlayerScore(playerTwo, setPlayerTwo, newScore);
  }

  useEffect(() => {
    setScoringPlayer(0);
    setAdditionalPoints("");
  }, [playerOne.score, playerTwo.score]);

  const winningScore = Number(maxScore);

  function checkForWinOrUpdateScore(
    player: player,
    updatePlayerScore: (newScore: Number) => void
  ) {
    const pointsToAdd = Number(additionalPoints);

    const totalPoints = Number(player.score) + 25 + pointsToAdd;
    if (totalPoints >= winningScore) {
      setWinnerName(player.name);
      return;
    }
    updatePlayerScore(totalPoints);
  }

  function onAddPoints() {
    if (scoringPlayer === 1) {
      checkForWinOrUpdateScore(playerOne, setPlayerOneScore);
    } else if (scoringPlayer === 2) {
      checkForWinOrUpdateScore(playerTwo, setPlayerTwoScore);
    } else {
      console.error("Wrong player selected");
    }
  }

  function onPressOne() {
    setScoringPlayer(1);
  }

  function onPressReset() {
    setPlaying(false);
  }

  function onPressTwo() {
    setScoringPlayer(2);
  }

  type playerTileProps = {
    player: player;
  };

  const styles = StyleSheet.create({
    centeredContainer: {
      alignContent: "center",
      alignItems: "center",
    },
    playerTile: {
      alignContent: "center",
      alignItems: "center",
      flexDirection: "row",
      gap: 12,
      justifyContent: "space-between",
    },
  });

  function PlayerTile({ player }: playerTileProps) {
    const name = player.name;
    const onPress = player.number === 1 ? onPressOne : onPressTwo;

    return (
      <View style={styles.playerTile}>
        <View style={styles.centeredContainer}>
          <Text>{name}</Text>
          <Text style={{ fontWeight: "bold" }}>{`${player.score} points`}</Text>
        </View>
        <YellowButton onPress={onPress} text="Gin!" />
      </View>
    );
  }

  return (
    <View style={universalStyles.spreadOutColumn}>
      {scoringPlayer > 0 ? (
        <View
          style={[universalStyles.inputContainer, styles.centeredContainer]}
        >
          <Text style={{ fontWeight: 700 }}>
            {"Nice job " +
              (scoringPlayer === 1 ? playerOne.name : playerTwo.name) +
              "!"}{" "}
          </Text>
          <View style={universalStyles.inputContainer}>
            <Text>Deadwood count:</Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={(text) => {
                setAdditionalPoints(text);
              }}
              style={universalStyles.input}
              value={additionalPoints}
            />
          </View>
          <YellowButton onPress={onAddPoints} text="Claim my points!" />
        </View>
      ) : (
        <>
          <Text
            style={universalStyles.bannerText}
          >{`Playing to ${maxScore}`}</Text>
        </>
      )}
      <View>
        <PlayerTile player={playerOne} />
        <PlayerTile player={playerTwo} />
      </View>
      <YellowButton onPress={onPressReset} text="Reset Game" />
    </View>
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

function WinnerScreen({ winnerName, setPlaying }: winnerProps) {
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

export default function Index() {
  const blankPlayerObject = (playerNumber: Number) => {
    const playerObject = {
      number: playerNumber,
      name: "",
      score: "",
    };

    return playerObject;
  };

  const [maxScore, setMaxScore] = useState<string>("100");
  const [playerOne, setPlayerOne] = useState<player>(blankPlayerObject(1));
  const [playerTwo, setPlayerTwo] = useState<player>(blankPlayerObject(2));
  const [playing, setPlaying] = useState<boolean>(false);
  const [winnerName, setWinnerName] = useState<string | null>(null);

  function setPlayerName(
    player: player,
    setPlayer: Dispatch<SetStateAction<player>>,
    newName: string,
    playerNumber: Number
  ) {
    let newPlayerObject = { ...player };
    newPlayerObject.name = newName;
    newPlayerObject.number = playerNumber;

    setPlayer(newPlayerObject);
  }
  function setPlayerOneName(newName: string) {
    setPlayerName(playerOne, setPlayerOne, newName, 1);
  }
  function setPlayerTwoName(newName: string) {
    setPlayerName(playerTwo, setPlayerTwo, newName, 2);
  }

  useEffect(() => {
    if (!playing) {
      setPlayerOne(blankPlayerObject());
      setPlayerTwo(blankPlayerObject());
      setWinnerName(null);
    }
  }, [playing]);

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
        winnerName ? (
          <WinnerScreen winnerName={winnerName} setPlaying={setPlaying} />
        ) : (
          <GameplayScreen
            maxScore={maxScore}
            playerOne={playerOne}
            setPlayerOne={setPlayerOne}
            playerTwo={playerTwo}
            setPlayerTwo={setPlayerTwo}
            setPlaying={setPlaying}
            setWinnerName={setWinnerName}
          />
        )
      ) : (
        <SetupScreen
          maxScore={maxScore}
          setMaxScore={setMaxScore}
          playerOneName={playerOne.name}
          setPlayerOneName={setPlayerOneName}
          playerTwoName={playerTwo.name}
          setPlayerTwoName={setPlayerTwoName}
          setPlaying={setPlaying}
        />
      )}
    </KeyboardAvoidingView>
  );
}
