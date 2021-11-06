import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, FlatList, PermissionsAndroid, Platform, Linking } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Header from "../../components/Header/Header";
import CallSvg from "../../assets/svg/call.svg";
import MessageSvg from "../../assets/svg/chatlarge.svg";
import WhatappSvg from "../../assets/svg/whatsapp.svg";
import LikeSvg from "../../assets/svg/like - filled.svg";
import { styles } from "./MyProfileStyles"
import { Colors, Fonts, ScreenNames, Server } from '../../global';
import Location from "../../assets/svg/location.svg";
import EmailSvg from "../../assets/svg/email.svg";
import AddSvg1 from "../../assets/svg/add1.svg";
import Download from "../../assets/svg/download1.svg";
import UploadSvg from "../../assets/svg/upload.svg";
import EditSvg from "../../assets/svg/editblack.svg";




import { PaymentType, keyworddata, ProductCatalogueData, MemberdetailData } from '../../components/DummyData/DummyDataScreen';

import { globalStyles } from '../../global/globalStyles';
import { SCREEN_WIDTH } from '../../global/constants';
import ProductCatalogue from '../../components/ProductCatalogue/ProductCatalogue';
import MyCatalogueCard from '../../components/MyCatalogueCard/MyCatalogueCard';
import MyProfileProductCatalogue from '../../components/MyProfileProductCatalogue/MyProfileProductCatalogue';
import MemberAchievement from '../../components/MemberAchievement/MemberAchievement';
import FollowingMemberModal from '../../components/FollowingMemberModal/FollowingMemberModal';
import FollowerMemberModal from '../../components/FollowerMemberModal/FollowerMemberModal';
import BlockedMemberModal from '../../components/BlockedMemberModal/BlockedMemberModal';
import MemberInductedModal from '../../components/MemberInductedModal/MemberInductedModal';
import RNFetchBlob from 'rn-fetch-blob';
import { connect } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../global/server';
import { getService } from '../../services/getService';
import CustomAlert from '../../components/CustomAlert/CusomAlert';

