import {
  View,
  Image,
  ImageBackground,
  Text,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Wrapper from "../../Components/Wrapper/Wrapper";
import Header from "../../Components/Header/Header";
import styles from "./Home.style";
import Card from "./Card";
import RatingModal from "../../Components/Modal/RatingModal";
import Assets from "../../UI/Assets";
import Colors from "../../UI/Colors";
import DropDown from "../../Components/SearchableDropDown/SearchableDropDown";
import { destinations as Destinations } from "../../Components/SearchableDropDown/DropDownValues";

const Home = () => {

  const [startPosition, setStartPosition] = useState(null);
  const [destinationPoint, setDestinationPoint] = useState(null);
  const [beaconDataSet, setBeaconDataSet] = useState([]);
  const navigation = useNavigation();
  const darkMode = useSelector((state) => state.darkMode);
  const [ratingVisible, setRatingVisible] = useState(false);
  const [dataArr, setDataArr] = useState([
    { id: 0, text: "Coffee", places: 530 },
    { id: 1, text: "Theater", places: 56 },
    { id: 2, text: "Cinema", places: 130 },
    { id: 3, text: "Coffee", places: 340 },
  ]);

  useEffect(() => {

    if (startPosition !== null && destinationPoint !== null && startPosition?.value !== null && destinationPoint?.value !== null  && beaconDataSet  ) {
      navigation.navigate('MapScreen', {
        startObject: startPosition,
        destinationObject: destinationPoint,
        beaconDataSet : beaconDataSet
      })
    }

  }, [startPosition, destinationPoint])

  const startPositionHandler = (value) => {
    setStartPosition(value)
  }

  const destinationHandler = (value) => {
    setDestinationPoint(value)
  }


  var SearchableDropdownItems = Destinations;
  // Modal Visibility
  const setModalVisible = (visible) => {
    setRatingVisible(visible);
  };

  const handleBeaconDataSet = (array) => {
    setBeaconDataSet(array)
  }
  return (
    // <KeyboardAvoidingView 
    //   enableOnAndroid= {true}
    //   enableAutomaticScroll= {true}
    //   extraHeight={200}
    //   nestedScrollEnabled={true}
    // >
    <Wrapper wrapperNP={true}>
      {/* <ScrollView style={{flex:1}}> */}
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
                  <DropDown
                    itemsDataList={SearchableDropdownItems}
                    placeHolderText="Search Starting Position"
                    // navigateTo="MapScreen" 
                    setStartPosition={(value) => startPositionHandler(value)}
                    location={true}
                    setBeaconDataSet={(array) => handleBeaconDataSet(array)}
                  />
                  <DropDown
                    itemsDataList={SearchableDropdownItems}
                    placeHolderText="Search Location"
                    // navigateTo="MapScreen" 
                    setDestinationPoint={(value) => destinationHandler(value)}
                    setBeaconDataSet={(array) => handleBeaconDataSet(array)}
                  />
                </View>
                <ScrollView horizontal>
                  <View style={styles.cardsWrapper}>
                    {dataArr.map((item, index) => (
                      <Card
                        key={index}
                        item={item}
                        onPress={() => {
                          // navigation.navigate("Buildings");
                          alert("Please Select Location Above")
                          //  setModalVisible(true)
                        }}
                      />
                    ))}
                  </View>
                </ScrollView>
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
    //  </KeyboardAvoidingView>
  );
}
export default Home