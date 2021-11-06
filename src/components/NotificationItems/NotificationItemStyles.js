import { StyleSheet } from 'react-native'

import { Colors, Fonts, Constants } from '../../global/index'

export const styles = StyleSheet.create({
    rowFront: {
        alignItems: 'flex-start',
        paddingTop: 20,
        backgroundColor: Colors.WHITE,
        justifyContent: 'center',
        // marginBottom: 10,
    },
    notificationText: {
        fontFamily: Fonts.BOLD,
        fontSize: 16
    }
});