import React from 'react'
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Header from '../../components/Header/Header';
import { Colors, Server } from '../../global';
import { styles } from "./InVoiceStyles"
import axios from 'axios';
import { connect } from 'react-redux';
import Invoice from '../../components/Invoice/Invoice';
import { BASE_URL } from '../../global/server';
import { getService } from '../../services/getService';
import CustomAlert from '../../components/CustomAlert/CusomAlert';


const InVoiceScreen = ({ userId }) => {

    const [inVoice, setInVoice] = React.useState(null)
    const [alertTitle, setAlertTitle] = React.useState("");
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false);

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }


    const getInVoice = async () => {
        const req = `/orders/getAllInvoiceListing/${userId}`
        getService(req).then((response) => {

            if (response.code == 200) {
                let b = []
                const res = response.data.map(e => e.listOfId.map(i => b = [...b, {
                    name1: e.name,
                    orderId: i.orderId,
                    purchaseDate: i.purchaseDate
                }]))
                setInVoice(b)
            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })
    }

    React.useEffect(() => {
        getInVoice()
    }, [])


    console.warn("inVoice", inVoice);

    const renderItem = ({ item, index }) => (
        <Invoice item={item} index={index} />
    )


    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <Header name={"Invoice"} backgroundColor={true} />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={inVoice && inVoice}
                renderItem={renderItem} />

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

export default connect(mapStateToProps, mapDispatchToProps)(InVoiceScreen)