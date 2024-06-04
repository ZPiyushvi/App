import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Components/Colors';
import { images } from '../Data/images';
import foodTypes from '../Data/foodtype';
import { mockcampus_home_popular } from '../Data/mockcampus_home_popular';


const Profile = () => {
  return (
    <View style={styles.scrollContainer}>
      <View style={styles.scrollContainer1}>
      <View style={styles.scrollContainer12}>
        <View style={styles.scrollContainer2}>
          <View style={styles.scrollContainer3}>
            <View style={styles.scrollContainer4}>
              <View style={styles.scrollContainer5}>
                <View style={styles.scrollContainer6}>
                  <Text>Hello</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#00224D'
  },
  scrollContainer1: {
    height: '75%',
    width: '75%',
    backgroundColor: '#5D0E41'
  },
  scrollContainer12: {
    height: '75%',
    width: '75%',
    backgroundColor: '#A0153E'
  },
  scrollContainer2: {
    height: '75%',
    width: '75%',
    backgroundColor: '#C70039'
  },
  scrollContainer3: {
    height: '75%',
    width: '75%',
    backgroundColor: '#F94C10'
  },
  scrollContainer4: {
    height: '75%',
    width: '75%',
    backgroundColor: '#F8DE22'
  },
  scrollContainer5: {
    height: '75%',
    width: '75%',
    backgroundColor: '#F7F6BB'
  },
});

export default Profile;