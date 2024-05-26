// Had Used Clerk for Login Autentication

import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../Components/Colors';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from '../hooks/useWarmUpBrowser';

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const colors = useTheme().colors;

  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View style={styles(colors).container}>
      <Image source={require("./../../assets/login2.jpg")}
        style={styles(colors).loginImage}
        alt="Logo"
      />
      <View style={styles(colors).subContainer}>
        <Text style={styles(colors).text_main}>Hungry? {'\n'} We've Got You Covered!</Text>
        <Text style={styles(colors).text_subMain}>Your go-to app for ordering from campus outlets.</Text>
        <TouchableOpacity
          style={styles(colors).bottom}
          onPress={onPress}
        >
          <Text style={styles(colors).bottomTxt}>Get It Delivered Now</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: Colors.dark.colors.backGroundColor,
    },
    loginImage: {
      marginTop: 155, // 150 //55
      height: 470,
      width: 230,
      borderWidth: 2,
      borderColor: Colors.dark.colors.fond_iconColor,
      borderRadius: 15
    },
    subContainer: {
      backgroundColor: Colors.dark.colors.primaryColor,
      height: "40%",
      width: "100%",
      bottom: 0,
      position: "absolute",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text_main: {
      textTransform: 'uppercase',
      textAlign: 'center',
      fontSize: 27,
      fontWeight: "600",
      color: Colors.dark.colors.fond_iconInsidePrimaryColor
    },
    text_subMain: {
      textAlign: 'center',
      fontSize: 22,
      color: Colors.dark.colors.fond_iconInsidePrimaryColor,
      margin: 10
    },
    bottom: {
      padding: 15,
      width: "90%",
      backgroundColor: Colors.dark.colors.fond_iconColor,
      borderRadius: 99,
      marginTop: 30
    },
    bottomTxt: {
      fontSize: 18,
      fontWeight: "600",
      textAlign: "center",
      color: Colors.dark.colors.primaryColor,
    }
  });

export default Login;