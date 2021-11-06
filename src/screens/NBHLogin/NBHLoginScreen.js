import React from 'react';
import { ActivityIndicator, Image, Keyboard, KeyboardAvoidingView, Linking, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors, Fonts, Server } from '../../global';
import { globalStyles } from '../../global/globalStyles';
import { styles } from './NBHLoginStyle';
import { ScreenNames } from '../../global/index';
import EyecloseSvg from "../../assets/svg/eye-off.svg";
import EyeSvg from "../../assets/svg/eye.svg";
import CustomAlert from '../../components/CustomAlert/CusomAlert';
import axios from 'axios';
import { connect } from 'react-redux';
import * as UserActions from '../../redux/actions/userActions'
import AsyncStorage from '@react-native-community/async-storage'
import { CommonActions } from '@react-navigation/routers';
import messaging from '@react-native-firebase/messaging';
import { notificationManager } from '../../../NotificationManagerIOS';
import database from '@react-native-firebase/database';
import CallSvg from "../../assets/svg/phone1234.svg";
import WhatAppSvg from "../../assets/svg/whatsapp1234.svg";
import { PutService } from '../../services/PutService';
import { getService } from '../../services/getService';



const NBHLoginScreen = ({ navigation, dispatch }) => {

	//Variables

	//States
	const [number, setNumber] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [alertText, setAlertText] = React.useState('');
	const [eye, setEye] = React.useState(true);
	const [customAlertVisible, setCustomAlertVisible] = React.useState(false)
	const [loading, setLoading] = React.useState(false)

	//Refs

	//Functions
	const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }

	const leftButtonFunction = () => {
		toggleCustomAlertVisibility()
	}
	const resetStackAndGoToUser = CommonActions.reset({
		index: 0,
		routes: [{ name: ScreenNames.BOTTOM_TABS, }],
	});
	const createFriendShipNode = async (userId, token) => {

		return null;
	};

	// const getCallSvg = async () => {
	// 	const response = await axios.post(`${Server.BASE_URL}/users/filterUser/${userId}`, filterData)
	// 	setMembersList(response.data)
	// }

	// const getWhatApp = async () => {
	// 	const response1 = await axios.get(`${Server.BASE_URL}/users/getRecentlyViewed/${userId}`)
	// 	setQuickLink(response1.data)
	// }

	const Login = async () => {
		try {
			setLoading(true)
			if (password && number) {
				// const userExist = await axios.get(`${Server.BASE_URL}/users/exists/${number}`)
				const req = `/users/exists/${number}`
				getService(req).then((userExist) => {
					if (userExist.code == 200) {
						let requestUrl = `/users/phone/${number}/password/${password}`;
						getService(requestUrl).then((response) => {
							if (response.code == 200) {
								let requestUrl1 = `/users/checkUser/${number}`
								getService(requestUrl1).then((userDetails) => {
									if (userDetails.code == 200) {

										const p = messaging().hasPermission()
										if (p == 1) {
											const t = messaging().getToken()
											// await axios.put(`${Server.BASE_URL}/users/${userDetails.data.userId}/updateToken/${t}`);

											const uri = `/users/${userDetails.data.userId}/updateToken/${t}`
											const body = null
											PutService(uri, body).then((response) => {
												if (response.code == 200) {
													dispatch(UserActions.setToken(t))
												} else {
													setAlertText(response.message)
													toggleCustomAlertVisibility()
												}
											})
											database().ref("LoginUser").child(userDetails.data.userId.toString()).set({
												userId: userDetails.data.userId.toString(),
												token: t,
											});
										}
										AsyncStorage.setItem("userId", userDetails.data.userId.toString())
										dispatch(UserActions.setUserId(userDetails.data.userId))
										dispatch(UserActions.setName(userDetails.data.name))
										dispatch(UserActions.setFirstName(userDetails.data.firstName))
										dispatch(UserActions.setLastName(userDetails.data.lastName))
										dispatch(UserActions.setPhone(number))
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
										navigation.dispatch(resetStackAndGoToUser)
										setLoading(false)
									} else {
										setAlertText(userDetails.message)
										toggleCustomAlertVisibility()
										setLoading(false)
									}
								})
							} else {
								setAlertText("Please enter correct credentials")
								toggleCustomAlertVisibility()
								setLoading(false)
							}
						})
					} else {

						setAlertText(userExist.message)
						toggleCustomAlertVisibility()
					}
				})
			} else {
				setAlertText("Please Enter All Details")
				toggleCustomAlertVisibility()
				setLoading(false)
			}
		} catch (error) {
			setLoading(false)
			if (error.response.status == 401) {
				setAlertText(error.response.data);
				toggleCustomAlertVisibility()
			}
		}
	}
	const Signup = () => {
		navigation.navigate(ScreenNames.NBHSIGNUP_SCREEN)
	}
	//UseEffect

	React.useEffect(() => {

	}, [])

	const goToCall = (number) => {

		let phoneNumber = '';
		if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
		else { phoneNumber = `telprompt:${number}`; }
		Linking.openURL(phoneNumber);
		// Linking.openURL(uri)
	}

	const gotoChat = (number) => {
		const url = `whatsapp://send?phone=91${number}`
		Linking.openURL(url)
	}
	//UI
	return (

		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 'null'} style={styles.mainScreen}>
			<View style={{
				shadowColor: "#000",
				shadowOffset: {
					width: 0,
					height: 1,
				},
				shadowOpacity: 0.22,
				shadowRadius: 2.22,

				elevation: 3, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, marginBottom: 10, backgroundColor: Colors.WHITE
			}}>
				<FocusAwareStatusBar isLightBar={false} isTopSpace={true} isTransparent={false} />
				<View style={{ paddingLeft: 20, paddingVertical: 20 }}>
					<View style={{ alignSelf: "center" }}>
						<Image source={require("../../assets/images/NBH.png")} style={{ height: 61, width: 145 }} />
					</View>
					<Text style={[styles.font1, { marginTop: 20 }]}>Login at NBH</Text>
				</View>
			</View>
			<View style={{ flex: 1, backgroundColor: Colors.WHITE }} >

				<View style={{ marginTop: 30 }}>
					<View style={{ marginHorizontal: 20, marginVertical: 5 }}>
						<TextInput
							style={styles.filterinput}
							placeholderTextColor={Colors.BLACK}
							onChangeText={text => setNumber(text)}
							keyboardType="number-pad"
							placeholder="Mobile Number"></TextInput>
						<View style={{ height: 1.7, width: "100%", backgroundColor: "#97979975" }}></View>
					</View>

					<View style={{ marginHorizontal: 20, marginVertical: 10 }}>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<View style={{ flex: 0.9 }}>
								<TextInput
									placeholderTextColor={Colors.BLACK}
									secureTextEntry={eye ? true : false}
									secureTextEntry={eye ? true : false}
									style={styles.filterinput}
									onChangeText={text => setPassword(text)}
									placeholder="Password"></TextInput>
							</View>
							<View style={{ flex: 0.1, marginLeft: 5 }}>
								<TouchableOpacity onPress={() => setEye(!eye)}>
									{
										eye ?
											<EyecloseSvg />
											:
											<EyeSvg />
									}
								</TouchableOpacity>
							</View>
						</View>
						<View style={{ height: 1.7, width: "100%", backgroundColor: "#97979975" }}></View>
					</View>
				</View>

				<View style={{ flexDirection: "row", justifyContent: "flex-end", marginRight: 20, marginTop: 20 }}>
					<TouchableOpacity onPress={() => navigation.navigate(ScreenNames.NBHFORGETPASSWORD, { number: number })}>
						<Text style={{ fontFamily: Fonts.REGULAR, fontSize: 16, color: Colors.BRANDLESBLUE }}>Forget Password ?</Text>
					</TouchableOpacity>
				</View>

				<TouchableOpacity style={{ ...globalStyles.button, marginHorizontal: 30, marginTop: 30 }}
					onPress={Login} disabled={loading}>
					{
						loading
							?
							<ActivityIndicator size="small" color={Colors.BLACK} />
							:
							<Text style={globalStyles.buttonText}>
								Sign In
							</Text>
					}
				</TouchableOpacity>

				<View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20, alignItems: "center" }}>
					<Text style={{ color: "#16161650", fontFamily: Fonts.REGULAR, fontSize: 16 }}>
						Don’t have an account?
					</Text>
					<TouchableOpacity
						onPress={Signup}
						style={{ backgroundColor: Colors.PRIMARY, padding: 7, borderRadius: 4, marginLeft: 5 }}>

						<Text style={{ color: Colors.JUNGLE_BLACK, fontFamily: Fonts.BOLD, fontSize: 14 }}>
							Sign Up
						</Text>
					</TouchableOpacity>
				</View>
				<View style={{ marginBottom: 20 }}>

					<Text style={{ color: "#16161650", fontFamily: Fonts.REGULAR, fontSize: 16, alignSelf: "center" }}>
						Having Trouble Signing In ?
					</Text>
					<Text style={{ color: "#16161650", fontFamily: Fonts.REGULAR, fontSize: 16, alignSelf: "center" }}>
						Contact Us
					</Text>
					<View style={{ flexDirection: "row", alignContent: "center", justifyContent: "center", marginTop: 10 }}>
						<TouchableOpacity
							onPress={() => goToCall(8169099239)}
							style={{ marginRight: 5 }}>

							<CallSvg />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => gotoChat(8169099239)}

							style={{ marginLeft: 5 }}>
							<WhatAppSvg />
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<CustomAlert
				title={"ALert"}
				desc={alertText}
				leftButtonText={"Ok"}
				leftButtonFunction={leftButtonFunction}
				toggleCustomAlertVisibility={toggleCustomAlertVisibility}
				customAlertVisible={customAlertVisible}
			/>
		</KeyboardAvoidingView>
	)
};
const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(null, mapDispatchToProps)(NBHLoginScreen);