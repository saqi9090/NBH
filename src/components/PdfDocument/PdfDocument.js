import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DownloadSvg from "../../assets/svg/download11.svg"
import { Colors, Constants, Fonts, ScreenNames, Server } from '../../global';
import { SCREEN_WIDTH } from '../../global/constants';
import { useNavigation } from '@react-navigation/core'
import moment from 'moment'
import { connect } from 'react-redux'
import ImageLoader from '../ImageLoader/ImageLoader'

const PdfDocument = () => {

    const [toggleBTN, setToggleBTN] = React.useState(false);
    const _toggleLoader = () => { setToggleBTN(!toggleBTN) }

    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>


            <View style={styles.pdfContainer}>

                <Text style={styles.font1}>
                    Daifhafias445
                 </Text>
                <View>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

                        {
                            toggleBTN ?
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // checkPermission()
                                            _toggleLoader()
                                        }}
                                        style={{
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginRight: 5
                                        }}>
                                        <DownloadSvg />
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <TouchableOpacity onPress={_toggleLoader}>
                                        <ImageLoader toggleBTN={!toggleBTN} raduis={14} percentage={30} color={Colors.WHITE} />
                                    </TouchableOpacity>
                                </View>


                        }
                    </View>
                </View>
            </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(PdfDocument);

const styles = StyleSheet.create({

    flex1: {
        flexDirection: "row",
        alignItems: "center"
    },
    flex2: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    likeStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        paddingVertical: 11,
        width: 80,
        backgroundColor: "#cc4b3750",
        marginRight: 20
    },
    commentStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        paddingVertical: 11,
        width: 80,
        backgroundColor: "#ffae0050"
    },

    //font

    font1: {
        fontSize: 16,
        fontFamily: Fonts.SEMIBOLD,
        color: Colors.JUNGLE_BLACK
    },
    font2: {
        fontSize: 16,
        fontFamily: Fonts.SEMIBOLD,
        color: Colors.JUNGLE_BLACK,
        marginRight: 7
    },
    font3: {
        fontSize: 12,
        fontFamily: Fonts.SEMIBOLD,
        color: "#97979990"
    },
    font4: {
        fontSize: 14,
        fontFamily: Fonts.REGULAR,
        color: Colors.JUNGLE_BLACK
    },
    font5: {
        fontSize: 16,
        fontFamily: Fonts.BOLD,
        color: Colors.ALERT,
        marginLeft: 5
    },
    font6: {
        fontSize: 16,
        fontFamily: Fonts.BOLD,
        color: Colors.WARNING,
        marginLeft: 5
    },

    pdfContainer: {
        height: 40,
        width: SCREEN_WIDTH / 1.9,
        borderRadius: 5,
        backgroundColor: Colors.PRIMARY,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10
    }
})
