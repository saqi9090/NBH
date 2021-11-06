import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Colors, Constants, Fonts, ScreenNames, Server } from '../../global'
import { SCREEN_WIDTH } from '../../global/constants'
import { keyworddata } from '../DummyData/DummyDataScreen'
import CrossSvg from "../../assets/svg/crossSmall.svg"


const MyCatalogueCard = ({ item, handleRemoveImage, edit }) => {


    const navigation = useNavigation()
    const gocatalogueDetail = () => {
        navigation.navigate(ScreenNames.CATALOGUEDETAIL_SCREEN, {
            catalogueId: item.catalogueId,
            // userId: item.userId
        })
    }

    return (
        <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={gocatalogueDetail}>

                <View style={[styles.imageBox]}>
                    {edit ?

                        <View style={{ position: "absolute", zIndex: 1, right: -5, top: -5 }}>
                            <TouchableOpacity
                                hitSlop={{ top: 30, right: 30, bottom: 30, left: 30 }}
                                onPress={() => handleRemoveImage(item.catalogueId)}
                                style={{ height: 15, width: 15, borderRadius: 100, backgroundColor: Colors.PRIMARY, alignItems: "center", justifyContent: "center" }}>
                                <CrossSvg />
                            </TouchableOpacity>
                        </View>
                        :
                        null
                    }
                    <Image source={{ uri: `${Server.BASE_URL}/productCatalogues/${item.catalogueId}/${item.otherImageName[0]}/otherImages` }} style={{ height: "100%", width: "100%" }} />
                </View>
                <View style={{ marginTop: 10, }}>
                    <View style={{ width: Constants.SCREEN_WIDTH / 2 - 30 }}>
                        <Text style={[styles.font1, { marginBottom: 5 }]} numberOfLines={1}>{item.productTitle}</Text>
                    </View>
                    <View style={{ flexDirection: "row", }}>

                        <Text style={[styles.font2, { marginBottom: 7 }]} >₹ {item.productPrice}</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 7, marginLeft: 10 }}>
                            <Text style={styles.font3} >MOQ:</Text>
                            <Text style={[styles.font3, { color: "#00000085" }]}> {item.productMoq}</Text>
                        </View>
                    </View>


                </View>
            </TouchableOpacity>
        </View>
    )
}

export default MyCatalogueCard

const styles = StyleSheet.create({
    imageBox: { height: 180, width: Constants.SCREEN_WIDTH / 2 - 30, backgroundColor: Colors.PRIMARY, },
    font1: { fontSize: 18, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK },
    font2: { fontSize: 13, fontFamily: Fonts.BOLD, color: "#00000090" },
    font3: { fontSize: 13, fontFamily: Fonts.BOLD, color: "#00000090" },
    font4: { fontSize: 12, fontFamily: Fonts.REGULAR, color: Colors.JUNGLE_BLACK },



})
