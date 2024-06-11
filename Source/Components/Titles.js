import { View, Text } from 'react-native'
import React from 'react'

export default function Titles({title, width}) {
    return (
        <View className=' flex-row items-center justify-center w-full relative mt-9 mb-3'>
            <View style={[styles.line, {width: width}]} />
            <Text className=' uppercase text-base font-medium text-white px-3 tracking-[4]'>{title}</Text>
            <View style={[styles.line, {width: width}]} />
        </View>
    );
};

const styles = {
    line: {
        height: 1,
        backgroundColor: '#D1D5DB',
      },
}