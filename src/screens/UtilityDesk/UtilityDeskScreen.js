import React from 'react'
import { View, Text, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Header from '../../components/Header/Header';
import { Colors, Fonts, ScreenNames, Server } from '../../global';
import { styles } from "./UtilityDeskStyles";
import { UtilityData } from '../../components/DummyData/DummyDataScreen';
import { SCREEN_WIDTH } from '../../global/constants';
import { connect } from 'react-redux';
import axios from 'axios';
import { getService } from '../../services/getService';


const UtilityDeskScreen = ({ navigation, userId }) => {

    const [circularData, setCircularData] = React.useState(null)
    //function 

    const goEvents = () => {
        navigation.navigate(ScreenNames.EVENTS_SCREEN)
    }

    const goCircular = () => {
        navigation.navigate(ScreenNames.CIRCULARS_SCREEN)
    }

    const goSeasonalGreeting = () => {
        navigation.navigate(ScreenNames.SEASONALGREETINGS_SCREEN)
    }

    ///utility desk



    const getCircularData = async () => {
        // const response = await axios.get(`${Server.BASE_URL}/circularManagement/getAll/userId/${userId}`)
        // // console.warn("Utiltity desk", response.data);
        // let res = response.data.filter(e => e.viewed == false)
        // // console.warn("res", res.length);
        // setCircularData(res.length)

        const req = `/circularManagement/getAll/userId/${userId}`
        getService(req).then((response) => {
            let res = response.data.filter(e => e.viewed == false)
            // console.warn("res", res.length);
            setCircularData(res.length)
        })



    }

    React.useEffect(() => {
        getCircularData()
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <Header name={"Utility Desk"} backgroundColor={true} />
            {/* <FlatList data={UtilityData} renderItem={({item,index}) => ( */}
            <ScrollView style={{ marginVertical: 40 }}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={goEvents} >

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 40, marginVertical: 30 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 30, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK }}>Events</Text>
                        </View>

                        <View style={{ height: 150, width: 100, backgroundColor: Colors.WHITE }}>
                            <Image source={require("../../assets/images/Events.png")} style={{ height: "100%", width: "100%" }} />
                        </View>
                    </View>
                    <View style={styles.sectionLine}></View>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={goCircular}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 40, marginVertical: 30 }}>
                        <View style={{ height: 150, width: 100, backgroundColor: Colors.WHITE }}>
                            <Image source={require("../../assets/images/Circulars.png")} style={{ height: "100%", width: "100%" }} />
                        </View>
                        <View >
                            <View style={{ flexDirection: "row-reverse" }}>
                                {circularData && circularData > 0 ?

                                    <View style={{ height: 20, width: 20, borderRadius: 100, backgroundColor: "red", alignItems: "center", justifyContent: "center" }}>
                                        <Text style={{ fontSize: 12, color: Colors.WHITE, fontFamily: Fonts.BOLD }}>{circularData && circularData}</Text>
                                    </View>
                                    :
                                    null
                                }

                            </View>
                            <Text style={{ fontSize: 30, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK }}>Circulars</Text>
                        </View>


                    </View>
                    <View style={styles.sectionLine}></View>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={goSeasonalGreeting}>

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 40, marginVertical: 30 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 30, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK }}>Seasonal Greetings</Text>
                        </View>

                        <View style={{ height: 150, width: 100, backgroundColor: Colors.WHITE }}>
                            <Image source={require("../../assets/images/SGreetings.png")} style={{ height: "100%", width: "100%" }} />

                        </View>
                    </View>
                </TouchableOpacity>
                {/* )}/> */}

            </ScrollView >
        </View>
    )
}




const mapStateToProps = state => ({
    name: state.user.name,
    email: state.user.email,
    phNo: state.user.phNo,
    userImage: state.user.thumbnailImage,
    userId: state.user.userId
});

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(mapStateToProps, mapDispatchToProps)(UtilityDeskScreen);

// export default 
