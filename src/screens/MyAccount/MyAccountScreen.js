import React from 'react'
import {
    View, Text, Image, TouchableOpacity, FlatList, Clipboard, Alert, ToastAndroid, Platform, BackHandler, Linking
} from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Header from '../../components/Header/Header';
import { styles } from "./MyAccountStyles";
import CallSvg from "../../assets/svg/call.svg";
import MessageSvg from "../../assets/svg/email.svg";
import EditSvg from "../../assets/svg/editblack.svg";
import Invoice from "../../assets/svg/invoice.svg"

import MyProfileSvg from "../../assets/svg/my profile.svg";
import ProductCatalogueSvg from "../../assets/svg/Product Catalogue.svg";
import IntersetedPostSvg from "../../assets/svg/Interested Posts.svg";
import WalletSvg from "../../assets/svg/wallet.svg";
import ReferralCode from "../../assets/svg/ReferralCode2.svg"

import ShoppingBagSvg from "../../assets/svg/Bagshop.svg"
import ProfileSvg from "../../assets/svg/Profile - Filled"
import AddressList from "../../assets/svg/AddressList"

// Profile - Unfilled


import ContactUs from "../../assets/svg/callSvgg.svg";

import RightSvg from "../../assets/svg/right arrow.svg";


import { Colors, ScreenNames, Server } from '../../global';
import { CommonActions } from '@react-navigation/routers';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import * as UserActions from '../../redux/actions/userActions'
import * as CartActions from '../../redux/actions/cartActions'
import { BASE_URL } from '../../global/server';
import axios from 'axios';
import CustomAlert from '../../components/CustomAlert/CusomAlert';
import { SCREEN_WIDTH } from '../../global/constants';
import { CartItems } from '../../../App';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { PutService } from '../../services/PutService';
import PrivacyPolicy from "../../assets/svg/PrivacyPolicy.svg";

