import React from "react";
import { Image, StyleSheet, View, useWindowDimensions } from "react-native";

const circleHeight = 25;

export default ({}) => {
  const { width } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignContent: "center",
      width: width,
      height: circleHeight,
      borderWidth: 1,
      borderColor: "black",
    },
    circle: {
      justifyContent: "center",
      alignContent: "center",
      width: circleHeight,
      height: circleHeight,
      borderRadius: 100 / 2,
      backgroundColor: "black",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,

      elevation: 10,
    },
    littleCircle: {
      width: 10,
      height: 10,
      backgroundColor: "white",
      position: "relative",
      alignSelf: "center",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <View style={[styles.circle, styles.littleCircle]} />
      </View>
    </View>
  );
};
