import { TextInput, Text, View, Image, TouchableOpacity } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import React from "react";
import baseStyles from "../../UI/Styles";
import styles from "./InputField.style";
import Medium from "../../UI/fonts/Medium";
import Regular from "../../UI/fonts/Regular";
import Colors from "../../UI/Colors";

export default function InputField(props) {
  return (
    <View style={{ width: "100%" }}>
      <View style={baseStyles.labelView}>
        <Text style={[Medium.h14]}>{props.label}</Text>
        <Text style={[Medium.h14]}>{props.errorMessage}</Text>
      </View>
      <View style={[baseStyles.inputWrapper, props.customStyle,baseStyles.viewWrapper]}>
        <Ionicons
          name="search"
          size={15}
          color="gray"
          style={{ marginRight: 10 }}
        />
        <TextInput
          defaultValue={props.defaultValue}
          style={[
            baseStyles.input,
            // baseStyles.grayText,
            Regular.h14,
            props.customInput,
          ]}
          value={props.value}
          placeholder={props.placeholder}
          secureTextEntry={props.secureTextEntry}
          onChangeText={props.onChangeText}
        //  placeholderTextColor={Colors.gray}
          keyboardType={props.numberPad && "number-pad"}
          multiline={props.multiline}
          editable={props.editable}
          autoCapitalize={props.capitalize ? "sentences" : "none"}
        />
        {/* {props.showIcon && ( */}
        <TouchableOpacity
          style={styles.viewerST}
          onPress={props.onPress}
          hitSlop={20}
        >
          <Ionicons
            name={props.secureTextEntry ? "arrow-up" : "arrow-down"}
            size={16}
            color="black"
          />
        </TouchableOpacity>
        {/* )} */}
      </View>
    </View>
  );
}
