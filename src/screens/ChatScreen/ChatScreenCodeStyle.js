import { Dimensions, StyleSheet } from 'react-native';
// import { Colors, Constants } from '../../global/Index';


export const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	circleAvtar: {
		width: 65,
		height: 65,
		borderRadius: 65 / 2,
		backgroundColor: "#bababa",
	},

	sendContain: {
		flexDirection: 'row',
		justifyContent: "space-between"
	},

	sendbtn: {
		right: 80,
		justifyContent: 'center',
		alignContent: 'center',
	},
});