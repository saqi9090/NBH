import { StyleSheet } from 'react-native'

import { Colors, Fonts, Constants } from '../../global/index'

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.WHITE,
	},
	rowWithSpace: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	text: {
		fontFamily: Fonts.LIGHT,
		fontSize: Fonts.SIZE_14,
		color: Fonts.BLACK,
		maxHeight: 150
	},
	Subtitle: {
		fontFamily: Fonts.LIGHT,
		fontSize: Fonts.SIZE_14,
		color: Fonts.BLACK
	},
	text2: {
		fontFamily: Fonts.MEDIUM,
		fontSize: Fonts.SIZE_14,
		color: Colors.PRIMARY
	},
	image: {
		height: Math.floor((Constants.SCREEN_WIDTH - 60) / 2),
		width: Math.floor((Constants.SCREEN_WIDTH - 60) / 2),
		borderRadius: 10,
		// marginRight: 12,
		marginBottom: 15
	},
	removeImage: {
		position: "absolute", top: -7, right: -7, alignItems: "center", justifyContent: "center", backgroundColor: Colors.PRIMARY, height: 20, width: 20, borderRadius: 10
	},
	imagePicker: {
		height: 223,
		width: '100%',
	},
	modalContainer: {
		flex: 1,
		backgroundColor: '#000000aa',
		justifyContent: 'flex-end'
	},
	confirmContainer: {
		flex: 0.3,
		backgroundColor: Colors.WHITE
	},
	confirmHeader: {
		backgroundColor: Colors.PRIMARY,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	confirmDeliveryText: {
		paddingLeft: 20,
		paddingTop: 20,
		paddingBottom: 20,
		fontFamily: Fonts.MEDIUM,
		fontSize: Fonts.SIZE_14,
		color: Fonts.BLACK,

	},
	closeButton: {
		paddingLeft: 20,
		paddingTop: 25,
		paddingBottom: 20,
		paddingRight: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	confirmTextContainer: {
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 20,
	},
	confirmText: {
		fontFamily: Fonts.MEDIUM,
		fontSize: Fonts.SIZE_11,
		color: Fonts.BLACK,
		letterSpacing: 0.2,
	},
	confirmTextButtonContainer: {
		paddingTop: 20,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	yesButton: {
		paddingVertical: 12,
		width: 100,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.PRIMARY,
		borderRadius: 10,
		marginLeft: 10
	},
	yesButtonText: {
		fontFamily: Fonts.MEDIUM,
		fontSize: Fonts.SIZE_11,
		color: Fonts.BLACK,
	},
	buttonText: {
		fontSize: Fonts.SIZE_16,
		fontFamily: Fonts.MEDIUM,
		color: Fonts.BLACK
	},
	parentContainer: {
		flex: 1,
		backgroundColor: '#000000aa',
		justifyContent: 'flex-end'
	},
	aspectRadiocontainer: {
		// flexGrow: 0.1,
		backgroundColor: Colors.WHITE
	},
	header: {
		backgroundColor: Colors.PRIMARY,
		flexDirection: 'row',
		alignItems: 'center'
	},
	headerFirstChild: {
		flex: 1,
		paddingLeft: 20,
		paddingVertical: 20,
	},
	headerText: {
		fontFamily: Fonts.MEDIUM,
		fontSize: Fonts.SIZE_16,
		color: Fonts.BLACK
	},
	headerSecondChild: {
		paddingRight: 26,
		paddingVertical: 20,
		alignItems: 'flex-end',
		paddingLeft: 20
	},
	descriptionContainer: {
		padding: 20
	},
	description: {
		fontFamily: Fonts.LIGHT,
		fontSize: Fonts.SIZE_11,
		color: Fonts.BLACK
	},
	okBtn: {
		backgroundColor: Colors.PRIMARY,
		paddingHorizontal: 30,
		paddingVertical: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
	okBtnContainer: {
		alignItems: 'center',
	},
	btnText: {
		fontFamily: Fonts.MEDIUM,
		fontSize: Fonts.SIZE_11,
		color: Fonts.BLACK
	},
	selectRatioContainer: {
		paddingTop: 20,
		flexDirection: 'row',
		paddingHorizontal: 20,
		justifyContent: 'space-between'
	},
	selectRatioItem: {
	},
	aspectRatioItems: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalView: {
		flex: 1,
		backgroundColor: '#000000aa',
		justifyContent: 'flex-end',
	},
	voucherCard: {
		// marginHorizontal: 25,
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		paddingBottom: 40
	},
	optionTitle: {
		fontSize: 11,
		color: 'black',
		marginBottom: 35
	},
	optionDetail: {
		fontSize: 14,
		color: 'black',
		paddingVertical: 10,
		fontFamily: Fonts.MEDIUM,
	},
	container1: {
		flexDirection: "row",
		flex: 1
	},
	image1: {
		height: 61,
		width: 61,
		borderRadius: 50,
		marginRight: 20
	},
	text1: {
		fontFamily: Fonts.LIGHT,
		fontSize: Fonts.SIZE_12,
		color: Fonts.BLACK

	},
	brandNameContainer: {
		flex: 1
	},
	brandNameText1: {
		fontFamily: Fonts.MEDIUM,
		fontSize: Fonts.SIZE_18,
		color: Fonts.BLACK
	},
});