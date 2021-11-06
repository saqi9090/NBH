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
import { BASE_URL } from '../../global/server';
import { getService } from '../../services/getService';
import { SCREEN_HEIGHT } from '../../global/constants';

const FollowingMemberModal = ({ _toggleFollowingModal, following, userId }) => {

    const [memberState, setMemberState] = React.useState(false)

    const toggleMemberState = () => { setMemberState(!memberState) }

    //function

    const navigation = useNavigation()
    const gotoMemberDetail = (data) => {
        navigation.navigate(ScreenNames.NBHMEMBERDETAIL_SCREEN, {
            userId: data.userId,
        })
    }

    const [followingMem, setFollowingMem] = React.useState(null)

    const FollowingMember = async () => {

        const req = `/users/getFollowing/${userId}`
        getService(req).then((response) => {
            if (response.code == 200) {
                setFollowingMem(response.data)
            } else {
                console.log(response.message)
            }
        })

    }

    // const updateFollowing = async () => {
    //     if (memberState) {
    //         const response = await axios.put(`${BASE_URL}/users/addFollowing/${userId}/${data.userId}`)
    //         console.warn("response", response.data);
    //         setFollowingMem(response.data)
    //     } else {
    //         FollowingMember()
    //     }

    // }

    return (

        <Modal
            onShow={FollowingMember}
            animationType={'fade'}
            visible={following}
            // onRequestClose={toggleModal}
            transparent={true}
        // statusBarTranslucent={true}
        >
            <View style={styles.modalContainer}>

                <KeyboardAvoidingView behavior={Platform.OS == "android" ? null : "padding"}>
                    <View style={styles.confirmContainer}>
                        <View style={styles.confirmHeader}>
                            <Text style={styles.confirmDeliveryText}
                                maxFontSizeMultiplier={1}>Following Members</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    _toggleFollowingModal()
                                }}
                                hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
                            // style={styles.closeButton}
                            >
                                <CrossSvg />
                            </TouchableOpacity>
                        </View>

                        <FlatList data={followingMem}
                            style={{ marginHorizontal: 20, marginVertical: 10 }}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <FFBMembers
                                    FollowingMember={FollowingMember}
                                    gotoMemberDetail={gotoMemberDetail}
                                    _toggleModal={_toggleFollowingModal}
                                    data={item}
                                    toggleMemberState={toggleMemberState}
                                    memberState={memberState}
                                    edit={1}
                                    getAllMemberData={FollowingMember}
                                    setData={setFollowingMem}
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

export default connect(mapStateToProps, mapDispatchToProps)(FollowingMemberModal);

// export default FollowingMemberModal;

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
