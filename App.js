import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";
import { GlobalStateProvider } from "./Source/Context/GlobalStateContext";
import AppNavigator from './Source/Navigation/AppNavigator';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";

export default function App() {
  return (
    <GlobalStateProvider>
      <ClerkProvider publishableKey="pk_test_Z2l2aW5nLWRvdmUtNDMuY2xlcmsuYWNjb3VudHMuZGV2JA">
        {/* <Provider> */}
        <SignedIn>
          <AppNavigator />
        </SignedIn>
        <SignedOut>
        <AppNavigator />
        </SignedOut>
        {/* </Provider> */}
      </ClerkProvider>
    </GlobalStateProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
