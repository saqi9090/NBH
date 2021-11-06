import React from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, Keyboard, Alert } from 'react-native'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors, Constants, Fonts, Server } from '../../global';
import { globalStyles } from '../../global/globalStyles';
import * as service from './AdddAddressService'
import { connect } from 'react-redux';
import * as UserAction from '../../redux/actions/userActions'
import Header from '../../components/Header/Header';
import axios from 'axios';
import CustomAlert from '../../components/CustomAlert/CusomAlert';
import { PutService } from '../../services/PutService';

// import * as CartRedux from '../../redux/actions/cartActions'

const AddAddressScreen = ({ navigation, userId, route, params, dispatch }) => {

    //Variable 

    //state

    const [selectAddressType, setSelectAddressType] = React.useState(false)
    const [selectPostalCode, setSelectPostalCode] = React.useState(false)
    const [customAddressType, setCustomAddressType] = React.useState('HOME')
    const [postalCode, setPostalCode] = React.useState('')
    const [floor, setFloor] = React.useState(null)
    const [building, setBuilding] = React.useState('')
    const [flat, setFlat] = React.useState(null)

    // const [addressLine, setAddressLine] = React.useState(null)
    const [landmark, setLandmark] = React.useState(null)
    const [city, setCity] = React.useState(null)
    // const [state, setState] = React.useState(null)
    const [addressType, setAddressType] = React.useState('Address Type')
    const [postalCodes, setPostalCodes] = React.useState(null)
    const [checkAddressType, setCheckAddressType] = React.useState(false)

    const [checkBuildingName, setCheckBuildingName] = React.useState(false)
    const [checkFlatNumber, setCheckFlatNumber] = React.useState(false)


    const [checkPincode, setCheckPincode] = React.useState(false)
    const [checkFloor, setCheckFloor] = React.useState(false)
    // const [checkFlat, setCheckFlat] = React.useState(false)
    // const [checkBuiliding, setCheckBuiliding] = React.useState(false)
    const [checkAddressLine, setCheckAddressLine] = React.useState(false)
    const [checkLandmark, setCheckLandmark] = React.useState(false)
    const [checkCity, setCheckCity] = React.useState(false)
    const [checkState, setCheckState] = React.useState(false)
    const [searchList, setSearchList] = React.useState(false)
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false)
    const [alertText, setAlertText] = React.useState('');






    //useref

    const AddressTypeRef = React.useRef();
    const PincodeRef = React.useRef();
    const FloorRef = React.useRef();
    const AddressLineRef = React.useRef();
    const LandmarkRef = React.useRef();
    const CityRef = React.useRef();
    const BuildingRef = React.useRef();
    const FlatRef = React.useRef();
    // const StateRef = React.useRef();

    //function
    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }
    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }


    const toggleAddressType = () => {
        setSelectAddressType(!selectAddressType)
        setSearchList(false)
        Keyboard.dismiss()
    }
    const togglePostalCode = () => {
        setSelectPostalCode(!selectPostalCode)
        Keyboard.dismiss()
    }

    const GoBack = () => {
        navigation.goBack()
    }

    const _toggleAddress = () => {
        route.params._toggleCartModal()
        navigation.pop(2)
    }

    const saveAddress = async () => {
        try {
            checkIsEmptyBuildingName()
            checkIsEmptyFlatNumber()
            checkIsEmptyFloor()
            checkIsEmptyLandmark()
            checkIsEmptyCity()
            if (building && flat && floor && city && landmark && postalCode) {

                if (route.params.edit == 0) {

                    if (typeof route.params.addressId != "undefined") {
                        let postData = {
                            "userId": userId,
                            "addressType": "HOME",
                            "building": building.toString(),
                            "floor": floor.toString(),
                            "flatNo": parseInt(flat),
                            "landmark": landmark.toString(),
                            "latitude": route.params.userAddress.latitude,
                            "longitude": route.params.userAddress.longitude,
                            "city": city.toString(),
                            "pincode": postalCode
                        }
                        // const response = await axios.put(`${Server.BASE_URL}/users/addressId/${route.params.addressId}/editAddress`, postData)
                        const uri = `/users/addressId/${route.params.addressId}/editAddress`
                        const body = postData
                        PutService(uri, body).then((response) => {
                            if (response.code == 200) {

                            } else {

                                setAlertText(response.message)
                                toggleCustomAlertVisibility()

                            }

                        })
                    }
                    else {
                        // console.warn("1", postalCode[0], postalCode[1]);

                        let postData = {
                            "userId": userId,
                            "addressType": "HOME",
                            "building": building.toString(),
                            "floor": floor.toString(),
                            "flatNo": parseInt(flat),
                            "landmark": landmark.toString(),
                            "latitude": route.params.coordinates[1],
                            "longitude": route.params.coordinates[0],
                            "city": city.toString(),
                            "pincode": parseInt(postalCode)
                        }
                        dispatch(UserAction.setUserAddress(postData))
                        const response = await service.saveAddress(postData)
                    }
                    route.params.getAddress()
                    navigation.pop(2)
                } else {
                    let postData = {
                        "officeBuilding": building,
                        "officeFloor": floor,
                        "officeFlatNo": flat,
                        "officeLandmark": landmark,
                        "officeCity": city,
                        "officeLatitude": route.params.coordinates[1],
                        "officeLongitude": route.params.coordinates[0],
                        "officePincode": parseInt(postalCode),
                    }
                    dispatch(UserAction.setOfficeAddress(postData))
                    navigation.pop(2)
                }

            } else {

                // Alert.alert()
                setAlertText("Please Fill all Details")
                toggleCustomAlertVisibility()


            }


        } catch (error) {
            console.warn("error", error.message);
        }
    }

    const checkIsEmptyBuildingName = () => {
        if (!checkBuildingName) {
            setCheckBuildingName(true)
        } else {
            setCheckBuildingName(false)
        }
    }


    const checkIsEmptyFlatNumber = () => {
        if (!checkFlatNumber) {
            setCheckFlatNumber(true)
        } else {
            setCheckFlatNumber(false)
        }
    }


    const checkIsEmptyAddressType = () => {
        if (!customAddressType) {
            setCheckAddressType(true)
        } else {
            setCheckAddressType(false)
        }
    }
    const checkIsEmptyPincode = () => {
        if (!postalCode) {
            setCheckPincode(true)
        } else {
            setCheckPincode(false)
        }
    }
    const checkIsEmptyFloor = () => {
        if (!floor) {
            setCheckFloor(true)
        } else {
            setCheckFloor(false)
        }
    }
    const checkIsEmptyLandmark = () => {
        if (!landmark) {
            setCheckLandmark(true)
        } else {
            setCheckLandmark(false)
        }
    }
    const checkIsEmptyCity = () => {
        if (!city) {
            setCheckCity(true)
        } else {
            setCheckCity(false)
        }
    }

    //useeffect

    React.useEffect(() => {

        if (typeof route.params.addressId != "undefined") {
            console.warn("edit", route.params.userAddress);
            setFloor(route.params.userAddress.floor)
            setFlat(route.params.userAddress.flatNo)

            // console.warn("-=-=>", route.params.userAddress.pincode);
            setPostalCode(route.params.userAddress.pincode)
            setCity(route.params.userAddress.city)
            setLandmark(route.params.userAddress.landmark)
            setBuilding(route.params.userAddress.building)
        }

        else {
            let address = route.params.userAddress;


            // console.warn("address", address.postalCode);

            // setFloor(`${address[0]},${address[1]}`)
            setPostalCode(address?.postalCode)
            setCity(address?.city)
            setLandmark(address?.landmark)
        }
    }, [])

    console.warn("check", route.params.userAddress);

    //UI
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} isTransparent={false} />
            <Header name={"Search by tag"} backgroundColor={true} />
            <ScrollView>

                <View style={{ marginHorizontal: 20, flex: 1 }}>

                    <TextInput
                        placeholder="Building Name"
                        ref={BuildingRef}
                        autoCorrect={false}
                        autoCompleteType='off'
                        autoCapitalize={false}
                        maxFontSizeMultiplier={1}
                        onBlur={checkIsEmptyBuildingName}
                        // keyboardType="number-pad"
                        // onBlur={() => setSearchList(false)}
                        style={{ height: 45, width: "100%", borderRadius: 7, borderWidth: 1, borderColor: checkPincode ? "#FF000080" : "#444444", paddingVertical: 5, paddingHorizontal: 20, fontFamily: Fonts.BOLD, fontSize: 14, color: "#161616", marginTop: 13, }}
                        placeholderTextColor={Fonts.BLACK}
                        onChangeText={text => setBuilding(text)}
                        onFocus={() => setSearchList(true)}
                    >
                        {building}
                    </TextInput>


                    <TextInput
                        placeholder="Flat No"
                        maxFontSizeMultiplier={1}
                        keyboardType="number-pad"
                        ref={FlatRef}
                        autoCorrect={false}
                        autoCompleteType='off'
                        autoCapitalize={false}
                        onBlur={checkIsEmptyFlatNumber}
                        onFocus={() => setSearchList(false)}
                        // onBlur={() => Keyboard.dismiss()}
                        style={{ height: 45, width: "100%", borderRadius: 7, borderWidth: 1, borderColor: checkAddressLine ? "#FF000080" : "#444444", paddingVertical: 5, paddingHorizontal: 20, fontFamily: Fonts.BOLD, fontSize: 14, color: "#161616", marginTop: 13 }}
                        placeholderTextColor={Fonts.BLACK}
                        onChangeText={text => setFlat(text)}
                    >
                        {flat}
                    </TextInput>
                    <TextInput
                        placeholder="Floor"
                        ref={FloorRef}
                        autoCorrect={false}
                        autoCompleteType='off'
                        autoCapitalize={false}
                        maxFontSizeMultiplier={1}
                        onBlur={checkIsEmptyFloor}
                        onFocus={() => setSearchList(false)}
                        // onBlur={() => Keyboard.dismiss()}
                        style={{ height: 45, width: "100%", borderRadius: 7, borderWidth: 1, borderColor: checkFloor ? "#FF000080" : "#444444", paddingVertical: 5, paddingHorizontal: 20, fontFamily: Fonts.BOLD, fontSize: 14, color: "#161616", marginTop: 13, }}
                        placeholderTextColor={Fonts.BLACK}
                        onChangeText={text => setFloor(text)}
                    >
                        {floor}
                    </TextInput>

                    <TextInput
                        placeholder="Landmark"
                        ref={LandmarkRef}
                        maxFontSizeMultiplier={1}
                        onBlur={checkIsEmptyLandmark}
                        autoCorrect={false}
                        autoCompleteType='off'
                        autoCapitalize={false}
                        // onBlur={() => Keyboard.dismiss()}
                        onFocus={() => setSearchList(false)}
                        style={{ height: 45, width: "100%", borderRadius: 7, borderWidth: 1, borderColor: checkLandmark ? "#FF000080" : "#444444", paddingVertical: 5, paddingHorizontal: 20, fontFamily: Fonts.BOLD, fontSize: 14, color: "#161616", marginTop: 13 }}
                        placeholderTextColor={Fonts.BLACK}
                        onChangeText={text => setLandmark(text)}
                    >
                        {landmark}
                    </TextInput>
                    <TextInput
                        editable={false}

                        placeholder="City"
                        maxFontSizeMultiplier={1}
                        ref={CityRef}
                        autoCorrect={false}
                        autoCompleteType='off'
                        autoCapitalize={false}
                        onBlur={checkIsEmptyCity}
                        // onBlur={() => Keyboard.dismiss()}
                        onFocus={() => setSearchList(false)}
                        style={{ height: 45, width: "100%", borderRadius: 7, borderWidth: 1, borderColor: checkCity ? "#FF000080" : "#444444", paddingVertical: 5, paddingHorizontal: 20, fontFamily: Fonts.BOLD, fontSize: 14, color: "#161616", marginTop: 13 }}
                        placeholderTextColor={Fonts.BLACK}
                        onChangeText={text => setCity(text)}
                    >
                        {city}
                    </TextInput>

                    <TextInput
                        editable={false}
                        placeholder="Pincode"
                        ref={PincodeRef}
                        autoCorrect={false}
                        autoCompleteType='off'
                        autoCapitalize={false}
                        maxFontSizeMultiplier={1}
                        onBlur={checkIsEmptyPincode}
                        keyboardType="number-pad"
                        // onBlur={() => setSearchList(false)}
                        style={{ height: 45, width: "100%", borderRadius: 7, borderWidth: 1, borderColor: checkPincode ? "#FF000080" : "#444444", paddingVertical: 5, paddingHorizontal: 20, fontFamily: Fonts.BOLD, fontSize: 14, color: "#161616", marginTop: 13, }}
                        placeholderTextColor={Fonts.BLACK}
                        onChangeText={text => setPostalCode(text)}
                        onFocus={() => setSearchList(true)}
                    >
                        {postalCode}
                    </TextInput>
                </View>
            </ScrollView>

            <TouchableOpacity style={[globalStyles.button, {
                marginHorizontal: Constants.SCREEN_WIDTH / 4, marginVertical: 20, height: 50, borderRadius: 40
            }]}
                onPress={saveAddress}>
                <Text
                    maxFontSizeMultiplier={1}
                    style={globalStyles.buttonText}>Save Address</Text>
            </TouchableOpacity>

            <CustomAlert
                title={"Alert"}
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
    userId: state.user.userId,
    phNo: state.user.phNo,
    name: state.user.name,
    emailRedux: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(mapStateToProps, mapDispatchToProps)(AddAddressScreen);