const MyProfileScreen = ({ navigation, route, params, name, userId, BussinessProfile, BussinessBronche }) => {
    //state

    const [follower, setFollower] = React.useState(false);
    const [following, setFollowing] = React.useState(false);
    const [block, setBlock] = React.useState(false);
    const [memberIndicate, setMemberIndicate] = React.useState(false);
    const [userDetails, setUserDetails] = React.useState(null)
    const [userImage, setUserImage] = React.useState('')
    const [productCatalogues, setProductCatalogues] = React.useState(null)
    const [memberAchievements, setMemberAchievements] = React.useState(null)
    const [memberAddress, setMemberAddress] = React.useState(null)


    const [alertTitle, setAlertTitle] = React.useState("");
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false);
    //function 

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }

    const _toggleFollowerModal = () => {
        setFollower(!follower)
    }

    const _toggleFollowingModal = () => {
        setFollowing(!following)
    }

    const _toggleblockModal = () => {
        setBlock(!block)
    }

    const _toggleMemberInductedModal = () => {
        setMemberIndicate(!memberIndicate)
    }


    const goEditProfile = () => {
        navigation.navigate(ScreenNames.EDITPROFILE_SCREEN, { edit: 0 })
    }
    const goAddCatalogue = () => {
        navigation.navigate(ScreenNames.ADDCATALOGUE_SCREEN, { getUserDetails, flag: 1 })
    }

    const goUploadAchivement = () => {
        navigation.navigate(ScreenNames.UPLOADACHIVEMETN_SCREEN, { memberAchievements: memberAchievements, getUserDetails })

    }


    const askPermission = async () => {
        const writeExtStoPer = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        const readExtStoPer = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        if (writeExtStoPer === 'granted' || readExtStoPer === 'granted') {
            return "granted";
        } else if (writeExtStoPer === 'denied' || readExtStoPer === 'denied') {
            return "denied";
        } else if (writeExtStoPer === 'never_ask_again' || readExtStoPer === 'never_ask_again') {
            return "never_ask_again";
        }
    };



    // const uploadBusinessBronche = () => {


    // }

    // const uploadBusinessProfile = () => {


    // }

    React.useEffect(() => {
        askPermission()
        getUserDetails()
    }, [])

    const uploadPdf = () => {
        RNFetchBlob.fetch('POST', 'https://content.dropboxapi.com/2/files/upload', {
            // dropbox upload headers
            Authorization: "Bearer access-token...",
            'Dropbox-API-Arg': JSON.stringify({
                path: '/img-from-react-native.png',
                mode: 'add',
                autorename: true,
                mute: false
            }),
            'Content-Type': 'application/octet-stream',
            // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
            // Or simply wrap the file path with RNFetchBlob.wrap().
        }, RNFetchBlob.wrap(PATH_TO_THE_FILE))
            //    base64ImageString)
            //    RNFetchBlob.wrap("../../components/MemberInductedModal/MemberInductedModal")
            //    )
            .then((res) => {
                console.log(res.text())
            })
            .catch((err) => {
                // error handling ..
            })
    }

    const getUserDetails = async () => {

        // const userDetails = await axios.get(`${Server.BASE_URL}/users/${userId}`);
        // const productCatalogues = await axios.get(`${Server.BASE_URL}/productCatalogues/userId/${userId}`)
        // const MemberAddress = await axios.get(`${Server.BASE_URL}/users/${userId}/allAddress`)
        // setMemberAddress(MemberAddress.data)
        // setProductCatalogues(productCatalogues.data)
        // setUserDetails(userDetails.data)
        // console.warn("ussss", userDetails.data);
        // setMemberAchievements(userDetails.data.memberAchivementsOtherImages)
        // setUserImage({ uri: `${Server.BASE_URL}/users/${userId}/${userDetails.data.thumbnailImage}/thumbnailImage` })


        const req = `/users/${userId}`
        getService(req).then((response) => {

            if (response.code == 200) {
                setUserDetails(response.data)
                setMemberAchievements(response.data.memberAchivementsOtherImages)
                setUserImage({ uri: `${Server.BASE_URL}/users/${userId}/${response.data.thumbnailImage}/thumbnailImage` })
                if (response.data.businessProfile && response.data.businessBrochure) {
                    setAlertTitle("Alert")
                    setAlertText("File not Upload")
                    toggleCustomAlertVisibility()

                } else {
                    setAlertTitle("Alert")
                    setAlertText("File not Upload")
                    toggleCustomAlertVisibility()
                }
            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })

        const req1 = `/productCatalogues/userId/${userId}`
        getService(req1).then((response) => {
            if (response.code == 200) {
                setProductCatalogues(response.data)
            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })

        const req2 = `/users/${userId}/allAddress`
        getService(req2).then((response) => {
            if (response.code == 200) {
                setMemberAddress(response.data)
            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })


    }

    const downloadInvoice = async (pdfName, pdfType) => {

        let DownloadDir = Platform.OS == "ios" ? RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.DownloadDir;

        const { dirs } = RNFetchBlob.fs;
        const dirToSave = Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir
        const configfb = {
            fileCache: true,
            useDownloadManager: true,
            notification: true,
            mediaScannable: true,
            title: "NBH",
            path: `${dirToSave}/${userDetails.firstName + " " + userDetails.lastName} ${pdfType}.pdf`,
        }
        const configOptions = Platform.select({
            ios: {
                fileCache: configfb.fileCache,
                title: configfb.title,
                path: configfb.path,
                appendExt: 'pdf',
            },
            android: configfb,
        });
        Platform.OS == "android"
            ?
            // setLoading(true);
            RNFetchBlob
                .config({
                    // add this option that makes response data to be stored as a file,
                    // this is much more performant.
                    fileCache: true,
                    addAndroidDownloads: {
                        useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
                        notification: true,
                        path: `${DownloadDir}/${userDetails.firstName + " " + userDetails.lastName} ${pdfType}.pdf`, // this is the path where your downloaded file will live in
                        description: 'NBH Invoice',
                        // title: `SM_Invoice${Date.now()}.pdf`,
                        title: `${userDetails.firstName + " " + userDetails.lastName} ${pdfType}.pdf`,
                        mime: 'application/pdf',
                        mediaScannable: true
                    }
                })
                .fetch('GET', `${Server.BASE_URL}/users/${userId}/${pdfName}/${pdfType}`)
                .then((resp) => {
                    // setLoading(false);
                    // setCustomToast(true)
                    // dispatch(UserActions.showToast(`Downloaded To ${DownloadDir}`));
                })
                .catch((error) => {
                    // setLoading(false);
                    console.warn(error.message);
                })
            :
            RNFetchBlob.config(configOptions)
                .fetch('GET', `${Server.BASE_URL}/users/${userId}/${pdfName}/${pdfType}`, {})
                .then((res) => {
                    if (Platform.OS === "ios") {
                        RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
                        RNFetchBlob.ios.previewDocument(configfb.path);
                    }
                    // setCustomToast(false)
                    // if (Platform.OS == 'android') {
                    //     setCustomToast('File downloaded');
                    // }
                    console.log('The file saved to ', res);
                })
                .catch((e) => {
                    // setisdownloaded(true)
                    // setCustomToast(e.message);
                    console.log('The file saved to ERROR', e.message)
                });
    };
    const gotoWeb = () => {
        let containsHttp = userDetails.website.toString().includes('http')
        //modified created date
        Linking.openURL(containsHttp ? userDetails.website : "http://" + userDetails.website)
    }




    return (
        <View style={{ flex: 1 }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <Header name={"My Profile"} backgroundColor={true} YellowHomeIcon={true} YellowHomeOnpress={() => navigation.navigate(ScreenNames.HOME_SCREEN)} />
            <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
                {userDetails
                    &&
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <View style={[styles.containerMemberDetail, { borderRadius: 20, marginHorizontal: 20, marginTop: 10 }]}>
                            {/* <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, marginHorizontal: 30, marginTop: 20, marginBottom: 20 }}> */}
                            <View style={{ marginBottom: 10, marginHorizontal: 30, marginTop: 20, marginBottom: 20 }}>
                                <View style={{ alignItems: "center" }}>

                                    <Image source={userImage} style={{ height: 80, width: 80, borderRadius: 100 }} />
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <View style={{ width: SCREEN_WIDTH / 1 - 100 }}>
                                        <Text style={styles.memberuserName}>{userDetails.name}</Text>
                                        <Text style={[styles.memberService, { marginVertical: 5 }]}>{userDetails.businessName}</Text>
                                        <Text style={styles.memberOccupation}>{userDetails.category}</Text>
                                        <Text style={[styles.memberOccupation, { marginVertical: 5 }]}>{userDetails.subCategory}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={{ marginRight: 10 }}>
                                            <EmailSvg />
                                        </TouchableOpacity>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.memberPhoneNumber1}>{userDetails.email}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                                        <TouchableOpacity
                                            activeOpacity={1}

                                            style={{ marginRight: 10 }}>
                                            <CallSvg />
                                        </TouchableOpacity>
                                        <Text style={styles.memberPhoneNumber}>{userDetails.phone}</Text>
                                    </View>

                                </View>
                                <View style={{ alignItems: "center" }}>
                                    {/* <View style={{ height: 70, width: 70 ,backgroundColor:"red" ,borderRadius:100}}> */}

                                    {/* </View> */}


                                    <TouchableOpacity
                                        onPress={goEditProfile}
                                        style={[styles.editButton, { marginTop: 20 }]}>
                                        {/* <EditSvg /> */}
                                        <Text style={styles.font3}>Edit Profile</Text>
                                    </TouchableOpacity>

                                    {/* <View style={{ marginLeft: 30, alignSelf: "center" }}>
                                        <TouchableOpacity
                                            onPress={goEditProfile}
                                            style={[styles.editButton, {
                                                marginVertical: 20, height: 36,
                                                width: 140,
                                            }]}>
                                            <EditSvg />
                                            <Text style={[styles.font3, { marginLeft: 10 }]}>Edit Profile</Text>
                                        </TouchableOpacity>
                                    </View> */}

                                </View>
                            </View>


                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20, justifyContent: "space-around", marginHorizontal: 20, marginTop: 20 }}>
                            <TouchableOpacity
                                onPress={_toggleFollowerModal}
                                style={[styles.containerMemberDetail1, { alignItems: "center", width: SCREEN_WIDTH / 4, borderRadius: 10 }]}>
                                <Text style={styles.Followerquantity}>{userDetails.followers.length}</Text>
                                <Text style={styles.Follower}>Followers</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={_toggleFollowingModal}
                                style={[styles.containerMemberDetail1, { alignItems: "center", width: SCREEN_WIDTH / 4, borderRadius: 10 }]}>
                                <Text style={styles.Followerquantity}>{userDetails.following.length}</Text>
                                <Text style={styles.Follower}>Following</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={_toggleblockModal}
                                style={[styles.containerMemberDetail1, { alignItems: "center", width: SCREEN_WIDTH / 4, borderRadius: 10 }]}>
                                <Text style={styles.Followerquantity}>{userDetails.block.length}</Text>
                                <Text style={styles.Follower}>Block</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.containerMemberDetail1, { marginHorizontal: 20, marginVertical: 20, borderRadius: 10, padding: 5 }]}>
                            <Text style={{ fontSize: 16, fontFamily: Fonts.BOLD, color: Colors.ONYX_60 }}>Members Incepted</Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ flex: 0.9 }}>
                                    <Text style={[styles.memberOccupation, { marginVertical: 5, color: Colors.BLACK }]}>{userDetails.membersIncepted.length}</Text>
                                </View>
                                <View style={{ flex: 0.1, marginLeft: 10 }}>
                                    <TouchableOpacity
                                        onPress={_toggleMemberInductedModal}
                                        hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
                                    >
                                        <AddSvg1 />

                                    </TouchableOpacity>

                                </View>


                            </View>
                        </View>
                        <View style={[styles.containerMemberDetail1, { borderRadius: 10, marginHorizontal: 20, padding: 5 }]}>


                            <View>

                                {memberAddress &&
                                    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 20 }}>
                                            <Location />
                                            <Text style={styles.Address}>Address</Text>
                                        </View>

                                        <FlatList data={memberAddress}
                                            renderItem={({ item, index }) => (
                                                <View style={styles.MemberAddress}>
                                                    <View style={{ marginVertical: 10 }}>
                                                        <Text style={styles.Address}>{item.building},{item.flatNo},{item.floor},{item.landmark},{item.city},{item.pincode}</Text>
                                                    </View>
                                                </View>
                                            )}
                                        />
                                    </View>
                                }
                            </View>

                        </View>
                        <View style={[styles.containerMemberDetail1, { marginTop: 10, borderRadius: 10, marginHorizontal: 20, padding: 5 }]}>
                            <Text style={[styles.Address, { fontSize: 16, marginLeft: 20 }]}>Keywords</Text>
                            <FlatList data={userDetails && userDetails.userKeywords}
                                style={{ marginVertical: 10, marginHorizontal: 10 }}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                renderItem={({ item, index }) => (
                                    <View style={{ height: 30, alignItems: "center", justifyContent: "center", backgroundColor: "#FFD64820", borderRadius: 10, paddingHorizontal: 10, marginHorizontal: 10 }}>
                                        <Text style={{ fontSize: 14, fontFamily: Fonts.BOLD, color: Colors.ONYX_60 }}>{item}</Text>
                                    </View>
                                )}
                            />
                        </View>


                        <View style={[styles.containerMemberDetail1, { marginHorizontal: 20, marginVertical: 10, borderRadius: 10, padding: 5 }]}>
                            <Text style={{ fontSize: 16, fontFamily: Fonts.BOLD, color: Colors.BLACK }}>About Member</Text>
                            <Text style={[styles.memberOccupation, { marginVertical: 5 }]}>{userDetails.aboutMember}</Text>
                        </View>

                        <View style={[styles.containerMemberDetail1, { marginHorizontal: 20, marginVertical: 0, marginBottom: 10, borderRadius: 10, padding: 5 }]}>
                            <Text style={{ fontSize: 16, fontFamily: Fonts.BOLD, color: Colors.BLACK }}>GST No.</Text>
                            <Text style={[styles.memberOccupation, { marginVertical: 5 }]}>{userDetails.gstNo}</Text>
                        </View>
                        <TouchableOpacity onPress={gotoWeb} style={[styles.containerMemberDetail1, { marginHorizontal: 20, borderRadius: 10, padding: 5 }]}>
                            <Text style={[styles.Address, { fontSize: 16, marginLeft: 0, marginBottom: 10, color: Colors.BLACK }]}>Website </Text>
                            <Text style={styles.font1}>{userDetails.website}</Text>
                        </TouchableOpacity>


                        <View style={[styles.containerMemberDetail1, { marginHorizontal: 20, marginVertical: 0, marginTop: 20, borderRadius: 10, padding: 5 }]}>
                            <Text style={{ fontSize: 16, fontFamily: Fonts.BOLD, color: Colors.BLACK }}>Office Contact No.</Text>
                            <Text style={[styles.memberOccupation, { marginVertical: 5 }]}>{userDetails.officeContactNo}</Text>
                        </View>

                        <View style={[styles.containerMemberDetail1, { marginHorizontal: 20, marginTop: 10, marginBottom: 10, borderRadius: 10, padding: 5 }]}>
                            <Text style={{ fontSize: 16, fontFamily: Fonts.BOLD, color: Colors.BLACK }}>GEO Location</Text>
                            <Text style={[styles.memberOccupation, { marginVertical: 5 }]}>{userDetails.officeBuilding}, {userDetails.officeFlatNo}, {userDetails.officeFloor}, {userDetails.officeLandmark}, {userDetails.officeCity}, {userDetails.officePincode}</Text>
                        </View>

                        {console.warn(userDetails.businessBrochure)}
                        <View style={{ marginHorizontal: 20 }}>
                            {
                                userDetails.businessProfile
                                &&
                                <TouchableOpacity
                                    onPress={() => downloadInvoice(userDetails.businessProfile, "businessProfile")}
                                    style={[styles.containerMemberDetail1, { alignItems: "center", flexDirection: "row", marginVertical: 5, padding: 5, borderRadius: 5 }]}>
                                    <Download />
                                    <Text style={[styles.font1, { marginLeft: 10 }]}>Download Business Profile</Text>
                                </TouchableOpacity>
                            }
                            {
                                userDetails.businessBrochure
                                &&
                                <TouchableOpacity
                                    onPress={() => downloadInvoice(userDetails.businessBrochure, "businessBrochure")}
                                    style={[styles.containerMemberDetail1, { alignItems: "center", flexDirection: "row", marginVertical: 5, padding: 5, borderRadius: 5 }]}>
                                    <View style={{ alignItems: "center", flexDirection: "row", }}>
                                        <Download />
                                        <Text style={[styles.font1, { marginLeft: 10 }]}>Download Business Brochure</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={[styles.containerMemberDetail1, { marginVertical: 20, marginHorizontal: 20, borderRadius: 10, paddingVertical: 10 }]}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 10 }}>
                                <Text style={[styles.Address, { fontSize: 16, marginLeft: 20 }]}>Member Achievement</Text>
                                <TouchableOpacity
                                    onPress={goUploadAchivement}

                                    style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={styles.uploadstyle}>
                                        <Text style={[styles.font2, { marginRight: 7 }]}>Upload</Text>
                                        <UploadSvg />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View>

                                <FlatList data={memberAchievements}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}
                                    // numColumns={2}
                                    style={{ backgroundColor: Colors.WHITE, paddingVertical: 5, marginHorizontal: 10, width: SCREEN_WIDTH - 70 }}
                                    renderItem={({ item, index }) => (
                                        <View style={{ flex: 1 }}>
                                            <MemberAchievement item={item} index={index} userId={userId} />
                                        </View>
                                    )}
                                />
                            </View>
                        </View>
                        {
                            productCatalogues
                            &&
                            <View style={[styles.containerMemberDetail1, { borderRadius: 10, paddingVertical: 10, marginHorizontal: 20, marginBottom: 20 }]}>

                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={[styles.Address, { fontSize: 16, marginLeft: 20 }]}>Product Catalogue</Text>
                                    <TouchableOpacity
                                        onPress={goAddCatalogue}
                                        style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={styles.uploadstyle}>
                                            <Text style={[styles.font2, { marginRight: 7 }]}>Upload</Text>
                                            <UploadSvg />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: 10 }}>

                                    <FlatList data={productCatalogues}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        style={{ marginHorizontal: 10, }}
                                        renderItem={({ item, index }) => (
                                            <MyProfileProductCatalogue item={item} />
                                        )}
                                    />
                                </View>
                            </View>}



                    </ScrollView>
                }
            </View>

            <FollowerMemberModal _toggleFollowerModal={_toggleFollowerModal} follower={follower} />

            <FollowingMemberModal _toggleFollowingModal={_toggleFollowingModal} following={following} />

            <BlockedMemberModal _toggleblockModal={_toggleblockModal} block={block} />

            <MemberInductedModal _toggleMemberInductedModal={_toggleMemberInductedModal} memberIndicate={memberIndicate} userId={userId} />


            <CustomAlert
                title={alertTitle}
                desc={alertText}
                leftButtonText={"Ok"}
                leftButtonFunction={leftButtonFunction}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility}
                customAlertVisible={customAlertVisible}
            />
        </View >
    )
}

const mapStateToProps = state => ({
    name: state.user.name,
    email: state.user.email,
    phNo: state.user.phNo,
    userImage: state.user.thumbnailImage,
    userId: state.user.userId,
    BussinessProfile: state.user.bussinessprofile,
    BussinessBronche: state.user.bussinessbronche
});

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileScreen);




