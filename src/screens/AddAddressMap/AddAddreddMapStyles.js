import { View, Text, StyleSheet } from 'react-native';

import { Colors, Constants, Fonts } from '../../global/index';


export const styles = StyleSheet.create({
    mainPage: {
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.SECONDARY,

    },
    mainCantanier: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%"
    },
    googleMapPosition: {
        flex: 1,
        // backgroundColor:"red",
        width: "100%",
        height: "70%"
    },
    bottomContainer: {
        width: "100%",
        paddingHorizontal: 10,
        // height:"20%"

    },
    textalign: {
        fontFamily: Fonts.MEDIUM,
        paddingVertical: 10,
        fontSize: Fonts.SIZE_18,
        paddingHorizontal: 10,
        textAlign: "left"
    },
    location: {
        flexDirection: "row",
        justifyContent: "space-between",
        // borderBottomWidth: 1,
        // borderBottomColor: "#8a8a8a60",
        paddingBottom: 5
    },
    locationDetail: {
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingLeft: 7,
        alignItems: "center",
        marginBottom: 5
    },
    confirmButton: {
        // width:,
        backgroundColor: Colors.CAMBOGE,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        borderRadius: 10
    },
    modalContainer: {
        // flex: 1,
        backgroundColor: '#000000aa',
        justifyContent: 'flex-end'
    },
    confirmContainer: {
        // flex: 0.25,
        backgroundColor: Colors.WHITE,
        paddingBottom: 20,
    },
    confirmHeader: {
        backgroundColor: Colors.PRIMARY,
        flexDirection: 'row',
        height: 50,
        borderRadius: 10,
        justifyContent: 'space-between',
    },
    confirmDeliveryText: {
        paddingLeft: 20,
        paddingTop: 15,
        paddingBottom: 15,
        fontFamily: Fonts.BOLD,
        fontSize: Fonts.SIZE_16,
        color: Colors.WHITE,
        letterSpacing: 0.2,

    },
    closeButton: {
        // paddingLeft: 20,
        // paddingTop: 20,
        // paddingBottom: 20,
        paddingRight: 20,
        justifyContent: 'center',
    },
    confirmTextContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
    },
    confirmText: {
        fontFamily: Fonts.BOLD,
        fontSize: Fonts.SIZE_14,
        color: Fonts.BLACK,
        letterSpacing: 0.2,
    },
    confirmTextButtonContainer: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    yesButton: {
        paddingVertical: 12,
        paddingTop: 8,
        width: 80,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        marginLeft: 10
    },
    yesButtonText: {
        fontFamily: Fonts.BOLD,
        fontSize: Fonts.SIZE_16,
        color: Colors.WHITE,
    },
}
)