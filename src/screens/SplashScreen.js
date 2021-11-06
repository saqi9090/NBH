import React from 'react';
import { Alert, Animated, BackHandler, Linking, Platform, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import { Colors, Constants, Fonts, ScreenNames, Server } from '../global';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import * as UserActions from '../redux/actions/userActions'

import messaging from '@react-native-firebase/messaging';
import { notificationManager } from '../../NotificationManagerIOS';
import CustomAlert from '../components/CustomAlert/CusomAlert';
import database from '@react-native-firebase/database';
import { CartItems } from '../../App';
import CheckLogin from '../components/CheckLogin';
import { PutService } from '../services/PutService';
import { getService } from '../services/getService';

const SplashScreen = ({
	navigation,
	dispatch }) => {
	//ref

	const navigationRef = React.useRef()

	//

	const [customAlertVisible, setCustomAlertVisible] = React.useState(false)
	const [alertText, setAlertText] = React.useState('');
	const [customAlertVisible1, setCustomAlertVisible1] = React.useState(false)
	const [alertText1, setAlertText1] = React.useState('');

	const [customAlertVisible3, setCustomAlertVisible3] = React.useState(false)
	const [alertText3, setAlertText3] = React.useState('');
	const [title, setTitle] = React.useState('');


	const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
	const toggleCustomAlertVisibility1 = () => { setCustomAlertVisible1(!customAlertVisible1) }

	const toggleCustomAlertVisibility3 = () => { setCustomAlertVisible3(!customAlertVisible3) }


	const leftButtonFunction = () => {
		Linking.openURL(Platform.OS == "android" ? `https://play.google.com/store/apps/details?id=com.nbh.app` : `https://apps.apple.com/in/app/nbh-solution/id1565314982`)
		setTimeout(() => {
			BackHandler.exitApp()
		}, 2000)
		toggleCustomAlertVisibility()
	}


	const leftButtonFunction1 = () => {
		loadData()
		toggleCustomAlertVisibility1()

	}

	const leftButtonFunction3 = () => {
		toggleCustomAlertVisibility3()
	}

	const rightButtonFunction1 = () => {
		Linking.openURL(Platform.OS == "android" ? `https://play.google.com/store/apps/details?id=com.nbh.app` : `https://apps.apple.com/in/app/nbh-solution/id1565314982`)
		setTimeout(() => {
			BackHandler.exitApp()
		}, 2000)
		toggleCustomAlertVisibility1()
	}

	const resetStackAndGoToUser = CommonActions.reset({
		index: 0,
		routes: [{ name: ScreenNames.NBHLOGIN }],
	});
	const resetStackAndGoToHome = CommonActions.reset({
		index: 0,
		routes: [{ name: ScreenNames.BOTTOM_TABS, }],
	});
	const resetStackAndToEdit = CommonActions.reset({
		index: 1,
		routes: [{ name: ScreenNames.EDITPROFILE_SCREEN, params: { edit: 1 } }],

	});

	const opacity = React.useRef(new Animated.Value(1)).current;

	const CheckAsync = async () => {
		const response = await AsyncStorage.getItem("userId")
	}
	React.useEffect(() => {
		CheckAsync()
		onLoad()
	}, [])

	const createFriendShipNode = async (userId, token) => {
		database().ref("LoginUser").child(userId.toString()).set({
			userId: userId,
			token: token,
		});
		return null;
	};

	const setToken = async (response) => {
		const t = await messaging().getToken()

		// const a = await axios.put(`${Server.BASE_URL}/users/${response}/updateToken/${t}`);
		// console.warn("a", a.data);

		const uri = `/users/${response}/updateToken/${t}`
		const body = null
		PutService(uri, body).then((response) => {
			if (response.code == 200) {
				dispatch(UserActions.setToken(t))
			} else {
				setAlertText3(response.message)
				toggleCustomAlertVisibility3()
			}
		})
		database()
			.ref("LoginUser")
			.child(response.toString())
			.once('value', (FriendShips) => {
				// console.warn("Users.exists()", Users.exists());
				if (!FriendShips.exists()) {
					// console.warn("hii");
					// setFlag(false)
					createFriendShipNode(response, t);
				} else {
					console.warn(FriendShips.val().userId);
					if (FriendShips.val().token != t) {
						createFriendShipNode(response, t)
					} else {
					}
					// console.warn(User);
					// if (flag == false) {
					//     console.warn("flag", flag);
					// }
				}
			});
	}


	const loadData = async () => {
		const response = await AsyncStorage.getItem("userId")
		if (response === null) {
			navigation.dispatch(resetStackAndGoToUser)
		} else {
			const p = await messaging().hasPermission()
			if (p == 1) {
				setToken(response)
			} else {
				const authorizationStatus = await messaging().requestPermission({
					sound: false,
					announcement: true,
				});
				setToken(response)
			}
			// const userDetails = await axios.get(`${Server.BASE_URL}/users/${response}`)


			const req = `/users/${response}`
			getService(req).then((userDetails) => {
				if (userDetails.code == 200) {
					if (
						userDetails.data.officeBuilding &&
						userDetails.data.officeFloor &&
						userDetails.data.officeLandmark &&
						userDetails.data.officeCity &&
						userDetails.data.officeLatitude &&
						userDetails.data.officeLongitude &&
						userDetails.data.officeContactNo
					) {
						dispatch(UserActions.setUserId(userDetails.data.userId))
						dispatch(UserActions.setName(userDetails.data.name))
						dispatch(UserActions.setFirstName(userDetails.data.firstName))
						dispatch(UserActions.setLastName(userDetails.data.lastName))
						dispatch(UserActions.setPhone(userDetails.data.phone))
						dispatch(UserActions.setUserImage(userDetails.data.thumbnailImage))
						dispatch(UserActions.setEmail(userDetails.data.email))
						dispatch(UserActions.setWhatsAppNumber(userDetails.data.whatsAppNumber))
						dispatch(UserActions.setReferralCode(userDetails.data.referralCode))
						dispatch(UserActions.setOfficeAddress({
							"officeBuilding": userDetails.data.officeBuilding,
							"officeFloor": userDetails.data.officeFloor,
							"officeFlatNo": userDetails.data.officeFlatNo,
							"officeLandmark": userDetails.data.officeLandmark,
							"officeCity": userDetails.data.officeCity,
							"officeLatitude": userDetails.data.officeLatitude,
							"officeLongitude": userDetails.data.officeLongitude,
							"officePincode": parseInt(userDetails.data.officePincode),
						}))
						navigation.dispatch(resetStackAndGoToHome)
					} else {
						dispatch(UserActions.setUserId(userDetails.data.userId))
						dispatch(UserActions.setName(userDetails.data.name))
						dispatch(UserActions.setFirstName(userDetails.data.firstName))
						dispatch(UserActions.setLastName(userDetails.data.lastName))
						dispatch(UserActions.setPhone(userDetails.data.phone))
						dispatch(UserActions.setUserImage(userDetails.data.thumbnailImage))
						dispatch(UserActions.setEmail(userDetails.data.email))
						dispatch(UserActions.setWhatsAppNumber(userDetails.data.whatsAppNumber))
						dispatch(UserActions.setReferralCode(userDetails.data.referralCode))
						navigation.dispatch(resetStackAndToEdit)
					}
				} else {
					setAlertText3(userDetails.message)
					toggleCustomAlertVisibility3()
				}
			})

		}
	}



	const onLoad = async () => {
		Animated.timing(opacity, {
			toValue: 0,
			duration: 2500,
			useNativeDriver: true
		}).start(async ({ finished }) => {
			if (finished) {
				const req = `/forceUpdate`
				getService(req).then((response) => {
					if (response.code == 200) {
						// console.warn("rrr1", response.data);
						var pkg = require('../../package.json');
						if (pkg.version == response.data.androidVersion) {
							loadData()
						} else {
							if (response.data.androidForceUpdate) {
								setAlertText('An update to NBH is required for continue using its services.')
								toggleCustomAlertVisibility()
							} else {
								setAlertText1('NBH recommends that you update app to latest version.')
								toggleCustomAlertVisibility1()
							}
						}
					} else {
						setAlertText3(userDetails.message)
						toggleCustomAlertVisibility3()
					}
				})
			}
		});
	};

	return (
		<Animated.View style={styles.container}>
			<View style={styles.align}>
				{/* <LogoSvg /> */}
				<Text style={styles.fontText}>NBH</Text>
			</View>

			<CustomAlert
				title={title}
				desc={alertText3}
				leftButtonText={"OK"}
				leftButtonFunction={leftButtonFunction3}
				toggleCustomAlertVisibility={toggleCustomAlertVisibility3}
				customAlertVisible={customAlertVisible3}
			/>

			<CustomAlert
				title={"New Version Available"}
				desc={alertText}
				leftButtonText={"UPDATE"}
				leftButtonFunction={leftButtonFunction}
				toggleCustomAlertVisibility={toggleCustomAlertVisibility}
				customAlertVisible={customAlertVisible}
			/>


			<CustomAlert
				title={"New Version Available"}
				desc={alertText1}
				rightButtonText={"UPDATE"}
				leftButtonText={"NO THANKS"}
				leftButtonFunction={leftButtonFunction1}
				rightButtonFunction={rightButtonFunction1}
				toggleCustomAlertVisibility={toggleCustomAlertVisibility1}
				customAlertVisible={customAlertVisible1}
			/>


		</Animated.View>
	);
};

const styles = StyleSheet.create({
	image: {
		width: Constants.SCREEN_WIDTH,
		height: Constants.SCREEN_HEIGHT,
	},
	container: {
		flex: 1,
		backgroundColor: Colors.PRIMARY
	},
	align: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	fontText: {
		fontSize: 53,
		marginTop: 20,
		fontFamily: Fonts.MEDIUM,
		color: Colors.WHITE,
		textAlign: "center"
		// flexDirection: "column-reverse"
	},
});

// const mapStateToProps = state => ({
// 	state: state.user,
// 	contactId: state.brand.contactId,
// 	uid: state.user.uid
// });

const mapDispatchToProps = dispatch => ({ dispatch });

// export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
export default connect(null, mapDispatchToProps)(SplashScreen);