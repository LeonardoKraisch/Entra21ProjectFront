import 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import Navigator from './src/Navigator';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Toast from 'react-native-toast-message'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Login /> */}
      <Register />
      {/* <Navigator /> */}
      <Toast/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('screen').height
  }
})
