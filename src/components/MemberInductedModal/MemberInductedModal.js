import { View, Text, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, TextInput, FlatList, Image } from 'react-native'
import { styles } from "./MemberInductedModalStyles";
import React from 'react'
import { Colors, Fonts, ScreenNames, Server } from '../../global';
import DropdownSvg from "../../assets/svg/dropdown.svg"
import FocusAwareStatusBar from '../FocusAwareStatusBar';
import CrossSvg from "../../assets/svg/cross.svg"
import { feedsSaveddata, quickLinkData } from '../DummyData/DummyDataScreen';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import { connect } from 'react-redux';
import { StackActions } from '@react-navigation/native';
import { getService } from '../../services/getService';

const MemberInductedModal = ({ _toggleMemberInductedModal, memberIndicate, userId, }) => {

    const navigation = useNavigation()
    const gotoMemberDetail = (data) => {
        _toggleMemberInductedModal()
        navigation.dispatch(StackActions.push(ScreenNames.NBHMEMBERDETAIL_SCREEN, {
            userId: data.userId,
        }));
    }

    const [memberInducted, setMemberInducted] = React.useState(null)

    const MemberInducted = async () => {


        const req = `/users/getMembersIncepted/${userId}`
        getService(req).then((response) => {
            if (response.code == 200) {
                setMemberInducted(response.data)
            }
            else {
                console.log(response.message)
            }
        })

    }

    return (

        <Modal
            onShow={MemberInducted}
            animationType={'fade'}
            visible={memberIndicate}
            // onRequestClose={toggleModal}
            transparent={true}
        // statusBarTranslucent={true}
        >
            <View style={styles.modalContainer}>

                <KeyboardAvoidingView behavior={Platform.OS == "android" ? null : "padding"}>
                    <View style={styles.confirmContainer}>
                        <View style={styles.confirmHeader}>
                            <Text style={styles.confirmDeliveryText}
                                maxFontSizeMultiplier={1}>Members Inducted</Text>
                            <TouchableOpacity
                                onPress={() => _toggleMemberInductedModal()}
                                // style={styles.closeButton}
                                hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
                            >
                                <CrossSvg />
                            </TouchableOpacity>
                        </View>

                        <FlatList data={memberInducted}
                            style={{ marginHorizontal: 20, marginVertical: 10 }}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        _toggleMemberInductedModal()
                                        gotoMemberDetail(item)

                                    }} style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
                                    <Image source={{ uri: `${Server.BASE_URL}/users/${item.userId}/${item.thumbnailImage}/thumbnailImage` }} style={{ height: 50, width: 50, borderRadius: 50 }} />

                                    <View style={{ marginLeft: 20 }}>
                                        <View style={{ width: SCREEN_WIDTH / 2 }}>
                                            <Text numberOfLines={1} style={styles.font1}>{item.userName}</Text>
                                        </View>
                                        <Text style={styles.font2}>Bussiness Owner</Text>
                                    </View>

                                </TouchableOpacity>
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
});

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(mapStateToProps, mapDispatchToProps)(MemberInductedModal);
// export default
