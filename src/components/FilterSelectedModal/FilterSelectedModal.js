import React from 'react'
import { FlatList, KeyboardAvoidingView, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, Constants, Fonts, Server } from '../../global'
import { memberplane } from '../DummyData/DummyDataScreen'
import CancelSvg from '../../assets/svg/crossSmall'
import axios from 'axios'
import SearchFilter from '../SearchFilter/SearchFilter'

const FilterSelectedModal = ({ memberPlane, _toggleSelectedModal, _toggleFilterMemberModal, memberHeader, setMemberPlaneTextValue, data }) => {




	const [selectedValue, setSelectedValue] = React.useState(null);
	const [searchResults, setSearchResults] = React.useState(null)


	const onShow = async () => {

		setSelectedValue(["None", ...data])
		setSearchResults([])
		// _toggleFilterMemberModal()
	}

	const renderItem = ({ item, index }) => (
		<TouchableOpacity
			onPress={() => {
				setMemberPlaneTextValue(item);
				_toggleSelectedModal()
			}}
			style={{ elevation: 3, }}>
			<View style={{ flex: 1, marginVertical: 12, paddingHorizontal: 20 }}>
				{
					<Text style={{ fontSize: 14, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK }}>
						{item}
					</Text>
				}
			</View>
			<View style={{ height: 1, width: "100%", backgroundColor: Colors.GRAY_LIGHT }}></View>
		</TouchableOpacity>
	)



	return (
		<Modal
			animationType={'fade'}
			visible={memberPlane}
			onShow={onShow}
			transparent={true}>
			<View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "#00000010" }}>
				<KeyboardAvoidingView behavior={Platform.OS == "android" ? null : "padding"}>
					<View style={styles.confirmContainer}>
						<View style={styles.confirmHeader}>
							<Text style={styles.confirmDeliveryText}
								maxFontSizeMultiplier={1}>{memberHeader}</Text>
							<TouchableOpacity
								onPress={_toggleSelectedModal}
								style={styles.closeButton}>
								<CancelSvg />
							</TouchableOpacity>
						</View>


						<View>
							<SearchFilter setSearchResults={setSearchResults}
								data={selectedValue && selectedValue} searchBy={"name"} />
						</View>

						<FlatList
							// searchResults && searchResults.length > 0 ? searchResults : membersList


							data={searchResults && searchResults.length > 0 ? searchResults : selectedValue}
							style={{ marginVertical: 0, }}
							showsVerticalScrollIndicator={false}
							renderItem={renderItem} />
					</View>
				</KeyboardAvoidingView>
			</View>
		</Modal>

	)
}

export default FilterSelectedModal;

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
		maxHeight: Constants.SCREEN_HEIGHT / 2

		// height:300
		// paddingBottom: 20,
	},
	confirmHeader: {
		backgroundColor: Colors.PRIMARY,
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
