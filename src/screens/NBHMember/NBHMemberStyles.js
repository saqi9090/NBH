import { StyleSheet } from "react-native";
import { Colors, Fonts, ScreenNames } from "../../global";
import { SCREEN_WIDTH } from "../../global/constants";
import { SIZE_14 } from "../../global/typography";


export const styles = StyleSheet.create({
    nameOfMember: {
        fontSize: SIZE_14,
        fontFamily: Fonts.BOLD,
        color: Colors.JUNGLE_BLACK,
        width: SCREEN_WIDTH / 2
    },

    memberCardContainer: {
        height: 82, borderRadius: 10, shadowColor: "#000",
        backgroundColor: Colors.WHITE,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 4,
        marginHorizontal: 10,
        marginVertical: 10
    }

})