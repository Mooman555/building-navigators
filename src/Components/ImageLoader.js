import * as React from "react";
import { View, Text, Modal } from "react-native";
import baseStyle from "../UI/Style";
import * as ImagePicker from "expo-image-picker";
import MainButton from "./Button/MainButton";

class ImageLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false };
  }

  //From Gallery
  openImagePickerAsync = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
    if (pickerResult.cancelled === true) {
      return;
    }

    this.props.setImageUrl(pickerResult.uri);
  };
  //From Camera
  openCamera = async () => {
    let cameraResult = await ImagePicker.launchCameraAsync();
    console.log(cameraResult);
    if (cameraResult.cancelled === true) {
      return;
    }
    this.props.setImageUrl(cameraResult.uri);
  };
  getPermission = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      await ImagePicker.requestCameraPermissionsAsync();
    } catch (err) {
      alert(err);
      console.error(err);
    }
  };
  componentDidMount() {
    this.getPermission();
  }
  render() {
    const { setModalVisible } = this.props;
    return (
      <View style={baseStyle.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            setModalVisible(!this.state.modalVisible);
          }}
        >
          <View style={baseStyle.centeredView}>
            <View style={baseStyle.modalView}>
              <Text style={baseStyle.h3}>Please select One</Text>
              <MainButton
                btnText={"Gallery"}
                onPress={() => {
                  setModalVisible(!this.state.modalVisible);
                  this.openImagePickerAsync();
                }}
              />
              <MainButton
                btnText={"Camera"}
                onPress={() => {
                  setModalVisible(!this.state.modalVisible);
                  this.openCamera();
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default ImageLoader;
