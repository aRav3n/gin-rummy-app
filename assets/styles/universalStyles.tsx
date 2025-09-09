import { StyleSheet } from "react-native";

import colorPalette from "./colorPalette";

export const universalStyles = StyleSheet.create({
  button: {
    borderColor: colorPalette.dark,
    borderRadius: 4,
    borderWidth: 1,
    color: colorPalette.dark,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  errorMessage: {
    backgroundColor: colorPalette.error,
    borderRadius: 6,
    fontSize: 18,
    fontWeight: 700,
    paddingHorizontal: 12,
    paddingVertical: 6,
    textAlign: "center",
  },
  highlight: {
    backgroundColor: colorPalette.highlight,
  },
  input: {
    backgroundColor: colorPalette.extraLightGray,
    borderColor: colorPalette.dark,
    borderRadius: 4,
    borderWidth: 1,
    margin: 3,
    padding: 2,
    width: 200,
  },
  inputContainer: {
    alignItems: "flex-start",
    gap: 6,
  },
});
