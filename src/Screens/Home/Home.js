import {
  View,
  Image,
  Pressable,
  ImageBackground,
  Dimensions,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { connect, useSelector } from "react-redux";

import Wrapper from "../../Components/Wrapper/Wrapper";
import Header from "../../Components/Header/Header";
import styles from "./Home.style";
import Card from "./Card";
import RatingModal from "../../Components/Modal/RatingModal";
import Assets from "../../UI/Assets";
import Colors from "../../UI/Colors";
import InputField from "../../Components/InputField/InputField";

export default function Home() {
  const navigation = useNavigation();
  const darkMode = useSelector((state) => state.darkMode);
  const [ratingVisible, setRatingVisible] = useState(false);
  const [dataArr, setDataArr] = useState([
    { id: 0, text: "Coffee", places: 530 },
    { id: 1, text: "Theater", places: 56 },
    { id: 2, text: "Cinema", places: 130 },
    { id: 3, text: "Coffee", places: 340 },
  ]);
  // Modal Visibility
  const setModalVisible = (visible) => {
    setRatingVisible(visible);
  };
  return (
    <Wrapper wrapperNP={true}>
      <ImageBackground
        style={styles.imageBackground}
        resizeMode="cover"
        source={Assets.back}
      >
        <Header
          onPressLeft={() => navigation.goBack()}
          showLeft={true}
          textButton={false}
          nextText={"Skip"}
        />
        {!ratingVisible && (
          <View>
            <View style={[styles.imageContainer]}>
              <Image style={styles.imageVector} source={Assets.logo} />
            </View>
            <Text style={darkMode ? styles.homeTextDark : styles.homeText}>
              Meydenbauer Convention Center
            </Text>

            <View style={styles.backContainer}>
              <View
                style={[
                  styles.cardContainer,
                  {
                    backgroundColor: darkMode
                      ? Colors.darkPrimary
                      : Colors.white,
                  },
                ]}
              >
                {/* serch bar */}
                <View style={styles.searchView}>
                  <InputField
                    // value={username}
                    placeholder={"Select Destination"}
                    // onChangeText={(value) => {
                    //   setError({ ...error, username: "" });
                    //   setUsername(value);
                    // }}
                  />
                </View>
                {/* search bar */}
                {/* card View */}

                <ScrollView horizontal>
                  <View style={styles.cardsWrapper}>
                    {dataArr.map((item, index) => (
                      <Card
                        key={index}
                        item={item}
                        onPress={() => {
                          navigation.navigate("Buildings");
                          //  setModalVisible(true)
                        }}
                      />
                    ))}
                  </View>
                </ScrollView>

                {/* card View */}
              </View>
            </View>
          </View>
        )}

        <RatingModal
          setModalVisible={() => setModalVisible(false)}
          modalVisible={ratingVisible}
        />
      </ImageBackground>
    </Wrapper>
  );
}
