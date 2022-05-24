import {
  View,
  Image,
  Pressable,
  ImageBackground,
  Dimensions,
  Text,
  TextInput,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import ModalStyle from "./Modal.style";
class RatingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { setModalVisible } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={setModalVisible}
      >
        <Pressable style={ModalStyle.modalWrapper} onPress={setModalVisible}>
          <View style={ModalStyle.modalContainer}>
            <Image
              style={ModalStyle.modalLogo}
              source={require("../../../assets/images/logo.png")}
            />
            <Text style={ModalStyle.textH1}>Rate our Application</Text>
            <Text style={ModalStyle.textH2}>
              How useful our application was?
            </Text>
            <View style={ModalStyle.ratingContainer}>
              {/* Awesome */}
              <TouchableOpacity
                onPress={setModalVisible}
                style={ModalStyle.ratingView}
              >
                <Image
                  style={ModalStyle.rateIcon}
                  source={require("../../../assets/images/awsome.png")}
                />
                <Text style={ModalStyle.rateText}>Awesome</Text>
              </TouchableOpacity>
              {/* Average */}
              <TouchableOpacity
                onPress={setModalVisible}
                style={ModalStyle.ratingView}
              >
                <Image
                  style={ModalStyle.rateIcon}
                  source={require("../../../assets/images/average.png")}
                />
                <Text style={ModalStyle.rateText}>Average</Text>
              </TouchableOpacity>
              {/* Bad */}
              <TouchableOpacity
                onPress={setModalVisible}
                style={ModalStyle.ratingView}
              >
                <Image
                  style={ModalStyle.rateIcon}
                  source={require("../../../assets/images/bad.png")}
                />
                <Text style={ModalStyle.rateText}>Bad</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    );
  }
}

export default RatingModal;
