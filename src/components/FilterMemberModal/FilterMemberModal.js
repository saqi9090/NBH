import { View, Text, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, TextInput, Alert } from 'react-native'
import { styles } from "./FilterMemberModalStyles";
import React from 'react'
import { Colors, Fonts, ScreenNames, Server } from '../../global';
import DropdownSvg from "../../assets/svg/dropdown.svg"
import FocusAwareStatusBar from '../FocusAwareStatusBar';
import CustomAlert from '../CustomAlert/CusomAlert';
import { useNavigation } from '@react-navigation/core';
import FilterSelectedModal from '../FilterSelectedModal/FilterSelectedModal';
import axios from 'axios';
const FilterMemberModal = ({ setFilterMember,
    bussinessName,
    bussnessText,
    subCategory,
    // memberBussinessName,
    // memberBussness,
    // memberCity,
    setBussinessName,
    setBussnessText,
    setSubCategory,
    _toggleMemberBussnessName,
    _toggleMemberBussness,
    _toggleMemberCity,
    AllBussinessDetail,
    memberName,
    setMemberName,
    memberPhoneNumber,
    setMemberPhoneNumber,
    searchByTag,
    _toggleFilterMemberModal, filterMember, filterData, setFilterData
}) => {

    // state
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false)


    //function 

    const navigation = useNavigation()

    const GoSearchByTag = () => {
        _toggleFilterMemberModal()
        navigation.navigate(ScreenNames.SEARCHBYTAG_SCREEN)
    }

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }

    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }

    // const _toggleMemberBussness = () => {
    //     setMemberBussness(!memberBussness)
    // }

    // const _toggleMemberCity = () => {
    //     setMemberCity(!memberCity)
    // }
    // const _toggleMemberBussnessName = () => {
    //     setMemberBussinessName(!memberBussinessName)
    // }

    // const searchByTag = () => {

    //     setFilterData(
    //         {
    //             name: memberName,
    //             phone: memberPhoneNumber,
    //             businessName: bussinessName == "None" ? "" : bussinessName,
    //             category: bussnessText == "None" ? "" : bussnessText,
    //             subCategory: subCategory == "None" ? "" : subCategory
    //         }
    //     )
    //     _toggleFilterMemberModal()
    // }

    // const [allBussinessDetail, setAllBussinessDetail] = React.useState(null);



    // const AllBussinessDetail = async () => {
    //     try {
    //         const response = await axios.get(`${Server.BASE_URL}/users/getAllBusinessDetails`)
    //         setAllBussinessDetail(response.data)

    //     } catch (error) {
    //         console.warn("e", error.message);
    //     }
    // }

    const onShow = () => {
        AllBussinessDetail()

    }
    return (
        <Modal
            animationType={'fade'}
            visible={filterMember}
            onShow={onShow}
            transparent={true}>
            <View style={styles.modalContainer}>
                <KeyboardAvoidingView behavior={Platform.OS == "android" ? null : "padding"}>
                    <View style={styles.confirmContainer}>
                        <View style={styles.confirmHeader}>
                            <Text style={styles.confirmDeliveryText}
                                maxFontSizeMultiplier={1}>FILTER</Text>

                        </View>

                        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                            {/* <Text style={{ fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYXOpacity }}>Name</Text> */}
                            <TextInput
                                placeholderTextColor={Colors.BLACK}
                                onChangeText={text => setMemberName(text)}
                                style={styles.filterinput}
                                placeholder="Name">{memberName}</TextInput>
                            <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View>
                        </View>
                        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                            {/* <Text style={{ fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYXOpacity }}>Enter Phone Number</Text> */}
                            <TextInput
                                placeholderTextColor={Colors.BLACK}
                                onChangeText={text => setMemberPhoneNumber(text)}
                                keyboardType="number-pad"
                                maxLength={10}
                                style={styles.filterinput}
                                placeholder="Enter Phone Number">{memberPhoneNumber}</TextInput>
                            <View style={{ height: 1.2, width: "100%", backgroundColor: Colors.ONYX_60 }}></View>
                        </View>
                        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                            <TouchableOpacity
                                onPress={_toggleMemberBussnessName}

                                style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 10, paddingBottom: 10, alignItems: "center" }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.fontBussnessCategary}>{bussinessName ? bussinessName : "Business Name"}</Text>
                                </View>
                                <View

                                    style={{ height: 20, width: 20, alignItems: "center", justifyContent: "center" }}
                                ><DropdownSvg />
                                </View>
                            </TouchableOpacity>
                            <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View>
                        </View>
                        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                            <TouchableOpacity
                                onPress={_toggleMemberBussness}

                                style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 10, paddingBottom: 10, alignItems: "center" }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.fontBussnessCategary}>{bussnessText ? bussnessText : "Business Categary"}</Text>
                                </View>
                                <View
                                    style={{ height: 20, width: 20, alignItems: "center", justifyContent: "center" }}
                                ><DropdownSvg />
                                </View>
                            </TouchableOpacity>
                            <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View>
                        </View>
                        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                            <TouchableOpacity
                                onPress={_toggleMemberCity}

                                style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 10, paddingBottom: 10, alignItems: "center" }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.fontBussnessCategary}>{subCategory ? subCategory : "Bussiness Sub Category"}</Text>
                                </View>
                                <View
                                    // onPress={_toggleMemberCity}
                                    // hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
                                    style={{ height: 20, width: 20, alignItems: "center", justifyContent: "center" }}
                                ><DropdownSvg /></View>
                            </TouchableOpacity>
                            <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row", marginVertical: 20, marginBottom: 40 }}>
                            <View style={{ flex: 0.5, paddingLeft: 20, paddingRight: 10 }}>
                                <TouchableOpacity
                                    onPress={() => searchByTag()}
                                    style={[styles.filterMemberBtn, { backgroundColor: Colors.PRIMARY }]}>
                                    <Text style={styles.fontFilterBtn}>Apply</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.5, paddingRight: 20, paddingLeft: 10 }}>
                                <TouchableOpacity
                                    onPress={() => _toggleFilterMemberModal()}
                                    style={styles.filterMemberBtn}>
                                    <Text style={[styles.fontFilterBtn, { opacity: 0.8 }]}>Cancel</Text>
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

export default FilterMemberModal
