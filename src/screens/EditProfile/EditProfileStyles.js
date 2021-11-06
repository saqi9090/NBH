import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";
import { SCREEN_WIDTH } from "../../global/constants";

export const styles = StyleSheet.create({
    filterinput: { height: 40, fontSize: 15, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK },
    alignwithmargin: { marginHorizontal: 20, marginVertical: 10 },
    memberDeatilInput: { height: 40, fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK },
    font1: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYXOpacity },
    font2: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: "#4484fd", },

    sectionLine: { height: 1, width: "100%", backgroundColor: Colors.ONYX_60 },
    filterMemberBtn: { height: 36, backgroundColor: Colors.WHITE, borderRadius: 10, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.80, shadowRadius: 2.62, elevation: 2, },
    fontFilterBtn: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK },
    addressBox: {
        padding: 10, backgroundColor: Colors.WHITE, shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5, marginHorizontal: 20, borderRadius: 5
    },
    fontAddress: {
        fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYXOpacity
    },
    MemberAddress: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 2, backgroundColor: Colors.WHITE, padding: 10, borderRadius: 10, marginVertical: 10, marginHorizontal: 20
    },
    priceProduct: { height: 50, backgroundColor: Colors.SOMKEWHITE, borderRadius: 50, paddingHorizontal: 20, marginLeft: 20, width: SCREEN_WIDTH / 2 },



})