import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";
import { WINDOW_WIDTH } from "../../global/constants";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.WHITE,
	},
	card: {
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		// backgroundColor: 'green',
		// marginTop: -50,
		// padding: 20,
		// paddingTop: 40,
		alignItems: "center"
	},
	mapContainer: {
		width: WINDOW_WIDTH,
		height: WINDOW_WIDTH + (WINDOW_WIDTH / 8.92),
	},
	sideHeading: {
		paddingHorizontal: 20,
		marginTop: 20,
		fontFamily: Fonts.SEMIBOLD,
		fontSize: Fonts.SIZE_16,
		color: Fonts.BLACK,
	},
	deliveryUserContaienr: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 20
	},
	deliveryUserCards: {
		flex: 1,
		position: "relative",
		flexDirection: "row",
		padding: 15,
		borderRadius: 10,
		backgroundColor: Colors.WHITE,
		zIndex: 1
	},
	deliveryUserImage: {
		width: 77,
		height: 70
	},
	deliveryUserDetail: {
		paddingLeft: 15,
		justifyContent: "space-between"
	},
	fontMedium: {
		fontFamily: Fonts.SEMIBOLD,
		fontSize: Fonts.SIZE_14,
		color: Fonts.BLACK,
	},
	fontMediumOuterSpace: {
		fontFamily: Fonts.SEMIBOLD,
		fontSize: Fonts.SIZE_12,
		color: Fonts.OUTER_SPACE,
	},
	deliveryUserLocation: {
		flexDirection: 'row',
		alignItems: "center"
	}
});