import { View, Text, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { GlobalStateContext } from '../Context/GlobalStateContext';
import { StyleSheet } from 'react-native';

export default function Like() {

  const { fontFamilies } = useContext(GlobalStateContext);
  if (!fontFamilies) {
    return null;
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.text, { fontFamily: fontFamilies.Zain_black }]}>
        Zain Black
      </Text>
      <Text style={[styles.text, { fontFamily: fontFamilies.Zain_extrabold }]}>
        Zain ExtraBold
      </Text>
      <Text style={[styles.text, { fontFamily: fontFamilies.Zain_bold }]}>
        Zain Bold
      </Text>
      <Text style={[styles.text, { fontFamily: fontFamilies.Zain_regular }]}>
        Zain Regular
      </Text>
      <Text style={[styles.text, { fontFamily: fontFamilies.Zain_light }]}>
        Zain Light
      </Text>
      <Text style={[styles.text, { fontFamily: fontFamilies.Zain_extralight }]}>
        Zain ExtraLight
      </Text>
      
      


      <Text style={[styles.text, { fontFamily: fontFamilies.Nunito_black }]}>
        Nunito Black
      </Text>
      <Text style={[styles.text, { fontFamily: fontFamilies.Nunito_extrabold }]}>
        Nunito ExtraBold
      </Text>
      <Text style={[styles.text, { fontFamily: fontFamilies.Nunito_bold }]}>
        Nunito Bold
      </Text>
      <Text style={[styles.text, { fontFamily: fontFamilies.Nunito_regular }]}>
        Nunito Regular
      </Text>
      <Text style={[styles.text, { fontFamily: fontFamilies.Nunito_light }]}>
        Nunito Light
      </Text>
      <Text style={[styles.text, { fontFamily: fontFamilies.Nunito_extralight }]}>
        Nunito ExtraLight
      </Text>
    </ScrollView>
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