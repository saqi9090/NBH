import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors, Fonts } from '../../global'

const RadioButton = ({ radioId, index, item }) => {
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.outerCircle}>
                {
                    radioId == index ?
                        <View style={styles.innerCircle}>

                        </View>
                        :
                        null
                }
            </View>

            <Text style={{ fontSize: 14, color: Colors.BLACK, fontFamily: Fonts.SEMIBOLD, marginLeft: 5 }}>{item.RadioName}</Text>
        </View>
    )
}

export default RadioButton

const styles = StyleSheet.create({
    outerCircle: {
        height: 15,
        width: 15,
        borderRadius: 100,
        // backgroundColor: "red"
        borderColor: Colors.BLACK, borderWidth: 1.5,
        alignItems: "center",
        justifyContent: "center"
    },
    innerCircle: {
        height: 8,
        width: 8,
        borderRadius: 100,
        backgroundColor: Colors.BLACK
    }
})
