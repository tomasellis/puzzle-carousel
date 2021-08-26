import React from "react";
import { useRef } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Buttons from "./Buttons";
import SliderItem from "./SliderItem";

type SliderItem = {
  imageUrl: string[];
  id: string;
};

type RenderItem = {
  item: SliderItem;
};

export default () => {
  const sliderItem = ({ item }: RenderItem) => (
    <SliderItem id={item.id} imageUrl={item.imageUrl[0]} />
  );

  let flatListRef = useRef(null);

  const horizontalList = (
    <FlatList
      ref={flatListRef}
      data={DATA}
      renderItem={sliderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={true}
      pagingEnabled={true}
    />
  );
  return (
    <View style={styles.container}>
      {horizontalList}
      <Buttons flatList={flatListRef} />
    </View>
  );
};

/* -------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  instructions: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  imageContainer: {
    flex: 0.8,
    flexDirection: "column",
    backgroundColor: "green",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
  },
});

const DATA = [
  {
    id: "1",
    imageUrl: [
      "https://tse3.mm.bing.net/th?id=OIP.Pz41etqzp1j7tlMIA-zJ0gAAAA&pid=Api&P=0&w=300&h=300",
      "https://tse4.mm.bing.net/th?id=OIP.6iHFHI7VYpaHw_7qeAFfWgAAAA&pid=Api&P=0&w=300&h=300",
      "https://tse4.mm.bing.net/th?id=OIP.AV4oMtMGzql-Obk2hZlDAgAAAA&pid=Api&P=0&w=300&h=300",
      "https://tse3.mm.bing.net/th?id=OIP.jZyWU5JFXRI2qCuFIKTajQAAAA&pid=Api&P=0&w=300&h=300",
    ],
  },
  {
    id: "2",
    imageUrl: [
      "https://tse2.mm.bing.net/th?id=OIP.B6T7986kOW3SSO0uaASZKQAAAA&pid=Api&P=0&w=300&h=300",
      "https://tse1.mm.bing.net/th?id=OIP.pUDSf8l2UZqYVmPPxjWHfwAAAA&pid=Api&P=0&w=300&h=300",
      "https://tse4.mm.bing.net/th?id=OIP.fOG8huu2ze1pUU0sEKUFPAAAAA&pid=Api&P=0&w=300&h=300",
      "https://tse1.mm.bing.net/th?id=OIP.2GTck42y6oxtuVfUboWcQgAAAA&pid=Api&P=0&w=300&h=300",
    ],
  },
  {
    id: "3",
    imageUrl: [
      "https://tse1.mm.bing.net/th?id=OIP.pUDSf8l2UZqYVmPPxjWHfwAAAA&pid=Api&P=0&w=300&h=300",
      "https://tse4.mm.bing.net/th?id=OIP.fOG8huu2ze1pUU0sEKUFPAAAAA&pid=Api&P=0&w=300&h=300",
      "https://tse1.mm.bing.net/th?id=OIP.2GTck42y6oxtuVfUboWcQgAAAA&pid=Api&P=0&w=300&h=300",
    ],
  },
];
