import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Make sure to install this package if you haven't already
import Colors from "../Components/Colors";
import TextStyles from '../Style/TextStyles';

export default function YettoUpdate() {
  const fontstyles = TextStyles();

  return (
    <View className=' flex-1 justify-center items-center p-2' style={{backgroundColor: Colors.dark.colors.backGroundColor}}>
      {/* <MaterialIcons name="construction" size={64} color="gray" /> */}
      
      <Ionicons name={'paw'} size={42} color={Colors.dark.colors.mainTextColor} />
      <Text className='text-center py-3' style={[fontstyles.blackh2, {color: Colors.dark.colors.mainTextColor}]}>We're Working on It!</Text>
      <Text className='text-center' style={[fontstyles.h4, {color: Colors.dark.colors.textColor}]}>
        This section is under development. We're working hard to bring you new features. Stay tuned!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
});
