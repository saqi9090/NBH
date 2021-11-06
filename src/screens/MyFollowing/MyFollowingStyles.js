import { StyleSheet } from "react-native";
import { Colors } from "../../global";

export const styles = StyleSheet.create({
    headerstyle: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        position: "relative",
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: Colors.WHITE,
        height: 50,
        marginBottom: 10
    }
})
