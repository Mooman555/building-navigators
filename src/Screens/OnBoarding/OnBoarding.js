import {
  View,
  Image,
  Pressable,
  ImageBackground,
  Dimensions,
  Text,
} from "react-native";
import * as React from "react";
import Wrapper from "../../Components/Wrapper/Wrapper";
import styles from "./OnBoarding.style";
import AppIntroSlider from "react-native-app-intro-slider";
import MainButton from "../../Components/Button/MainButton";
import Header from "../../Components/Header/Header";
import { connect } from "react-redux";
import Assets from "../../UI/Assets";
import Colors from "../../UI/Colors";
import baseStyles from "../../UI/Styles";

class OnBoarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swiperData: [
        {
          index: 0,
          text: "This App will help you reach your destination inside the building.",
          image: Assets.intro1,
        },
        {
          index: 1,
          heading: "Invite your friends",
          text: "This App will help you reach your destination inside the building.",
          image: Assets.intro1,
        },
        {
          index: 2,
          heading: "Do you own diligence before Investing:",
          text: "This App will help you reach your destination inside the building.",
          image: Assets.intro1,
        },
      ],
    };
  }



  renderItem = ({ item, index }) => {
    return (
      <View style={styles.slider} key={index}>
        <Image style={styles.introVector} source={item.image} />
        <Text style={[styles.introText, baseStyles.blackText]}>
          {item.text}
        </Text>
      </View>
    );
  };
  renderDoneButton = () => {
    return (
      <MainButton
        styleProp={{ marginBottom: "5%" }}
        btnText={"Lets go"}
        onPress={() => this.props.navigation.navigate("Home")}
      />
    );
  };
  render() {
    let enableBluetooth = this?.props?.route?.params?.enableBluetooth
    let enableLocation = this?.props?.route?.params?.enableLocation
    console.log(enableBluetooth,"enableBluetooth")
    console.log(enableLocation,"enableLocation")
    return (
      <Wrapper wrapperNP={true}>
        <Header
          onPressLeft={() => this.props.navigation.goBack()}
          showLeft={false}
          textButton={false}
          onPressRightText={() => this.props.navigation.navigate("Home")}
        />

        <AppIntroSlider
          style={{ backgroundColor: "transparent" }}
          data={this.state.swiperData}
          renderItem={this.renderItem}
          showSkipButton={false}
          showNextButton={true}
          showDoneButton={true}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          bottomButton={true}
          renderNextButton={this.renderDoneButton}
          renderDoneButton={this.renderDoneButton}
        />
        <View style={styles.whiteBack} />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  darkMode: state.darkMode,
});

export default connect(mapStateToProps, null)(OnBoarding);
