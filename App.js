import 'react-native-gesture-handler';
import Navigator from './src/Navigator';
import Toast from 'react-native-toast-message'
import { UserProvider } from './src/data/contexts/UserContext';
import axios from 'axios';
import { AnimationProvider } from './src/data/contexts/AnimationContext';

axios.defaults.baseURL = "https://e21project-be.herokuapp.com"

export default function App() {
  return (
    <UserProvider>
      <AnimationProvider>
        <Navigator />
        <Toast />
      </AnimationProvider>
    </UserProvider>
  );
}

