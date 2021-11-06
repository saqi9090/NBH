import React from 'react'
import { Image, Linking, Platform, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import { Colors, Fonts } from '../../global';
import RightArrowSvg from "../../assets/svg/back icon.svg";
import VerticalDots from "../../assets/svg/more-vertical.svg";
import Blocksvg from "../../assets/svg/block.svg"
import { SCREEN_HEIGHT } from '../../global/constants';
import CallSvg from "../../assets/svg/callBig.svg";
import CalenderSvg from "../../assets/svg/calendar.svg";
import { useNavigation } from '@react-navigation/core';
import { BASE_URL } from '../../global/server';
import { connect } from 'react-redux';

const ChatHeader = ({ userId, name, userImage, phNo, thumbnailImage, otherUserId, otherUserName, otherUserPhno }) => {


	// const [block, setBlock] = React.useState(false);

	// const _toggleBlockbox = () => { setBlock(!block) }

	const dialCall = (number) => {
		let phoneNumber = '';
		if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
		else { phoneNumber = `telprompt:${number}`; }
		Linking.openURL(phoneNumber);
	};

	const navigation = useNavigation()
	return (
		<View >
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
			<View style={styles.Container}>
				<View style={styles.headerStyle}>
					<View style={styles.Arrowstyle}>
						<TouchableOpacity

							onPress={() => navigation.goBack()}
							hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
							style={{ marginRight: 10 }}>
							<RightArrowSvg />
						</TouchableOpacity>
						<Text style={styles.font1}>
							Message
						</Text>
					</View>

					<View >
						{/* <TouchableOpacity
							style={{ alignSelf: "flex-end", marginBottom: 5 }}
							onPress={_toggleBlockbox}>
							<VerticalDots />
						</TouchableOpacity> */}


					</View>
				</View>
				{/* {
					block ?
						<View style={styles.blockBox}>
							<Blocksvg />
							<Text style={styles.font2}>Block</Text>
						</View>
						:
						null
				} */}

				<View style={styles.headerStyle2}>
					<View>
						<TouchableOpacity activeOpacity={1} style={{ flexDirection: "row", alignItems: "center" }}>
							<Image source={{ uri: `${BASE_URL}/users/${otherUserId}/${thumbnailImage}/thumbnailImage` }} style={{ height: 50, width: 50, borderRadius: 100 }} />
							<View style={{ marginLeft: 20 }}>
								<Text style={styles.font3}>{otherUserName}</Text>
								<Text style={styles.font4}>Bussiness Owner</Text>
							</View>
						</TouchableOpacity>
					</View>

					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<TouchableOpacity
							onPress={() => dialCall(otherUserPhno)}
							style={styles.callSvg}>
							<CallSvg />
						</TouchableOpacity>
						{/* <TouchableOpacity style={styles.callSvg}>
							<CalenderSvg />
						</TouchableOpacity> */}
					</View>



				</View>
			</View>

		</View>
	)
}
const mapStateToProps = state => ({
	name: state.user.name,
	email: state.user.email,
	phNo: state.user.phNo,
	userImage: state.user.thumbnailImage,
	userId: state.user.userId
});

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader)
// export default 

const styles = StyleSheet.create({
	Container: {
		// padding:10,
		height: SCREEN_HEIGHT / 7.5,
		backgroundColor: Colors.WHITE,
		borderBottomLeftRadius: 25,
		borderBottomRightRadius: 25
	},
	headerStyle: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginHorizontal: 20
	},
	font1: {
		fontSize: 15,
		fontFamily: Fonts.BOLD,
		color: Colors.BLACK
	},
	Arrowstyle: {
		flexDirection: "row",
		alignItems: "center"
	},
	blockBox: {
		marginRight: 30,
		alignSelf: "flex-end",
		height: 25,
		width: 60,
		padding: 5,
		backgroundColor: Colors.WHITE,
		borderRadius: 8,
		flexDirection: "row",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	font2: {
		fontSize: 10,
		fontFamily: Fonts.BOLD,
		color: Colors.BLACK,
		marginLeft: 5
	},
	headerStyle2: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginHorizontal: 20,
		// paddingTop: 40
	},
	font3: {
		fontSize: 14,
		fontFamily: Fonts.MEDIUM,
		color: Colors.BLACK,
	},
	font4: {
		fontSize: 13,
		fontFamily: Fonts.BOLD,
		color: Colors.GRAY_DARK,
	},
	callSvg: {
		marginHorizontal: 10
	}
})
