import {
    NativeModules,
    NativeEventEmitter,
    Platform,
    PermissionsAndroid
  } from "react-native";
import BleManager from 'react-native-ble-manager';
import { beacons as Beacons } from "../data/beacons";
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
var array = []
var distances = []
const beacons = Beacons

let subscription ;
let handleStopSubscription;

export const initiateProcess = (isScanning,setIsScanning) => {
  return new Promise((resolve, reject) => {
    BleManager.start({ showAlert: false })
     subscription = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    // bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
     handleStopSubscription = bleManagerEmitter.addListener('BleManagerStopScan', () => handleStopScan(resolve));
   

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
        if (result) {
          startScan(isScanning, setIsScanning)
        } else {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
            if (result) {
              startScan(isScanning, setIsScanning)
            } else {
              console.log("User refuse");
            }
          });
        }
      });
    }
  })
}

const startScan = (isScanning,setIsScanning) => {
  console.log("scanning start")
  console.log(isScanning,"IsScanning value")
  if (!isScanning) {
    BleManager.scan([],5, false).then(() => {
      console.log("inside Scan")
      setIsScanning(true);
    }).catch(err => {
      console.error(err);
    });
  }
}

const handleDiscoverPeripheral = (peripheral) => {
  console.log("event listener handleDiscoverPeripheral")
  beacons?.forEach(beacon => {
    if (peripheral?.id === beacon?.id) {
      array.push({ id:peripheral.id , location_id: beacon.location_id,rssi:peripheral.rssi })
    }
  })
}


const handleStopScan = async (resolve) => {
  console.log("scan stop")
  subscription.remove();
  handleStopSubscription.remove();
  var uniqueArray = removeDuplicates(array, "id");
  for (let index = 0; index < uniqueArray.length; index++) {
   await connectDevice(uniqueArray[index])
  }
  // setIsScanning(false)
  resolve(distances)

}

  

function removeDuplicates(originalArray, prop) {
  console.log("remove duplication")
  var newArray = [];
  var lookupObject  = {};
  for(var i in originalArray) {
     lookupObject[originalArray[i][prop]] = originalArray[i];
  }
  for(i in lookupObject) {
      newArray.push(lookupObject[i]);
  }
   return newArray;
}


const connectDevice = (device) => {
  console.log("connect devices")
  return new Promise((resolve, reject) => {
    BleManager.connect(device?.id).then(() => {
      // Measured Power = -69, N = 2 ,Distance = 10 ^ ((Measured Power -RSSI)/(10 * N))
      // calculateDistance(device?.rssi, device.location_id)
      resolve(calculateDistance(device?.rssi, device.location_id))
    }).catch((error) => {
       console.log(error, "error")
       resolve(calculateDistance(device?.rssi, device.location_id))
    })
  })
 
}

   const calculateDistance = (RSI, name) => {
  console.log("calculating distances")
    let powerOf = 10;
    let powerTo = ((-69 - (RSI)) / (10 * 2))
    let distance = Math.pow(powerOf, powerTo);
    distance && distances.push({distance:distance,location_id:name})
  }


 
