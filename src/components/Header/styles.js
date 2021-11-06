import { Colors, Constants, Fonts } from "../../global/index";

const { StyleSheet } = require("react-native");



export const styles = StyleSheet.create({
    container: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    headerLeftContainer: {
        flex: 1.1,
        // backgroundColor: Colors.PRIMARY
    },

    headerLeft: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 0

    },

    headerCenterContainer: {
        flex: 6,
        // backgroundColor: Colors.PRIMARY
    },

    headerCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerRightContainer: {
        flex: 1.1,
        // backgroundColor: Colors.WHITE
    },

    headerRight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 0,
    },

    headerText: {
        fontSize: Fonts.SIZE_18,
        fontFamily: Fonts.SEMIBOLD,
        color: Colors.BLACK
    }
});