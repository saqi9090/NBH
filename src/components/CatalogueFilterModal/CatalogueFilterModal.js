import { View, Text, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, TextInput, StyleSheet, FlatList, Alert } from 'react-native'
import React from 'react'
import { Colors, Fonts, ScreenNames } from '../../global';
import DropDown from "../../assets/svg/caret-down (1) 3.svg";
import CrossSvg from "../../assets/svg/cross.svg"

import FocusAwareStatusBar from '../FocusAwareStatusBar';
import FilterSearch from '../FilterSearch/FilterSearch';
import { MemberName1, memberplane, Pincode1, Pincode14 } from '../DummyData/DummyDataScreen';
import CustomAlert from '../CustomAlert/CusomAlert';
import axios from 'axios';
import { BASE_URL } from '../../global/server';
import ProductCatalogModal from '../ProductCatalogModal/ProductCatalogModal';
import { getService } from '../../services/getService';
const CatalogueFilterModal = ({ _toggleFilterMyAskList, filterMyAskList, navigation,
    setSelectedMemberId, setSelectedPincode, selectedMemberId, selectedPincode }) => {


    // console.warn("selectedMemberId", selectedMemberId);
    // console.warn("selectedPincode[][][]", selectedPincode);
    // state
    // const [name, setName] = React.useState("");
    // const [phoneNumber, setPhoneNumber] = React.useState("");

    const [picodevalue, setPicodevalue] = React.useState([]);
    const [memberName, setMemberName] = React.useState([]);
    const [pincodet, setPincodet] = React.useState(false);
    const [memberNamet, setMemberNamet] = React.useState(false);
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false)

    const [pincodeData, setPincodeData] = React.useState([])
    const [alertTitle, setAlertTitle] = React.useState("");



    //function 

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }

    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }
    const _togglePincodeModal = () => {
        setPincodet(!pincodet)
    }
    const _toggleMemberModal = () => {
        setMemberNamet(!memberNamet)
    }


    const GoSearchByTag = () => {
        navigation.navigate(ScreenNames.SEARCHBYTAG_SCREEN)
    }

    const ProductView = async () => {
        if (memberName.name == "None") {
            setSelectedMemberId(0)
        } else {
            if (memberName.length == 0) {

                setSelectedMemberId(0)
            } else {

                setSelectedMemberId(memberName.userId)
            }
        }
        if (picodevalue.pincode == "None") {
            setSelectedPincode(0)
        } else {
            if (picodevalue.length == 0) {
                setSelectedPincode(0)
            } else {
                setSelectedPincode(picodevalue.pincode)
            }
        }
        _toggleFilterMyAskList()
    }

    const getPinCode = async () => {

        const req = `/pincode`
        getService(req).then((response) => {
            if (response.code == 200) {
                setPincodeData(response.data)
            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })
    }
    return (



        <Modal
            onShow={getPinCode}
            animationType={'fade'}
            visible={filterMyAskList}
            // onRequestClose={toggleModal}
            transparent={true}
        // statusBarTranslucent={true}
        >
            <View style={styles.modalContainer}>

                <KeyboardAvoidingView behavior={Platform.OS == "android" ? null : "padding"}>
                    <View style={styles.confirmContainer}>
                        <View style={styles.confirmHeader}>
                            <Text style={styles.confirmDeliveryText}
                                maxFontSizeMultiplier={1}>FILTER </Text>

                            <TouchableOpacity
                                onPress={() => _toggleFilterMyAskList()}
                                hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CrossSvg />
                            </TouchableOpacity>

                        </View>

                        <View style={{ marginHorizontal: 20, marginVertical: 0, marginTop: 20 }}>
                            <Text style={{ fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYX_60 }}>Pincode</Text>
                            {/* <TextInput
                                style={styles.filterinput}
                                keyboardType="number-pad"
                                placeholder="421302"></TextInput> */}
                            {

                                <View style={{ marginTop: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 5 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text
                                            numberOfLines={1}
                                            style={{ fontSize: 14, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYX_60 }}>
                                            {picodevalue.length != 0 ? picodevalue.pincode : "Pincode"
                                            }
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={_togglePincodeModal}
                                        style={{ height: 15, width: 15, alignItems: "center", justifyContent: "center", marginLeft: 5 }}>
                                        <DropDown />
                                    </TouchableOpacity>
                                </View>
                            }

                            <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_80 }}></View>
                        </View>
                        <View style={{ marginHorizontal: 20, marginVertical: 10, marginTop: 10 }}>
                            <Text style={{ fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYX_60 }}>Member Name</Text>
                            {/* <TextInput
                                style={styles.filterinput}
                                keyboardType="number-pad"
                                placeholder="421302"></TextInput> */}


                            <TouchableOpacity
                                onPress={_toggleMemberModal}
                                style={{ marginTop: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <Text
                                        numberOfLines={1}
                                        style={{ fontSize: 14, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYX_60 }}>
                                        {memberName.length != 0 ? memberName.name : "Member Name"
                                        }
                                    </Text>
                                </View>
                                <View

                                    style={{ height: 15, width: 15, alignItems: "center", justifyContent: "center", marginLeft: 5 }}>
                                    <DropDown />
                                </View>
                            </TouchableOpacity>


                            <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_80 }}></View>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row", marginVertical: 20, marginBottom: 40 }}>
                            <View style={{ flex: 0.5, paddingLeft: 20, paddingRight: 10 }}>
                                <TouchableOpacity
                                    onPress={() =>
                                        ProductView()}
                                    style={[styles.filterMemberBtn, { backgroundColor: Colors.PRIMARY }]}>
                                    <Text style={styles.fontFilterBtn}>Apply</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.5, paddingRight: 20, paddingLeft: 10 }}>
                                <TouchableOpacity
                                    onPress={() => _toggleFilterMyAskList()}
                                    style={styles.filterMemberBtn}>
                                    <Text style={[styles.fontFilterBtn, { opacity: 0.8 }]}>Canel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                    </View>
                </KeyboardAvoidingView>
            </View>
            <ProductCatalogModal
                state={pincodet}
                // edit={0}
                picodevalue={picodevalue}
                toggle={_togglePincodeModal}
                memberHeader={"Pincode"}
                setPicodevalue={setPicodevalue}
            />


            <ProductCatalogModal
                state={memberNamet}
                toggle={_toggleMemberModal}
                // edit={1}
                memberHeader={"Member Name"}
                setMemberName={setMemberName}
            />

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

