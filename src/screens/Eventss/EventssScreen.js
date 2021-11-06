import axios from 'axios';
import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { EventsData, ImageExtenstion } from '../../components/DummyData/DummyDataScreen';
import EventsCards from '../../components/EventsCards/EventsCards';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import Header from '../../components/Header/Header';
import { Colors, Server } from '../../global';
import { styles } from "./EventssStyles";
import { connect } from 'react-redux';
import { getService } from '../../services/getService';
import CustomAlert from '../../components/CustomAlert/CusomAlert';

const EventssScreen = ({ userId, name, email, phNo }) => {


    const [events, setEvents] = React.useState(null)
    const [alertTitle, setAlertTitle] = React.useState("");
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false);

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }

    // http://103.123.45.75:9428/api/events/getVo/1

    const getEvents = async () => {
        const req = `/events/getVo/${userId}`
        getService(req).then((response) => {
            if (response.code == 200) {
                setEvents(response.data)
            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })
    }

    React.useEffect(() => {
        getEvents()
    }, [])


    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <Header name={"Events"} backgroundColor={true} />
            {
                events
                &&
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ marginHorizontal: 20, marginVertical: 10 }}
                    data={events}
                    keyExtractor={(item) => `Event${item.eventId}`}
                    renderItem={({ item, index }) => (
                        <EventsCards item={item} index={index} userId={userId} email={email} name={name} phNo={phNo} />
                    )}
                />
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

const mapStateToProps = state => ({
    name: state.user.name,
    email: state.user.email,
    phNo: state.user.phNo,
    userImage: state.user.thumbnailImage,
    userId: state.user.userId
});

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(mapStateToProps, mapDispatchToProps)(EventssScreen);

// export default EventssScreen
