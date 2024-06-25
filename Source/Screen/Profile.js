import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
// import { colors } from "../utils/colors";
// import { fonts } from "../utils/fonts";

import { useNavigation } from "@react-navigation/native";
import Colors from "../Components/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSignup = () => {
    AsyncStorage.setItem('token', "");
    AsyncStorage.setItem('isLoggedIn', "");
    // navigation.navigate("StaterScreen");
    navigation.navigate("LoginScreen");
  };

  return (
    <View className=' p-4 mt-6 h-full' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
      <TouchableOpacity className='inputContainer flex-row items-center justify-center px-4 h-14 border-solid border-2 rounded-full'
        style={{ borderColor: Colors.dark.colors.secComponentColor, backgroundColor: Colors.dark.colors.diffrentColorOrange }}
        onPress={handleSignup}
      >
        <Text className=' text-lg font-black' style={{ color: Colors.dark.colors.mainTextColor }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;