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
  imageVector: {
    resizeMode: "contain",
    width: 100,
    height: 100,
    alignSelf: "center",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  cardView: {
    width: 150,
    height: 160,
    borderRadius: 15,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 5,
  },

  buildingText: {
    fontFamily: "AktivRegular",
    fontSize: 15,
    fontWeight: "400",
    color: Colors.gray,
    marginTop: 6,
  },
  headingText: {
    fontFamily: "AktivRegular",
    fontSize: 20,
    fontWeight: "600",
    color: Colors.darkPrimary,
    marginTop: 100,
    margin: 17,
  },
  headingTextDark: {
    fontFamily: "AktivRegular",
    fontSize: 20,
    fontWeight: "600",
    color: Colors.white,
    marginTop: 100,
    margin: 17,
  },
});
