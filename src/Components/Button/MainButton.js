import * as React from "react";
import { Text, Pressable, Image } from "react-native";
import styles from "./Button.style";

class MainButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Pressable
        style={[styles.blueButtonMain, this.props.styleProp]}
        onPress={this.props.onPress}
      >
        <Text
          style={
            this.props.textStyle ? this.props.textStyle : styles.blueBtnText
          }
        >
          {this.props.btnText}
        </Text>
        {this.props.btnIcon ? (
          <Image style={styles.btnIcon} source={this.props.btnIcon} />
        ) : null}
      </Pressable>
    );
  }
}

export default MainButton;
