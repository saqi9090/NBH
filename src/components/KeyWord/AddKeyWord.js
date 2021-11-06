import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors, Fonts } from '../../global';
import CrossSvg from "../../assets/svg/crossSmall.svg"


const AddKeyWord = () => {
    return (
        <View style={{ marginVertical: 10, flex: 1 }}>

            <View style={{ paddingVertical: 5, elevation: 2, backgroundColor: Colors.WHITE, flexDirection: "row", alignItems: "center", borderRadius: 7, marginHorizontal: 10, justifyContent: "space-between", paddingHorizontal: 10 }}>
                <View>
                    <Text style={{ fontSize: 14, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK, marginRight: 7 }}>Winner</Text>
                </View>
                <View >
                    <CrossSvg />
                </View>
            </View>
        </View>
    )
}

export default AddKeyWord

const styles = StyleSheet.create({})
