//react components
import React from 'react';
import {
	View, Text,
	KeyboardAvoidingView, Platform,
	Modal, TouchableOpacity,
	TextInput, FlatList,
	Image, StatusBar, Linking
} from 'react-native';

import ReportModal from '../../ReportModal/ReportModal';

//styles
import { styles } from "./CarouselModalStyle";
import CrossSvg from "../../../assets/svg/cross.svg";
import Report from '../../../assets/svg/Report.svg';
import { Colors, Fonts, ScreenNames } from '../../../global';
import { useNavigation } from '@react-navigation/native';
import CustomAlert from '../../CustomAlert/CusomAlert';

const CarouselModal = ({
	showCarouelModal, setShowCarouelModal,
	item,
}) => {

	const [heart, setHeart] = React.useState(false);
	const [reasonreport, setReasonreport] = React.useState(false);
	const [reasonId, setReasonId] = React.useState([])


	const navigation = useNavigation();
	//function : main function
	const gotoProfile = () => {
		navigation.navigate(ScreenNames.NBHMEMBERDETAIL_SCREEN, { userId: item.userId });
		setShowCarouelModal(false)
	}
	const goToWhatsapp = () => {
		const url = `whatsapp://send?text=Hiii My Self ${item.username}&phone=91${item.whatsAppNumber}`
		Linking.openURL(url)
	}
	const gotoDialerPad = () => {
		Linking.openURL(`tel:${item.phone}`)
	}
	const gotoWeb = () => {
		let containsHttp = item.website.toString().includes('http')
		//modified created date
		Linking.openURL(containsHttp ? item.website : "http://" + item.website)
	}

	const _toggleReasonReport = () => {
		setReasonreport(!reasonreport)
	}
	const [customAlertVisible, setCustomAlertVisible] = React.useState(false);
	const [alertText, setAlertText] = React.useState('');


	const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
	const leftButtonFunction = () => {
		toggleCustomAlertVisibility()
	}
	return (
		<Modal
			animationType={'fade'}
			visible={showCarouelModal}
			onRequestClose={() => setShowCarouelModal(false)}
			transparent={true}
		>
			<StatusBar backgroundColor="#00000050" />
			<View style={styles.modalContainer}>
				<KeyboardAvoidingView behavior={Platform.OS == "android" ? null : "padding"}>
					<View style={styles.confirmContainer}>
						<View style={styles.confirmHeader}>
							<Text style={styles.confirmDeliveryText}
								maxFontSizeMultiplier={1}>
								Choose option
							</Text>


							<TouchableOpacity
								onPress={() => setShowCarouelModal(false)}
								// style={styles.closeButton}
								hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
							>
								<CrossSvg />
							</TouchableOpacity>
						</View>
						<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
							<View>
								<TouchableOpacity
									onPress={() => gotoProfile()}
									style={styles.chips}>
									<Text style={{ fontSize: 18, fontFamily: Fonts.BOLD }}>
										Profile
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => goToWhatsapp()}
									style={styles.chips}>
									<Text style={{ fontSize: 18, fontFamily: Fonts.BOLD }}>
										Whatsapp
									</Text>
								</TouchableOpacity>
							</View>

							<TouchableOpacity
								onPress={() => _toggleReasonReport()}
								activeOpacity={0.7} style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "center",
									alignSelf: 'center',
									height: 28, width: 79,
									borderRadius: 10,
									shadowColor: "#000",
									shadowOffset: {
										width: 0,
										height: 1,
									},
									shadowOpacity: 0.22,
									shadowRadius: 2.22,
									marginBottom: 10,
									margin: 10,
									backgroundColor: "#FFF", elevation: 4, padding: 6, borderRadius: 10
								}}>
								<Text style={{ fontSize: 18, fontFamily: Fonts.BOLD }}>Report</Text>
								<Report />
							</TouchableOpacity>
							<View>
								<TouchableOpacity
									onPress={() => gotoWeb()}
									style={styles.chips}>
									<Text style={{ fontSize: 18, fontFamily: Fonts.BOLD }}>
										Website
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => gotoDialerPad()}
									style={styles.chips}>
									<Text style={{ fontSize: 18, fontFamily: Fonts.BOLD }}>
										Phone call
									</Text>
								</TouchableOpacity>
							</View>

						</View>
					</View>
				</KeyboardAvoidingView>
			</View>
			<CustomAlert
				title={"Alert"}
				desc={alertText}
				leftButtonText={"Ok"}
				leftButtonFunction={leftButtonFunction}
				toggleCustomAlertVisibility={toggleCustomAlertVisibility}
				customAlertVisible={customAlertVisible}
			/>
			<ReportModal heartShow={heart} reasonreport={reasonreport} _toggleReasonReport={_toggleReasonReport}
				setReasonId={setReasonId} reasonId={reasonId}
				setAlertText={setAlertText}
				toggleCustomAlertVisibility={toggleCustomAlertVisibility}
				postId={item.premiumPostId} />
		</Modal>
	)
}




export default CarouselModal;
