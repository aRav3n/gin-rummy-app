import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You can find the source code here:</Text>
      <Text onPress={() => {
        Linking.openURL("https://github.com/aRav3n/gin-rummy-app")
      }} style={styles.text}>https://github.com/aRav3n/gin-rummy-app</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#ffffff",
  },
});
