import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FocusAwareStatusBar from '../FocusAwareStatusBar';
import EditIcon from "../../assets/svg/edit.svg";
import Delete from "../../assets/svg/Delete.svg";
import HeartSvg from "../../assets/svg/like - heart.svg"
import CommentSvg from "../../assets/svg/comment.svg"
import CaptionSvg from "../../assets/svg/caption.svg";
import { Colors, Constants, Fonts, ScreenNames, Server } from '../../global';
import { SCREEN_WIDTH } from '../../global/constants';
import AddButton from '../AddButton/AddButton';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import moment from 'moment';
import Carousel, {
     Pagination
} from 'react-native-x-carousel';
import YouTubePlayer from "react-native-youtube-sdk";
// import YoutubePlayer from "react-native-youtube-iframe"
import axios from 'axios';
import { deleteService } from '../../services/deleteService';
import CustomAlert from '../CustomAlert/CusomAlert';





const MyTimeLine = ({ item, getTimeLineById }) => {



     //state

     const [heart, setHeart] = React.useState(false);
     const [youtube, setYoutube] = React.useState(false);
     const [videoPlaystate, setVideoPlaystate] = React.useState("");
     const [alertTitle, setAlertTitle] = React.useState("");
     const [alertText, setAlertText] = React.useState('');
     const [customAlertVisible, setCustomAlertVisible] = React.useState(false);


     //ref
     const youTubePlayer = React.useRef(null);

     //function
     const toggleYoutube = React.useCallback(() => {
          setYoutube((prev) => !prev)
     }, []);

     const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
     const leftButtonFunction = () => {
          toggleCustomAlertVisibility()
     }


     const navigation = useNavigation()
     const gotoAddPost = () => {
          navigation.navigate(ScreenNames.ADDPOST_SCREEN, { HeaderName: "Edit Post", getTimeLineById: getTimeLineById, postId: item.postId, Edit: 1, MyTimeLine: MyTimeLine })
     }


     const renderItem = (data) => {
          return (

               <TouchableOpacity
                    activeOpacity={0.9}
                    key={`${data}`}
                    onPress={() => navigation.navigate(ScreenNames.POSTIMAGE_SCREEN, { image: item.postImage, postId: item.postId })}
                    style={{
                         width: Constants.SCREEN_WIDTH - 40,
                         height: item.postSize / 2,
                         borderRadius: 20,
                         alignItems: 'center',
                         justifyContent: 'center',
                         overflow: "hidden"
                    }}
               >
                    <Image source={{ uri: `${Server.BASE_URL}/posts/${item.postId}/${data}/postImage` }}
                         resizeMode="stretch"
                         style={{
                              width: "100%",
                              height: "100%", borderRadius: 20
                         }} />
               </TouchableOpacity>
          )
     }

     const deletePost = async () => {

          const deletereq = `/posts/${item.postId}`
          deleteService(deletereq).then((response) => {
               if (response.code == 200) {
                    getTimeLineById()
               } else {
                    setAlertTitle("Alert")
                    setAlertText(response.message)
                    toggleCustomAlertVisibility()
               }
          })

     }

     return (
          <View style={{ backgroundColor: Colors.WHITE }}>
               <View style={[styles.flex2, { marginBottom: 10, marginTop: 10 }]}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                         <Image source={{ uri: `${Server.BASE_URL}/users/${item.userId}/${item.thumbnailImage}/thumbnailImage` }} style={{ height: 50, width: 50, borderRadius: 50, marginRight: 10 }} />
                         <View>
                              <Text style={styles.font1}>{item.username}</Text>
                              <Text style={styles.font3}>{moment(item.createdDate).format('YYYY-MM-DD')}</Text>
                         </View>
                    </View>

               </View>
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
               {
                    item.postUrl
                         &&
                         item.postUrl.length > 0 ?
                         // <TouchableOpacity 
                         // activeOpacity={0.9}
                         // onPress={toggleYoutube} style={{ borderRadius: 20, overflow: "hidden" }}>
                         // <YoutubePlayer
                         //      play={youtube}
                         //      // style={{ backgroundColor: "red" }}
                         //      height={210}
                         //      width={SCREEN_WIDTH - 40}
                         //      videoId={item.postUrl && item.postUrl[0]}
                         // />
                         // </TouchableOpacity>
                         // <TouchableOpacity 
                         // // style={{ borderRadius: 20,height:210,width:SCREEN_WIDTH - 40}}
                         //  onPress={() => youTubePlayer.current.play()}>
                         <View
                              style={{ borderRadius: 20, overflow: "hidden" }}
                         >

                              <YouTubePlayer
                                   ref={youTubePlayer}
                                   videoId={item.postUrl}
                                   fullscreen={false}
                                   showFullScreenButton={true}
                                   showPlayPauseButton={true}
                                   style={{ width: SCREEN_WIDTH - 40, height: 210, borderRadius: 20 }}

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
                    <TouchableOpacity style={styles.likeStyle}
                         onPress={deletePost}>
                         <Delete />
                         <Text style={styles.font5}>Delete</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                         onPress={gotoAddPost}
                         style={styles.commentStyle}>
                         <EditIcon />
                         <Text style={styles.font6} >Edit</Text>
                    </TouchableOpacity>
               </View>

               <View style={{ backgroundColor: Fonts.BORDERCOLOR, height: 1, marginBottom: 20 }} ></View>



               <CustomAlert
                    title={alertTitle}
                    desc={alertText}
                    leftButtonText={"Ok"}
                    leftButtonFunction={leftButtonFunction}
                    toggleCustomAlertVisibility={toggleCustomAlertVisibility}
                    customAlertVisible={customAlertVisible}
               />

          </View>
     )
}

export default MyTimeLine

const styles = StyleSheet.create({
     flex1: {
          flexDirection: "row",
          alignItems: "center"
     },
     flex2: {
          flexDirection: "row",
          justifyContent: "space-between"
     },
     likeStyle: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 10,
          paddingVertical: 11,
          width: 90,
          backgroundColor: "#ff292925",
          marginRight: 20,
          paddingHorizontal: 10

     },
     commentStyle: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          borderRadius: 10,
          paddingVertical: 11,
          width: 90,
          backgroundColor: "#4484fd25",
          paddingHorizontal: 15
     },

     //font

     font1: {
          fontSize: 16,
          fontFamily: Fonts.SEMIBOLD,
          color: Colors.JUNGLE_BLACK
     },
     font2: {
          fontSize: 12,
          fontFamily: Fonts.SEMIBOLD,
          color: Colors.JUNGLE_BLACK,
          marginRight: 7
     },
     font3: {
          fontSize: 12,
          fontFamily: Fonts.SEMIBOLD,
          color: "#97979999"
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
          color: "#0166ff",
          marginLeft: 5
     },

})
