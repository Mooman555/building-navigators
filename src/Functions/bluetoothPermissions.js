import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
// import { Alert } from 'react-native';

export const checkBluetoothPermission = async () => {
  try {
    const result = await check(PERMISSIONS.ANDROID.BLUETOOTH);
    switch (result) {
      case RESULTS.UNAVAILABLE:
        return "Bluetooth is not available on this device.";
      case RESULTS.DENIED:
        return "Bluetooth permission is denied.";
      case RESULTS.GRANTED:
        return true;
      default:
        return "An unknown error occurred.";
    }
  } catch (error) {
    console.log(error);
    return "An error occurred while checking the bluetooth permission.";
  }
};

export const requestBluetoothPermission = async () => {
  try {
    const result = await request(PERMISSIONS.ANDROID.BLUETOOTH);
    switch (result) {
      case RESULTS.GRANTED:
        return true;
      case RESULTS.UNAVAILABLE:
        return "Bluetooth is not available on this device.";
      case RESULTS.DENIED:
        return "Bluetooth permission is denied.";
      case RESULTS.BLOCKED:
        return "Bluetooth permission is blocked.";
      default:
        return "An unknown error occurred.";
    }
  } catch (error) {
    console.log(error);
    return "An error occurred while requesting the bluetooth permission.";
  }
};



export const checkFineLocationPermission = async () => {
  try {
    const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    switch (result) {
      case RESULTS.UNAVAILABLE:
        return "Location is not available on this device.";
      case RESULTS.DENIED:
        return "Location permission is denied.";
      case RESULTS.GRANTED:
        return true;
      default:
        return "An unknown error occurred.";
    }
  } catch (error) {
    console.log(error);
    return "An error occurred while checking the location permission.";
  }
};

export const requestFineLocationPermission = async () => {
  try {
    const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    switch (result) {
      case RESULTS.GRANTED:
        return true;
      case RESULTS.UNAVAILABLE:
        return "Location is not available on this device.";
      case RESULTS.DENIED:
        return "Location permission is denied.";
      case RESULTS.BLOCKED:
        return "Location permission is blocked.";
      default:
        return "An unknown error occurred.";
    }
  } catch (error) {
    console.log(error);
    return "An error occurred while requesting the location permission.";
  }
};


export const requestLocationCoarsePermission = async () => {
  try {
    const result = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
    switch (result) {
      case RESULTS.GRANTED:
      // let locationResult = await requestCoarseLocationPermission()
        return true;
      case RESULTS.UNAVAILABLE:
        return "Location is not available on this device.";
      case RESULTS.DENIED:
        return "Location permission is denied.";
      case RESULTS.BLOCKED:
        return "Location permission is blocked.";
      default:
        return "An unknown error occurred.";
    }
  } catch (error) {
    console.log(error);
    return "An error occurred while requesting the location permission.";
  }
};


export const checkCoarseLocationPermission = async () => {
  try {
    const result = await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
    switch (result) {
      case RESULTS.GRANTED:
        return true;
      case RESULTS.UNAVAILABLE:
        return "Location is not available on this device.";
      case RESULTS.DENIED:
        return "Location permission is denied.";
      case RESULTS.BLOCKED:
        return "Location permission is blocked.";
      default:
        return "An unknown error occurred.";
    }
  } catch (error) {
    console.log(error);
    return "An error occurred while requesting the location permission.";
  }
};


  export const checkBluetoothScanPermission = async () => {
    try {
      const result = await check(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          return "Bluetooth is not available on this device.";
        case RESULTS.DENIED:
          return "Bluetooth Scan permission is denied.";
        case RESULTS.GRANTED:
          return true;
        default:
          return "An unknown error occurred.";
      }
    } catch (error) {
      console.log(error);
      return "An error occurred while checking the bluetooth permission.";
    }
  }

  export const requestBluetoothScanPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          return "Bluetooth is not available on this device.";
        case RESULTS.DENIED:
          return "Bluetooth Scan permission is denied.";
        case RESULTS.GRANTED:
          return true;
        default:
          return "An unknown error occurred.";
      }
    } catch (error) {
      console.log(error);
      return "An error occurred while checking the bluetooth permission.";
    }
  }


  export const checkBluetoothConnectPermission = async () => {
    try {
      const result = await check(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          return "Bluetooth Connect is not available on this device.";
        case RESULTS.DENIED:
          return "Bluetooth Connect Scan permission is denied.";
        case RESULTS.GRANTED:
          return true;
        default:
          return "An unknown error occurred.";
      }
    } catch (error) {
      console.log(error);
      return "An error occurred while checking the bluetooth permission.";
    }
  }

  export const requestBluetoothConnectPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          return "Bluetooth Connect is not available on this device.";
        case RESULTS.DENIED:
          return "Bluetooth connect Scan permission is denied.";
        case RESULTS.GRANTED:
          return true;
        default:
          return "An unknown error occurred.";
      }
    } catch (error) {
      console.log(error);
      return "An error occurred while checking the bluetooth permission.";
    }
  }