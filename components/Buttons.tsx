import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default ({ flatList, currentIndex, setCurrentIndex }: any) => {
  const leftExtreme = 0;
  const rightExtreme = 2;
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => {
          if (currentIndex > leftExtreme) {
            setCurrentIndex(currentIndex - 1);
            flatList.current.scrollToIndex({ index: currentIndex - 1 });
          } else {
            flatList.current.scrollToIndex({ index: currentIndex });
          }
        }}
        style={{ backgroundColor: "blue", padding: 30 }}
      >
        <Icon name="leftcircle" size={80} color="red" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (currentIndex < rightExtreme) {
            setCurrentIndex(currentIndex + 1);
            flatList.current.scrollToIndex({ index: currentIndex + 1 });
          }
        }}
        style={{ backgroundColor: "blue", padding: 30 }}
      >
        <Icon name="caretright" size={80} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
  },
});
