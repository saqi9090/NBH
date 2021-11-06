import React from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors, Fonts, Server } from '../../global';
import { globalStyles } from '../../global/globalStyles';
import { styles } from './NBHCreatePasswordStyles';
import { ScreenNames } from '../../global/index';
import EyecloseSvg from "../../assets/svg/eye-off.svg";
import EyeSvg from "../../assets/svg/eye.svg";
import axios from 'axios';
import CustomAlert from '../../components/CustomAlert/CusomAlert';
import { PutService } from '../../services/PutService';


const NBHCreatePasswordScreen = ({ navigation, route, params }) => {

    //Variables

    //States
    const [number, setNumber] = React.useState('');
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [eye, setEye] = React.useState(true);
    const [eye2, setEye2] = React.useState(true);
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false)



    //Refs

    //Functions
    const Login = async () => {
        if (password == confirmPassword) {
            // const response = await axios.put(`${Server.BASE_URL}/users/phone/${route.params.number}/password/${password}`)

            const uri = `/users/phone/${route.params.number}/password/${password}`
            const body = null
            PutService(uri, body)
            navigation.navigate(ScreenNames.NBHLOGIN)
        } else {
            toggleCustomAlertVisibility()
        }
    }
    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
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
                    <Text style={[styles.font1, { marginTop: 20 }]}>Create New Password</Text>
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: Colors.WHITE }} >

                <View style={{ marginTop: 30 }}>

                    <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ flex: 0.9 }}>
                                <TextInput
                                    placeholderTextColor={Colors.BLACK}
                                    style={styles.filterinput}
                                    autoCapitalize={false}
                                    onChangeText={text => setPassword(text)}
                                    secureTextEntry={eye ? true : false}
                                    placeholder="Enter New Password">{password}</TextInput>
                            </View>
                            <View style={{ flex: 0.1, marginLeft: 5 }}>
                                <TouchableOpacity onPress={() => setEye(!eye)}>
                                    {eye ? <EyecloseSvg />
                                        :
                                        <EyeSvg />}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 1.7, width: "100%", backgroundColor: "#97979975" }}></View>
                    </View>


                    <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ flex: 0.9 }}>
                                <TextInput
                                    placeholderTextColor={Colors.BLACK}
                                    secureTextEntry={eye2 ? true : false}
                                    keyboardType="default"
                                    autoCapitalize={false}
                                    onChangeText={text => setConfirmPassword(text)}
                                    style={styles.filterinput}
                                    placeholder="Confirm Password">{confirmPassword}</TextInput>
                            </View>
                            <View style={{ flex: 0.1, marginLeft: 5 }}>
                                <TouchableOpacity onPress={() => setEye2(!eye2)}>
                                    {eye2 ? <EyecloseSvg />
                                        :
                                        <EyeSvg />}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 1.7, width: "100%", backgroundColor: "#97979975" }}></View>
                    </View>
                </View>



            </View>
            <View style={{ justifyContent: "flex-end" }}>
                <TouchableOpacity style={{ ...globalStyles.button, marginHorizontal: 30, marginBottom: 30 }} onPress={Login}>
                    <Text style={globalStyles.buttonText}>
                        Update Password
                    </Text>
                </TouchableOpacity>

            </View>
            <CustomAlert
                title={"Alert"}
                desc={"Entered Password Does Not Match"}
                leftButtonText={"Ok"}
                leftButtonFunction={leftButtonFunction}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility}
                customAlertVisible={customAlertVisible}
            />
        </KeyboardAvoidingView>
    )
};

export default NBHCreatePasswordScreen;