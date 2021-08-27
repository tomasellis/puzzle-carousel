import React from "react";
import { useRef } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
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

type WebData = {
  // Data that we receive from the web
  title: string;
  images: string[];
};

type CarouselData = {
  // Data that we use in the carousel
  id: number;
  title: string;
  images: string[];
};

type ImagesState = {
  carouselData: CarouselData[];
  loading: boolean;
};

type RenderItem = {
  item: CarouselData;
};

// Constant string to avoid misstyping
const lastPosition = "lastPosition";

export default () => {
  const { width } = useWindowDimensions();

  // State to store the block the user is looking at
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // State to store the images from the web
  const [images, setImages] = useState<ImagesState>({
    carouselData: [],
    loading: true,
  });

  // Reference to our flatlist to use its methods
  let flatListRef = useRef<FlatList | null>(null);

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

  // Get and rearrange images when loading
  useEffect(() => {
    (async () => {
      const data: WebData[] = await getData();
      const remixedData = data.map((block, index) => {
        let obj = { id: index, title: block.title, images: block.images };
        return obj;
      });
      setImages({ ...images, carouselData: remixedData });
    })();
  }, []);

  // Flag when loading is finished
  useEffect(() => {
    if (images.carouselData[0]) {
      setImages({ ...images, loading: false });
    }
  }, [images.carouselData]);

  const getData = async (): Promise<WebData[]> => {
    try {
      const data = await axios.get(
        "https://aqueous-gorge-11678.herokuapp.com/"
      );
      return data.data;
    } catch (err) {
      console.log("Failed getting images:", err);
      return [{ images: [""], title: "error" }];
    }
  };

  // Function to make each item for the FlatList
  const sliderItem = ({ item }: RenderItem) => (
    <SliderItem
      id={item.id.toString()}
      key={item.id.toString()}
      imageUrl={item.images[0]}
    />
  );

  return images.loading === false ? (
    <View>
      {/* The actual list */}
      <View style={styles.listContainer}>
        <FlatList
          ref={flatListRef}
          data={images.carouselData}
          renderItem={sliderItem}
          horizontal
          initialScrollIndex={currentIndex}
          showsHorizontalScrollIndicator={false}
          getItemLayout={(data, index) => ({
            // Prop to avoid dynamicism of FlatList and avoid errors
            length: width, // by letting FlatList know the full size of our rows
            offset: width * index,
            index,
          })}
          bounces={false}
          keyExtractor={(item) => item.id.toString()}
          pagingEnabled={true}
        ></FlatList>
      </View>
      {/* The cosmetic pagination dots */}
      <Dots
        blocksQuantity={images.carouselData.length}
        currentBlock={currentIndex}
        circleHeight={25}
      ></Dots>
      {/* The buttons */}
      <Buttons
        flatListRef={flatListRef}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        setLastPosition={setLastPosition}
        leftExtreme={0}
        rightExtreme={images.carouselData.length - 1}
      ></Buttons>
    </View>
  ) : (
    <View style={styles.loading}>
      {/* Loading screen */}
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
