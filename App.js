import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message'
import axios from 'axios';

import { UserProvider } from './src/data/contexts/UserContext';
import { AnimationProvider } from './src/data/contexts/AnimationContext';
import { MoneyProvider } from './src/data/contexts/MoneyContext';

import Navigator from './src/Navigator';

// axios.defaults.baseURL = "https://e21project-be.herokuapp.com"
axios.defaults.baseURL = "http://10.10.204.187:8080"

export default function App() {
  return (
    <UserProvider>
      <AnimationProvider>
        <MoneyProvider>
          <Navigator />
          <Toast />
        </MoneyProvider>
      </AnimationProvider>
    </UserProvider>
  );
}

