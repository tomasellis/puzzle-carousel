import React from "react";
import { useRef } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Buttons from "./Buttons";
import SliderItem from "./SliderItem";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Dots from "./Dots";
import { useCallback } from "react";
import { useLayoutEffect } from "react";

type WebData = {
  // Data that we receive from the web
  title: string;
  images: string[];
};

type CarouselData = {
  // Raw carousel data
  id: number;
  title: string;
  images: string[];
};

type FlatListData = {
  imageUri: string;
  id: number;
};

type ImagesState = {
  rawCarouselImages: CarouselData[];
  loading: boolean;
  flatListImages: FlatListData[];
};

type RenderItem = {
  item: FlatListData;
};

// Constant string to avoid misstyping
const lastPosition = "lastPosition";
const lastImageUri = "lastImageUri";
const separatorWidth = 2;

export default () => {
  // To setup Flatlist
  const { width } = useWindowDimensions();
  const imageWidth = Math.floor(width - width / 4); // Arbitrary image width
  let centerImageOnLoad = false;
  const totalItemSize = imageWidth + separatorWidth;

  // State to store the block the user is looking at
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // State to store current image uri
  const [currentImage, setCurrentImage] = useState<string>("");

  // State to store the images from the web, loading and the changing images
  const [images, setImages] = useState<ImagesState>({
    rawCarouselImages: [],
    loading: true,
    flatListImages: [],
  });

  // Reference to our flatlist to use its methods
  const flatListRef = useRef<FlatList<any> | null>(null);

  // Get and rearrange images when loading
  useEffect(() => {
    (async () => {
      const data: WebData[] = await getData();
      const remixedData = data.map((block, index) => {
        let obj = { id: index, title: block.title, images: block.images };
        return obj;
      });
      setImages({ ...images, rawCarouselImages: remixedData });
    })();
  }, []);

  /* Get the last block the user saw*/
  useEffect(() => {
    (async () => {
      try {
        const lastPositionFound = await AsyncStorage.getItem(lastPosition);
        const lastImageUriFound = await AsyncStorage.getItem(lastImageUri);
        if (lastPositionFound && lastImageUriFound) {
          setCurrentImage(lastImageUriFound);
          setCurrentIndex(parseInt(lastPositionFound));
        }
      } catch (err) {}
    })();
  }, []);

  // Serve the first batch of images to the FlatList
  useEffect(() => {
    if (images.rawCarouselImages[0]) {
      let newImages = createFlatListImages(
        images.rawCarouselImages,
        currentIndex,
        currentImage
      );
      setImages({ ...images, flatListImages: newImages });
    }
  }, [images.rawCarouselImages]);

  // Flag when loading is finished
  useEffect(() => {
    if (images.rawCarouselImages[0] && images.flatListImages[0]) {
      setImages({ ...images, loading: false });
    }
  }, [images.rawCarouselImages, images.flatListImages]);

  const getData = async (): Promise<WebData[]> => {
    try {
      const data = await axios.get(
        "https://puzzle-carousel-server.herokuapp.com/"
      );
      return data.data;
    } catch (err) {
      console.info("Failed getting images:", err);
      return [{ images: [""], title: "error" }];
    }
  };

  // Function to make each item for the FlatList
  const sliderItem = ({ item }: RenderItem) => (
    <SliderItem
      id={item.id.toString()}
      key={item.id.toString()}
      imageUrl={item.imageUri}
      width={imageWidth}
    />
  );

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: "100%",
          width: separatorWidth,
          backgroundColor: "#000000",
        }}
      />
    );
  };

  // Used to center the first block to load
  const onSizeChange = (w: number, h: number) => {
    if (!centerImageOnLoad) {
      centerImageOnLoad = false;
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: currentIndex,
          viewPosition: 0.5,
          viewOffset: 0,
        });
      }, 0);
    }
  };

  return images.loading === false ? (
    <View>
      {/* The actual list */}
      <View style={styles.listContainer}>
        <FlatList
          ref={flatListRef}
          data={images.flatListImages}
          renderItem={sliderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          snapToInterval={totalItemSize}
          getItemLayout={(data, index) => ({
            // Prop to avoid dynamicism of FlatList and avoid errors
            // by letting FlatList know the full size of our row
            length: totalItemSize,
            offset: totalItemSize * index,
            index,
          })}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={FlatListItemSeparator}
          onContentSizeChange={(w, h) => {
            onSizeChange(Math.floor(w), Math.floor(h));
          }}
        ></FlatList>
      </View>
      {/* The cosmetic pagination dots */}
      <Dots
        blocksQuantity={images.rawCarouselImages.length}
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
        rightExtreme={images.flatListImages.length - 1}
        setLastImageUri={setLastImageUri}
        rawCarouselImages={images.rawCarouselImages}
        currentImage={currentImage}
        setImages={setImages}
        images={images}
      ></Buttons>
    </View>
  ) : (
    <View style={styles.loading}>
      {/* Loading screen */}
      <Text>Loading</Text>
    </View>
  );
};

/* --------------------------- HELPERS --------------------------- */

// Save the last position the user was at
const setLastPosition = async (currentIndex: number) => {
  try {
    await AsyncStorage.setItem(lastPosition, currentIndex.toString());
  } catch (err) {
    console.info("Couldn't set last position:", err);
  }
};

// Save the last image the user saw
const setLastImageUri = async (currentImageUri: string) => {
  try {
    await AsyncStorage.setItem(lastImageUri, currentImageUri);
  } catch (err) {
    console.info("Couldn't set last image uri:", err);
  }
};

// Create the array to be consumed by the FlatList
const createFlatListImages = (
  rawCarouselImages: CarouselData[],
  currentImageIndex: number,
  currentImage: string
) => {
  let array = Array(rawCarouselImages.length); // Make an empty array to populate
  for (let i = 0; i < rawCarouselImages.length; i++) {
    let randNumber = Math.floor(
      Math.random() * rawCarouselImages[0].images.length
    );
    if (i === currentImageIndex && currentImage !== "") {
      array[i] = {
        id: currentImageIndex,
        imageUri: currentImage,
      };
    } else {
      array[i] = {
        id: rawCarouselImages[i].id,
        imageUri: rawCarouselImages[i].images[randNumber],
      };
    }
  }
  return array;
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});
