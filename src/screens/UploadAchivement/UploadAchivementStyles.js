import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    font1: { fontSize: 16, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK, },
    uploadstyle: { backgroundColor: Colors.PRIMARY, padding: 10, flexDirection: "row", alignItems: "center", borderRadius: 12, marginRight: 20 },
    AddPostInput: { height: 170, backgroundColor: "#00000010", borderRadius: 20, marginHorizontal: 20 },
    filterMemberBtn: { height: 36, backgroundColor: Colors.WHITE, borderRadius: 10, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 1, }, shadowOpacity: 0.80, shadowRadius: 2.62, elevation: 2, },
    fontFilterBtn: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK },
    uploadstyle: { backgroundColor: Colors.PRIMARY, padding: 10, flexDirection: "row", alignItems: "center", borderRadius: 12, marginRight: 20 },
})