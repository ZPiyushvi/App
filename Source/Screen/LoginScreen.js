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
  const [username, setusername] = useState('');
  const [name_verify, setname_verify] = useState(null);
  const [phone, setphone] = useState('');
  const [phone_verify, setphone_verify] = useState(null);
  const [password, setpassword] = useState('');
  const [email_verify, setemail_verify] = useState(null);
  const [email, setemail] = useState('');
  const [password_verify, setpassword_verify] = useState(null);

  function handle_name(input) {
    const usernameVar = input.nativeEvent.text;
    setusername(usernameVar);
    setname_verify(false);
    if (usernameVar.length >= 3) {
      console.log("more >3")
      setusername(usernameVar);
      setname_verify(true);
    }
  }

  function handle_phone(input) {
    const phoneVar = input.nativeEvent.text;
    setphone(phoneVar);
    setphone_verify(false);
    if (/[6-9]{1}[0-9]{9}/.test(phoneVar)) {
      setphone(phoneVar);
      setphone_verify(true);
    }
  }

  function handle_email(input) {
    const emailVar = input.nativeEvent.text;
    setemail(phoneVar);
    setemail_verify(false);
    if (/[6-9]{1}[0-9]{9}/.test(emailVar)) {
      setemail(phoneVar);
      setemail_verify(true);
    }
  }

  function handle_password(input) {
    const passwordVar = input.nativeEvent.text;
    setpassword(passwordVar);
    setpassword_verify(false);
    if (/(?=.*\d.*\d.*\d)(?=.*[^a-zA-Z0-9]).{8,}/.test(passwordVar)) {
      setpassword(passwordVar);
      setpassword_verify(true);
    }
  }

  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const [EmailPhone, setEmailPhone] = useState(true);

  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleSignup = () => {
    navigation.navigate("SignupScreen");
  };

  return (
    <View className='p-4 pt-8 h-full' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
      {/* <TouchableOpacity className=' h-10 w-10 justify-center items-center rounded-full' style={{ backgroundColor: Colors.dark.colors.diffrentColorOrange }} onPress={handleGoBack}>
        <Ionicons
          name={"arrow-back-outline"}
          color={Colors.dark.colors.backGroundColor}
          size={22}
        />
      </TouchableOpacity> */}

      <View className=' h-full justify-center'>
        {/* <View style={styles.textContainer}> */}
        <Text className=' text-4xl font-black' style={{ color: Colors.dark.colors.mainTextColor, lineHeight: 45 }}>Let's get</Text>
        <Text className=' text-4xl font-black' style={{ color: Colors.dark.colors.diffrentColorOrange, lineHeight: 45 }}>started</Text>
        {/* </View> */}
        {/* form  */}
        <View className=' mt-10'>

          <View className='inputContainer mt-5 flex-row items-center px-4 h-14 border-solid border-2 rounded-full' style={{ borderColor: Colors.dark.colors.secComponentColor, backgroundColor: Colors.dark.colors.componentColor }}>
            <Ionicons name={EmailPhone ? email_verify ? "mail" : "mail-outline" : phone_verify ? "phone-portrait" : "phone-portrait-outline"} size={22} color={phone_verify ? Colors.dark.colors.diffrentColorGreen : Colors.dark.colors.textColor} />
            <TextInput
              style={styles.textInput}
              placeholder={EmailPhone ? "Enter your Email Address" : "Enter your phone no"}
              placeholderTextColor={Colors.dark.colors.textColor}
              onChange={EmailPhone ? 
                (txt) => handle_email(txt) : 
                (txt) => handle_phone(txt)}
              // secureTextEntry={secureEntery} EmailPhone
              keyboardType={EmailPhone ? "email-address" : "phone-pad"}
              maxLength={10}
            />
            <TouchableOpacity
              onPress={() => {
                setEmailPhone((prev) => !prev);
              }}
              style={styles.icon}
            >
              {EmailPhone ? (
                <Ionicons
                  name="swap-vertical-outline"
                  size={22}
                  color={Colors.dark.colors.textColor}
                />
              ) : (
                <Ionicons
                  style={{ transform: [{ scaleX: -1 }] }}
                  name="swap-vertical-outline"
                  size={22}
                  color={Colors.dark.colors.textColor}
                />
              )}
            </TouchableOpacity>
            {EmailPhone ? email_verify ? null : <Text className='absolute top-0' style={styles.textInputSub}>Email address must be a valid</Text>
            :
            phone_verify ? null : <Text className='absolute top-0' style={styles.textInputSub}>Phone number must be 10 digits.</Text>}
          </View>

          <View className='inputContainer mt-5 flex-row items-center px-4 h-14 border-solid border-2 rounded-full' style={{ borderColor: Colors.dark.colors.secComponentColor, backgroundColor: Colors.dark.colors.componentColor }}>
            <Ionicons name={password_verify ? "extension-puzzle" : "extension-puzzle-outline"} size={22} color={password_verify ? Colors.dark.colors.diffrentColorGreen : Colors.dark.colors.textColor} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your password"
              placeholderTextColor={Colors.dark.colors.textColor}
              secureTextEntry={secureEntry}
              onChange={txt => handle_password(txt)}
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
            {password_verify ? null : <Text className='absolute top-0' style={styles.textInputSub}>Minimum 8 chars, 3 letters, 1 symbol.</Text>}
          </View>

          <TouchableOpacity>
<Text className='text-base font-normal mb-10 text-right mt-4' style={{ color: Colors.dark.colors.mainTextColor }}>Forgot Password?</Text>
</TouchableOpacity>

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
            <Text className=' text-xl font-bold' style={{ color: Colors.dark.colors.mainTextColor }}>Login</Text>
          </TouchableOpacity>
          <Text className=' text-base font-normal my-4 text-center' style={{ color: Colors.dark.colors.textColor }}>or continue with</Text>
          <TouchableOpacity className='inputContainer flex-row items-center justify-center px-4 h-14 border-solid border-2 rounded-full' style={{ borderColor: Colors.dark.colors.secComponentColor }}>
            <Ionicons
              name={"logo-google"}
              color={Colors.dark.colors.mainTextColor}
              size={20}
            />
            <Text className=' text-xl font-bold' style={{ color: Colors.dark.colors.mainTextColor }}>  Google</Text>
          </TouchableOpacity>
          <View style={styles.footerContainer}>
            <Text className=' text-base font-normal' style={{ color: Colors.dark.colors.textColor }}>Don’t have an account?</Text>
            <TouchableOpacity onPress={handleSignup}>
              <Text className=' text-base font-black' style={{ color: Colors.dark.colors.mainTextColor }}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  textInputSub: {
    marginTop: -10,
    marginLeft: 20,
    fontSize: 14,
    fontWeight: 900,
    // padding: 1,
    // backGroundColor: Colors.dark.colors.diffrentColorOrange,
    color: Colors.dark.colors.diffrentColorOrange,
    // fontFamily: fonts.Light,
  },
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