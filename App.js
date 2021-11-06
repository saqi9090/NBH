import React from 'react';
import MainStack from './src/navigation/MainStack';
import { Provider } from 'react-redux';
import { store } from './src/redux/store/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
// import { Linking, Alert } from 'react-native';
// import { globalStyles } from './global/globalStyles';
// import NotificationManager from './NotificationManager';
// import { Server } from './global';
// import { notificationManager } from './NotificationManagerIOS'
// import { Platform } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
// import Axios from 'axios';
// import { element } from 'prop-types';
// import { PermissionsAndroid } from 'react-native';
import ErrorBoundary from './ErrorBoundary'
import { notificationManager } from './NotificationManagerIOS';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { NotificationManagerAndroid } from './NotificationManager';
import { Platform } from 'react-native';


const AddAProductToCartContext = React.createContext()
const IncerementProductQuantityContext = React.createContext()
const DecerementProductQuantityContext = React.createContext()
const RemoveAProductFromCartContext = React.createContext()

export function addAProductToCart() {
	return React.useContext(AddAProductToCartContext)
}
export function incrementQuantity() {
	return React.useContext(IncerementProductQuantityContext)
}
export function decrementQuantity() {
	return React.useContext(DecerementProductQuantityContext)
}
export function removeAProductFromCart() {
	return React.useContext(RemoveAProductFromCartContext)
}
export const CartItems = React.createContext();


// console.warn("<=>", CartItems);

const App = () => {

	// const [info, setInfo] = React.useState(null)
	const [cartItems, setCartItems] = React.useState([]);

	function addAProductToCart(cartItem) {
		const response = cartItems.filter(e => e.productId == cartItem.productId);
		if (response.length == 0) {
			setCartItems([...cartItems, cartItem])
		} else {
			const response = cartItems.map(e => {
				if (e.productId == cartItem.productId) {
					return { ...e, quantity: e.quantity + cartItem.quantity }
				} else {
					return e;
				}
			})
			setCartItems(response)
		}
	}



	function incrementQuantity(productId) {
		const response = cartItems.map(e => {
			if (e.productId == productId) {
				return { ...e, quantity: e.quantity + 1 }
			} else {
				return e;
			}
		})
		setCartItems(response)
	}
	function decrementQuantity(productId) {
		const response = cartItems.map(e => {
			if (e.productId == productId) {
				return { ...e, quantity: e.quantity - 1 }
			} else {
				return e;
			}
		})
		setCartItems(response)
	}

	function removeAProductFromCart(productId) {
		const response = cartItems.filter(e => e.productId != productId)
		setCartItems(response)
	}
	async function requestUserPermission() {
		const authorizationStatus = await messaging().requestPermission({
			sound: false,
			announcement: true,
		});

	}
	React.useEffect(() => {
		try {
			requestUserPermission();
			const unsubscribe = messaging().onMessage(async remoteMessage => {
				JSON.stringify(remoteMessage.data);
				const { messageId } = remoteMessage;
				const data = remoteMessage.data
				if (Platform.OS === 'android') {
					NotificationManagerAndroid.showNotification(data.title, data.notificationText, data.subText, messageId, data,);
				} else {
					notificationManager.showNotification(2, data.subText, data.notificationText, data, {})
				}
			});
			return unsubscribe;
		} catch (error) {
			console.log(error.message);
		}
	}, []);
	return (
		<ErrorBoundary>

			<SafeAreaProvider>
				<CartItems.Provider value={[cartItems, setCartItems]}>
					<AddAProductToCartContext.Provider value={addAProductToCart}>
						<IncerementProductQuantityContext.Provider value={incrementQuantity}>
							<DecerementProductQuantityContext.Provider value={decrementQuantity}>
								<RemoveAProductFromCartContext.Provider value={removeAProductFromCart}>

									{

										<Provider store={store}>
											<MainStack />
										</Provider>
										// :
										// Alert.alert("Warning", "App is not Available in your Country")
									}
								</RemoveAProductFromCartContext.Provider>
							</DecerementProductQuantityContext.Provider>
						</IncerementProductQuantityContext.Provider>
					</AddAProductToCartContext.Provider>
				</CartItems.Provider>
			</SafeAreaProvider>
		</ErrorBoundary>
	)
};

export default App;