import React from 'react'
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Header from '../../components/Header/Header';
import { Colors, Server } from '../../global';
import { styles } from "./CircularsStyles"
import Circular from '../../components/Circular/Circular';
import axios from 'axios';
import { connect } from 'react-redux';
import { getService } from '../../services/getService';
import CustomAlert from '../../components/CustomAlert/CusomAlert';


const CircularsScreen = ({ userId }) => {

    const [circularData, setCircularData] = React.useState(null)
    const [alertTitle, setAlertTitle] = React.useState("");
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false);

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }

    const getCircularData = async () => {
        // const response = await axios.get(`${Server.BASE_URL}/circularManagement/getAll/userId/${userId}`)
        // setCircularData(response.data)

        const req = `/circularManagement/getAll/userId/${userId}`
        getService(req).then((response) => {
            if (response.code == 200) {
                setCircularData(response.data)
            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }

        })
    }

    React.useEffect(() => {
        getCircularData()
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <Header name={"Circulars"} backgroundColor={true} />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={circularData}
                renderItem={({ item, index }) => (
                    <Circular item={item} index={index} />
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

export default connect(mapStateToProps, mapDispatchToProps)(CircularsScreen)
