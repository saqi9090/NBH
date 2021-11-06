import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors, Fonts, Constants } from '../../global/index'

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE
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
    notificationIconStyle: {
        height: 23,
        width: 22
    },
    notificationCountStyle: {
        height: 14,
        width: 14,
        backgroundColor: Colors.ALERT,
        position: "absolute",
        right: 0,
        top: -5,
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
    },
    notificationTextStyle: {
        fontFamily: Fonts.MEDIUM,
        fontSize: 10,
        color: Colors.WHITE,
        marginTop: -2
    },
    userNametext: {
        fontFamily: Fonts.BOLD,
        fontSize: 24,
        color: Colors.WHITE,
        marginTop: 20,
        marginHorizontal: 35
    },
    carouselStyle: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 10,
        width: "100%",
        overflow: "hidden",
    },
    titleView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginTop: 40,
        alignItems: "center"
    },
    titleText: {
        fontFamily: Fonts.BOLD,
        fontSize: 20
    },
    titleSubText: {
        fontFamily: Fonts.BOLD,
        fontSize: 16,
        color: "#16161650",
        marginRight: 5,
        marginTop: -2
    },
    sections: {
        marginHorizontal: 10,
        marginTop: 20
    },
    backGroundView: {
        height: 240,
        width: "100%",
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        position: "absolute",
        zIndex: -1,
        top: 80
    },
    productImage: {
        alignItems: "center",
        marginTop: 50,
        borderRadius: 100
    },
    imageContainer: {
        height: 250,
        width: 250
    },
    productName: {
        fontFamily: Fonts.BOLD,
        fontSize: 28,
        marginTop: 20
    },
    title: {
        fontFamily: Fonts.BOLD,
        fontSize: 20,
        color: Colors.OUTER_SPACE,
        marginTop: 20
    },
    DescriptionView: {
        paddingHorizontal: 29
    },
    Description: {
        fontSize: 18,
        fontFamily: Fonts.BOLD,
        color: Colors.GRAY_MEDIUM,
        marginTop: 20
    },
    variantContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        height: 72,
        width: 86,
        marginTop: 25,
        borderRadius: 10,
        elevation: 10,
        marginLeft: 20,
        marginBottom: 20
    },
    variantText: {
        fontSize: 16,
        marginLeft: 12,
        marginTop: 12,
        fontFamily: Fonts.BOLD
    },
    addButtonText: {
        color: Colors.WHITE,
        fontFamily: Fonts.BOLD,
        fontSize: 20
    }, container1: {
        flex: 1,
        backgroundColor: "#000000Aa",
        // flexDirection: "row",
        justifyContent: "flex-end",
        // alignItems: "flex-end"
    },
    modalcontainer: {
        // flex: 1,
        maxHeight: Constants.SCREEN_HEIGHT / 1.2,
        backgroundColor: Colors.WHITE,
        paddingBottom: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    modalbanner: {
        height: 60,
        // width: 375,
        backgroundColor: Colors.PRIMARY,
        flexDirection: "row",

        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 20,
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 10,
        borderRadius: 10
    },
    Flexrow2: {
        padding: 20
    },
    margingender: {
        fontSize: 16,
        fontFamily: Fonts.MEDIUM,
        color: Fonts.OUTER_SPACE,
        marginBottom: 10,
        marginTop: 10
    },
    close:
        { height: 40, width: 40, alignItems: "center", justifyContent: "center" }
    , FontSelect: {
        fontSize: 18,
        fontFamily: Fonts.BOLD,
        color: Colors.WHITE
    },
    modalView: {
        flex: 1, backgroundColor: '#000000aa', justifyContent: 'center'
    },
    optionTitle: {
        fontFamily: Fonts.LIGHT,
        fontSize: Fonts.SIZE_20,
        color: Fonts.BLACK,
        marginBottom: 35
    },
    optionDetail: {
        fontFamily: Fonts.BOLD,
        fontSize: Fonts.SIZE_16,
        color: Fonts.BLACK,
        paddingVertical: 5
    },
    searchList: {
        width: Constants.SCREEN_WIDTH - 40,
        // marginLeft: 20,
        backgroundColor: Colors.WHITE,
        position: "absolute",
        zIndex: 10,
        elevation: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        maxHeight: Constants.SCREEN_HEIGHT / 4,
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
    }
})