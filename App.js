import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message'
import axios from 'axios';
import { API_URL } from "env"

import { UserProvider } from './src/data/contexts/UserContext';
import { AnimationProvider } from './src/data/contexts/AnimationContext';
import { MoneyProvider } from './src/data/contexts/MoneyContext';

import Navigator from './src/Navigator';

import { useEffect } from 'react';

import * as Linking from 'expo-linking';


export default function App() {

	const prefix = Linking.createURL("/")
	const config = {
		screens: {
			Home: {
				screens: {
					WalletInvites: "WalletInvites",
					Main: "Home"
				},
			}
		}
	}

	const linking = {
		prefixes: [prefix],
		config: config
	}

	return (
		<UserProvider>
			<AnimationProvider>
				<MoneyProvider>
					<Navigator linking={linking} />
					<Toast />
				</MoneyProvider>
			</AnimationProvider>
		</UserProvider>
	)
}

