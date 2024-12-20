import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { API_BASE_URL, VERIFYOTP_ENDPOINT, RESENDOTP_ENDPOINT } from '../Constants/Constants';
import { useNavigation } from '@react-navigation/native';
import Colors from '../Components/Colors';
import TextStyles from '../Style/TextStyles';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import { Ionicons } from '@expo/vector-icons';

const OtpScreen = ({ route }) => {
    const navigation = useNavigation();
    const { contactinfo } = route.params;
    const [otp, setOtp] = useState('');
    const [resendDisabled, setResendDisabled] = useState(false); // State to control resend button

    // Timer for resend functionality (optional)
    const [resendTimer, setResendTimer] = useState(null);

    const { fontFamilies } = useContext(GlobalStateContext);

    if (!fontFamilies) {
        return null;
    }

    const fontstyles = TextStyles();

    useEffect(() => {
        // Optional: Set a timer for resend functionality (e.g., 30 seconds)
        const timer = setTimeout(() => setResendDisabled(false), 30 * 1000); // 30 seconds
        setResendTimer(timer);

        return () => clearTimeout(timer); // Cleanup function to clear timer on unmount
    }, []);

    const handleVerifyOtp = () => {
        fetch(`${API_BASE_URL}:${VERIFYOTP_ENDPOINT}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ contactinfo, otp })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "ok") {
                    Alert.alert("Registration Successful");
                    navigation.navigate("LoginScreen");
                } else {
                    Alert.alert(data.data);
                }
            })
            .catch(error => console.error("Error:", error));
    };

    const handleResendOtp = async () => {
        setResendDisabled(true); // Disable resend button temporarily

        // Make API call to resend OTP (replace with your actual API call)
        fetch(`${API_BASE_URL}:${RESENDOTP_ENDPOINT}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ contactinfo })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "ok") {
                    Alert.alert("OTP resent successfully!");
                } else {
                    Alert.alert(data.data);
                    setResendDisabled(false); // Re-enable button if resend fails
                }
            })
            .catch(error => console.error("Error:", error));
    };

    function maskEmail(email) {
        const [localPart, domainPart] = email.split("@");
        const maskedLocal = localPart.slice(0, -4) + "*".repeat(4);
        const maskedDomain = domainPart.slice(0, -3) + "*".repeat(3);
        return `${maskedLocal}@${maskedDomain}`;
    }

    return (
        <View className='p-4 pt-8 h-full' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
            <StatusBar backgroundColor={Colors.dark.colors.backGroundColor} />

            <View className=' h-full justify-center'>
                {/* <View style={styles.textContainer}> */}

                <Text className=' text-center' style={[fontstyles.h1, { color: Colors.dark.colors.diffrentColorOrange, lineHeight: 105 }]}>Otp Verification</Text>
                <Text className=' text-center' style={[fontstyles.entryUpper, { color: Colors.dark.colors.mainTextColor, lineHeight: 25, textTransform: 'none' }]}>We sent your code to</Text>
                <Text className=' text-center' style={[fontstyles.entryUpper, { color: Colors.dark.colors.mainTextColor, lineHeight: 25, textTransform: 'none' }]}>{maskEmail(contactinfo)}</Text>
                {/* <Text className=' text-center' style={[fontstyles.entryUpper, { color: Colors.dark.colors.mainTextColor, lineHeight: 45 }]}>code will expire on {resendDisabled ? `(in ${Math.ceil((30 - (Date.now() - resendTimer) / 1000))})` : ''}</Text> */}
                <View className=' mt-10'>
                    <View className='inputContainer mt-5 flex-row items-center px-4 h-14 border-solid border-2 rounded-full' style={{ borderColor: Colors.dark.colors.secComponentColor, backgroundColor: Colors.dark.colors.componentColor }}>
                        {/* <Ionicons name={password.length > 1 ? "extension-puzzle" : "extension-puzzle-outline"} size={22} color={password.length > 1 ? Colors.dark.colors.diffrentColorGreen : Colors.dark.colors.textColor} /> */}

                        <TextInput
                            value={otp}
                            placeholderTextColor={Colors.dark.colors.textColor}
                            onChangeText={setOtp}
                            placeholder="Enter OTP"
                            keyboardType="numeric"
                            style={styles.textInput}
                        />
                    </View>

                    <TouchableOpacity onPress={handleVerifyOtp} className='inputContainer mt-8 flex-row items-center justify-center px-4 h-14 border-solid border-2 rounded-full' style={{ borderColor: Colors.dark.colors.secComponentColor, backgroundColor: Colors.dark.colors.diffrentColorOrange }}>
                        <Text style={[fontstyles.boldh2, { color: Colors.dark.colors.mainTextColor }]}>Verify OTP</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleResendOtp}>
                        <Text className='mb-8 text-right mt-4' style={[fontstyles.h5, { color: Colors.dark.colors.mainTextColor }]}>Resend OTP</Text>
                    </TouchableOpacity>
                    {/* {console.log(userRole)} */}
                </View>
            </View>
        </View>
    );
};

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

export default OtpScreen;