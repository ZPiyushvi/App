# App
npx expo start
npm error npm config set legacy-peer-deps true

# IITOutlet

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
expo start
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

#### 2. Create AAB File

To create an Android App Bundle (AAB) file, run the following command in the root directory of your project:

```bash
npx react-native build-android --mode=release
```

## Conclusion

You are now ready to develop and build your Expo React Native app. If you encounter any issues, please refer to the [Expo documentation](https://docs.expo.dev/) or open an issue on this repository.
```

Feel free to replace `your-username` and `your-repo-name` with your actual GitHub username and repository name. This guide provides comprehensive steps for setting up, running, and building your Expo React Native app.