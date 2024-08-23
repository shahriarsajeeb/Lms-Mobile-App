import { StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    height: hp("35%"),
    marginHorizontal: 16,
  },

  slide: { flex: 1 },

  background: {
    width: "100%",
    height: hp("27"),
    resizeMode: "stretch",
    zIndex: 1,
  },

  dot: {
    backgroundColor: "#C6C7CC",
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },

  activeDot: {
    backgroundColor: "#2467EC",
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },

  backgroundView: {
    position: "absolute",
    zIndex: 5,
    paddingHorizontal: 18,
    paddingVertical: 30,
    flexDirection: "row",
    alignItems: "center",
  },

  backgroundViewContainer: {
    width: responsiveWidth(45),
    height: responsiveWidth(30),
    marginTop: -50,
  },

  backgroundViewText: {
    color: "white",
    fontSize: hp("2.7%"),
  },

  backgroundViewOffer: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    marginTop: 5,
  },

  backgroundViewImage: {
    width: wp("38%"),
    height: hp("22%"),
    top: -15,
  },

  backgroundViewButtonContainer: {
    borderWidth: 1.1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    width: 109,
    height: 32,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },

  backgroundViewButtonText: {
    color: "#FFFF",
  },
});
