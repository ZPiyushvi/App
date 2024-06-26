import React, { useRef } from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    StyleSheet,
    View,
    ImageBackground,
    Animated,
    useWindowDimensions,
} from 'react-native';

const images = new Array(6).fill(
    'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
);

const App = ({ flatListRef, data, viewabilityConfig }) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const { width: windowWidth } = useWindowDimensions();

    return (
        <SafeAreaView style={styles.container}>
            <View className=' p-2 mt-5' style={styles.scrollContainer}>
                <ScrollView
                    horizontal={true}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event([
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: scrollX,
                                },
                            },
                        },
                    ])}
                    scrollEventThrottle={1}>
                    {data.map((item, imageIndex) => {
                        return (
                            <View className=' self-center' style={{ width: 300 }} key={imageIndex}>
                                <ImageBackground
                                    source={{
                                        uri: item.image,
                                        method: 'POST',
                                        headers: {
                                            Pragma: 'no-cache',
                                        },
                                    }}
                                    style={styles.card}
                                    >
                                    <View style={styles.textContainer}>
                                        <Text style={styles.infoText}>
                                            {'Image - ' + imageIndex}
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        );
                    })}
                </ScrollView>

                <View className='mt-2' style={styles.indicatorContainer}>
                    {data.map((item, imageIndex) => {
                        const width = scrollX.interpolate({
                            inputRange: [
                                windowWidth * (imageIndex - 1),
                                windowWidth * imageIndex,
                                windowWidth * (imageIndex + 1),
                            ],
                            outputRange: [8, 16, 8],
                            extrapolate: 'clamp',
                        });
                        return (
                            <Animated.View
                                key={imageIndex}
                                style={[styles.normalDot, { width }]}
                            />
                        );
                    })}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        marginVertical: 4,
        marginHorizontal: 7,
        borderRadius: 5,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        backgroundColor: 'rgba(0,0,0, 0.7)',
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 5,
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: 'silver',
        marginHorizontal: 4,
    },
    indicatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;