import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Fonts } from "../../../global";

export const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: '#00000050',
	},

	confirmContainer: {
		backgroundColor: "#FFF",
		paddingBottom: 20
	},
	confirmHeader: {
		backgroundColor: Colors.PRIMARY,
		flexDirection: 'row',
		height: 66,
		justifyContent: 'space-between',
		alignItems: "center",
		paddingHorizontal: 20
	},
	confirmDeliveryText: {
		// paddingLeft: 20,
		paddingTop: 15,
		paddingBottom: 15,
		fontFamily: Fonts.BOLD,
		fontSize: 20,
		color: Colors.JUNGLE_BLACK,
		letterSpacing: 0.2,


	},
	chips: {
		backgroundColor: "#FFF", elevation: 4, padding: 5, shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22, borderRadius: 10, margin: 16, alignItems: "center", shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
	},
	font1: { fontSize: 17, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK, },
	font2: { fontSize: 15, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYX_60, }

})