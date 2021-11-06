import React, { useState } from 'react';
import {
	Text,
	TouchableOpacity,
	View,
	Platform,
	Alert,
	FlatList,
	Pressable,
	Image,
	ScrollView,
	RefreshControl,
	BackHandler,
	// CheckBox
} from 'react-native';
import moment from 'moment';

import { SwipeListView } from 'react-native-swipe-list-view';
import { styles } from './NotificationStyles';
import { Colors, Fonts, ScreenNames, Server } from '../../global';

// import Header from '../../components/Header/Header'

import { connect } from 'react-redux';
import { SCREEN_WIDTH } from '../../global/constants';
// import CheckBox from '@react-native-community/checkbox';
import NotificationItemsCode from '../../components/NotificationItems/NotificationItemsCode';
import axios from 'axios';
// import Header from "../../components/Header/HeaderThekke"
import Header from '../../components/Header/Header';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { BASE_URL } from '../../global/server';
import { useFocusEffect } from '@react-navigation/core';
import CustomAlert from '../../components/CustomAlert/CusomAlert';
import { getService } from '../../services/getService';
import { deleteService } from '../../services/deleteService';





const NotificationScreen = ({ isSignedIn, userId, navigation }) => {

	// console.warn("==", userId);

	//Variables

	// const { partners, onPartnerDetails } = props;

	const listViewData = Array(20)
		.fill("")
		.map((_, i) => ({ key: `${i}`, text: `This is Your Notification #${i}`, time: "wksdnoi" }));

	//States
	const [refreshing, setRefreshing] = React.useState(false);

	const [notificationId, setNotificationId] = React.useState([])
	const [notifications, setNotifications] = React.useState(0)
	const [checkBoxVisible, setCheckBoxVisible] = React.useState(false);
	const [alertTitle, setAlertTitle] = React.useState("");
	const [alertText, setAlertText] = React.useState('');
	const [customAlertVisible, setCustomAlertVisible] = React.useState(false);

	const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
	const leftButtonFunction = () => {
		toggleCustomAlertVisibility()
	}
	//Refs

	//Functions

	const renderItem = ({ item, index }) => {
		return (
			<NotificationItemsCode item={item} index={index} notificationId={notificationId} setNotificationId={setNotificationId} checkBoxVisible={checkBoxVisible} setCheckBoxVisible={setCheckBoxVisible} notifications={notifications} />
		)
	};


	const getNotifications = async () => {


		const req = `/notifications/userId/${userId}`
		getService(req).then((response) => {
			if (response.code == 200) {
				setNotifications(response.data);
			} else {
				setAlertTitle("Alert")
				setAlertText(response.message)
				toggleCustomAlertVisibility()
			}

		})
	}

	const cancelNotification = () => {
		setNotificationId([])
		setCheckBoxVisible(false)
	}

	const removeNotification = async () => {
		setNotificationId([])
		const deletereq = `/notifications/${notificationId.toString()}`
		deleteService(deletereq).then((response) => {
			if (response.code == 200) {
			} else {
				setAlertTitle("Alert")
				setAlertText(response.message)
				toggleCustomAlertVisibility()
			}
			getNotifications()
			setCheckBoxVisible(false)
		})
	}
	//UseEffect
	React.useEffect(() => {
		// if (isSignedIn) {
		getNotifications()
		// }
	}, [])

	const [backNavigator, setBackNavigator] = useState(true)


	// const leftButtonFunction = () => {
	// 	toggleCustomAlertVisibility()
	// 	// setBackNavigator(true)
	// }
	// const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
	// const rightButtonFunction = () => {
	// 	// console.warn("2");
	// 	toggleCustomAlertVisibility()
	// 	BackHandler.exitApp()
	// 	// setBackNavigator(false)
	// }

	const wait = (timeout) => {
		return new Promise(resolve => setTimeout(resolve, timeout));
	}


	const onRefresh = () => {
		setRefreshing(true);
		getNotifications()
		wait(900).then(() =>
			setRefreshing(false)
		);
	};


	//UI
	return (

		<View style={styles.container}>
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} isTransparent={false} />
			<Header name="Notification" activateLeftIcon={false} backgroundColor={true}
				notificationIcon={true}
				NotificationOnpress={() =>
					onRefresh()
				}
				NotificationOnpressDelete={() =>
					setCheckBoxVisible(!checkBoxVisible)
				}
			/>


			<ScrollView
				style={{ backgroundColor: "#fff" }}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={getNotifications} />
				}>
				{
					notifications.length > 0
						?
						<>
							{
								checkBoxVisible
								&&
								<View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, paddingTop: 10 }}>
									<TouchableOpacity onPress={cancelNotification}>
										<Text maxFontSizeMultiplier={1} style={styles.button}>
											Cancel
										</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={removeNotification}>
										<Text maxFontSizeMultiplier={1} style={styles.button}>
											Delete
										</Text>
									</TouchableOpacity>
								</View>
							}
							<FlatList
								// keyExtractor={(item) => item.commonId}
								// inverted={true}
								data={notifications}
								renderItem={renderItem}
							/>
						</>
						:
						<Text maxFontSizeMultiplier={1} style={{ alignSelf: "center", fontFamily: Fonts.BOLD, fontSize: 16, color: Fonts.OUTER_SPACE_50, marginTop: 20 }}>
							No Notifications
						</Text>
				}
			</ScrollView>
			{/* <CustomAlert
				title={"Exit"}
				desc={"Are you sure you want to exit?"}
				leftButtonText={"No"}
				rightButtonText={"Yes"}
				toggleCustomAlertVisibility={toggleCustomAlertVisibility}
				leftButtonFunction={leftButtonFunction}
				rightButtonFunction={rightButtonFunction}
				customAlertVisible={customAlertVisible}
			/> */}
			<CustomAlert
				title={alertTitle}
				desc={alertText}
				leftButtonText={"Ok"}
				leftButtonFunction={leftButtonFunction}
				toggleCustomAlertVisibility={toggleCustomAlertVisibility}
				customAlertVisible={customAlertVisible}
			/>
		</View>
	)
};
const mapStateToProps = state => ({
	// name: state.user.name,
	// uid: state.user.uid,
	isSignedIn: state.user.isSignedIn,
	userId: state.user.userId
});

export default connect(mapStateToProps, null)(NotificationScreen);