import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";
import { SCREEN_WIDTH } from "../../global/constants";

export const styles = StyleSheet.create({
    font1: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: "#202228", marginBottom: 5 },
    font2: { fontSize: 14, fontFamily: Fonts.REGULAR, color: Colors.ONYXOpacity, marginBottom: 5 },

    font3: { fontSize: 15, fontFamily: Fonts.SEMIBOLD, color: "#202228", marginBottom: 5 },

    font4: { fontSize: 15, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYX_60 },

    font5: { fontSize: 14, fontFamily: Fonts.BOLD, color: Colors.ONYXOpacity },

    font6: { fontSize: 17, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK },

    font7: { fontSize: 16, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK },

    font8: { fontSize: 14, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK },

    font9: { fontSize: 14, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYXOpacity },

    font10: { fontSize: 14, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK },

    font11: { fontSize: 18, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK },

    font12: { fontSize: 18, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK },

    alignstyle: { flexDirection: "row", alignItems: "center" },

    alignstyle2: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },


    OrderDetailImage: { height: 70, width: 70, borderRadius: 10, marginRight: 15 },

    sectionLine: { height: 1, width: SCREEN_WIDTH - 40, backgroundColor: Colors.ONYX_60, marginVertical: 20, marginHorizontal: 20 }
    , ordertrackpart: {
        flexDirection: "row",
    },
    iconpart: {
        // height: 15,
        // width: 15,
        borderRadius: 50,
        backgroundColor: Colors.PRIMARY,
        alignItems: "center",
        justifyContent: "center"
    },
    verticallinepart: {
        height: 51,
        width: 2,
        backgroundColor: Colors.PRIMARY,
        // position: "absolute",
        // top: 30,
        // left: 14

    },
    verticallinepart1: {

        height: 30,
        width: 2,
        // backgroundColor: Fonts.TEXASGREEN,
        // display: "none",

        position: "relative",
        bottom: 100

        // top: 30,
        // left: 14

    }, detailpartordertrack: {
        height: 57,
        // width: 200,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 4,
        marginLeft: 20,
    }, orderFont:
    {
        fontSize: 12,
        // marginTop: 30,
        color: "#161616",
        fontFamily: Fonts.BOLD

    }, orderdateFont: {
        fontSize: 12,
        marginTop: 1,
        color: Colors.BLACK,
        fontFamily: Fonts.BOLD
    },
    iconcont: {
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        top: 10
    },


})