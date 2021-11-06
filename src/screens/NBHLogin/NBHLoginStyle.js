import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors, Fonts, Constants } from '../../global/index'

export const styles = StyleSheet.create({

	mainScreen: {
		flex: 1,
		backgroundColor: Colors.WHITE
	},
	textinput: {
		borderWidth: 1,
		borderColor: Colors.BLACK,
		height: 60,
		marginLeft: 20,
		borderRadius: 5,
		fontSize: 18,
		paddingHorizontal: 15,
		fontFamily: Fonts.LIGHT,
		color: Fonts.BLACK,
		marginRight: 20,
	},
	filterinput: { height: 40, fontSize: 18, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK },
	font1: { fontSize: 20, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK }

})