import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    viewButton:{
        height:28,
        width:50,
        borderRadius:10,
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        alignItems:"center",
        justifyContent:"center"
    },
    font1:{
        fontSize:12,
        fontFamily:Fonts.SEMIBOLD,
        color:Colors.JUNGLE_BLACK
    },
    sectionLine:{
        height:1,
        width:"100%",
        backgroundColor:Colors.ONYX_80,
        } ,
        font2:{
            fontSize:12,
            fontFamily:Fonts.SEMIBOLD,
            color:Colors.ONYX_60
        }
})