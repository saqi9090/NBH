import React from "react";

import database from '@react-native-firebase/database';
import * as UserActions from '../redux/actions/userActions'
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import { CommonActions, useNavigation } from "@react-navigation/core";
import { ScreenNames } from "../global";
import { CartItems } from "../../App";
import { Alert } from "react-native";

const CheckLogin = ({ dispatch, userId, token }) => {
    const resetStackAndGoToUser = CommonActions.reset({
        index: 0,
        routes: [{ name: ScreenNames.NBHLOGIN }],
    });
    const navigation = useNavigation()
    const [cartItems, setCartItems] = React.useContext(CartItems)

    const performLogout = async () => {
        await AsyncStorage.clear()
        dispatch(UserActions.clearSession())
        setCartItems([])
        // navigation.dispatch(resetStackAndGoToHome)
        navigation.dispatch(resetStackAndGoToUser)
    }
    React.useEffect(() => {
        if (userId) {
            database()
                .ref("LoginUser")
                .child(userId.toString())
                .on('value', (FriendShips) => {
                    // console.warn("Users.exists()", Users.exists());
                    if (!FriendShips.exists()) {
                    } else {
                        if (token != "") {
                            if (FriendShips.val().token != token) {
                                console.warn(token);
                                Alert.alert("Alert", "Another Login Detacted")
                                setTimeout(() => {
                                    performLogout()
                                }, 2000)
                            } else {
                            }
                        }
                        // console.warn(User);
                        // if (flag == false) {
                        //     console.warn("flag", flag);
                        // }
                    }
                });
            database()
                .ref("MobileUser")
                .child(userId.toString())
                .on('value', (FriendShips) => {
                    // console.warn("Users.exists()", Users.exists());
                    if (!FriendShips.exists()) {
                    } else {
                        if (!FriendShips.val().active) {
                            Alert.alert("Alert", "User Disabled by Admin")
                            setTimeout(() => {
                                performLogout()
                            }, 2000)
                        } else {
                        }
                        // console.warn(User);
                        // if (flag == false) {
                        //     console.warn("flag", flag);
                        // }
                    }
                });
        }
    }, [])
    return (
        null
    )
}

const mapDispatchToProps = dispatch => ({ dispatch });
const mapStateToProps = state => ({
    userId: state.user.userId,
    token: state.user.token
});
// export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
export default connect(mapStateToProps, mapDispatchToProps)(CheckLogin);