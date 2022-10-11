import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../UI/Colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  introVector: {
    resizeMode: "contain",
    width: 250,
    height: 360,
  },
  introText: {
    fontFamily: "AktivRegular",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    width: "100%",
    lineHeight: 28,
    paddingHorizontal: "3%",
    zIndex: 10,
    marginTop: 40,
  },

  dotStyle: {
    backgroundColor: Colors.lightgray,
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 8,
    // marginTop: "-20%",
  },
  activeDotStyle: {
    backgroundColor: Colors.orange,
    width: 40,
    height: 8,
    borderRadius: 10,
    margin: 8,
    // marginTop: "-20%",
  },
  slider: {
    height: "80%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  whiteBack: {
    backgroundColor: Colors.white,
    width: "100%",
    height: "50%",
    position: "absolute",
    bottom: 0,
    zIndex: -20,
  },
});
