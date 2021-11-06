import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//my imports

// SVG
import HomeSvg from '../../assets/svg/homeunfill.svg';
import HomeFilledSvg from '../../assets/svg/home.svg';
import NotificationsSvg from '../../assets/svg/bell.svg';
import NotificationsFilledSvg from '../../assets/svg/bellfill.svg';
import ProfileSvg from '../../assets/svg/user.svg';
import ProfileFilledSvg from '../../assets/svg/userfill.svg';

import HomeStack from '../HomeStack/HomeStack';
import BrandStack from '../BrandStack/BrandStack';
import ProfileStack from '../ProfileStack/ProfileStack';
import NotificationStack from '../NotificationStack/NotificationStack';
import { Colors } from '../../global';
import { Platform, View } from 'react-native';

const Tab = createBottomTabNavigator();

function BottomTabs() {
	return (
		<Tab.Navigator

			backBehavior='history'
			tabBarOptions={{
				showLabel: false,
				style: Platform.OS == 'android'
					?
					{ backgroundColor: Colors.WHITE, height: 60, borderTopWidth: 0 }
					:
					{ backgroundColor: Colors.WHITE, }
			}}

		>
			<Tab.Screen

				name="Home"
				component={HomeStack}
				options={{

					tabBarIcon: ({ focused }) => (
						focused ?
							< View>
								<HomeFilledSvg />
								{/* <View style={{ height: 5, width: 5, position: "absolute", bottom: -10, right: 8, borderRadius: 3, backgroundColor: Colors.PRIMARY }} /> */}
							</ View>
							:
							<HomeSvg />
					),

				}}
			/>
			<Tab.Screen name="Notifications" component={NotificationStack}
				options={{
					tabBarIcon: ({ focused }) => (
						focused ?
							< View>
								<NotificationsFilledSvg />
								{/* <View style={{ height: 5, width: 5, position: "absolute", bottom: -10, right: 6, borderRadius: 3, backgroundColor: Colors.PRIMARY }} /> */}
							</View>
							: <NotificationsSvg />
					),
				}}
			/>
			<Tab.Screen name="Brands" component={BrandStack}
				options={{
					tabBarIcon: ({ focused }) => (
						focused ?
							< View>
								<ProfileFilledSvg />
								{/* <View style={{ height: 5, width: 5, position: "absolute", bottom: -10, right: 7, borderRadius: 3, backgroundColor: Colors.PRIMARY }} /> */}
							</View>
							:
							<ProfileSvg />
					),
				}}
			/>

		</Tab.Navigator>

	);
}
export default BottomTabs;