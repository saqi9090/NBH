import React from 'react';
import { Alert, FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors, Fonts, Server } from '../../global';
import { globalStyles } from '../../global/globalStyles';
import { styles } from './SignUpStyles';
import { ScreenNames } from '../../global/index';
import EyecloseSvg from "../../assets/svg/eye-off.svg";
import EyeSvg from "../../assets/svg/eye.svg";
import { memberplane, registerdata } from '../../components/DummyData/DummyDataScreen';
import DropdownSvg from "../../assets/svg/dropdown.svg"
import SelectMemberPlan from '../../components/SelectMemberPlan/SelectMemberPlan';
import SelectDiscountMode from '../../components/SelectDiscountMode/SelectDiscountMode';
import messaging from '@react-native-firebase/messaging';
import RazorpayCheckout from 'react-native-razorpay';
import CustomAlert from '../../components/CustomAlert/CusomAlert';
import axios from 'axios';
import { connect } from 'react-redux';
import * as UserActions from '../../redux/actions/userActions'
import AsyncStorage from '@react-native-community/async-storage';
import { notificationManager } from '../../../NotificationManagerIOS';
import database from '@react-native-firebase/database'
import moment from 'moment';
import { CommonActions } from '@react-navigation/routers';
import { useNavigation } from '@react-navigation/core';
import { getService } from '../../services/getService';
import { postRequest } from '../../services/postService';
import { SCREEN_WIDTH } from '../../global/constants';
import CrossSvg from "../../assets/svg/crossSmall.svg"


