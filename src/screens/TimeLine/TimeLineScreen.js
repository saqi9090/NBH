import React from 'react'
import { View, Text } from 'react-native';
import { styles } from "./TimeLineStyles";
import TimeLineTopTabs from "../../navigation/topTabs/TimeLineTopTabs/TimeLineTopTabs"
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Header from '../../components/Header/Header';
import { Colors } from '../../global';

const TimeLineScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <Header name={"Timeline"} backgroundColor={true} />
            <View style={{ flex: 1 }}>

                <TimeLineTopTabs />
            </View>
        </View>
    )
}

export default TimeLineScreen
