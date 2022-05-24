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
import introStyle from "./OnBoarding.style";
import AppIntroSlider from "react-native-app-intro-slider";
import MainButton from "../../Components/Button/MainButton";
import Header from "../../Components/Header/Header";
import { connect } from "react-redux";

class OnBoarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swiperData: [
        {
          index: 0,
          text: "This App will help you reach your destination inside the building.",
          image: require("../../../assets/images/intro1.png"),
        },
        {
          index: 1,
          heading: "Invite your friends",
          text: "This App will help you reach your destination inside the building.",
          image: require("../../../assets/images/intro1.png"),
        },
        {
          index: 2,
          heading: "Do you own diligence before Investing:",
          text: "This App will help you reach your destination inside the building.",
          image: require("../../../assets/images/intro1.png"),
        },
      ],
    };
  }

  renderItem = ({ item, index }) => {
    return (
      <View style={introStyle.slider} key={index}>
        <Image style={introStyle.introVector} source={item.image} />
        <Text
          style={
            this.props.darkMode
              ? introStyle.introTextDark
              : introStyle.introText
          }
        >
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
    return (
      <Wrapper>
        <Header
          onPressLeft={() => this.props.navigation.goBack()}
          showLeft={true}
          textButton={true}
          nextText={"Skip"}
          onPressRightText={() => this.props.navigation.navigate("Home")}
        />
        <AppIntroSlider
          data={this.state.swiperData}
          renderItem={this.renderItem}
          showSkipButton={false}
          showNextButton={true}
          showDoneButton={true}
          dotStyle={introStyle.dotStyle}
          activeDotStyle={introStyle.activeDotStyle}
          bottomButton={true}
          renderNextButton={this.renderDoneButton}
          renderDoneButton={this.renderDoneButton}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  darkMode: state.darkMode,
});

export default connect(mapStateToProps, null)(OnBoarding);
