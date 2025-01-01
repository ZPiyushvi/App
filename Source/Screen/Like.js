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
  const circleTop = useSharedValue(0);
  const circleBottom = useSharedValue(0);

  useFocusEffect(
    useCallback(() => {
      // Reset animation values
      circleTop.value = 0;
      circleBottom.value = 0;

      // Trigger animations
      setTimeout(() => circleTop.value = withSpring(circleTop.value + 47), 100);
      setTimeout(() => circleBottom.value = withSpring(circleBottom.value + 47), 300);

    }, [])
  );

  const { fontFamilies } = useContext(GlobalStateContext);
  if (!fontFamilies) {
    return null;
  }

  const [loadingMessage, setLoadingMessage] = useState('');

  useEffect(() => {
    const updateMessage = () => {
      const randomIndex = Math.floor(Math.random() * loadingScreenTxt.length);
      setLoadingMessage(loadingScreenTxt[randomIndex]);
    };
    updateMessage();
    const intervalId = setInterval(updateMessage, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const fontstyles = TextStyles();
  return (
    <View style={{ backgroundColor: Colors.dark.colors.subbackGroundColor }} className='p-2 h-full w-full items-center justify-center'>
      <Text>This is like screen</Text>
    </View>
  );
}