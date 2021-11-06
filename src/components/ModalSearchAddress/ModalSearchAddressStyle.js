import React from 'react'
import { View, Text, Modal, StyleSheet } from 'react-native'
import { Colors, Constants, Fonts } from '../../global/index';
import { SCREEN_WIDTH } from '../../global/constants';

export const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'flex-end',
		backgroundColor: '#000000Aa'
	},
	centeredView1: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	modalView: {
		height: 450,
		backgroundColor: Colors.WHITE,
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10
	},
	selectaddrescontainer: {
		flexDirection: "row",
		padding: 24,
		paddingLeft: 10,
		height: 40,
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: Colors.WHITE,
	},
	fontselectaddres: {
		fontSize: 20,
		fontFamily: Fonts.MEDIUM,
		color: Colors.PRIMARY
	},
	textInput: {
		// marginLeft: 10,
		// marginRight: 10,
		width: "100%",
		fontFamily: Fonts.MEDIUM,
		fontSize: Fonts.SIZE_15,
		height: 40,
		marginLeft: 5,
		alignItems: "center",
		borderColor: Colors.GRAY_SEMIBOLD,
		opacity: 0.8
	},
	selectPlacelocation: {
		flexDirection: "row",
		// margin: 8,
		alignItems: "center",
		// backgroundColor: 'gray'
	},
	selectPlace: {
		borderRadius: 20,
		marginRight: 8,
		padding: 2,
		width: 40,
		alignItems: "center",
		borderWidth: 1,
		borderColor: Colors.GRAY_DARK,
	},
	searchInput: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		height: 40,
		padding: 10,
		borderRadius: 10,
		marginTop: 20,
		borderColor: '#bababa60',
		fontFamily: Fonts.MEDIUM,
		marginHorizontal: 20,
		marginBottom: 20
	},
	currentLocation: {
		marginTop: 20,
		// paddingBottom: 8,
		flexDirection: "row",
		alignItems: "center",
		// borderBottomWidth: 1,
		// borderColor: Colors.GRAY_DARK,
		marginHorizontal: 20,
		// backgroundColor: "green"
	},
	recentLocation: {
		marginTop: 5,
		marginLeft: 10,

	}
})