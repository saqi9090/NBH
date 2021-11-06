import React from 'react'
import { View, Text, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, FlatList } from 'react-native'

//svg
import CrossSvg from "../../assets/svg/cross.svg"

//components
import ReportCheckBox1 from '../ReportCheckBox/ReportCheckBox';
import axios from 'axios';

//style
import { globalStyles } from '../../global/globalStyles';
import { styles } from "./ReportModalStyles";

//global
import { Server } from '../../global';
import { connect } from 'react-redux';
import { getService } from '../../services/getService';
import { postRequest } from '../../services/postService';
import { SCREEN_HEIGHT } from '../../global/constants';






const ReportModal = ({ _toggleReasonReport, reasonreport, navigation, heartShow, setAlertText,
    _toggleReport, setReasonId, reasonId, userId, name, postId, toggleCustomAlertVisibility }) => {

    //state
    const [reasonReport, setreasonReport] = React.useState()


    //function
    const getReason = async () => {
        const req = `/reasons/reasonReport`
        getService(req).then((response) => {
            if (response.code == 200) {

                setreasonReport(response.data)
            } else {
                // setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })
    }

    const postReason = async () => {

        if (reasonId.length > 0) {


            const data = {
                "postId": postId,
                "reportReason": reasonId,
                "userId": userId,
                "userName": name
            }

            const uri = `/userPostReport/reportFor/${heartShow == true ? "COMMON_POST" : "ADVERTISEMENT_POST"}`
            const body = data
            postRequest(uri, body).then((response) => {
                if (response.code == 200) {
                    setReasonId([])
                    _toggleReasonReport()
                    setAlertText("Thanks for letting us know. If we find any violation of content policy, we will take appropriate action")
                    toggleCustomAlertVisibility()
                } else {
                    // setAlertTitle("Alert")
                    setAlertText(response.message)
                    toggleCustomAlertVisibility()
                }
            })

            // _toggleReasonReport()
        } else {
            setAlertText("Select Atleast One Report Reason")
            toggleCustomAlertVisibility()
        }

    }

    //useEffect
    React.useEffect(() => {
        getReason()
    }, [])

    //ui
    return (
        <>
            <Modal
                animationType={'fade'}
                visible={reasonreport}
                transparent={true} >
                <View style={styles.modalContainer}>

                    <KeyboardAvoidingView behavior={Platform.OS == "android" ? null : "padding"} style={styles.confirmContainer}>

                        <View style={styles.confirmContainer}>
                            <View style={styles.confirmHeader}>
                                <Text style={styles.confirmDeliveryText}
                                    maxFontSizeMultiplier={1}>Reasons to report</Text>
                                <TouchableOpacity
                                    onPress={() => _toggleReasonReport()}
                                    hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
                                >
                                    <CrossSvg />
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginHorizontal: 19, marginVertical: 20 }}>
                                <View style={{ marginTop: 10, height: SCREEN_HEIGHT / 3.7 - 40, }}>
                                    <FlatList data={reasonReport}
                                        // contentContainerStyle={{ flexGrow: 1.5 }}
                                        renderItem={({ item, index }) =>

                                            (<ReportCheckBox1 item={item} setReasonId={setReasonId} reasonId={reasonId} />)

                                        }
                                    />
                                </View>

                            </View>
                            <TouchableOpacity
                                onPress={postReason}
                                style={[globalStyles.button, { marginHorizontal: 90, height: 45, borderRadius: 15, marginBottom: 0 }]}>
                                <Text style={globalStyles.buttonText}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </Modal>
            {/* <CustomAlert
                title={alertTitle}
                desc={alertText}
                leftButtonText={"Ok"}
                leftButtonFunction={leftButtonFunction}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility}
                customAlertVisible={customAlertVisible}
            /> */}

        </>
    )
}

const mapStateToProps = state => ({
    state: state.user,
    userId: state.user.userId,
    name: state.user.name
});

export default connect(mapStateToProps, null)(ReportModal)


