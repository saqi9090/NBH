import moment from 'moment';
import React from 'react'
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Colors, Constants, Fonts, Server } from '../../global'
import ImageSvg from "../../assets/svg/circularimage.svg";
import PdfSvg from "../../assets/svg/circular pdf.svg";
import * as OpenAnything from 'react-native-openanything'
import ViewFoodMenuImagesModal from '../ViewFoodMenuImagesModal/ViewFoodMenuImagesModal';
import axios from 'axios';
import { connect } from 'react-redux';
import { PutService } from '../../services/PutService';
import CustomAlert from '../CustomAlert/CusomAlert';
const Circular = ({ item, userId }) => {

    const [viewState, setViewState] = React.useState(item.viewed);
    const [isVisible, setVisibility] = React.useState(false);
    const [index, setIndex] = React.useState(0);
    const [alertTitle, setAlertTitle] = React.useState("");
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false);

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }


    const showModal = () => {
        setVisibility(true);
    };

    const hideModal = () => {
        setVisibility(false);
    };
    const _toggleviewState = async () => {
        if (!viewState) {
            let l = item.fileName && item.fileName.slice(item.fileName && item.fileName.length - 3)
            if (l == "pdf") {
                OpenAnything.Pdf(`${Server.BASE_URL}/circularManagement/${item.id}/userId/${userId}/${item.fileName}`)
                const uri = `/circularManagement/${item.id}/userId/${userId}/editViewStatus/true`
                const body = null
                PutService(uri, body).then((response) => {
                    if (response.code == 200) {
                    } else {
                        setAlertTitle("Alert")
                        setAlertText(response.message)
                        toggleCustomAlertVisibility()
                    }

                })
            } else {
                const uri = `/circularManagement/${item.id}/userId/${userId}/editViewStatus/true`
                const body = null
                PutService(uri, body).then((response) => {
                    if (response.code == 200) {
                        showModal()
                    } else {
                        setAlertTitle("Alert")
                        setAlertText(response.message)
                        toggleCustomAlertVisibility()
                    }

                })

            }
            setViewState(!viewState)
        } else {
            const uri = `/circularManagement/${item.id}/userId/${userId}/editViewStatus/false`
            const body = null
            PutService(uri, body).then((response) => {
                if (response.code == 200) {
                    setViewState(!viewState)
                } else {
                    setAlertTitle("Alert")
                    setAlertText(response.message)
                    toggleCustomAlertVisibility()
                }

            })
        }
    }
    return (

        <View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 25, marginVertical: 20 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>

                    <View style={{ marginRight: 20 }}>
                        {/* <Image/> */}
                        {
                            item.fileName && item.fileName.slice(item.fileName && item.fileName.length - 3) == "pdf"
                                ?
                                <PdfSvg />
                                :
                                <ImageSvg />
                        }
                    </View>
                    <View style={{ width: Constants.SCREEN_WIDTH / 1.7 }}>
                        <Text style={styles.font2}>{item.title}{item.fileName && item.fileName.slice(item.fileName && item.fileName.length - 4)}</Text>
                        <Text style={styles.font2}>{moment(item.createdDate).startOf('minutes').fromNow()}</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={_toggleviewState}
                        style={styles.viewButton}>
                        <Text style={styles.font1}>{
                            viewState ?
                                "Viewed"
                                :
                                "View"
                        }</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.sectionLine}></View>
            <ViewFoodMenuImagesModal
                visible={isVisible}
                hideModal={hideModal}
                index={index}
                route={0}
                otherImageNames={[`${Server.BASE_URL}/circularManagement/${item.id}/userId/${userId}/${item.fileName}`]} />

            <CustomAlert
                title={alertTitle}
                desc={alertText}
                leftButtonText={"Ok"}
                leftButtonFunction={leftButtonFunction}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility}
                customAlertVisible={customAlertVisible}
            />
        </View>

        // {/* </View> */}
    )
}
const mapStateToProps = state => ({
    userId: state.user.userId
});

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(mapStateToProps, mapDispatchToProps)(Circular)

const styles = StyleSheet.create({
    viewButton: {
        height: 28,
        width: 70,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        alignItems: "center",
        justifyContent: "center"
    },
    font1: {
        fontSize: 12,
        fontFamily: Fonts.SEMIBOLD,
        color: Colors.JUNGLE_BLACK
    },
    sectionLine: {
        height: 1,
        width: "100%",
        backgroundColor: Colors.ONYX_80,
    },
    font2: {
        fontSize: 12,
        fontFamily: Fonts.SEMIBOLD,
        color: Colors.ONYX_60
    }
})
