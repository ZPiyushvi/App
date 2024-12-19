import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const OtpScreen = () => {
  const [otp, setOtp] = useState('');

  const handleOtpChange = (text) => {
    setOtp(text);
  };

  const handleVerifyOtp = () => {
    // Implement your OTP verification logic here
    console.log('Entered OTP:', otp);
    // Example: Send OTP to server for verification
    // ...
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        maxLength={6} // Adjust max length as needed
        onChangeText={handleOtpChange}
        value={otp}
      />
      <Button title="Verify OTP" onPress={handleVerifyOtp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default OtpScreen;