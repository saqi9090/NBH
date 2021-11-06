import React from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Headers from '../../components/Header/Header';
import { Colors, Fonts, ScreenNames, Server } from '../../global';
import UploadSvg from "../../assets/svg/upload.svg";
import { ImageExtenstion1 } from '../../components/DummyData/DummyDataScreen';
import { SCREEN_WIDTH } from '../../global/constants';
import CrossSvg from "../../assets/svg/crossSmall.svg"
import ImagePicker from 'react-native-image-crop-picker';

import { styles } from "./AddClientsStyles"
import EditProfileModal from '../../components/EditProfileModal/EditProfileModal';
import CustomAlert from '../../components/CustomAlert/CusomAlert';
import axios from 'axios';
import { connect } from 'react-redux';
import { BASE_URL } from '../../global/server';
import { postRequest } from '../../services/postService';
import { getService } from '../../services/getService';
import { PutService } from '../../services/PutService';
// import CrossSvg from "../../assets/svg/crossSmall.svg"

const AddClientsScreen = ({ navigation, userId, route, params, userImage, name, toggleClient }) => {

    //state
    const [testImage, setTestImage] = React.useState(``);

    const [recentTestImage, setRecentTestImage] = React.useState(``);
    const [selectIamgepicker, setSelectIamgepicker] = React.useState(false)

    const [companyName, setCompanyName] = React.useState("");
    const [companyState, setCompanyState] = React.useState("");
    const [companyCity, setCompanyCity] = React.useState("");
    const [companyArea, setCompanyArea] = React.useState("");
    const [companyContactPerson, setCompanyContactPerson] = React.useState("");
    const [companyDesignation, setCompanyDesignation] = React.useState("");
    const [alertTitle, setAlertTitle] = React.useState("");

    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false)



    //function
    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }

    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }

    // console.warn(route.params.clientId);

    const AddClient = async () => {
        if (!companyName.trim()) {
            setAlertTitle("Invalid Details")
            setAlertText("Please Enter Company Name")
            toggleCustomAlertVisibility()
        }
        else if (!companyState.trim()) {
            setAlertTitle("Invalid Details")

            setAlertText("Please Enter Company State")
            toggleCustomAlertVisibility()
        }
        else if (!companyCity.trim()) {
            setAlertTitle("Invalid Details")

            setAlertText("Please Enter Company City")
            toggleCustomAlertVisibility()
        }
        else if (!companyArea.trim()) {
            setAlertTitle("Invalid Details")

            setAlertText("Please Enter Company Area")
            toggleCustomAlertVisibility()
        }
        else if (!companyContactPerson.trim()) {
            setAlertTitle("Invalid Details")

            setAlertText("Please Enter Company Contact Person")
            toggleCustomAlertVisibility()
        }
        else if (!companyDesignation.trim()) {
            setAlertTitle("Invalid Details")

            setAlertText("Please Enter Company Designation")
            toggleCustomAlertVisibility()
        }
        // else if (testImage == [] || testImage == `` || testImage == null) {
        //     setAlertText("Please Add Image")
        //     toggleCustomAlertVisibility()
        // }
        else {


            const AddclientData = {
                "userId": userId,
                "companyArea": companyArea,
                "companyCity": companyCity,
                "companyContactPerson": companyContactPerson,
                "companyContactPersonDesignation": companyDesignation,
                "companyName": companyName,
                "companyState": companyState
            }
            // `/clients`
            // console.warn("sfasd", AddclientData);


            if (route.params.Edit == 1) {
                let uri = `/clients/${route.params.clientId}`

                const body = AddclientData


                PutService(uri, body).then(async (response) => {
                    if (response.code == 200) {
                        if (testImage) {
                            var data = new FormData();
                            let path = testImage.imagePath
                            data.append('thumbnailImage', { uri: path, type: testImage.imageMime, name: path.slice(path.lastIndexOf('/'), path.length) });
                            const uri = `/clients/${response.data.clientId}/thumbnailImage`
                            const body = data
                            postRequest(uri, body).then((response) => {
                                if (response.code == 200) {
                                    console.warn("daatt", response.data);
                                } else {
                                    setAlertTitle("Alert")
                                    setAlertText(response.message)
                                    toggleCustomAlertVisibility()
                                }
                            })
                        } else {
                            // recentTestImage(``)
                            null
                        }
                        route.params.toggleClient()
                        route.params.getMyCLientsList()
                        route.params.getMyCLientsListHome()
                        navigation.pop()
                    } else {
                        setAlertTitle("Alert")
                        setAlertText(response.message)
                        toggleCustomAlertVisibility()
                    }
                })

            } else {
                let uri = `/clients`;

                const body = AddclientData
                postRequest(uri, body).then(async (response) => {
                    if (response.code == 200) {
                        console.warn("responesssssss", response.data);
                        if (testImage) {
                            var data = new FormData();
                            let path = testImage.imagePath
                            data.append('thumbnailImage', { uri: path, type: testImage.imageMime, name: path.slice(path.lastIndexOf('/'), path.length) });
                            const uri = `/clients/${response.data}/thumbnailImage`
                            const body = data
                            postRequest(uri, body).then((response) => {
                                console.warn("daatt", response.data);
                                if (response.code == 200) {
                                } else {
                                    setAlertTitle("Alert")
                                    setAlertText(response.message)
                                    toggleCustomAlertVisibility()
                                }
                            })
                        } else {
                            null
                        }
                        route.params.getMyCLientsList()
                        route.params.getMyCLientsListHome()
                        navigation.pop()
                    } else {
                        setAlertTitle("Alert")
                        setAlertText(response.message)
                        toggleCustomAlertVisibility()
                    }
                })
            }

        }
    }
    const openCamera = async () => {
        try {

            let value2 = await ImagePicker.openCamera({
                width: 400,
                height: 400,
                cropping: true,

            }).then(image => {
                // setAvatarSource([...avatarSource, image.path]);
                // setImagePath(image)
                // setSelectAvatarSource(image.path)
                setTestImage({
                    imagePath: image.path,
                    imageMime: image.mime
                })
            });
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
                // showCropFrame: true
                // multiple: true
            }).then(image => {
                // setSelectAvatarSource(image.path)
                setTestImage({
                    imagePath: image.path,
                    imageMime: image.mime
                })
            });
            _toggleUploadImage()
        }
        catch (error) {
            console.warn(error);
        }
    }

    const _toggleUploadImage = () => {
        setSelectIamgepicker(!selectIamgepicker)
    }


    const Canel = () => {
        navigation.pop()
    }



    const getClientApi = () => {

        // console.warn("fasfd", route.params.clientId);
        const req = `/clients/${route.params.clientId}`
        getService(req).then((response) => {
            // console.warn("==========>", response.data.companyName);
            if (response.code == 200) {
                setCompanyName(response.data.companyName)
                setCompanyState(response.data.companyState)
                setCompanyCity(response.data.companyCity)
                setCompanyArea(response.data.companyArea)
                setCompanyContactPerson(response.data.companyContactPerson)
                setCompanyDesignation(response.data.companyContactPersonDesignation)
                if (response.data.clientThumbnailImage == null) {
                    setRecentTestImage(``)
                } else {
                    setRecentTestImage(response.data.clientThumbnailImage)

                }
            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })

    }

    const handleRemoveImage = () => {
        setRecentTestImage(``)
    };

    const RemoveImage = () => {
        setTestImage(``)
    };
    React.useEffect(() => {

        if (route.params.Edit == 1) {
            getClientApi()
        } else {
            null
        }
    }, [])

    const goToClient = () => {
        navigation.navigate(ScreenNames.MYCLIENT_SCREEN)
    }
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
                <Headers name="Add Clients" backgroundColor={true} />
                <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 30, paddingVertical: 10, paddingBottom: 20 }}>
                    <Image source={{ uri: `${BASE_URL}/users/${userId}/${userImage}/thumbnailImage` }} style={{ height: 40, width: 40, borderRadius: 50 }} />
                    <View style={{ flex: 0.9 }}>
                        <Text style={[styles.font1, { marginLeft: 10 }]}>{name}</Text>
                    </View>
                </View>
            </View>
            <ScrollView style={{ flex: 1, backgroundColor: Colors.WHITE }} showsVerticalScrollIndicator={false}>


                <View style={{ flexDirection: "row", marginHorizontal: 20, marginVertical: 20, marginTop: 30, alignItems: "center" }}>
                    {testImage.imagePath ?
                        null
                        : recentTestImage ?
                            null
                            :

                            <TouchableOpacity
                                onPress={_toggleUploadImage}
                                style={styles.uploadstyle}>
                                <Text style={[styles.font1, { marginRight: 7 }]}>Upload</Text>
                                <UploadSvg />
                            </TouchableOpacity>
                    }
                </View>


                {testImage ?

                    <View>
                        <View style={{ position: "absolute", zIndex: 1, right: 15, top: 2 }}>

                            <TouchableOpacity
                                hitSlop={{ top: 30, right: 30, bottom: 30, left: 30 }}
                                onPress={() => RemoveImage()}
                                style={{ height: 15, width: 15, borderRadius: 100, backgroundColor: Colors.PRIMARY, alignItems: "center", justifyContent: "center" }}>
                                <CrossSvg />
                            </TouchableOpacity>

                        </View>

                        <View style={{ height: 150, width: SCREEN_WIDTH - 40, borderRadius: 5, marginHorizontal: 20, marginVertical: 10 }}>
                            <Image source={{ uri: testImage.imagePath }} style={{ height: "100%", width: "100%", borderRadius: 10 }} />
                        </View>
                    </View>
                    :
                    null

                }

                {
                    recentTestImage
                        ?
                        <View>
                            <View style={{ position: "absolute", zIndex: 1, right: 15, top: 2 }}>

                                <TouchableOpacity
                                    hitSlop={{ top: 30, right: 30, bottom: 30, left: 30 }}
                                    onPress={() => handleRemoveImage()}
                                    style={{ height: 15, width: 15, borderRadius: 100, backgroundColor: Colors.PRIMARY, alignItems: "center", justifyContent: "center" }}>
                                    <CrossSvg />
                                </TouchableOpacity>

                            </View>
                            <View style={{ height: 150, width: SCREEN_WIDTH - 40, borderRadius: 5, marginHorizontal: 20, marginVertical: 10 }}>
                                <Image source={{ uri: `${BASE_URL}/clients/${route.params.clientId}/${recentTestImage}/thumbnailImage` }} style={{ height: "100%", width: "100%", borderRadius: 10 }} />
                            </View>
                        </View>
                        :
                        null
                }
                <View>

                    <TextInput
                        placeholderTextColor={Colors.BLACK}

                        placeholder="Company Name " onChangeText={text => setCompanyName(text)} placeholderTextColor="#20222840" style={styles.ServiceTitle}>{companyName}</TextInput>
                    <TextInput
                        placeholderTextColor={Colors.BLACK}


                        placeholder="Company State" onChangeText={text => setCompanyState(text)} placeholderTextColor="#20222840" style={styles.ServiceTitle}>{companyState}</TextInput>
                    <TextInput
                        placeholderTextColor={Colors.BLACK}


                        placeholder="Company City" onChangeText={text => setCompanyCity(text)} placeholderTextColor="#20222840" style={styles.ServiceTitle}>{companyCity}</TextInput>
                    <TextInput
                        placeholderTextColor={Colors.BLACK}

                        placeholder="Company Area" onChangeText={text => setCompanyArea(text)} placeholderTextColor="#20222840" style={styles.ServiceTitle}>{companyArea}</TextInput>
                    <TextInput
                        placeholderTextColor={Colors.BLACK}

                        placeholder="Company Contact Person" onChangeText={text => setCompanyContactPerson(text)} placeholderTextColor="#20222840" style={styles.ServiceTitle}>{companyContactPerson}</TextInput>
                    <TextInput
                        placeholderTextColor={Colors.BLACK}

                        placeholder="Company Contact Person Designation" onChangeText={text => setCompanyDesignation(text)} placeholderTextColor="#20222840" style={styles.ServiceTitle}>{companyDesignation}</TextInput>
                </View>



            </ScrollView>




            <View style={{ flexDirection: "row", marginBottom: 20, marginTop: 10 }}>
                <View style={{ flex: 0.5, paddingLeft: 20, paddingRight: 10 }}>
                    <TouchableOpacity onPress={AddClient}
                        // onPress={() => _toggleLikeMemberModal()}
                        style={[styles.filterMemberBtn, { backgroundColor: Colors.PRIMARY }]}>
                        <Text style={styles.fontFilterBtn}>Save</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.5, paddingRight: 20, paddingLeft: 10 }}>
                    <TouchableOpacity
                        onPress={() => Canel()}
                        style={styles.filterMemberBtn}>
                        <Text style={[styles.fontFilterBtn, { opacity: 0.8 }]}>Canel</Text>
                    </TouchableOpacity>
                </View>
            </View>



            {/* <LikesModal _toggleLikeMemberModal={_toggleLikeMemberModal} likes={likes} /> */}
            <EditProfileModal openLibrary={openLibrary} openCamera={openCamera} _toggleUploadImage={_toggleUploadImage}
                SelectIamgepicker={selectIamgepicker} />
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
const mapStateToProps = state => ({
    name: state.user.name,
    email: state.user.email,
    phNo: state.user.phNo,
    userImage: state.user.thumbnailImage,
    userId: state.user.userId
});

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(mapStateToProps, mapDispatchToProps)(AddClientsScreen)
