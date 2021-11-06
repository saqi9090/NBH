import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import FocusAwareStatusBar from '../FocusAwareStatusBar';
// import LocationSvg from "../../assets/svg/location4.svg"
import HeartUnFillSvg from "../../assets/svg/InterestIconFilled"
import UnHeartUnFillSvg from "../../assets/svg/InterestIcon"
import LikedSvg from "../../assets/svg/like - filled"
import UnLikedSvg from "../../assets/svg/like - unfilled"
import CommentSvg from "../../assets/svg/comment.svg"
import CaptionSvg from "../../assets/svg/caption.svg";
import MoreVertical from "../../assets/svg/more-vertical1.svg";
import Report from "../../assets/svg/Report.svg";
import ReportModal from '../../components/ReportModal/ReportModal';
import LikesModal from '../../components/LikesModal/LikesModal'
import { Colors, Constants, Fonts, ScreenNames, Server } from '../../global';
import { SCREEN_WIDTH } from '../../global/constants';
import { useNavigation } from '@react-navigation/core'
import moment from 'moment'
import Carousel, {
    Pagination
} from 'react-native-x-carousel';
import axios from 'axios'
import { connect } from 'react-redux'
// import YoutubePlayer from "react-native-youtube-iframe"
import YouTubePlayer from "react-native-youtube-sdk";
import CustomAlert from '../../components/CustomAlert/CusomAlert';
import { PutService } from '../../services/PutService'
import { postRequest } from '../../services/postService'
import { deleteService } from '../../services/deleteService'


