import OTPInputView from '@twotalltotems/react-native-otp-input';
import React from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors, Fonts, ScreenNames, Server } from '../../global';
import OTPTextInput from 'react-native-otp-textinput';
import { globalStyles } from '../../global/globalStyles';
import { styles } from './NBhOTPStyles'
import { connect } from 'react-redux';
import * as UserAction from '../../redux/actions/userActions'
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import { BASE_URL } from '../../global/server';
import SmsRetriever from 'react-native-sms-retriever';
import CustomAlert from '../../components/CustomAlert/CusomAlert';
import { getService } from '../../services/getService';

const NBHOTPScreen = ({ navigation, route, params, dispatch }, props) => {

	//Variables
	const user = {
		userId: 1,
		userName: "Dummy User",
		email: "dummyuser@user.com",
		dob: "2000-10-30",
		anniversaryDate: "2000-02-29",
		phone: route.params.phone
	}

	//States
	const otpInput = React.useRef(null);
	const [code, setCode] = React.useState('023405');
	const [minutes, setMinutes] = React.useState(1);
	const [timerValue, setTimerValue] = React.useState(30);
	const [resend, setResend] = React.useState(false);
	const [customAlertVisible, setCustomAlertVisible] = React.useState(false)


	//useRef
	const timerRef = React.useRef();

	//Functions
	const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
	const leftButtonFunction = () => {
		toggleCustomAlertVisibility()
	}
	const startTimer = async () => {
		try {

			await axios.get(`${Server.BASE_URL}/sms/otp/${route.params.number}`)
			timerRef.current = setInterval(() => {
				setTimerValue(prevTimerValue => prevTimerValue - 1);
			}, 1000);
			const registered = await SmsRetriever.startSmsRetriever();
			if (registered) {
				SmsRetriever.addSmsListener(e => {
					if (e.message) {
						let res = e.message.split(":")
						otpInput.current.setValue(res[1].slice(1, 7))
						console.log(res[1].slice(1, 7));
						setCode(res[1].slice(1, 7))
						SmsRetriever.removeSmsListener();
					}
				});
			}
		} catch (error) {

		}
	};

	const resendOtp = () => {
		setMinutes(1)
		setTimerValue(30)
		startTimer()
		setResend(false)
		return () => {
			clearInterval(timerRef.current);
		};
	}

	const verifyOtp = async () => {

		const req = `/sms/otp/validate/${route.params.number}/${code}`
		getService(req).then((response) => {
			if (response.data) {
				navigation.replace(ScreenNames.NBHCREATENEWPASSWOERD, { number: route.params.number })
			} else {
				toggleCustomAlertVisibility()
			}
		})


	}

	//UseEffect
	React.useEffect(() => {
		startTimer()
		return () => {
			clearInterval(timerRef.current);
		};
	}, []);

	React.useEffect(() => {
		if (timerValue === 0) {
			if (minutes > 0) {
				setTimerValue(59)
				setMinutes(0)
			} else {
				setResend(true)
				clearInterval(timerRef.current);
			}
		}
	}, [timerValue]);


	//UI
	return (

		<KeyboardAvoidingView behavior={Platform.OS == "android" ? null : "padding"} style={styles.mainScreen}>
			<View style={{
				shadowColor: "#000",
				shadowOffset: {
					width: 0,
					height: 1,
				},
				shadowOpacity: 0.22,
				shadowRadius: 2.22,

				elevation: 3, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, backgroundColor: Colors.WHITE
			}}>
				<FocusAwareStatusBar isLightBar={false} isTopSpace={true} isTransparent={false} />
				<View style={{ paddingLeft: 20, paddingVertical: 20 }}>
					<Image source={require("../../assets/images/NBH.png")} style={{ height: 40, width: 94 }} />
					<Text style={[styles.font1, { marginTop: 20 }]}>Verify OTP</Text>
				</View>
			</View>
			<ScrollView keyboardShouldPersistTaps={Platform.OS === "android" ? "always" : "handled"}>

				<View style={{ marginHorizontal: 20 }}>


					<View style={{ alignItems: "center", marginTop: Platform.OS === 'android' ? 70 : 0, paddingBottom: 30, }}>

						{
							Platform.OS === 'android'
								?
								<OTPTextInput
									handleTextChange={(item) => {
										setCode(item)
										if (item.length == 6) {
											Keyboard.dismiss();
										}
									}}
									ref={otpInput}
									inputCount={6}
									tintColor={"#c4c4c4"}
									offTintColor={"#c4c4c4"}
									containerStyle={{
									}}
									textInputStyle={[styles.subtitle, {
										// borderRadius: 5,
										borderColor: Colors.BLACK,
										// borderWidth: 1,
										borderBottomWidth: 2,
										height: 40,
										width: 40,
									}]} />
								:
								<OTPInputView
									style={{ width: '80%', height: 200 }}
									pinCount={6}
									ref={otpInput}
									// code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
									onCodeChanged={code => {
										setCode(code)
									}}
									autoFocusOnLoad={false}
									codeInputFieldStyle={styles.underlineStyleBase}
									codeInputHighlightStyle={styles.underlineStyleHighLighted}
									onCodeFilled={(code => {
										setCode(code)
										console.log(`Code is ${code}, you are good to go!`)
									})}
								/>
						}
						{
							resend
								?
								<TouchableOpacity style={{ fontFamily: Fonts.BOLD, color: "#000000", position: "absolute", left: 0, bottom: Platform.OS === 'android' ? -5 : 70 }} onPress={resendOtp}>
									<Text style={{ fontSize: 18, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYX_60 }}>Resend code</Text>
								</TouchableOpacity>
								:
								<Text style={{ fontSize: 18, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYX_60, position: "absolute", right: 0, bottom: Platform.OS === 'android' ? -5 : 70 }}>{minutes}:{timerValue} min left</Text>

						}
					</View>
				</View>
			</ScrollView>
			<View style={{ justifyContent: "flex-end" }}>
				<TouchableOpacity
					onPress={verifyOtp}
					style={{
						...globalStyles.button, marginHorizontal: 30,
						marginBottom: 30
					}} >
					<Text style={globalStyles.buttonText}>
						Verify OTP
					</Text>
				</TouchableOpacity>
			</View>
			<CustomAlert
				title={"Alert"}
				desc={"Invalid OTP"}
				leftButtonText={"Ok"}
				leftButtonFunction={leftButtonFunction}
				toggleCustomAlertVisibility={toggleCustomAlertVisibility}
				customAlertVisible={customAlertVisible}
			/>
		</KeyboardAvoidingView >
	)
};
// const mapStateToProps = (state) => {
// 	return {
// 		contactId: state.brand.contactId,
// 		country: state.brand.country,
// 		brandId: state.brand.brandId,
// 		brandInterest: state.brand.brandInterest,
// 		currentUserType: state.user.currentUserType,

// 	};
// };

// const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default NBHOTPScreen;