import React from "react";
import {
  FlatListProps,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
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
  const { width } = useWindowDimensions();
  const iconSize = 100;
  const styles = StyleSheet.create({
    buttonContainer: {
      flex: 0.6,
      flexDirection: "row",
      justifyContent: "space-around",
      alignContent: "center",
    },
  });
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        disabled={currentIndex !== leftExtreme ? false : true}
        onPress={() => {
          if (flatList.current) {
            setCurrentIndex(currentIndex - 1);
            setLastPosition(currentIndex - 1);
            flatList.current.scrollToIndex({ index: currentIndex - 1 });
          }
        }}
      >
        <Icon
          name="leftcircle"
          size={iconSize}
          color={currentIndex !== leftExtreme ? "black" : "lightgrey"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={currentIndex !== rightExtreme ? false : true}
        onPress={() => {
          if (flatList.current) {
            setCurrentIndex(currentIndex + 1);
            setLastPosition(currentIndex + 1);
            flatList.current.scrollToIndex({
              index: currentIndex + 1,
            });
          }
        }}
      >
        <Icon
          name="rightcircle"
          size={iconSize}
          color={currentIndex !== rightExtreme ? "black" : "lightgrey"}
        />
      </TouchableOpacity>
    </View>
  );
};
