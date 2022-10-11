import { Dimensions, PixelRatio, Platform } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const scale = SCREEN_WIDTH / SCREEN_HEIGHT;

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
  s96: normalize(192),
  s48: normalize(96),
  s40: normalize(80),
  s32: normalize(64),
  s26: normalize(52),
  s22: normalize(44),
  s24: normalize(48),
  s18: normalize(36),
  s17: normalize(34),
  s16: normalize(32),
  s14: normalize(28),
  s13: normalize(26),
  s12: normalize(24),
};
