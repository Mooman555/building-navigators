import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../UI/Colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  wrapperDark: {
    flex: 1,
    backgroundColor: Colors.darkPrimary,
  },
  imageBackground: { width: "100%", height: "100%" },
  imageVector: {
    resizeMode: "contain",
    width: 152,
    height: 118,
    alignSelf: "center",
    marginTop: "40%",
  },
  homeText: {
    fontFamily: "AktivRegular",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    color: Colors.text,
    marginTop: 8,
    width: "100%",
  },
  homeTextDark: {
    fontFamily: "AktivRegular",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    color: Colors.white,
    marginTop: 8,
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  backContainer: {
    height: windowWidth,
    width: "100%",
    marginTop: 60,
    backgroundColor: Colors.orange,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  cardContainer: {
    height: windowWidth,
    width: "100%",
    backgroundColor: Colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 29,
    marginTop: 5,
  },
  searchView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "7%",
  },
  searchBox: { width: "90%", height: 20 },
  cardView: {
    backgroundColor: "#FFC1AE",
    width: 111,
    height: 167,
    borderRadius: 15,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  cardView2: {
    backgroundColor: "#FF8D68",
    width: 111,
    height: 167,
    borderRadius: 15,
    marginRight: 10,
    alignItems: "center",
  },
  cardView3: {
    backgroundColor: Colors.orange,
    width: 111,
    height: 167,
    paddingLeft: 17,
    paddingVertical: 20,
    borderRadius: 15,
    marginRight: 10,
    flexDirection: "column",
  },
  cardText: {
    fontFamily: "AktivRegular",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "left",
    color: Colors.white,
    marginTop: 60,
  },
  placesText: {
    fontFamily: "AktivRegular",
    fontSize: 11,
    fontWeight: "500",
    textAlign: "left",
    color: Colors.white,
    marginTop: 6,
  },
  cardsWrapper: {
    width: "100%",
    flexDirection: "row",
    paddingLeft: "7%",
    paddingRight: 90,
  },
});
