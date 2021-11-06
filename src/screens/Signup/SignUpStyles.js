import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SCREEN_WIDTH } from '../../global/constants'
import { Colors, Fonts, Constants } from '../../global/index'

export const styles = StyleSheet.create({

    mainScreen: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    textinput: {
        borderWidth: 1,
        borderColor: Colors.BLACK,
        height: 60,
        marginLeft: 20,
        borderRadius: 5,
        fontSize: 18,
        paddingHorizontal: 15,
        fontFamily: Fonts.LIGHT,
        color: Fonts.BLACK,
        marginRight: 20,
    },
    filterinput: {
        height: 40, fontSize: 15, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK, width: SCREEN_WIDTH / 1.3
    },
    font1: { fontSize: 16, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK },
    font2: { fontSize: 14, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYXOpacity },
    font3: { fontSize: 12, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYXOpacity },
    signUpTextStyle: {
        height: 50, backgroundColor: Colors.SOMKEWHITE,
        borderRadius: 50, marginBottom: 20, paddingHorizontal: 20
    },



})