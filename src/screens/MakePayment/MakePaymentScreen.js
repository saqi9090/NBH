import OTPInputView from '@twotalltotems/react-native-otp-input';
import React from 'react';
import { BackHandler, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors, Constants, Fonts, ScreenNames, Server } from '../../global';
import OTPTextInput from 'react-native-otp-textinput';
import { globalStyles } from '../../global/globalStyles';
import { styles } from './MakePaymentStyles'
import axios from 'axios';
import SmsRetriever from 'react-native-sms-retriever';
import CustomAlert from '../../components/CustomAlert/CusomAlert';
import Header from '../../components/Header/Header';
import AppleSvg from "../../assets/svg/Apple.svg"
import RNIap from 'react-native-iap'
import { connect } from 'react-redux';
import SystemNavigationBar from "react-native-system-navigation-bar";
import { useFocusEffect } from '@react-navigation/native';
import { getService } from '../../services/getService';

const Items = Platform.select({
	ios: [
		"nbhApp2999",
		"nbhAutoRenew2999",
		"veganburger500"],
	android: ['']
})
const MakePaymentScreen = ({ navigation, route, params, dispatch }, props) => {





	useFocusEffect(
		React.useCallback(() => {
			const onBackPress = () => {
				return true
			};

			BackHandler.addEventListener(
				'hardwareBackPress', onBackPress
			);

			return () => {
				SystemNavigationBar.navigationShow()
				BackHandler.removeEventListener(
					'hardwareBackPress', onBackPress
				);
			}
		}, [])
	);

	React.useEffect(() => {
		console.warn("route.params.NavBar", route.params.NavBar);
		if (route.params.NavBar) {

			SystemNavigationBar.navigationHide()
		}
		else {
			null
		}
	}, [])


	// React.useEffect(() => {
	// 	SystemNavigationBar.navigationHide()
	// }, [])

	// BackHandler.addEventListener('hardwareBackPress', () => true)
	// return () => {
	// 	BackHandler.removeEventListener('hardwareBackPress', () => true)
	// }

	//Variables

	//States
	const [customAlertVisible, setCustomAlertVisible] = React.useState(false)
	const [purchased, setPurchase] = React.useState(false)
	const [products, setProducts] = React.useState({})
	const [isLoading, setIsLoading] = React.useState(false)
	const [applePayDisabled, setApplePayDisabled] = React.useState(true)

	//useRef

	//Functions
	const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
	const leftButtonFunction = () => {
		toggleCustomAlertVisibility()
	}
	const rightButtonFunction = () => {
		route.params.PaytoRegister()
		toggleCustomAlertVisibility()
	}

	const getForIos = async () => {
		try {
			// const response = await axios.get(`${Server.BASE_URL}/aboutUs/getForIos`)
			// setApplePayDisabled(response.data)


			const req = `/aboutUs/getForIos`
			getService(req).then((response) => {
				setApplePayDisabled(response.data)
			})


		} catch (error) {
			console.warn("getForIos", error.message);
		}
	}

	React.useEffect(() => {
		getForIos()
	}, [])
	//UseEffect

	let purchaseUpdatedListener = null;

	let purchaseErrorSubscription = null;
	React.useEffect(() => {
		if (Platform.OS == "ios") {
			RNIap.initConnection().catch(() => {
				console.log("error connection to store")
			}).then(async () => {
				console.log("Connected to store")
				console.warn(Items);
				RNIap.getSubscriptions(Items).catch((error) => {
					console.log("error finding perchases", error.message)
				}).then((res) => {
					console.log('got products')
					console.log(res)

					setProducts(res)
				})
			})

			purchaseUpdatedListener = RNIap.purchaseUpdatedListener((purchase) => {
				try {
					const reciept = purchase.transactionReceipt
					console.log(reciept);
					route.params.ApplePayUser()
					setPurchase(true)
				} catch (error) {
					console.warn(error);
				}
			})
		}
	}, [])

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
				<Header name={"Make Payment"} backgroundColor={true} activateLeftIcon={true} />
			</View>
			<ScrollView keyboardShouldPersistTaps={Platform.OS === "android" ? "always" : "handled"}>
				<View style={{ marginTop: 20, marginLeft: 20 }}>
					<Text style={{ fontSize: 18, fontFamily: Fonts.BOLD }}>
						Name: {route.params.name}
					</Text>
					<Text style={{ fontSize: 18, fontFamily: Fonts.BOLD }}>
						Plan: {route.params.planDetails}
					</Text>
				</View>
				<View style={{ height: 1, backgroundColor: Colors.GRAY_MEDIUM, marginVertical: 15 }} />
				<View style={{ marginLeft: 20 }}>
					<Text style={{ fontSize: 18, fontFamily: Fonts.BOLD }}>
						Pay with:
					</Text>
					<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
						{
							Platform.OS === 'ios'
								?
								!applePayDisabled
								&&
								<TouchableOpacity onPress={toggleCustomAlertVisibility}
									disabled={isLoading}>
									<Image
										style={{ height: 100, width: Constants.SCREEN_WIDTH / 2 - 40 }}
										resizeMode="contain"
										source={require('../../assets/images/razor.png')}
									/>
								</TouchableOpacity>
								:
								<TouchableOpacity onPress={toggleCustomAlertVisibility}
									disabled={isLoading}>
									<Image
										style={{ height: 100, width: Constants.SCREEN_WIDTH / 2 - 40 }}
										resizeMode="contain"
										source={require('../../assets/images/razor.png')}
									/>
								</TouchableOpacity>
						}

						{
							applePayDisabled
							&&
							<View style={{ height: 100, width: Constants.SCREEN_WIDTH / 2 - 40, alignItems: "flex-end", justifyContent: "center" }}>

								{Platform.OS === 'android' ?
									null
									:

									<TouchableOpacity
										disabled={isLoading}
										onPress={() => {
											setIsLoading(true)
											RNIap.requestSubscription('nbhApp2999').then(() => {
												setIsLoading(false)
											})
										}} style={{ marginRight: 20, marginTop: 10 }} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
										<AppleSvg />
									</TouchableOpacity>
								}
							</View>}
					</View>

				</View>
			</ScrollView>
			<CustomAlert
				desc={"Pay with RazorPay"}
				leftButtonText={"CANCEL"}
				rightButtonText={"CONFIRM"}
				rightButtonFunction={rightButtonFunction}
				leftButtonFunction={leftButtonFunction}
				toggleCustomAlertVisibility={toggleCustomAlertVisibility}
				customAlertVisible={customAlertVisible}
			/>
		</KeyboardAvoidingView >
	)
};

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(null, mapDispatchToProps)(MakePaymentScreen);