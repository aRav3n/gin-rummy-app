import { StyleSheet, Text, TextInput, View } from "react-native";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { universalStyles } from "@/assets/styles/universalStyles";
import YellowButton from "@/components/yellowButton";
import { gameplayProps, player } from "@/assets/types";

export default function GameplayScreen({
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
    boldText: {
      fontWeight: "bold",
    },
    centeredContainer: {
      alignContent: "center",
      alignItems: "center",
      flexGrow: 1,
      justifyContent: "center",
    },
    centeredText: {
      alignSelf: "center",
      display: "flex",
      textAlign: "center",
      width: "auto",
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
          <Text style={styles.centeredText}>{name}</Text>
          <Text
            style={[styles.boldText, styles.centeredText]}
          >{`${player.score} points`}</Text>
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
              placeholder="0"
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
