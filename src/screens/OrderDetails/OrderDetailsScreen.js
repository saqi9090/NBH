import React from 'react'
import { View, Text, Image, FlatList, ScrollView } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { styles } from "./OrderDetailsStyles";
import Header from "../../components/Header/Header";
import { Colors, Fonts, Server } from '../../global';
import { OrderStatus } from "../../components/DummyData/DummyDataScreen"
import moment from 'moment';
import CheckSvg from "../../assets/svg/checked1.svg"
import axios from 'axios';
import { BASE_URL } from '../../global/server';
import { getService } from '../../services/getService';
import CustomAlert from '../../components/CustomAlert/CusomAlert';
// import moment from "moment"


const OrderDetailsScreen = ({ orderId, route, params }) => {

    //variable

    const [alertTitle, setAlertTitle] = React.useState("");
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false);

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }

    const OrderStatus = [
        {
            key: 0,
            OrderStatus: "Ordered",
            date: "01:40 PM",
            svg: <CheckSvg />
        },
        {
            key: 1,
            OrderStatus: "Confirmed",
            date: "01:40 PM",
            svg: <CheckSvg />
        },
        {
            key: 3,
            OrderStatus: "En-Route",
            date: "01:40 PM",
            svg: <CheckSvg />
        },
        {
            key: 6,
            OrderStatus: "Delivered",
            date: "01:40 PM",
            svg: <CheckSvg />
        }

    ]


    const [orderDetail, setorderDetail] = React.useState()

    const orderDetails = async () => {
        const req = `/orders/${route.params.orderId}`
        getService(req).then((response) => {
            if (response.code == 200) {
                setorderDetail(response.data)
            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })
    }

    React.useEffect(() => {
        orderDetails()
    }, [])







    //render data

    const renderItemOrder = ({ item, index }) => {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.WHITE, marginVertical: 10 }}>
                <View style={styles.sectionLine}></View>
                <View style={{ marginHorizontal: 20 }}>
                    <View style={styles.alignstyle}>
                        <View style={styles.OrderDetailImage}>
                            <Image source={{ uri: `${BASE_URL}/products/${item.productId}/${item.thumbnailImage}/thumbnailImage` }}
                                style={{ height: "100%", width: "100%", borderRadius: 10 }} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.font6, { marginVertical: 5 }]}>{item.productName}</Text>
                            <Text style={styles.font7}>{item.points} pts x {item.quantity}</Text>
                        </View>

                    </View>
                </View>

                <View style={styles.sectionLine}></View>


            </View>
        )
    }
    //
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <Header name={"Order Details"} backgroundColor={true} />
            <ScrollView showsVerticalScrollIndicator={false} >
                {/* thu,25th Mar,08.01 PM */}
                <View style={{ marginHorizontal: 20, marginTop: 30 }}>
                    <Text style={styles.font1}>Order ID- {orderDetail && orderDetail.orderId}</Text>
                    <Text style={styles.font2}>Place On:{orderDetail && moment(orderDetail.orderedDate).format("ddd Do MMMM, h:mm a")}</Text>
                    <View style={styles.alignstyle}>
                        <Text style={styles.font3}>Total Price: </Text>
                        <Text style={styles.font4}>{orderDetail && orderDetail.grandTotal} Points</Text>
                    </View>
                    <View style={styles.alignstyle}>
                        <Text style={styles.font3} >CN Number: </Text>
                        <Text style={styles.font4} >{orderDetail && orderDetail.cnNumber}</Text>
                    </View>
                    <View style={styles.alignstyle}>
                        <Text style={styles.font3} >CN Name: </Text>
                        <Text style={styles.font4} >{orderDetail && orderDetail.cnName}</Text>
                    </View>
                </View>
                <FlatList data={orderDetail && orderDetail.orderItems}
                    renderItem={renderItemOrder} />
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={styles.font8}>Payment Information</Text>
                    <View style={[styles.alignstyle2, { marginVertical: 5, marginTop: 10 }]}>
                        <Text style={styles.font9} >Items Total</Text>
                        <Text style={styles.font10}>{orderDetail && orderDetail.grandTotal} Points</Text>
                    </View>
                    {/* <View style={[styles.alignstyle2, { marginVertical: 5 }]}>

                        <Text style={styles.font9}>Delivery</Text>
                        <Text style={styles.font10}>Free</Text>
                    </View> */}
                </View>
                <View style={[styles.alignstyle2, { marginTop: 30, marginHorizontal: 20 }]}>

                    <Text style={styles.font11}>Total Amount</Text>
                    <Text style={styles.font12}>{orderDetail && orderDetail.grandTotal} Points</Text>
                </View>




            </ScrollView>

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

export default OrderDetailsScreen



{/* <View style={styles.sectionLine}></View> */ }
// <View style={{ marginLeft: 40, marginBottom: 30 }}>
// <FlatList
// showsVerticalScrollIndicator={false}
//     data={OrderStatus}
//     renderItem={({ item, index }) => {
//         return (
//             <View style={styles.ordertrackpart} >
//                 <View style={{ ...styles.iconcont, marginTop: index == OrderStatus.length - 1 ? -40 : 0 }}>
//                     <View style={{ ...styles.iconpart, backgroundColor: index == 0 || item.key >= index ? Colors.ONYXOpacity : Colors.PRIMARY, height: index == 0 || item.key >= index ? 15 : 30, width: index == 0 || item.key >= index ? 15 : 30 }}>
//                         {item.svg}
//                     </View>
//                     {
//                         index == OrderStatus.length - 1 ?
//                             null
//                             :
//                             <View style={{ ...styles.verticallinepart, backgroundColor: index == 0 || item.key >= index ? Colors.ONYXOpacity : Colors.PRIMARY }}></View>
//                     }
//                 </View>
//                 <View style={styles.detailpartordertrack}>
//                     <View>
//                         <Text maxFontSizeMultiplier={1} style={{ ...styles.orderFont, color: index == 0 || item.key >= index ? Colors.ONYXOpacity : Colors.GRAY_DARK, fontSize: 15 }}>{item.OrderStatus}</Text>
//                         <Text style={[styles.orderFont, { fontSize: 10, fontFamily: Fonts.BOLD, color: "#16161660", alignSelf: "center" }]}>{item.date}</Text>
//                     </View>
//                     {/* {
//                         index == 0 || item.key >= index ?

//                             <Text maxFontSizeMultiplier={1} style={styles.orderdateFont}>On: {moment(item.OrderStatus.toUpperCase() == "ORDERED" ? orderDetails.orderedDate : item.OrderStatus.toUpperCase() == "ACCEPTED" ? orderDetails.acceptedDate : item.OrderStatus.toUpperCase() == "ASSIGNED" ? orderDetails.assignedDate : item.OrderStatus.toUpperCase() == "ENROUTE" ? orderDetails.enroutedDate : item.OrderStatus.toUpperCase() == "DELIVERED" ? orderDetails.deliveredDate : null).format('L')} {moment(item.OrderStatus.toUpperCase() == "ORDERED" ? orderDetails.orderedDate : item.OrderStatus.toUpperCase() == "ACCEPTED" ? orderDetails.acceptedDate : item.OrderStatus.toUpperCase() == "ASSIGNED" ? orderDetails.assignedDate : item.OrderStatus.toUpperCase() == "ENROUTE" ? orderDetails.enroutedDate : item.OrderStatus.toUpperCase() == "DELIVERED" ? orderDetails.deliveredDate : null).format('LT')}</Text>
//                             : null
//                     } */}
//                 </View>

//             </View>
//         )
//     }} />
// </View>