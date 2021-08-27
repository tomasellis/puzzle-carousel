import React from "react";
import { StyleSheet, View } from "react-native";

type CircleProps = {
  circleHeight: number;
  mark: boolean;
};

export default ({ circleHeight, mark }: CircleProps) => {
  const styles = StyleSheet.create({
    circle: {
      margin: 10,
      justifyContent: "center",
      alignContent: "center",
      width: circleHeight,
      height: circleHeight,
      borderWidth: 1,
      borderRadius: 100 / 2,
      backgroundColor: "black",
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 0.5,
      elevation: 4,
      alignSelf: "center",
    },
    littleCircle: {
      width: circleHeight / 3,
      height: circleHeight / 3,
      backgroundColor: "white",
      position: "relative",
      alignSelf: "center",
    },
  });

  if (mark === true) {
    // If this circle was marked, mark it with a tiny dot
    return (
      <View style={styles.circle}>
        <View style={[styles.circle, styles.littleCircle]} />
      </View>
    );
  } else return <View style={styles.circle}></View>;
};
