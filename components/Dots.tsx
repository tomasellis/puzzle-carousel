import React from "react";
import { useEffect } from "react";
import { Image, StyleSheet, View, useWindowDimensions } from "react-native";
import Circle from "./Circle";

const circleHeight = 25;

export default ({ blocksQuantity, currentBlock }: any) => {
  const { width } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      flex: 0.2,
      flexDirection: "row",
      justifyContent: "center",
      width: width,
    },
  });

  const fillWithCircles = (currentBlock: any) => {
    let circleArray: any = [];
    for (let i = 0; i < blocksQuantity; i++) {
      if (currentBlock === i) {
        circleArray.push(
          <Circle key={i} circleHeight={circleHeight} mark={true}></Circle>
        );
      } else {
        circleArray.push(
          <Circle key={i} circleHeight={circleHeight} mark={false}></Circle>
        );
      }
    }
    return circleArray;
  };
  let circles: [] = fillWithCircles(currentBlock);

  useEffect(() => {
    circles = fillWithCircles(currentBlock);
  }, [currentBlock]);

  return <View style={styles.container}>{circles}</View>;
};
