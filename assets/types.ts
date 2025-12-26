import { Dispatch, SetStateAction } from "react";

export type player = {
  number: Number;
  name: string;
  score: string;
};

export type gameplayProps = {
  maxScore: string;
  playerOne: player;
  setPlayerOne: Dispatch<SetStateAction<player>>;
  playerTwo: player;
  setPlayerTwo: Dispatch<SetStateAction<player>>;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  setWinnerName: Dispatch<SetStateAction<string | null>>;
};

export type setupProps = {
  maxScore: string;
  setMaxScore: Dispatch<SetStateAction<string>>;
  playerOneName: string;
  setPlayerOneName: (newName: string) => void;
  playerTwoName: string;
  setPlayerTwoName: (newName: string) => void;
  setPlaying: Dispatch<SetStateAction<boolean>>;
};

export type winnerProps = {
  winnerName: string | null;
  setPlaying: Dispatch<SetStateAction<boolean>>;
};
