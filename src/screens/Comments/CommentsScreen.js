import React from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, KeyboardAvoidingView, Platform } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Header from '../../components/Header/Header';
import PostSvg from "../../assets/svg/send message.svg"
import PostSvg1 from "../../assets/svg/send message1.svg"

import { Colors, Fonts, Server } from '../../global';
import { SCREEN_WIDTH } from '../../global/constants';
import { styles } from "./CommentsStyles"
import axios from 'axios';
import { connect } from 'react-redux';
import CustomAlert from '../../components/CustomAlert/CusomAlert';

import moment from 'moment';
import { getService } from '../../services/getService';
import { postRequest } from '../../services/postService';


const CommentsScreen = ({ route, params, userId, userImage, name }) => {
    //state 
    const [commentData, setCommentData] = React.useState([]);
    const [commentDataText, setCommentDataText] = React.useState("");
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false)
    const [alertText, setAlertText] = React.useState('');
    const [alertTitle, setAlertTitle] = React.useState("");


    //function

    const getCommentByPost = async () => {
        // const response = await axios.get(`${Server.BASE_URL}/comments/getByPostId/${route.params.postId}`)
        // setCommentData(response.data)

        const req = `/comments/getByPostId/${route.params.postId}`
        getService(req).then((response) => {
            if (response.code == 200) {
                setCommentData(response.data)
            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })
    }

    React.useEffect(() => {
        getCommentByPost()
    }, [])
    const postcomments = async () => {
        const postcomment = {
            "postId": route.params.postId,
            "userId": userId,
            "comment": commentDataText
        }
        const uri = `/comments`
        const body = postcomment
        postRequest(uri, body).then((response) => {
            if (response.code == 200) {
                let comment = { ...response.data, userImage: userImage, username: name }
                setCommentData([...commentData, comment])
                setCommentDataText("");
                route.params.setCommentCount(route.params.commentCount + 1)
            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })
    }


    //function
    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }

    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE }} behavior={Platform.OS == "android" ? null : "padding"}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <Header name={"Comments"} backgroundColor={true} />
            <View style={{ flex: 1 }}>
                {commentData.length == 0 ?
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 20, fontFamily: Fonts.BOLD, color: Colors.ONYX_60 }}>Be the First one to comment</Text>
                    </View>
                    :
                    <FlatList
                        data={commentData}
                        style={{ marginVertical: 20 }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 20, marginVertical: 10 }}>
                                <View>
                                    <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 10, paddingVertical: 5 }}>
                                        <Image source={{ uri: `${Server.BASE_URL}/users/${userId}/${item.userImage}/thumbnailImage` }} style={{ height: 20, width: 20, borderRadius: 50 }} />
                                        <View style={{ width: SCREEN_WIDTH / 1.5 - 20 }}>
                                            <Text style={[styles.font1, { marginLeft: 10 }]}>{item.username}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: SCREEN_WIDTH / 1.5 - 20 }}>
                                        <Text style={[styles.font1, { fontSize: 14, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYXOpacity }]}>{item.comment}</Text>
                                    </View>
                                </View>
                                <Text style={[styles.font1, { fontSize: 12, fontFamily: Fonts.REGULAR, color: Colors.JUNGLE_BLACK }]}>{moment(item.createdDate).startOf('minutes').fromNow()}</Text>
                            </View>
                        )}
                    />
                }


            </View>
            <View style={{
                height: 46,
                backgroundColor: Colors.WHITE,
                shadowColor: "#bababa",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 2,
                marginHorizontal: 30,
                borderRadius: 50,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20
            }}>
                <View style={{ paddingLeft: 10, }}>

                    <TextInput
                        placeholderTextColor={Colors.BLACK}

                        onChangeText={text => setCommentDataText(text)}
                        style={{ width: SCREEN_WIDTH - 120, fontFamily: Fonts.REGULAR, fontSize: 16 }}
                        placeholder="Type Comment" >
                        {commentDataText}</TextInput>
                </View>
                <TouchableOpacity
                    disabled={commentDataText.length > 0 ? false : true}
                    onPress={() => postcomments()}>
                    {commentDataText.length > 0
                        ?
                        <PostSvg />
                        :
                        <PostSvg1 />
                    }
                </TouchableOpacity>
            </View>

            <CustomAlert
                title={alertTitle}
                desc={alertText}
                leftButtonText={"Ok"}
                leftButtonFunction={leftButtonFunction}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility}
                customAlertVisible={customAlertVisible}
            />

        </KeyboardAvoidingView>
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

export default connect(mapStateToProps, mapDispatchToProps)(CommentsScreen)
