
import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../global'
export const styles = StyleSheet.create({

    flex1: {
        flexDirection: "row",
        alignItems: "center"
    },
    flex2: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    likeStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        paddingVertical: 11,
        width: 80,
        backgroundColor: "#cc4b3750",
        marginRight: 20
    },
    commentStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        paddingVertical: 11,
        width: 80,
        backgroundColor: "#ffae0050"
    },

    //font

    font1: {
        fontSize: 16,
        fontFamily: Fonts.SEMIBOLD,
        color: Colors.JUNGLE_BLACK
    },
    font2: {
        fontSize: 16,
        fontFamily: Fonts.SEMIBOLD,
        color: Colors.JUNGLE_BLACK,
        marginRight: 7
    },
    font3: {
        fontSize: 12,
        fontFamily: Fonts.SEMIBOLD,
        color: "#97979990"
    },
    font4: {
        fontSize: 14,
        fontFamily: Fonts.REGULAR,
        color: Colors.JUNGLE_BLACK
    },
    font5: {
        fontSize: 16,
        fontFamily: Fonts.BOLD,
        color: Colors.ALERT,
        marginLeft: 5
    },
    font6: {
        fontSize: 16,
        fontFamily: Fonts.BOLD,
        color: Colors.WARNING,
        marginLeft: 5
    },
})
