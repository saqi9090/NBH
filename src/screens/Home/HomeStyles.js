import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    font1: { fontSize: 20, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK },
    font2: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK },
    carcosal: { height: 210, width: "100%", backgroundColor: Colors.PRIMARY },
    indicator: {
        height: 17,
        width: 17,
        maxHeight: 30,
        maxWidth: 30,
        // padding: 7,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        right: -7,
        top: -7
        // zIndex: 100
    }
})