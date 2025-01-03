import { View, Text, ScrollView, Image, Dimensions, StatusBar } from 'react-native';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import { StyleSheet } from 'react-native';
import Colors from '../Components/Colors';
import { loadingScreenTxt } from '../Data/loadingScreenTxt';
import TextStyles from '../Style/TextStyles';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

export default function Like() {
  
  const fontstyles = TextStyles();
  return (
    <View style={{ backgroundColor: Colors.dark.colors.subbackGroundColor }} className='p-2 h-full w-full items-center justify-center'>
      <Text>This is like screen</Text>
    </View>
  );
}