import React from "react";
import { StyleSheet, TouchableOpacity, View, FlatList } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

type buttonProps = {
  flatListRef: React.MutableRefObject<FlatList | null>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setLastPosition: (arg: number) => Promise<void>;
  leftExtreme: number;
  rightExtreme: number;
};

export default ({
  flatListRef,
  currentIndex,
  setCurrentIndex,
  setLastPosition,
  leftExtreme,
  rightExtreme,
}: buttonProps) => {
  const iconSize = 100; //Size of arrows

  const styles = StyleSheet.create({
    buttonContainer: {
      flex: 0.6,
      flexDirection: "row",
      justifyContent: "space-around",
      alignContent: "center",
    },
  });

  return (
    // Buttons container
    <View style={styles.buttonContainer}>
      {/* Left button */}
      <TouchableOpacity
        disabled={currentIndex !== leftExtreme ? false : true} // If user is in the first block, disable left button
        onPress={() => {
          if (flatListRef.current !== null) {
            // If we have a reference, move to the left
            setCurrentIndex(currentIndex - 1);
            setLastPosition(currentIndex - 1); // Save position to asyncstorage for later use
            flatListRef.current.scrollToIndex({ index: currentIndex - 1 });
          }
        }}
      >
        <Icon
          name="leftcircle"
          size={iconSize}
          color={currentIndex !== leftExtreme ? "black" : "lightgrey"}
        />
      </TouchableOpacity>

      {/* Right button */}
      <TouchableOpacity
        disabled={currentIndex !== rightExtreme ? false : true} // If user is in the last block, disable right button
        onPress={() => {
          if (flatListRef.current) {
            // If we have a reference, move to the right
            setCurrentIndex(currentIndex + 1);
            setLastPosition(currentIndex + 1); // Save position to asyncstorage for later use
            flatListRef.current.scrollToIndex({
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
