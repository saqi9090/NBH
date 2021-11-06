import React, { useState } from 'react';
import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors, Fonts, ScreenNames } from '../../global';

import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import BackSvg from '../../assets/svg/back icon.svg';
import AddSvg from '../../assets/svg/Add 1';
import RemoveAddressSvg from '../../assets/svg/Delete 1';
import EditAddressSvg from '../../assets/svg/Edit 1.svg';

import { connect } from 'react-redux';
import * as service from './AddressListService'
import { styles } from './AddressListStyles';
import Header from "../../components/Header/Header";
import CustomAlert from '../../components/CustomAlert/CusomAlert';
import * as UserActions from '../../redux/actions/userActions';




const AddressListScreen = ({ isSignedIn, navigation, userId, selectAddress, dispatch }) => {

    //Variables


    //States

    const [deleteAddressId, setDeleteAddressId] = React.useState(0)

    const [userAddresses, setUserAddresses] = React.useState([])
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false)

    const [alertText, setAlertText] = React.useState('');


    //Refs

    //Functions

    const GoBack = () => {
        navigation.pop()
    }

    const GoToAddAddress = () => {
        navigation.navigate(ScreenNames.ADD_ADDRESS_MAP_SCREEN, { getAddress: getAddress, edit: 0, userAddresses })
    }

    const getAddress = async () => {
        try {
            const response = await service.getAddress(userId);
            setUserAddresses(response.data)
        } catch (error) {
            console.warn(error.message);
        }

    }

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }

    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }

    const rightButtonFunction = async () => {
        dispatch(UserActions.setSelectAddress(
            {
                "addressId": null,
                "userId": null,
                "addressType": "",
                "building": null,
                "floor": null,
                "flatNo": null,
                "landmark": null,
                "latitude": null,
                "longitude": null,
                "city": "",
                "pincode": 0
            }
        ))
        const response = await service.deleteAddress(deleteAddressId)
        getAddress()
        toggleCustomAlertVisibility()

    }

    const deleteAddress = async (addressId) => {
        setDeleteAddressId(addressId)
        if (selectAddress.addressId) {
            if (selectAddress.addressId == addressId) {

                setAlertText("This Address is Selected in your Card. Do you want to delete this address")
                toggleCustomAlertVisibility()
            }
            else {
                const response = await service.deleteAddress(addressId)
                getAddress()
            }
        }
        else {
            const response = await service.deleteAddress(addressId)
            getAddress()
        }

    }
    const editAddress = async (userAddress) => {

        // console.warn("1", userAddress);
        navigation.navigate(ScreenNames.ADD_ADDRESS_SCREEN, { getAddress, edit: 0, addressId: userAddress.addressId, userAddress })
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ ...styles.mainCard, marginBottom: index == userAddresses.length - 1 ? 20 : 0, marginTop: 20 }}>
                <TouchableOpacity style={{ marginHorizontal: 20, paddingBottom: 5, marginBottom: 10, }}
                    onPress={null}
                    activeOpacity={0.5}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                        <Text
                            maxFontSizeMultiplier={1}
                            style={{ fontFamily: Fonts.BOLD, color: Colors.GRAY_DARK, fontSize: 14 }}>
                            {/* {item.addressType} */}
                        </Text>
                    </View>
                    {console.warn(item)}
                    <Text
                        maxFontSizeMultiplier={1}
                        style={{ fontFamily: Fonts.BOLD, color: Colors.BLACK, fontSize: 14 }}>
                        {item.building},{item.flatNo}, {item.floor},{item.landmark}, {item.city},  {item.pincode}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ position: "absolute", right: 41, top: 10, }}
                    onPress={() => editAddress(item)}>
                    <EditAddressSvg />
                </TouchableOpacity>
                <TouchableOpacity style={{ position: "absolute", right: 10, top: 10 }}
                    onPress={() => deleteAddress(item.addressId)}>
                    <RemoveAddressSvg />
                </TouchableOpacity>
            </View>
        )
    }
    //UseEffect

    React.useEffect(() => {
        getAddress()
    }, [])
    //UI
    return (
        <View style={styles.container}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} color={Colors.PRIMARY} isTransparent={false} />
            <Header name={"Address List"} backgroundColor={true} />


            <TouchableOpacity style={{ margin: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
                onPress={GoToAddAddress}>
                <Text
                    maxFontSizeMultiplier={1}
                    style={styles.addAddresstext}>
                    Add Address
                </Text>
                <View style={{ marginTop: 4 }}>
                    <AddSvg />
                </View>
            </TouchableOpacity>

            <FlatList
                data={userAddresses}
                renderItem={renderItem}
            />

            <CustomAlert
                title={"ALert"}
                desc={alertText}
                leftButtonText={"Cancel"}
                rightButtonText={"Ok"}
                leftButtonFunction={leftButtonFunction}
                rightButtonFunction={rightButtonFunction}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility}
                customAlertVisible={customAlertVisible}
            />
        </View>
    )
};
const mapStateToProps = state => ({
    name: state.user.name,
    uid: state.user.uid,
    isSignedIn: state.user.isSignedIn,
    userId: state.user.userId,
    selectAddress: state.user.selectAddress


});

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(mapStateToProps, mapDispatchToProps)(AddressListScreen);
