import { StyleSheet } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#2467EC",
    width: responsiveWidth(88),
    height: responsiveWidth(2.5),
    borderRadius: 5,
    marginHorizontal: 5,
  },
  dotStyle: {
    backgroundColor: "#C6C7CC",
    width: responsiveWidth(2.5),
    height: responsiveWidth(2.5),
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDotStyle: {
    backgroundColor: "#2467Ec",
    width: responsiveWidth(2.5),
    height: responsiveWidth(2.5),
    borderRadius: 5,
    marginHorizontal: 5,
  },
  title: {
    fontSize: hp("3.5%"),
    textAlign: "center",
  },
  description: {
    fontSize: hp("2.5%"),
    color: "#575757",
    textAlign: "center",
  },
  input: {
    height: 55,
    marginHorizontal: 16,
    borderRadius: 8,
    paddingLeft: 35,
    fontSize: 16,
    backgroundColor: "white",
    color: "#A1A1A1",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    position: "absolute",
    top: 60,
  },
});
