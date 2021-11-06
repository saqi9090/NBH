
import React from 'react'
import { styles } from './AddAddreddMapStyles';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, StatusBar, TouchableOpacity, Alert, PermissionsAndroid, Platform, ToastAndroid, ActivityIndicator } from 'react-native'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors, Constants, ScreenNames, Server } from '../../global';
import MapView from 'react-native-maps';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
// import CancelSvg from '../../assets/svg/CrossIcon';
import { globalStyles } from '../../global/globalStyles';
import SearchAddressModal from "../../components/ModalSearchAddress/ModalSearchAddress";
import { parse } from 'react-native-svg';
import { getService } from '../../services/getService';
import CustomAlert from '../../components/CustomAlert/CusomAlert';
const AddAddressMapScreen = ({ route: { params: { edit, addressId, getAddress } }, route, params, navigation }) => {


    //States
    const [coordinates, setCoordinates] = React.useState(null);
    const [address, setAddress] = React.useState('');
    const [userAddress, setUserAddress] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [searchAddressModalVisibility, setSearchAddressModalVisibility] = React.useState(false);
    const [customAlertVisible2, setCustomAlertVisible2] = React.useState(false)
    // const [loading, setLoading] = React.useState(false)
    const [alertText2, setAlertText2] = React.useState('');

    //Ref
    const mapRef = React.useRef(null);
    const fixedLocation = React.useRef([0, 0]);

    //Functions

    const toggleCustomAlertVisibility2 = () => { setCustomAlertVisible2(!customAlertVisible2) }

    const leftButtonFunction2 = () => {
        toggleCustomAlertVisibility2()
    }

    const toggleSearchAddressModal = () => { setSearchAddressModalVisibility(!searchAddressModalVisibility) }
    const getCurrentPosition = () => {
        Geolocation.getCurrentPosition(
            ({ coords }) => {
                const longitude = coords.longitude;
                const latitude = coords.latitude;
                const altitude = coords.altitude;
                console.log("getCurrentPosition", latitude, longitude, altitude);


                fixedLocation.current = [longitude, latitude];

                setCoordinates([longitude, latitude, altitude]);
                checkAvailability(latitude, longitude)
            },
            (err) => {
                // if (isMounted.current == true) {
                //     setLoading(false);
                // }
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
            }
        );
    }

    const requestPermission = async () => {
        const isAndroid = Platform.OS == 'android';

        if (isAndroid) {
            const result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            // console.log("result", result);
            if (result) {
                getCurrentPosition();
            }
            else {
                const isGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                if (isGranted == PermissionsAndroid.RESULTS.GRANTED) {
                    ToastAndroid.show('User Granted Permission', ToastAndroid.SHORT);
                    getCurrentPosition();
                }
                else if (isGranted == 'never_ask_again') {
                    ToastAndroid.show('Permission Is Always Denied', ToastAndroid.SHORT);
                    setCoordinates([
                        72.8859066,
                        19.0478317,
                    ])
                    checkAvailability(19.0478317, 72.8859066)
                }
                else {
                    ToastAndroid.show('User Denied Permission', ToastAndroid.SHORT);
                    setCoordinates([
                        72.8859066,
                        19.0478317,
                    ])
                    checkAvailability(19.0478317, 72.8859066)
                    return null;
                }
            }
        } else {
            await request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
                console.log("LOCATION_ALWAYS", result);
                if (result == "granted") {
                    getCurrentPosition();
                }
            });
        }

    }

    const checkAvailability = async (latitude, longitude) => {
        try {
            setIsLoading(true)

            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDMR1P0UFK1K_jzmNaw6TKlpPCzycDk9lg`);
            //pincode
            const result = response.data.results[0].address_components;
            var postalCode = "";
            var middleAdd = "";
            var landmark = "";
            var city = "";
            for (var i = 0; i < result.length; ++i) {
                if (result[i].types[0] == "street_address") { landmark = result[i].long_name }
                if (result[i].types[0] == "route") { landmark = landmark != "" ? ", " : landmark + result[i].long_name }
                if (result[i].types[0] == "neighborhood") { landmark = landmark + ", " + result[i].long_name }
                if (result[i].types[0] == "locality") { city = result[i].long_name }
                if (result[i].types[0] == "postal_code") { postalCode = result[i].long_name }
            }

            setUserAddress({
                city: middleAdd,
                postalCode: postalCode,
                city: city,
                landmark: landmark
            })
            setAddress(response.data.results[1].formatted_address)
            setIsLoading(false)



            // })
        } catch (error) {
            if (error.response.data.message) {
                Alert.alert('Error', error.response.data.message);
            } else {
                Alert.alert('Error', 'Internal Server Error');
            }
        }
    }

    const GoToAddAddress = () => {
        if (coordinates) {
            navigation.navigate(ScreenNames.ADD_ADDRESS_SCREEN, {
                edit: edit, userAddress: userAddress,
                coordinates: coordinates,
                getAddress: getAddress

            })

        } else {
            alert("please select Location")
        }
    }

    const getAddressById = async () => {
        const response = await axios.get(`${Server.BASE_URL}/users/${addressId}/address`);
        setCoordinates([parseFloat(response.data.longitude), parseFloat(response.data.latitude)])
        checkAvailability(parseFloat(response.data.latitude), parseFloat(response.data.longitude))
    }


    React.useEffect(() => {
        requestPermission()
        // if (edit == 1) { 
        //     getAddressById()
        // }
    }, [])



    return (
        <View style={styles.mainPage}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={false} color={Colors.PRIMARY} isTransparent={true} />
            <View style={styles.googleMapPosition}>
                {
                    coordinates
                    &&
                    <MapView
                        ref={mapRef}
                        onPress={(e) => {
                            setCoordinates([e.nativeEvent.coordinate.longitude, e.nativeEvent.coordinate.latitude])
                            checkAvailability(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
                        }
                        }
                        // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={{ flex: 1 }}
                        region={{
                            latitude: coordinates[1],
                            longitude: coordinates[0],
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: coordinates[1],
                                longitude: coordinates[0],
                            }}
                            title='My locations'
                            description='Here I am.'
                        >
                        </MapView.Marker>
                        {/* <Polygon
                            coordinates={BucaramangaDelimiters}
                            strokeWidth={2}
                            strokeColor={'#f00'}
                            fillColor={'#00000030'}
                            miterLimit={100}
                            tappable={true}
                            geodesic={true}
                            onPress={(e) => {
                                console.log(
                                    "test",
                                    );
                                }}
                                // onTouchStart={(e) => {
                                    //     console.log(e);
                                    // }}
                                /> */}
                    </MapView>
                }

                <View style={styles.modalContainer}>
                    <View style={styles.confirmContainer}>
                        <View style={styles.confirmHeader}>
                            <Text style={styles.confirmDeliveryText}
                                maxFontSizeMultiplier={1}>Selected Address</Text>
                        </View>
                        <View style={styles.confirmTextContainer}>
                            <Text style={{ ...styles.confirmText, width: Constants.SCREEN_WIDTH - 100 }}
                                maxFontSizeMultiplier={1}>{address}</Text>
                            <TouchableOpacity activeOpacity={0.5} onPress={toggleSearchAddressModal}>
                                <Text style={{ ...styles.confirmText, color: Colors.PRIMARY }}
                                    maxFontSizeMultiplier={1}>Change</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            disabled={isLoading}
                            style={{ ...globalStyles.button, marginHorizontal: Constants.SCREEN_WIDTH / 4, borderRadius: 22, marginTop: 20, marginBottom: 0 }}
                            onPress={GoToAddAddress}>
                            {
                                isLoading
                                    ?
                                    <ActivityIndicator size="small" color={Colors.WHITE} />
                                    :
                                    <Text style={{ ...globalStyles.buttonText }}>
                                        Continue
                                    </Text>
                            }
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
            <SearchAddressModal
                searchAddressModalVisibility={searchAddressModalVisibility}
                setCoordinates={setCoordinates}
                checkAvailability={checkAvailability}
                setUserAddress={setUserAddress}
                setAddress={setAddress}
                toggleSearchAddressModal={toggleSearchAddressModal}
                requestPermission={requestPermission}
            />

            <CustomAlert
                title={"Alert"}
                desc={alertText2}
                leftButtonText={"Ok"}
                leftButtonFunction={leftButtonFunction2}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility2}
                customAlertVisible={customAlertVisible2}
            />
        </View>
    );
}

export default AddAddressMapScreen;