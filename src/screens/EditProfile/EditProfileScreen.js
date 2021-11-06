import React from 'react'
import { View, Text, Image, TextInput, ScrollView, FlatList, Platform, Linking, TouchableOpacity, Alert, PermissionsAndroid, KeyboardAvoidingView } from 'react-native'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import { Colors, Constants, Fonts, ScreenNames, Server } from '../../global';
import Headers from "../../components/Header/Header";
import { styles } from "./EditProfileStyles"
import CameraBule from "../../assets/svg/cameraBlue.svg";
import CrossSvg from '../../assets/svg/crossSmall'
import AddSvg1 from "../../assets/svg/add1.svg";
import { SCREEN_WIDTH } from '../../global/constants';
import { MemberdetailData } from "../../components/DummyData/DummyDataScreen"
import AddKeyWord from '../../components/AddKeyWord/AddKeyWord';
import Download from "../../assets/svg/download1.svg";
import EditProfileModal from '../../components/EditProfileModal/EditProfileModal';
import ImagePicker from 'react-native-image-crop-picker';
import { set } from 'react-native-reanimated';
import { globalStyles } from '../../global/globalStyles';
import axios from 'axios';
import { connect } from 'react-redux';
import * as UserActions from '../../redux/actions/userActions'
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import CustomAlert from '../../components/CustomAlert/CusomAlert';
import { CommonActions } from '@react-navigation/routers';
import { useNavigation } from '@react-navigation/core';
import EditSvg from "../../assets/svg/editblack.svg";
import { PutService } from '../../services/PutService';
import { getService } from '../../services/getService';
import { postRequest } from '../../services/postService';
// import RNFS from "react-native-fs"



