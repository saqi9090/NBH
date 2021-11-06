import axios from 'axios';
import React from 'react'
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import CustomAlert from '../../components/CustomAlert/CusomAlert';
import { SeasonalDataSecandry } from '../../components/DummyData/DummyDataScreen';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Header from '../../components/Header/Header';
import SeasonalGreetingsSecandry from '../../components/SeasonalGreetingsSecandry/SeasonalGreetingsSecandry';
import { Colors, Server } from '../../global';
import { getService } from '../../services/getService';
import { styles } from "./GreetingOfDewaliStyles"

const GreetingDetailsScreen = ({ route, params, userId }) => {

    const [userDetails, setUserDetails] = React.useState(null)
    const [alertTitle, setAlertTitle] = React.useState("");
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false);

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }
    const getUserDetails = async () => {

        const req = `/users/${userId}`
        getService(req).then((response) => {
            if (response.code == 200) {
                setUserDetails(response.data)
            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })

    }

    React.useEffect(() => {
        getUserDetails()
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <Header name={route.params.title} backgroundColor={true} />
            {
                route.params.otherImageName.length > 0
                &&
                <View style={{ backgroundColor: Colors.WHITE, marginHorizontal: 20, marginTop: 30, marginBottom: 10 }}>
                    <Text style={styles.font1}>Click on image and Share it !</Text>
                </View>}
            <FlatList
                data={route.params.otherImageName}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => `Event${item}`}
                style={{ marginVertical: 10, marginHorizontal: 10 }}
                renderItem={({ item, index }) => (
                    <SeasonalGreetingsSecandry item={item} index={index} greetingId={route.params.greetingId} userDetails={userDetails && userDetails} />
                )} />


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

const mapStateToProps = state => ({
    userId: state.user.userId
});

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(mapStateToProps, mapDispatchToProps)(GreetingDetailsScreen);
