import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ScrollView, TextInput, Image, Alert, Platform } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors, Constants, Fonts, ScreenNames, Server } from '../../global';
import Header from "../../components/Header/Header";
import { styles } from "./PostAdavertiseStyles";
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import { ImageExtenstion, PostAdPaymentType } from '../../components/DummyData/DummyDataScreen';
import UploadSvg from "../../assets/svg/upload.svg";
import { globalStyles } from '../../global/globalStyles';
import TermsandConditionModal from '../../components/TermsandConditionModal/TermsandConditionModal';
import { color } from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import CrossSvg from "../../assets/svg/crossSmall.svg"
import { SCREEN_WIDTH } from '../../global/constants';
import EditProfileModal from '../../components/EditProfileModal/EditProfileModal';
import CustomAlert from '../../components/CustomAlert/CusomAlert';
import axios from 'axios';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { BASE_URL } from '../../global/server';
import RazorpayCheckout from 'react-native-razorpay';
import HTML from "react-native-render-html";
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectMonth from '../../components/SelectMonth/SelectMonth';
import { getService } from '../../services/getService';
import { postRequest } from '../../services/postService';

// import 





const PostAdavertiseScreen = ({
	route,
	params, userId,
	userName, userImage, phNo, email
}) => {



	//state 
	const [payment, setPayment] = React.useState(0);
	const [termsCondition, setTermsCondition] = React.useState(false);
	const [testImage, setTestImage] = React.useState(``);
	const [selectIamgepicker, setSelectIamgepicker] = React.useState(false)
	const [alertText, setAlertText] = React.useState('');
	const [customAlertVisible, setCustomAlertVisible] = React.useState(false)
	const [couponCode, setCouponCode] = React.useState("")
	const [applePayDisabled, setApplePayDisabled] = React.useState(false)


	const [postDate, setPostDate] = React.useState([]);
	const [selectedDate, setSelectedDate] = React.useState()
	const [currentMonthData, setCurrentMonthData] = React.useState();
	const [selectedMonth, setSelectedMonthData] = React.useState();
	const [postImage, setPostImage] = React.useState('');
	const [offer, setOffer] = React.useState(null)
	const [myIndex, setMyIndex] = React.useState()
	const [removeData, setRemoveData] = React.useState(true)
	const [walletPoints, setWalletPoints] = React.useState(null);
	const [maxDate, setMaxDate] = React.useState(Platform.OS == "android" ? moment(Date.now()).endOf('month').format('YYYY-MM-DD') : moment(new Date()).endOf('month').format('YYYY-MM-DD[T00:00:00.000Z]'));
	const [minDate, setMinDate] = React.useState(Platform.OS == "android" ? moment(Date.now()).startOf('month').format('YYYY-MM-DD') : moment(new Date()).startOf('month').format('YYYY-MM-DD[T00:00:00.000Z]'));
	const [Todate, updateToDate] = React.useState('Select Post Date');
	const [monthVisible, setMonthVisible] = React.useState(false);
	const [selectedMonths, setSelectedMonth] = React.useState(null);
	const [termsAndCondition, setTermsAndCondition] = React.useState("");
	const isAndroid = Platform.OS === 'android';
	const [disable, setDisable] = React.useState(false)
	const [alertTitle, setAlertTitle] = React.useState("");



	const month = moment(new Date()).format('MMMM');


	const [customAlertVisible1, setCustomAlertVisible1] = React.useState(false);


	const toggleCustomAlertVisibility1 = () => { setCustomAlertVisible1(!customAlertVisible1) }
	const toggleMonthModal = () => { setMonthVisible(!monthVisible) }

	// const leftButtonFunction = () => {
	//     toggleCustomAlertVisibility()
	// }
	const rightButtonFunction = () => {
		// console.warn("2");
		toggleCustomAlertVisibility1()
	}
	const hideToDate = () => setToDateVisibility(false);
	const [isToDateVisible, setToDateVisibility] = React.useState(false);
	const [currentDate, setCurrentDate] = React.useState(new Date());


	const setToDate = (d, date) => {
		// hideToDate();
		if (isAndroid) {
			if (d.type === 'set') {
				hideToDate();
				setCurrentDate(date);
				updateToDate(moment(date).format('YYYY-MM-DD'));
			} else {
				hideToDate();
			}
		} else {
			setCurrentDate(date);
			updateToDate(moment(date).format('YYYY-MM-DD'));
		}
	};

	// leftButtonFunction1

	const RazorPay = async () => {
		const data1 = {
			"paymentMode": PostAdPaymentType[payment].enum,
			"discountType": "POINTS",
			"thumbnailImage": userImage,
			"userId": userId,
			"username": userName,
			"offerId": offer ? offer.offerId : 0,
			"purchasedForDate": Todate
		}
		// console.warn(data1);
		try {
			if (PostAdPaymentType[payment].enum == "ONLINE") {
				// 103.123.45.75:9428/api/
				let postData = {
					"description": "get jfjsd",
					"paymentMode": data1.paymentMode,
					"offerId": offer ? offer.offerId : 0,
					"discountType": "PRICE",
					"couponCode": couponCode,
					"razorpayDetail": {
						"razorpayOrderId": "incididunt in Duis minim adipisicing",
						"razorpayPaymentId": "aliquip pariatur",
						"razorpaySignature": "anim"
					},
					"thumbnailImage": userImage,
					"userId": userId,
					"username": userName,
					"purchasedForDate": Todate
				}
				// const resp = await axios.post(`${BASE_URL}/razorPay/createPaymentForPremiumPost`, postData);

				const uri = `/razorPay/createPaymentForPremiumPost`
				const body = postData
				postRequest(uri, body).then((resp) => {

					if (resp.code == 200) {
						console.warn(resp.data.razorpayOrderId);
						// navigation.goBack()
						const options = {
							description: 'Get Your Product',
							currency: 'INR',
							key: 'rzp_live_49A1dDF43qmmgG',
							// amount: applyvouchers.visible ? ((total - applyvouchers.price) * 100) : ((total + fewdays.deliveryCharge) * 100),
							amount: resp.data.amount * 100,
							name: 'NBH',
							order_id: resp.data.razorpayOrderId,
							prefill: {
								email: email,
								contact: phNo,
								name: userName
							},
							theme: { color: Colors.PRIMARY }
						}
						// console.warn(resp.data);
						if (typeof resp.data.finalCharge != "undefined") {
							// console.warn("klnl");
							postAdImage(resp.data.premiumPostId, 1)
						} else {
							RazorpayCheckout
								.open(options)
								.then((data) => {
									completePayment(data, data1)
								}).catch(async (error) => {
									const req = `/razorPay/orderId/${resp.data.razorpayOrderId}`
									getService(req).then((data) => {
										if (data.code == 200) {
											if (data.data.status == "paid") {
												let data = {
													razorpay_order_id: resp.data.razorpayOrderId,
													razorpay_payment_id: "detailNotFound",
													razorpay_signature: "detailNotFound"
												}
												completePayment(data)
											} else {
												// setActiveIndicator(false);
												console.warn("pay 1", error);
											}

										} else {
											setAlertTitle("Alert")
											setAlertText(data.message)
											toggleCustomAlertVisibility()
										}
									})
								});
						}
					} else {
						setAlertTitle("Alert")
						setAlertText(resp.message)
						toggleCustomAlertVisibility()
					}

				})


			} else {
				// console.warn("lmoiknoi");
				if (offer) {
					if (walletPoints.points >= selectedMonth?.object?.chargeInPoint - offer.discountAmount) {
						const uri = `/premiumPost`
						const body = data1
						postRequest(uri, body).then((resp) => {
							if (resp.code == 200) {
								postAdImage(resp.data.premiumPostId, 0)
								setDisable(true)
							} else {
								setAlertTitle("Alert")
								setAlertText(resp.message)
								toggleCustomAlertVisibility()
							}
						})

					} else {
						setAlertTitle("Invalid Deatils")
						setAlertText("Not enough points available in your wallet")
						toggleCustomAlertVisibility()

					}
				}
				else {
					if (walletPoints.points >= selectedMonth?.object?.chargeInPoint) {

						// const resp = await axios.post(`${BASE_URL}/premiumPost`, data1);
						// postAdImage(resp.data.premiumPostId, 0)


						const uri = `/premiumPost`
						const body = data1
						postRequest(uri, body).then((resp) => {
							if (resp.code == 200) {
								postAdImage(resp.data.premiumPostId, 0)
								setDisable(true)
							} else {
								setAlertTitle("Alert")
								setAlertText(resp.message)
								toggleCustomAlertVisibility()
							}
						})


					} else {
						setAlertTitle("Invalid Deatils")
						setAlertText("Not enough points available in your wallet")
						toggleCustomAlertVisibility()

					}
				}

			}
		} catch (error) {
			console.warn("=<>=", error.message);
			// console.warn();
			setAlertTitle("Invalid Deatils")
			setAlertText(`error while post advertisement ${error.response.data}`)
			toggleCustomAlertVisibility()
		}
	}
	const leftButtonFunction1 = async () => {

		toggleCustomAlertVisibility1()
		if (PostAdPaymentType[payment].enum == "WALLETPOINT") {
			RazorPay()
		} else {
			navigation.navigate(ScreenNames.MAKEPAYMENTADVERTISMENTPOST_SCREEN,
				{ PaytoRegister: RazorPay, name: userName, postApplePayAds: postApplePayAds, NavBar: true })
		}


	}

	const Htmldata = () => {
		// <View style={{ width: 300 }}>
		<HTML source={{ html: termsAndCondition.terms }} contentWidth={200} />
		// </View>
	}


	//function
	const postAdImage = async (PostId, navigations) => {

		const formData = new FormData();
		const imageName = postImage.path.slice(postImage.path.lastIndexOf('/'), postImage.path.length);
		formData.append("postImage", {
			name: imageName,
			type: postImage.mime,
			uri: postImage.path,
		});
		// const resp = await axios.post(`${BASE_URL}/premiumPost/${PostId}/postImage`, formData);

		const uri = `/premiumPost/${PostId}/postImage`
		const body = formData
		postRequest(uri, body).then((response) => {
			if (response.code == 200) {
				if (navigations == 1) {
					navigation.pop(2)
					route.params.getAllAdvertisementByUserId()
				} else {
					navigation.pop()
					route.params.getAllAdvertisementByUserId()
				}
			} else {
				setAlertTitle("Alert")
				setAlertText(response.message)
				toggleCustomAlertVisibility()
			}
		})

	}

	const getWalletPoints = async () => {
		const req = `/wallets/userId/${userId}`
		getService(req).then((response) => {
			if (response.code == 200) {
				setWalletPoints(response.data)
			} else {
				setAlertTitle("Alert")
				setAlertText(response.message)
				toggleCustomAlertVisibility()
			}
		})
	};

	React.useEffect(() => {
		let date = [
			"JANUARY",
			"FEBRUARY",
			"MARCH",
			"APRIL",
			"MAY",
			"JUNE",
			"JULY",
			"AUGUST",
			"SEPTEMBER",
			"OCTOBER",
			"NOVEMBER",
			"DECEMBER",
		]
		const result = date.findIndex(e => e == selectedMonths?.object.month)
		const result1 = date.findIndex(e => e == moment(Date.now()).format("MMMM").toUpperCase())
		let currentMonth = moment(Date.now()).format("MMMM").toUpperCase()
		const data1 = moment(Date.now()).add((result + 1) - (result1 + 1), 'months').format('YYYY-MM-DD')
		const fetureMonth1 = moment(Date.now()).startOf('month').add((result + 1) - (result1 + 1), 'months').format('YYYY-MM-DD')
		console.warn(fetureMonth1);
		updateToDate(currentMonth == selectedMonths?.object.month ? data1 : fetureMonth1);
		const data = Platform.OS == "android" ? moment(Date.now()).add((result + 1) - (result1 + 1), 'months').format('YYYY-MM-DD') : moment(new Date()).add((result + 1) - (result1 + 1), 'months').format('YYYY-MM-DD[T00:00:00.000Z]')
		const fetureMonth = Platform.OS == "android" ? moment(Date.now()).startOf('month').add((result + 1) - (result1 + 1), 'months').format('YYYY-MM-DD') : moment(new Date()).startOf('month').add((result + 1) - (result1 + 1), 'months').format('YYYY-MM-DD[T00:00:00.000Z]')
		const maxDate = Platform.OS == "android" ? moment(data).endOf('month').format("YYYY-MM-DD") : moment(data).endOf('month').format('YYYY-MM-DD[T00:00:00.000Z]')
		setMaxDate(maxDate)
		setMinDate(currentMonth == selectedMonths?.object.month ? data : fetureMonth)
		const latestMonth = currentMonthData?.filter(e => e.object.month == selectedMonths?.object.month.toUpperCase())
		if (latestMonth?.length > 0) {
			setSelectedMonthData(latestMonth[0])
		}
	}, [selectedMonths])

	React.useEffect(() => {
		getWalletPoints()
	}, [])


	const TermsAndCondition = async () => {
		const req = `/advTerms`
		getService(req).then((response) => {
			if (response.code == 200) {
				setTermsAndCondition(response.data)
			} else {
				setAlertTitle("Alert")
				setAlertText(response.message)
				toggleCustomAlertVisibility()
			}
		})
	}

	React.useEffect(() => {
		TermsAndCondition()
	}, [])


	const postAdvertisment = async () => {
		if (selectedDate) {
			if (postImage) {
				// const response = await axios.get(`${BASE_URL}/advTerms`)
				// setTermsAndCondition(response.data)
				toggleCustomAlertVisibility1()
				// )


			}
			else {
				setAlertTitle("Invalid Deatils")
				setAlertText("Oops please add post image first")
				toggleCustomAlertVisibility()
			}
		}
		else {
			setAlertTitle("Invalid Deatils")
			setAlertText("Oops please select date for advertisement")
			toggleCustomAlertVisibility()
		}
	}


	const completePayment = async (razorpayDetail, userData) => {

		const signUpData = {
			"description": "get jfjsd",
			"paymentMode": userData.paymentMode,
			"offerId": userData.offerId ? userData.offerId : 0,
			"discountType": "PRICE",
			"couponCode": userData.couponCode,
			"razorpayDetail": {
				"razorpayOrderId": razorpayDetail.razorpay_order_id,
				"razorpayPaymentId": razorpayDetail.razorpay_payment_id,
				"razorpaySignature": razorpayDetail.razorpay_signature
			},
			"thumbnailImage": userData.thumbnailImage,
			"userId": userData.userId,
			"username": userData.username,
			"purchasedForDate": userData.purchasedForDate
		}
		// const userDetails = await axios.post(`${Server.BASE_URL}/razorPay/verifySignatureForPremiumPost`, signUpData)
		// postAdImage(userDetails.data.premiumPostId, 1)

		const uri = `/razorPay/verifySignatureForPremiumPost`
		const body = formData
		postRequest(uri, body).then((response) => {
			if (response.code == 200) {
				postAdImage(response.data.premiumPostId, 1)
				setDisable(true)
			} else {
				setAlertTitle("Alert")
				setAlertText(response.message)
				toggleCustomAlertVisibility()
			}
		})
	}


	const postApplePayAds = async () => {
		const userData = {
			"paymentMode": PostAdPaymentType[payment].enum,
			"discountType": "POINTS",
			"thumbnailImage": userImage,
			"userId": userId,
			"username": userName,
			"offerId": offer ? offer.offerId : 0,
			"purchasedForDate": selectedDate
		}
		const signUpData = {
			"description": "get jfjsd",
			"paymentMode": userData.paymentMode,
			"offerId": userData.offerId ? userData.offerId : 0,
			"discountType": "PRICE",
			"couponCode": userData.couponCode,
			"thumbnailImage": userData.thumbnailImage,
			"userId": userData.userId,
			"username": userData.username,
			"purchasedForDate": userData.purchasedForDate
		}
		// const userDetails = await axios.post(`${Server.BASE_URL}/razorPay/savePremiumPost`, signUpData)
		// postAdImage(userDetails.data.premiumPostId, 0)

		const uri = `/razorPay/savePremiumPost`
		const body = signUpData
		postRequest(uri, body).then((response) => {
			if (response.code == 200) {
				postAdImage(response.data.premiumPostId, 0)
				navigation.pop()
				setDisable(true)
			} else {
				setAlertTitle("Alert")
				setAlertText(response.message)
				toggleCustomAlertVisibility()
			}
		})

	}


	const getAllAdPostPurchaseCharge = async () => {
		const req = `/premiumPostCharge/charges`
		getService(req).then((response) => {
			if (response.code == 200) {
				if (response.data.length > 0) {
					setCurrentMonthData(response.data);
					remainingPost(response.data)
					setSelectedMonth(response.data[0])
				}
			} else {
				setAlertTitle("Alert")
				setAlertText(response.message)
				toggleCustomAlertVisibility()
			}
		})
	}
	const remainingPost = async (currentMonthData) => {
		const req = `/premiumPost/remainingPost`
		getService(req).then((response) => {
			if (response.code == 200) {
				setPostDate(response.data);
				let month = 1 + moment(response.data[0].date, 'YYYY/MM/DD').month()
				const monthInWord = moment(month, 'MM').format('MMMM');
				const latestMonth = currentMonthData.filter(e => e.object.month == monthInWord.toUpperCase())
				setSelectedMonthData(latestMonth[0])
				setMyIndex(0)
				setSelectedDate(response.data[0].date)
				checkAvailability(response.data[0].remainingPost)
			} else {
				setPostDate([]);
				setAlertTitle("Alert")
				setAlertText(response.message)
				toggleCustomAlertVisibility()
			}
		})
	}

	const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }

	const leftButtonFunction = () => {
		toggleCustomAlertVisibility()
	}
	const openCamera = async () => {
		try {

			let value2 = await ImagePicker.openCamera({
				width: 900,
				height: 450,
				cropping: true,
				// cropperCircleOverlay: true,

			}).then(image => {
				setPostImage(image)
				// setAvatarSource([...avatarSource, image.path]);
				// setImagePath(image)
				// setSelectAvatarSource(image.path)
				setTestImage({
					imagePath: image.path,
					imageMime: image.mime
				})

			});
			_toggleUploadImage()
		}
		catch (error) {
			console.log(error);
		}
	}


	const openLibrary = async () => {
		try {

			let value = await ImagePicker.openPicker({
				width: 900,
				height: 450,
				cropping: true,
				// cropperCircleOverlay: true,
				// showCropFrame: true
				// multiple: true
			}).then(image => {
				setPostImage(image)
				// setSelectAvatarSource(image.path)
				setTestImage({
					imagePath: image.path,
					imageMime: image.mime
				})

			});
			_toggleUploadImage()
		}
		catch (error) {
			console.warn(error);
		}
	}

	const _toggleUploadImage = () => {
		setSelectIamgepicker(!selectIamgepicker)
	}



	const markedDatesFunc = date => {
		if (date.isoWeekday() === 4) { // Thursdays
			return {
				dots: [{
					key: date.format('2020-06-11'),
					color: 'red',
					selectedDotColor: 'yellow',
				}]
			};
		}
		return {};
	}
	const datesWhitelist = [
		// // single date (today)
		moment(),

		// date range
		{
			start: (moment()),
			end: (moment().add(30, 'days'))
		}
	];
	const datesBlacklistFunc = date => {
		return date.isoWeekday() === 7; // disable Saturdays
	}
	let customDatesStyles = [];
	let startDate = moment();
	for (let i = 0; i < 6; i++) {
		customDatesStyles.push({
			startDate: startDate.clone().add(i, 'days'), // Single date since no endDate provided
			dateNameStyle: styles.dateNameStyle,
			dateNumberStyle: styles.dateNumberStyle,
			// Random color...
			dateContainerStyle: { backgroundColor: `#${(`#ffd648${(Math.random() * (1 << 24) | 0).toString(16)}`).slice(-6)}` },
		});
	}
	const getSelectedDate = (date) => {

	}
	//

	let datesBlacklist = [moment().add(1, 'days')]; // 1 day disabled

	const applyOfferByOfferId = async (offerId) => {
		let data = {
			"offerId": offerId,
			"paymentMode": PostAdPaymentType[payment].enum,
			"discountType": "POINTS",
			"couponCode": couponCode,
			"purchasedForDate": selectedDate
		}
		const uri = `/premiumPost/applyOffer`
		const body = data
		postRequest(uri, body).then((response) => {

			if (response.code == 200) {
				if (response.data) {
					if (removeData == true) {
						setOffer(response.data);

					} else {
						setOffer("");
						setCouponCode("")
					}
				}
			} else {
				setAlertTitle("Alert")
				setAlertText(response.message)
				toggleCustomAlertVisibility()
			}

		})
	}

	const applyCouponByCode = async () => {
		if (selectedDate) {
			if (couponCode) {

				// const resp = await axios.get(`${BASE_URL}/offers/checkOffer/coupon/${couponCode}/offerType/ADVERTISEMENT_POST`);
				const req = `/offers/checkOffer/coupon/${couponCode}/offerType/ADVERTISEMENT_POST`
				getService(req).then((response) => {
					if (response.code == 200) {
						if (response.data.discountType == "POINTS") {
							if (response.data.discountAmount > selectedMonth?.object?.chargeInPoint) {
								setAlertText(`Total Amount should be greater than ${response.data.discountAmount}`)
								toggleCustomAlertVisibility()
							} else {
								if (payment == 0) {
									setAlertTitle("Invalid Deatils")
									setAlertText(`To Apply this offer please select Point Payment Mode`)
									toggleCustomAlertVisibility()
								} else {
									setRemoveData(!removeData)
									applyOfferByOfferId(response.data.offerId);
								}
							}
						} else {
							if (response.data.discountAmount > selectedMonth?.object?.charge) {
								setAlertTitle("Invalid Deatils")
								setAlertText(`Total Amount should be greater than ${response.data.discountAmount}`)
								toggleCustomAlertVisibility()
							} else {
								if (payment == 1) {
									setAlertTitle("Invalid Deatils")
									setAlertText(`To Apply this offer please select Online Payment Mode`)
									toggleCustomAlertVisibility()
								} else {
									setRemoveData(!removeData)
									applyOfferByOfferId(response.data.offerId);
								}
							}

						}
					} else {
						setAlertTitle("Alert")
						setAlertText(response.message)
						toggleCustomAlertVisibility()
					}

				})

			} else {
				setAlertTitle("Invalid Deatils")
				setAlertText("Oops Please enter coupon code")
				toggleCustomAlertVisibility()
			}
		} else {
			setAlertTitle("Invalid Deatils")
			setAlertText("Oops please select date for advertisement")
			toggleCustomAlertVisibility()
		}


	}
	const checkAvailability = (remainingPost) => {
		if (remainingPost > 0) {
		}
		else {
			Alert.alert("Remaining ad not available")
		}
	}
	const dateRenderFunction = ({ item, index }) => (
		<TouchableOpacity
			onPress={() => {
				setMyIndex(index),
					setSelectedDate(item.date),
					checkAvailability(item.remainingPost)
				let month = 1 + moment(item.date, 'YYYY/MM/DD').month()
				const monthInWord = moment(month, 'MM').format('MMMM');
				const latestMonth = currentMonthData.filter(e => e.object.month == monthInWord.toUpperCase())
				setSelectedMonthData(latestMonth[0])
			}}
			style={{ marginRight: 20, backgroundColor: myIndex == index ? Colors.WHITE : null, borderRadius: 20, padding: 10 }}>
			<Text style={{ fontFamily: Fonts.BOLD }}>
				{item.day}
			</Text>
			<Text style={{ fontFamily: Fonts.BOLD }}>
				{item.date}
			</Text>
			{/* <Text style={{ fontFamily: Fonts.BOLD }}>
				{item.remainingPost}
			</Text> */}
		</TouchableOpacity>
	)
	const navigation = useNavigation()


	const getForIos = async () => {
		const req = `/aboutUs/getForIos`
		getService(req).then((response) => {
			if (response.code == 200) {
				setApplePayDisabled(response.data)
			} else {
				setAlertTitle("Alert")
				setAlertText(response.message)
				toggleCustomAlertVisibility()
			}
		})
	}

	React.useEffect(() => {
		getForIos()
	}, [])
	//useEffect
	useEffect(() => {

		getAllAdPostPurchaseCharge()
	}, [])
	return (
		<View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} isTransparent={true} />
			<Header name=" Business" backgroundColor={false}
				WhiteHomeIcon={true}
				WhiteHomeOnpress={() => navigation.navigate(ScreenNames.HOME_SCREEN)} />
			<View>
				<View style={{
					backgroundColor: Colors.PRIMARY,
					borderBottomLeftRadius: 20,
					borderBottomRightRadius: 20
				}}>
					<Text onPress={toggleMonthModal} style={{ marginLeft: 20, marginTop: 10, fontFamily: Fonts.BOLD, fontSize: 18 }}>{selectedMonths && selectedMonths.object.month} {`- Change Month From Here`}</Text>
					<Text onPress={() => { setToDateVisibility(!isToDateVisible) }} style={{ marginLeft: 20, marginTop: 10, marginBottom: 20, fontFamily: Fonts.BOLD, fontSize: 18 }}>{Todate} {`- Change Date From Here`}</Text>

				</View>



			</View>
			<ScrollView>

				<View style={{ marginVertical: 30 }}>
					<View style={{ marginHorizontal: 20, marginBottom: 10 }}>
						<Text style={[styles.font2, { fontSize: 16, color: Colors.BLACK }]}>Business Promotion Charge</Text>
					</View>
					<FlatList
						data={currentMonthData}
						renderItem={({ item }) => {
							return (
								<View style={styles.alignment}>
									<View style={{ flex: 1 }}>
										<Text style={styles.font2}> {item.object.month} </Text>
									</View>
									<View style={[styles.buttonPts, { flex: 1, marginLeft: 30 }]} >
										<Text style={styles.font3}> ₹ {item.object.charge} | {item.object.chargeInPoint} pts</Text>
									</View>
								</View>
							)
						}}
					/>
					{
						offer
							?
							<View style={styles.alignment}>
								<View style={{ flex: 1 }}>
									<Text style={styles.font2}>Coupon Code -  </Text>
								</View>
								<View style={[styles.buttonPts, { flex: 1, marginLeft: 30 }]} >
									<Text style={styles.font3}>(-₹{offer.discountType == "PRICE" || offer.discountType == "PERCENTAGE" ? offer.discountAmount : 0}) | (-{offer.discountType == "POINTS" ? offer.discountAmount : 0}) pts</Text>
								</View>
							</View>
							:
							null
					}

					<View style={{ width: SCREEN_WIDTH - 40, height: 1, backgroundColor: Colors.ONYX_80, marginHorizontal: 20, marginVertical: 3 }}></View>
					<View style={styles.alignment}>
						<View style={{ flex: 1 }}>
							<Text style={[styles.font2, { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.BLACK }]}>Total Charge - </Text>
						</View>
						<View style={[styles.buttonPts, { flex: 1, marginLeft: 30 }]} >
							{
								offer
									?
									<>
										{
											offer.discountType == "POINTS"
												?
												<Text style={[styles.font3, { fontSize: 16, fontFamily: Fonts.BOLD }]}>₹ {selectedMonth?.object?.charge} | {selectedMonth?.object?.chargeInPoint - offer.discountAmount} pts</Text>
												:
												<Text style={[styles.font3, { fontSize: 16, fontFamily: Fonts.BOLD }]}>₹ {selectedMonth?.object?.charge - offer.discountAmount} | {offer.discountType == "POINTS" ? selectedMonth?.object?.chargeInPoint - offer.discountAmount : selectedMonth?.object?.chargeInPoint} pts</Text>
										}
									</>
									:
									<Text style={[styles.font3, { fontSize: 16, fontFamily: Fonts.BOLD, }]}>₹ {selectedMonth?.object?.charge} |  {selectedMonth?.object?.chargeInPoint} pts</Text>
							}

						</View>
					</View>


				</View>
				{/* {console.log("Testimage.imagePath===>",testImage.imagePath)} */}
				<View style={{ flex: 1 }}>
					<View style={{ flexDirection: "row", marginHorizontal: 30, marginVertical: 20, marginTop: 20, alignItems: "center" }}>
						{testImage.imagePath ?

							null
							:
							<TouchableOpacity
								onPress={_toggleUploadImage}
								style={styles.uploadstyle}>
								<Text style={[styles.font1, { marginRight: 7, fontFamily: Fonts.SEMIBOLD }]}>Upload</Text>
								<UploadSvg />
							</TouchableOpacity>
						}
						{/* <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                        {
                            Array.isArray(ImageExtenstion)
                            &&
                            (
                                ImageExtenstion.map(e => <View style={{ marginBottom: 10 }}> */}


						<View>



							{/* <Text style={{ fontSize: 14, fontFamily: Fonts.REGULAR, color: Colors.ONYXOpacity, marginRight: 10 }}>mypostad1.jpeg</Text> */}
						</View>
					</View>
					{
						testImage ?

							<View style={{ height: 150, width: SCREEN_WIDTH - 40, borderRadius: 5, marginHorizontal: 20, marginVertical: 10 }}>
								<Image source={{ uri: testImage.imagePath }} style={{ height: "100%", width: "100%", resizeMode: "cover", borderRadius: 10 }} />
							</View>
							:
							null

					}

					<View style={[styles.sectionLine, { marginTop: 25, marginBottom: 15 }]}></View>

					{
						!applePayDisabled
						&&
						<View style={{ marginHorizontal: 20 }}>
							<View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1, alignItems: "center" }}>


								<View style={{ flex: 0.85 }}>

									<TextInput
										onChangeText={text => setCouponCode(text)}
										placeholderTextColor={Colors.BLACK}
										editable={removeData}
										style={styles.filterinput}
										placeholder="Enter Coupon code">{couponCode}</TextInput>

								</View>
								<View style={{ flex: 0.15, marginLeft: 2, alignItems: "center" }}>


									<TouchableOpacity
										onPress={() => applyCouponByCode()}
									>

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
							</View>
							<View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_80 }}></View>
						</View>
					}

					<View style={{ marginHorizontal: 20, marginVertical: 30 }}>
						<Text style={[styles.font1, { marginVertical: 0, marginBottom: 10 }]}>Choose Payment</Text>
						<FlatList data={PostAdPaymentType}
							renderItem={({ item, index }) => (

								<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
									<Text style={styles.font7} >{item.name}</Text>
									<TouchableOpacity onPress={() => setPayment(index)}>
										<View style={{ height: 17, width: 17, borderRadius: 100, borderWidth: 1, borderColor: Colors.JUNGLE_BLACK, alignItems: "center", justifyContent: "center" }}>
											{
												payment == index ?
													<View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: Colors.JUNGLE_BLACK }}></View>
													:
													null
											}
										</View>
									</TouchableOpacity>

								</View>

							)}
						/>
					</View>
				</View>
				<TouchableOpacity
					disabled={disable}
					onPress={() => postAdvertisment()}
					// onPress={() => {
					// 	navigation.navigate(ScreenNames.MAKEPAYMENTADVERTISMENTPOST_SCREEN,
					// 		{ PaytoRegister: postAdvertisment, name: userName })

					// }}
					style={[globalStyles.button, { backgroundColor: disable == true ? "#FFD64890" : "#FFD648" }]}>
					<Text style={globalStyles.buttonText}>Pay and Upload</Text>
				</TouchableOpacity>
			</ScrollView>


			<TermsandConditionModal
				//  _toggleTermsAndCondition={_toggleTermsAndCondition} 
				termsCondition={termsCondition} />

			<EditProfileModal openLibrary={openLibrary} openCamera={openCamera}
				_toggleUploadImage={_toggleUploadImage} SelectIamgepicker={selectIamgepicker} />


			<CustomAlert
				title={alertTitle}
				// Invalid Details
				desc={alertText}
				leftButtonText={"Ok"}
				leftButtonFunction={leftButtonFunction}
				toggleCustomAlertVisibility={toggleCustomAlertVisibility}
				customAlertVisible={customAlertVisible}
			/>
			<SelectMonth
				monthVisible={monthVisible}
				toggleMonthModal={toggleMonthModal}
				months={currentMonthData}
				setSelectedMonth={setSelectedMonth}
			/>


			<CustomAlert
				title={"Terms and condition"}
				desc={termsAndCondition}
				leftButtonText={"Ok"}
				rightButtonText={"Cancel"}
				toggleCustomAlertVisibility={toggleCustomAlertVisibility1}
				leftButtonFunction={leftButtonFunction1}
				rightButtonFunction={rightButtonFunction}
				customAlertVisible={customAlertVisible1}
			/>
			{
				isToDateVisible
				&&
				<>
					{Platform.OS === 'android'
						?
						<DateTimePicker
							value={currentDate}
							is24Hour={true}
							mode='date'
							display='calendar'
							minimumDate={new Date(minDate)}
							maximumDate={new Date(maxDate)}
							onChange={setToDate}
						/>
						:
						<>
							<View style={{ height: '70%', backgroundColor: "#000000aa", position: 'absolute', width: Constants.SCREEN_WIDTH }}>
							</View>

							<View style={{ height: '30%' }}>
								<View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 20 }}>
									<TouchableOpacity onPress={() => {
										setToDateVisibility(!isToDateVisible)
									}}>
										<Text style={{ fontFamily: Fonts.MEDIUM, fontSize: 20, color: "#3D80D6" }}>Cancel</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={() => {
										setToDateVisibility(!isToDateVisible)
									}}>
										<Text style={{ fontFamily: Fonts.MEDIUM, fontSize: 20, color: "#3D80D6" }}>Ok</Text>
									</TouchableOpacity>
								</View>
								<DateTimePicker
									value={currentDate}
									is24Hour={true}
									mode='date'
									minimumDate={minDate}
									display='spinner'
									maximumDate={maxDate}
									onChange={setToDate}
								/>
							</View>
						</>
					}
				</>
			}
		</View>

	)
}

const mapStateToProps = state => ({
	userId: state.user.userId,
	userName: state.user.name,
	userImage: state.user.thumbnailImage,
	phNo: state.user.phNo,
	email: state.user.email,

})
export default connect(mapStateToProps, null)(PostAdavertiseScreen);
