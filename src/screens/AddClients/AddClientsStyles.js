import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    font1: { fontSize: 16, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK, },
    uploadstyle: { backgroundColor: Colors.PRIMARY, height: 36, width: 98, flexDirection: "row", alignItems: "center", borderRadius: 12, marginRight: 20, justifyContent: "center" },
    AddPostInput: { height: 170, backgroundColor: "#00000010", borderRadius: 20, marginHorizontal: 20 },
    filterMemberBtn: { height: 36, backgroundColor: Colors.WHITE, borderRadius: 10, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.80, shadowRadius: 2.62, elevation: 2, },
    fontFilterBtn: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK },
    ServiceTitle: { height: 50, backgroundColor: Colors.SOMKEWHITE, borderRadius: 50, marginHorizontal: 20, marginBottom: 20, paddingHorizontal: 20 },
    priceProduct: { height: 50, backgroundColor: "#00000010", borderRadius: 50, paddingLeft: 20, flexGrow: 1, marginLeft: 20 },
    font2: { fontSize: 16, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK, }
})