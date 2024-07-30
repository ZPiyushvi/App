I want to create a ref here and based onwhich should be height of const BANNER_H = Dimensions.get('window').height * 0.78; so that the bottomsroll must not disturb due to this

        <Animated.ScrollView
        showsVerticalScrollIndicator={false}
          // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollA } } }],
            { useNativeDriver: true },
          )}
          scrollEventThrottle={16}
          keyboardDismissMode='on-drag'
        >
          <View className='staticContainer align-middle flex w-1/2' >
            <Animated.View style={[styles.banner(scrollA)]}>
              {/* mt-7 // marginextra */}
              <View className='searchBodyContainer flex-row justify-between' style={{ marginHorizontal: Dimensions.get('window').width * 0.03 }}>
                <TouchableOpacity activeOpacity={1} onPress={() => navToPage('SelectAddress')} className='address flex-row gap-2 items-center w-9/12'>
                  <Ionicons color={Colors.dark.colors.diffrentColorOrange} name="earth" size={24} className='searchIcon' style={{ textAlign: 'center', textAlignVertical: 'center' }} />
                  <View>
                    <View className=' flex-row'>
                      {/* {console.log(userData.name)} */}
                      <Text style={[fontstyles.blackh2, { color: Colors.dark.colors.mainTextColor }]}>{userData.name ? TruncatedTextComponent(userData.name, 21) : "UserName"} </Text>
                      <Ionicons color={Colors.dark.colors.mainTextColor} name="chevron-down" size={24} style={{ textAlign: 'center', textAlignVertical: 'center' }} />
                    </View>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={[fontstyles.h4, { color: Colors.dark.colors.textColor }]}>{userData.name ? 'you are a ' + userData.role : "UserRole"}</Text>
                  </View>
                </TouchableOpacity>
                <View className='address flex-row gap-2 items-center'>
                  <TouchableOpacity style={{ backgroundColor: Colors.dark.colors.secComponentColor, borderRadius: 10, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons onPress={() => { settype('lang'), show() }} color={Colors.dark.colors.textColor} name="language" size={24} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ backgroundColor: Colors.dark.colors.mainTextColor, borderRadius: 10, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons color={Colors.dark.colors.diffrentColorPerple} activeOpacity={1} onPress={() => navigation.navigate('Profile', { userData })} name="person" size={24} />
                  </TouchableOpacity>
                </View>
              </View>

              <View className='pt-7 px-4'>
                {/* TextStyles.TextStyles.h1,  */}
                <Text style={[fontstyles.entryUpper, { color: Colors.dark.colors.mainTextColor }]}>Discover the </Text>
                <View className='flex-row'>
                  <Text style={[fontstyles.h1, { color: Colors.dark.colors.diffrentColorOrange }]}>Best Meal </Text>
                  <Text style={[fontstyles.h1, { color: Colors.dark.colors.mainTextColor }]}>for you</Text>
                </View>
              </View>

              <View className='searchBodyContainer mt-5 flex-row justify-between' style={{ marginHorizontal: Dimensions.get('window').width * 0.03 }}>
                <TouchableOpacity className='w-[83%]' onPress={() => show_UpModelScreen()}>
                  <SearchBox />
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: Colors.dark.colors.secComponentColor, borderRadius: 15, width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('YettoUpdate')}>
                  <Ionicons color={Colors.dark.colors.diffrentColorOrange} name="mic" size={24} className='searchIcon' />
                </TouchableOpacity>
              </View>

              {/* <Popular flatListRef={flatListRef} data={featuredData} viewabilityConfig={viewabilityMenuConfig} /> */}
 
              </View>

              <View className='mx-4 pt-3 overflow-hidden' >
                <Titles title={"What’s on your heart?"} width={30} />
              </View>

            </Animated.View>
          </View>
// create here
          <View style={styles.verticalScrollContainer}>


style
banner: scrollA => ({
    height: BANNER_H,
    backGroundColor: 'red',
    width: '200%',
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H],
          outputRange: [-0, 0, BANNER_H * 0.99, -BANNER_H * 0.5], // Adjust to bring back into view
        }),
      },
      
      # IITOutlet

## Introduction

This is a React Native application developed using Expo. This guide will help you set up the project, run it on your local machine, and build the app for production.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm or yarn
- Expo CLI
- EAS CLI (Expo Application Services CLI)

## Getting Started

### 1. Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

Install the necessary dependencies using npm or yarn:

```bash
# Using npm
npm install

# Using yarn
yarn install
```

### 3. Start the Development Server

Start the development server using Expo CLI:

```bash
npx expo start
```

## Building the App

### Using EAS (Expo Application Services)

#### 1. Install the latest EAS CLI

To install the EAS CLI, use the following commands:

```bash
# Using npm
npm install -g expo-cli
npm install -g eas-cli

# Using yarn (for macOS)
yarn global add eas-cli
```

#### 2. Log in to your Expo account

Log in to your Expo account with the following command:

```bash
eas login
```

You can verify your login status with:

```bash
eas whoami
```

#### 3. Configure the Project

Configure your project for building with EAS:

```bash
eas build:configure
```

#### 4. Create APK for Android

To build an APK for Android, use the following command:

```bash
eas build --platform android --profile preview
```

### Building Locally

If you want to build the app locally, follow these steps:

#### 1. Clean the Project Directory

Navigate to the `android` directory and clean the project:

```bash
cd android && ./gradlew clean
```

#### 2a. Create APK File

To create an Android App Bundle (APK) file, run the following command in the root directory of your project:

```bash
cd android && ./gradlew assembleRelease
```

If already in android folder
```bash
./gradlew assembleRelease
```

#### 2b. Create AAB File

To create an Android App Bundle (AAB) file, run the following command in the root directory of your project:

```bash
npx react-native build-android --mode=release
```

## Conclusion

You are now ready to develop and build your Expo React Native app. If you encounter any issues, please refer to the [Expo documentation](https://docs.expo.dev/) or open an issue on this repository.