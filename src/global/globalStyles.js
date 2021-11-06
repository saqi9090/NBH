import {
	StyleSheet
} from 'react-native';
import { Colors, Fonts } from '../global/index';

export const globalStyles = StyleSheet.create({
	button: {
		height: 50,
		backgroundColor: Colors.PRIMARY,
		borderRadius: 10,
		justifyContent: "center", alignItems: "center",
		marginHorizontal: 20,
		marginBottom: 15
	},
	buttonText: {
		fontFamily: Fonts.SEMIBOLD,
		fontSize: 17,
		color: Colors.JUNGLE_BLACK
	},
	view: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	buttonText2: {
		fontFamily: Fonts.MEDIUM,
		fontSize: 12,
		color: Colors.WHITE,
	},
});