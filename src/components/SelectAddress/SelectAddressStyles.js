import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#00000050',
        justifyContent: 'flex-end'
    },
    confirmContainer: {
        // flex: 0.25,
        backgroundColor: Colors.WHITE,
        paddingBottom: 20,
    },
    confirmHeader: {
        backgroundColor: Colors.PRIMARY,
        flexDirection: 'row',
        height: 66,
        justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal: 20
    },
    confirmDeliveryText: {
        // paddingLeft: 20,
        paddingTop: 15,
        paddingBottom: 15,
        fontFamily: Fonts.SEMIBOLD,
        fontSize: Fonts.SIZE_16,
        color: Colors.JUNGLE_BLACK,
        letterSpacing: 0.2,

    },
    font1: { fontSize: 16, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK, marginVertical: 10 },

    font2: { fontSize: 15, fontFamily: Fonts.REGULAR, color: Colors.ONYX_60, },
    font3: { fontSize: 14, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK, },
    font4: { fontSize: 13, fontFamily: Fonts.BOLD, color: Colors.ONYXOpacity, },
    font5: { fontSize: 12, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK, },
    font6: { fontSize: 12, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYX_60, },
    font7: { fontSize: 14, fontFamily: Fonts.BOLD, color: Colors.ONYX_60, },
    quantity: { height: 30, width: 68, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 4, backgroundColor: Colors.PRIMARY, borderRadius: 5 }




})