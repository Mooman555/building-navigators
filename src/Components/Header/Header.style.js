import { StyleSheet } from "react-native";
import Colors from "../../UI/Colors";

export default StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 60,
    marginTop: "10%",
    zIndex: 1,
  },
  mb: { marginTop: "20%", marginBottom: "-20%" },
  backbtn: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightgray,
  },
  nextbtn: {
    width: 40,
    height: 40,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleView: {
    width: 150,
    height: 50,
    zIndex: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  toggleBtn: {
    width: 64,
    height: 32,
    borderRadius: 30,
    backgroundColor: Colors.lightgray,
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleText: {
    fontFamily: "AktivRegular",
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    color: Colors.text,
    marginHorizontal: 10,
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
    color: Colors.black,
  },
});