const SignUpScreen = ({ dispatch }) => {
	const navigation = useNavigation()

	//Variables

	//States
	const [number, setNumber] = React.useState('');
	const [eye, setEye] = React.useState(true);
	const [eye2, setEye2] = React.useState(true);
	const [Register, setRegister] = React.useState(0);
	const [memberPlane, setMemberPlane] = React.useState(false);
	const [memberPlaneTextValue, setMemberPlaneTextValue] = React.useState("");
	const [selectedPlanId, setSelectedPlanId] = React.useState(0);

	const [discountCode, SetDiscountCode] = React.useState(false);
	const [discountCodeTextValue, setDiscountCodeTextValue] = React.useState("Select Discount Mode");
	const [applePayDisabled, setApplePayDisabled] = React.useState(false)



	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [mobileNumber, setMobileNumber] = React.useState("");
	const [gstNumber, setGstNumber] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirmpassword, setConfirmpassword] = React.useState("");
	const [customAlertVisible, setCustomAlertVisible] = React.useState(false)
	// const [loading, setLoading] = React.useState(false)
	const [alertText, setAlertText] = React.useState('');

	const [customAlertVisible2, setCustomAlertVisible2] = React.useState(false)
	// const [loading, setLoading] = React.useState(false)
	const [alertText2, setAlertText2] = React.useState('');
	const [removeData, setRemoveData] = React.useState(true)



	const [referralCode, setreferralCode] = React.useState('');


	const [total, setTotal] = React.useState(null);




	// const [existUser, setExistUser] = React.useState(false);



	//Refs

	//Functions
	const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }

	const leftButtonFunction = () => {
		toggleCustomAlertVisibility()
	}


	const toggleCustomAlertVisibility2 = () => { setCustomAlertVisible2(!customAlertVisible2) }

	const leftButtonFunction2 = () => {
		toggleCustomAlertVisibility2()
	}
	// React.useEffect(() => {
	// 	setDiscountCodeTextValue("Select Discount Mode")
	// }, [])

	const reffralCode = () => {
		if (!referralCode.trim()) {
			setAlertText("Please Fill Referral Code")
			toggleCustomAlertVisibility()
		}
		else {
			if (removeData) {
				setRemoveData(!removeData)
				onBlur1()
			} else {
				setRemoveData(!removeData)
				setreferralCode('')
			}
		}
	}

	const resetStackAndGoToUser = CommonActions.reset({
		index: 1,
		routes: [{ name: ScreenNames.EDITPROFILE_SCREEN, params: { edit: 1 } }],

	});

	const completePayment = async (razorpayDetail) => {

		let t = "";
		const p = await messaging().hasPermission()
		if (p == 1) {
			t = await messaging().getToken()
			dispatch(UserActions.setToken(t))

		}
		const signUpData = {
			"firstName": firstName,
			"lastName": lastName,
			"email": email,
			"phone": mobileNumber,
			"password": password,
			"businessName": "",
			"category": "",
			userId: 0,
			"subCategory": "",
			"aboutMember": "",
			"gstNo": gstNumber,
			"referredByReferralCode": discountCodeTextValue == "MEMBER_REFERRAl" ? referralCode : "EMPTY",
			"website": "",
			"officeContactNo": "",
			"officeAddress": "",
			"registrationToken": t,
			"officeCity": "",
			"whatsAppNumber": "",
			"razorpayDetail": {
				"razorpayOrderId": razorpayDetail.razorpay_order_id,
				"razorpayPaymentId": razorpayDetail.razorpay_payment_id,
				"razorpaySignature": razorpayDetail.razorpay_signature
			}
		}

		const uri = `/razorPay/verifySignatureForNewUser/discountMode/${discountCodeTextValue == "Select Discount Mode" ? "EMPTY" : discountCodeTextValue}/referralCode/${discountCodeTextValue == "Select Discount Mode" ? "0" : referralCode}/planId/${selectedPlanId}`
		const body = signUpData
		postRequest(uri, body).then((userDetails) => {

			if (userDetails.code == 200) {

				createUserNode(userDetails.data.userId.toString(), userDetails.data.name, userDetails.data.phone)
				dispatch(UserActions.setUserId(userDetails.data.userId))
				dispatch(UserActions.setName(userDetails.data.name))
				dispatch(UserActions.setFirstName(userDetails.data.firstName))
				dispatch(UserActions.setLastName(userDetails.data.lastName))
				dispatch(UserActions.setPhone(userDetails.data.phone))
				dispatch(UserActions.setEmail(userDetails.data.email))
				dispatch(UserActions.setReferralCode(userDetails.data.referralCode))

				AsyncStorage.setItem("userId", userDetails.data.userId.toString())
			} else {
				setAlertText2(userDetails.message)
				toggleCustomAlertVisibility2()
			}

		})
		//   navigation.navigate(ScreenNames.BOTTOM_TABS)
		navigation.dispatch(resetStackAndGoToUser)

	}
	const addUser = (userId, userName, userPhone) => {
		database().ref('MobileUser').child(userId).set({
			userId: userId,
			userName: userName,
			userPhone: userPhone,
			time: Date.now(),
			active: true,
			date: moment(Date.now()).format('l'),
		})
		return null;
	}

	const onBlur1 = async () => {

		if (discountCodeTextValue && memberPlaneTextValue.memberPlanId && referralCode) {


			console.warn("discountCodeTextValue", discountCodeTextValue);
			console.warn("memberPlaneTextValue.memberPlanId", memberPlaneTextValue.memberPlanId);
			console.warn("referralCode", referralCode);

			const req = `/razorPay/validate/discountMode/${discountCodeTextValue}/planId/${memberPlaneTextValue.memberPlanId}/referralCode/${referralCode}`
			getService(req).then((response) => {
				if (response.code == 200) {
					setTotal((response.data.discount).toFixed(2))
				} else {
					setAlertText2(response.message)
					toggleCustomAlertVisibility2()
				}
			})


		}
	}


	React.useEffect(() => {
		setDiscountCodeTextValue("Select Discount Mode")
		setTotal(memberPlaneTextValue.finalCost)
		setreferralCode('')
	}, [memberPlaneTextValue])
	React.useEffect(() => {
		setTotal(memberPlaneTextValue.finalCost)
		setreferralCode('')
	}, [discountCodeTextValue])

	const createUserNode = (userId, userName, userPhone) => {
		database().ref('MobileUser').child(userId).once('value', (Users) => {
			if (!Users.exists()) {

				addUser(userId, userName, userPhone)
			} else {
				const User = Users.forEach(element => {
					if (userId === element.val().userId) {
						return true
					}
				});
				if (!User) {
					addUser(userId, userName, userPhone)
				}
			}
		})
	}

	const referralCodeAlert = () => {
		setAlertText("please Fill ReferralCode")
		toggleCustomAlertVisibility()
	}


	const PaytoRegister = async () => {

		// console.warn("sdas");
		if (!firstName.trim()) {
			setAlertText("Please Enter First Name")
			toggleCustomAlertVisibility()
		}
		else if (!lastName.trim()) {
			setAlertText("Please Enter Last Name")
			toggleCustomAlertVisibility()
		}
		else if (!email.trim()) {
			setAlertText("Please Enter Email")
			toggleCustomAlertVisibility()
		}
		else if (!mobileNumber.trim()) {
			setAlertText("Please Enter Mobile Number")
			toggleCustomAlertVisibility()
		}
		else if (!password.trim()) {
			setAlertText("Please Enter Password")
			toggleCustomAlertVisibility()
		}
		else if (!confirmpassword.trim()) {
			setAlertText("Please Enter Confirm Password")
			toggleCustomAlertVisibility()
		}
		else if (confirmpassword.trim() != password.trim()) {
			setAlertText("Password Does Not Match")
			toggleCustomAlertVisibility()
		}
		else if (selectedPlanId == 0) {
			setAlertText("Please Select Member Plan")
			toggleCustomAlertVisibility()
		}
		else {
			if (Register == 0) {
				if (!gstNumber.trim()) {
					setAlertText("Please Enter GST Number")
					toggleCustomAlertVisibility()
				} else {
					if (discountCodeTextValue != "Select Discount Mode") {

						// console.warn(`${Server.BASE_URL}/razorPay/validate/discountMode/${discountCodeTextValue}/planId/${memberPlaneTextValue.memberPlanId}/referralCode/${referralCode}`);
						// const response = await axios.get(`${Server.BASE_URL}/razorPay/validate/discountMode/${discountCodeTextValue}/planId/${memberPlaneTextValue.memberPlanId}/referralCode/${referralCode}`)
						// navigation.navigate(ScreenNames.MAKEPAYMENT_SCREEN, {
						// 	PaytoRegister: PaytoRegisterWithGST, name: firstName + " " + lastName,
						// 	planDetails: `${memberPlaneTextValue.memberTitle} (${memberPlaneTextValue.baseCount} + ${memberPlaneTextValue.gstPercent}% - ${memberPlaneTextValue.finalCost - response.data.discount}) = ${response.data.discount}`,
						// 	ApplePayUser: postApplePayUser, NavBar: true
						// })

						const req = `/razorPay/validate/discountMode/${discountCodeTextValue}/planId/${memberPlaneTextValue.memberPlanId}/referralCode/${referralCode}`
						getService(req).then((response) => {
							if (response.code == 200) {


								navigation.navigate(ScreenNames.MAKEPAYMENT_SCREEN, {
									PaytoRegister: PaytoRegisterWithGST, name: firstName + " " + lastName,
									planDetails: `${memberPlaneTextValue.memberTitle} (${memberPlaneTextValue.baseCount} + ${memberPlaneTextValue.gstPercent}% - ${memberPlaneTextValue.finalCost - response.data.discount}) = ${response.data.discount}`,
									ApplePayUser: postApplePayUser, NavBar: true
								})

							} else {
								if (discountCodeTextValue != "Select Discount Mode") {
									if (referralCode == "") {
										setAlertText2("Please Enter Code")
										toggleCustomAlertVisibility2()
									} else {
										setAlertText2((response.message).toString())
										toggleCustomAlertVisibility2()
									}
								}
							}
						})


					} else {
						navigation.navigate(ScreenNames.MAKEPAYMENT_SCREEN, { PaytoRegister: PaytoRegisterWithGST, name: firstName + " " + lastName, planDetails: `${memberPlaneTextValue.memberTitle} (${memberPlaneTextValue.baseCount} + ${memberPlaneTextValue.gstPercent}%) = ${memberPlaneTextValue.finalCost.toFixed(2)}`, ApplePayUser: postApplePayUser, NavBar: true })

					}
				}

			} else {
				if (discountCodeTextValue != "Select Discount Mode") {


					const req = `/razorPay/validate/discountMode/${discountCodeTextValue}/planId/${memberPlaneTextValue.memberPlanId}/referralCode/${referralCode}`
					getService(req).then((response) => {
						if (response.code == 200) {
							navigation.navigate(ScreenNames.MAKEPAYMENT_SCREEN, { PaytoRegister: PaytoRegisterWithoutGST, name: firstName + " " + lastName, planDetails: `${memberPlaneTextValue.memberTitle} (${memberPlaneTextValue.baseCount} + ${memberPlaneTextValue.gstPercent}% - ${memberPlaneTextValue.finalCost - response.data.discount}) = ${response.data.discount}`, ApplePayUser: postApplePayUser, NavBar: true })
						} else {
							if (discountCodeTextValue != "Select Discount Mode") {
								if (referralCode == "") {
									setAlertText2("Please Enter Code")
									toggleCustomAlertVisibility2()
								} else {
									setAlertText2(response.message)
									toggleCustomAlertVisibility2()
								}
							}
						}
					})


				} else {
					navigation.navigate(ScreenNames.MAKEPAYMENT_SCREEN, { PaytoRegister: PaytoRegisterWithoutGST, name: firstName + " " + lastName, planDetails: `${memberPlaneTextValue.memberTitle} (${memberPlaneTextValue.baseCount} + ${memberPlaneTextValue.gstPercent}%) = ${memberPlaneTextValue.finalCost.toFixed(2)}`, ApplePayUser: postApplePayUser, NavBar: true })

				}
			}
		}

	}


	const postApplePayUser = async () => {
		let t = "";
		const p = await messaging().hasPermission()
		if (p == 1) {
			t = await messaging().getToken()
			dispatch(UserActions.setToken(t))

		}
		const signUpData = {
			"firstName": firstName,
			"lastName": lastName,
			"email": email,
			"phone": mobileNumber,
			"password": password,
			"businessName": "",
			"category": "",
			userId: 0,
			"subCategory": "",
			"aboutMember": "",
			"gstNo": gstNumber,
			"referredByReferralCode": discountCodeTextValue == "MEMBER_REFERRAl" ? referralCode : "EMPTY",
			"website": "",
			"officeContactNo": "",
			"officeAddress": "",
			"registrationToken": t,
			"officeCity": "",
			"whatsAppNumber": "",
		}
		// const userDetails = await axios.post(`${Server.BASE_URL}/razorPay/saveUser/discountMode/${discountCodeTextValue == "Select Discount Mode" ? "EMPTY" : discountCodeTextValue}/referralCode/${discountCodeTextValue == "Select Discount Mode" ? "0" : referralCode}/planId/${selectedPlanId}`, signUpData)

		const uri = `/razorPay/saveUser/discountMode/${discountCodeTextValue == "Select Discount Mode" ? "EMPTY" : discountCodeTextValue}/referralCode/${discountCodeTextValue == "Select Discount Mode" ? "0" : referralCode}/planId/${selectedPlanId}`
		const body = signUpData
		postRequest(uri, body).then((userDetails) => {
			if (userDetails.code == 200) {


				createUserNode(userDetails.data.userId.toString(), userDetails.data.name, userDetails.data.phone)
				dispatch(UserActions.setUserId(userDetails.data.userId))
				dispatch(UserActions.setName(userDetails.data.name))
				dispatch(UserActions.setFirstName(userDetails.data.firstName))
				dispatch(UserActions.setLastName(userDetails.data.lastName))
				dispatch(UserActions.setPhone(userDetails.data.phone))
				dispatch(UserActions.setEmail(userDetails.data.email))
				dispatch(UserActions.setReferralCode(userDetails.data.referralCode))
				AsyncStorage.setItem("userId", userDetails.data.userId.toString())
				navigation.dispatch(resetStackAndGoToUser)

			} else {
				setAlertText2(userDetails.message)
				toggleCustomAlertVisibility2()
			}

		})
		//   navigation.navigate(ScreenNames.BOTTOM_TABS)
	}


	const PaytoRegisterWithGST = () => {

		const req = `/users/exists/${mobileNumber}`
		getService(req).then((response) => {

			if (response.code == 200) {



				// const response = await axios.get(`${Server.BASE_URL}/users/exists/${mobileNumber}`);
				if (response.data == true) {
					setAlertText("This User Is Already Exist!")
					toggleCustomAlertVisibility()
				} else {

					let t = ""
					const p = messaging().hasPermission()
					if (p == 1) {
						t = messaging().getToken()
						dispatch(UserActions.setToken(t))
					}
					const signUpData = {
						"firstName": firstName,
						"lastName": lastName,
						"email": email,
						"phone": mobileNumber,
						"password": password,
						"businessName": "",
						"category": "",
						userId: 0,
						"subCategory": "",
						"aboutMember": "",
						"gstNo": gstNumber,
						"registrationToken": t,
						"referredByReferralCode": discountCodeTextValue == "MEMBER_REFERRAl" ? referralCode : "EMPTY",
						"website": "",
						"officeContactNo": "",
						"officeAddress": "",
						"officeCity": "",
						"whatsAppNumber": "",
						"razorpayDetail": {
							"razorpayOrderId": "razorpayDetail.razorpay_order_id",
							"razorpayPaymentId": "razorpayDetail.razorpay_payment_id",
							"razorpaySignature": "razorpayDetail.razorpay_signature"
						}
					}
					// const response = await axios.post(`${Server.BASE_URL}/razorPay/createUser/discountMode/${discountCodeTextValue == "Select Discount Mode" ? "EMPTY" : discountCodeTextValue}/planId/${parseInt(selectedPlanId)}/referralCode/${discountCodeTextValue == "Select Discount Mode" ? "0" : referralCode}`, signUpData)

					const uri = `/razorPay/createUser/discountMode/${discountCodeTextValue == "Select Discount Mode" ? "EMPTY" : discountCodeTextValue}/planId/${parseInt(selectedPlanId)}/referralCode/${discountCodeTextValue == "Select Discount Mode" ? "0" : referralCode}`
					const body = signUpData
					postRequest(uri, body).then((response) => {

						if (response.code == 200) {
							const options = {
								description: 'Get Your Product',
								currency: 'INR',
								key: 'rzp_live_49A1dDF43qmmgG',
								// amount: applyvouchers.visible ? ((total - applyvouchers.price) * 100) : ((total + fewdays.deliveryCharge) * 100),
								amount: response.data.amount * 100,
								name: 'NBH',
								order_id: response.data.razorpayOrderId,
								prefill: {
									email: "nbhapp@gmail.com",
									contact: mobileNumber,
									name: firstName + " " + lastName
								},
								theme: { color: Colors.PRIMARY }
							}
							if (typeof response.data.amount != "undefined") {
								RazorpayCheckout
									.open(options)
									.then((data) => {
										// console.warn(data);
										completePayment(data)
									}).catch(async (error) => {
										// const data = await axios.get(`${Server.BASE_URL}/razorPay/orderId/${response.data.razorpayOrderId}`)

										const req = `/razorPay/orderId/${response.data.razorpayOrderId}`
										getService(req).then((response) => {
											if (response.code == 200) {


												if (data.data.status == "paid") {
													let data = {
														razorpay_order_id: response.data.razorpayOrderId,
														razorpay_payment_id: "detailNotFound",
														razorpay_signature: "detailNotFound"
													}
													completePayment(data)
												} else {
													// setActiveIndicator(false);
													console.warn("pay 1", error.message);
												}
											} else {
												setAlertText2(response.message)
												toggleCustomAlertVisibility2()
											}
										})
									});
							} else {
								createUserNode(response.data.userId.toString(), response.data.name, response.data.phone)
								dispatch(UserActions.setUserId(response.data.userId))
								dispatch(UserActions.setName(response.data.name))
								dispatch(UserActions.setFirstName(response.data.firstName))
								dispatch(UserActions.setLastName(response.data.lastName))
								dispatch(UserActions.setPhone(response.data.phone))
								dispatch(UserActions.setEmail(response.data.email))
								dispatch(UserActions.setReferralCode(response.data.referralCode))
								database().ref("LoginUser").child(response.data.userId.toString()).set({
									userId: response.data.userId,
									token: t,
								});
								AsyncStorage.setItem("userId", response.data.userId.toString())
								//   navigation.navigate(ScreenNames.BOTTOM_TABS)
								navigation.dispatch(resetStackAndGoToUser)
							}
						} else {
							setAlertText2(response.message)
							toggleCustomAlertVisibility2()
						}
					})

				}
			} else {
				setAlertText2(response.message)
				toggleCustomAlertVisibility2()
			}
		})
	}

	const PaytoRegisterWithoutGST = async () => {
		const signUpData = {
			"firstName": firstName,
			"lastName": lastName,
			"email": email,
			"phone": mobileNumber,
			"password": password,
			userId: 0,
			"businessName": "",
			"category": "",
			"subCategory": "",
			"aboutMember": "",
			"gstNo": "",
			"referredByReferralCode": discountCodeTextValue == "MEMBER_REFERRAl" ? referralCode : "EMPTY",
			"website": "",
			"officeContactNo": "",
			"officeAddress": "",
			"officeCity": "",
			"whatsAppNumber": "",
			"razorpayDetail": {
				"razorpayOrderId": "razorpayDetail.razorpay_order_id",
				"razorpayPaymentId": "razorpayDetail.razorpay_payment_id",
				"razorpaySignature": "razorpayDetail.razorpay_signature"
			}
		}
		// const response = await axios.get(`${Server.BASE_URL}/users/exists/${mobileNumber}`);

		const req = `/users/exists/${mobileNumber}`
		getService(req).then(async (response) => {

			if (response.code == 200) {

				if (response.data == true) {
					setAlertText("This User Is Already Exist!")
					toggleCustomAlertVisibility()
				} else {

					// console.warn(`${Server.BASE_URL}/razorPay/createUser/discountMode/${discountCodeTextValue == "Select Discount Mode" ? "EMPTY" : discountCodeTextValue}/planId/${parseInt(selectedPlanId)}/referralCode/${discountCodeTextValue == "Select Discount Mode" ? "0" : referralCode ? referralCode : "EMPTY"}`, signUpData);
					// const response = await axios.post(`${Server.BASE_URL}/razorPay/createUser/discountMode/${discountCodeTextValue == "Select Discount Mode" ? "EMPTY" : discountCodeTextValue}/planId/${parseInt(selectedPlanId)}/referralCode/${discountCodeTextValue == "Select Discount Mode" ? "0" : referralCode ? referralCode : "EMPTY"}`, signUpData)

					const uri = `/razorPay/createUser/discountMode/${discountCodeTextValue == "Select Discount Mode" ? "EMPTY" : discountCodeTextValue}/planId/${parseInt(selectedPlanId)}/referralCode/${discountCodeTextValue == "Select Discount Mode" ? "0" : referralCode ? referralCode : "EMPTY"}`
					const body = signUpData
					postRequest(uri, body).then((response) => {

						if (response.code == 200) {

							const options = {
								description: 'Get Your Product',
								currency: 'INR',
								key: 'rzp_live_49A1dDF43qmmgG',
								// amount: applyvouchers.visible ? ((total - applyvouchers.price) * 100) : ((total + fewdays.deliveryCharge) * 100),
								amount: response.data.amount * 100,
								name: 'NBH',
								order_id: response.data.razorpayOrderId,
								prefill: {
									email: "nbhapp@gmail.com",
									contact: mobileNumber,
									name: firstName + " " + lastName
								},
								theme: { color: Colors.PRIMARY }
							}
							if (typeof response.data.amount != "undefined") {
								RazorpayCheckout
									.open(options)
									.then((data) => {
										// console.warn(data);
										completePayment(data)
									}).catch(async (error) => {
										// const data = await axios.get(`${Server.BASE_URL}/razorPay/orderId/${response.data.razorpayOrderId}`)
										const req = `/razorPay/orderId/${response.data.razorpayOrderId}`
										getService(req).then((response) => {

											if (response.code == 200) {


												if (data.data.status == "paid") {
													let data = {
														razorpay_order_id: response.data.razorpayOrderId,
														razorpay_payment_id: "detailNotFound",
														razorpay_signature: "detailNotFound"
													}
													completePayment(data)
												} else {
													// setActiveIndicator(false);
													console.warn("pay 1", error.message);
												}
											} else {
												setAlertText2(response.message)
												toggleCustomAlertVisibility2()
											}
										})
									});
							} else {
								const p = messaging().hasPermission()
								if (p == 1) {
									notificationManager.configure(response.data.userId)
								}

								createUserNode(response.data.userId.toString(), response.data.name, response.data.phone)
								dispatch(UserActions.setUserId(response.data.userId))
								dispatch(UserActions.setName(response.data.name))
								dispatch(UserActions.setFirstName(response.data.firstName))
								dispatch(UserActions.setLastName(response.data.lastName))
								dispatch(UserActions.setPhone(response.data.phone))
								dispatch(UserActions.setEmail(response.data.email))
								dispatch(UserActions.setReferralCode(response.data.referralCode))
								AsyncStorage.setItem("userId", response.data.userId.toString())
								//   navigation.navigate(ScreenNames.BOTTOM_TABS)
								navigation.dispatch(resetStackAndGoToUser)
							}
						} else {
							if (discountCodeTextValue != "Select Discount Mode") {
								if (referralCode == "") {
									setAlertText2("Please Enter Code")
									toggleCustomAlertVisibility2()
								}
							}
						}
					})


				}
			} else {
				setAlertText2(response.message)
				toggleCustomAlertVisibility2()
			}
		})
	}


	//Refs

	//Functions
	const Login = () => {
		navigation.navigate(ScreenNames.NBHLOGIN, { number: "9890001103", Conduction: false })
	}

	const GoBottomTab = () => {
		navigation.navigate(ScreenNames.BOTTOM_TABS, { number: "9890001103", Conduction: false })
	}

	const _toggleMemberPlaneModal = () => {
		setMemberPlane(!memberPlane)
	}

	const _toggleDiscountMode = () => {
		SetDiscountCode(!discountCode)
	}
	const getForIos = async () => {
		const req = `/aboutUs/getForIos`
		getService(req).then((response) => {
			if (response.code == 200) {
				setApplePayDisabled(response.data)
			} else {
				setAlertText2(response.message)
				toggleCustomAlertVisibility2()
			}
		})
	}

	React.useEffect(() => {
		getForIos()
	}, [])

	//UseEffect

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
					<Image source={require("../../assets/images/NBH.png")} style={{ height: 40, width: 94 }} />
					<Text style={[styles.font1, { marginTop: 20, fontSize: 20 }]}>Sign Up at NBH</Text>
				</View>
			</View>
			<View style={{ flex: 1, backgroundColor: Colors.WHITE }} >
				<ScrollView showsVerticalScrollIndicator={false}>


					<View style={{ marginTop: 30 }}>

						<Text style={[styles.font1, { marginVertical: 0, marginBottom: 10, marginHorizontal: 20, fontFamily: Fonts.SEMIBOLD }]}>Select GST Registered/Unregistered</Text>
						<FlatList data={registerdata}
							renderItem={({ item, index }) => (

								<TouchableOpacity
									onPress={() => setRegister(index)}
									activeOpacity={0.7}
									style={[styles.signUpTextStyle, { marginHorizontal: 20, flexDirection: "row", alignItems: "center", marginBottom: index == 0 ? 10 : 20, justifyContent: "space-between", marginTop: 10 }]}>
									<Text style={styles.font2} >{item.name}</Text>
									<View
									// style={{ marginLeft: index == 0 ? 24 : 10 }}
									>
										<View style={{ height: 17, width: 17, borderRadius: 100, borderWidth: 1, borderColor: Colors.JUNGLE_BLACK, alignItems: "center", justifyContent: "center" }}>
											{
												Register == index ?
													<View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: Colors.JUNGLE_BLACK }}></View>
													:
													null
											}
										</View>
									</View>

								</TouchableOpacity>

							)}
						/>
						{Register == 0 ?
							<View style={{ marginHorizontal: 20, }}>
								<TextInput
									placeholderTextColor={Colors.BLACK}
									onChangeText={text => setGstNumber(text.toUpperCase())}
									maxLength={15}
									autoCapitalize={"characters"}
									// value={gstNumber}
									// keyboardType="number-pad"
									style={styles.signUpTextStyle}

									placeholder="Gst Number"></TextInput>
								{/* <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View> */}
							</View>
							: null
						}

						<View style={{ marginHorizontal: 20, }}>
							<TextInput
								placeholderTextColor={Colors.BLACK}
								onChangeText={text => setFirstName(text)}

								// onChangeText={text => setBussinessCategray(text)}

								// style={styles.filterinput}

								style={styles.signUpTextStyle}
								placeholder="First Name">
							</TextInput>
							{/* <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View> */}
						</View>
						<View style={{ marginHorizontal: 20, }}>
							<TextInput
								placeholderTextColor={Colors.BLACK}
								onChangeText={text => setLastName(text)}

								// style={styles.filterinput}
								style={styles.signUpTextStyle}
								placeholder="Last Name"></TextInput>
							{/* <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View> */}
						</View>
						<View style={{ marginHorizontal: 20 }}>
							<TextInput
								placeholderTextColor={Colors.BLACK}
								onChangeText={text => setEmail(text)}

								// style={styles.filterinput}
								style={styles.signUpTextStyle}
								placeholder="Email Id">
							</TextInput>
							{/* <View style={{ height: 1.7, width: "100%", backgroundColor: "#97979975" }}></View> */}
						</View>
						<View style={{ marginHorizontal: 20 }}>
							<TextInput
								maxLength={10}
								placeholderTextColor={Colors.BLACK}
								onChangeText={text => setMobileNumber(text)}

								keyboardType="phone-pad"
								// style={styles.filterinput}
								style={styles.signUpTextStyle}
								placeholder="Mobile Number"></TextInput>
							{/* <View style={{ height: 1.7, width: "100%", backgroundColor: "#97979975" }}></View> */}
						</View>

						<View style={{ marginHorizontal: 20 }}>
							<View style={[styles.signUpTextStyle, {
								flexDirection: "row",
								alignItems: "center",
							}]}>
								<View style={{ flex: 0.9 }}>
									<TextInput
										placeholderTextColor={Colors.BLACK}
										onChangeText={text => setPassword(text)}

										// style={styles.filterinput}

										secureTextEntry={eye ? true : false}
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
							{/* <View style={{ height: 1.7, width: "100%", backgroundColor: "#97979975" }}></View> */}
						</View>

						<View style={{ marginHorizontal: 20 }}>
							<View style={[styles.signUpTextStyle, {
								flexDirection: "row",
								alignItems: "center",
							}]}>
								<View style={{ flex: 0.9 }}>
									<TextInput
										placeholderTextColor={Colors.BLACK}
										onChangeText={text => setConfirmpassword(text)}

										secureTextEntry={eye2 ? true : false}
										// style={styles.filterinput}
										placeholder="Confirm Password"></TextInput>
								</View>
								<View style={{ flex: 0.1, marginLeft: 5 }}>
									<TouchableOpacity onPress={() => setEye2(!eye2)}>
										{
											eye2 ?
												<EyecloseSvg />
												:
												<EyeSvg />
										}
									</TouchableOpacity>
								</View>
							</View>
							{/* <View style={{ height: 1.7, width: "100%", backgroundColor: "#97979975" }}></View> */}
						</View>
					</View>
					<View>



						<View style={{ marginHorizontal: 20, marginVertical: 5 }}>

							<TouchableOpacity
								onPress={_toggleMemberPlaneModal}
								style={[styles.signUpTextStyle, { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}
							>
								<View style={{ flex: 1 }}>
									<Text numberOfLines={1} style={[{ fontSize: 15, color: Colors.ONYX_60, fontFamily: Fonts.SEMIBOLD }]}>{memberPlaneTextValue == "" ? "Membership plan" : `${memberPlaneTextValue.memberTitle} (${memberPlaneTextValue.baseCount} + ${memberPlaneTextValue.gstPercent}%) = ${memberPlaneTextValue.finalCost}`}</Text>
								</View>
								<View
									hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}

									style={{ height: 20, width: 20, alignItems: "center", justifyContent: "center" }}>
									<DropdownSvg />
								</View>
							</TouchableOpacity>
							{/* <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View> */}

							<SelectMemberPlan
								_toggleMemberPlaneModal={_toggleMemberPlaneModal}
								memberPlane={memberPlane}
								selectedPlanId={selectedPlanId}
								setSelectedPlanId={setSelectedPlanId}
								memberPlaneTextValue={memberPlaneTextValue}
								setMemberPlaneTextValue={setMemberPlaneTextValue}
								memberHeader={"Membership plan"} />

						</View>
						{
							Platform.OS === "ios"
								?
								!applePayDisabled
								&&
								<View style={{ marginHorizontal: 20 }}>

									<TouchableOpacity
										onPress={_toggleDiscountMode}
										// style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, marginBottom: 15 }}
										style={[styles.signUpTextStyle, {
											flexDirection: "row", justifyContent: "space-between",
											alignItems: "center"
										}]}
									>
										<View style={{ flex: 1, paddingRight: 10 }}>
											<Text numberOfLines={1} style={[{ fontSize: 16, color: Colors.ONYX_60, fontFamily: Fonts.SEMIBOLD }]}>{discountCodeTextValue == "" ? "Select Discount Mode" : discountCodeTextValue == "EMPTY" ? "None" : discountCodeTextValue}</Text>
										</View>

										<View
											hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}

											style={{ height: 20, width: 20, alignItems: "center", justifyContent: "center" }}>
											<DropdownSvg />
										</View>
									</TouchableOpacity>
									{/* <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View> */}
									<SelectDiscountMode _toggleDiscountMode={_toggleDiscountMode}
										setDiscountCodeTextValue={setDiscountCodeTextValue}
										discountCode={discountCode}
										discountCodeTextValue={discountCodeTextValue}
										memberHeader={"Select Member Plan"}
										DiscountMode={true} />

								</View>
								:
								<View style={{ marginHorizontal: 20 }}>

									<TouchableOpacity
										onPress={_toggleDiscountMode}
										// style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, marginBottom: 15 }}
										style={[styles.signUpTextStyle, { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}

									>
										<View style={{ flex: 1, paddingRight: 10 }}>
											<Text numberOfLines={1} style={[{ fontSize: 16, color: Colors.ONYX_60, fontFamily: Fonts.SEMIBOLD }]}>{discountCodeTextValue == "" ? "Select Discount Mode" : discountCodeTextValue == "EMPTY" ? "None" : discountCodeTextValue}</Text>
										</View>

										<View
											hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}

											style={{ height: 20, width: 20, alignItems: "center", justifyContent: "center" }}>
											<DropdownSvg />
										</View>
									</TouchableOpacity>
									{/* <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View> */}
									<SelectDiscountMode _toggleDiscountMode={_toggleDiscountMode}
										setDiscountCodeTextValue={setDiscountCodeTextValue}
										discountCode={discountCode}
										discountCodeTextValue={discountCodeTextValue}
										memberHeader={"Select Member Plan"}
										DiscountMode={true} />

								</View>
						}
					</View>
					<>
						{discountCodeTextValue != "Select Discount Mode" ?

							discountCodeTextValue === 'EMPTY' ? null : <View style={{ marginHorizontal: 20, }}>
								<View style={{ flexDirection: "row", alignItems: "center" }}>
									<View style={[styles.signUpTextStyle, { flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}
									>
										<TextInput
											editable={removeData ? true : false}
											onChangeText={text => setreferralCode(text)}
											// onBlur={() => onBlur1()}

											placeholderTextColor={Colors.GRAY_MEDIUM}
											style={{ width: SCREEN_WIDTH / 1.5 }}
											placeholder={discountCodeTextValue == "" ? "Select Discount Mode" : `ENTER ${discountCodeTextValue}`}>
											{referralCode}
										</TextInput>

										<TouchableOpacity onPress={reffralCode}>

											{

												removeData == true ?
													<Text style={[styles.font1, { color: Colors.ONYXOpacity, fontFamily: Fonts.SEMIBOLD, fontSize: 12 }]}>
														Apply
												</Text>
													:
													<View style={{ padding: 5, borderRadius: 50, backgroundColor: "#FFD64890" }}>
														<CrossSvg />
													</View>
											}
										</TouchableOpacity>
									</View>
									{/* <View style={{ flex: 0.1 }}>
								<TouchableOpacity style={{ marginTop: 7 }}>
									<Text style={styles.font3}>Apply</Text>
								</TouchableOpacity>
							</View> */}
									{/* <Text>dasd</Text> */}
								</View>
								{/* <View style={{ height: 1.7, width: "100%", backgroundColor: "#97979975" }}></View> */}
							</View>
							:
							null
						}
					</>

				</ScrollView>


			</View>


			<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 20, marginTop: 20 }}>
				<Text style={[{ fontSize: 17, color: Colors.JUNGLE_BLACK, fontFamily: Fonts.SEMIBOLD }]}>Total Price</Text>
				<Text style={[{ fontSize: 15, color: Colors.ONYX_60, fontFamily: Fonts.SEMIBOLD }]}>INR {total}</Text>
			</View>




			<View style={{ justifyContent: "flex-end", marginTop: 20 }}>
				<TouchableOpacity style={{ ...globalStyles.button }} onPress={PaytoRegister}>
					<Text style={globalStyles.buttonText}>
						Pay and Register
					</Text>
				</TouchableOpacity>
				<View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
					<Text style={{ color: "#16161650", fontFamily: Fonts.REGULAR, fontSize: 16 }}>
						Already have an account?
					</Text>
					<TouchableOpacity
						onPress={Login}
						style={{ paddingLeft: 5 }}>
						<Text style={{ color: Colors.ONYXOpacity, fontFamily: Fonts.REGULAR, fontSize: 16 }}>
							Sign In
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			<CustomAlert
				title={"Invalid Details"}
				desc={alertText}
				leftButtonText={"Ok"}
				leftButtonFunction={leftButtonFunction}
				toggleCustomAlertVisibility={toggleCustomAlertVisibility}
				customAlertVisible={customAlertVisible}
			/>
			<CustomAlert
				title={"Alert"}
				desc={alertText2}
				leftButtonText={"Ok"}
				leftButtonFunction={leftButtonFunction2}
				toggleCustomAlertVisibility={toggleCustomAlertVisibility2}
				customAlertVisible={customAlertVisible2}
			/>
		</KeyboardAvoidingView>
	)
};
const mapDispatchToProps = dispatch => ({ dispatch });

// export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
export default connect(null, mapDispatchToProps)(SignUpScreen);