import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Colors, Constants, Fonts, ScreenNames, Server } from '../../global'
import { SCREEN_WIDTH } from '../../global/constants'
import { keyworddata } from '../DummyData/DummyDataScreen'

const SeasonalGreetings = ({ item }) => {

    //function
    const navigation = useNavigation()

    const goToSeasonalGreetings = () => {
        navigation.navigate(ScreenNames.GREETINGS_DETAILS_SCREEN, { otherImageName: item.otherImageName, greetingId: item.greetingId, title: item.title })
    }

    return (
        <View style={{ marginVertical: 20, marginHorizontal: 10, width: Constants.SCREEN_WIDTH / 2 - 20 }}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={goToSeasonalGreetings} style={{ backgroundColor: Colors.WHITE }}>
                <View style={[styles.imageBox]}>
                    <Image
                        // resizeMode="contain"
                        source={{ uri: `${Server.BASE_URL}/seasonalGreetings/${item.greetingId}/${item.thumbnailImage}/thumbnailImage` }} style={{ height: "100%", width: "100%" }} />
                </View>
                <View style={{ marginTop: 20, paddingHorizontal: 10, }}>
                    <Text style={[styles.font2, { alignSelf: "center", textAlign: "center" }]} >{item.title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default SeasonalGreetings

const styles = StyleSheet.create({
    imageBox: { height: 100, backgroundColor: Colors.PRIMARY },
    font1: { fontSize: 18, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK },
    font2: { fontSize: 18, fontFamily: Fonts.BOLD, color: "#00000090" },
    font3: { fontSize: 13, fontFamily: Fonts.BOLD, color: "#00000090" },
    font4: { fontSize: 12, fontFamily: Fonts.REGULAR, color: Colors.JUNGLE_BLACK },



})
