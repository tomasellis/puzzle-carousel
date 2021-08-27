import React from "react";
import { useRef } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Buttons from "./Buttons";
import SliderItem from "./SliderItem";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Dots from "./Dots";

const lastPosition = "lastPosition";
type WebData = {
  title: string;
  images: string[];
};

type CarouselData = {
  id: number;
  title: string;
  images: string[];
};

type ImagesState = {
  carouselData: CarouselData[];
  loading: boolean;
};

export default () => {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [images, setImages] = useState<ImagesState>({
    carouselData: [],
    loading: true,
  });
  let flatListRef = useRef(null);
  /* Get the last position the user saw */
  useEffect(() => {
    (async () => {
      try {
        const lastPositionFound = await AsyncStorage.getItem(lastPosition);
        console.log("The last position was:", lastPositionFound);
        if (lastPositionFound !== null) {
          setCurrentIndex(parseInt(lastPositionFound));
        }
      } catch (err) {
        console.log("Error when getting the last position:", err);
      }
    })();
  }, []);
  /* Get and parse images */
  useEffect(() => {
    (async () => {
      const data = await getData();
      const remixedData = data.map((block, index) => {
        let obj = { id: index, title: block.title, images: block.images };
        return obj;
      });
      setImages({ ...images, carouselData: remixedData });
    })();
  }, []);

  useEffect(() => {
    if (images.carouselData[0]) {
      setImages({ ...images, loading: false });
    }
  }, [images.carouselData]);
  /* 
      Update the last position in the carousel everytime currentIndex changes
      currentIndex is increased/decreased by the buttons
  */
  const getData = async (): Promise<WebData[]> => {
    try {
      const data = await axios.get(
        "https://aqueous-gorge-11678.herokuapp.com/"
      );
      return data.data;
    } catch (err) {
      console.log("fallo axios.", err);
    }
    return [{ images: [], title: "" }];
  };

  type RenderItem = {
    item: CarouselData;
  };

  const sliderItem = ({ item }: RenderItem) => (
    <SliderItem
      id={item.id.toString()}
      key={item.id.toString()}
      imageUrl={item.images[0]}
    />
  );

  return images.loading === false ? (
    <View>
      <View style={styles.listContainer}>
        <FlatList
          ref={flatListRef}
          data={images.carouselData}
          renderItem={sliderItem}
          horizontal
          initialScrollIndex={currentIndex}
          showsHorizontalScrollIndicator={false}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          bounces={true}
          keyExtractor={(item) => item.id.toString()}
          pagingEnabled={true}
        ></FlatList>
      </View>
      <Dots
        blocksQuantity={images.carouselData.length}
        currentBlock={currentIndex}
      ></Dots>
      <Buttons
        flatList={flatListRef}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        setLastPosition={setLastPosition}
        leftExtreme={0}
        rightExtreme={images.carouselData.length - 1}
      ></Buttons>
    </View>
  ) : (
    <View style={styles.loading}>
      <Text>Loading</Text>
    </View>
  );
};

/* -------------------- */

const setLastPosition = async (currentIndex: number) => {
  try {
    await AsyncStorage.setItem(lastPosition, currentIndex.toString());
  } catch (err) {
    console.info("Couldn't set last position:", err);
  }
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});
