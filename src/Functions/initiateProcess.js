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


export const initiateProcess = (isScanning,setIsScanning) => {

  return new Promise((resolve, reject) => {
    BleManager.start({ showAlert: false })
    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    bleManagerEmitter.addListener('BleManagerStopScan', () => handleStopScan(resolve));
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


const calculateDistance = (RSI, name) => {
    let powerOf = 10;
    let powerTo = ((-69 - (RSI)) / (10 * 2))
    let distance = Math.pow(powerOf, powerTo);
    distance && distances.push({distance:distance,location_id:name})
  }

  const handleDiscoverPeripheral = (peripheral) => {
    beacons?.forEach(beacon => {
      if (peripheral.id === beacon.id) {
        console.log("Matched!!!!")
        array.push({ id:peripheral.id , location_id: beacon.location_id,rssi:peripheral.rssi })
      }
    })
  }

  const connectDevice = (device) => {
    return new Promise((resolve, reject) => {
      BleManager.connect(device.id).then(() => {
        console.log('Connected to BEACON');
        // Measured Power = -69, N = 2 ,Distance = 10 ^ ((Measured Power -RSSI)/(10 * N))
        // calculateDistance(device?.rssi, device.location_id)
          resolve(calculateDistance(device?.rssi, device.location_id))
      }).catch((error) => {
         console.log(error, "error")
         resolve(calculateDistance(device?.rssi, device.location_id))
      })
   })

   
  }

  function removeDuplicates(originalArray, prop) {
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

  const handleStopScan = async (resolve) => {
    console.log("scanned Stopped")
    console.log(array,"array")
    var uniqueArray = removeDuplicates(array, "id");
    console.log("uniqueArray is: " + uniqueArray);
    
    for (let index = 0; index < uniqueArray.length; index++) {
      console.log(index,"index")
     await connectDevice(uniqueArray[index])
    }
    // setIsScanning(false)
    resolve(distances)
    console.log(distances,"distances")
  }


  const startScan = (isScanning,setIsScanning) => {
    if (!isScanning) {
      console.log("start")
      BleManager.scan([], 20, true).then(() => {
        setIsScanning(true);
      }).catch(err => {
        console.error(err);
      });
    }
  }