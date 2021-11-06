import { View, Text, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, TextInput, FlatList, Image, StyleSheet, ToastAndroid, Linking, Alert, ScrollView } from 'react-native'
import { styles } from "./CartModalStyles";
import React from 'react'
// import { Colors, Fonts, ScreenNames } from '../../global';
// import DropdownSvg from "../../assets/svg/dropdown.svg"
// import FocusAwareStatusBar from '../FocusAwareStatusBar';
import CrossSvg from "../../assets/svg/cross.svg"
import { PaymentType } from '../DummyData/DummyDataScreen';
import { globalStyles } from '../../global/globalStyles';
import { Colors, Constants, Fonts, ScreenNames, Server } from '../../global';
import CheckSvg from "../../assets/svg/check.svg";
import MinusSvg from "../../assets/svg/minus.svg";
import PlusSvg from "../../assets/svg/Plus.svg";
import { SCREEN_WIDTH } from '../../global/constants';
import CustomToastAlert from '../CustomToastAlert/CustomToastAlert';
import { CartItems } from '../../../App';
import CartItem from '../CartItem/CartItem';
import axios from 'axios';
import { BASE_URL } from '../../global/server';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import CustomAlert from '../CustomAlert/CusomAlert';
import { getService } from '../../services/getService';
import { postRequest } from '../../services/postService';




const CartModal = ({ toggleCartModal, addCart, userId, addressLength, selectAddress, addressToggle, name, email, phNo, getAddress }) => {

    const navigation = useNavigation()
    //state

    const [cartItems, setCartItems] = React.useContext(CartItems)
    const [totalAmount, setTotalAmount] = React.useState(0)
    const [walletPoints, setWalletPoints] = React.useState(null);
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false)
    const [alertText, setAlertText] = React.useState('');
    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }

    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }

    const goFreeShop = async () => {
        if (selectAddress.addressId) {
            if (walletPoints.points >= totalAmount) {



                const orderData = {
                    userName: name,
                    phone: phNo,
                    cnName: "",
                    cnNumber: "",
                    email: email,
                    grandTotal: totalAmount,
                    orderItems: cartItems,
                    userAddress: selectAddress
                }



                // const response = await axios.post(`${Server.BASE_URL}/orders/addOrder/userId/${userId}`, orderData)
                const uri = `/orders/addOrder/userId/${userId}`
                const body = orderData
                postRequest(uri, body).then((response) => {
                    if (response.code == 200) {
                        setCartItems([])
                        toggleCartModal()
                    } else {
                        setAlertText(response.message)
                        toggleCustomAlertVisibility()
                    }
                })


            } else {
                setAlertText("Insifficient wallet point")
                toggleCustomAlertVisibility()
            }
        } else {
            setAlertText("Please Select Address")
            toggleCustomAlertVisibility()
        }
    }

    const renderItem = ({ item }) => {
        return (
            <CartItem item={item} toggleCartModal={toggleCartModal} />
        )
    }

    React.useEffect(() => {
        let total = 0
        cartItems.map(e => {
            total += e.quantity * e.points
        })
        setTotalAmount(total);
    }, [cartItems])


    const getWalletPoints = async () => {
        const req = `/wallets/userId/${userId}`
        getService(req).then((response) => {
            if (response.code == 200) {
                setWalletPoints(response.data)
            } else {
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })
    };

    React.useEffect(() => {
        getWalletPoints()
    }, [])

    const goAddressMap = () => {
        if (selectAddress.addressId) {

        } else {

            if (addressLength == 0) {
                toggleCartModal()
                navigation.navigate(ScreenNames.ADD_ADDRESS_MAP_SCREEN, { edit: 0, getAddress: getAddress })
            } else {
                toggleCartModal()
                addressToggle()
            }
        }
    }

    return (

        <Modal
            animationType={'fade'}
            visible={addCart}
            // onRequestClose={toggleModal}
            transparent={true}
        // statusBarTranslucent={true}
        >
            <View style={styles.modalContainer}>
                <View style={styles.confirmHeader}>
                    <Text style={styles.confirmDeliveryText}
                        maxFontSizeMultiplier={1}>Cart</Text>
                    <TouchableOpacity
                        onPress={() => toggleCartModal()}
                        hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                        <CrossSvg />
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.confirmContainer} showsVerticalScrollIndicator={false}>

                    <View >
                        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>

                                <TouchableOpacity
                                    onPress={goAddressMap}
                                    style={{ marginBottom: 8, width: Constants.SCREEN_WIDTH / 1.32 }}>
                                    <Text style={[styles.font1, { fontSize: 17, color: Colors.BLACK }]}>
                                        {
                                            selectAddress.addressId
                                                ?
                                                selectAddress.building + ", " + selectAddress.floor + ", " + selectAddress.flatNo + ", " + selectAddress.landmark + ", " + selectAddress.city + ", " + selectAddress.pincode
                                                :
                                                addressLength == 0 ?
                                                    "+ Add Address"
                                                    :
                                                    "Select Address"
                                        }
                                    </Text>
                                </TouchableOpacity>
                                {
                                    selectAddress.addressId
                                    &&
                                    <Text onPress={() => {
                                        toggleCartModal()
                                        addressToggle()
                                    }} style={[styles.font1, { fontSize: 17, color: Colors.PRIMARY }]}>
                                        Change
                                    </Text>}
                            </View>

                            <Text style={styles.font1} >Products</Text>
                            <FlatList
                                data={cartItems}
                                keyExtractor={item => `ProductId${item.productId}`}
                                renderItem={renderItem}
                            />


                            <View style={{ marginVertical: 20 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 7 }}>
                                    <Text style={styles.font3}>Grand Total</Text>
                                    <Text style={styles.font3}>{totalAmount} pts</Text>
                                </View>
                            </View>


                            <TouchableOpacity
                                onPress={goFreeShop}
                                style={[globalStyles.button, { marginTop: 50, marginHorizontal: 0 }]}>
                                <Text style={[globalStyles.buttonText, { fontFamily: Fonts.SEMIBOLD }]}>Place Order ({totalAmount} pts)</Text>
                            </TouchableOpacity>

                        </View>



                    </View>
                </ScrollView>
                <CustomAlert
                    title={"ALert"}
                    desc={alertText}
                    leftButtonText={"Ok"}
                    leftButtonFunction={leftButtonFunction}
                    toggleCustomAlertVisibility={toggleCustomAlertVisibility}
                    customAlertVisible={customAlertVisible}
                />
            </View>
        </Modal>

    )
}

// export default CartModal
const mapStateToProps = state => ({
    name: state.user.name,
    email: state.user.email,
    phNo: state.user.phNo,
    userImage: state.user.thumbnailImage,
    userId: state.user.userId,
    selectAddress: state.user.selectAddress
});

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(mapStateToProps, mapDispatchToProps)(CartModal)


