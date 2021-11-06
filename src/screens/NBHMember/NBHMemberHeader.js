import React from 'react'
import { Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LocationSvg from "../../assets/svg/location.svg";
import FilterSvg from "../../assets/svg/filter.svg";
// import SearchSvg from "../../assets/svg/location.svg";
// import ChatSvg from "../../assets/svg/chat.svg";
// import CallSvg from "../../assets/svg/call.svg";
import BackSvg from "../../assets/svg/back icon.svg";
import { Fonts, Colors, ScreenNames } from "../../global/index"
import { useNavigation } from '@react-navigation/core';






const NBHMemberHeader = ({ _toggleFilterMemberModal }) => {

    const navigation = useNavigation()
    const openGps = (lat, lng) => {
        var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
        var url = scheme + `${lat},${lng}`;
        Linking.openURL(url);
    }
    return (
        <View>
            <View style={styles.NBHContainer}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(ScreenNames.HOME_SCREEN)}
                        style={{ paddingVertical: 5, paddingHorizontal: 5 }}>
                        <BackSvg />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Find Members</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <TouchableOpacity
                        onPress={() => _toggleFilterMemberModal()}
                        style={{ height: 20, width: 20, alignItems: "center", justifyContent: "center", marginRight: 10 }}>
                        <FilterSvg />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate(ScreenNames.GEO_LOCATION_SCREEN) }}>
                        <LocationSvg />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default NBHMemberHeader

const styles = StyleSheet.create({
    NBHContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // marginHorizontal: 20,
        padding: 10


    }, filter: {

    },
    location: {

    },
    headerText: {
        fontSize: 16,
        fontFamily: Fonts.BOLD,
        color: Colors.JUNGLE_BLACK,
        marginLeft: 5,
        opacity: 0.9
    }
    , ButtonStyles: {

    }

})
