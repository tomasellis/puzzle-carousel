import React from "react";
import { Image, StyleSheet, View, useWindowDimensions } from "react-native";

type SliderItem = {
  imageUrl: string;
  id: string;
};

export default ({ imageUrl, id }: SliderItem) => {
  const { width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width,
      flexDirection: "column",
      justifyContent: "center",
    },
    image: {
      flex: 1,
      alignSelf: "center",
      width,
      resizeMode: "contain",
    },
  });

  return (
    <View style={styles.container}>
      <Image
        key={id}
        source={{ uri: `${imageUrl}` }}
        style={styles.image}
      ></Image>
    </View>
  );
};
