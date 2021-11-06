import React from 'react'
import { View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { Colors } from '../../global'
import Header from "../../components/Header/Header";
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import { styles } from './SeacrhByTagStyles';
import ToptabsSearchByTag from "../../navigation/topTabs/ToptabsSearchByTag/ToptabsSearchByTag";
import Location from "../../assets/svg/locationlarge.svg"

const SeacrhByTagScreen = () => {
    return (
        <View style={{ flex: 1 ,backgroundColor:Colors.WHITE}} >
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <View style={styles.headingContainer}>
                <Header name={"Search by tag"} backgroundColor={true} />
                <View style={{ marginTop: 20 }}>
                    <SearchComponent />
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
                <View style={{ marginTop: 20 }}>

                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={styles.fontTitle}>Tags</Text>
                    </View>
                </View>
                <View style={{ position: "absolute", top: 40, left: 25, marginTop: 20 }}>
                    <Location />
                </View>
                <ToptabsSearchByTag />
            </View>

        </View >
    )
}

export default SeacrhByTagScreen
