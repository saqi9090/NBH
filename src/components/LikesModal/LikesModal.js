import { View, Text, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, TextInput, FlatList, Image } from 'react-native'
import { styles } from "./LikesModalStyles";
import React from 'react'
import { Colors, Fonts, ScreenNames, Server } from '../../global';
import DropdownSvg from "../../assets/svg/dropdown.svg"
import FocusAwareStatusBar from '../FocusAwareStatusBar';
import CrossSvg from "../../assets/svg/cross.svg"
import { feedsSaveddata, quickLinkData } from '../DummyData/DummyDataScreen';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import { connect } from 'react-redux';
import { getService } from '../../services/getService';
import { SCREEN_WIDTH } from '../../global/constants';

const LikesModal = ({ _toggleLikeModal, likes, postId, userId }) => {

    //function



    const [getLike, setGetLike] = React.useState(null)

    const GetLike = async () => {

        // const a = [
        //     {
        //         "userName" : "dfsdfds"
        //     },
        //     {
        //         "userName" : "dfsdfds"
        //     },
        //     {
        //         "userName" : "dfsdfds"
        //     },
        //     {
        //         "userName" : "dfsdfds"
        //     },
        //     {
        //         "userName" : "dfsdfds"
        //     },
        //     {
        //         "userName" : "dfsdfds"
        //     },
        //     {
        //         "userName" : "dfsdfds"
        //     },
        //     {
        //         "userName" : "dfsdfds"
        //     },
        //     {
        //         "userName" : "dfsdfds"
        //     },
        //     {
        //         "userName" : "dfsdfds"
        //     },

        // ] 
        const req = `/posts/likes/postId/${postId}`
        getService(req).then((response) => {
            if (response.code == 200) {
                setGetLike(response.data)
            } else {
                console.log(response.message)
            }
        })
    }


    const navigation = useNavigation()

    const gotoMemberDetail = (userId) => {
        navigation.navigate(ScreenNames.NBHMEMBERDETAIL_SCREEN, {
            userId: userId,
        })
        _toggleLikeModal()
    }
    return (

        <Modal
            onShow={GetLike}
            animationType={'fade'}
            visible={likes}
            // onRequestClose={toggleModal}
            transparent={true}
        // statusBarTranslucent={true}
        >
            <View style={styles.modalContainer}>

                <KeyboardAvoidingView behavior={Platform.OS == "android" ? null : "padding"}>
                    <View style={styles.confirmContainer}>
                        <View style={styles.confirmHeader}>
                            <Text style={styles.confirmDeliveryText}
                                maxFontSizeMultiplier={1}>Likes</Text>
                            <TouchableOpacity
                                onPress={() => _toggleLikeModal()}
                                // style={styles.closeButton}
                                hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}

                            >
                                <CrossSvg />
                            </TouchableOpacity>
                        </View>

                        <FlatList data={getLike}
                            style={{ marginHorizontal: 20, marginVertical: 10 }}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity onPress={() => gotoMemberDetail(item.userId)}>

                                    <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
                                        <Image source={{ uri: `${Server.BASE_URL}/users/${item.userId}/${item.thumbnailImage}/thumbnailImage` }} style={{ height: 50, width: 50, borderRadius: 50 }} />
                                        <View style={{ marginLeft: 20 }}>
                                            <View style={{ width: SCREEN_WIDTH / 2 }}>

                                                <Text numberOfLines={1} style={styles.font1}>{item.userName}</Text>
                                            </View>
                                            <Text style={styles.font2}>Bussiness Owner</Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            )} />


                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>

    )
}




export default LikesModal
// export default LikesModal
