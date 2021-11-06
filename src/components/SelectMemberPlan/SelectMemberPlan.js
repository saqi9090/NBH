import React from 'react'
import { FlatList, KeyboardAvoidingView, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, Fonts, Server } from '../../global'
import { memberplane } from '../DummyData/DummyDataScreen'
import CancelSvg from '../../assets/svg/crossSmall'
import axios from 'axios'
import { getService } from '../../services/getService'

const SelectMemberPlan = ({ memberPlane, _toggleMemberPlaneModal, setMemberPlaneTextValue,
	setSelectedPlanId, filterlist, cityFilter, memberHeader, bussnessText, memberPlaneTextValue, selectedPlanId }) => {

	const [membersPlans, setMembersPlans] = React.useState(null)


	console.warn("selectedPlanId", selectedPlanId);


	const onShow = async () => {
		if (filterlist == true) {
			// const response = await axios.get(`${Server.BASE_URL}/users/getAllBusiness`)
			// setMembersPlans(["None", ...response.data])

			const req = `/users/getAllBusiness`
			getService(req).then((response) => {
				setMembersPlans(["None", ...response.data])
			})
		}
		else if (cityFilter == true) {
			// const response = await axios.get(`${Server.BASE_URL}/users/getAllCity`)
			// setMembersPlans(["None", ...response.data])

			const req = `/users/getAllCity`
			getService(req).then((response) => {
				setMembersPlans(["None", ...response.data])
			})
		}
		else {
			// const response = await axios.get(`${Server.BASE_URL}/memberPlans/active`)
			// setMembersPlans([...response.data])

			const req = `/memberPlans/active`
			getService(req).then((response) => {
				setMembersPlans(["None", ...response.data])
			})
		}
	}

	return (
		<Modal
			animationType={'fade'}
			visible={memberPlane}
			// onRequestClose={toggleModal}
			onShow={onShow}
			transparent={true}
		// statusBarTranslucent={true}
		>
			<View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "#00000010" }}>
				<View style={styles.modalContainer}>
					<KeyboardAvoidingView behavior={Platform.OS == "android" ? null : "padding"}>
						<View style={styles.confirmContainer}>
							<View style={styles.confirmHeader}>
								<Text style={styles.confirmDeliveryText}
									maxFontSizeMultiplier={1}>{memberHeader}</Text>
								<TouchableOpacity
									onPress={_toggleMemberPlaneModal}
									style={styles.closeButton}>
									<CancelSvg />
								</TouchableOpacity>
							</View>
							{
								membersPlans
								// false
								&&
								<FlatList
									data={membersPlans}
									style={{ marginVertical: 0, marginBottom: 10 }}
									showsVerticalScrollIndicator={false}
									renderItem={({ item, index }) => (
										<TouchableOpacity
											onPress={() => {
												setMemberPlaneTextValue(item)
												setSelectedPlanId(item.memberPlanId)
												_toggleMemberPlaneModal()
											}}
											style={{ elevation: 3, }}>
											<View style={{ flex: 1, marginVertical: 12, paddingHorizontal: 20 }}>
												{
													<Text style={{ fontSize: 14, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK }}>
														{
															item.memberTitle + "( ₹" + item.baseCount + `+ ${item.gstPercent}% GST)(₹` + item.finalCost + ")"
														}
													</Text>
												}
											</View>
											<View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View>
										</TouchableOpacity>
									)} />}
						</View>
					</KeyboardAvoidingView>
				</View>
			</View>
		</Modal>

	)
}

export default SelectMemberPlan

const styles = StyleSheet.create({
	modalContainer: {
		// flex: 1,
		// height:200
		// backgroundColor: '#00000050',
		// justifyContent: 'flex-end'
	},
	confirmContainer: {
		// flex: 0.25,
		// flex:1,
		// height:200,
		marginTop: 10,
		elevation: 5,
		paddingBottom: 10,
		backgroundColor: Colors.WHITE,
		// height:300
		// paddingBottom: 20,
	},
	confirmHeader: {
		backgroundColor: Colors.BRANDLESBLUE,
		flexDirection: 'row',
		height: 50,
		justifyContent: 'space-between',
	},
	confirmDeliveryText: {
		paddingLeft: 20,
		paddingTop: 15,
		paddingBottom: 15,
		fontFamily: Fonts.BOLD,
		fontSize: Fonts.SIZE_16,
		color: Colors.WHITE,
		letterSpacing: 0.2,

	},
	closeButton: {
		// paddingLeft: 20,
		// paddingTop: 20,
		// paddingBottom: 20,
		paddingRight: 20,
		justifyContent: 'center',
	},
})
