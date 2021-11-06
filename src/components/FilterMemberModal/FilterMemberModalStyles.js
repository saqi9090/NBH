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
        alignItems: "center"
    },
    confirmDeliveryText: {
        paddingLeft: 20,
        paddingTop: 15,
        paddingBottom: 15,
        fontFamily: Fonts.SEMIBOLD,
        fontSize: Fonts.SIZE_16,
        color: Colors.JUNGLE_BLACK,
        letterSpacing: 0.2,

    },
    closeButton: {
        // paddingLeft: 20,
        // paddingTop: 20,
        // paddingBottom: 20,
        paddingRight: 20,
        justifyContent: 'center',
    },
    confirmTextContainer: {
        alignItems: "flex-start",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
    },
    confirmText: {
        fontFamily: Fonts.BOLD,
        fontSize: Fonts.SIZE_14,
        color: Fonts.BLACK,
        letterSpacing: 0.2,
    },
    confirmTextButtonContainer: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    yesButton: {
        paddingVertical: 12,
        paddingTop: 8,
        width: 80,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        marginLeft: 10
    },
    yesButtonText: {
        fontFamily: Fonts.BOLD,
        fontSize: Fonts.SIZE_16,
        color: Colors.WHITE,
    },
    tinput: {
        fontFamily: Fonts.BOLD,
        marginLeft: 10,
        minHeight: 20,
        fontSize: 12
    },
    feedbackInput: {
        marginTop: 10,
        borderWidth: 1.5,
        borderColor: Fonts.TIFFANY_BLUE,
        borderRadius: 10,
        minHeight: 70,
        marginHorizontal: 20
    },
    filterinput: { height: 40, fontSize: 15, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK },
    fontBussnessCategary: { fontFamily: Fonts.SEMIBOLD, fontSize: Fonts.SIZE_15, color: Colors.BLACK, },
    filterMemberBtn: { height: 36, backgroundColor: Colors.WHITE, borderRadius: 10, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.80, shadowRadius: 2.62, elevation: 2, },
    fontFilterBtn: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK }


});