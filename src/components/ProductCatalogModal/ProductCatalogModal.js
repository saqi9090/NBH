// import React from 'react'
// import { StyleSheet, Text, View } from 'react-native'

// const ProductCatalogModal = () => {
//     return (
//         <View>
//             <Text></Text>
//         </View>
//     )
// }

// export default ProductCatalogModal

// const styles = StyleSheet.create({})




import React from 'react'
import { FlatList, KeyboardAvoidingView, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, Fonts, Server } from '../../global'
import { memberplane } from '../DummyData/DummyDataScreen'
import CancelSvg from '../../assets/svg/crossSmall'
import axios from 'axios'
import { SCREEN_WIDTH } from '../../global/constants'
import { getService } from '../../services/getService'
import CustomAlert from '../CustomAlert/CusomAlert'

const ProductCatalogModal = ({ memberPlane, memberHeader, state, toggle,
    setPicodevalue, setMemberName, picodevalue }) => {


    const [dataValue, setDataValue] = React.useState(null)

    const [alertTitle, setAlertTitle] = React.useState("");
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false);

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }
    const onShow = async () => {
        if (memberHeader == "Pincode") {
            const req = `/pincode`
            getService(req).then((response) => {
                if (response.code == 200) {

                    setDataValue([{
                        "city": "Bhiwandi", "createdDate": "2021-07-08T06:58:52.275+00:00",
                        "pincode": "None", "pincodeId": 0, "updatedDate": "2021-07-08T06:58:52.275+00:00"
                    }, ...response.data])
                } else {
                    setAlertTitle("Alert")
                    setAlertText(response.message)
                    toggleCustomAlertVisibility()
                }
            })
        }
        else {
            const req = `/users`
            getService(req).then((response) => {
                if (response.code == 200) {
                    setDataValue([{
                        "userId": 0,
                        "firstName": "dcxvxzc",
                        "lastName": "xfgcb",
                        "name": "None",
                    }, ...response.data])
                } else {
                    setAlertTitle("Alert")
                    setAlertText(response.message)
                    toggleCustomAlertVisibility()
                }
            })
        }
    }


    const pincodeFun = (item) => {
        setPicodevalue(item)
        toggle()
    }

    const MemberNameFun = (item) => {
        setMemberName(item)
        toggle()
    }




    return (
        <Modal
            animationType={'fade'}
            visible={state}
            // onRequestClose={toggleModal}
            onShow={onShow}
            transparent={true}
        // statusBarTranslucent={true}
        >
            <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "#00000010" }}>
                <View style={styles.modalContainer}>
                    <KeyboardAvoidingView behavior={Platform.OS == "android" ? null : "padding"}>
                        <View style={styles.confirmContainer}>
                            <View style={styles.confirmHeader}>
                                <Text style={styles.confirmDeliveryText}
                                    maxFontSizeMultiplier={1}>{memberHeader}</Text>
                                <TouchableOpacity
                                    onPress={() => toggle()}
                                    style={styles.closeButton}>
                                    <CancelSvg />
                                </TouchableOpacity>
                            </View>
                            {
                                dataValue
                                // false
                                &&
                                <View>

                                    <FlatList
                                        data={dataValue}
                                        style={{ marginVertical: 0, maxHeight: SCREEN_WIDTH / 3 }}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({ item, index }) => (
                                            <View>
                                                {
                                                    memberHeader == "Pincode" ?


                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                pincodeFun(item)
                                                            }}
                                                            style={{ elevation: 3, }}>
                                                            <View style={{ flex: 1, marginVertical: 12, paddingHorizontal: 20 }}>

                                                                <Text style={{ fontSize: 14, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK }}>
                                                                    {
                                                                        item.pincode
                                                                    }
                                                                </Text>
                                                            </View>
                                                            <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View>
                                                        </TouchableOpacity>

                                                        :


                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                MemberNameFun(item)
                                                            }}
                                                            style={{ elevation: 3, }}>
                                                            <View style={{ flex: 1, marginVertical: 12, paddingHorizontal: 20 }}>

                                                                <Text style={{ fontSize: 14, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK }}>
                                                                    {item.name}
                                                                </Text>
                                                            </View>
                                                            <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View>
                                                        </TouchableOpacity>
                                                }
                                            </View>
                                        )} />
                                </View>
                            }
                        </View>
                    </KeyboardAvoidingView>
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
        </Modal>

    )
}

export default ProductCatalogModal

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
        paddingBottom: 10,
        backgroundColor: Colors.WHITE,
        // height:300
        // paddingBottom: 20,
    },
    confirmHeader: {
        backgroundColor: Colors.PRIMARY,
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

