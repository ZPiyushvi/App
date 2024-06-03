import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from './Colors';

const ScrollViewer = ({ data, currentIndex }) => {
    return (
        <View style={styles.scrollViewerContainer}>
            {data.map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.scrollViewerIdentifier,
                        currentIndex === index && styles.scrollViewerIdentifierActive
                    ]}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    scrollViewerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // Add any other styling you need for the container
    },
    scrollViewerIdentifier: {
        height: 6,
        width: 6,
        borderRadius: 99,
        backgroundColor: Colors.dark.colors.primaryColor_Background1,
        margin: 2, // Adjust spacing between indicators as needed
    },
    scrollViewerIdentifierActive: {
        backgroundColor: Colors.dark.colors.primaryColor_Background10,
    },
});

export default ScrollViewer;
