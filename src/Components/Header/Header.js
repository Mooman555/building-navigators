import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import * as React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import { connect } from "react-redux";
import Colors from "../../UI/Colors";
import baseStyle from "../../UI/Style";
import styles from "./Header.style";
import { setDarkMode } from "../../Redux/action";
import HeaderDarkStyle from "./HeaderDark.style";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Enabled: this.props.darkMode };
  }
  setTheme = () => {
    this.setState({ Enabled: !this.state.Enabled }, () =>
      this.props.dispatch(setDarkMode(this.state.Enabled))
    );
  };
  render() {
    console.log(this.props.darkMode);
    return (
      <View style={[styles.topBar, this.props.styleProp]}>
        {!this.props.showLeft ? null : (
          <TouchableOpacity
            style={
              this.props.darkMode ? HeaderDarkStyle.backbtn : styles.backbtn
            }
            onPress={this.props.onPressLeft}
            hitSlop={20}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color={this.props.darkMode ? "white" : "black"}
            />
          </TouchableOpacity>
        )}
        <Text
          style={[
            styles.titleText,
            {
              color: this.props.darkMode ? Colors.white : Colors.darkPrimary,
            },
          ]}
        >
          {this.props.Title}
        </Text>
        {!this.props.textButton && (
          <Pressable
            // hitSlop={180}
            onPress={() => {
              this.setTheme();
            }}
            style={styles.toggleView}
          >
            <Text
              style={[
                this.props.darkMode
                  ? HeaderDarkStyle.rightText
                  : styles.rightText,
                { marginRight: 10 },
              ]}
            >
              {this.state.Enabled ? "Dark  Mode" : "Light  Mode"}
            </Text>
            <View
              style={[
                this.props.darkMode
                  ? HeaderDarkStyle.toggleBtn
                  : styles.toggleBtn,
                {
                  flexDirection: this.state.Enabled ? "row" : "row-reverse",
                },
              ]}
            >
              <Text style={[styles.toggleText]}>off</Text>
              <View style={[styles.toggleON]}>
                <Text style={styles.OnOffText}>on</Text>
              </View>
            </View>
          </Pressable>
        )}
        {this.props.textButton && (
          <TouchableOpacity
            style={styles.nextbtn}
            onPress={this.props.onPressRightText}
          >
            <Text
              style={
                this.props.darkMode
                  ? HeaderDarkStyle.rightText
                  : styles.rightText
              }
            >
              {this.props.nextText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  darkMode: state.darkMode,
});

export default connect(mapStateToProps, null)(Header);
