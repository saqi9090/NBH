import { StyleSheet } from "react-native";
import { Colors } from "../../global";

export const styles = StyleSheet.create({
    MyClientContainer: {
        backgroundColor: Colors.WHITE, borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
        shadowColor: "#Bababa",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 3
    }
})