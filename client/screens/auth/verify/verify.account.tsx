import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import Button from "@/components/button/button";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import { Toast } from "react-native-toast-notifications";

export default function VerifyAccountScreen() {
  const [code, setCode] = useState(new Array(4).fill(""));

  const inputs = useRef<any>([...Array(4)].map(() => React.createRef()));

  const handleInput = (text: any, index: any) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1].current.focus();
    }

    if (text === "" && index > 0) {
      inputs.current[index - 1].current.focus();
    }
  };

  const handleSumbit = async () => {
    const otp = code.join("");
    const activation_token = await AsyncStorage.getItem("activation_token");

    await axios
      .post(`${SERVER_URI}/activate-user`, {
        activation_token,
        activation_code: otp,
      })
      .then((res: any) => {
        Toast.show("Your account activated successfully!", {
          type: "success",
        });
        setCode(new Array(4).fill(""));
        router.push("/(routes)/login");
      })
      .catch((error) => {
        Toast.show("Your OTP is not valid or expired!", {
          type: "danger",
        });
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Verification Code</Text>
      <Text style={styles.subText}>
        We have sent the verification code to your email address
      </Text>
      <View style={styles.inputContainer}>
        {code.map((_, index) => (
          <TextInput
            key={index}
            style={styles.inputBox}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => handleInput(text, index)}
            value={code[index]}
            ref={inputs.current[index]}
            autoFocus={index === 0}
          />
        ))}
      </View>
      <View style={{ marginTop: 10 }}>
        <Button title="Submit" onPress={handleSumbit} />
      </View>
      <View style={styles.loginLink}>
        <Text style={[styles.backText, { fontFamily: "Nunito_700Bold" }]}>
          Back To?
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.loginText, { fontFamily: "Nunito_700Bold" }]}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  inputBox: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
    marginRight: 10,
    borderRadius: 10,
    fontSize: 20,
  },
  loginLink: {
    flexDirection: "row",
    marginTop: 30,
  },
  loginText: {
    color: "#3876EE",
    marginLeft: 5,
    fontSize: 16,
  },
  backText: { fontSize: 16 },
});
