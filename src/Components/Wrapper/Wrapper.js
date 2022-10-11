import * as React from "react";
import baseStyles from "../../UI/Styles";
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
        style={[
          this.props.darkMode ? baseStyles.wrapperDark : baseStyles.wrapper,
          this.props.wrapperNP
            ? { paddingHorizontal: 0 }
            : { paddingHorizontal: "3%" },
        ]}
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
