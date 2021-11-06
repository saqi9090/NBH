
import { styles } from './PostAdDetailStyles';
import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Header from "../../components/Header/Header";
import { Colors, Fonts, ScreenNames } from '../../global';
import CallSvg from "../../assets/svg/call.svg";
import WhatappSvg from "../../assets/svg/whatsappprofile.svg";
import WebSvg from "../../assets/svg/web.svg";
import { globalStyles } from '../../global/globalStyles';
import ReportModal from '../../components/ReportModal/ReportModal';


const PostAdDetailScreen = ({ navigation }) => {

	//state
	const [reasonreport, setReasonreport] = React.useState(false);

	//function 
	const _toggleReasonReport = () => {
		setReasonreport(!reasonreport)
	}
	const _toggleReport = () => {
		console.log("this use error not came");
	}

	const goMemberDetail = () => {
		navigation.navigate(ScreenNames.NBHMEMBERDETAIL_SCREEN)
	}

	return (
		<View style={{ flex: 1 }}>
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
			<Header name={"Business Detail"} backgroundColor={true} YellowHomeIcon={false}


			/>
			<View style={{ flex: 1, backgroundColor: Colors.WHITE }}>

				<ScrollView>



					<View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, marginHorizontal: 40, marginTop: 20, marginBottom: 20 }}>
						<View>
							<TouchableOpacity onPress={goMemberDetail}>
								<Text style={styles.memberuserName}>Bhavesh Vora</Text>
							</TouchableOpacity>



							<View style={{ flexDirection: "row", marginTop: 10 }}>
								<TouchableOpacity style={{ marginRight: 10 }}>
									<WebSvg />
								</TouchableOpacity>
								<Text style={styles.memberPhoneNumber1}>bhavesh@gmail.com</Text>
							</View>
							<View style={{ flexDirection: "row", marginTop: 10 }}>
								<TouchableOpacity style={{ marginRight: 10 }}>
									<CallSvg />
								</TouchableOpacity>
								<Text style={styles.memberPhoneNumber}>9876543210</Text>
							</View>
							<View style={{ flexDirection: "row", marginTop: 10 }}>
								<TouchableOpacity style={{ marginRight: 10 }}>
									<WhatappSvg />
								</TouchableOpacity>
								<Text style={styles.memberPhoneNumber}>9876543210</Text>
							</View>

						</View>
						<TouchableOpacity style={{ alignItems: "center" }}>
							<TouchableOpacity onPress={goMemberDetail}>

								{/* <View style={{ height: 70, width: 70 ,backgroundColor:"red" ,borderRadius:100}}> */}
								<Image source={require("../../assets/images/1.png")} style={{ height: 95, width: 95, borderRadius: 100 }} />
								{/* </View> */}
							</TouchableOpacity>

						</TouchableOpacity>
					</View>
				</ScrollView>

				<TouchableOpacity style={globalStyles.button} onPress={_toggleReasonReport}>
					<Text style={globalStyles.buttonText}>Report this Post</Text>
				</TouchableOpacity>


			</View>
			<ReportModal reasonreport={reasonreport} _toggleReasonReport={_toggleReasonReport} _toggleReport={_toggleReport} />

		</View>


	)
}

export default PostAdDetailScreen
