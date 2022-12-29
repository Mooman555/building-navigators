import {
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Wrapper from "../../Components/Wrapper/Wrapper";
import styles from "./MapScreen.style";
 import ImageZoom from "react-native-image-pan-zoom";
import Level_1 from "../../Components/SVGS/Level_1";
import Level_4 from "../../Components/SVGS/Level_4";
import Level_2 from "../../Components/SVGS/Level_2";
import Level_3 from "../../Components/SVGS/Level_3";
import Mazanine from "../../Components/SVGS/Mazanine";



export default function MapScreen({ route }) {
  const { startObject,destinationObject,beaconDataSet } = route.params;
  const  {number}  = startObject;
  const darkMode = useSelector((state) => state.darkMode);
  const [renderSvg, setRenderSvg] = useState(number);
  
  var distances = []


  //onPress
  const onPress = (name) => {
    setRenderSvg(name)
  };
  let Levels = [
    {
      name: "Level 5",
      id: 5,
      number: '4',
    },
    {
      name: "Level 4",
      id: 4,
      number: '3',
    },
    {
      name: "Level 3",
      id: 3,
      number: '2M',
    },
    {
      name: "Level 2",
      id: 2,
      number: '2',
    },
    {
      name: "Level 1",
      id: 1,
      number: '1',
    },

  ]

  const RenderSvg = (svgNumber) => {
      console.log(svgNumber,"svgNumber")
      switch (svgNumber) {
        case "1":
         return <Level_1 destinationObject={destinationObject} startObject={startObject} beaconDataSet={beaconDataSet}/>;
        case "2":
          return <Level_2 destinationObject={destinationObject} startObject={startObject} beaconDataSet={beaconDataSet}/>;
        case "2M":
          return <Mazanine destinationObject={destinationObject} startObject={startObject} beaconDataSet={beaconDataSet} />;
        case "3":
          return <Level_3 destinationObject={destinationObject} startObject={startObject} beaconDataSet={beaconDataSet}/>;
        case "4":
          return <Level_4 destinationObject={destinationObject} startObject={startObject} beaconDataSet={beaconDataSet}/>;
        // default:
        //   console.log(distanceArray, "default")
        //   return <Level_1 distanceArray={distanceArray} />;
      }
  }

  // Modal Visibility
  return (
    <Wrapper wrapperNP={true}>
      <ImageBackground
        style={styles.imageBackground}
        resizeMode="cover"
        source={require("../../../assets/images/back.png")}
      >

        <View style={styles.buttonView}>
          {
            Levels.map(element =>
              <TouchableOpacity
                style={styles.svgButtons}
                key={element.id}
                onPress={() => onPress(element?.number)}
              >
                <Text style={styles.buttonText}>{element?.number}</Text>
              </TouchableOpacity>
            )
          }
        </View>
        <ScrollView
          contentContainerStyle={{
            height: "150%",
            alignContent: "center",
          }}
        >
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.box]}
          >
            {renderSvg ? RenderSvg(renderSvg) : RenderSvg(number || number?.toString())}
          </ScrollView>
        </ScrollView>

      </ImageBackground>
    </Wrapper>
  );
}
