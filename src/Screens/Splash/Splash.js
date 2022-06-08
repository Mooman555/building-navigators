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
import SplashStyle from "./Splash.style";
import { connect } from "react-redux";

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", () => {
      console.log("componentDidMount");
      setTimeout(() => this.props.navigation.navigate("OnBoarding"), 2000);
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return (
      <Wrapper>
        <Image
          style={SplashStyle.image}
          source={require("../../../assets/images/logo.png")}
        />
        <Text
          style={
            this.props.darkMode
              ? SplashStyle.splashTextDark
              : SplashStyle.splashText
          }
        >
          Meydenbauer Convention Center
        </Text>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  darkMode: state.darkMode,
});

export default connect(mapStateToProps, null)(Splash);
