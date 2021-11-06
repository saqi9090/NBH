import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";
import { SCREEN_WIDTH } from "../../global/constants";

const HeightCustom = 69 / 100 * 50
export const styles = StyleSheet.create({
    uploadstyle: { backgroundColor: Colors.PRIMARY, height: 36, width: 98, flexDirection: "row", alignItems: "center", borderRadius: 12, marginRight: 20, justifyContent: "center" },
    sectionLine: { height: 1, width: SCREEN_WIDTH - 40, backgroundColor: Colors.ONYX_80, marginHorizontal: 20 },
    font1: { fontSize: 17, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK, marginVertical: 10 },
    font7: { fontSize: 14, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYX_60, },
    alignment: {
        // backgroundColor: "red",
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20, width: SCREEN_WIDTH - 40, marginVertical: 5, justifyContent: "space-between"
        // ,
        // justifyContent: "space-between"
    },
    font3: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK, },
    font2: { fontSize: 15, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYX_60, },
    dateNameStyle: {
        color: Colors.GRAY_DARK
    },
    dateNumberStyle: {
        color: Colors.WHITE
    },

    card: {
        minHeight: HeightCustom,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        backgroundColor: Colors.WHITE,
        padding: 10,
        paddingBottom: 0,
        paddingTop: 5,
        marginTop: 70 / 35,
    },
    filterinput: { height: 40, fontSize: 15, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK },
    buttonPts: {
        paddingVertical: 7,
        paddingHorizontal: 5,
        backgroundColor: Colors.PRIMARY,
        // width: SCREEN_WIDTH / 2 - 40,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 12,
        justifyContent: "center"
    },



})