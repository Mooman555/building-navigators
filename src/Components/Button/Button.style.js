import { StyleSheet } from "react-native";
import colors from "../../UI/Colors";
import themeFontSize from "../../UI/themeFontSizes";

export default StyleSheet.create({
  blueButtonMain: {
    backgroundColor: colors.orange,
    color: colors.white,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    width: 157,
    height: 54,
    marginTop: 10,
  },
  blueBtnText: {
    color: colors.white,
    fontFamily: "AktivRegular",
    fontSize: 14,
    textAlign: "center",
  },

  btnIcon: {
    width: 20,
    height: 20,
    resizeMode: "center",
    // marginLeft: 5,
  },
});
