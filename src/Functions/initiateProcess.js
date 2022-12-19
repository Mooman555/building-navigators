import {
    NativeModules,
    NativeEventEmitter,
    Platform,
    PermissionsAndroid
  } from "react-native";
import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
var array = []
var distances = []

  const beacons = [
    {
      id: "AC:23:3F:E8:19:AD",
      nearstLocationName: "Dev Hall",
      location_id: "dev_hall"
    },
    {
      id: "AC:23:3F:E8:19:AC",
      nearstLocationName: "HR Hall",
      location_id: "hr_hall"
    },
    {
      id: "AC:23:3F:E7:DD:B1",
      nearstLocationName: "Kitchen Hall",
      location_id: "kitchen_hall"
    },
    {
      id: "AC:23:3F:E7:DD:B6",
      nearstLocationName: "PM Hall",
      location_id: "pm_hall"
    },

  ]


export const initiateProcess = (isScanning,setIsScanning) => {
    BleManager.start({ showAlert: false })

    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
        if (result) {
          startScan(isScanning,setIsScanning)
        } else {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
            if (result) {
            startScan(isScanning,setIsScanning)
            } else {
              console.log("User refuse");
            }
          });
        }
      });
    }
}


const calculateDistance = (RSI, name) => {
    let powerOf = 10;
    let powerTo = ((-69 - (RSI)) / (10 * 2))
    let distance = Math.pow(powerOf, powerTo);
    console.log(`${name} distance :-`, distance);
    console.log(`${name} RSI :-`, RSI);
    distance && distances.push(distance)
  }

  const handleDiscoverPeripheral = (peripheral) => {
    beacons?.forEach(beacon => {
      if (peripheral.id === beacon.id) {
        console.log("Matched!!!!")
        array.push({ ...peripheral, location_id: beacon.location_id })
      }
    })
  }

  const connectDevice = (device) => {
    BleManager.connect(device.id).then(() => {
      console.log('Connected to BEACON');
      // Measured Power = -69, N = 2 ,Distance = 10 ^ ((Measured Power -RSSI)/(10 * N))
      calculateDistance(device?.rssi, device.location_id)
    }).catch((error) => {
      console.log(error, "error")
    //   setTimeout(() => {
    //     connectDevice(device)
    //   }, 500);
    })
  }

  const handleStopScan = () => {
    console.log("scanned Stopped")
    let uniqueChars = [...new Set(array)];
    uniqueChars?.map(device => {
      connectDevice(device)
    });
    // setIsScanning(false)
  }


  const startScan = (isScanning,setIsScanning) => {
    if (!isScanning) {
      BleManager.scan([], 10, false).then(() => {
        setIsScanning(true);
      }).catch(err => {
        console.error(err);
      });
    }
  }