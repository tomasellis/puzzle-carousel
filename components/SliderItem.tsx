import React from "react";
import { Image, StyleSheet, View } from "react-native";

type SliderItem = {
  imageUrl: string;
  id: string;
  width: number;
};

export default ({ imageUrl, id, width }: SliderItem) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: width,
      flexDirection: "row",
      justifyContent: "center",
      alignContent: "center",
    },
    image: {
      flexGrow: 1,
      borderColor: "red",
      width: "100%",
      resizeMode: "cover",
    },
  });

  return (
    <View style={styles.container}>
      <Image
        key={id}
        style={styles.image}
        source={{ uri: `${imageUrl}` }}
      ></Image>
    </View>
  );
};
