import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { NavigationContainer } from '@react-navigation/native';

import { ScreenNames } from '../global/index';

//screens imports
import BottomTabs from '../navigation/bottomTabs/BottomTabs';
import SplashScreen from '../screens/SplashScreen';
import introductionScreen from '../screens/Introduction/IntroductionScreen';
import NBHLoginScreen from '../screens/NBHLogin/NBHLoginScreen';
import NBHOTPScreen from '../screens/NBHOTP/NBHOTPScreen';
import NBHForgetPasswordScreen from '../screens/NBHForgetPassword/NBHForgetPasswordScreen';
import NBHCreatePasswordScreen from '../screens/NBHCreatePassword/NBHCreatePasswordScreen';
import SignUpScreen from '../screens/Signup/SignUpScreen';
import EditProfileScreen from '../screens/EditProfile/EditProfileScreen';
import PdfDocument from '../components/PdfDocument/PdfDocument';
import AddAddressMapScreen from '../screens/AddAddressMap/AddAddressMapScreen';
import AddAddressScreen from '../screens/AddAddress/AddAddressScreen';
import MakePaymentScreen from '../screens/MakePayment/MakePaymentScreen';
import DeepLinkScreen from '../screens/DeepLink/DeepLinkScreen';

import linking from './linking'
import NBHMemberDetailScreen from '../screens/NBHMemberDetail/NBHMemberDetailScreen';


enableScreens();
const stack = createNativeStackNavigator();

const MainStack = ({ myUserId, dispatch, navigation, country }) => {

	return (
		<NavigationContainer
			linking={linking}
		>
			<stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"SplashScreen"}>



				<stack.Screen name={ScreenNames.BOTTOM_TABS} component={BottomTabs} />
				<stack.Screen name="SplashScreen" component={SplashScreen} />
				<stack.Screen name={ScreenNames.INTRODUCTION} component={introductionScreen} />
				<stack.Screen name={ScreenNames.EDITPROFILE_SCREEN} component={EditProfileScreen} />
				<stack.Screen name={ScreenNames.NBHLOGIN} component={NBHLoginScreen} />
				<stack.Screen name={ScreenNames.NBHOTP} component={NBHOTPScreen} />
				<stack.Screen name={ScreenNames.NBHFORGETPASSWORD} component={NBHForgetPasswordScreen} />
				<stack.Screen name={ScreenNames.NBHCREATENEWPASSWOERD} component={NBHCreatePasswordScreen} />
				<stack.Screen name={ScreenNames.NBHSIGNUP_SCREEN} component={SignUpScreen} />
				<stack.Screen name={ScreenNames.MAKEPAYMENT_SCREEN} component={MakePaymentScreen} />
				<stack.Screen name={ScreenNames.NBHMEMBERDETAIL_SCREEN} component={NBHMemberDetailScreen} />
				<stack.Screen name={ScreenNames.DEEPLINK_POST} component={DeepLinkScreen} />


				<stack.Screen name={"PdfDocument"} component={PdfDocument} />

				<stack.Screen
					name={ScreenNames.ADD_ADDRESS_MAP_SCREEN}
					component={AddAddressMapScreen} />
				<stack.Screen
					name={ScreenNames.ADD_ADDRESS_SCREEN}
					component={AddAddressScreen} />
				{/* <stack.Screen name={ScreenNames.SEND_BOX} component={SendBox} /> */}

			</stack.Navigator>
		</NavigationContainer>
	);
};

// const mapStateToProps = state => ({
// 	myUserId: state.user.userId,
// 	country: state.user.country
// });
// let mapDispatchToProps = dispatch => ({dispatch});

// export default connect(mapStateToProps, mapDispatchToProps)(MainStack);
export default MainStack;
