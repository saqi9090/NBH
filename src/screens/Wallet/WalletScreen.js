import { styles } from "./WalletStyles"


import React from 'react';
import { Text, View, FlatList, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
// import { styles } from './WalletStyles';
// import FFf from "../../assets/svg/Back"
import { Colors, Constants, Fonts, ScreenNames, Server } from '../../global';
import Header from "../../components/Header/Header";

import DateTimePicker from '@react-native-community/datetimepicker';
// import ChatSvg from '../../assets/svg/chat';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { connect } from 'react-redux';
import * as service from './WalletService';
import moment from 'moment';
// import firebaseSvc from '../ChatScreen/firebaseSvc';
import Axios from 'axios';
import axios from "axios";
import { BASE_URL } from "../../global/server";
import { getService } from "../../services/getService";
import CustomAlert from "../../components/CustomAlert/CusomAlert";
// import SignInModal from '../../components/ModalPleaseSignIn/ModalPleaseSignInCode';

const WalletScreen = ({
	userId,
	name,
	navigation,
	isSignedIn,
	uid
}) => {
	const [isDateVisible, setDateVisibility] = React.useState(false);
	const [isToDateVisible, setToDateVisibility] = React.useState(false);
	const [Fromdate, updateFromDate1] = React.useState('From Date');
	const [Todate, updateToDate] = React.useState('To Date');
	const [walletPoints, setWalletPoints] = React.useState(null);
	const [TransactionList, setTransactionList] = React.useState(null);
	let [loading, setLoading] = React.useState(false);
	let [btnText, setBtnText] = React.useState('View');
	const [isSignInModalVisible, setIsSignInModalVisible] = React.useState(false);
	const [currentDate, setCurrentDate] = React.useState(new Date());
	const [currentFromDate, setCurrentFromDate] = React.useState(new Date());
	const [maxDate, setMaxDate] = React.useState(new Date());
	const [alertTitle, setAlertTitle] = React.useState("");
	const [alertText, setAlertText] = React.useState('');
	const [customAlertVisible, setCustomAlertVisible] = React.useState(false);

	const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
	const leftButtonFunction = () => {
		toggleCustomAlertVisibility()
	}

	//refs
	const isMounted = React.useRef(true);
	const daata = [
		{
			"userId": 21,
			"referralUserId": 0,
			"referralMemberName": null,
			"points": 0.0,
			"creationDate": "2021-05-08T05:55:17.896+00:00",
			"updatedDate": "2021-05-08T05:55:17.896+00:00"
		},

		{
			"userId": 21,
			"referralUserId": 0,
			"referralMemberName": null,
			"points": 0.0,
			"creationDate": "2021-05-08T05:55:17.896+00:00",
			"updatedDate": "2021-05-08T05:55:17.896+00:00"
		},

		{
			"userId": 21,
			"referralUserId": 0,
			"referralMemberName": null,
			"points": 0.0,
			"creationDate": "2021-05-08T05:55:17.896+00:00",
			"updatedDate": "2021-05-08T05:55:17.896+00:00"
		},

	]

	//check whether the componnet is mounted or not
	const isComponentMounted = () => isMounted.current;
	const toggleIsSignInModalVisibility = React.useCallback(() => setIsSignInModalVisible(!isSignInModalVisible));

	const getWalletPoints = async () => {
		const req = `/wallets/userId/${userId}`
		getService(req).then((response) => {
			if (response.code == 200) {
				if (isComponentMounted()) { setWalletPoints(response.data) }

			} else {
				setAlertTitle("Alert")
				setAlertText(response.message)
				toggleCustomAlertVisibility()
			}
		})

	};
	const getTransactions = async () => {
		try {
			setLoading(true);
			const req = `/wallets/transactions/userId/${userId}`
			getService(req).then((response) => {
				if (response.code == 200) {
					setBtnText('View')
					setLoading(false);
					if (isComponentMounted()) { setTransactionList(response.data); }
				} else {
					setAlertTitle("Alert")
					setAlertText(response.message)
					toggleCustomAlertVisibility()
				}

			})
		} catch (error) { if (isComponentMounted()) { console.log("User Wallet Screen", error.message); setLoading(false); setTransactionList(null); } }
	};

	let getWalletTransactionByDate = async () => {


		if (isValidateInputs()) {
			setLoading(true);
			const req = `/wallets/userId/${userId}/fromDate/${Fromdate}/toDate/${Todate}`
			getService(req).then((response) => {
				if (response.code == 200) {
					setBtnText('Clear');
					setTransactionList(response.data);
					setLoading(false);
				} else {
					if (isComponentMounted()) {
						console.log("User Wallet Screen", error.message);
						setLoading(false);
						setTransactionList(null);
					}
					setAlertTitle("Alert")
					setAlertText(response.message)
					toggleCustomAlertVisibility()
				}
			})
		}

	};

	const goToChatPage = () => {
		firebaseSvc.createFriendList(uid)
		console.log(uid);
		navigation.navigate(ScreenNames.CHAT_SCREEN, {
			uid,
			name,
			avatar: '',
		})
	};
	React.useEffect(() => {
		getWalletPoints();
		getTransactions();
		return () => {
			isMounted.current = false;
		};
	}, []);

	const showFromDate = () => setDateVisibility(true);
	const hideFromDate = () => setDateVisibility(false);


	const showToDate = () => setToDateVisibility(true);
	const hideToDate = () => setToDateVisibility(false);

	const isAndroid = Platform.OS === 'android';
	const setFromDate = (d, date) => {
		if (isAndroid) {
			if (d.type === 'set') {
				hideFromDate();
				setCurrentFromDate(date);
				updateFromDate1(moment(date).format('YYYY-MM-DD'));
			} else {
				hideFromDate();
			}
		} else {
			setCurrentFromDate(date);
			updateFromDate1(moment(date).format('YYYY-MM-DD'));
		}
	}

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


	// React.useEffect(() => {
	// 	let response = await Axios.get(`${Server.BASE_URL}wallets/userId/1`);
	// 	setBtnText('Clear');

	// },[])

	const loadHeader = ({ item }) => {
		return (
			<View>
				<View style={{ backgroundColor: Colors.WHITE }}>

					<View style={[styles.walletheader, { marginTop: 20 }]}>
						<Text style={[styles.Three, { marginRight: 30 }]}>
							{walletPoints && walletPoints.points ? walletPoints.points : 0}
							{/* {} */}

						</Text>
						<View>

							<Text style={styles.reward}>Wallet Amounts</Text>
							<Text style={styles.reward1} >Refunded Amount</Text>
						</View>
					</View>
					<View style={{ backgroundColor: Colors.WHITE, marginTop: 40, marginBottom: 10 }}>
						<Text style={[styles.transtionhistory, { alignSelf: "center" }]}>Transaction History</Text>

					</View>
					{/* <TouchableOpacity
				hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}
				onPress={() => navigation.navigate(ScreenNames.WALLET_CHECKOUT)}
				style={{ width: Constants.SCREEN_WIDTH / 2, alignSelf: "center", alignItems: "center", justifyContent: "center", backgroundColor: "#2f75de", borderRadius: 20, }}
			>
				<Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFF", padding: 5, }} >Check Out</Text>
			</TouchableOpacity> */}

					<View style={styles.line}></View>
					<View style={styles.subHeader}>
						<TouchableOpacity onPress={() => {
							if (Fromdate === 'From Date') {
								updateFromDate1(moment(new Date()).format('YYYY-MM-DD'));
							}
							setDateVisibility(!isDateVisible)
							setToDateVisibility(false)
						}} style={styles.touchableButton}>
							<Text style={[styles.text1]}>{Fromdate}</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => {
							if (Todate === 'To Date') {
								updateToDate(moment(new Date()).format('YYYY-MM-DD'));
							}
							setToDateVisibility(!isToDateVisible)
							setDateVisibility(false)
						}
						} style={styles.touchableButton}>
							<Text style={[styles.text1]}>{Todate}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={handleOnPress}
							style={styles.viewBtn}>
							<Text style={[styles.text1, { fontFamily: Fonts.MEDIUM, fontSize: Fonts.SIZE_16, color: Colors.WHITE }]}>{btnText}</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.line}></View>

					{/* <Text style={styles.transaction}>Transaction History</Text> */}
				</View>
			</View>

		);
	};

	// let renderLoading = () => {
	// 	if (TransactionList === 0) {
	// 		return <View style={styles.loading}><ActivityIndicator size='large' color={Colors.PRIMARY} /></View>;
	// 	} else {
	// 		return <Text style={styles.noTransaction} >No Transactions</Text>
	// 	}
	// };

	let handleOnPress = () => {
		if (btnText === 'Clear') {
			clear();
			getTransactions();
		}
		else {
			getWalletTransactionByDate();
		}
	};

	let isValidateInputs = () => {
		if (Fromdate === 'From Date') {
			return false;
		} else if (Todate === 'To Date') {
			return false;
		} else {
			return true;
		}
	};

	let clear = () => {
		updateToDate('To Date');
		updateFromDate1('From Date');
	};

	let renderItem = ({ item }) => <View style={styles.itemContainer}>
		<View >
			<Text numberOfLines={1} style={styles.transactiondetails}>
				{item.transactionReason}
			</Text>
			<Text numberOfLines={1} style={styles.date}>
				{moment(item.transactionDate).startOf('minutes').fromNow()}

			</Text>
		</View>
		<View style={styles.itemSecondChild}>
			<Text numberOfLines={1} style={[styles.point, { color: item.transactionType === 'CREDIT' ? '#3cb04b' : '#ff0000', }]}>
				{item.points}
			</Text>
		</View>
	</View>;

	return (
		<View style={styles.parentContainer}>
			<FocusAwareStatusBar backgroundColor={true} barStyle='dark-content' isTopSpace={true} />
			<Header name="Wallet" activateLeftIcon={true} backgroundColor={true} />
			{
				TransactionList
				// &&
				// TransactionList.length > 0
				&&
				<FlatList
					// ListEmptyComponent={renderLoading}
					keyExtractor={(item, index) => `userId${item.userId}${index}`}
					bounces={false}
					alwaysBounceVertical={false}
					ListHeaderComponent={loadHeader}
					data={TransactionList && TransactionList}
					renderItem={renderItem}
				/>}
			{
				isDateVisible
				&&
				<>
					{
						Platform.OS === 'android'
							?
							<DateTimePicker
								value={currentFromDate}
								is24Hour={true}
								mode='date'
								display='calendar'
								maximumDate={maxDate}
								onChange={setFromDate}
							/>
							:
							<>
								<View style={{ height: '70%', backgroundColor: "#000000aa", position: 'absolute', width: Constants.SCREEN_WIDTH }}>
								</View>

								<View style={{ height: '30%' }}>
									<View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 20 }}>
										<TouchableOpacity onPress={() => {
											setDateVisibility(!isDateVisible)
											setToDateVisibility(false)
										}}>
											<Text style={{ fontFamily: Fonts.MEDIUM, fontSize: 20, color: "#3D80D6" }}>Cancel</Text>
										</TouchableOpacity>
										<TouchableOpacity onPress={() => {
											setDateVisibility(!isDateVisible)
											setToDateVisibility(false)
										}}>
											<Text style={{ fontFamily: Fonts.MEDIUM, fontSize: 20, color: "#3D80D6" }}>Ok</Text>
										</TouchableOpacity>
									</View>
									<DateTimePicker
										value={currentFromDate}
										is24Hour={true}
										mode='date'
										display='spinner'
										maximumDate={maxDate}
										onChange={setFromDate}
									/>
								</View>
							</>
					}
				</>
			}
			{
				isToDateVisible
				&&
				<>
					{
						Platform.OS === 'android'
							?
							<DateTimePicker
								value={currentDate}
								is24Hour={true}
								mode='date'
								display='calendar'
								maximumDate={maxDate}
								onChange={setToDate}
							/>
							:
							<>
								<View style={{ height: '70%', backgroundColor: "#000000aa", position: 'absolute', width: Constants.SCREEN_WIDTH }}>
								</View>

								<View style={{ height: '30%' }}>
									{
										Platform.OS === 'ios' ?
											<View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 20 }}>
												<TouchableOpacity onPress={() => {
													setToDateVisibility(!isToDateVisible)
													setDateVisibility(false)
												}}>
													<Text style={{ fontFamily: Fonts.MEDIUM, fontSize: 20, color: "#3D80D6" }}>Cancel</Text>
												</TouchableOpacity>
												<TouchableOpacity onPress={() => {
													setToDateVisibility(!isToDateVisible)
													setDateVisibility(false)
												}}>
													<Text style={{ fontFamily: Fonts.MEDIUM, fontSize: 20, color: "#3D80D6" }}>Ok</Text>
												</TouchableOpacity>
											</View>
											:
											null
									}
									<DateTimePicker
										value={currentDate}
										is24Hour={true}
										mode='date'
										display='spinner'
										maximumDate={maxDate}
										onChange={setToDate}
									/>
								</View>
							</>
					}
				</>
			}
			<CustomAlert
				title={alertTitle}
				desc={alertText}
				leftButtonText={"Ok"}
				leftButtonFunction={leftButtonFunction}
				toggleCustomAlertVisibility={toggleCustomAlertVisibility}
				customAlertVisible={customAlertVisible}
			/>
		</View>
	);
}
const mapStateToProps = (state) => {
	return {
		userId: state.user.userId,
		uid: state.user.uid,
		name: state.user.name,
		isSignedIn: state.user.isSignedIn
	};
};

const mapDispatchToProps = (dispatch) => ({ dispatch, });
export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen);