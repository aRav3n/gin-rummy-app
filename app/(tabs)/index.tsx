import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import GameplayScreen from "../gameplayScreen";
import SetupScreen from "../setupScreen";
import WinnerScreen from "../winnerScreen";
import colorPalette from "@/assets/styles/colorPalette";
import { player } from "@/assets/types";

export default function Index() {
  const blankPlayerObject = (playerNumber: Number) => {
    const playerObject = {
      number: playerNumber,
      name: "",
      score: "0",
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
      setPlayerOne(blankPlayerObject(1));
      setPlayerTwo(blankPlayerObject(0));
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
