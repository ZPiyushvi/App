import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from './Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Error({ heading, content }) {
    const navigation = useNavigation();

    const handleLogOff = async (screen) => {
        try {
            await AsyncStorage.clear();
            navigation.navigate(screen)
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    };

    return (
        <View className='justify-center w-full h-full p-3' style={{ backgroundColor: Colors.dark.colors.diffrentColorPerple }}>
            <Ionicons name="sad" size={54} color={Colors.dark.colors.mainTextColor} />
            <Text className='font-black text-2xl my-3' style={{ color: Colors.dark.colors.mainTextColor }}>
                {heading ? heading : 'Oops! Something Went Wrong'}
            </Text>
            <Text className='font-semibold text-base mb-3' style={{ color: Colors.dark.colors.mainTextColor }}>
                {content ? content : `We’re sorry for the inconvenience. It looks like we’re experiencing a temporary issue. Our team is working hard to fix it.
            \nIn the meantime, please be patient and try again later. If you’d like, you can log out and re-login to refresh your session.
            \nThank you for your understanding!`}
            </Text>
            <View className='mb-8'>
                <TouchableOpacity className=' absolute py-2 px-6 rounded-md' style={{ backgroundColor: Colors.dark.colors.backGroundColor }} onPress={() => handleLogOff('LoginNavigationStack')}>
                    <Text className='font-semibold text-xl' style={{ color: Colors.dark.colors.mainTextColor }}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}