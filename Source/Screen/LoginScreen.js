import {
  Alert,
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";

// import { colors } from "../utils/colors";
// import { fonts } from "../utils/fonts";
import { LinearGradient } from 'expo-linear-gradient';

import Ionicons from "react-native-vector-icons/Ionicons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Colors from "../Components/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL, LOGIN_ENDPOINT } from "../Constants/Constants";
import { GlobalStateContext } from "../Context/GlobalStateContext";

const LoginScreen = () => {

  // 192.168.110.12
  const { userRole, setUserRole } = useContext(GlobalStateContext);

  function handleLogin() {
    const userData = {
      // name: username,
      contactinfo: contactinfo,
      // email: email,
      // mobile: phone,
      password: password,
      role: userRole,
    };

    // if (name_verify && email_verify && password_verify) {

    // "http://192.168.110.12:5001/login"
    fetch(`${API_BASE_URL}:${LOGIN_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status === "ok") {
          Alert.alert("Logged In Successful");
          AsyncStorage.setItem('token', data.data);
          AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
          userRole == 'Seller' ? navigation.navigate("BuyerNavigationStack") : navigation.navigate("BuyerNavigationStack")
        } else {
          Alert.alert(data.data || "Login failed");
        }
      })
      .catch(error => console.log("err", error));
    // } else {
    //   Alert.alert("Fill Required Details");
    // }
  }

  // const [username, setusername] = useState('');
  // const [name_verify, setname_verify] = useState(null);
  const [password, setpassword] = useState('');
  // const [password_verify, setpassword_verify] = useState(null);
  const [contactinfo, setcontactinfo] = useState('');
  // const [contactinfo_verify, setcontactinfo_verify] = useState(null);

  // function handle_contactinfophone(input) {
  //   const phoneVar = input.nativeEvent.text;
  //   setcontactinfo(phoneVar);
  //   setcontactinfo_verify(false);
  //   if (/[6-9]{1}[0-9]{9}/.test(phoneVar)) {
  //     setcontactinfo(phoneVar);
  //     setcontactinfo_verify(true);
  //   }
  // }

  // function handle_contactinfoemail(input) {
  //   const emailVar = input.nativeEvent.text;
  //   setcontactinfo(emailVar);
  //   setcontactinfo_verify(false);
  //   if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVar)) {
  //     setcontactinfo(emailVar);
  //     setcontactinfo_verify(true);
  //   }
  // }

  // function handle_name(input) {
  //   const usernameVar = input.nativeEvent.text;
  //   setusername(usernameVar);
  //   setname_verify(false);
  //   if (usernameVar.length >= 3) {
  //     console.log("more >3")
  //     setusername(usernameVar);
  //     setname_verify(true);
  //   }
  // }

  // function handle_password(input) {
  //   const passwordVar = input.nativeEvent.text;
  //   setpassword(passwordVar);
  //   setpassword_verify(false);
  //   if (/(?=.*\d.*\d.*\d)(?=.*[^a-zA-Z0-9]).{8,}/.test(passwordVar)) {
  //     setpassword(passwordVar);
  //     setpassword_verify(true);
  //   }
  // }

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
          {/* <View className='inputContainer flex-row items-center px-4 h-14 border-solid border-2 rounded-full' style={{ borderColor: Colors.dark.colors.secComponentColor, backgroundColor: Colors.dark.colors.componentColor }}>
            <Ionicons name={name_verify ? "person" : "person-outline"} size={22} color={name_verify ? Colors.dark.colors.diffrentColorGreen : Colors.dark.colors.textColor} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your name"
              placeholderTextColor={Colors.dark.colors.textColor}
              // keyboardType="email-address"
              onChange={txt => handle_name(txt)}
            />
          </View>
          {name_verify ? null : <Text className='absolute top-0' style={[styles.textInputSub, { marginTop: -9 }]}>Name must be 3+ characters.</Text>} */}
          <View className='inputContainer mt-5 flex-row items-center px-4 h-14 border-solid border-2 rounded-full' style={{ borderColor: Colors.dark.colors.secComponentColor, backgroundColor: Colors.dark.colors.componentColor }}>
            <Ionicons name={EmailPhone ? contactinfo.length > 1 ? "mail" : "mail-outline" : contactinfo.length ? "phone-portrait" : "phone-portrait-outline"} size={22} color={contactinfo.length ? Colors.dark.colors.diffrentColorGreen : Colors.dark.colors.textColor} />
            <TextInput
              style={styles.textInput}
              placeholder={EmailPhone ? "Enter your Email Address" : "Enter your phone no"}
              placeholderTextColor={Colors.dark.colors.textColor}
              onChange={
                (txt) => setcontactinfo(txt.nativeEvent.text)
                // (txt) => handle_contactinfophone(txt)
              }
              keyboardType={EmailPhone ? "email-address" : "phone-pad"}
              maxLength={EmailPhone ? null : 10}
            />
            <TouchableOpacity
              onPress={() => {
                setEmailPhone((prev) => !prev);
                // console.log(contactinfo)
                // setcontactinfo_verify(false)
                setcontactinfo('')
                // console.log(contactinfo)
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
            {/* {EmailPhone ? <Text className='absolute top-0' style={styles.textInputSub}>Email address must be a valid</Text>
              :
              contactinfo_verify ? null : <Text className='absolute top-0' style={styles.textInputSub}>Phone number must be 10 digits.</Text>} */}
          </View>

          <View className='inputContainer mt-5 flex-row items-center px-4 h-14 border-solid border-2 rounded-full' style={{ borderColor: Colors.dark.colors.secComponentColor, backgroundColor: Colors.dark.colors.componentColor }}>
            <Ionicons name={password.length > 1 ? "extension-puzzle" : "extension-puzzle-outline"} size={22} color={password.length > 1 ? Colors.dark.colors.diffrentColorGreen : Colors.dark.colors.textColor} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your password"
              placeholderTextColor={Colors.dark.colors.textColor}
              secureTextEntry={secureEntry}
              onChange={txt => setpassword(txt.nativeEvent.text)}
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
            {/* {password_verify ? null :
              //   <LinearGradient
              //   className=' absolute top-0'
              //   colors={[Colors.dark.colors.componentColor, Colors.dark.colors.backGroundColor]}
              //   // start={{ x: 0, y: 0 }}
              //   // end={{ x: 1, y: 0 }}
              //   style={styles.textInputSub}
              // >
              <Text className='absolute top-0' style={styles.textInputSub}>Minimum 8 chars, 3 letters, 1 symbol.</Text>
              // </LinearGradient>
            } */}
          </View>

          <TouchableOpacity>
            <Text className='text-base font-normal mb-8 text-right mt-4' style={{ color: Colors.dark.colors.mainTextColor }}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleLogin()} className='inputContainer mt-8 flex-row items-center justify-center px-4 h-14 border-solid border-2 rounded-full' style={{ borderColor: Colors.dark.colors.secComponentColor, backgroundColor: Colors.dark.colors.diffrentColorOrange }}>
            <Text className=' text-xl font-bold' style={{ color: Colors.dark.colors.mainTextColor }}>Login</Text>
          </TouchableOpacity>
          <Text className=' text-base font-normal my-4 text-center' style={{ color: Colors.dark.colors.textColor }}>or continue with</Text>
          {console.log(userRole)}
          <TouchableOpacity className='inputContainer flex-row items-center justify-center px-4 h-14 border-solid border-2 rounded-full' style={{ borderColor: Colors.dark.colors.secComponentColor }}
            onPress={() => userRole == 'Seller' ? navigation.navigate("BuyerNavigationStack") : navigation.navigate("BuyerNavigationStack")}
          >
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
    // backgroundColor: Colors.dark.colors.componentColor,
    // backgroundColor: Colors.dark.colors.backGroundColor,
    marginTop: -10,
    marginLeft: 20,
    fontSize: 14,
    fontWeight: 900,
    paddingHorizontal: 7,
    color: Colors.dark.colors.diffrentColorOrange,
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