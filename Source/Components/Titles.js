import { View, Text } from 'react-native'
import React from 'react'
import Colors from './Colors';

export default function Titles({title, width}) {
    return (
        <View className=' flex-row items-center justify-center w-full relative mt-5 mb-1'>
            <View style={[styles.line, {width: width}]} />
            <Text className=' uppercase text-base font-bold px-3 tracking-[4]' style={{color: Colors.dark.colors.mainTextColor}}>{title}</Text>
            <View style={[styles.line, {width: width}]} />
        </View>
    );
};

const styles = {
    line: {
        height: 3,
        backgroundColor: '#D1D5DB',
      },
}