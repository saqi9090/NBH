import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, Fonts, ScreenNames, Server } from '../../global';
import TestIcon from "../../assets/svg/location.svg";
import DateClockSvg from "../../assets/svg/event calendar.svg";
import LocationSvg from "../../assets/svg/event location.svg";
import moment from 'moment';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { getService } from '../../services/getService';
import { postRequest } from '../../services/postService';
import CustomAlert from '../CustomAlert/CusomAlert';


// import { SCREEN_WIDTH } from '../../global/constants';

const EventsCards = ({ item, userId, email, name, phNo }) => {


    const navigation = useNavigation()


    const [purchase, setpurchase] = React.useState(item.purches)
    const [alertTitle, setAlertTitle] = React.useState("");
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false);

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }

    const PaytoRegister = async () => {
        const razorPayData = {
            "razorpayDetail": {
                "razorpayOrderId": "razorpayDetail.razorpay_order_id",
                "razorpayPaymentId": "razorpayDetail.razorpay_payment_id",
                "razorpaySignature": "razorpayDetail.razorpay_signature"
            }
        }
        // const response = await axios.post(`${Server.BASE_URL}/razorPay/createEventPurchase/userId/${userId}/eventId/${item.eventId}`, razorPayData)
        const uri = `/razorPay/createEventPurchase/userId/${userId}/eventId/${item.eventId}`
        const body = razorPayData
        postRequest(uri, body).then((response) => {
            if (response.code == 200) {



                //   console.warn("1");

                const options = {
                    description: 'Get Your Product',
                    currency: 'INR',
                    key: 'rzp_live_49A1dDF43qmmgG',
                    amount: response.data.amount * 100,
                    name: 'NBH',
                    order_id: response.data.razorpayOrderId,
                    prefill: {
                        email: email,
                        contact: phNo,
                        name: name
                    },
                    theme: { color: Colors.PRIMARY }
                }
                if (item.amount == 0) {
                    setpurchase(true)
                    navigation.pop()
                } else {

                    RazorpayCheckout
                        .open(options)
                        .then((data) => {


                            completePayment(data)
                        }).catch(async (error) => {
                            // const data = await axios.get(`${Server.BASE_URL}/razorPay/orderId/${response.data.razorpayOrderId}`)

                            const req = `/razorPay/orderId/${response.data.razorpayOrderId}`
                            getService(req).then((data) => {
                                if (data.code == 200) {

                                    if (data.data.status == "paid") {
                                        let data = {
                                            razorpay_order_id: response.data.razorpayOrderId,
                                            razorpay_payment_id: "detailNotFound",
                                            razorpay_signature: "detailNotFound"
                                        }
                                        completePayment(data)
                                    } else {
                                        // setActiveIndicator(false);
                                        console.warn("pay 1", error.message);
                                    }
                                } else {
                                    setAlertTitle("Alert")
                                    setAlertText(data.message)
                                    toggleCustomAlertVisibility()
                                }
                            })
                        });
                }
            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }

        })

    }


    const completePayment = async (razorpayDetail) => {

        const razorPayData = {
            "razorpayDetail": {
                "razorpayOrderId": razorpayDetail.razorpay_order_id,
                "razorpayPaymentId": razorpayDetail.razorpay_payment_id,
                "razorpaySignature": razorpayDetail.razorpay_signature
            }
        }
        // const response = await axios.post(`${Server.BASE_URL}/razorPay/verifySignatureForEventPurchase/userId/${userId}/eventId/${item.eventId}`, razorPayData)
        const uri = `/razorPay/verifySignatureForEventPurchase/userId/${userId}/eventId/${item.eventId}`
        const body = razorPayData
        postRequest(uri, body).then((response) => {
            if (response.code == 200) {
                setpurchase(true)
                navigation.pop()
            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })

    }


    const postApplePayEvent = async () => {
        await axios.get(`${Server.BASE_URL}/razorPay/saveEventPurchase/userId/${userId}/eventId/${item.eventId}`)
        navigation.pop()
        setpurchase(true)
    }




    return (
        <View style={{ backgroundColor: Colors.WHITE, marginVertical: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={styles.ImageBox}>

                    <Image source={{ uri: `${Server.BASE_URL}/events/${item.eventId}/${item.image}/thumbnailImage` }} style={{ height: "100%", width: "100%" }} />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.font1}>{item.eventName}</Text>
                    <View style={{ marginVertical: 5 }}>
                        <Text style={styles.font2}>{item.description}</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <DateClockSvg />
                            <Text style={styles.font3} >{moment(item.eventDate).format("DD/MM/YYYY")} {item.startTime}</Text>
                        </View>
                        <View >
                            <View style={{ flexDirection: "row", marginVertical: 10 }}>
                                <LocationSvg />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.font4} >{item.location}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        disabled={purchase == true ? true : false}
                        onPress={() => {
                            navigation.navigate(ScreenNames.MAKEPAYMENTEVENTS_SCREEN,
                                { PaytoRegister: PaytoRegister, name: name, ApplePayEvent: postApplePayEvent, NavBar: true })

                        }}
                        style={[styles.PayButton, { backgroundColor: purchase == true ? "#FFD64890" : "#FFD648" }]}>
                        <Text style={styles.font5} >
                            {
                                purchase == true ?
                                    "Paid" :
                                    `Pay ₹ ${item.amount}`
                            } </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <CustomAlert
                title={alertTitle}
                desc={alertText}
                leftButtonText={"Ok"}
                leftButtonFunction={leftButtonFunction}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility}
                customAlertVisible={customAlertVisible}
            />
        </View>
    )
}


const mapStateToProps = (state) => {
    return {
        userId: state.user.userId

    };
};

const mapDispatchToProps = (dispatch) => ({ dispatch, });
export default connect(mapStateToProps, mapDispatchToProps)(EventsCards);

const styles = StyleSheet.create({

    ImageBox: {
        height: 180,
        // max:180,

        width: 150,
        backgroundColor: Colors.PRIMARY,
        marginRight: 20
    },
    font1: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK },
    font2: { fontSize: 12, fontFamily: Fonts.REGULAR, color: Colors.JUNGLE_BLACK },
    font3: { fontSize: 12, fontFamily: Fonts.SEMIBOLD, color: "#00000080", marginLeft: 10 },
    font4: { fontSize: 12, fontFamily: Fonts.SEMIBOLD, color: "#00000080", marginLeft: 10 },
    font5: { fontSize: 14, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK },
    PayButton: { height: 30, width: 84, alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: Colors.PRIMARY }

})
