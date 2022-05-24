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
import * as React from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Wrapper from "../../Components/Wrapper/Wrapper";
import Header from "../../Components/Header/Header";
import HomeStyle from "./Home.style";
import { connect } from "react-redux";
import Card from "./Card";
import RatingModal from "../../Components/Modal/RatingModal";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingVisible: false,
      dataArr: [
        { id: 0, text: "Coffee", places: 530 },
        { id: 1, text: "Theater", places: 56 },
        { id: 2, text: "Cinema", places: 130 },
        { id: 3, text: "Coffee", places: 340 },
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
        style={this.props.darkMode ? HomeStyle.wrapperDark : HomeStyle.wrapper}
      >
        <ImageBackground
          style={HomeStyle.imageBackground}
          resizeMode="cover"
          source={require("../../../assets/images/back.png")}
        >
          {!this.state.ratingVisible && (
            <ScrollView>
              <View style={{ paddingHorizontal: "7%" }}>
                <Header
                  onPressLeft={() => this.props.navigation.goBack()}
                  showLeft={true}
                  textButton={false}
                  nextText={"Skip"}
                />
              </View>
              <View style={HomeStyle.container}>
                <Image
                  style={HomeStyle.imageVector}
                  source={require("../../../assets/images/logo.png")}
                />
                <Text
                  style={
                    this.props.darkMode
                      ? HomeStyle.homeTextDark
                      : HomeStyle.homeText
                  }
                >
                  Meydenbauer Convention Center
                </Text>

                <View style={HomeStyle.backContainer}>
                  <View style={HomeStyle.cardContainer}>
                    {/* serch bar */}
                    <View style={HomeStyle.searchView}>
                      <Ionicons name="search" size={15} color="black" />
                      <TextInput
                        style={HomeStyle.searchBox}
                        placeholder="Search by address..."
                      />
                    </View>
                    {/* search bar */}
                    {/* card View */}

                    <ScrollView horizontal>
                      <View style={HomeStyle.cardsWrapper}>
                        {this.state.dataArr.map((item, index) => (
                          <Card
                            key={index}
                            item={item}
                            onPress={() => this.setModalVisible(true)}
                          />
                        ))}
                      </View>
                    </ScrollView>

                    {/* card View */}
                  </View>
                </View>
              </View>
            </ScrollView>
          )}

          <RatingModal
            setModalVisible={() => this.setModalVisible(false)}
            modalVisible={this.state.ratingVisible}
          />
        </ImageBackground>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  darkMode: state.darkMode,
});

export default connect(mapStateToProps, null)(Home);
