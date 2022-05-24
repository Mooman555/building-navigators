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
import HomeStyle from "./Home.style";
import { connect } from "react-redux";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        key={this.props.item.id}
        style={[
          HomeStyle.cardView,
          {
            flexDirection: "row-reverse",
            marginHorizontal: 10,
          },
        ]}
      >
        <View style={[HomeStyle.cardView2]}>
          <View style={[HomeStyle.cardView3]}>
            <Image
              style={{
                width: 27,
                height: 27,
              }}
              source={require("../../../assets/images/vector3.png")}
            />
            <Text style={HomeStyle.cardText}>{this.props.item.text}</Text>
            <Text style={HomeStyle.placesText}>
              {this.props.item.places} places
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const mapStateToProps = (state) => ({
  darkMode: state.darkMode,
});

export default connect(mapStateToProps, null)(Card);
