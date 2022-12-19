import { View } from 'react-native'
import React, { useState, useCallback } from 'react'
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import baseStyles from "../../UI/Styles";
import { useNavigation } from "@react-navigation/native";
import Styles from './SearchableDropDown.style';
import { useSelector } from "react-redux";
import DropDownPicker from 'react-native-dropdown-picker';

const DropDown = ({ itemsDataList, placeHolderText, navigateTo, location, setStartPosition, setDestinationPoint }) => {
    const navigation = useNavigation();
    const darkMode = useSelector((state) => state.darkMode);
    const [locationsOpen, setLocationsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [genderValue, setGenderValue] = useState(null);
    // const onLocationsOpen = useCallback(() => {
    //     console.log("hello");
    // }, []);


    return (
        <View style={{ flexDirection: 'row' }}>
            <Ionicons
                name="search"
                size={15}
                color="gray"
                style={{ marginRight: 10, alignSelf: 'center', position: "absolute", marginLeft: 30 }}
            />
            <DropDownPicker
                // style={styles.dropdown}
                loading={loading}
                open={locationsOpen}
                setOpen={setLocationsOpen}
                // onOpen={onLocationsOpen}
                value={genderValue} 
                setValue={setGenderValue}
                // onChangeValue={onChange}
                items={itemsDataList}
                itemSeparator={true}
                // setItems={setGender}
                containerStyle={!location && {
                    marginTop: "5%"
                  }}
                searchable={true}
                onSelectItem={(item) => {
                   location ? setStartPosition(item) : setDestinationPoint(item)
                  }}
                theme="LIGHT"
                placeholder={placeHolderText}
                searchPlaceholder="Search..."
                zIndex={location ? 3000 : 2000}
                zIndexInverse={1000} 
                // placeholderStyle={styles.placeholderStyles}
              
            />
            {
                location && <MaterialIcons
                    name="my-location"
                    size={20}
                    color="black"
                    style={{ alignSelf: 'center', position: "absolute", marginLeft: "87%" }}
                />
            }

        </View>
    )
}

export default DropDown