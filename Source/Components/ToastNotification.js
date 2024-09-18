import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
// import,{ FadeInUp, FadeOutUp } from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialIcons"
import Colors from "./Colors";

const ToastNotification = ({title, description, showToast}) => {
    const slideAnim = useRef(new Animated.Value(-100)).current; // Initial value for the animation

    useEffect(() => {
        if (showToast) {
            // Define the slide-in animation
            const slideIn = Animated.timing(
                slideAnim,
                {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true, // Enable native driver for better performance
                }
            );

            // Define a delay
            const delay = Animated.delay(2000); // 3 seconds delay

            // Define the slide-out animation
            const slideOut = Animated.timing(
                slideAnim,
                {
                    toValue: -100,
                    duration: 250,
                    useNativeDriver: true,
                }
            );

            // Sequence the animations
            Animated.sequence([slideIn, delay, slideOut]).start();
        }
    }, [showToast]);

    return(
        <Animated.View
            // entering={FadeInUp}
            // exiting={FadeOutUp}
            style={{
                transform: [{ translateY: slideAnim }],
                top: 30,
                left: '5%',
                backgroundColor: Colors.dark.colors.diffrentColorOrange,
                width: '90%',
                position: 'absolute',
                borderRadius: 5,
                padding: 20,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                shadowColor: '#003049',
                shadowOpacity: 0.4,
                shadowRadius: 2,
                shadowOffset: {width: 0, height: 1},
                elevation: 2,
            }}
        >
            <Icon name="info" size={30} color="#F6F4F4" />
            <View>
                <Text style={{
                    color: '#F6F4F4',
                    fontWeight: 'bold',
                    marginLeft: 10,
                    fontSize: 16,
                }}>{title}</Text>
                <Text style={{
                    color: '#F6F4F4',
                    fontWeight: '500',
                    marginLeft: 10,
                    fontSize: 14,
                }}>{description}</Text>
            </View>
        </Animated.View>
    )
}

export default ToastNotification;