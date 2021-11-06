import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../global';
import CameraSvg from "../../assets/svg/c-camera.svg"
import GallerySvg from "../../assets/svg/c-gallery.svg"
import PdfSvg from "../../assets/svg/c-doc.svg"
import LocationSvg from "../../assets/svg/c-location.svg"
import CallSvg from "../../assets/svg/c-contact.svg"

const ChatBox = () => {

    const Data = [
        {
            key: 1,
            svg: <CameraSvg />
        },
        {
            key: 2,
            svg: <GallerySvg />
        },
        {
            key: 3,
            svg: <PdfSvg />
        },
        {
            key: 4,
            svg: <LocationSvg />
        },
        {
            key: 5,
            svg: <CallSvg />
        },
    ]


    return (
        <View style={styles.box}>

            <FlatList
                numColumns={3}
                data={Data}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={{ margin: 7 }}>
                        {item.svg}
                    </TouchableOpacity>
                )} />

        </View>
    )
}

export default ChatBox

const styles = StyleSheet.create({

    box: {
        width: 150,
        backgroundColor: Colors.WHITE,
        borderRadius: 5,
        paddingVertical: 10,
        padding: 10,

    }
})
