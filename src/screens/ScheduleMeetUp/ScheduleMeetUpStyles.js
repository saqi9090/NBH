import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";

export const styles = StyleSheet.create({
    font1: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYX_60 },
    font2: { fontSize: 20, fontFamily: Fonts.BOLD, color: Colors.ONYXOpacity },
    font3: { fontSize: 18, fontFamily: Fonts.BOLD, color: Colors.ONYXOpacity },
    scheduleMeetConatiner: { flexDirection: "row", alignItems: "center", paddingLeft: 30, paddingVertical: 10, paddingBottom: 20 },
    elevation: { backgroundColor: Colors.PRIMARY, },
    sectionLine: { height: 1, width: "100%", backgroundColor: Colors.ONYX_60 },
    memberDeatilInput: { height: 40, fontSize: 16, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK },
})