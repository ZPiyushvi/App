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
  
  import Ionicons from "react-native-vector-icons/Ionicons";
  import { useNavigation } from "@react-navigation/native";
  import Colors from "../Components/Colors";
  
  const LoginScreen = () => {
    const navigation = useNavigation();
    const [secureEntry, setSecureEntry] = useState(true);
  
    const handleGoBack = () => {
      navigation.goBack();
    };
    const handleSignup = () => {
      navigation.navigate("LoginScreen");
    };
  
    return (
      <View className=' p-4 mt-6 h-full' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
        <TouchableOpacity className=' h-10 w-10 justify-center items-center rounded-full' style={{ backgroundColor: Colors.dark.colors.diffrentColorOrange }} onPress={handleGoBack}>
          <Ionicons
            name={"arrow-back-outline"}
            color={Colors.dark.colors.backGroundColor}
            size={22}
          />
        </TouchableOpacity>
  
        <View className=' h-full justify-center'>
          {/* <View style={styles.textContainer}> */}
          <Text className=' text-4xl font-black' style={{ color: Colors.dark.colors.mainTextColor, lineHeight: 45}}>Let's get</Text>
          <Text className=' text-4xl font-black' style={{ color: Colors.dark.colors.diffrentColorOrange, lineHeight: 45}}>started</Text>
          {/* </View> */}
          {/* form  */}
          <View className=' mt-10'>
            <View className='inputContainer flex-row items-center px-4 h-14 border-solid border-2 rounded-full' style={{ borderColor: Colors.dark.colors.secComponentColor, backgroundColor: Colors.dark.colors.componentColor }}>
              <Ionicons name={"mail-outline"} size={22} color={Colors.dark.colors.textColor} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your email"
                placeholderTextColor={Colors.dark.colors.textColor}
                keyboardType="email-address"
              />
            </View>
            <View className='inputContainer mt-5 flex-row items-center px-4 h-14 border-solid border-2 rounded-full' style={{ borderColor: Colors.dark.colors.secComponentColor, backgroundColor: Colors.dark.colors.componentColor }}>
              <Ionicons name={"phone-portrait-outline"} size={22} color={Colors.dark.colors.textColor} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your phone no"
                placeholderTextColor={Colors.dark.colors.textColor}
                // secureTextEntry={secureEntery}
                keyboardType="phone-pad"
              />
            </View>
            <View className='inputContainer mt-5 flex-row items-center px-4 h-14 border-solid border-2 rounded-full' style={{ borderColor: Colors.dark.colors.secComponentColor, backgroundColor: Colors.dark.colors.componentColor }}>
              <Ionicons name={"extension-puzzle-outline"} size={22} color={Colors.dark.colors.textColor} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your password"
                placeholderTextColor={Colors.dark.colors.textColor}
                secureTextEntry={secureEntry}
              />
              <TouchableOpacity
                onPress={() => {
                  setSecureEntry((prev) => !prev);
                }}
                style={styles.icon}
              >
                {secureEntry ? (
                  <Ionicons
                    name="eye-outline"
                    size={22}
                    color={Colors.dark.colors.textColor}
                  />
                ) : (
                  <Ionicons
                    name="eye-off-outline"
                    size={22}
                    color={Colors.dark.colors.textColor}
                  />
                )}
              </TouchableOpacity>
            </View>
            {/* <View style={styles.inputContainer}>
              <SimpleLineIcons name={"lock"} size={30} color={Colors.dark.colors.backGroundColor} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your password"
                placeholderTextColor={Colors.dark.colors.secComponentColor}
                secureTextEntry={secureEntery}
              />
              <TouchableOpacity
                onPress={() => {
                  setSecureEntery((prev) => !prev);
                }}
              >
                <SimpleLineIcons name={"eye"} size={20} color={Colors.dark.colors.backGroundColor} />
              </TouchableOpacity>
            </View> */}
            {/* <View className='inputContainer flex-row items-center p-3 px-5 border-solid border-2 rounded-full' style={{borderColor: Colors.dark.colors.secComponentColor}}>
              <Ionicons name={"mail-outline"} size={25} color={Colors.dark.colors.secComponentColor} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your email"
                placeholderTextColor={Colors.dark.colors.secComponentColor}
                keyboardType="email-address"
              />
            </View> */}
            <TouchableOpacity className='inputContainer mt-8 flex-row items-center justify-center px-4 h-14 border-solid border-2 rounded-full' style={{ borderColor: Colors.dark.colors.secComponentColor, backgroundColor: Colors.dark.colors.diffrentColorOrange }}>
              <Text className=' text-xl font-bold' style={{color: Colors.dark.colors.mainTextColor}}>Login</Text>
            </TouchableOpacity>
            <Text className=' text-base font-normal my-4 text-center' style={{color: Colors.dark.colors.textColor}}>or continue with</Text>
            <TouchableOpacity className='inputContainer flex-row items-center justify-center px-4 h-14 border-solid border-2 rounded-full' style={{ borderColor: Colors.dark.colors.secComponentColor }}>
              <Text className=' text-xl font-bold'  style={{color: Colors.dark.colors.mainTextColor}}>Google</Text>
            </TouchableOpacity>
            <View style={styles.footerContainer}>
              <Text className=' text-base font-normal' style={{color: Colors.dark.colors.textColor}}>Already have an account!</Text>
              <TouchableOpacity onPress={handleSignup}>
                <Text className=' text-base font-black' style={{color: Colors.dark.colors.mainTextColor}}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  
  export default LoginScreen;
  
  const styles = StyleSheet.create({
    textInput: {
        fontSize: 16,
        flex: 1,
        paddingHorizontal: 10,
        color: Colors.dark.colors.mainTextColor,
        // fontFamily: fonts.Light,
    },
    footerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
        gap: 5,
    },
  });