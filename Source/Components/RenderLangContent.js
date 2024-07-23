import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from './Colors';

const LangContent = ({ item, selected, setSelected }) => (
  <TouchableOpacity
    onPress={() => setSelected(item.name)}
    className="rounded-lg h-20 items-center p-3 mb-3 overflow-hidden flex-row"
    style={{ backgroundColor: selected === item.name ? Colors.dark.colors.textColor : Colors.dark.colors.secComponentColor }}
  >
    <Ionicons name={selected === item.name ? 'radio-button-on-outline' : 'radio-button-off-outline'} size={20} color={selected === item.name ? Colors.dark.colors.backGroundColor : Colors.dark.colors.mainTextColor} />
    <Image
      source={item.image}
      className={`absolute right-0 mr-2 ${item.style}`}
      style={[{ position: 'absolute', right: 0, marginRight: 8 }, selected === item.name ? null : { tintColor: '#000000' }, item.style]}
      alt="Logo"
      defaultSource={require('./../../assets/favicon.png')}
    />
    <Text className="font-black text-xl" style={{ color: selected === item.name ? Colors.dark.colors.backGroundColor : Colors.dark.colors.mainTextColor }}>
      {` ${item.name}`}
    </Text>
  </TouchableOpacity>
);

export default LangContent;