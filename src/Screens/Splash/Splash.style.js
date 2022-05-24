import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../UI/Colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  image: {
    resizeMode: "contain",
    width: 235,
    height: 182,
    alignSelf: "center",
  },
  splashText: {
    fontFamily: "AktivRegular",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    color: Colors.black,
  },
  splashTextDark: {
    fontFamily: "AktivRegular",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    color: Colors.white,
  },
});
