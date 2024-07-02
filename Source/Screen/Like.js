import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import Colors from '../Components/Colors';
import LongStarIcon from '../Components/LongStarIcon';
import { LinearGradient } from 'expo-linear-gradient';

export default function Like() {
  const text = "Title Name Name"
  const index = text.indexOf(' ');

  var output;
  if (index !== -1) {
    const part1 = text.substring(0, index);
    const part2 = text.substring(index + 1);
    output = `${part1}\n${part2}`;

  } else {
    // If there's no space, return the original text
    output = text
  }


  return (
    <View className=' w-full h-full' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
      <View className=' h-3/5' style={{ borderBottomRightRadius: 100, backgroundColor: Colors.dark.colors.secComponentColor }} >
        <ImageBackground
          source={{
            uri: "https://www.teacupsfull.com/cdn/shop/articles/Screenshot_2023-10-20_at_11.07.13_AM.png?v=1697780292",
            method: 'POST',
            headers: {
              Pragma: 'no-cache',
            },
          }}
          alt="Logo"
          className='h-full overflow-hidden'
          style={{ borderBottomRightRadius: 100 }}
        >
        <LinearGradient
          start={{ x: 0.3, y: 0.4 }} end={{ x: 0.1, y: 1 }}
          className='overflow-hidden h-full w-full'
          colors={['transparent', Colors.dark.colors.backGroundColor]}
        ></LinearGradient>
        </ImageBackground>
        <View className='w-full absolute bottom-0 p-4'>
          <View className=' flex-row w-full'>
            <View>
              <Text className=' font-black text-4xl' style={{ color: Colors.dark.colors.mainTextColor }}>
                {output}
              </Text>
              <View className='py-4'>
                <LongStarIcon rating={3.5} ratingcount={200} gaps={20} border={0} size={20} backGround={'transparent'}/>
              </View>
            </View>
          </View>
          <View>
            <Text className=' absolute font-black text-xl py-2 px-4 rounded-xl' style={{ color: Colors.dark.colors.mainTextColor, backgroundColor: Colors.dark.colors.diffrentColorOrange }}>
              Rs 200
            </Text>
          </View>
        </View>
      </View>


      <View className='mt-5 p-4'>
        <Text className=' font-black text-3xl py-4' style={{ color: Colors.dark.colors.mainTextColor, }}>
          {text}
        </Text>
        <Text className=' font-normal text-lg' style={{ color: Colors.dark.colors.textColor, }}>
          {text}{text}{text}{text}{text}{text}
        </Text>
      </View>
    </View>
  )
}