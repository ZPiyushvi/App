import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
// import { colors } from "../utils/colors";
// import { fonts } from "../utils/fonts";
import { useNavigation } from "@react-navigation/native";
import Colors from "../Components/Colors";

const RoleSelection = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("LOGIN");
  };

  const handleSignup = () => {
    navigation.navigate("SIGNUP");
  };
  
  return (
    <View style={styles.container}>
      {/* <Image source={require("../assets/logo.png")} style={styles.logo} /> */}
      {/* <Image source={require("../assets/man.png")} style={styles.bannerImage} /> */}
      <Text style={styles.title}>Lorem ipsum dolor.</Text>
      <Text style={styles.subTitle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.loginButtonWrapper,
            { backgroundColor: Colors.dark.colors.secComponentColor },
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginButtonWrapper]}
          onPress={handleSignup}
        >
          <Text style={styles.signupButtonText}>Sign-up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RoleSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.colors.backGroundColor,
    alignItems: "center",
  },
  logo: {
    height: 40,
    width: 140,
    marginVertical: 30,
  },
  bannerImage: {
    marginVertical: 20,
    height: 250,
    width: 231,
  },
  title: {
    fontSize: 40,
    // fontFamily: f onts.SemiBold,
    paddingHorizontal: 20,
    textAlign: "center",
    color: Colors.dark.colors.mainTextColor,
    marginTop: 40,
  },
  subTitle: {
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: "center",
    color: Colors.dark.colors.secComponentColor,
    // fontFamily: fonts.Med ium,
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: Colors.dark.colors.componentColor,
    width: "80%",
    height: 60,
    borderRadius: 100,
  },
  loginButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    borderRadius: 98,
  },
  loginButtonText: {
    color: Colors.dark.colors.componentColor,
    fontSize: 18,
    // fontFamily: fonts.SemiBold,
  },
  signupButtonText: {
    fontSize: 18,
    // fontFamily: fonts.SemiBold,
  },
});