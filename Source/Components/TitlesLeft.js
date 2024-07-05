import { View, Text } from 'react-native'
import React from 'react'
import Colors from './Colors'

export default function TitlesLeft({title, height, color}) {
  return (
    <View className=' flex-row items-center justify-center w-full relative pt-3'>
            <Text className=' uppercase text-base font-medium pr-3 tracking-[3]' style={{color: color}}>{title}</Text>
            <View style={{height: height, backgroundColor: color, flex: 1}} />
        </View>
  )
}