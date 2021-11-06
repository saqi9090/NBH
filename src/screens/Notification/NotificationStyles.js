import { StyleSheet } from 'react-native'

import { Colors, Fonts, Constants } from '../../global/index'

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    headerStyle: {
        height: 60,
        backgroundColor: Colors.PRIMARY,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20
    },
    headerBackIcon: {
        height: 29,
        width: 46,
        marginRight: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    headerCartIcon: {
        height: 26,
        width: 18,
        flexDirection: "row",
        alignItems: "center"
    },
    headerImage: {
        height: 27,
        width: 145,
        borderWidth: 1,
        borderColor: Colors.WHITE
    },
    image: {
        height: "100%",
        width: "100%",
        marginRight: 5
    },
    rowFront: {
        alignItems: 'flex-start',
        paddingTop: 20,
        backgroundColor: Colors.WHITE,
        justifyContent: 'center',
        // marginBottom: 10,
        flexDirection: "row"
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: Colors.ALERT,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'yellow',
        right: 0,
    },
    notificationDes: {
        fontFamily: Fonts.MEDIUM,
        fontSize: Fonts.SIZE_14,
        color: Fonts.BLACK
    },
    notificationText: {
        fontFamily: Fonts.LIGHT,
        fontSize: Fonts.SIZE_16,
        color: Fonts.BLACK
    },
    delete: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        width: 75,
        textAlign: "center",
        backgroundColor: '#d24649',
        paddingVertical: 25,
        fontFamily: Fonts.LIGHT,
        fontSize: Fonts.SIZE_12,
        color: Colors.WHITE,
    },
    chatContainer: {
        position: 'absolute',
        zIndex: 2,
        bottom: 40,
        right: 30,
        height: 31,
        width: 31,
        borderRadius: 31 / 2,
        elevation: 2,
        backgroundColor: Colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noNotificationsAvailable: {
        textAlign: 'center',
        fontSize: Fonts.SIZE_14,
        fontFamily: Fonts.MEDIUM,
        color: Fonts.BLACK
    },
    button: {
        fontFamily: Fonts.BOLD,
        color: Colors.PRIMARY,
        fontSize: 16
    }
});