export default CatalogueFilterModal

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
    closeButton: {
        // paddingLeft: 20,
        // paddingTop: 20,
        // paddingBottom: 20,
        paddingRight: 20,
        justifyContent: 'center',
    },
    confirmTextContainer: {
        alignItems: "flex-start",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
    },
    confirmText: {
        fontFamily: Fonts.BOLD,
        fontSize: Fonts.SIZE_14,
        color: Fonts.BLACK,
        letterSpacing: 0.2,
    },
    confirmTextButtonContainer: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    yesButton: {
        paddingVertical: 12,
        paddingTop: 8,
        width: 80,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        marginLeft: 10
    },
    yesButtonText: {
        fontFamily: Fonts.BOLD,
        fontSize: Fonts.SIZE_16,
        color: Colors.WHITE,
    },
    tinput: {
        fontFamily: Fonts.BOLD,
        marginLeft: 10,
        minHeight: 20,
        fontSize: 12
    },
    feedbackInput: {
        marginTop: 10,
        borderWidth: 1.5,
        borderColor: Fonts.TIFFANY_BLUE,
        borderRadius: 10,
        minHeight: 70,
        marginHorizontal: 20
    },
    filterinput: { height: 40, fontSize: 15, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK },
    fontBussnessCategary: { fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_15, color: Colors.ONYXOpacity, },
    filterMemberBtn: { height: 36, backgroundColor: Colors.WHITE, borderRadius: 10, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.80, shadowRadius: 2.62, elevation: 2, },
    fontFilterBtn: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK }


});