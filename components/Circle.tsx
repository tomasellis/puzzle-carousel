import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";

const padding = (a: number, b?: number, c?: number, d?: number) => {
  return {
    paddingTop: a,
    paddingRight: b ? b : a,
    paddingBottom: c ? c : a,
    paddingLeft: d ? d : b ? b : a,
  };
};

export default ({ circleHeight, mark }: any) => {
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
    return (
      <View style={styles.circle}>
        <View style={[styles.circle, styles.littleCircle]} />
      </View>
    );
  } else return <View style={styles.circle}></View>;
};
