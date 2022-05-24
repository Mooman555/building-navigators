import * as React from "react";
import baseStyle from "../../UI/Style";
import { View } from "react-native";
import { connect } from "react-redux";

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View
        style={this.props.darkMode ? baseStyle.wrapperDark : baseStyle.wrapper}
      >
        {this.props.children}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  darkMode: state.darkMode,
});

export default connect(mapStateToProps, null)(Wrapper);
