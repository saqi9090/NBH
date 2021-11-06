import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, Fonts, ScreenNames, Server } from '../../global'
import { keyworddata } from '../DummyData/DummyDataScreen'

const MyProfileProductCatalogue = ({ item }) => {


    //function 

    const navigation = useNavigation()


    const gocatalogueDetail = () => {
        navigation.navigate(ScreenNames.CATALOGUEDETAIL_SCREEN, { catalogueId: item.catalogueId })
    }
    return (
        <View style={{ marginVertical: 10, marginHorizontal: 0, marginHorizontal: 10 }}>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={gocatalogueDetail}>

                <View style={[styles.imageBox]}>
                    <Image
                        source={{ uri: `${Server.BASE_URL}/productCatalogues/${item.catalogueId}/${item.otherImageName[0]}/otherImages` }}
                        style={{ height: "100%", width: "100%" }} />
                </View>
                <View style={{ marginTop: 10, }}>
                    <Text style={[styles.font1, { marginBottom: 5 }]} numberOfLines={1}>{item.productTitle}</Text>
                    <View style={{ flexDirection: "row", }}>

                        <Text xt style={[styles.font2, { marginBottom: 7 }]} >₹ {item.productPrice}</Text>
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

export default MyProfileProductCatalogue

const styles = StyleSheet.create({
    imageBox: { height: 110, width: 110, backgroundColor: Colors.PRIMARY, },
    font1: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK, width: 110 },
    font2: { fontSize: 13, fontFamily: Fonts.SEMIBOLD, color: "#00000090" },
    font3: { fontSize: 13, fontFamily: Fonts.SEMIBOLD, color: "#00000090" },
    font4: { fontSize: 12, fontFamily: Fonts.REGULAR, color: Colors.JUNGLE_BLACK },



})
