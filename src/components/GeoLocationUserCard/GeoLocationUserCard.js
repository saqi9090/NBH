import React from 'react'
import { Image, Linking, PermissionsAndroid, Platform, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import LocationSvg from '../../assets/svg/DeliveryUserLocation';
import CallSvg from '../../assets/svg/call'
import AssignSvg from '../../assets/svg/whatsapp'
import { Colors, Fonts, ScreenNames, Server } from '../../global';
import { SCREEN_WIDTH } from '../../global/constants';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { getService } from '../../services/getService';

const GeoLocationUserCard = ({ marker, index, userName }) => {

    // console.warn("===>", userName);

    const navigation = useNavigation()
    const [distance, setDistance] = React.useState(0)
    const goToWhatsapp = () => {
        const url = `whatsapp://send?text=Hiii My Self ${userName}&phone=91${marker.whatsAppNumber}`
        Linking.openURL(url)
    }
    const getDistance = async () => {
        Geolocation.getCurrentPosition(
            async ({ coords }) => {

                // const response = await axios.get(`${Server.BASE_URL}/users/${coords.latitude}/${coords.longitude}/${marker.coordinate.latitude}/${marker.coordinate.longitude}`)
                // setDistance(response.data)

                const req = `/users/${coords.latitude}/${coords.longitude}/${marker.coordinate.latitude}/${marker.coordinate.longitude}`
                getService(req).then((response) => {
                    setDistance(response.data)
                })

            },
            (err) => {
                // if (err.code==3) {
                // }
                console.warn("getCurrentPosition Error", err);
            },
            { enableHighAccuracy: true, } //ten meters not in the document
        );
    }
    React.useEffect(() => {
        getDistance()
    }, [])
    const goMemberDetail = async (userId) => {
        console.warn(marker.id);
        navigation.navigate(ScreenNames.NBHMEMBERDETAIL_SCREEN, {
            userId: marker.id,
        })
    }
    return (
        <TouchableOpacity onPress={goMemberDetail} activeOpacity={0.7} style={styles.card} key={index}>
            <View style={styles.deliveryUserCards}>
                <View style={styles.deliveryUserImage}>
                    <Image style={styles.deliveryUserImage} source={{ uri: `${Server.BASE_URL}/users/${marker.id}/${marker.image}/thumbnailImage` }} />
                </View>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={styles.deliveryUserDetail}>
                        <View style={{ width: SCREEN_WIDTH / 2.7 }} >
                            <Text style={styles.fontMedium} numberOfLines={1}>{marker.name}</Text>
                            <Text style={styles.fontSmall} numberOfLines={1} >{marker.businessName}</Text>
                            <Text style={styles.fontSmall} numberOfLines={1} >{marker.category}</Text>
                        </View>
                        <View style={styles.deliveryUserLocation}><LocationSvg style={{ marginRight: 5 }} /><Text style={styles.fontMediumOuterSpace}>{distance.toFixed(2)} away</Text></View>
                    </View>
                    <View style={[styles.deliveryUserDetail, { paddingRight: 10 }]}>
                        <TouchableOpacity onPress={() => Linking.openURL(`tel:+91${marker.officeContactNo}`)} style={{ height: 30, width: 30, backgroundColor: "#f3f3f3", justifyContent: 'center', alignItems: "center", borderRadius: 5 }}>
                            <CallSvg />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={goToWhatsapp} style={{ height: 30, width: 30, backgroundColor: "#25D36650", justifyContent: 'center', alignItems: "center", borderRadius: 5 }}>
                            <AssignSvg />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default GeoLocationUserCard

const CARD_HEIGHT = 100;
const CARD_WIDTH = SCREEN_WIDTH * 0.8;
const SPACING_FOR_CARD_INSET = SCREEN_WIDTH * 0.1 - 10;
const styles = StyleSheet.create({
    card: {
        // padding: 10,
        elevation: 8,
        backgroundColor: "#FFF",
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
        marginBottom: 20
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
    marker: {
        width: "100%",
        height: "100%",
        borderRadius: 10
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },
    signIn: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    mapContainer: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH + (SCREEN_WIDTH / 8.92),
    },
    sideHeading: {
        paddingHorizontal: 20,
        marginTop: 20,
        fontFamily: Fonts.SEMIBOLD,
        fontSize: Fonts.SIZE_16,
        color: Fonts.BLACK,
    },
    deliveryUserContaienr: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    deliveryUserCards: {
        flex: 1,
        position: "relative",
        flexDirection: "row",
        padding: 15,
        borderRadius: 10,
        backgroundColor: Colors.WHITE,
        zIndex: 1
    },
    deliveryUserImage: {
        width: 77,
        height: 70,
        borderRadius: 10
    },
    deliveryUserDetail: {
        paddingLeft: 10,
        justifyContent: "space-between"
    },
    fontMedium: {
        fontFamily: Fonts.SEMIBOLD,
        fontSize: Fonts.SIZE_14,
        color: Fonts.BLACK,
    },
    fontMediumOuterSpace: {
        fontFamily: Fonts.SEMIBOLD,
        fontSize: Fonts.SIZE_12,
        color: Fonts.OUTER_SPACE,
    },
    deliveryUserLocation: {
        flexDirection: 'row',
        alignItems: "center"
    },
    fontSmall: {
        fontFamily: Fonts.SEMIBOLD,
        fontSize: Fonts.SIZE_12,
        color: Fonts.OUTER_SPACE,
    }
})
