import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import { styles } from "./OrderListingStyles";
import Header from "../../components/Header/Header";
import { Colors, Fonts, ScreenNames, Server } from '../../global';
import BagsSvg from "../../assets/svg/orderid.svg";
import RightArrowSvg from "../../assets/svg/chevron-down.svg"
import { ProductCatalogueData } from '../../components/DummyData/DummyDataScreen';
import axios from 'axios';
import { connect } from 'react-redux';
import { getService } from '../../services/getService';
import CustomAlert from '../../components/CustomAlert/CusomAlert';


const OrderListingScreen = ({ navigation, userId }) => {



    //function 

    const [orderList, setorderList] = React.useState(null)
    const [alertTitle, setAlertTitle] = React.useState("");
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false);

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }


    const orderListing = async () => {

        const req = `/orders/userId/${userId}`
        getService(req).then((response) => {
            if (response.code == 200) {
                setorderList(response.data)
            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })
    }

    React.useEffect(() => {
        orderListing()
    }, [])


    const goOrderDetail = (orderId) => {
        navigation.navigate(ScreenNames.ORDERDETAILS_SCREEN, { orderId: orderId })
    }
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <Header name={"Order Listing"} backgroundColor={true} />
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ marginVertical: 20 }}
                keyExtractor={(item) => `orderId${item.orderId}`}
                data={orderList}
                // style={{ marginHorizontal: 20, width: SCREEN_WIDTH - 40, marginVertical: 20 }}
                renderItem={({ item, index }) => (
                    <View style={{ marginHorizontal: 20, marginVertical: 15 }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => goOrderDetail(item.orderId)}
                            style={styles.OrderListingContainer}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>

                                <BagsSvg />
                                <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
                                    <Text style={{ fontSize: 14, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYXOpacity }}>Order ID:</Text>
                                    <Text style={{ fontSize: 14, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYX_60 }}> {item.orderId}</Text>

                                </View>
                            </View>
                            <TouchableOpacity style={{ transform: [{ rotate: "-90deg" }] }}>
                                <RightArrowSvg />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                )} />

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


const mapStateToProps = state => ({
    name: state.user.name,
    email: state.user.email,
    phNo: state.user.phNo,
    userImage: state.user.thumbnailImage,
    userId: state.user.userId
});

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(mapStateToProps, mapDispatchToProps)(OrderListingScreen);
// export default OrderListingScreen
