
    

# App
npx expo start
npm error npm config set legacy-peer-deps true

# FinEdu

Fin Education Application React Code.

Creating a first build for android

1] Install the latest EAS CLI : npm install -g expo-cli // npm i eas-cli // mac : yarn global add eas-cli
2] Log in to your Expo account : eas login  // eas whoami
3] Configure the project : eas build:configure
4] Create apk : eas build --platform android --profile preview


    in local machine 

    clean the project directory :=> cd android && ./gradlew clean
    create abb file :=> npx react-native build-android --mode=release run this command in root directory 

    clean the project directory :=> cd android && ./gradlew clean
    create an apk file :=> cd android && ./gradlew assembleRelease


5] Run a build aab file : eas build --platform android

deep links 
To test deep links : npx uri-scheme open https://fili.hibudgeting.com/app/home --android
1]Home Screen : https://fili.hibudgeting.com/app/home
2]Quiz Screen : https://fili.hibudgeting.com/app/quiz
3]Video Screen : https://fili.hibudgeting.com/app/videos
4]community screen : https://fili.hibudgeting.com/app/community-screen
5]Forgot Password Verify Otp Screen :https://fili.hibudgeting.com/app/verify-otp
6]Verify otp during registration : https://fili.hibudgeting.com/app/verify-register-otp
7)Registeration Screen: https://fili.hibudgeting.com/app/registration-screen


Release App On Production 
Before Building Production Build First change Versions in the following Files 
1]Profile.js => Version : _._._
2]app.json i] "version": "_._._"
           ii] "versionCode": _
3]package.json =>  "version": "_._._"
4]Screen/Modules.js => curVersion: '_._._'
Steps 
1] Run This Command in terminal and download kea alis : npx eas credentials
2] Copy and Place the  @spgiradkar2002__fili.jks file from root directory to under the android/app directory in your project folder
3] Edit the file ~/.gradle/gradle.properties or android/gradle.properties, and add the following (replace *****    with the correct keystore password, alias and key password), 

MYAPP_UPLOAD_STORE_FILE=@spgiradkar2002__fili.jks
MYAPP_UPLOAD_KEY_ALIAS=22e761f18f423516dd9c82602b58ba33
MYAPP_UPLOAD_STORE_PASSWORD=8953decd2b788b7ab9e4e23d386c8a43
MYAPP_UPLOAD_KEY_PASSWORD=c478dcddca0a4d7917dd7329bb47e9b7

4] Edit the file android/app/build.gradle in your project folder, and add the signing config,

android {

    defaultConfig { ... }
    signingConfigs { // remove debug signing and add release 
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {  // remove debug signing and add release 
        release {
            signingConfig signingConfigs.release
        }
    }
}

5]  clean the project directory :=> cd android && ./gradlew clean
    create an apk file :=> cd android && ./gradlew assembleRelease


