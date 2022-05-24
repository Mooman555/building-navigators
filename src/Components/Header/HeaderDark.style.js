import { StyleSheet } from "react-native";
import Colors from "../../UI/Colors";

export default StyleSheet.create({
  backbtn: {
    position: "absolute",
    left: -14,
    bottom: -30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.darkGray,
  },

  toggleBtn: {
    width: 64,
    height: 32,
    borderRadius: 30,
    backgroundColor: Colors.darkGray,
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleON: {
    width: 32,
    height: 32,
    backgroundColor: Colors.orange,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  OnOffText: {
    fontFamily: "AktivRegular",
    fontSize: 13,
    fontWeight: "500",
    color: Colors.white,
  },

  rightText: {
    fontFamily: "AktivRegular",
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    color: Colors.white,
  },
});
