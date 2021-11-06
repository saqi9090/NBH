import axios from 'axios';
import React from 'react'
import { View, Text, FlatList } from 'react-native';
import CustomAlert from '../../components/CustomAlert/CusomAlert';
import { feedsSaveddata, quickLinkData, SeasonaData } from '../../components/DummyData/DummyDataScreen';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Header from '../../components/Header/Header';
import SeasonalGreetings from '../../components/SeasonalGreetings/SeasonalGreetings';
import { Colors, Server } from '../../global';
import { getService } from '../../services/getService';
import { styles } from "./SeasonalGreetingsSytles"

const SeasonalGreetingsScreen = ({ navigation }) => {


    const [seasonalGreetings, setSeasonalGreetings] = React.useState(null)

    const [alertTitle, setAlertTitle] = React.useState("");
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false);

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }

    const getSeasonalGreetings = async () => {
        // const response = await axios.get(`${Server.BASE_URL}/seasonalGreetings/active`)
        // setSeasonalGreetings(response.data)

        const req = `/seasonalGreetings/active`
        getService(req).then((response) => {
            if (response.code == 200) {
                setSeasonalGreetings(response.data)
            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })
    }

    React.useEffect(() => {
        getSeasonalGreetings()
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <Header name={"Seasonal Greetings"} backgroundColor={true} />
            {
                seasonalGreetings
                &&
                <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
                    <FlatList
                        data={seasonalGreetings}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => `Event${item.greetingId}`}
                        style={{ marginVertical: 30, }}
                        renderItem={({ item, index }) => (
                            <SeasonalGreetings item={item} index={index} />
                        )} />

                </View>
            }

            <CustomAlert
                title={alertTitle}
                desc={alertText}
                leftButtonText={"Ok"}
                leftButtonFunction={leftButtonFunction}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility}
                customAlertVisible={customAlertVisible}
            />
        </View>
    )
}

export default SeasonalGreetingsScreen
