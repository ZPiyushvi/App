import { View, Text, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../Components/Colors';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import TextStyles from '../Style/TextStyles';
import FoodIcon from '../Components/FoodIcon';
import FoodTypeIcon from '../Components/FoodTypeIcon';
import { Ionicons } from '@expo/vector-icons';
import ModelScreen from './ModelScreen';

export default function Like() {
  const [likedItems, setLikedItems] = useState([]);
  const navigation = useNavigation();

  // Fetch liked items from AsyncStorage when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const fetchLikedItems = async () => {
        const likedItems = JSON.parse(await AsyncStorage.getItem('likedItems')) || [];
        setLikedItems(likedItems);
      };

      fetchLikedItems();
    }, [])
  );

  const handleItemPress = (item) => {
    console.log("Item pressed", item);
    // navigation.navigate('DetailScreen', { item });
  };

  const [liked, setLiked] = useState(false);

  const renderItem2 = ({ item, index, key }) => (
    <TouchableOpacity
      onPress={() => { navigation.navigate('DetailView', { Data: item }) }}
      key={`${index}`} className='py-3 pl-3 overflow-hidden mt-3 rounded-lg' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
      {/* {console.log(`${index}-${item.id}`)} */}
      <View className='flex-row w-full'>
        
        <View className='flex-row absolute bottom-0 right-2 h-6'>
          {/* {
            item?.type &&
            <FoodIcon key={`${item?.type}`} style={{ backgroundColor: 'black' }} type={item?.type} size={14} padding={2} />
          } */}
          {
            item?.category.split('_').map((part, index) => (
              <FoodTypeIcon key={`${index}_${part}`} type={part} size={20} padding={2} textShow={false} />
            ))
          }
        </View>

        <View className=' w-3/12'>
          <ImageBackground
            source={{
              uri: item.image,
              method: 'POST',
              headers: {
                Pragma: 'no-cache',
              },
            }}
            defaultSource={require('./../../assets/menu.jpg')}
            resizeMode="cover"
            alt="Logo"
            className='w-full h-20 border-2 rounded-lg overflow-hidden border-slate-950'
            style={{ borderWidth: 2, borderColor: Colors.dark.colors.secComponentColor }}
          />
        </View>
        <View className=' w-9/12 px-3'>
          <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.h3, { color: Colors.dark.colors.mainTextColor }]}>{item.item}</Text>
          <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.h4, { color: Colors.dark.colors.textColor }]}>{item.storename}</Text>
          {/* <Text className=' leading-3 pt-2' style={[fontstyles.h6, { color: Colors.dark.colors.textColor }]}>{item.description}</Text> */}
          <View className=' flex-row justify-between w-full'>
            <View className='flex-1 justify-end'>
              <Text style={[fontstyles.number, { color: Colors.dark.colors.mainTextColor }]}>
                ₹{item.price}
              </Text>
            </View>
          </View>
        </View>

      </View>
    </TouchableOpacity>
  );

  const fontstyles = TextStyles();
  const { show, hide, RenderModel } = ModelScreen();

  return (
    <View style={{ backgroundColor: Colors.dark.colors.subbackGroundColor, paddingHorizontal: 12, flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
        {likedItems.length > 0 ? (
          likedItems.map((item, index) => (
            renderItem2({ item: item, index: index })
          ))
        ) : (
          <Text style={{ color: Colors.dark.colors.textColor, fontSize: 18, textAlign: 'center' }}>
            You have no liked items yet.
          </Text>
        )}
      </ScrollView>

      {/* {RenderModel({ type: 'cart' })} */}
    </View>
  );
}
