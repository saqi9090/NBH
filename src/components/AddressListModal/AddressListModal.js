import React from 'react'
import { View, Text, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, TextInput, FlatList, Image, StyleSheet, ToastAndroid, Linking, Alert } from 'react-native'
// import { styles } from "./CartModalStyles";
// import { Colors, Fonts, ScreenNames } from '../../global';
// import DropdownSvg from "../../assets/svg/dropdown.svg"
// import FocusAwareStatusBar from '../FocusAwareStatusBar';
import CrossSvg from "../../assets/svg/cross.svg"
import { PaymentType } from '../DummyData/DummyDataScreen';
import { globalStyles } from '../../global/globalStyles';
import { Colors, Fonts, ScreenNames, Server } from '../../global';
import * as UserActions from '../../redux/actions/userActions'
import { connect } from 'react-redux';
import axios from 'axios';


const AddressListModal = ({ dispatch, addressToggle, userAddress, addressList, toggleCartModal, userId, }) => {

    const selectAddress = (data) => {
        dispatch(UserActions.setSelectAddress(data))
        addressToggle()
        toggleCartModal()
    }

    const renderItem = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity
                    style={{ marginHorizontal: 20, padding: 5 }}
                    onPress={() => selectAddress(item)}>
                    <Text style={{ fontSize: 14, fontFamily: Fonts.BOLD, color: Colors.BLACK }}>{item.building},{item.flatNo},{item.floor},{item.landmark},{item.city},{item.pincode}</Text>
                </TouchableOpacity>
                <View style={{ height: 1, width: "100%", backgroundColor: Colors.BLACK }}></View>
            </View>
        )
    }
    return (
        <Modal
            animationType={'fade'}
            visible={addressList}
            transparent={true}
        // statusBarTranslucent={true}
        >
            <View style={styles.modalContainer}>

                <KeyboardAvoidingView behavior={Platform.OS == "android" ? null : "padding"}>
                    <View style={styles.confirmContainer}>
                        <View style={styles.confirmHeader}>
                            <Text style={styles.confirmDeliveryText}
                                maxFontSizeMultiplier={1}>AddressList</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    addressToggle()
                                    toggleCartModal()
                                }
                                }
                                hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
                            >
                                <CrossSvg />
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            // style={{ marginHorizontal: 20 }}
                            data={userAddress}
                            renderItem={renderItem}
                        />



                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal >
    )
}
const mapStateToProps = state => ({
    userId: state.user.userId,
    selectAddress: state.user.selectAddress
});

// export default AddressListModal
const mapDispatchToProps = dispatch => ({ dispatch });

// export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
export default connect(mapStateToProps, mapDispatchToProps)(AddressListModal);
const styles = StyleSheet.create({

    modalContainer: {
        flex: 1,
        backgroundColor: '#00000050',
        justifyContent: 'flex-end'
    },
    confirmContainer: {
        // flex: 0.25,
        backgroundColor: Colors.WHITE,
        paddingBottom: 20,
    },
    confirmHeader: {
        backgroundColor: Colors.PRIMARY,
        flexDirection: 'row',
        height: 66,
        justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal: 20
    },
    confirmDeliveryText: {
        // paddingLeft: 20,
        paddingTop: 15,
        paddingBottom: 15,
        fontFamily: Fonts.SEMIBOLD,
        fontSize: Fonts.SIZE_16,
        color: Colors.JUNGLE_BLACK,
        letterSpacing: 0.2,

    },
    font1: { fontSize: 17, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK, marginVertical: 10 },

    font2: { fontSize: 15, fontFamily: Fonts.REGULAR, color: Colors.ONYX_60, },
    font3: { fontSize: 14, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK, },
    font4: { fontSize: 13, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYXOpacity, },
    font5: { fontSize: 12, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK, },
    font6: { fontSize: 12, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK, },
    font7: { fontSize: 14, fontFamily: Fonts.BOLD, color: Colors.ONYX_60, },
    quantity: { height: 30, width: 68, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 4, backgroundColor: Colors.PRIMARY, borderRadius: 5 }


})
