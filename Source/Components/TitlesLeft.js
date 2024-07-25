import { View, Text } from 'react-native'
import React from 'react'
import Colors from './Colors'

export default function TitlesLeft({ fontstyles, title, height, color }) {
  return (
    <View className=' flex-row items-center justify-center w-full relative pt-3'>
      <Text className=' uppercase px-3 tracking-[4]' style={[fontstyles.number, { color: Colors.dark.colors.mainTextColor }]}>{title}</Text>
      <View style={{ height: height, backgroundColor: color, flex: 1 }} />
    </View>
  )
}