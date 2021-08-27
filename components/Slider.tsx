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
    console.log("We at:", images.loading);
  }, [images.carouselData]);
  /* 
      Update the last position in the carousel everytime currentIndex changes
      currentIndex is increased/decreased by the buttons
  */
  const getData = async (): Promise<WebData[]> => {
    console.log("getting data");
    try {
      const data = await axios.get(
        "https://aqueous-gorge-11678.herokuapp.com/"
      );
      console.log(data.data);
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
    <View style={styles.container}>
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
      />
      <Text>currentIndex:{currentIndex}</Text>
      <Dots></Dots>
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
    <View style={styles.container}>
      <Text>Loading</Text>
    </View>
  );
};

/* -------------------- */

const setLastPosition = async (currentIndex: number) => {
  try {
    await AsyncStorage.setItem(lastPosition, currentIndex.toString());
    console.log("Just set last position to:", currentIndex);
  } catch (err) {
    console.log("Couldn't set last position:", err);
  }
};

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
