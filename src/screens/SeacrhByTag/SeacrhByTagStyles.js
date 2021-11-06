import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../global";
import { SIZE_16, SIZE_18 } from "../../global/typography";

export const styles = StyleSheet.create({
    headingContainer: {
        backgroundColor: Colors.WHITE, paddingBottom: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        
        elevation: 3,
        marginBottom:1
    },
    fontTitle: {
        fontSize: 18,
        fontFamily: Fonts.REGULAR,
        color: Colors.JUNGLE_BLACK
    }
})