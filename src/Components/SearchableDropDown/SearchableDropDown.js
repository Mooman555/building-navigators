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
import LoaderModal from '../../Screens/Modal/Modal';

const DropDown = ({ itemsDataList, placeHolderText, navigateTo, location, setStartPosition, setDestinationPoint,setBeaconDataSet,handleLoader }) => {

    const [isScanning, setIsScanning] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showCurrentLocation, setShowCurrentLocation] = useState(false);
    const navigation = useNavigation();
    const darkMode = useSelector((state) => state.darkMode);
    const [locationsOpen, setLocationsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [startingValue, setStartingValue] = useState(null);
    const [destinationValue, setDestinationValue] = useState(null);

//     useEffect(() => {
//         startProcess()
//     }, [])

//   console.log("Dropdown RENDER")


//     const startProcess = async () => {
//         if ( location) {
//             handleLoader(true);
//             let connectedDevices = await initiateProcess(isScanning, setIsScanning)
//             let sortedConnectedDevices = connectedDevices?.sort(dynamicSort("distance"));
//             let array =[];
//             beacons?.forEach(beacon => {
//                 connectedDevices?.forEach(device => {
//                     if(beacon?.location_id === device?.location_id ){
//                         array.push({...beacon,distance:device?.distance})
//                     }
//                 })
//             });

//            //causing the Re-render of Parent and Child Components
//             setBeaconDataSet(array);
           
//             findNearestDevice(sortedConnectedDevices[0])

//             handleLoader(false);
//             //This is Non-sense because Component Rendered Before it happened 
//             // itemsDataList = filterItems(itemsDataList)
//         }
//     }

useEffect(() => {
    startProcess()
}, [])



const startProcess = async () => {
    if ( location && startingValue === null) {
        handleLoader(true);
        let connectedDevices = await initiateProcess(isScanning, setIsScanning)
        console.log(connectedDevices,"connectedDevices")
        if (!connectedDevices || connectedDevices.length === 0) {
            console.log("aaa")
           handleLoader(false);
           setShowModal(true);
           return;
        } 
        let sortedConnectedDevices = connectedDevices.sort(dynamicSort("distance"));
        let array =[];
        beacons?.forEach(beacon => {
            connectedDevices?.forEach(device => {
                if(beacon?.location_id === device?.location_id ){
                    array.push({...beacon,distance:device?.distance})
                }
            })
        });

        setBeaconDataSet(array);
        findNearestDevice(sortedConnectedDevices[0])
        setShowCurrentLocation(true)
        handleLoader(false);
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
        if (device) {
            destinations?.forEach(item => {
                if (item.id === device?.location_id) {

                    //causing the Re-render of Component

                    setStartingValue(item.value)

                    //causing the Re-render of Parent and Child Components
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
                   showModal && <LoaderModal content={"Location Not Found! No Beacon Was Connected"} loader={false} />
                }
           

            {
                location && <MaterialIcons
                    name="my-location"
                    size={20}
                    color="black"
                    style={{ alignSelf: 'center', position: "absolute", marginLeft: 75,  top: 27, right: 15,zIndex:2 }}
                    onPress={() => {
                        console.log("click Live Location")
                        setShowCurrentLocation(true)
                    }}
                />
            }
        </View>
    )
}

export default DropDown