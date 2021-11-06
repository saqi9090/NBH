import React from 'react';
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors, Fonts } from '../../global';
import { globalStyles } from '../../global/globalStyles';
import { styles } from './NBHForgetPasswordStyles';
import { ScreenNames } from '../../global/index';
import axios from 'axios';
import { BASE_URL } from '../../global/server';
import { getService } from '../../services/getService';
import CustomAlert from '../../components/CustomAlert/CusomAlert';
// import EyecloseSvg from "../../assets/svg/eye-off.svg";
// import EyeSvg from "../../assets/svg/eye.svg";


const ForgetPasswordScreen = ({ navigation, route, params }) => {

    //Variables

    //States
    const [number, setNumber] = React.useState(route.params.number);
    // const [checkUser, setCheckUser] = React.useState(null);

    // const [eye, setEye] = React.useState(false);


    const [customAlertVisible2, setCustomAlertVisible2] = React.useState(false)
    // const [loading, setLoading] = React.useState(false)
    const [alertText2, setAlertText2] = React.useState('');


    //Refs

    //Functions

    const toggleCustomAlertVisibility2 = () => { setCustomAlertVisible2(!customAlertVisible2) }

    const leftButtonFunction2 = () => {
        toggleCustomAlertVisibility2()
    }
    const Login = () => {
        navigation.navigate(ScreenNames.NBHOTP, { number: number })
    }


    const forgetPassword = async () => {
        // try {
        if (number.length >= 10) {
            // const response = await axios.get(`${BASE_URL}/users/checkUser/${number}`)
            // if (response.data != "USER_NOT_FOUND") {
            //     navigation.navigate(ScreenNames.NBHOTP, { number: number })
            // }

            const req = `/users/checkUser/${number}`
            getService(req).then((response) => {
                if (response.code == 200) {

                    if (response.data != "USER_NOT_FOUND") {
                        navigation.navigate(ScreenNames.NBHOTP, { number: number })
                    }
                }
                else {
                    setAlertText2(response.message)
                    toggleCustomAlertVisibility2()
                }


            })
        }
        else {
            // Alert.alert("", "Please Fill Mobile Number")

            setAlertText2("Please Fill Mobile Number")
            toggleCustomAlertVisibility2()
        }
        // } catch (error) {
        //     Alert.alert("", "User Is Not Exist")
        // }
    }

    //UseEffect

    //UI
    return (

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 'null'} style={styles.mainScreen}>
            <View style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 3, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, backgroundColor: Colors.WHITE
            }}>
                <FocusAwareStatusBar isLightBar={false} isTopSpace={true} isTransparent={false} />
                <View style={{ paddingLeft: 20, paddingVertical: 20 }}>
                    <Image source={require("../../assets/images/NBH.png")} style={{ height: 40, width: 94 }} />
                    <Text style={[styles.font1, { marginTop: 20 }]}>Forget Password</Text>
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: Colors.WHITE }} >

                <View style={{ marginTop: 30 }}>
                    <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                        <TextInput
                            placeholderTextColor={Colors.BLACK}
                            style={styles.filterinput}
                            maxLength={10}
                            keyboardType="number-pad"
                            onChangeText={text => setNumber(text)}
                            placeholder="Enter Phone Number">{number}</TextInput>
                        <View style={{ height: 1.3, width: "100%", backgroundColor: "#97979975" }}></View>
                    </View>
                </View>



            </View>
            <View style={{ justifyContent: "flex-end" }}>
                <TouchableOpacity
                    onPress={forgetPassword}
                    style={[globalStyles.button, { marginHorizontal: 30, marginBottom: 30 }]} >
                    <Text style={globalStyles.buttonText}>
                        Send OTP
                    </Text>
                </TouchableOpacity>

            </View>

            <CustomAlert
                title={"Alert"}
                desc={alertText2}
                leftButtonText={"Ok"}
                leftButtonFunction={leftButtonFunction2}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility2}
                customAlertVisible={customAlertVisible2}
            />
        </KeyboardAvoidingView>
    )
};

export default ForgetPasswordScreen;