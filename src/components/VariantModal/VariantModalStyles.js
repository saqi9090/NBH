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
    font1: { fontSize: 17, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK, },
    font2: { fontSize: 15, fontFamily: Fonts.REGULAR, color: Colors.ONYX_60, },
    Variant: { height: 35, width: 70, borderRadius: 5, alignItems: "center", justifyContent: "center", marginHorizontal: 5, marginVertical: 20 }

})