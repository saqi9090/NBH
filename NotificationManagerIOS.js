import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { Linking, Platform, AppState } from 'react-native'
import { ScreenNames, Server } from './src/global'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Axios from 'axios'

class NotificationManager extends React.Component {

	configure = (navigation) => {
		PushNotification.configure({
			onRegister: async function (token) {
			},



			onNotification: function (notification) {

				const iosURL = "nbh:/";
				const androidURL = "https://nbh.com";
				const data = Platform.OS == "android" ? notification.data : notification.data.item;
				console.warn(data);
				const key = Platform.OS == "android" ? notification.data.key : notification.data.item.key
				let baseUrl = Platform.OS == "android" ? androidURL : iosURL;

				if (AppState.currentState === 'active') {
					try {
						if (key == 'USER') {
							navigation.navigate(ScreenNames.NBHMEMBERDETAIL_SCREEN, { userId: data.referenceId });
						} else if (key == 'POST_COMMENT') {
							navigation.navigate(ScreenNames.DEEPLINK_POST, { postId: data.referenceId });
						} else if (key == 'POST_LIKE') {
							navigation.navigate(ScreenNames.DEEPLINK_POST, { postId: data.referenceId });
						} else if (key == 'POST_INTEREST') {
							navigation.navigate(ScreenNames.DEEPLINK_POST, { postId: data.referenceId });
						}
					} catch (error) {
						console.warn(error);
						notification.finish(PushNotificationIOS.FetchResult.NoData);

					}

				} else {
					try {
						if (key == 'USER') {
							Linking.openURL(`${baseUrl}/memberDetails/${data.referenceId}`);
						} else if (key == 'POST_COMMENT') {
							Linking.openURL(`${baseUrl}/postDetails/${data.referenceId}`);
						} else if (key == 'POST_LIKE') {
							Linking.openURL(`${baseUrl}/postDetails/${data.referenceId}`);
						} else if (key == 'POST_INTEREST') {
							Linking.openURL(`${baseUrl}/postDetails/${data.referenceId}`);
						}
					} catch (error) {
						console.warn(error);

					}
				}
				notification.finish(PushNotificationIOS.FetchResult.NoData);
				// Handle notification click

			},
			permissions: {
				alert: true,
				badtp: true,
				sound: true,
			},
		})
	}

	_buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
		return {
			id: id,
			autoCancel: true,
			largeIcon: options.largeIcon || "ic_launcher",
			smallIcon: options.smallIcon || "ic_launcher",
			bigText: message || '',
			subText: title || '',
			vibrate: options.vibrate || false,
			vibration: options.vibration || 300,
			priority: options.priority || "high",
			importance: options.importance || "high",
			data: data
		}
	}

	_buildIOSNotification = (id, title, message, data = {}, options = {}) => {
		return {
			alertAction: options.alertAction || "view",
			category: options.category || "",
			userInfo: {
				id: id,
				item: data
			}
		}
	}

	showNotification = (id, title, message, data = {}, options = {}) => {
		PushNotification.localNotification({
			/* Android Only Properties */
			...this._buildAndroidNotification(id, title, message, data, options),

			/* IOS Only Properties */
			...this._buildIOSNotification(id, title, message, data, options),

			/* Android and IOS Properties */
			title: title || "",
			message: message || "",
			data: data,
			playSound: true,
			soundName: 'default',
			userInteraction: false
		})
	}

	cancelAllLocalNotification = () => {
		if (Platform.OS === 'ios') {
			PushNotification.removeAllDeliveredNotifications()
		} else {
			PushNotification.cancelAllLocalNotifications()
		}
	}

	unregister = () => {
		PushNotification.unregister()
	}
}
export const notificationManager = new NotificationManager()