const FeedCard = ({ item, heartShow, userId, name, userImage, flag }) => {

    //state
    const [heart, setHeart] = React.useState(item.favourite);
    const [report, setReport] = React.useState(false);
    const [isLiked, setIsLiked] = React.useState(item.liked)
    const [likeCount, setLikeCount] = React.useState(item.likeCount)
    const [commentCount, setCommentCount] = React.useState(item.commentCount)
    const [likes, setlikes] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [reasonreport, setReasonreport] = React.useState(false);
    const [youtube, setYoutube] = React.useState(false);

    const [alertText, setAlertText] = React.useState('');

    const [reasonId, setReasonId] = React.useState([])
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false);
    const [customAlertVisible1, setCustomAlertVisible1] = React.useState(false);


    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
    const toggleCustomAlertVisibility1 = () => { setCustomAlertVisible1(!customAlertVisible1) }


    const leftButtonFunction = () => {

        toggleCustomAlertVisibility()
    }
    const leftButtonFunction1 = () => {

        toggleCustomAlertVisibility1()
    }

    //function
    const toggleYoutube = () => {
        setYoutube(!youtube)
    }
    const navigation = useNavigation()
    const _toggleReport = () => {
        setReport(!report)
    }

    const _toggleReasonReport = () => {
        setReasonreport(!reasonreport)
    }

    const _toggleLikeModal = () => {
        setlikes(!likes)
    }

    const gotoMemberDetail = () => {
        navigation.navigate(ScreenNames.NBHMEMBERDETAIL_SCREEN, { userId: item.userId })
    }

    const addPostTolike = async () => {
        if (isLiked) {
            setLoading(true)
            setIsLiked(false)
            setLikeCount(likeCount - 1)
            setLoading(false)
            // await axios.delete(`${Server.BASE_URL}/posts/removeLike/${item.postId}/${userId}`)
            const deletereq = `/posts/removeLike/${item.postId}/${userId}`
            deleteService(deletereq).then((response) => {
                if (response.code == 200) {

                } else {
                    setAlertText(response.message)
                    toggleCustomAlertVisibility()
                }
            })
        } else {
            setLoading(true)
            setIsLiked(true)
            setLikeCount(likeCount + 1)
            setLoading(false)
            // await axios.put(`${Server.BASE_URL}/posts/addLike/${item.postId}/${userId}/${name}/${userImage}`)

            const uri = `/posts/addLike/${item.postId}/${userId}/${name}/${userImage}`
            const body = null
            PutService(uri, body).then((response) => {
                if (response.code == 200) {

                } else {
                    setAlertText(response.message)
                    toggleCustomAlertVisibility()
                }
            })

        }
    }

    const renderItem = (data) => {

        console.warn("data", data);
        console.warn("item", item);

        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate(ScreenNames.POSTIMAGE_SCREEN, { image: item.postImage, postId: item.postId, postSize: item.postSize })}
                style={{
                    width: Constants.SCREEN_WIDTH - 40,
                    height: item.postSize / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: "hidden"
                }}
            >
                <Image
                    source={{ uri: `${Server.BASE_URL}/posts/${item.postId}/${data}/postImage` }}
                    resizeMode="stretch"
                    style={{
                        width: "100%",
                        height: "100%", borderRadius: 20
                    }} />
            </TouchableOpacity>
        )
    }

    const markAsInterest = async () => {
        try {

            if (heart) {
                null
            } else {
                setHeart(!heart)
                toggleCustomAlertVisibility1()
                const uri = `/users/addInterestedPost/userId/${userId}/postId/${item.postId}`
                const body = null
                postRequest(uri, body).then((response) => {
                    if (response.code == 200) {

                    } else {
                        setAlertText(response.message)
                        toggleCustomAlertVisibility()
                    }
                })

            }

        } catch (error) {
            console.warn(error.message);
        }
    }

    return (
        <View style={{ backgroundColor: Colors.WHITE }}>
            <View style={[styles.flex2, { marginBottom: 10, marginTop: 10 }]}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={gotoMemberDetail}
                    style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={{ uri: `${Server.BASE_URL}/users/${item.userId}/${item.thumbnailImage}/thumbnailImage` }} style={{ height: 40, width: 40, borderRadius: 50, marginRight: 10 }} />
                    <View>

                        <Text style={styles.font1}>{item.username}</Text>
                        <Text style={styles.font3}>{moment(item.updatedDate).startOf('minutes').fromNow()}</Text>
                    </View>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity
                        onPress={() => setReport(!report)}
                        activeOpacity={0.7} style={{ marginBottom: 3, flexDirection: "row-reverse" }}>
                        <MoreVertical />
                    </TouchableOpacity>

                    {
                        report == true ?
                            <TouchableOpacity
                                onPress={() => _toggleReasonReport()}
                                activeOpacity={0.7} style={{
                                    position: "absolute",
                                    right: 10,
                                    top: 17,
                                    flexDirection: "row", alignItems: "center", height: 28, width: 79, borderRadius: 10, shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.22,
                                    shadowRadius: 2.22,

                                    elevation: 2, backgroundColor: Colors.WHITE, justifyContent: "center",
                                }}>
                                <Text style={[styles.font2, { marginTop: 2, fontSize: 12 }]}>Report</Text>
                                <Report />
                            </TouchableOpacity>
                            :
                            null

                    }
                </View>
            </View>
            {/* </View> */}
            <View>
                {
                    item.postImage.length > 0
                    &&
                    <Carousel
                        pagination={Pagination}
                        renderItem={renderItem}
                        // autoplay={true}
                        data={item.postImage}
                    />
                }

                {/* {

                    heartShow == true ?
                        <TouchableOpacity
                            style={{ position: "absolute", right: 20, top: 20, height: 25, width: 25, alignItems: "center", justifyContent: "center", zIndex: 100 }}
                            onPress={toggleCustomAlertVisibility1}>
                            {
                                heart ?
                                    <HeartUnFillSvg />
                                    :
                                    <UnHeartUnFillSvg />
                            }
                        </TouchableOpacity>
                        :
                        null
                } */}

            </View>
            {
                item.postUrl.length > 0 ?
                    // <TouchableOpacity style={{ borderRadius: 20, overflow: "hidden" }}>
                    //     <YoutubePlayer
                    //         play={youtube}
                    //         // style={{ backgroundColor: "red" }}
                    //         height={210}
                    //         width={SCREEN_WIDTH - 40}
                    //         videoId={item.postUrl[0]}
                    //     />
                    // </TouchableOpacity>
                    <View style={{ borderRadius: 20, overflow: "hidden", zIndex: 0 }}>

                        <YouTubePlayer
                            // ref={youTubePlayer}
                            videoId={item.postUrl}
                            autoPlay={false}
                            fullscreen={false}
                            showFullScreenButton={true}
                            showSeekBar={true}
                            showPlayPauseButton={true}
                            // startTime={5}
                            style={{ width: SCREEN_WIDTH - 40, height: 210, borderRadius: 20 }}
                            onReady={e => console.log("onReady", e.type)}
                            onError={e => console.log("onError", e.error)}
                            onChangeState={e => console.log("onChangeState", e.state)}
                            onChangeFullscreen={e => console.log("onChangeFullscreen", e.isFullscreen)}
                        />
                    </View>
                    :
                    null
            }




            <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 10 }}>
                <CaptionSvg />
                <View style={{ width: SCREEN_WIDTH - 60, marginLeft: 5 }}>
                    <Text style={styles.font4}>{item.description}</Text>
                </View>
            </View>

            <View style={[styles.flex1, { marginVertical: 10, marginBottom: 20 }]}>
                <View
                    style={styles.likeStyle}>
                    <TouchableOpacity
                        hitSlop={{ top: 15, bottom: 15, left: 20, right: 10 }}
                        onPress={addPostTolike} disabled={loading} style={{ marginTop: -3, marginRight: 7 }}>
                        {
                            isLiked
                                ?
                                <LikedSvg />
                                :
                                <UnLikedSvg />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        hitSlop={{ top: 15, bottom: 15, left: 10, right: 20 }}
                        onPress={_toggleLikeModal}
                    >
                        <Text style={styles.font5}>{likeCount}</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate(ScreenNames.COMMENTS_SCREEN, { commentCount, setCommentCount, postId: item.postId })}
                    style={styles.commentStyle}>
                    <View style={{ marginRight: 7 }}>
                        <CommentSvg />
                    </View>
                    <Text style={styles.font6}>{commentCount}</Text>
                </TouchableOpacity>

                {

                    heartShow == true ?
                        <TouchableOpacity
                            disabled={heart ? true : false}
                            activeOpacity={heart ? 1 : 0.5}
                            onPress={toggleCustomAlertVisibility1}
                            style={[styles.commentStyle, { marginLeft: 20, backgroundColor: "#93c57299" }]}>
                            {
                                heart ?
                                    <HeartUnFillSvg />
                                    :
                                    <UnHeartUnFillSvg />
                            }
                        </TouchableOpacity>

                        :
                        null

                }
            </View>

            <View style={{ backgroundColor: Fonts.BORDERCOLOR, height: 1, marginBottom: 20 }} ></View>


            <ReportModal heartShow={heartShow} reasonreport={reasonreport}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility}
                setAlertText={setAlertText}
                _toggleReasonReport={_toggleReasonReport}
                _toggleReport={_toggleReport} setReasonId={setReasonId} reasonId={reasonId}
                postId={item.postId} />

            <CustomAlert
                title={"Alert"}
                // desc={"Thanks for letting us know. If we find any violation of content policy, we will take appropriate action"}
                desc={alertText}
                leftButtonText={"Ok"}
                leftButtonFunction={leftButtonFunction}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility}
                customAlertVisible={customAlertVisible}
            />
            <CustomAlert
                title={"Alert"}
                // desc={"Thanks for letting us know. If we find any violation of content policy, we will take appropriate action"}
                desc={"Are you sure you want to mark as interest. You will not be able to Undo once marked as interest."}
                leftButtonText={"No"}
                rightButtonText={"Yes"}
                leftButtonFunction={leftButtonFunction1}
                rightButtonFunction={markAsInterest}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility1}
                customAlertVisible={customAlertVisible1}
            />


            <LikesModal
                _toggleLikeModal={_toggleLikeModal} likes={likes}
                postId={item.postId} />


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

export default connect(mapStateToProps, mapDispatchToProps)(FeedCard);

const styles = StyleSheet.create({

    flex1: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
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
        color: Colors.JUNGLE_BLACK,
        width: Constants.SCREEN_WIDTH / 1.5
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
})
