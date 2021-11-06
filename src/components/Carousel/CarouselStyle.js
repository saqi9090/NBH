import { StyleSheet } from 'react-native';
import { Colors, Constants } from '../../global';
import { SCREEN_WIDTH } from '../../global/constants';

export const styles = StyleSheet.create({
	contentContainerStyle: {
		// paddingTop: 10
	},
	con: {
		position: 'relative',
	},
	row: {
		width: 51,
		flexDirection: 'row',
		overflow: 'hidden',
	},
	// carousel item
	itemCon: {
		backgroundColor: Colors.WHITE,
		width: Constants.SCREEN_WIDTH - 40,
		height: (Constants.SCREEN_WIDTH - 40) / 2,
		marginHorizontal: 20,
		// borderRadius: 20,
	},

	//dots
	circle: {
		height: 7,
		width: 7,
		borderRadius: 7 / 2,
		backgroundColor: Colors.PRIMARY,
		marginRight: 10,
	},
	dotsCon: {
		width: SCREEN_WIDTH - 40,
		height: 7,
		position: 'relative',
		bottom: 24,
		left: 20,
		alignItems: 'center',
	},
	dotsFlatList: {
		height: 7,
		width: 85,
	},
});