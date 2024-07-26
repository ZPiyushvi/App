import { View, Text, ScrollView, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalStateContext } from '../Context/GlobalStateContext';
import { StyleSheet } from 'react-native';
import Colors from '../Components/Colors';
import { loadingScreenTxt } from '../Data/loadingScreenTxt';
import TextStyles from '../Style/TextStyles';

export default function Like() {

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
    <View style={{ backgroundColor: Colors.dark.colors.subbackGroundColor }} className=' p-2 h-full w-full items-center justify-center'>
      {/* <View style={{ backgroundColor: Colors.dark.colors.subbackGroundColor }} className='items-center justify-center w-72 h-72 rounded-full'> */}
        <View style={{ backgroundColor: Colors.dark.colors.componentColor }} className=' items-center justify-center w-64 h-64 rounded-full'>
          <View style={{ backgroundColor: Colors.dark.colors.secComponentColor }} className='w-44 h-44 items-center justify-center rounded-full'>
            <Image
              source={require("./../../assets/store.jpg")}
              className='w-28 h-28 rounded-full'
              alt="Logo"
            />
          </View>
        </View>
      {/* </View> */}

      <Text className='text-center pt-3' style={[fontstyles.h1, { color: Colors.dark.colors.mainTextColor }]}>Namaskar !!!</Text>
      <Text className='text-center' style={[fontstyles.h4, { color: Colors.dark.colors.textColor }]}>{loadingMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
  },
});