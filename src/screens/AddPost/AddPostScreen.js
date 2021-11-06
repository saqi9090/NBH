import React from 'react'
import { Alert, FlatList, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors, Fonts, ScreenNames, Server } from '../../global';
import { styles } from "./AddPostStyles";
import Headers from "../../components/Header/Header";
import UploadSvg from "../../assets/svg/upload.svg"
import LikesModal from '../../components/LikesModal/LikesModal';
import CrossSvg from "../../assets/svg/crossSmall.svg";
import ImagePicker from 'react-native-image-crop-picker';
import { SCREEN_WIDTH } from '../../global/constants';
import EditProfileModal from '../../components/EditProfileModal/EditProfileModal';
import CustomAlert from '../../components/CustomAlert/CusomAlert';
import axios from 'axios';
import { connect } from 'react-redux';
import { BASE_URL } from '../../global/server';
import RadioButton from '../../components/RadioButton/RadioButton';
import ModalSelectPostSize from '../../components/ModalSelectPostSize/ModalSelectPostSize';
import { PutService } from '../../services/PutService';
import { getService } from '../../services/getService';
import { postRequest } from '../../services/postService';
import { deleteService } from '../../services/deleteService';


const AddPostScreen = ({ navigation, HeaderName, route, params, userId, name, userImage }) => {

    //varible

    const radioData = [
        {
            id: 0,
            RadioName: "Image"
        },
        {
            id: 1,
            RadioName: "Video"
        },

    ]


    //state
    const [likes, setLikes] = React.useState(false)
    const [addPostImage, setAddPostImage] = React.useState([]);
    const [uploadImagePicker, setUploadImagePicker] = React.useState(false)
    const [id, setId] = React.useState(0);
    const [description, setDescription] = React.useState("")
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false);
    const [customAlertVisible1, setCustomAlertVisible1] = React.useState(false);
    const [getImage, setImage] = React.useState(``);
    const [radioId, setRadioId] = React.useState(0);
    const [postUrl, setPostUrl] = React.useState(null);
    const [recentImages, setRecentImages] = React.useState([]);
    const [recentPostUrl, setRecentRecentPostUrl] = React.useState('');
    const [selectedRecentImage, setSelectedRecentImage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const imageHeightRatio = [900, 480, 1034];
    const [imageRatioIndex, setImageRatioIndex] = React.useState(null);
    const [isAspectRatioModal, setAspectRatioModal] = React.useState(false);
    const [imageHeight, setImageHeight] = React.useState(false);
    const [alertTitle, setAlertTitle] = React.useState("");




    const refTextInput = React.useRef()

    //function

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
    const toggleCustomAlertVisibility1 = () => { setCustomAlertVisible1(!customAlertVisible1) }

    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }
    const leftButtonFunction1 = () => {
        toggleCustomAlertVisibility1()
    }
    const toggleAspectRatioModal = () => {
        setAspectRatioModal(!isAspectRatioModal)
    }







    const openCamera = async () => {
        try {
            let value2 = await ImagePicker.openCamera({
                width: 900,
                height: route.params.Edit == 1 ? imageHeight : imageHeightRatio[imageRatioIndex],
                cropping: true,
                compressImageMaxHeight: imageHeightRatio[imageRatioIndex],
                compressImageMaxWidth: 487,
                compressImageQuality: 1
            }).then(image => {
                setAddPostImage([...addPostImage, {
                    imagePath: image.path,
                    imageMime: image.mime,
                    id: id
                }])

            });
            setId(id + 1)
            _toggleUploadImage()
        }
        catch (error) {
            console.log(error);
        }
    }


    const openLibrary = async () => {
        try {

            let value = await ImagePicker.openPicker({
                width: 900,
                height: route.params.Edit == 1 ? imageHeight : imageHeightRatio[imageRatioIndex],
                cropping: true,
                compressImageMaxHeight: imageHeightRatio[imageRatioIndex],
                compressImageMaxWidth: 487,
                compressImageQuality: 1
            }).then(image => {
                // setSelectAvatarSource(image.path)
                setAddPostImage([...addPostImage, {
                    imagePath: image.path,
                    imageMime: image.mime,
                    id: id
                }])
            });
            setId(id + 1)
            _toggleUploadImage()
        }
        catch (error) {
            console.warn(error);
        }
    }
    const _toggleUploadImage = () => {
        setUploadImagePicker(!uploadImagePicker)
    }

    const _toggleLikeMemberModal = () => {
        setLikes(!likes)
    }
    const GotoMemberModal = () => {
        navigation.navigate(ScreenNames.MYTIMELINE_SCREEN)
    }
    const handleRemoveImage = (item) => {
        const newImages = addPostImage.filter(e => e.id != item)
        setAddPostImage(newImages)
    };

    const rightButtonFunction = async () => {
        try {
            // const response = await axios.delete(`${Server.BASE_URL}/posts/${route.params.postId}/${selectedRecentImage}/deletePostImage`)
            const deletereq = `/posts/${route.params.postId}/${selectedRecentImage}/deletePostImage`
            deleteService(deletereq).then((res) => {
                // console.warn("res6", res.data);
                const results = recentImages.filter(e => e != selectedRecentImage)
                setRecentImages(results)
                toggleCustomAlertVisibility1()
            })
        } catch (error) {
            console.warn(error.message);
        }
    }

    const removeRecentImage = (item) => {
        setSelectedRecentImage(item)
        toggleCustomAlertVisibility1()
    }



    const getAddPost = async () => {
        // try {
        setIsLoading(true)


        // const response = await axios.get(`${Server.BASE_URL}/posts/${route.params.postId}`)

        const req = `/posts/${route.params.postId}`
        getService(req).then((response) => {
            if (response.code == 200) {
                setDescription(response.data.description)
                if (response.data.postUrl.length > 0) {
                    setRadioId(1)
                    setPostUrl(response.data.postUrl);
                    setRecentRecentPostUrl(response.data.postUrl);
                } else {
                    setRecentImages(response.data.postImage)
                    console.warn(response.data.postSize * 1.2);
                    setImageHeight(response.data.postSize * 1.2)
                }
                setIsLoading(false)
            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })


        // } catch (error) {
        //     console.warn("error", error.message);
        // }


    }

    const Addpost = async () => {
        try {
            if (!description.trim()) {
                setAlertTitle("Invalid Details")
                setAlertText("Please Enter Discription")
                toggleCustomAlertVisibility()
            }
            else {
                setIsLoading(true)

                if (route.params.Edit == 1) {

                    if (radioId == 1) {
                        let url = postUrl
                        var youtubeRegExp = /(?:[?&]vi?=|\/embed\/|\/\d\d?\/|\/vi?\/|https?:\/\/(?:www\.)?youtu\.be\/)([^&\n?#]+)/;
                        var match = url.match(youtubeRegExp);

                        if (match && match[1].length == 11) {
                            url = match[1];
                            console.warn(url);
                        } else {
                            // error
                        }
                        let postData = {
                            "description": description,
                            thumbnailImage: userImage,
                            postUrl: url
                        }
                        if (postUrl && postUrl.length > 0) {
                            // const response = await axios.put(`${Server.BASE_URL}/posts/${route.params.postId}`, postData)
                            const uri = `/posts/${route.params.postId}`
                            const body = postData
                            PutService(uri, body).then((response) => {
                                if (response.code == 200) {
                                    route.params.getTimeLineById();
                                } else {
                                    setAlertTitle("Alert")
                                    setAlertText(response.message)
                                    toggleCustomAlertVisibility()
                                }
                            })
                            navigation.navigate(ScreenNames.MYTIMELINE_SCREEN)
                            setIsLoading(false)
                        } else {
                            setAlertTitle("Invalid Details")
                            setAlertText("Please Enter Vedio URL")
                            toggleCustomAlertVisibility()
                        }

                    }
                    else {
                        let postData = {
                            "description": description,
                            thumbnailImage: userImage,
                            postSize: imageHeightRatio[1] / 1.2,
                            postUrl: ""
                        }
                        if (addPostImage.length > 0 || recentImages.length > 0) {
                            if (addPostImage.length > 0) {
                                var data = new FormData();
                                for (let i = 0; i < addPostImage.length; i++) {
                                    let path = addPostImage[i].imagePath
                                    data.append('postImage', { uri: path, type: addPostImage[i].imageMime, name: path.slice(path.lastIndexOf('/'), path.length) });
                                }
                                const uri = `/posts/${route.params.postId}/postImage`
                                const body = data
                                postRequest(uri, body).then((response) => {
                                    if (response.code == 200) {

                                    } else {
                                        setAlertTitle("Alert")
                                        setAlertText(response.message)
                                        toggleCustomAlertVisibility()
                                    }
                                })
                            }
                            // const response = await axios.put(`${Server.BASE_URL}/posts/${route.params.postId}`, postData)
                            const uri = `/posts/${route.params.postId}`
                            const body = postData
                            PutService(uri, body).then((response) => {
                                if (response.code == 200) {
                                    route.params.getTimeLineById();
                                } else {
                                    setAlertTitle("Alert")
                                    setAlertText(response.message)
                                    toggleCustomAlertVisibility()
                                }
                            })
                            navigation.navigate(ScreenNames.MYTIMELINE_SCREEN)
                            setIsLoading(false)
                        } else {
                            setAlertTitle("Invalid Details")
                            setAlertText("Alert Please Upload Images")
                            toggleCustomAlertVisibility()
                        }
                    }
                } else {
                    const addPostData = {
                        userId: userId,
                        username: name,
                        description: description,
                        postSize: imageHeightRatio[imageRatioIndex] / 1.2,
                        thumbnailImage: userImage,
                        postUrl: ""
                    }
                    if (radioId == 0) {
                        if (radioId == 0 && addPostImage.length > 0) {
                            const uri = `/posts`
                            const body = addPostData
                            postRequest(uri, body).then((response) => {
                                if (response.code == 200) {
                                    var data = new FormData();
                                    for (let i = 0; i < addPostImage.length; i++) {
                                        let path = addPostImage[i].imagePath
                                        data.append('postImage', { uri: path, type: addPostImage[i].imageMime, name: path.slice(path.lastIndexOf('/'), path.length) });
                                    }
                                    const uri = `/posts/${response.data}/postImage`
                                    const body = data
                                    postRequest(uri, body).then((response1) => {
                                        if (response1.code == 200) {
                                            route.params.getTimeLineById();
                                        } else {
                                            setAlertTitle("Alert")
                                            setAlertText(response1.message)
                                            toggleCustomAlertVisibility()
                                        }
                                    })
                                } else {
                                    setAlertTitle("Alert")
                                    setAlertText(response.message)
                                    toggleCustomAlertVisibility()
                                }
                            })
                            navigation.navigate(ScreenNames.MYTIMELINE_SCREEN)
                            setIsLoading(false)
                        } else {
                            setAlertTitle("Invalid Details")
                            setAlertText("Alert Please Upload Images")
                            toggleCustomAlertVisibility()
                        }
                    } else {

                        let url = postUrl
                        var youtubeRegExp = /(?:[?&]vi?=|\/embed\/|\/\d\d?\/|\/vi?\/|https?:\/\/(?:www\.)?youtu\.be\/)([^&\n?#]+)/;
                        var match = url.match(youtubeRegExp);

                        if (match && match[1].length == 11) {
                            url = match[1];
                            console.warn(url);
                        } else {
                            // error
                        }

                        const addPostData = {
                            userId: userId,
                            username: name,
                            description: description,
                            postSize: imageHeightRatio[imageRatioIndex] / 1.2,
                            thumbnailImage: userImage,
                            postUrl: postUrl ? url : ""
                        }


                        if (postUrl && postUrl.length > 0) {

                            // const response = await axios.post(`${Server.BASE_URL}/posts`, addPostData)
                            const uri = `/posts`
                            const body = addPostData
                            postRequest(uri, body).then((response) => {
                                if (response.code == 200) {
                                    route.params.getTimeLineById();
                                } else {
                                    setAlertTitle("Alert")
                                    setAlertText(response.message)
                                    toggleCustomAlertVisibility()
                                }
                            })
                            navigation.navigate(ScreenNames.MYTIMELINE_SCREEN)
                        } else {
                            setAlertTitle("Invalid Details")
                            setAlertText("Please Enter Vedio URL")
                            toggleCustomAlertVisibility()
                        }
                        setIsLoading(false)
                    }
                }
            }
        }
        catch (error) {
            console.warn("error", error.message);
        }
    }

    const goBack = async () => {
        navigation.navigate(ScreenNames.MYTIMELINE_SCREEN)

    }

    React.useEffect(() => {
        if (route.params.Edit == 1) {
            getAddPost()
        }
    }, [])

    return (

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 'null'} style={{
            flex: 1, backgroundColor: Colors.WHITE
        }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <View style={{
                backgroundColor: Colors.WHITE, shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 3, borderBottomRightRadius: 20, borderBottomLeftRadius: 20,
                marginBottom: 10
            }}>
                <Headers name={route.params.HeaderName} backgroundColor={true} />
                <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 30, paddingVertical: 10, paddingBottom: 20 }}>
                    <Image source={{ uri: `${BASE_URL}/users/${userId}/${userImage}/thumbnailImage` }} style={{ height: 40, width: 40, borderRadius: 50 }} />
                    <View style={{ flex: 0.9 }}>
                        <Text style={[styles.font1, { marginLeft: 10 }]}>{name}</Text>
                    </View>
                </View>
            </View>

            <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
                <ScrollView>




                    <TouchableOpacity activeOpacity={1} onPress={() => refTextInput.current.focus()}>

                        <View style={[styles.AddPostInput, { marginTop: 30 }]}>
                            <TextInput
                                placeholderTextColor={Colors.BLACK}
                                ref={refTextInput}
                                onChangeText={text => setDescription(text)}
                                multiline
                                placeholder="Write Something...." style={{ paddingHorizontal: 20, fontSize: 16, fontFamily: Fonts.REGULAR }}>{description}</TextInput>
                        </View>
                    </TouchableOpacity>
                    {
                        route.params.Edit == 1
                            ?
                            null
                            :
                            <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                                <Text style={styles.font1}>Post Type:</Text>
                                <FlatList data={radioData} renderItem={({ item, index }) => (
                                    <TouchableOpacity activeOpacity={0.9} onPress={() => setRadioId(item.id)} style={{ marginVertical: 2 }}>
                                        <RadioButton item={item} index={index} radioId={radioId} />
                                    </TouchableOpacity>
                                )} />
                            </View>
                    }
                    {
                        radioId == 0 ?

                            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 20, marginVertical: 20, marginTop: 20 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (route.params.Edit == 1) {
                                            _toggleUploadImage()
                                        } else {

                                            if (addPostImage.length > 0) {
                                                _toggleUploadImage()
                                            } else {
                                                toggleAspectRatioModal()
                                            }
                                        }
                                    }}
                                    style={styles.uploadstyle}>
                                    <Text style={[styles.font1, { marginRight: 7 }]}>Upload</Text>
                                    <UploadSvg />
                                </TouchableOpacity>
                                {/* <Text style={{ fontSize: 16, fontFamily: Fonts.REGULAR, color: Colors.JUNGLE_BLACK }}>myphoto.jpge</Text> */}
                            </View>
                            :

                            <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
                                {/* <Text>YouTube Url:{'\n'}https://www.youtube.com/watch?v=</Text> */}
                                <TextInput
                                    onChangeText={text => setPostUrl(text)}
                                    placeholder="Youtube Url"
                                    style={{
                                        height: 40, borderWidth: 1.5,
                                        // marginTop: 20,
                                        borderColor: Colors.BLACK, width: SCREEN_WIDTH - 40,
                                        borderRadius: 5, paddingHorizontal: 10,

                                    }}>
                                    {postUrl}
                                </TextInput>
                            </View>
                    }


                    <View style={{ flex: 1, backgroundColor: Colors.WHITE, flexWrap: "wrap", flexDirection: "row" }}>
                        {/* <ScrollView> */}
                        {
                            recentImages.map((item, index) => (
                                <View style={{ backgroundColor: Colors.WHITE }}>

                                    <View style={{ height: 100, width: SCREEN_WIDTH / 3 - 27, borderRadius: 5, marginHorizontal: 10, marginVertical: 10 }}>
                                        <View style={{ position: "absolute", zIndex: 1, right: -5, top: -5 }}>
                                            <TouchableOpacity
                                                hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}

                                                onPress={() => removeRecentImage(item)}
                                                style={{ height: 15, width: 15, borderRadius: 100, backgroundColor: Colors.WHITE, alignItems: "center", justifyContent: "center" }}>
                                                <CrossSvg />
                                            </TouchableOpacity>
                                        </View>
                                        <Image resizeMode="cover" source={{ uri: `${Server.BASE_URL}/posts/${route.params.postId}/${item}/postImage` }} style={{ height: "100%", width: "100%", borderRadius: 5 }} />

                                    </View>
                                </View>
                            ))}
                        {
                            addPostImage.map((item, index) => (


                                <View style={{ backgroundColor: Colors.WHITE }}>

                                    <View style={{ height: 100, width: SCREEN_WIDTH / 3 - 27, borderRadius: 5, marginHorizontal: 10, marginVertical: 10 }}>
                                        <View style={{ position: "absolute", zIndex: 1, right: -5, top: -5 }}>
                                            <TouchableOpacity
                                                hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}

                                                onPress={() => handleRemoveImage(item.id)}
                                                style={{ height: 15, width: 15, borderRadius: 100, backgroundColor: Colors.WHITE, alignItems: "center", justifyContent: "center" }}>
                                                <CrossSvg />
                                            </TouchableOpacity>
                                        </View>
                                        <Image resizeMode="cover" source={{ uri: item.imagePath }} style={{ height: "100%", width: "100%", borderRadius: 5 }} />

                                    </View>
                                </View>
                            ))}
                        {/* </ScrollView> */}
                    </View>
                    {/* <FlatList data={addPostImage}
                        style={{ paddingHorizontal: 10 }}
                        numColumns={3}
                        renderItem={({ item, index }) => (


                            <View style={{ backgroundColor: Colors.WHITE }}>

                                <View style={{ height: 100, width: SCREEN_WIDTH / 3 - 27, backgroundColor: Colors.WHITE, borderRadius: 5, marginHorizontal: 10, marginVertical: 10 }}>
                                    <View style={{ position: "absolute", zIndex: 1, right: -5, top: -5 }}>
                                        <TouchableOpacity
                                            hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
                                            onPress={() => handleRemoveImage(item.id)}
                                            style={{
                                                height: 15, width: 15, borderRadius: 100
                                                , backgroundColor: Colors.WHITE, alignItems: "center"
                                                , justifyContent: "center"
                                            }}>
                                            <CrossSvg />
                                        </TouchableOpacity>
                                    </View>

                                    <Image resizeMode="cover" source={{ uri: item.imagePath }} style={{ height: "100%", width: "100%", borderRadius: 5 }} />



                                </View>
                            </View>
                        )} /> */}
                </ScrollView>

            </View>
            <View style={{ flexDirection: "row", marginBottom: 20 }}>
                <View style={{ flex: 0.5, paddingLeft: 20, paddingRight: 10 }}>
                    <TouchableOpacity
                        onPress={() => {
                            Addpost()
                        }}
                        style={[styles.filterMemberBtn, { backgroundColor: Colors.PRIMARY }]}>
                        <Text style={styles.fontFilterBtn}>Apply</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.5, paddingRight: 20, paddingLeft: 10 }}>
                    <TouchableOpacity
                        onPress={goBack}
                        style={styles.filterMemberBtn}>
                        <Text style={[styles.fontFilterBtn, { opacity: 0.8 }]}>Canel</Text>
                    </TouchableOpacity>
                </View>
            </View>


            {/* <LikesModal _toggleLikeMemberModal={_toggleLikeMemberModal} likes={likes} /> */}
            <EditProfileModal openLibrary={openLibrary}
                openCamera={openCamera} _toggleUploadImage={_toggleUploadImage}
                SelectIamgepicker={uploadImagePicker} />
            <CustomAlert
                title={alertTitle}
                desc={alertText}
                leftButtonText={"Ok"}
                leftButtonFunction={leftButtonFunction}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility}
                customAlertVisible={customAlertVisible}
            />

            <CustomAlert
                title={"Warning"}
                desc={"Are you sure you want to delete this Image"}
                leftButtonText={"Cancel"}
                rightButtonText={"Ok"}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility1}
                leftButtonFunction={leftButtonFunction1}
                rightButtonFunction={rightButtonFunction}
                customAlertVisible={customAlertVisible1}
            />
            <ModalSelectPostSize
                _toggleUploadImage={_toggleUploadImage}
                setImageRatioIndex={setImageRatioIndex}
                isAspectRatioModal={isAspectRatioModal}
                toggleAspectRatioModal={toggleAspectRatioModal}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddPostScreen)
// export default AddPostScreen


