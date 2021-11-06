import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";


export const styles = StyleSheet.create({
    reward:{
        fontSize:16,fontFamily:Fonts.SEMIBOLD,
        color:Colors.JUNGLE_BLACK
    },
    reward1:{
        fontSize:16,fontFamily:Fonts.REGULAR,
        color:Colors.JUNGLE_BLACK

    },
    walletheader:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:Colors.WHITE
    },
    Three:{
        fontSize:26
        ,fontFamily:Fonts.BOLD,
        color:Colors.JUNGLE_BLACK
    },
    transtionhistory:{
        fontSize:18,
        fontFamily:Fonts.SEMIBOLD,
        color:Colors.JUNGLE_BLACK,
    },
    subHeader:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-evenly",
        paddingVertical:20,
    },
    touchableButton:{
        width: 90,
height: 33,
// backgroundColor: "#FFD648",
borderWidth:1.5,
borderRadius:5,
alignItems:"center",
justifyContent:"center"
    },
    viewBtn:{
        width: 90,
height: 33,
backgroundColor: "#FFD648",
borderRadius:5,
alignItems:"center",
justifyContent:"center"
    },
    text1:{
        fontSize:14,
        fontFamily:Fonts.SEMIBOLD,
        color:Colors.JUNGLE_BLACK,
    },
    line:{
        width:"100%",
        height:1,
        backgroundColor:Colors.GRAY_MEDIUM
    },
    itemContainer:{
        backgroundColor:Colors.WHITE,
    flexDirection:"row",
alignItems:"center",
justifyContent:"space-between",paddingHorizontal:20,paddingVertical:15 },
transactiondetails:{
    fontSize:16,
    fontFamily:Fonts.SEMIBOLD,
    color:Colors.JUNGLE_BLACK,
},
date:{
    marginTop:5,
    fontSize:15,
    fontFamily:Fonts.REGULAR,
    color:Colors.JUNGLE_BLACK,
},transactiondetails:{
    fontSize:16,
    fontFamily:Fonts.BOLD,
    color:Colors.JUNGLE_BLACK,
},
point:{

    fontSize:18,
    fontFamily:Fonts.BOLD,
    color:Colors.JUNGLE_BLACK,
},
parentContainer:{
    backgroundColor:Colors.WHITE,
    flex:1
}
})