const MyAccountScreen = ({ dispatch,
    name, email, phNo, referralCode,
    reduxUserImage, userId }) => {
    const myAccountData = [
        {
            key: 1,
            name: "My Profile",
            svgIcon: <MyProfileSvg />
        },
        {
            key: 2,
            name: "My Order",
            svgIcon: <ShoppingBagSvg />
        },
        {
            key: 3,
            name: "Address List",
            svgIcon: <AddressList />
        },
        {
            key: 4,
            name: "Product Catalogue",
            svgIcon: <ProductCatalogueSvg />
        },

        {
            key: 5,
            name: "Interested Posts",
            svgIcon: <IntersetedPostSvg />
        },
        {
            key: 6,
            name: "Wallet",
            svgIcon: <WalletSvg />
        },
        {
            key: 7,
            name: "Referral Code",
            svgIcon: <ReferralCode />
        },
        {
            key: 8,
            name: "Invoice",
            svgIcon: <Invoice />
        },
        {
            key: 9,
            name: "Contact Us",
            svgIcon: <ContactUs />
        },
        {
            key: 10,
            name: "Privacy Policy",
            svgIcon: <PrivacyPolicy />
        },
        {
            key: 11,
            name: "Logout",
            svgIcon: <ProfileSvg />
        },
    ]

    const [userImage, setUserImage] = React.useState();

    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false)
    const [cartItems, setCartItems] = React.useContext(CartItems)

    const navigation = useNavigation()
    //function
    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }

    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }
    const resetStackAndGoToUser = CommonActions.reset({
        index: 0,
        routes: [{ name: ScreenNames.NBHLOGIN }],
    });

    const goNavigate = (index) => {
        if (index == 0) {
            navigation.navigate(ScreenNames.MYPROFILE_SCREEN)
        }
        else if (index == 1) {
            navigation.navigate(ScreenNames.ORDERLISTING_SCREEN)
        }
        else if (index == 2) {
            navigation.navigate(ScreenNames.ADDRESS_LIST_SCREEN)
        }
        else if (index == 3) {
            navigation.navigate(ScreenNames.PRODUCTCATALOGUE_SCREEN)
        }
        else if (index == 4) {
            navigation.navigate(ScreenNames.MYFOLLOWING_SCREEN, { headerName: "Interested Posts", heartShow: false })
        }
        else if (index == 5) {
            navigation.navigate(ScreenNames.WALLET_SCREEN)
        }
        else if (index == 6) {
            null
        }
        else if (index == 7) {
            // putTokenApi()
            navigation.navigate(ScreenNames.INVOICE)


        }
        else if (index == 8) {
            goToWeb(`https://networkingbusinesshub.com/en/contact-us`)
        }
        else if (index == 9) {
            // putTokenApi()
            goToWeb(`https://networkingbusinesshub.com/en/privacy-policy`)
        }
        else if (index == 10) {
            putTokenApi()
        }
        else {
            null
        }
    }

    const goToWeb = (uri) => {
        Linking.openURL(uri)
    }

    const putTokenApi = async () => {
        try {

            // const responseToken = axios.put(`${BASE_URL}/users/${userId}/updateToken/${1234}`)
            const uri = `/users/${userId}/updateToken/${1234}`
            const body = null
            PutService(uri, body).then((response) => {
                if (response.data) {
                    Logoutwork()
                    // setAlertText("Please Enter companyName")
                    // toggleCustomAlertVisibility()
                }
            })

        } catch (error) {
            console.warn("putTokenApi", error.message);
        }
    }

    const Logoutwork = async () => {
        // const tok = await messaging().getToken();
        // await AsyncStorage.clear()
        await AsyncStorage.clear()
        dispatch(UserActions.clearSession())
        setCartItems([])
        // navigation.dispatch(resetStackAndGoToHome)
        navigation.dispatch(resetStackAndGoToUser)

    }

    React.useEffect(() => {
        setUserImage({ uri: `${Server.BASE_URL}/users/${userId}/${reduxUserImage}/thumbnailImage` })
    }, [reduxUserImage])

    //function 

    const goEditProfile = () => {
        navigation.navigate(ScreenNames.EDITPROFILE_SCREEN, { edit: 0 })
    }
    const toastWithDurationHandler = () => {
        //function to make Toast With Duration
        ToastAndroid.show('copied', ToastAndroid.SHORT);


    }

    const copyCilpBoard = (item, index) => {
        if (item.name == "Referral Code") {
            Clipboard.setString(referralCode.toString());
            {
                Platform.OS == "android"
                    ? ToastAndroid.show(
                        'Refferal Code Copied !',
                        ToastAndroid.SHORT,
                    )
                    : Alert.alert('Code Copied', 'Refferal Code Copied !');
            }
        } else {
            goNavigate(index)

        }
    }

    const dialCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else { phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
    };



    /////

    const [customAlertVisible1, setCustomAlertVisible1] = React.useState(false)
    const [alertText1, setAlertText1] = React.useState('');


    const leftButtonFunction1 = () => {
        toggleCustomAlertVisibility1()
    }
    const toggleCustomAlertVisibility1 = () => { setCustomAlertVisible1(!customAlertVisible1) }
    const rightButtonFunction1 = () => {
        toggleCustomAlertVisibility1()
        BackHandler.exitApp()
    }



    // useFocusEffect(
    //     React.useCallback(() => {
    //         const onBackPress = () => {
    //             // Do Whatever you want to do on back button click
    //             // Return true to stop default back navigaton
    //             // Return false to keep default back navigaton
    //             // alert("ffd")
    //             // setAlertText("Please Fill all Details")
    //             // toggleCustomAlertVisibility1()
    //             navigation.navigate(ScreenNames.HOME)
    //             return true

    //         };

    //         BackHandler.addEventListener(
    //             'hardwareBackPress', onBackPress
    //         );

    //         return () =>
    //             BackHandler.removeEventListener(
    //                 'hardwareBackPress', onBackPress
    //             );
    //     }, [])
    // );

    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <View style={[styles.containerMyAccount, { paddingBottom: 10 }]}>
                <Header

                    name={"My Account"} backgroundColor={true} activateLeftIcon={false} />


            </View>


            <View style={[styles.containerMyAccount, { marginHorizontal: 20, borderRadius: 20 }]}>
                <View style={{ marginHorizontal: 40, marginTop: 20, marginBottom: 10 }}>


                    <View style={{ alignSelf: "center" }}>
                        <View style={{ height: 80, width: 80, borderRadius: 100, backgroundColor: Colors.PRIMARY }}>
                            <Image source={userImage} style={{ height: "100%", width: "100%", borderRadius: 100, }} />
                        </View>
                    </View>


                    <View style={{ marginTop: 20 }}>
                        <View style={{ width: SCREEN_WIDTH / 1 - 100 }}>
                            <Text style={styles.font1}>{name}</Text>
                        </View>
                        <View style={styles.alignStyle}>
                            <MessageSvg />
                            <View style={{ width: SCREEN_WIDTH / 1 - 120 }}>
                                <Text style={[styles.font2, { marginVertical: 10, marginLeft: 10 }]}>{email}</Text>
                            </View>
                        </View>
                        {/* <TouchableOpacity onPress={() => dialCall()} > */}

                        <View style={styles.alignStyle}>
                            <CallSvg />
                            <Text style={[styles.font3, { marginLeft: 10 }]} >{phNo}</Text>
                        </View>
                        {/* </TouchableOpacity> */}
                    </View>


                </View>

                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={goEditProfile}
                        style={[styles.editButton, { marginVertical: 20 }]}>
                        <EditSvg />
                        <Text style={[styles.font3, { marginLeft: 10 }]}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.container2MyAccount}>
                <FlatList
                    style={{ marginTop: 20 }}
                    data={myAccountData} renderItem={({ item, index }) => (

                        <View style={{ marginHorizontal: 20 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    copyCilpBoard(item, index)
                                }
                                }
                                style={[styles.alignStyle2, { marginVertical: 20 }]}>
                                <View style={styles.alignStyle} >
                                    <View style={{ marginRight: 20 }}>
                                        {item.svgIcon}
                                    </View>
                                    <Text style={styles.font4}>{item.name}</Text>
                                </View>
                                <View>
                                    {
                                        item.name == "Referral Code" ?
                                            <View style={{ height: 30, backgroundColor: "#FFD64885", padding: 7, justifyContent: "center", borderRadius: 5, borderWidth: 1, borderColor: Colors.PRIMARY }}>
                                                <Text style={styles.font3}>{referralCode}</Text>
                                            </View>
                                            :
                                            <RightSvg />
                                    }
                                </View>


                            </TouchableOpacity>
                            <View style={styles.sectionLine}></View>
                        </View>
                    )} />
            </View>

            <CustomAlert
                title={"Invalid Details"}
                desc={alertText}
                leftButtonText={"Ok"}
                leftButtonFunction={leftButtonFunction}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility}
                customAlertVisible={customAlertVisible}
            />


            <CustomAlert
                title={"Exit"}
                desc={"Are you sure you want to exit?"}
                leftButtonText={"No"}
                rightButtonText={"Yes"}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility1}
                leftButtonFunction={leftButtonFunction1}
                rightButtonFunction={rightButtonFunction1}
                customAlertVisible={customAlertVisible1}
            />
        </View>
    )
}

const mapStateToProps = state => ({
    name: state.user.name,
    email: state.user.email,
    phNo: state.user.phNo,
    reduxUserImage: state.user.thumbnailImage,
    userId: state.user.userId,
    referralCode: state.user.referralCode
});

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountScreen);
