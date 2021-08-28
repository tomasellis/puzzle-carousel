import React, { useState } from "react";
import { useRef } from "react";
import { StyleSheet, TouchableOpacity, View, FlatList } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

type CarouselData = {
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

type buttonProps = {
  flatListRef: any;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setLastPosition: (arg: number) => Promise<void>;
  leftExtreme: number;
  rightExtreme: number;
  setLastImageUri: (arg: string) => Promise<void>;
  rawCarouselImages: CarouselData[];
  currentImage: string;
  setImages: React.Dispatch<React.SetStateAction<ImagesState>>;
  images: ImagesState;
};

type ButtonsState = {
  leftButton: true | false;
  rightButton: true | false;
};

export default ({
  flatListRef,
  currentIndex,
  setCurrentIndex,
  setLastPosition,
  leftExtreme,
  rightExtreme,
  setLastImageUri,
  rawCarouselImages,
  setImages,
  images,
}: buttonProps) => {
  const [buttonsState, setButtonsState] = useState<ButtonsState>({
    leftButton: true,
    rightButton: true,
  });

  const iconSize = 100; //Size of arrows

  const styles = StyleSheet.create({
    buttonContainer: {
      flex: 0.6,
      flexDirection: "row",
      justifyContent: "space-around",
      alignContent: "center",
    },
  });

  const handleLeftButton = () => {
    // Throttle button usage
    setButtonsState({ ...buttonsState, leftButton: false });
    setTimeout(
      () => setButtonsState({ ...buttonsState, leftButton: true }),
      500
    );
    const arrayOfImages = updateFlatListImages(
      rawCarouselImages,
      currentIndex,
      true
    );
    setImages({ ...images, flatListImages: arrayOfImages });
    if (flatListRef.current !== null && currentIndex > leftExtreme) {
      setCurrentIndex(currentIndex - 1); // Move the current position to the left
      setLastPosition(currentIndex - 1); // Save position to asyncstorage for later use
      flatListRef.current.scrollToIndex({
        index: currentIndex - 1,
        viewPosition: 0.5,
      });
    }
  };

  const handleRightButton = () => {
    // Throttle button usage
    setButtonsState({ ...buttonsState, rightButton: false });
    setTimeout(
      () => setButtonsState({ ...buttonsState, rightButton: true }),
      500
    );

    // Get the new images
    const arrayOfImages = updateFlatListImages(
      rawCarouselImages,
      currentIndex,
      false
    );
    setImages({ ...images, flatListImages: arrayOfImages }); // Update images
    if (flatListRef.current !== null && currentIndex < rightExtreme) {
      setCurrentIndex(currentIndex + 1); // Move the current position to the right
      setLastPosition(currentIndex + 1); // Save position to asyncstorage for later use
      flatListRef.current.scrollToIndex({
        index: currentIndex + 1,
        viewPosition: 0.5,
      });
    }
  };

  const updateFlatListImages = (
    rawCarouselImages: CarouselData[],
    currentImageIndex: number,
    left: boolean
  ): FlatListData[] => {
    let array = Array(rawCarouselImages.length); // Make an array to populate
    if (left) {
      // If the left button was pushed
      for (let i = 0; i < array.length; i++) {
        // Move through the array populating it with imagesUris and ids
        const randomNumber = Math.floor(
          Math.random() * rawCarouselImages[0].images.length
        );
        if (i === currentImageIndex - 1) {
          // Since we are moving left, we need to update the last image,
          // to be the incoming left one
          setLastImageUri(rawCarouselImages[i].images[randomNumber]);
        }
        array[i] = {
          id: rawCarouselImages[i].id,
          imageUri: rawCarouselImages[i].images[randomNumber],
        };
      }
    } else {
      for (let i = 0; i < array.length; i++) {
        const randomNumber = Math.floor(
          Math.random() * rawCarouselImages[0].images.length
        );
        // The same that the last one, but for the right button
        if (i === currentImageIndex + 1) {
          setLastImageUri(rawCarouselImages[i].images[randomNumber]);
        }
        array[i] = {
          id: rawCarouselImages[i].id,
          imageUri: rawCarouselImages[i].images[randomNumber],
        };
      }
    }
    return array;
  };

  return (
    // Buttons container
    <View style={styles.buttonContainer}>
      {/* Left button */}
      <TouchableOpacity
        disabled={
          currentIndex !== leftExtreme ? false : buttonsState.leftButton
        } // If user is in the first block, disable left button
        onPress={handleLeftButton}
      >
        <Icon
          name="leftcircle"
          size={iconSize}
          color={currentIndex !== leftExtreme ? "black" : "lightgrey"}
        />
      </TouchableOpacity>

      {/* Right button */}
      <TouchableOpacity
        disabled={
          currentIndex !== rightExtreme ? false : buttonsState.rightButton
        } // If user is in the last block, disable right button
        onPress={handleRightButton}
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
