
import React from 'react'
import { FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FeedCard from '../../components/FeedCard/FeedCard';
import { styles } from "./DeepLinkStyle"
import { feedsPostdata } from "../../components/DummyData/DummyDataScreen"
import { Colors, Constants, Fonts, Server } from '../../global';
import AddButton from '../../components/AddButton/AddButton';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Header from '../../components/Header/Header';
import { connect } from 'react-redux';



import HeartUnFillSvg from "../../assets/svg/InterestIconFilled"
import UnHeartUnFillSvg from "../../assets/svg/InterestIcon"
import LikedSvg from "../../assets/svg/like - filled"
import UnLikedSvg from "../../assets/svg/like - unfilled"
import CommentSvg from "../../assets/svg/comment.svg"
import CaptionSvg from "../../assets/svg/caption.svg";
import MoreVertical from "../../assets/svg/more-vertical1.svg";
import Report from "../../assets/svg/Report.svg";
import { SCREEN_WIDTH } from '../../global/constants';
import moment from 'moment'
import Carousel, {
    Pagination
} from 'react-native-x-carousel';
import axios from 'axios'
// import YoutubePlayer from "react-native-youtube-iframe"
import YouTubePlayer from "react-native-youtube-sdk";
import { getService } from '../../services/getService';
// import ReportModal from '../../components/ReportModal/ReportModal';


const DeepLinkScreen = ({ navigation, route, params, headerName, userId }) => {

    // usestate 
    const [commonPosts, setCommonPosts] = React.useState(null)
    const [refreshing, setRefreshing] = React.useState(false);
    const [commentCount, setCommentCount] = React.useState(0)
    const [likeCount, setLikeCount] = React.useState(0)
    const [heart, setHeart] = React.useState(false);
    const [isLiked, setIsLiked] = React.useState(false)




    const getCommonPosts1 = async () => {

        // const response = await axios.get(`${Server.BASE_URL}/posts/${route.params.postId}`)
        // setLikeCount(response.data.likeCount)
        // setCommentCount(response.data.commentCount)
        // setCommonPosts(response.data)

        const req = `/posts/${route.params.postId}`
        getService(req).then((response) => {
            setLikeCount(response.data.likeCount)
            setCommentCount(response.data.commentCount)
            setCommonPosts(response.data)
        })
    }
    const renderItem = (data) => {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                // onPress={() => navigation.navigate(ScreenNames.POSTIMAGE_SCREEN, { image: item.postImage, postId: item.postId })}
                style={{
                    width: Constants.SCREEN_WIDTH - 40,
                    height: (Constants.SCREEN_WIDTH - 40) / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: "hidden"
                }}
            >
                <Image
                    source={{ uri: `${Server.BASE_URL}/posts/${commonPosts && commonPosts.postId}/${data}/postImage` }}
                    style={{
                        width: "100%",
                        height: "100%", borderRadius: 20
                    }} />
            </TouchableOpacity>
        )
    }



    React.useEffect(() => {
        getCommonPosts1()
    }, [])
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <View style={styles.headerstyle}>
                <Header name={"Post Details"} backgroundColor={true} />
            </View>
            {
                commonPosts
                &&
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                    />}
                >

                    {/*  */}
                    <View style={{ backgroundColor: Colors.WHITE }}>
                        <View style={{ marginHorizontal: 20 }}>

                            <View style={[styles.flex2, { marginBottom: 10, marginTop: 10, }]}>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    // onPress={gotoMemberDetail}
                                    style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Image source={{ uri: `${Server.BASE_URL}/users/${commonPosts && commonPosts.userId}/${commonPosts && commonPosts.thumbnailImage}/thumbnailImage` }} style={{ height: 40, width: 40, borderRadius: 50, marginRight: 10 }} />
                                    <View>

                                        <Text style={styles.font1}>{commonPosts && commonPosts.username}</Text>
                                        <Text style={styles.font3}>{moment(commonPosts && commonPosts.updatedDate).startOf('minutes').fromNow()}</Text>
                                    </View>
                                </TouchableOpacity>
                                <View>
                                    <TouchableOpacity
                                        // onPress={() => setReport(!report)}
                                        activeOpacity={0.7} style={{ marginBottom: 3, flexDirection: "row-reverse" }}>
                                        <MoreVertical />
                                    </TouchableOpacity>


                                    {/* <TouchableOpacity
                                    // onPress={() => _toggleReasonReport()}
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
                                </TouchableOpacity> */}

                                </View>
                            </View>
                            {/* </View> */}
                            <View>
                                {
                                    commonPosts && commonPosts.postImage.length > 0
                                    &&
                                    <Carousel
                                        pagination={Pagination}
                                        renderItem={renderItem}
                                        // autoplay={true}
                                        data={commonPosts.postImage}
                                    />
                                }
                            </View>
                            {
                                commonPosts && commonPosts.postUrl.length > 0 ?
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
                                            videoId={commonPosts && commonPosts.postUrl}
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
                                    <Text style={styles.font4}>{commonPosts && commonPosts.description}</Text>
                                </View>
                            </View>

                            <View style={[styles.flex1, { marginVertical: 10, marginBottom: 20 }]}>
                                <View
                                    style={styles.likeStyle}>
                                    <TouchableOpacity
                                        hitSlop={{ top: 15, bottom: 15, left: 20, right: 10 }}
                                        // onPress={addPostTolike} 
                                        style={{ marginTop: -3, marginRight: 7 }}>
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
                                    // onPress={_toggleLikeModal}
                                    >
                                        <Text style={styles.font5}>{likeCount}</Text>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    // onPress={() => navigation.navigate(ScreenNames.COMMENTS_SCREEN, { commentCount, setCommentCount, postId: commonPosts.postId })}
                                    style={styles.commentStyle}>
                                    <View style={{ marginRight: 7 }}>
                                        <CommentSvg />
                                    </View>
                                    <Text style={styles.font6}>{commentCount}</Text>
                                </TouchableOpacity>


                                <TouchableOpacity
                                    disabled={true}
                                    activeOpacity={heart ? 1 : 0.5}
                                    // onPress={toggleCustomAlertVisibility1}
                                    style={[styles.commentStyle, { marginLeft: 20, backgroundColor: "#93c57299" }]}>
                                    {
                                        heart ?
                                            <HeartUnFillSvg />
                                            :
                                            <UnHeartUnFillSvg />
                                    }
                                </TouchableOpacity>


                            </View>

                            <View style={{ backgroundColor: Fonts.BORDERCOLOR, height: 1, marginBottom: 20 }} ></View>




                        </View>

                    </View>
                    {/*  */}
                </ScrollView>

            }
        </View >
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

export default connect(mapStateToProps, mapDispatchToProps)(DeepLinkScreen)