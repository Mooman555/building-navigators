import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../UI/Colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "7%",
  },
  modalContainer: {
    width: "100%",
    height: 350,
    backgroundColor: "white",
    borderRadius: 35,
    paddingVertical: "10%",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 5,
  },
  modalLogo: { width: 102, height: 80, resizeMode: "contain" },
  textH1: {
    fontFamily: "AktivRegular",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    color: Colors.orange,
    marginTop: 49,
    width: "100%",
  },
  textH2: {
    fontFamily: "AktivRegular",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    color: Colors.black,
    marginTop: 8,
    width: "100%",
  },
  ratingContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginTop: 30,
  },
  ratingView: {
    justifyContent: "center",
    alignItems: "center",
  },
  rateIcon: { width: 34, height: 34, resizeMode: "contain" },
  rateText: {
    fontFamily: "AktivRegular",
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
    color: Colors.black,
    width: "100%",
  },
});
