import React from 'react'
import { styles } from "./UploadAchivementStyles"
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors, Fonts, Server } from '../../global';
import Headers from "../../components/Header/Header";
import UploadSvg from "../../assets/svg/upload.svg"
import EditProfileModal from '../../components/EditProfileModal/EditProfileModal';
import ImagePicker from 'react-native-image-crop-picker';
import CrossSvg from "../../assets/svg/crossSmall.svg"
import { SCREEN_WIDTH } from '../../global/constants';
import { connect } from 'react-redux';
import axios from 'axios';
import CustomAlert from '../../components/CustomAlert/CusomAlert';
import { postRequest } from '../../services/postService';
import { deleteService } from '../../services/deleteService';
const UploadAchivementScreen = ({ userId, userImage, route, params, navigation, name }) => {

    // variable

    const Data1 = [
        {
            key: 0,
            iamge: require("../../assets/images/i5.png")
        },
        {
            key: 1,
            iamge: require("../../assets/images/i5.png")
        },
        {
            key: 2,
            iamge: require("../../assets/images/i5.png")
        },
        {
            key: 4,
            iamge: require("../../assets/images/i5.png")
        },

        {
            key: 5,
            iamge: require("../../assets/images/i5.png")
        },
        {
            key: 6,
            iamge: require("../../assets/images/i5.png")
        },
    ]
    //state
    const [recentAchievements, setRecentAchievements] = React.useState(route.params.memberAchievements);
    const [selectedRecentAchievement, setSelectedRecentAchievements] = React.useState("");
    const [achievements, setAchievements] = React.useState([]);
    const [uploadImagePicker, setUploadImagePicker] = React.useState(false)
    const [id, setId] = React.useState(0)
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false)
    //function

    const [alertTitle, setAlertTitle] = React.useState("");
    const [alertText2, setAlertText2] = React.useState('');
    const [customAlertVisible2, setCustomAlertVisible2] = React.useState(false);

    const toggleCustomAlertVisibility2 = () => { setCustomAlertVisible2(!customAlertVisible2) }
    const leftButtonFunction2 = () => {
        toggleCustomAlertVisibility2()
    }

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }

    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }
    const rightButtonFunction = async () => {
        try {
            const deletereq = `/users/${userId}/${selectedRecentAchievement}/memberAchivementsOtherImages`
            deleteService(deletereq).then((response) => {
                if (response.code == 200) {
                    const results = recentAchievements.filter(e => e != selectedRecentAchievement)
                    setRecentAchievements(results)
                    toggleCustomAlertVisibility()
                } else {
                    setAlertTitle("Alert")
                    setAlertText(response.message)
                    toggleCustomAlertVisibility()
                }
            })
        } catch (error) {
            console.warn(error.message);
        }
    }

    const removeRecentAchivement = (item) => {
        setSelectedRecentAchievements(item)
        toggleCustomAlertVisibility()
    }

    const openCamera = async () => {
        try {
            let value2 = await ImagePicker.openCamera({
                width: 400,
                height: 400,
                cropping: true,
            }).then(image => {
                setAchievements([...achievements, {
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
                width: 400,
                height: 400,
                cropping: true,
            }).then(image => {
                setAchievements([...achievements, {
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

    const handleRemove = (item) => {
        const newAchievements = achievements.filter(e => e.id != item)
        setAchievements(newAchievements)
    };

    const addAchivements = async () => {
        try {
            if (achievements.length > 0) {
                var data = new FormData();
                for (let i = 0; i < achievements.length; i++) {
                    let path = achievements[i].imagePath
                    data.append('memberAchivementsOtherImages', { uri: path, type: achievements[i].imageMime, name: path.slice(path.lastIndexOf('/'), path.length) });
                }
                const uri = `/users/${userId}/memberAchivementsOtherImages`
                const body = data
                postRequest(uri, body).then((response) => {
                    if (response.code == 200) {
                        route.params.getUserDetails();
                    } else {
                        setAlertTitle("Alert")
                        setAlertText2(response.message)
                        toggleCustomAlertVisibility2()
                    }

                })
            }
            navigation.pop()
        } catch (error) {
            console.warn(error.message);
        }
    }
    React.useEffect(() => {

        return (() => {
            route.params.getUserDetails()
        })
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <View style={{
                backgroundColor: Colors.WHITE, shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 3, borderBottomRightRadius: 20, borderBottomLeftRadius: 20
            }}>
                <Headers name="Upload Achievement" backgroundColor={true} />
                <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 30, paddingVertical: 10, paddingBottom: 20 }}>
                    <Image source={{ uri: `${Server.BASE_URL}/users/${userId}/${userImage}/thumbnailImage` }} style={{ height: 40, width: 40, borderRadius: 50 }} />
                    <View style={{ flex: 0.9 }}>
                        <Text style={[styles.font1, { marginLeft: 10 }]}>{name}</Text>
                    </View>
                </View>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 20, marginVertical: 20, marginTop: 30 }}>
                <TouchableOpacity
                    onPress={_toggleUploadImage}
                    style={styles.uploadstyle}>
                    <Text style={[styles.font1, { marginRight: 7 }]}>Upload</Text>
                    <UploadSvg />
                </TouchableOpacity>
                {/* <Text style={{ fontSize: 16, fontFamily: Fonts.REGULAR, color: Colors.JUNGLE_BLACK }}>myphoto.jpge</Text> */}
            </View>
            <View style={{ flex: 1, backgroundColor: Colors.WHITE, flexWrap: "wrap", flexDirection: "row" }}>
                {/* <ScrollView> */}
                {
                    recentAchievements.map((item, index) => (
                        <View style={{ backgroundColor: Colors.WHITE }}>

                            <View style={{ height: 100, width: SCREEN_WIDTH / 3 - 27, borderRadius: 5, marginHorizontal: 10, marginVertical: 10 }}>
                                <View style={{ position: "absolute", zIndex: 1, right: -5, top: -5 }}>
                                    <TouchableOpacity
                                        hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}

                                        onPress={() => removeRecentAchivement(item)}
                                        style={{ height: 15, width: 15, borderRadius: 100, backgroundColor: Colors.WHITE, alignItems: "center", justifyContent: "center" }}>
                                        <CrossSvg />
                                    </TouchableOpacity>
                                </View>
                                <Image resizeMode="cover" source={{ uri: `${Server.BASE_URL}/users/${userId}/${item}/memberAchivementsOtherImages` }} style={{ height: "100%", width: "100%", borderRadius: 5 }} />

                            </View>
                        </View>
                    ))}
                {
                    achievements
                    &&
                    achievements.map((item, index) => (


                        <View style={{ backgroundColor: Colors.WHITE }}>

                            <View style={{ height: 100, width: SCREEN_WIDTH / 3 - 27, borderRadius: 5, marginHorizontal: 10, marginVertical: 10 }}>
                                <View style={{ position: "absolute", zIndex: 1, right: -5, top: -5 }}>
                                    <TouchableOpacity
                                        hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}

                                        onPress={() => handleRemove(item.id)}
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
            <View style={{ flexDirection: "row", marginBottom: 20 }}>
                <View style={{ flex: 0.5, paddingLeft: 20, paddingRight: 10 }}>
                    <TouchableOpacity
                        onPress={addAchivements}
                        // onPress={() => _toggleLikeMemberModal()}
                        style={[styles.filterMemberBtn, { backgroundColor: Colors.PRIMARY }]}>
                        <Text style={styles.fontFilterBtn}>Save</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.5, paddingRight: 20, paddingLeft: 10 }}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                        style={styles.filterMemberBtn}>
                        <Text style={[styles.fontFilterBtn, { opacity: 0.8 }]}>Canel</Text>
                    </TouchableOpacity>
                </View>
            </View>


            {/* <LikesModal _toggleLikeMemberModal={_toggleLikeMemberModal} likes={likes} /> */}

            <EditProfileModal openLibrary={openLibrary} openCamera={openCamera}
                _toggleUploadImage={_toggleUploadImage}
                SelectIamgepicker={uploadImagePicker} />
            <CustomAlert
                title={"Warning"}
                desc={"Are you sure you want to delete this Achivement"}
                leftButtonText={"Cancel"}
                rightButtonText={"Ok"}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility}
                leftButtonFunction={leftButtonFunction}
                rightButtonFunction={rightButtonFunction}
                customAlertVisible={customAlertVisible}
            />

            <CustomAlert
                title={alertTitle}
                desc={alertText2}
                leftButtonText={"Ok"}
                leftButtonFunction={leftButtonFunction2}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility2}
                customAlertVisible={customAlertVisible2}
            />
        </View>
    )
}
const mapStateToProps = state => ({
    userId: state.user.userId,
    userImage: state.user.thumbnailImage,
    name: state.user.name
});
export default connect(mapStateToProps, null)(UploadAchivementScreen)