6]  Generating the release AAB For PlayStore
    clean the project directory :=> cd android && ./gradlew clean
    run this command in root directory 
    npx react-native build-android --mode=release 









      
      <Text style={styles.label}>Menu Type</Text>
      <View style={styles.grid}>
        {menuTypes.map(type => (
          <TouchableOpacity
            key={type}
            style={[styles.gridItem, storeDetails.menuType.includes(type) && styles.gridItemSelected]}
            onPress={() => handleMenuTypeToggle(type)}
          >
            <Text style={styles.gridItemText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* <View style={styles.container}> */}
          <Text style={styles.label}>Off Days</Text>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropdownHeader}
              onPress={toggleDropdown}
            >
              <Text style={styles.dropdownHeaderText}>
                {storeDetailsOffDays.offDays.length > 0 ? storeDetailsOffDays.offDays.map(day => weekDays.find(wd => wd.value === day).label).join(', ') : 'Select Off Days'}
              </Text>
              <Ionicons
                name={openDropdown ? "caret-up-outline" : "caret-down-outline"}
                size={20}
                color="#000"
              />
            </TouchableOpacity>
            {openDropdown && (
              <>
                <FlatList
                  data={weekDays}
                  renderItem={renderDropdownItem}
                  keyExtractor={item => item.value}
                  style={styles.dropdownList}
                />
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={toggleDropdown}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        {/* </View> */}

      <Text style={styles.label}>Opening Time</Text>
      <TouchableOpacity onPress={() => showDatePicker('openingTime')}>
        <TextInput
          style={styles.input}
          value={storeDetails.openingTime}
          editable={false}
        />
      </TouchableOpacity>

      <Text style={styles.label}>Closing Time</Text>
      <TouchableOpacity onPress={() => showDatePicker('closingTime')}>
        <TextInput
          style={styles.input}
          value={storeDetails.closingTime}
          editable={false}
        />
      </TouchableOpacity>

      <Text style={styles.label}>Leave Day</Text>
      <TouchableOpacity onPress={showDateSelector}>
        <TextInput
          style={styles.input}
          value={storeDetails.leaveDay}
          editable={false}
        />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <DateTimePickerModal
        isVisible={isDateSelectorVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDateSelector}
      />









      import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Ionicons from "react-native-vector-icons/Ionicons";
import { FlatList } from 'react-native';
import Colors from '../Components/Colors';


const menuTypes = ['Dessert', 'Beverage', 'Snack', 'Meal', 'Appetizer', 'Salad'];

const weekDays = [
    { label: 'Sunday', value: 'Sun' },
    { label: 'Monday', value: 'Mon' },
    { label: 'Tuesday', value: 'Tue' },
    { label: 'Wednesday', value: 'Wed' },
    { label: 'Thursday', value: 'Thu' },
    { label: 'Friday', value: 'Fri' },
    { label: 'Saturday', value: 'Sat' },
    { label: 'None', value: 'None' },
];

const EditStoreDetails = () => {
    const [storeDetails, setStoreDetails] = useState({
        name: 'Amul Store',
        shopkeeperName: 'Anil Mehta',
        upiId: 'amulstore@upi',
        featured: false,
        type: 'Veg',
        menuType: ['Dessert'],
        location: 'Emiet Hostel',
        locationDetailed: 'Emiet Hostel',
        rating: '4.0',
        ratingCount: '300',
        image: 'https://www.iitgn.ac.in/student/lifeoncampus/facilities/images/thumb/amulstore.jpg',
        details: 'The Amul Store at the campus is a one-stop shop for a variety of dairy products including milk, cheese, ice cream, and other popular Amul products.',
        openingTime: '10:00 am',
        closingTime: '10:00 pm',
        offDays: 'None',
        leaveDay: 'None'
    });

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [timePickerKey, setTimePickerKey] = useState(null);
    const [isDateSelectorVisible, setDateSelectorVisibility] = useState(false);

    const handleChange = (key, value) => {
        setStoreDetails(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const handleMenuTypeToggle = (type) => {
        setStoreDetails(prevState => {
            const updatedMenuType = prevState.menuType.includes(type)
                ? prevState.menuType.filter(item => item !== type)
                : [...prevState.menuType, type];
            return { ...prevState, menuType: updatedMenuType };
        });
    };

    const showDatePicker = (key) => {
        setTimePickerKey(key);
        setDatePickerVisibility(true);
    };

    const showDateSelector = () => {
        setDateSelectorVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
        setTimePickerKey(null);
    };

    const hideDateSelector = () => {
        setDateSelectorVisibility(false);
    };

    const handleConfirm = (date) => {
        const formattedTime = moment(date).format('hh:mm a');
        if (timePickerKey) {
            handleChange(timePickerKey, formattedTime);
        }
        hideDatePicker();
    };

    const handleDateConfirm = (date) => {
        const formattedDate = moment(date).format('MMMM D, YYYY');
        handleChange('leaveDay', formattedDate);
        hideDateSelector();
    };

    const [storeDetailsOffDays, setStoreDetailsOffDays] = useState({
        offDays: [],
    });
    const [openDropdown, setOpenDropdown] = useState(false);

    const toggleDropdown = () => {
        setOpenDropdown(prevState => !prevState);
    };

    const handleOffDaysToggle = (day) => {
        setStoreDetailsOffDays(prevState => {
            const updatedOffDays = prevState.offDays.includes(day)
                ? prevState.offDays.filter(item => item !== day)
                : [...prevState.offDays.filter(item => item !== 'None'), day];
            if (day === 'None') return { ...prevState, offDays: ['None'] };
            return { ...prevState, offDays: updatedOffDays };
        });
    };

    const renderDropdownItem = ({ item }) => (
        <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => handleOffDaysToggle(item.value)}
        >
            <Text style={styles.dropdownItemText}>{item.label}</Text>
            {storeDetailsOffDays.offDays.includes(item.value) && (
                <Ionicons name="checkmark-outline" size={20} color="#000" />
            )}
        </TouchableOpacity>
    );

    return (
        // <View className=' px-3 w-full justify-between' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
        // <ScrollView className='px-3 h-full w-full' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
        //   <Text className=' text-xl font-bold' style={{ color: Colors.dark.colors.mainTextColor }}>Store Name</Text>
        //   <TextInput
        //     style={styles.input}
        //     value={storeDetails.name}
        //     onChangeText={(value) => handleChange('name', value)}
        //   />
        // </ScrollView>

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <StatusBar backgroundColor={Colors.dark.colors.backGroundColor} />
            <View className='px-3 w-full justify-between' style={{ backgroundColor: Colors.dark.colors.backGroundColor }}>
                <View className='flex-row items-center pb-4'>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-outline" size={24} color={Colors.dark.colors.mainTextColor} />
                    </TouchableOpacity>
                </View>

                <View className='w-full rounded-2xl overflow-hidden' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.25 }}>
                    <View className='h-3/5 flex-row items-center'>
                        <View className='w-16 h-16 mx-3 pt-1 rounded-full items-center justify-center' style={{ backgroundColor: Colors.dark.colors.diffrentColorPerpleBG }}>
                            <Text className='text-4xl font-black' style={{ color: Colors.dark.colors.diffrentColorPerple }}>U</Text>
                        </View>
                        <View>
                            <Text numberOfLines={1} ellipsizeMode='tail' className='text-xl font-black' style={{ color: Colors.dark.colors.mainTextColor }}>UserName</Text>
                            <Text numberOfLines={1} ellipsizeMode='tail' className='font-bold text-lg' style={{ color: Colors.dark.colors.textColor }}>Contact details</Text>
                            <View className='-mt-1 flex-row items-center'>
                                <Text className='font-medium text-base underline' style={{ color: Colors.dark.colors.diffrentColorOrange }}>View activity</Text>
                                <Ionicons name='caret-forward' size={16} color={Colors.dark.colors.diffrentColorOrange} />
                            </View>
                        </View>
                    </View>
                    <View className=' h-2/5 flex-row p-3 items-center justify-between bg-black'>
                        <View className='flex-row items-center'>
                            <View className=' p-2 rounded-full' style={{ backgroundColor: 'rgba(244,230,83,0.3)' }}>
                                {/* <LinearGradient className=' p-1 rounded-full' colors={['#D79C08', '#F4E653', '#D79C08']}> */}
                                <Ionicons name='ribbon' size={24} color={'black'} />
                                {/* </LinearGradient> */}
                            </View>

                            {/* <LinearGradient className=' p-1 rounded-full' colors={['#D79C08', '#F4E653', '#D79C08']}> */}
                            <Text className='text-xl font-black text-[#D79C08]'>  Know Us</Text>
                            {/* </LinearGradient> */}
                        </View>
                        <Ionicons name='chevron-forward' size={24} color={'#D79C08'} />
                    </View>
                </View>
            </View>

            <ScrollView
                className='px-3 h-full w-full'
                style={{ backgroundColor: Colors.dark.colors.backGroundColor }}
                keyboardShouldPersistTaps='handled'
            >
                <View className='mt-3 px-2 flex-row justify-center'>
                    <View className='w-1/2 rounded-2xl overflow-hidden mr-3 justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.15 }}>
                        <View className='p-2 absolute left-6 top-4 rounded-full' style={{ backgroundColor: Colors.dark.colors.secComponentColor }}>
                            <Ionicons name='heart-outline' size={24} color={Colors.dark.colors.mainTextColor} />
                        </View>
                        <Text numberOfLines={1} ellipsizeMode='tail' className='absolute left-6 bottom-4 font-bold text-xl' style={{ color: Colors.dark.colors.mainTextColor }}>Favourites</Text>
                    </View>

                    <View className='w-1/2 rounded-2xl overflow-hidden justify-between' style={{ backgroundColor: Colors.dark.colors.componentColor, height: Dimensions.get('window').height * 0.15 }}>
                        <View className='p-2 absolute left-6 top-4 rounded-full' style={{ backgroundColor: Colors.dark.colors.secComponentColor }}>
                            <Ionicons name='bag-handle-outline' size={24} color={Colors.dark.colors.mainTextColor} />
                        </View>
                        <Text className='absolute left-6 bottom-4 font-bold text-xl' style={{ color: Colors.dark.colors.mainTextColor }}>Orders</Text>
                    </View>
                </View>

                <View className='rounded-xl mt-3 w-full' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
                    <View className='p-3 items-center flex-row justify-between'>
                        <View className='flex-row items-center'>
                            <Text className='font-bold text-xl' style={{ color: Colors.dark.colors.mainTextColor }}>Featured</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleChange('featured', !storeDetails.featured)}>
                            <Ionicons
                                name='toggle'
                                size={38}
                                style={{ transform: [{ rotate: storeDetails.featured ? '0deg' : '180deg' }] }}
                                color={storeDetails.featured ? Colors.dark.colors.diffrentColorGreen : Colors.dark.colors.mainTextColor}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='mt-3 rounded-xl'>
                    <View className='rounded-xl p-3 ' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
                        {/* <View className='items-center flex-row mb-3'>
                            <View className='absolute -left-11 rounded-lg h-full w-10' style={{ backgroundColor: Colors.dark.colors.diffrentColorOrange }} />
                            <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-xl' style={{ color: Colors.dark.colors.mainTextColor }}> Type</Text>
                        </View> */}
                        <View className=' flex-row items-center justify-between'>
                            <View className=' flex-row justify-between'>
                                <TouchableOpacity
                                    onPress={() => handleChange('type', 'Veg')}
                                    style={{ backgroundColor: storeDetails.type !== 'NonVeg' ? Colors.dark.colors.diffrentColorGreen : Colors.dark.colors.backGroundColor }}
                                    className=' w-[35%] p-3 rounded-l-lg items-center'
                                >
                                    <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Pure Veg</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleChange('type', 'Both')}
                                    style={{ backgroundColor: storeDetails.type === 'Both' ? Colors.dark.colors.diffrentColorPerple : Colors.dark.colors.backGroundColor }}
                                    className=' w-[30%] p-3 items-center'
                                >
                                    <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Both</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleChange('type', 'NonVeg')}
                                    style={{ backgroundColor: storeDetails.type !== 'Veg' ? Colors.dark.colors.diffrentColorRed : Colors.dark.colors.backGroundColor }}
                                    className=' w-[35%] p-3 rounded-r-lg items-center'
                                >
                                    <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Non Veg</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View className='mt-3 rounded-xl'>
                    <View className='rounded-xl p-3' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
                        <View className='items-center flex-row mb-3'>
                            <View className='absolute -left-11 rounded-lg h-full w-10' style={{ backgroundColor: Colors.dark.colors.diffrentColorOrange }} />
                            <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-xl' style={{ color: Colors.dark.colors.mainTextColor }}> Shopkeeper Information</Text>
                        </View>
                        {/* <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Store Name</Text>
                            <View className='flex-row'>
                                <TextInput
                                    style={{ color: Colors.dark.colors.mainTextColor }}
                                    className='font-black text-base underline mr-2'
                                    value={storeDetails.name}
                                    onChangeText={(value) => handleChange('name', value)}
                                />
                                <Ionicons name="pencil-sharp" size={22} color={Colors.dark.colors.mainTextColor} />
                            </View> */}
                        <View className='my-2 flex-row items-center justify-between'>
                            <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Shopkeeper Name</Text>
                            <View className='flex-row'>
                                <TextInput
                                    style={{ color: Colors.dark.colors.mainTextColor }}
                                    className='font-black text-base underline mr-2'
                                    value={storeDetails.shopkeeperName}
                                    onChangeText={(value) => handleChange('shopkeeperName', value)}
                                />
                                <Ionicons name="pencil-sharp" size={22} color={Colors.dark.colors.mainTextColor} />
                            </View>
                        </View>
                        <View className='my-2 flex-row items-center justify-between'>
                            <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>UPI ID</Text>
                            <View className='flex-row'>
                                <TextInput
                                    style={{ color: Colors.dark.colors.mainTextColor }}
                                    className='font-black text-base underline mr-2'
                                    value={storeDetails.upiId}
                                    onChangeText={(value) => handleChange('upiId', value)}
                                />
                                <Ionicons name="pencil-sharp" size={22} color={Colors.dark.colors.mainTextColor} />
                            </View>
                        </View>
                        <View className='my-2 flex-row items-center justify-between'>
                            <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-base' style={{ color: Colors.dark.colors.mainTextColor }}>Store Name</Text>
                            <View className='flex-row'>
                                <TextInput
                                    style={{ color: Colors.dark.colors.mainTextColor }}
                                    className='font-black text-base underline mr-2'
                                    value={storeDetails.name}
                                    onChangeText={(value) => handleChange('name', value)}
                                />
                                <Ionicons name="pencil-sharp" size={22} color={Colors.dark.colors.mainTextColor} />
                            </View>
                        </View>
                    </View>
                </View>

                <View className='mt-3 rounded-xl'>
                    <View className='rounded-xl p-3' style={{ backgroundColor: Colors.dark.colors.componentColor }}>
                        <View className='items-center flex-row mb-3'>
                            <View className='absolute -left-11 rounded-lg h-full w-10' style={{ backgroundColor: Colors.dark.colors.diffrentColorOrange }} />
                            <Text numberOfLines={1} ellipsizeMode='tail' className='font-black text-xl' style={{ color: Colors.dark.colors.mainTextColor }}> Operating Hours</Text>
                        </View>

                        <View className='my-2 flex-row items-center justify-between'>
                            <View className='w-[45%]'>
                                <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-base underline mb-1'>Opening Time</Text>
                                <TouchableOpacity onPress={() => showDatePicker('openingTime')}>
                                    <TextInput
                                        className='font-black text-base rounded-md p-3' 
                                        style={{ borderWidth: 1, borderColor: Colors.dark.colors.mainTextColor, color: Colors.dark.colors.mainTextColor }}
                                        value={storeDetails.openingTime}
                                        editable={false}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black top-3 text-xl'>to</Text>
                            <View className='w-[45%]'>
                            <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-base underline mb-1'>Closing Time</Text>
                                <TouchableOpacity onPress={() => showDatePicker('closingTime')}>
                                    <TextInput
                                        className='font-black text-base rounded-md p-3' 
                                        style={{ borderWidth: 1, borderColor: Colors.dark.colors.mainTextColor, color: Colors.dark.colors.mainTextColor }}
                                        value={storeDetails.closingTime}
                                        editable={false}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={{ color: Colors.dark.colors.mainTextColor }} className='font-black text-base underline mb-1'>Opening Time</Text>
                        <TouchableOpacity onPress={() => showDatePicker('openingTime')}>
                            <TextInput
                                style={styles.input}
                                value={storeDetails.openingTime}
                                editable={false}
                            />
                        </TouchableOpacity>

                        <Text style={styles.label}>Closing Time</Text>
                        <TouchableOpacity onPress={() => showDatePicker('closingTime')}>
                            <TextInput
                                style={styles.input}
                                value={storeDetails.closingTime}
                                editable={false}
                            />
                        </TouchableOpacity>

                    </View>
                </View>



            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginVertical: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        margin: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonSelected: {
        backgroundColor: 'orange',
    },
    buttonText: {
        color: '#fff',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    gridItem: {
        width: '30%',
        margin: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        alignItems: 'center',
    },
    gridItemSelected: {
        backgroundColor: 'orange',
    },
    gridItemText: {
        color: '#fff',
    },

    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    dropdownContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        overflow: 'hidden',
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    dropdownHeaderText: {
        fontSize: 16,
    },
    dropdownList: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginTop: 5,
    },
    dropdownItem: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    dropdownItemText: {
        fontSize: 16,
    },
    doneButton: {
        padding: 10,
        backgroundColor: '#007BFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        margin: 10,
    },
    doneButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default EditStoreDetails;
