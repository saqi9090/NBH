import { StyleSheet } from "react-native";
import { Colors, Fonts } from '../../global';

export const styles = StyleSheet.create({
    sectionLine: { height: 1, backgroundColor: Colors.ONYX_60 },
    filterMemberBtn: { height: 36, backgroundColor: Colors.WHITE, borderRadius: 10, alignItems: "center", justifyContent: "center" },
    fontFilterBtn: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK },
    memberuserName: { fontSize: 18, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK },
    memberService: { fontSize: 16, fontFamily: Fonts.BOLD, color: Colors.ONYXOpacity },
    memberOccupation: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYX_60 },
    memberPhoneNumber: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYXOpacity },
    memberPhoneNumber1: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYXOpacity },
    memberSvg: { margin: 5 },
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
    Address: { fontSize: 16, fontFamily: Fonts.BOLD, color: Colors.ONYX_60, marginLeft: 10 },
    uploadstyle: { backgroundColor: Colors.PRIMARY, padding: 10, flexDirection: "row", alignItems: "center", borderRadius: 12, marginRight: 20 },
    font1: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: "#4484fd", },
    font2: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK, },
    uploadstyle: { backgroundColor: Colors.PRIMARY, padding: 10, flexDirection: "row", alignItems: "center", borderRadius: 12, marginRight: 20 },
    editButton: {
        height: 36,
        width: 91,
        backgroundColor: Colors.PRIMARY,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 12
    },
    font3: { fontSize: 16, fontFamily: Fonts.REGULAR, color: Colors.JUNGLE_BLACK },



})