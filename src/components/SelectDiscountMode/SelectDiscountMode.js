import React from 'react'
import { FlatList, KeyboardAvoidingView, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, Fonts } from '../../global'
import CancelSvg from '../../assets/svg/crossSmall'
const SelectDiscountMode = ({ _toggleDiscountMode, discountCodeTextValue, setDiscountCodeTextValue, discountCode, DiscountMode }) => {
    const DiscountMode1 = [
        {
            Key: 1,
            value: "None"
        },
        {
            Key: 2,

            value: "COUPON_CODE"
        },
        {
            Key: 3,
            value: "SALES_REFERRAL"
        },
        {
            Key: 4,
            value: "MEMBER_REFERRAl"
        },
    ]
    // SALES_REFERRAL, MEMBER_REFERRAl, COUPON_CODE, EMPTY

    return (
        <Modal
            animationType={'fade'}
            visible={discountCode}
            // onRequestClose={toggleModal}
            transparent={true}
            statusBarTranslucent={true}
        >
            <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "#00000010" }}>
                <TouchableOpacity style={{ flex: 1 }} onPress={_toggleDiscountMode}></TouchableOpacity>
                <View style={styles.modalContainer}>
                    <KeyboardAvoidingView behavior={Platform.OS == "android" ? null : "padding"}>
                        <View style={styles.confirmContainer}>
                            <View style={styles.confirmHeader}>
                                <Text style={styles.confirmDeliveryText}
                                    maxFontSizeMultiplier={1}>Select Discount Mode</Text>
                                <TouchableOpacity
                                    onPress={_toggleDiscountMode}
                                    style={styles.closeButton}>
                                    <CancelSvg />
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={DiscountMode1}
                                style={{ marginVertical: 0, marginBottom: 15 }}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (DiscountMode == true) {
                                                if (item.value == "None") {
                                                    setDiscountCodeTextValue("Select Discount Mode")
                                                }
                                                else {
                                                    setDiscountCodeTextValue(item.value)
                                                }
                                                _toggleDiscountMode()
                                            }
                                        }}
                                        style={{ elevation: 3, }}>
                                        <View style={{ flex: 1, marginVertical: 10, paddingHorizontal: 20 }}>
                                            <Text style={{ fontSize: 14, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK }}>{item.value}</Text>
                                        </View>
                                        <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View>
                                    </TouchableOpacity>
                                )} />
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </Modal>

    )
}

export default SelectDiscountMode

const styles = StyleSheet.create({
    modalContainer: {
        // flex: 1,
        // height:200
        // backgroundColor: '#00000050',
        // justifyContent: 'flex-end'
    },
    confirmContainer: {
        // flex: 0.25,
        // flex:1,
        // height:200,
        marginTop: 10,
        elevation: 5,
        backgroundColor: Colors.WHITE,
        // paddingBottom: 20,
    },
    confirmHeader: {
        backgroundColor: Colors.BRANDLESBLUE,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
    },
    confirmDeliveryText: {
        paddingLeft: 20,
        paddingTop: 15,
        paddingBottom: 15,
        fontFamily: Fonts.BOLD,
        fontSize: Fonts.SIZE_16,
        color: Colors.WHITE,
        letterSpacing: 0.2,

    },
    closeButton: {
        // paddingLeft: 20,
        // paddingTop: 20,
        // paddingBottom: 20,
        paddingRight: 20,
        justifyContent: 'center',
    },
})
