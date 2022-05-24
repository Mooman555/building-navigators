import { Dimensions, PixelRatio, Platform } from "react-native";

// const { fontScale } = Dimensions.get("window");

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const scale = SCREEN_WIDTH / 750;

function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export default {
  splash: normalize(100),
  xxl: normalize(48),
  xl: normalize(34),
  large: normalize(32),
  medium: normalize(28),
  small: normalize(26),
  xsmall: normalize(24),
};
