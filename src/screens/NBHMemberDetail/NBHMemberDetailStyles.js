import { StyleSheet } from "react-native";
import { Colors, Fonts } from '../../global';

export const styles = StyleSheet.create({
    sectionLine: { height: 1, backgroundColor: Colors.ONYX_60 },
    filterMemberBtn: { height: 36, backgroundColor: Colors.WHITE, borderRadius: 10, alignItems: "center", justifyContent: "center" },
    fontFilterBtn: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK },
    memberuserName: { fontSize: 18, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK },
    memberService: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYXOpacity },
    memberOccupation: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYX_60 },
    memberPhoneNumber: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYXOpacity },
    memberPhoneNumber1: { fontSize: 14, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYXOpacity },
    memberSvg: { marginRight: 10 },
    containerMemberDetail: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3, backgroundColor: Colors.WHITE, borderBottomLeftRadius: 20, borderBottomRightRadius: 20
    },
    Followerquantity: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK },
    Follower: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYXOpacity, marginTop: 5 },
    memberDeatilInput: { height: 40, fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK },
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
    Address: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYX_60, marginLeft: 10 },
    font1: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: "#4484fd", },
    containerMemberDetail1: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3, backgroundColor: Colors.WHITE
    },
})