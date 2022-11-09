import {
  View,
  Image,
  Pressable,
  ImageBackground,
  Dimensions,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Wrapper from "../../Components/Wrapper/Wrapper";
import Header from "../../Components/Header/Header";
import { connect } from "react-redux";
import BuildingsStyle from "./Buildings.style";

class Buildings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingVisible: false,
      dataArr: [
        {
          id: 0,
          text: "Building 1",
          image: require("../../../assets/images/building1.png"),
        },
        {
          id: 1,
          text: "Maydenbauer (MCC)",
          image: require("../../../assets/images/building2.png"),
        },
        {
          id: 2,
          text: "Building 3",
          image: require("../../../assets/images/building3.png"),
        },
        {
          id: 3,
          text: "Building 4",
          image: require("../../../assets/images/building4.png"),
        },
      ],
    };
  }

  // Modal Visibility
  setModalVisible = (visible) => {
    this.setState({ ratingVisible: visible });
  };
  render() {
    return (
      <View
        style={
          this.props.darkMode
            ? BuildingsStyle.wrapperDark
            : BuildingsStyle.wrapper
        }
      >
        <ImageBackground
          style={BuildingsStyle.imageBackground}
          resizeMode="cover"
          source={require("../../../assets/images/back.png")}
        >
          <ScrollView>
            <View style={{ paddingHorizontal: "3%" }}>
              <Header
                onPressLeft={() => this.props.navigation.goBack()}
                showLeft={true}
                textButton={true}
                Title={"Buildings"}
              />
            </View>
            <Text
              style={
                this.props.darkMode
                  ? BuildingsStyle.headingTextDark
                  : BuildingsStyle.headingText
              }
            >
              Select Building
            </Text>
            <View style={BuildingsStyle.container}>
              {this.state.dataArr.map((item, index) => (
                <TouchableOpacity
                  onPress={() =>
                    // item.id == 1 && this.props.navigation.navigate("Home")
                    item.id == 0 && this.props.navigation.navigate("MapScreen")
                  }
                  style={BuildingsStyle.cardView}
                >
                  <Image
                    style={BuildingsStyle.imageVector}
                    source={item.image}
                  />
                  <Text style={BuildingsStyle.buildingText}>{item.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  darkMode: state.darkMode,
});

export default connect(mapStateToProps, null)(Buildings);
