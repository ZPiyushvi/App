import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from './Colors';

const RenderStatusContent = ({ item, selected, setSelected }) => (
    <TouchableOpacity
        onPress={() => setSelected(item.status)}
        className="rounded-lg items-center px-3 py-4 mb-3 overflow-hidden flex-row"
        style={{ backgroundColor: selected === item.name ? Colors.dark.colors.textColor : Colors.dark.colors.secComponentColor }}
    >
        <Ionicons name={selected === item.name ? 'radio-button-on-outline' : 'radio-button-off-outline'} size={20} color={selected === item.name ? Colors.dark.colors.backGroundColor : Colors.dark.colors.mainTextColor} />
        <Text className="font-black text-xl" style={{ color: selected === item.name ? Colors.dark.colors.backGroundColor : Colors.dark.colors.mainTextColor }}>
            {` ${item.status}`}
        </Text>
    </TouchableOpacity>
);

export default RenderStatusContent;