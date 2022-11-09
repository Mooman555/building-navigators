import {
  View,
  Image,
  Pressable,
  ImageBackground,
  Dimensions,
  Text,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { connect, useSelector } from "react-redux";
import Wrapper from "../../Components/Wrapper/Wrapper";
import styles from "./MapScreen.style";
import { Level4 } from "../../../assets";
import ImageZoom from "react-native-image-pan-zoom";

export default function MapScreen() {
  const navigation = useNavigation();
  const darkMode = useSelector((state) => state.darkMode);
  const [ratingVisible, setRatingVisible] = useState(false);
  const [dataArr, setDataArr] = useState([
    { id: 0, text: "asim", places: 530 },
    { id: 1, text: "asim", places: 56 },
    { id: 2, text: "Cinema", places: 130 },
    { id: 3, text: "Coffee", places: 340 },
  ]);
  // Modal Visibility
  return (
    <Wrapper wrapperNP={true}>
      <ImageBackground
        style={styles.imageBackground}
        resizeMode="cover"
        source={require("../../../assets/images/back.png")}
      >
        <ScrollView
          contentContainerStyle={{
            height: "150%",
            alignContent: "center",
          }}
        >
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.box,
              {
                transform: [{ rotateX: "0deg" }, { rotateZ: "90deg" }],
              },
            ]}
          >
            <Level4 style={styles.imageBackground} />
          </ScrollView>
        </ScrollView>
      </ImageBackground>
    </Wrapper>
  );
}
