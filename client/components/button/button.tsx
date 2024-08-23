import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { commonStyles } from "@/styles/common/common.styles";

export default function Button({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  const { width } = Dimensions.get("window");

  return (
    <TouchableOpacity
      style={[
        commonStyles.buttonContainer,
        {
          width: width * 1 - 150,
          height: 40,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        },
      ]}
      onPress={() => onPress()}
    >
      <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
