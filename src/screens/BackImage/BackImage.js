import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Headers from "../../components/Header/Header";
import { Colors, Fonts } from '../../global';
import LocationSvg from "../../assets/svg/location123.svg";
import EmailSvg from "../../assets/svg/Mail1234.svg";
import CallSvg from "../../assets/svg/phone-call1234.svg";
import WebsiteSvg from "../../assets/svg/Website.svg";

import { captureRef } from "react-native-view-shot";
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

const BackImage = () => {

    let number = "1234567890"
    let email = "saqi@gmial.com"
    let website = "www.tsafsdf"
    let location1 = "Bhiwandi,Thane"
    const navigation = useNavigation()

    const viewRef = React.useRef(null);

    const shareImage = () => {
        console.warn(viewRef);
        captureRef(viewRef, {
            format: "jpg",
            quality: 0.8
        }).then(
            uri => {
                RNFS.readFile(uri, 'base64')
                    .then(async base64Data => {
                        var base64Data = `data:image/png;base64,` + base64Data;
                        // here's base64 encoded image
                        await Share.open({
                            url: base64Data, title: "NBH",
                        });
                        // remove the file from storage
                        // return fs.unlink(imagePath);
                    });
            },
            error => console.error("Oops, snapshot failed", error)
        );
    }
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} isTransparent={false} />
            <Headers name="Back Groud Image"
                backgroundColor={true}
                activateLeftIcon={true}
            // YellowHomeOnpress={() => navigation.navigate(ScreenNames.HOME_SCREEN)}
            />
            <View style={{ flex: 1, backgroundColor: Colors.WHITE, alignItems: "center", justifyContent: "center" }} ref={viewRef}>
                <TouchableOpacity onPress={shareImage}>

                    <ImageBackground source={require("../../assets/images/info3.png")}
                        style={{ width: 350, height: 350 }} resizeMode="cover">

                        <View style={{ flex: 1 }}>
                            <View style={{ position: "absolute", right: 2 }}>
                                <Image source={require("../../assets/images/NBH.png")} style={{ marginBottom: 30, marginLeft: 20, }} resizeMode="contain" />
                            </View>

                            <View style={{ alignItems: "center" }}>
                                <Text style={styles.font2} >Sofware Development</Text>
                            </View>


                            <View style={{ position: "absolute", bottom: 0 }}>

                                <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <CallSvg />
                                        <Text style={styles.font1}>{number}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <EmailSvg />
                                        <Text style={styles.font1}>{email}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <WebsiteSvg />


                                        <Text style={styles.font1} >{website}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <LocationSvg />
                                        <Text style={styles.font1} >{location1}</Text>
                                    </View>
                                </View>
                            </View>

                        </View>

                    </ImageBackground>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default BackImage

const styles = StyleSheet.create({
    font1: {
        fontSize: 14,
        color: Colors.BLACK,
        fontFamily: Fonts.BOLD,
        // marginHorizontal: 4
        marginLeft: 5,
        marginRight: 6
    },
    font2: {
        fontSize: 16,
        color: Colors.BLACK,
        fontFamily: Fonts.BOLD
    }
})
