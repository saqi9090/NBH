import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";
import { SCREEN_WIDTH } from "../../global/constants";

export const styles = StyleSheet.create({
    VariantStyle: {
        padding: 10,
        width: 50,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10
    },
    font1: {
        fontSize: 14,
        fontFamily: Fonts.SEMIBOLD,
        color: Colors.JUNGLE_BLACK
    },
    font2: {
        fontSize: 16,
        fontFamily: Fonts.BOLD,
        color: Colors.JUNGLE_BLACK
    },
    font3: {
        fontSize: 10,
        fontFamily: Fonts.BOLD,
        color: Colors.ONYX_60,
        marginTop: 2
    },
    font4: {
        fontSize: 16,
        fontFamily: Fonts.BOLD,
        color: Colors.JUNGLE_BLACK
    },
    font5: {
        fontSize: 14,
        fontFamily: Fonts.BOLD,
        color: Colors.JUNGLE_BLACK,
        marginBottom: 5
    },
    font6: {
        fontSize: 14,
        fontFamily: Fonts.REGULAR,
        color: Colors.ONYX_60
    },
})