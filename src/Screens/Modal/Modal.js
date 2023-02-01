import React, { useState } from "react";
import { Alert, Modal, Text, Pressable, View ,ActivityIndicator} from "react-native";
import {styles} from "./Modal.style";

const LoaderModal = ({content,loader}) => {
  
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {loader && <ActivityIndicator size="small" color="red" />}
            <Text>{content}</Text>
            {!loader && (
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default LoaderModal


