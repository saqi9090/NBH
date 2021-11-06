import React from 'react';
import { ScreenNames } from '../../global/index';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

//screens imports
import HomeScreen from '../../screens/Home/HomeScreen';
import NotificationsScreen from '../../screens/Notification/NotificationScreen';

enableScreens();
const stack = createNativeStackNavigator();

const NotificationStack = () => {
	return (
		<stack.Navigator
			screenOptions={
				{
					headerShown: false
				}}
			initialRouteName={ScreenNames.NOTIFICATION}
		// initialRouteName='Test'
		>
			{/* <stack.Screen
				name={ScreenNames.HOME}
				component={HomeScreen} /> */}
			<stack.Screen
				name={ScreenNames.NOTIFICATION}
				component={NotificationsScreen} />

		</stack.Navigator>
	);
};
export default NotificationStack;