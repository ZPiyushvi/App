import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity, Alert } from 'react-native';
import { API_BASE_URL, VERIFYOTP_ENDPOINT } from '../Constants/Constants';
import { useNavigation } from '@react-navigation/native';

const OtpScreen = ({ route }) => {
      const navigation = useNavigation();
    const { contactinfo } = route.params;
    const [otp, setOtp] = useState('');

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

    return (
        <View>
            <Text>Enter OTP sent to {contactinfo}</Text>
            <TextInput
                value={otp}
                onChangeText={setOtp}
                placeholder="Enter OTP"
                keyboardType="numeric"
            />
            <TouchableOpacity onPress={handleVerifyOtp}>
                <Text>Verify OTP</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OtpScreen;