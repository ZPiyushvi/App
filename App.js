import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";
import { GlobalStateProvider } from "./Source/Context/GlobalStateContext";
import AppNavigator from './Source/Navigation/AppNavigator';

export default function App() {
  return (
    <GlobalStateProvider>
      {/* <Provider> */}
        <AppNavigator />
      {/* </Provider> */}
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
