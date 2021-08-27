import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Slider from "./components/Slider";
export default function App() {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    topContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 20,
    },
  });

  return (
    <View style={styles.topContainer}>
      <StatusBar style="auto" hidden />
      <Slider />
    </View>
  );
}
