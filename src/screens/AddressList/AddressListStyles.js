import { StyleSheet } from 'react-native'

import { Colors, Fonts, Constants } from '../../global/index'

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
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
    addAddresstext: {
        color: Colors.PRIMARY,
        fontFamily: Fonts.BOLD,
        fontSize: 16
    },
    mainCard: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        elevation: 10,
        borderRadius: 10,
        paddingVertical: 10,

        marginHorizontal: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
    },
});