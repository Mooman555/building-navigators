import {
  NativeModules,
  NativeEventEmitter,
  BackHandler,
  Alert,
  Platform 
} from "react-native";
import BleManager from "react-native-ble-manager";
import {
  checkFineLocationPermission,
  requestFineLocationPermission,
  requestLocationCoarsePermission,
  checkCoarseLocationPermission,
  checkBluetoothScanPermission,
  requestBluetoothScanPermission
} from "./bluetoothPermissions";
import { beacons as Beacons } from "../data/beacons";
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
var array = [];
var distances = [];
const beacons = Beacons;

let subscription;
let handleStopSubscription;

export const initiateProcess = (isScanning, setIsScanning) => {
  return new Promise(async (resolve, reject) => {
    BleManager.start({ showAlert: false });
    subscription = bleManagerEmitter.addListener("BleManagerDiscoverPeripheral",handleDiscoverPeripheral);
    handleStopSubscription = bleManagerEmitter.addListener("BleManagerStopScan",() => handleStopScan(resolve));
    const version = Platform?.__constants?.Release;
    console.log(`Android version: ${version}`);

    if(version !== undefined && version >= 9 && version <= 11 ){
      const locationFineCheck = await checkFineLocationPermission();
      const locationCoarseCheck = await checkCoarseLocationPermission();
      if (locationCoarseCheck === true && locationFineCheck === true) {
        startScan(isScanning, setIsScanning)
      }else if (locationCoarseCheck === "Location permission is denied." || locationFineCheck === "Location permission is denied.") {
          let fineLocation = await requestFineLocationPermission();
          let caorseLocation = await requestLocationCoarsePermission();
          if (fineLocation && caorseLocation) {
            startScan(isScanning, setIsScanning);
          } else {
            Alert.alert(
              "Permission Denied",
              "Please enable location in your device settings to use this app.",
              [
                {
                  text: "Cancel",
                  onPress: () => BackHandler.exitApp(),
                  style: "cancel",
                },
                { text: "Enable", onPress: () => handleLocationPermission(version) },
              ]
            );
          }
        }
    }else if(version !== undefined && version > 11){
      const locationFineCheck = await checkFineLocationPermission();
      const locationCoarseCheck = await checkCoarseLocationPermission();
      const bluetoothScanCheck = await checkBluetoothScanPermission();
      if (locationCoarseCheck === true && locationFineCheck === true && bluetoothScanCheck === true) {
        startScan(isScanning, setIsScanning)
      }else if (locationCoarseCheck === "Location permission is denied." || locationFineCheck === "Location permission is denied." || bluetoothScanCheck === "Bluetooth Scan permission is denied.") {
          let fineLocation = await requestFineLocationPermission();
          let caorseLocation = await requestLocationCoarsePermission();
          let bluetoothScan = await requestBluetoothScanPermission();
          if (fineLocation && caorseLocation && bluetoothScan) {
            startScan(isScanning, setIsScanning);
          } else {
            Alert.alert(
              "Permission Denied",
              "Please enable location in your device settings to use this app.",
              [
                {
                  text: "Cancel",
                  onPress: () => BackHandler.exitApp(),
                  style: "cancel",
                },
                { text: "Enable", onPress: () => handleLocationPermission(version) },
              ]
            );
          }
        }
    }
    
    
    // console.log(locationCoarseCheck,"locationCoarseCheck")
    // console.log(bluetoothScanCheck,"bluetoothScanCheck")
    // console.log(locationFineCheck,"locationCheck")
   
  });
};

const handleLocationPermission = async (version) => {
  if(version !== undefined && version >= 9 && version <= 11 ){
    let permission = await requestFineLocationPermission();
    let per = await requestLocationCoarsePermission();
    if (permission && per) {
      startScan(isScanning, setIsScanning);
    } else {
      BackHandler.exitApp();
    }
  }else if(version !== undefined && version > 11){
    let permission = await requestFineLocationPermission();
    let per = await requestLocationCoarsePermission();
    let scan = await requestBluetoothScanPermission();
    if (permission && per && scan) {
      startScan(isScanning, setIsScanning);
    } else {
      BackHandler.exitApp();
    }
  }
  let permission = await requestFineLocationPermission();
  let per = await requestLocationCoarsePermission();
  if (permission && per) {
    startScan(isScanning, setIsScanning);
  } else {
    BackHandler.exitApp();
  }
};

const startScan = (isScanning, setIsScanning) => {
  console.log("scanning start");
  console.log(isScanning, "IsScanning value");
  if (!isScanning) {
    BleManager.scan([], 5, false)
      .then(() => {
        console.log("inside Scan");
        // setIsScanning(true);
      })
      .catch((err) => {
        console.error(err, "llll");
      });
  }
};

const handleDiscoverPeripheral = (peripheral) => {
  console.log("event listener handleDiscoverPeripheral");
  beacons?.forEach((beacon) => {
    if (peripheral?.id === beacon?.id) {
      array.push({
        id: peripheral.id,
        location_id: beacon.location_id,
        rssi: peripheral.rssi,
      });
    }
  });
};

const handleStopScan = async (resolve) => {
  console.log("scan stop");
  subscription.remove();
  handleStopSubscription.remove();
  var uniqueArray = removeDuplicates(array, "id");
  for (let index = 0; index < uniqueArray.length; index++) {
    await connectDevice(uniqueArray[index]);
  }
  // setIsScanning(false)
  resolve(distances);
};

function removeDuplicates(originalArray, prop) {
  console.log("remove duplication");
  var newArray = [];
  var lookupObject = {};
  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }
  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}

const connectDevice = (device) => {
  console.log("connect devices");
  return new Promise((resolve, reject) => {
    BleManager.connect(device?.id)
      .then(() => {
        // Measured Power = -69, N = 2 ,Distance = 10 ^ ((Measured Power -RSSI)/(10 * N))
        // calculateDistance(device?.rssi, device.location_id)
        resolve(calculateDistance(device?.rssi, device.location_id));
      })
      .catch((error) => {
        console.log(error, "error");
        resolve(calculateDistance(device?.rssi, device.location_id));
      });
  });
};

const calculateDistance = (RSI, name) => {
  console.log("calculating distances");
  let powerOf = 10;
  let powerTo = (-69 - RSI) / (10 * 2);
  let distance = Math.pow(powerOf, powerTo);
  distance && distances.push({ distance: distance, location_id: name });
};
