import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, Fonts } from '../../global';
import CrossSvg from "../../assets/svg/crossSmall.svg"

const AddKeyWord = ({ setKeywords, item, keywords }) => {
    const removeKeyword = () => {
        const newKeywords = keywords.filter(e => e != item)
        setKeywords(newKeywords)
    }
    return (
        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
            <View style={styles.cardcontainer}>
                <Text style={styles.Font1}>{item}</Text>
                <TouchableOpacity  hitSlop={{top:10,right:10,bottom:10,left:10}} onPress={removeKeyword}>
                    <CrossSvg />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddKeyWord

const styles = StyleSheet.create({
    Font1: {
        fontSize: 14,
        fontFamily: Fonts.SEMIBOLD,
        color: Colors.ONYXOpacity,
        marginRight: 5
    },
    cardcontainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 0,
        borderRadius: 7,
        // padding: 5,
        paddingHorizontal: 7,
        paddingVertical: 7,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.WHITE

    }
})