const EditProfileScreen = ({ userId, dispatch, route, params, officeAddress }) => {

    var RNFS = require('react-native-fs');


    const navigation = useNavigation()

    //state
    const [profileImage, setProfileImage] = React.useState(``);
    const [selectIamgepicker, setSelectIamgepicker] = React.useState(false)


    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [mobileNumber, setMobileNumber] = React.useState("");
    const [whatsAppMobileNumber, setWhatsAppMobileNumber] = React.useState("");

    const [businessName, setBusinessName] = React.useState("");
    const [bussinessCategory, setBussinessCategory] = React.useState("");
    const [bussinessSubCategory, setBussinessSubCategory] = React.useState("");
    const [aboutMember, setAboutMember] = React.useState("");
    const [gstNumber, setGstNumber] = React.useState("");
    const [website, setWebsite] = React.useState("");
    const [officeContactNumber, setOfficeContactNumber] = React.useState("");
    const [businessProfile, setBusinessProfile] = React.useState(null);
    const [businessBrochure, setBusinessBrochure] = React.useState(null);
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false)

    const [alertText2, setAlertText2] = React.useState('');
    const [customAlertVisible2, setCustomAlertVisible2] = React.useState(false)


    const [keyword, setKeyword] = React.useState("")
    const [keywords, setKeywords] = React.useState([])


    const [officeAddressData, setOfficeAddressData] = React.useState([])






    //function
    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }

    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }


    const toggleCustomAlertVisibility2 = () => { setCustomAlertVisible2(!customAlertVisible2) }

    const leftButtonFunction2 = () => {
        toggleCustomAlertVisibility2()
    }
    const resetStackAndGoToHome = CommonActions.reset({
        index: 0,
        routes: [{ name: ScreenNames.BOTTOM_TABS, }],
    });

    const addKeyword = (text) => {
        if (text.indexOf(' ') >= 0) {
            setKeywords([...keywords, text.slice(0, -1)])
            setKeyword("")
        } else {
            setKeyword(text)
        }
    }




    const goAddressMap = (edit) => {
        navigation.navigate(ScreenNames.ADD_ADDRESS_MAP_SCREEN, { edit: edit, })
    }

    const UpdateProfile = async () => {


        try {
            if (!firstName) {
                setAlertText("Please Enter FirstName")
                toggleCustomAlertVisibility()
            }
            else if (!lastName) {
                setAlertText("Please Enter LastName")
                toggleCustomAlertVisibility()
            }
            else if (!email) {
                setAlertText("Please Enter Email")
                toggleCustomAlertVisibility()
            }
            else if (!mobileNumber) {
                setAlertText("Please Enter MobileNumber")
                toggleCustomAlertVisibility()
            }
            else if (!whatsAppMobileNumber) {
                setAlertText("Please Enter WhatsApp Number")
                toggleCustomAlertVisibility()
            }
            else if (!bussinessCategory) {
                setAlertText("Please Enter bussinessCategory")
                toggleCustomAlertVisibility()
            }
            else if (!aboutMember) {
                setAlertText("Please Enter AboutMember")
                toggleCustomAlertVisibility()
            }
            else if (!officeContactNumber) {
                setAlertText("Please Enter OfficeContactNumber")
                toggleCustomAlertVisibility()
            }
            else {

                if (officeAddress.officeBuilding) {
                    const postData = {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        phone: parseInt(mobileNumber),
                        whatsAppNumber: whatsAppMobileNumber,
                        businessName: businessName,
                        category: bussinessCategory,
                        subCategory: bussinessSubCategory,
                        aboutMember: aboutMember,
                        gstNo: gstNumber,
                        website: website,
                        officeContactNo: officeContactNumber,
                        userKeywords: keywords,
                        ...officeAddress
                    }
                    if (profileImage) {
                        var imageData = new FormData();
                        let path = profileImage.imagePath;
                        imageData.append('thumbnailImage', { uri: profileImage.imagePath, type: profileImage.imageMime, name: path.slice(path.lastIndexOf('/'), path.length) });
                        // const responseImage = await axios.post(`${Server.BASE_URL}/users/${userId}/thumbnailImage`, imageData);

                        const uri = `/users/${userId}/thumbnailImage`
                        const body = imageData
                        postRequest(uri, body).then((responseImage) => {
                            if (responseImage.code == 200) {
                                if (responseImage) {
                                    dispatch(UserActions.setUserImage(responseImage.data));
                                }
                            } else {
                                setAlertText2(responseImage.message)
                                toggleCustomAlertVisibility2()
                            }
                        })
                    }
                    if (businessProfile) {
                        let imageData = new FormData();
                        let path = businessProfile.uri;

                        imageData.append('fileData',
                            {
                                uri: businessProfile.uri,
                                type: businessProfile.type,
                                name: businessProfile.name,
                                // path.length) 
                            })


                        const uri = `/users/${userId}/businessProfile`
                        const body = imageData
                        postRequest(uri, body).then((response) => {
                            if (response.code == 200) {
                                if (response) {
                                    dispatch(UserActions.setBussinessProfie(response.data));
                                }


                            } else {
                                console.log(response.message);
                            }
                        })
                    }

                    if (businessBrochure) {
                        let imageData = new FormData();
                        let path = businessBrochure.uri;
                        imageData.append('fileData',
                            {
                                uri: businessBrochure.uri,
                                type: businessBrochure.type,
                                name: businessBrochure.name,
                                // path.length) 
                            })


                        const uri = `/users/${userId}/businessBrochure`
                        const body = imageData
                        postRequest(uri, body).then((response) => {


                            if (response.code == 200) {
                                if (response) {

                                    dispatch(UserActions.setBussinessBronche(response.data));
                                }

                            } else {
                                console.log(response.message);
                            }
                        })
                    }

                    const uri = `/users/${userId}`
                    const body = postData
                    PutService(uri, body).then((response) => {
                        if (response.code == 200) {


                            dispatch(UserActions.setName(response.data.name))
                            dispatch(UserActions.setFirstName(response.data.firstName))
                            dispatch(UserActions.setLastName(response.data.lastName))
                            dispatch(UserActions.setPhone(response.data.phone))
                            dispatch(UserActions.setUserImage(response.data.thumbnailImage))
                            dispatch(UserActions.setEmail(response.data.email))
                            if (route.params.edit == 1) {
                                navigation.dispatch(resetStackAndGoToHome)
                            } else {
                                navigation.pop()
                            }
                        }
                        else {
                            setAlertText2(response.message)
                            toggleCustomAlertVisibility2()
                        }
                    })
                    // dispatch(UserActions.setWhatsAppNumber(userDetails.data.whatsAppNumber))
                    // route.params.saveAddress() && route.params.saveAddress()
                }
                else {
                    setAlertText2("Please Enter Address")
                    toggleCustomAlertVisibility2()
                }
            }
        } catch (error) {
            console.warn(error.message);
        }
    }


    // const doucument = async () => {
    //     setTimeout(async () => {
    //         try {
    //             const res = await DocumentPicker.pick({
    //                 type: [DocumentPicker.types.allFiles]
    //             })
    //             const fileName = res.uri.replace("file://", "")
    //             let data = ''
    //             RNFetchBlob.fs.readStream(
    //                 fileName,
    //                 'base64',
    //                 4095)
    //                 .then((ifstream) => {
    //                     ifstream.open()
    //                     ifstream.onData((data) => {
    //                         console.log("checkw stream", data);
    //                         let base64 = `data:${res.type};base64,` + data
    //                         const param = {
    //                             base64: base64,
    //                             width: 300,
    //                             height: 300,
    //                             name: res.name,
    //                             type: res.type,
    //                             size: 7391,
    //                             fileName: res.name
    //                         }

    //                         const split = res.url.split('/');
    //                         const name = split.pop();
    //                         const inbox = split.pop();
    //                         const realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;

    //                         let uploadUrl = `${Server.BASE_URL}/users/${userId}/businessProfile`

    //                         RNFS.uploadFiles({
    //                             // fileData
    //                             // timeout: 1000,
    //                             toUrl: uploadUrl,     //Add a Post Uri
    //                             files: [{

    //                                 name,
    //                                 filename: name,
    //                                 filepath: realPath,
    //                             }],
    //                             method: 'POST',
    //                             headers: {
    //                                 'Accept': 'application/json',
    //                             },
    //                             fields: {
    //                                 'title': "sdasfadf"
    //                             },

    //                             begin: uploadBegin,
    //                             // beginCallback: uploadBegin, // Don't ask me, only way I made it work as of 1.5.1
    //                             // progressCallback: uploadProgress,
    //                             progress: uploadProgress
    //                         })
    //                         console.log("pharams == data", param)
    //                         ifstream.onError((err) => {
    //                             console.log("oops", err);
    //                         })
    //                     })
    //                 })

    //         } catch (error) {
    //             console.warn("ddd", error.message);
    //         }
    //     })
    // }
    const onChange1 = e => {
        const input = e;
        let regax = new RegExp(/[0-9]$/)
        if (regax.test(input) || input == "") {
            // setValueLogin(input);
            alert("working")
        }
        else {
            alert("only number allow ")
        }
    };


    const openCamera = async () => {
        try {
            // _hidemodalselectimagepicker()
            let value2 = await ImagePicker.openCamera({
                width: 400,
                height: 400,
                cropping: true,
                cropperCircleOverlay: true,

            }).then(image => {
                // setAvatarSource([...avatarSource, image.path]);
                // setImagePath(image)
                // setSelectAvatarSource(image.path)
                setProfileImage({
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
            // _hidemodalselectimagepicker()
            let value = await ImagePicker.openPicker({
                width: 400,
                height: 400,
                cropping: true,
                cropperCircleOverlay: true,
                // showCropFrame: true
                // multiple: true
            }).then(image => {
                // setSelectAvatarSource(image.path)
                setProfileImage({
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

    const openGps = (lat, lng) => {
        var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
        var url = scheme + `${lat},${lng}`;
        Linking.openURL(url);
    }

    const uploadBussinessProfile = async () => {
        try {
            const writeExtStoPer = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            const readExtStoPer = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            setBusinessProfile({
                uri: res.uri,
                type: res.type, // mime type
                name: res.name,
                size: res.size
            });
        } catch (error) {
            console.warn(error.response);
        }
    }



    const uploadBusinessBrochure = async () => {
        try {
            const writeExtStoPer = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            const readExtStoPer = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            setBusinessBrochure({
                uri: res.uri,
                type: res.type, // mime type
                name: res.name,
                size: res.size
            });


        } catch (error) {
            console.warn(error.response);
        }
    }

    const getUserDetails = async () => {


        const req = `/users/${userId}`
        getService(req).then((userDetails) => {
            if (userDetails.code == 200) {
                setFirstName(userDetails.data.firstName)
                setLastName(userDetails.data.lastName)
                setEmail(userDetails.data.email)
                setBusinessName(userDetails.data.businessName)
                setMobileNumber(userDetails.data.phone)
                setWhatsAppMobileNumber(userDetails.data.whatsAppNumber)
                setBussinessCategory(userDetails.data.category)
                setBussinessSubCategory(userDetails.data.subCategory)
                setAboutMember(userDetails.data.aboutMember)
                setGstNumber(userDetails.data.gstNo)
                setOfficeContactNumber(userDetails.data.officeContactNo)
                setWebsite(userDetails.data.website)
                setKeywords(userDetails.data.userKeywords)
            }
            else {
                setAlertText2(userDetails.message)
                toggleCustomAlertVisibility2()
            }
        })

    }

    React.useEffect(() => {
        getUserDetails()
    }, [])



    const [addressById, setaddressById] = React.useState(null)

    const getAddress = async () => {

        const req = `/users/${userId}/allAddress`
        getService(req).then((response) => {
            if (response.code == 200) {
                setaddressById(response.data)
            }
            else {
                setAlertText2(response.message)
                toggleCustomAlertVisibility2()
            }

        })

    }

    React.useEffect(() => {
        getAddress()
    }, [])


    const [imageUri, setImageUri] = React.useState(null)

    const getImage = async () => {
        // const userDetails = await axios.get(`${Server.BASE_URL}/users/${userId}`);
        // if (userDetails) {
        //     setImageUri({ uri: `${Server.BASE_URL}/users/${userId}/${userDetails.data.thumbnailImage}/thumbnailImage` })
        // } else {
        //     setImageUri(require('../../assets/images/Avatar.png'))
        // }

        const req = `/users/${userId}`
        getService(req).then((userDetails) => {
            if (userDetails.code == 200) {
                if (userDetails) {
                    setImageUri({ uri: `${Server.BASE_URL}/users/${userId}/${userDetails.data.thumbnailImage}/thumbnailImage` })
                } else {
                    setImageUri(require('../../assets/images/Avatar.png'))
                }
            }
            else {
                setAlertText2(userDetails.message)
                toggleCustomAlertVisibility2()
            }
        })

    }

    React.useEffect(() => {
        getImage()
    }, [])

    //list data 

    const renderItemAddress = ({ item, index }) => {
        return (

            <View style={styles.MemberAddress}>
                <View style={{ marginVertical: 10 }}>
                    {/* <Text style={[styles.font2, { color: Fonts.BLACK, fontSize: 12 }]}>{item.addressType}</Text> */}
                    <Text style={styles.fontAddress}>{item.flatNo},{item.floor},{item.building},{item.landmark},{item.city},{item.pincode}</Text>
                </View>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE }} behavior={Platform.OS == "android" ? null : "padding"}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} isTransparent={false} />
            <Headers name="Edit Profile"
                backgroundColor={true}
                YellowHomeIcon={route.params.edit == 1 ? false : route.params.Home == 0 ? false : true}
                activateLeftIcon={route.params.edit == 1 ? false : true}
                YellowHomeOnpress={() => navigation.navigate(ScreenNames.HOME_SCREEN)}
                updateBtn={true}
                UpdateOnpress={UpdateProfile}
            />
            {/* <View style={styles.elevation}> */}
            <ScrollView showsVerticalScrollIndicator={false}>


                <View style={{ marginVertical: 30, marginHorizontal: 20 }}>
                    <View style={{ height: 100, width: 100, borderRadius: 100 }} >
                        {
                            profileImage ?
                                <Image source={{ uri: profileImage.imagePath }} style={{ height: "100%", width: "100%", borderRadius: 100 }} />
                                :
                                <Image source={imageUri && imageUri} style={{ height: "100%", width: "100%", borderRadius: 100 }} />
                        }
                        <TouchableOpacity
                            onPress={_toggleUploadImage}
                            style={{ position: "absolute", bottom: 0, right: 5, height: 30, width: 30, alignItems: "center", justifyContent: "center" }}>
                            <CameraBule />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <View style={styles.alignwithmargin}>
                        <TextInput
                            placeholderTextColor={Colors.BLACK}
                            onChangeText={text => setFirstName(text)}
                            style={styles.filterinput}
                            placeholder="First Name">{firstName}</TextInput>
                        <View style={styles.sectionLine}></View>
                    </View>

                    <View style={styles.alignwithmargin}>
                        <TextInput
                            placeholderTextColor={Colors.BLACK}
                            onChangeText={text => setLastName(text)}

                            style={styles.filterinput}
                            placeholder="Last Name">{lastName}</TextInput>
                        <View style={styles.sectionLine}></View>
                    </View>



                    <View style={styles.alignwithmargin}>
                        <TextInput
                            placeholderTextColor={Colors.BLACK}
                            onChangeText={text => setEmail(text)}

                            style={styles.filterinput}
                            placeholder="Email Id">{email}</TextInput>
                        <View style={styles.sectionLine}></View>
                    </View>

                    <View style={styles.alignwithmargin}>
                        <TextInput
                            placeholderTextColor={Colors.BLACK}
                            onChangeText={text => setMobileNumber(text)}
                            keyboardType="number-pad"
                            maxLength={10}
                            style={styles.filterinput}
                            placeholder="Mobile Number">{mobileNumber}</TextInput>
                        <View style={styles.sectionLine}></View>
                    </View>

                    <View style={styles.alignwithmargin}>
                        <TextInput
                            placeholderTextColor={Colors.BLACK}
                            onChangeText={text => setWhatsAppMobileNumber(text)}
                            keyboardType="number-pad"
                            maxLength={10}

                            style={styles.filterinput}
                            placeholder="WhatsApp Number">{whatsAppMobileNumber}</TextInput>
                        <View style={styles.sectionLine}></View>
                    </View>
                    <View style={styles.alignwithmargin}>
                        <TextInput
                            placeholderTextColor={Colors.BLACK}
                            onChangeText={text => setBusinessName(text)}
                            style={styles.filterinput}
                            placeholder="Business Name">{businessName}</TextInput>
                        <View style={styles.sectionLine}></View>
                    </View>

                    <View style={styles.alignwithmargin}>
                        <TextInput
                            placeholderTextColor={Colors.BLACK}
                            onChangeText={text => setBussinessCategory(text)}

                            style={styles.filterinput}
                            placeholder="Business Category">{bussinessCategory}</TextInput>
                        <View style={styles.sectionLine}></View>
                    </View>

                    <View style={styles.alignwithmargin}>
                        <TextInput
                            placeholderTextColor={Colors.BLACK}
                            onChangeText={text => setBussinessSubCategory(text)}

                            style={styles.filterinput}
                            placeholder="Business Sub-Category">{bussinessSubCategory}</TextInput>
                        <View style={styles.sectionLine}></View>
                    </View>





                    <View style={[styles.alignwithmargin, { marginVertical: 0, marginTop: 20 }]}>
                        <Text style={[styles.font1, { color: Colors.ONYX_60 }]}>Add Keywords</Text>
                        {
                            keywords.length == 0 ?
                                <TextInput
                                    placeholderTextColor={Colors.BLACK}
                                    onChangeText={text => addKeyword(text)}
                                    style={{ ...styles.priceProduct, width: SCREEN_WIDTH - 40, marginLeft: 0, marginTop: 20 }}
                                    placeholder="Enter Keyword"
                                >{keyword}</TextInput>
                                :
                                null
                        }
                        <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>
                            {
                                keywords.map((item, index) => (
                                    index == keywords.length - 1 ?
                                        <View style={{ flexDirection: "row" }}>
                                            <AddKeyWord item={item} setKeywords={setKeywords} keywords={keywords} />
                                            <TextInput
                                                placeholderTextColor={Colors.BLACK}
                                                onChangeText={text => addKeyword(text)}
                                                style={{ ...styles.priceProduct }}
                                                placeholder="Enter Keyword"
                                            >{keyword}</TextInput>
                                        </View>
                                        :
                                        <AddKeyWord item={item} setKeywords={setKeywords} keywords={keywords} />
                                ))
                            }

                        </View>
                    </View>

                    <View style={styles.alignwithmargin}>
                        <TextInput
                            onChangeText={text => setAboutMember(text)}
                            placeholderTextColor={Colors.BLACK}
                            style={styles.filterinput}
                            placeholder="About Member">{aboutMember}</TextInput>
                        <View style={styles.sectionLine}></View>
                    </View>

                    <View style={styles.alignwithmargin}>
                        <TextInput
                            autoCapitalize={"characters"}
                            onChangeText={text => setGstNumber(text.toUpperCase())}
                            placeholderTextColor={Colors.BLACK}
                            maxLength={15}
                            style={styles.filterinput}
                            placeholder="GST No.">{gstNumber}</TextInput>
                        <View style={styles.sectionLine}></View>
                    </View>

                    <View style={styles.alignwithmargin}>
                        <TextInput
                            onChangeText={text => setWebsite(text)}
                            placeholderTextColor={Colors.BLACK}
                            style={styles.filterinput}
                            placeholder="Website">{website}</TextInput>
                        <View style={styles.sectionLine}></View>
                    </View>

                    <View style={styles.alignwithmargin}>
                        <TextInput
                            onChangeText={text => setOfficeContactNumber(text)}
                            keyboardType="number-pad"
                            placeholderTextColor={Colors.BLACK}
                            style={styles.filterinput}
                            maxLength={10}

                            placeholder="Office Contact No.">{officeContactNumber}</TextInput>
                        <View style={styles.sectionLine}></View>
                    </View>
                    <View style={styles.alignwithmargin}>
                        {
                            officeAddress.officeBuilding
                                ?
                                <>
                                    <Text style={[styles.font1, { color: Colors.ONYX_60, marginBottom: 10 }]}>GEO Location</Text>
                                    <View style={{ marginVertical: 10, flexDirection: "row", justifyContent: "space-between" }}>
                                        {/* <Text style={[styles.font2, { color: Fonts.BLACK, fontSize: 12 }]}>{item.addressType}</Text> */}
                                        <Text style={{ ...styles.fontAddress, width: Constants.SCREEN_WIDTH - 100 }}>{officeAddress.officeBuilding}, {officeAddress.officeFlatNo}, {officeAddress.officeFloor}, {officeAddress.officeLandmark}, {officeAddress.officeCity}, {officeAddress.officePincode}</Text>
                                        <TouchableOpacity onPress={() => goAddressMap(1)}>
                                            <EditSvg />
                                        </TouchableOpacity>
                                    </View>
                                </>
                                :
                                <>
                                    <TouchableOpacity hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
                                        // onPress={() => openGps(27.2046, 77.4977)
                                        onPress={() => goAddressMap(1)}
                                    >
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <View style={{ flex: 0.9 }}>
                                                <TextInput
                                                    editable={false}

                                                    placeholderTextColor={Colors.BLACK}
                                                    style={styles.memberDeatilInput}
                                                    placeholder="Geo Location"></TextInput>
                                            </View>
                                            <View style={{ flex: 0.1, marginLeft: 10 }}>
                                                <AddSvg1 />
                                            </View>


                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.sectionLine}></View>
                                </>
                        }
                    </View>

                    <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                        {
                            businessProfile
                                ?
                                <View style={{ alignItems: "center", flexDirection: "row", marginVertical: 7 }}>
                                    <Text style={[styles.font2, { marginRight: 10 }]}>
                                        {businessProfile.name}
                                    </Text>
                                    <TouchableOpacity
                                        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                                        onPress={() => setBusinessProfile(null)}>
                                        <CrossSvg />
                                    </TouchableOpacity>
                                </View>
                                :
                                <TouchableOpacity style={{ alignItems: "center", flexDirection: "row", marginVertical: 7 }}
                                    onPress={() => uploadBussinessProfile()}>
                                    <Text style={[styles.font2, { marginRight: 10 }]}>Upload Business Profile</Text>
                                    <Download />
                                </TouchableOpacity>
                        }
                        {
                            businessBrochure
                                ?
                                <View style={{ alignItems: "center", flexDirection: "row", marginVertical: 7 }}>
                                    <Text style={[styles.font2, { marginRight: 10 }]}>
                                        {businessBrochure.name}
                                    </Text>
                                    <TouchableOpacity
                                        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                                        onPress={() => setBusinessBrochure(null)}>
                                        <CrossSvg />
                                    </TouchableOpacity>
                                </View>
                                :
                                <TouchableOpacity style={{ alignItems: "center", flexDirection: "row", marginVertical: 7 }}
                                    onPress={() => uploadBusinessBrochure()}>
                                    <Text style={[styles.font2, { marginRight: 10 }]}>Upload Business Brochure</Text>
                                    <Download />
                                </TouchableOpacity>
                        }

                    </View>


                </View>
                <View style={{ marginVertical: 20, marginHorizontal: 0 }}>
                    <TouchableOpacity
                        onPress={UpdateProfile}
                        style={globalStyles.button}>
                        <Text style={globalStyles.buttonText}>Update Profile</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
            <EditProfileModal openLibrary={openLibrary} openCamera={openCamera}
                _toggleUploadImage={_toggleUploadImage}
                SelectIamgepicker={selectIamgepicker} />

            <CustomAlert
                title={"Invalid Details"}
                desc={alertText}
                leftButtonText={"Ok"}
                leftButtonFunction={leftButtonFunction}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility}
                customAlertVisible={customAlertVisible}
            />

            <CustomAlert
                title={"Alert"}
                desc={alertText2}
                leftButtonText={"Ok"}
                leftButtonFunction={leftButtonFunction2}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility2}
                customAlertVisible={customAlertVisible2}
            />
        </KeyboardAvoidingView>
        // </View >
    )
}
const mapStateToProps = state => ({
    name: state.user.name,
    email: state.user.email,
    phNo: state.user.phNo,
    userImage: state.user.thumbnailImage,
    userId: state.user.userId,
    officeAddress: state.user.officeAddress
});

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
