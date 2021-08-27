import React from "react";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Circle from "./Circle";

type DotsProps = {
  blocksQuantity: number;
  currentBlock: number;
  circleHeight: number;
};

export default ({ blocksQuantity, currentBlock, circleHeight }: DotsProps) => {
  const styles = StyleSheet.create({
    container: {
      flex: 0.2,
      flexDirection: "row",
      justifyContent: "center",
    },
  });

  /* 
     Function to create an array of circles, receives the block the user is currently looking
     at to mark the circle with a white dot
  */
  const fillWithDots = (currentBlock: number) => {
    let circleArray: JSX.Element[] = [];
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

  // Create first batch of dots
  let circles: JSX.Element[] = fillWithDots(currentBlock);

  // Everytime the user changes the block, re-render the dots
  useEffect(() => {
    circles = fillWithDots(currentBlock);
  }, [currentBlock]);

  return <View style={styles.container}>{circles}</View>;
};
