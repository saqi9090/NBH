import React from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { Colors, Fonts } from '../../global'
import { keyworddata } from '../DummyData/DummyDataScreen'

const ProductCatalogue = ({ item }) => {
    return (
        <View>
            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 20 }}>
                <View style={[styles.imageBox]}>
                    <Image source={item.imageofProduct} style={{ height: "100%", width: "100%" }}
                    />
                </View>
                <View >
                    <Text style={[styles.font1, { marginBottom: 5 }]}>{item.deatilname}</Text>
                    <Text style={[styles.font2, { marginBottom: 7 }]} >₹ {item.Price}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 7 }}>
                        <Text style={styles.font3} >MOQ:</Text>
                        <Text style={[styles.font3, { color: "#00000085" }]}>   {item.MAQ}</Text>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.font4}>{item.discaription}</Text>
                    </View>

                    <FlatList data={keyworddata}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        renderItem={({ item, index }) => (
                            <View>
                                <View style={{ height: 30, alignItems: "center", justifyContent: "center", backgroundColor: "#FFD64820", borderRadius: 10, paddingVertical: 20, marginRight: 20, paddingHorizontal: 10 }}>
                                    <Text style={{ fontSize: 14, fontFamily: Fonts.BOLD, color: Colors.ONYX_60 }}>{item.name}</Text>

                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
            <View style={{ height: 1.5, backgroundColor: Colors.ONYX_60, width: "100%" }}></View>
        </View>
    )
}

export default ProductCatalogue

const styles = StyleSheet.create({
    imageBox: { height: 125, width: 90, backgroundColor: Colors.PRIMARY, marginRight: 20 },
    font1: { fontSize: 14, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK },
    font2: { fontSize: 13, fontFamily: Fonts.BOLD, color: "#00000090" },
    font3: { fontSize: 13, fontFamily: Fonts.BOLD, color: "#00000090" },
    font4: { fontSize: 12, fontFamily: Fonts.REGULAR, color: Colors.JUNGLE_BLACK },



})
