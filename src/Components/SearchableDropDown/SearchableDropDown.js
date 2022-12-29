import { View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import DropDownPicker from 'react-native-dropdown-picker';
import { initiateProcess } from '../../Functions/initiateProcess';
import { filterItems } from '../../Functions/filterItems';
import { destinations } from './DropDownValues';
import { beacons } from '../../data/beacons';

const DropDown = ({ itemsDataList, placeHolderText, navigateTo, location, setStartPosition, setDestinationPoint,setBeaconDataSet }) => {

    const [isScanning, setIsScanning] = useState(false);
    const [showCurrentLocation, setShowCurrentLocation] = useState(false);
    const navigation = useNavigation();
    const darkMode = useSelector((state) => state.darkMode);
    const [locationsOpen, setLocationsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [startingValue, setStartingValue] = useState(null);
    const [destinationValue, setDestinationValue] = useState(null);

    useEffect(() => {
        startProcess()
    }, [])

    const startProcess = async () => {
        if ( location) {
            let connectedDevices = await initiateProcess(isScanning, setIsScanning)
            let sortedConnectedDevices = connectedDevices?.sort(dynamicSort("distance"));
            let array =[];
            beacons?.forEach(beacon => {
                connectedDevices?.forEach(device => {
                    if(beacon?.location_id === device?.location_id ){
                        array.push({...beacon,distance:device?.distance})
                    }
                })
            });
            setBeaconDataSet(array);
            console.log(sortedConnectedDevices,"sortedConnectedDevices")
            findNearestDevice(connectedDevices[0])
            itemsDataList = filterItems(itemsDataList)
        }
    }

    function dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    const findNearestDevice = (device) => {
        console.log(device, "device")
        if (device) {
            destinations?.forEach(item => {
                if (item.id === device?.location_id) {
                    console.log("ffff", item)
                    setStartingValue(item.value)
                    setStartPosition(item)
                }
            })
        }
    }


    return (
        <View style={{ flexDirection: 'row' }}>
            <Ionicons
                name="search"
                size={15}
                color="gray"
                style={{ marginRight: 10, alignSelf: 'center', position: "absolute", marginLeft: 10, top: 30,zIndex:2 }}
            />

         <DropDownPicker
                    // style={styles.dropdown}
                    loading={loading}
                    open={locationsOpen}
                    setOpen={setLocationsOpen}
                    // onOpen={onLocationsOpen}
                    value={location ? (showCurrentLocation ? startingValue : null) : destinationValue }
                    setValue={location ? setStartingValue : setDestinationValue}
                    // onChangeValue={onChange}
                    items={itemsDataList}
                    itemSeparator={true}
                    // setItems={setGender}
                    containerStyle={{
                        marginTop: "4%",
                       
                    }}
                   
                   
                    style={{ paddingLeft: 30, borderRadius: 30, zIndex:1 }}
                    searchable={true}
                    onSelectItem={(item) => {
                        console.log(item,"item")
                        location ? setStartPosition(item) : setDestinationPoint(item)
                    }}
                    arrowIconStyle={{
                        width: 0,
                        height: 0
                    }}
                    dropDownContainerStyle={{
                        height: 200,
                        overflow: 'scroll',
                        zIndex: 9999
                      }}
                    theme="LIGHT"
                    placeholder={placeHolderText}
                    searchPlaceholder="Search..."
                    
                    zIndexInverse={1000}
                // placeholderStyle={styles.placeholderStyles}
                // icon ={ () =>  {
                //     location && <MaterialIcons
                //         name="my-location"
                //         size={20}
                //         color="black"
                //         style={{ alignSelf: 'center', position: "absolute", marginLeft: 75,zIndex: 2,top: 30,right: 15 }}
                //     />
                // }}

                />
           

            {
                location && <MaterialIcons
                    name="my-location"
                    size={20}
                    color="black"
                    style={{ alignSelf: 'center', position: "absolute", marginLeft: 75,  top: 27, right: 15,zIndex:2 }}
                    onPress={() => {
                        console.log("click Live Location")
                        setShowCurrentLocation(!showCurrentLocation)
                    }}
                />
            }
        </View>
    )
}

export default DropDown