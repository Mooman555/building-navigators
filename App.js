import React, { useEffect, useState } from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { MainStack } from "./src/Navigators/StackNavigation";
import { Provider } from "react-redux";
import mainReducer from "./src/Redux/reducer";
import { legacy_createStore as createStore } from "redux";
import BleManager from "react-native-ble-manager";
import { Alert, BackHandler } from "react-native";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import { requestBluetoothPermission ,checkBluetoothConnectPermission,checkBluetoothPermission,checkBluetoothScanPermission, requestBluetoothConnectPermission, requestBluetoothScanPermission} from "./src/Functions/bluetoothPermissions";
export const App = () => {
  const [enableBluetooth, setEnableBluetooth] = useState(false);
  const [enableLocation, setEnableLocation] = useState(false);
  const store = createStore(mainReducer);

  useEffect(() => {
    const permissions = async () => {
      await bluetootPermission();
      await locationPermission();
    };

    permissions();
  }, []);

  const locationPermission = async () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then((data) => {
        if (data === "enabled") {
          setEnableLocation(true);
        } else {
          setEnableLocation(true);
        }
        console.log(data, "rrrrr");
      })
      .catch((err) => {
        setEnableLocation(false);
        Alert.alert(
          "Permission Denied",
          "Please enable Location in your device settings to use this App.",
          [
            {
              text: "Cancel",
              onPress: () => {
                setEnableLocation(false);
                BackHandler.exitApp();
              },
              style: "cancel",
            },
            { text: "Enable", onPress: () => askLocationPermissionAlert() },
          ]
        );
        console.log(err, "errr");
      });
  };

  const bluetootPermission = async () => {
    // let state =  BleManager.checkState();
    // ask here for the check and request bluetooth permissions.
    // let state = await checkBluetoothPermission();
    // if (state === undefined) {
    //   BleManager.enableBluetooth().then(() => { handleAcceptBluetooth() })
    //     .catch((error) => {
    //       // Failure code
    //       console.log(error,"Bluetooth The user refuse to enable bluetooth");
    //       Alert.alert(
    //         "Permission Denied",
    //         "Please enable Bluetooth in your device settings to use this App.",
    //         [
    //           {
    //             text: "Cancel",
    //             onPress: () => handleRejectBluetooth(),
    //             style: "cancel",
    //           },
    //           { text: "Enable", onPress: () => askPermissionAlert() },
    //         ]
    //       );
    //     });
    // } else {
    //   handleAcceptBluetooth();
    // }
    try {
      let state =  await checkBluetoothPermission()
      BleManager.enableBluetooth().then(() => { handleAcceptBluetooth() })
      console.log(state,"state")
      // ask here for the check and request bluetooth permissions.
      //checkBluetoothPermission();
      if (state === true ) {
        handleAcceptBluetooth();
        // BleManager.enableBluetooth().then(() => { handleAcceptBluetooth() })
        
      }else {
         await requestBluetoothPermission()
         await requestBluetoothConnectPermission()
         await requestBluetoothScanPermission()
        handleAcceptBluetooth();
        // BleManager.enableBluetooth().then(() => { handleAcceptBluetooth() })

      }
    } catch (error) {
      console.log(error, "Error while checking bluetooth state");
    }
  };

  const handleAcceptBluetooth = () => {
    setEnableBluetooth(true);
  };

  const handleRejectBluetooth = () => {
    setEnableBluetooth(false);
    BackHandler.exitApp();
  };

  const askLocationPermissionAlert = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then((data) => {
        if (data === "enabled") {
          setEnableLocation(true);
        } else {
          setEnableLocation(true);
        }
        console.log(data, "rrrrr");
      })
      .catch((err) => {
        setEnableLocation(false);
        BackHandler.exitApp();
        console.log(err, "errr");
      });
  };

  const askPermissionAlert = () => {
    BleManager.enableBluetooth()
      .then(() => handleAcceptBluetooth())
      .catch((error) => handleRejectBluetooth());
  };

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          {enableBluetooth && (
            <MainStack
              enableBluetooth={enableBluetooth}
              enableLocation={enableLocation}
            />
          )}
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};
