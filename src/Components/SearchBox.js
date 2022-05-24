import * as React from "react";
import {
  TextInput,
  View,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import baseStyle from "../UI/Style";
class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View
        style={[
          baseStyle.searchInput,
          {
            flexDirection: "row",
            position: "relative",
            alignItems: "center",
          },
        ]}
      >
        <TextInput
          style={{
            width: "100%",
            paddingRight: "10%",
          }}
          value={this.props.inputValue}
          onChangeText={this.props.onChangeText}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            right: "15%",
            alignSelf: "center",
          }}
          onPress={this.props.onPressCross}
        >
          <Image
            style={baseStyle.searchIcon}
            source={require("../../assets/images/cancelBlack-icon.png")}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            right: "5%",
            alignSelf: "center",
          }}
          onPress={this.props.onPressSearch}
        >
          <Image
            style={baseStyle.searchIcon}
            source={require("../../assets/images/search-icon.png")}
          ></Image>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SearchBox;
