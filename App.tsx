import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import Slider from "./components/Slider";
export default function App() {
  const styles = StyleSheet.create({
    topContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.topContainer}>
      <StatusBar style="auto" hidden />
      <Slider />
    </View>
  );
}
