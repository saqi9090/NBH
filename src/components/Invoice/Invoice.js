import moment from 'moment';
import React from 'react'
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import { Colors, Constants, Fonts, Server } from '../../global'
import ImageSvg from "../../assets/svg/circularimage.svg";
import PdfSvg from "../../assets/svg/circular pdf.svg";
import * as OpenAnything from 'react-native-openanything'
import ViewFoodMenuImagesModal from '../ViewFoodMenuImagesModal/ViewFoodMenuImagesModal';
import axios from 'axios';
import { connect } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
const Invoice = ({ item, userId }) => {

    // const [viewState, setViewState] = React.useState(item.viewed);
    // const [isVisible, setVisibility] = React.useState(false);
    // const [index, setIndex] = React.useState(0);

    // const showModal = () => {
    //     setVisibility(true);
    // };

    // const hideModal = () => {
    //     setVisibility(false);
    // };




    // console.warn("item", item);
    // const _toggleviewState = async () => {


    // console.warn(
    //     item.name = "MEMBERSHIP" ?
    //         console.warn("1", item.name)
    //         // `${Server.BASE_URL}/users/getNewUserInvoice/${item.orderId}`
    //         :

    //         item.name = "PREMIUMPOST" ?
    //             console.warn("2", item.name)

    //             // `${Server.BASE_URL}/premiumPost/invoice/premiumPostId/${item.orderId}`
    //             :

    //             item.name = "EVENTS" ?
    //                 console.warn("2", item.name)

    //                 // `${Server.BASE_URL}/events/invoice/eventId/${item.orderId}/userId/${userId}` 
    //                 :

    //                 item.name = "ORDER" ?
    //                     console.warn("4", item.name)

    //                     // `${Server.BASE_URL}/orders/getAllInvoiceListing/${item.orderId}`
    //                     :

    //                     null

    // );

    let DownloadDir = Platform.OS == "ios" ? RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.DownloadDir;
    const pdfDownload = () => {
        RNFetchBlob
            .config({
                // add this option that makes response data to be stored as a file,
                // this is much more performant.
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
                    notification: true,
                    path: `${DownloadDir}/NBH${item.orderId}.pdf`, // this is the path where your downloaded file will live in
                    description: 'NBH Invoice',
                    // title: `SM_Invoice${Date.now()}.pdf`,
                    title: `NBH${item.orderId}.pdf`,
                    mime: 'application/pdf',
                    mediaScannable: true
                }
            })
            .fetch('GET',

                // `${Server.BASE_URL}/users/getNewUserInvoice/${item.orderId}`
                item.name = "MEMBERSHIP" ?
                    // console.warn("1", item.name)
                    `${Server.BASE_URL}/users/getNewUserInvoice/${item.orderId}`
                    :

                    item.name = "PREMIUMPOST" ?
                        // console.warn("2", item.name)

                        `${Server.BASE_URL}/premiumPost/invoice/premiumPostId/${item.orderId}`
                        :

                        item.name = "EVENTS" ?
                            // console.warn("3", item.name)

                            `${Server.BASE_URL}/events/invoice/eventId/${item.orderId}/userId/${userId}`
                            :

                            item.name = "ORDER" ?
                                // console.warn("4", item.name)

                                `${Server.BASE_URL}/orders/getAllInvoiceListing/${item.orderId}`
                                :

                                null
            )
            .then((resp) => {
                // setLoading(false);
                // setCustomToast(true)
                // dispatch(UserActions.showToast(`Downloaded To ${DownloadDir}`));
            })
            .catch((error) => {
                // setLoading(false);
                console.warn("=>>", error.message);
            })
    }
    // }
    return (
        // <View style={{backgroundColor:Colors.WHITE,flex:1}}> 

        <View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 25, marginVertical: 20 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>

                    <View style={{ marginRight: 20 }}>
                        {/* <Image/> */}
                        {/* {
                            item.fileName && item.fileName.slice(item.fileName && item.fileName.length - 3) == "pdf" */}
                        {/* ? */}
                        <PdfSvg />
                        {/* :
                                <ImageSvg />
                        } */}
                    </View>
                    <View style={{ width: Constants.SCREEN_WIDTH / 1.7 }}>
                        <Text style={styles.font2}>{item.name1}</Text>
                        <Text style={styles.font2}>{moment(item.purchaseDate).startOf('minutes').fromNow()}</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={pdfDownload}
                        style={styles.viewButton}>
                        <Text style={styles.font1}>{
                            // viewState ?
                            // "Downloaded"
                            // :
                            "Download"
                        }</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.sectionLine}></View>
            {/* <ViewFoodMenuImagesModal
                visible={isVisible}
                hideModal={hideModal}
                index={index}
                route={0}
                otherImageNames={[`${Server.BASE_URL}/circularManagement/${item.id}/userId/${userId}/${item.fileName}`]} /> */}
        </View>

        // {/* </View> */}
    )
}
const mapStateToProps = state => ({
    userId: state.user.userId
});

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(mapStateToProps, mapDispatchToProps)(Invoice)

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
