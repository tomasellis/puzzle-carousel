import React from "react";
import {
  FlatListProps,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default ({
  flatList,
  currentIndex,
  setCurrentIndex,
  setLastPosition,
  leftExtreme,
  rightExtreme,
}: any) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => {
          if (flatList.current) {
            if (currentIndex > leftExtreme) {
              setCurrentIndex(currentIndex - 1);
              setLastPosition(currentIndex - 1);
              flatList.current.scrollToIndex({ index: currentIndex - 1 });
            } else {
              setLastPosition(currentIndex);
              flatList.current.scrollToIndex({ index: currentIndex });
            }
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
            setLastPosition(currentIndex + 1);
            if (flatList.current) {
              flatList.current.scrollToIndex({
                index: currentIndex + 1,
              });
            }
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
