import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../global'
import PlusSvg from "../../assets/svg/add.svg"
const AddButton = ({onpressFun,navigation}) => {
    return (
        <View style={{flex:1}}>

        <TouchableOpacity onPress={() => onpressFun()}>
        <View style={{height:50,width:50,borderRadius:100,backgroundColor:Colors.PRIMARY,alignItems:"center",justifyContent:"center"}}>
        <PlusSvg/>
        </View>
        </TouchableOpacity>
        </View>
    )
}

export default AddButton

const styles = StyleSheet.create({})
