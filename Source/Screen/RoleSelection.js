// Seller Buyer

import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, BackHandler, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Colors from '../Components/Colors';
import { GlobalStateContext } from '../Context/GlobalStateContext';

const SelectionScreen = () => {
  const handle_hardwareBackPress = () => {
    Alert.alert(
      "Leaving Already?",
      "Are you sure you want to miss out on the tasty experience ahead?",
      [{
        text: "No, Stay",
        onPress: () => null
      }, {
        text: "Yes, Exit",
        onPress: () => BackHandler.exitApp()
      }]);
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handle_hardwareBackPress)

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handle_hardwareBackPress)
      }
    })
  );

  const { userRole, setUserRole } = useContext(GlobalStateContext);
  const navigation = useNavigation();

  const handleSelectItem = (item) => {
    setUserRole(item);
  };

  const handleNavigate = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View className='p-4 pt-8 h-full' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
      <View className=' h-full justify-center'>
        <Text className=' text-4xl font-black' style={{ color: Colors.dark.colors.mainTextColor, lineHeight: 45 }}>Why Are</Text>
        <Text className=' text-4xl font-black' style={{ color: Colors.dark.colors.diffrentColorOrange, lineHeight: 45 }}>You</Text>
        <Text className=' py-10 text-base font-normal' style={{ color: Colors.dark.colors.textColor }}>
          Please choose your role to continue and enjoy a seamless experience tailored to your needs.
        </Text>
        <View className=' mt-10'>
          <TouchableOpacity
            className='inputContainer mt-5 flex-row items-center justify-center px-4 h-14 border-solid border-2 rounded-full'
            style={{ borderColor: userRole === 'Buyer' ? Colors.dark.colors.diffrentColorOrange : Colors.dark.colors.secComponentColor, backgroundColor: userRole === 'Buyer' ? Colors.dark.colors.componentColor : Colors.dark.colors.backGroundColor }}
            onPress={() => handleSelectItem('Buyer')}
          >
            <Text className=' text-xl font-black' style={{ color: userRole === 'Buyer' ? Colors.dark.colors.mainTextColor : Colors.dark.colors.textColor }}>Buyer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className='inputContainer mt-5 flex-row items-center justify-center px-4 h-14 border-solid border-2 rounded-full'
            style={{ borderColor: userRole === 'Seller' ? Colors.dark.colors.diffrentColorOrange : Colors.dark.colors.secComponentColor, backgroundColor: userRole === 'Seller' ? Colors.dark.colors.componentColor : Colors.dark.colors.backGroundColor }}
            onPress={() => handleSelectItem('Seller')}
          >
            <Text className=' text-xl font-black' style={{ color: userRole === 'Seller' ? Colors.dark.colors.mainTextColor : Colors.dark.colors.textColor }}>Seller</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ borderColor: Colors.dark.colors.secComponentColor, backgroundColor: Colors.dark.colors.diffrentColorOrange }}
            onPress={handleNavigate}
            disabled={!userRole}
            className='inputContainer mt-8 flex-row items-center justify-center px-4 h-14 border-solid border-2 rounded-full'
          >
            <Text className=' text-xl font-bold' style={{ color: Colors.dark.colors.mainTextColor }}>Procced</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SelectionScreen;