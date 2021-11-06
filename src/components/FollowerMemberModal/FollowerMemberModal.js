import { View, Text, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, TextInput, FlatList, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Colors, Fonts, ScreenNames, Server } from '../../global';
import DropdownSvg from "../../assets/svg/dropdown.svg"
import FocusAwareStatusBar from '../FocusAwareStatusBar';
import CrossSvg from "../../assets/svg/cross.svg"
import { feedsSaveddata, quickLinkData } from '../DummyData/DummyDataScreen';
import FFBMembers from "../FFBMembers/FFBMembers"
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import { connect } from 'react-redux';
import { getService } from '../../services/getService';
import { SCREEN_HEIGHT } from '../../global/constants';

const FollowerMemberModal = ({ _toggleFollowerModal, follower, userId }) => {

    const [memberState, setMemberState] = React.useState(false)

    const toggleMemberState = () => { setMemberState(!memberState) }
    //function

    const navigation = useNavigation()
    const gotoMemberDetail = (data) => {
        navigation.navigate(ScreenNames.NBHMEMBERDETAIL_SCREEN, {
            userId: data.userId,
        })
    }
    const [followerMem, setFollowerMem] = React.useState(null)

    const FollowerMember = async () => {


        // const response = await axios.get(`${Server.BASE_URL}/users/getFollowers/${userId}`);
        // setFollowerMem(response.data)

        // const a = [
        //     {

        //         userName: "asdfasdfasdf"
        //     },
        //     {

        //         userName: "asdfasdfasdf"
        //     },
        //     {

        //         userName: "asdfasdfasdf"
        //     },

        //     {

        //         userName: "asdfasdfasdf"
        //     },
        //     {

        //         userName: "asdfasdfasdf"
        //     },
        //     {

        //         userName: "asdfasdfasdf"
        //     },

        //     {

        //         userName: "asdfasdfasdf"
        //     },

        //     {

        //         userName: "asdfasdfasdf"
        //     },
        //     {

        //         userName: "asdfasdfasdf"
        //     },
        // ]

        // setFollowerMem(a)

        const req = `/users/getFollowers/${userId}`
        getService(req).then((response) => {
            if (response.code == 200) {
                setFollowerMem(response.data)
            } else {
                console.log(response.message)

            }
        })

    }

    return (
        <Modal
            onShow={FollowerMember}
            animationType={'fade'}
            visible={follower}
            // onRequestClose={toggleModal}
            transparent={true}
        // statusBarTranslucent={true}
        >
            <View style={styles.modalContainer}>

                <KeyboardAvoidingView behavior={Platform.OS == "android" ? null : "padding"}>
                    <View style={styles.confirmContainer}>
                        <View style={styles.confirmHeader}>
                            <Text style={styles.confirmDeliveryText}
                                maxFontSizeMultiplier={1}>Follower</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    _toggleFollowerModal()

                                }}
                                hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
                            // style={styles.closeButton}
                            >
                                <CrossSvg />
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={followerMem}
                            style={{ marginHorizontal: 20, marginVertical: 10 }}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <FFBMembers
                                    gotoMemberDetail={gotoMemberDetail}
                                    _toggleModal={_toggleFollowerModal}
                                    data={item}
                                    toggleMemberState={toggleMemberState}
                                    memberState={memberState}
                                    edit={0}
                                    getAllMemberData={FollowerMember}
                                    setData={setFollowerMem}

                                />
                            )} />
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>

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

export default connect(mapStateToProps, mapDispatchToProps)(FollowerMemberModal);
// export default FollowerMemberModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#00000050',
        justifyContent: 'flex-end'
    },
    confirmContainer: {
        // flex: 0.25,
        backgroundColor: Colors.WHITE,
        paddingBottom: 20,
        height: SCREEN_HEIGHT / 2
    },
    confirmHeader: {
        backgroundColor: Colors.PRIMARY,
        flexDirection: 'row',
        height: 66,
        justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal: 20
    },
    confirmDeliveryText: {
        // paddingLeft: 20,
        paddingTop: 15,
        paddingBottom: 15,
        fontFamily: Fonts.SEMIBOLD,
        fontSize: Fonts.SIZE_18,
        color: Colors.JUNGLE_BLACK,
        letterSpacing: 0.2,

    },


})
