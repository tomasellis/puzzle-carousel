import React from "react";
import { Image, StyleSheet, View, useWindowDimensions } from "react-native";

type SliderItem = {
  imageUrl: string;
  id: string;
};

export default ({ imageUrl }: SliderItem) => {
  const { width, height } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "blue",
      flex: 1,
      width,
      alignContent: "center",
      justifyContent: "center",
    },
    image: {
      height: 400,
      width,
    },
  });

  return (
    <View style={styles.container}>
      <Image source={{ uri: `${imageUrl}` }} style={styles.image}></Image>
    </View>
  );
};
