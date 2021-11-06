import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    containerMyAccount: {
        backgroundColor: Colors.WHITE, shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, marginBottom: 10
    },
    container2MyAccount: {
        flex: 1, backgroundColor: Colors.WHITE
    },
    sectionLine: { height: 1, backgroundColor: Colors.ONYX_80, width: "100%" },
    editButton: {
        height: 36,
        width: 140,
        backgroundColor: Colors.PRIMARY,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 10
    },
    alignStyle: {
        flexDirection: "row",
        alignItems: "center"
    },
    alignStyle2: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    font1: { fontSize: 20, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK },
    font2: { fontSize: 14, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYXOpacity },
    font3: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK },
    font4: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: "#20222899" }
})