import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default ({ flatList }: any) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => {
          flatList.current.scrollToIndex({ index: 0 });
        }}
        style={{ backgroundColor: "blue", padding: 30 }}
      >
        <Icon name="leftcircle" size={80} color="red" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          flatList.current.scrollToIndex({ index: 2 });
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
