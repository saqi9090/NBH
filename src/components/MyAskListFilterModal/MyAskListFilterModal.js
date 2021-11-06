import { View, Text, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import React from 'react'
import { Colors, Fonts, ScreenNames } from '../../global';
import DropdownSvg from "../../assets/svg/dropdown.svg";
import Cross from "../../assets/svg/cross.svg";

import FocusAwareStatusBar from '../FocusAwareStatusBar';
import CustomAlert from '../CustomAlert/CusomAlert';

const MyAskListFilterModal = ({ _toggleFilterMemberModal, filterMyAskList, setFilterData }) => {
    const [companyName, setCompanyName] = React.useState("");
    const [companyState, setCompanyState] = React.useState("");
    const [companyCity, setCompanyCity] = React.useState("");
    const [companyArea, setCompanyArea] = React.useState("");
    const [companyContactPerson, setCompanyContactPerson] = React.useState("");
    const [companyDesignation, setCompanyDesignation] = React.useState("");
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false)

    //function

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }

    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }

    const MyAskList = () => {
        const AddclientData = {
            "companyName": companyName,
            "companyState": companyState,
            "companyCity": companyCity,
            "companyArea": companyArea,
            "companyContactPerson": companyContactPerson,
            "companyContactPersonDesignation": companyDesignation

        }
        setFilterData(AddclientData)
        _toggleFilterMemberModal()
    }
    return (
        <Modal
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
                                maxFontSizeMultiplier={1}>FILTER</Text>
                            <TouchableOpacity
                                hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
                                onPress={() => _toggleFilterMemberModal()}
                                style={styles.closeButton}>
                                {/* <CancelSvg /> */}
                                <Cross />
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginHorizontal: 20, marginVertical: 10, marginTop: 30 }}>
                            <TextInput
                                onChangeText={text => setCompanyName(text)}
                                style={styles.filterinput}
                                placeholderTextColor={Colors.BLACK}

                                placeholder="Company Name">{companyName}</TextInput>
                            <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View>
                        </View>
                        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                            <TextInput
                                onChangeText={text => setCompanyState(text)}
                                style={styles.filterinput}
                                placeholderTextColor={Colors.BLACK}

                                placeholder="Company State">{companyState}</TextInput>
                            <View style={{ height: 1.2, width: "100%", backgroundColor: Colors.ONYX_60 }}></View>
                        </View>
                        <View style={{ marginHorizontal: 20, marginVertical: 0 }}>
                            <TextInput
                                placeholderTextColor={Colors.BLACK}

                                onChangeText={text => setCompanyCity(text)}
                                style={styles.filterinput}
                                placeholder="Company City">{companyCity}</TextInput>
                            <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View>
                        </View>
                        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                            <TextInput
                                placeholderTextColor={Colors.BLACK}

                                onChangeText={text => setCompanyArea(text)}
                                style={styles.filterinput}
                                placeholder="Company Area">{companyArea}</TextInput>
                            <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View>
                        </View>

                        <View style={{ marginHorizontal: 20, marginVertical: 0 }}>
                            <TextInput
                                placeholderTextColor={Colors.BLACK}

                                onChangeText={text => setCompanyContactPerson(text)}
                                style={styles.filterinput}
                                placeholder="Company Contact Person">{companyContactPerson}</TextInput>
                            <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View>
                        </View>

                        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                            <TextInput
                                placeholderTextColor={Colors.BLACK}

                                style={styles.filterinput}
                                onChangeText={text => setCompanyDesignation(text)}
                                placeholder="Company Contact Person Designation">{companyDesignation}</TextInput>
                            <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View>
                        </View>
                        {/* <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 10, paddingBottom: 10, alignItems: "center" }}>
                                <Text style={styles.fontBussnessCategary}>Select Business Category</Text>
                                <TouchableOpacity style={{ height: 20, width: 20, alignItems: "center", justifyContent: "center" }}><DropdownSvg /></TouchableOpacity>
                            </View>
                            <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View>
                        </View>
                        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 10, paddingBottom: 10, alignItems: "center" }}>
                                <Text style={styles.fontBussnessCategary}>Select City</Text>
                                <TouchableOpacity style={{ height: 20, width: 20, alignItems: "center", justifyContent: "center" }}><DropdownSvg /></TouchableOpacity>
                            </View>
                            <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View>
                        </View> */}

                        <View style={{ flex: 1, flexDirection: "row", marginVertical: 20, marginBottom: 40 }}>
                            <View style={{ flex: 0.5, paddingLeft: 20, paddingRight: 10 }}>
                                <TouchableOpacity
                                    onPress={() => MyAskList()}
                                    style={[styles.filterMemberBtn, { backgroundColor: Colors.PRIMARY }]}>
                                    <Text style={styles.fontFilterBtn}>Apply</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.5, paddingRight: 20, paddingLeft: 10 }}>
                                <TouchableOpacity
                                    onPress={() => _toggleFilterMemberModal()}
                                    style={styles.filterMemberBtn}>
                                    <Text style={[styles.fontFilterBtn, { opacity: 0.8 }]}>Canel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>







                    </View>
                </KeyboardAvoidingView>
            </View>


            <CustomAlert
                title={"Invalid Details"}
                desc={alertText}
                leftButtonText={"Ok"}
                leftButtonFunction={leftButtonFunction}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility}
                customAlertVisible={customAlertVisible}
            />
        </Modal>
    )
}

export default MyAskListFilterModal

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#00000050',
        justifyContent: 'flex-end',
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
        alignItems: "center"
    },
    confirmDeliveryText: {
        paddingLeft: 20,
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
    fontBussnessCategary: { fontFamily: Fonts.SEMIBOLD, fontSize: Fonts.SIZE_15, color: Colors.ONYXOpacity, },
    filterMemberBtn: { height: 36, backgroundColor: Colors.WHITE, borderRadius: 10, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.80, shadowRadius: 2.62, elevation: 2, },
    fontFilterBtn: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK }

})
