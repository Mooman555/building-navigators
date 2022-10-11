import { StyleSheet } from "react-native";
import colors from "./Colors";
import themeFontSize from "./themeFontSizes";

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  wrapperDark: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.darkPrimary,
  },

  blueButtonMain: {
    backgroundColor: colors.neavyBlue,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 8,
    paddingBottom: 8,
    margin: 0,
    color: "#fff",
    borderRadius: 4,
  },
  blueBtnText: {
    color: colors.white,
    fontFamily: "AktivRegular",
    fontSize: 14,
    textAlign: "center",
  },

  backbtn: {
    position: "absolute",
    left: 20,
    bottom: 12,
    zIndex: 2,
  },
  backArrow: {
    width: 20,
    height: 20,
    zIndex: 2,
  },
  nextbtn: {
    position: "absolute",
    right: 20,
    bottom: 12,
    zIndex: 2,
  },

  vectorIcon: { width: 20, height: 20, resizeMode: "contain" },
  whiteText: {
    color: colors.white,
  },
  blackText: {
    color: colors.black,
  },
  labelView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputWrapper: {
    height: 45,
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 100,
    paddingHorizontal: 20,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: "100%",
  },
});
