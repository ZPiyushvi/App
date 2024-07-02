# App
npx expo start
npm error npm config set legacy-peer-deps true

# FinEdu

Fin Education Application React Code.

Creating a first build for android

1] Install the latest EAS CLI : npm install -g expo-cli // npm i eas-cli // mac : yarn global add eas-cli
2] Log in to your Expo account : eas login 
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