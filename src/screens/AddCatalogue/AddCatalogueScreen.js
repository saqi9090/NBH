import React from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Headers from '../../components/Header/Header';
import { Colors, Constants, Fonts, ScreenNames, Server } from '../../global';
import { styles } from "./AddCatalogueStyles";
import UploadSvg from "../../assets/svg/upload.svg";
import { ImageExtenstion, MemberdetailData } from '../../components/DummyData/DummyDataScreen';
import { SCREEN_WIDTH } from '../../global/constants';
import CrossSvg from "../../assets/svg/crossSmall.svg"
import AddKeyWord from '../../components/AddKeyWord/AddKeyWord';
// import AddKeyWord from '../../components/AddKeyWord/AddKeyWord';
import ImagePicker from 'react-native-image-crop-picker';
import EditProfileModal from '../../components/EditProfileModal/EditProfileModal';
import axios from 'axios';
import { connect } from 'react-redux';
import CustomAlert from '../../components/CustomAlert/CusomAlert';
import { postRequest } from '../../services/postService';




const AddCatalogueScreen = ({ navigation, userId, userImage, name, route, params }) => {

    //state
    const [productImages, setProductImages] = React.useState(``);
    const [UploadImagePicker, setUploadImagePicker] = React.useState(false)
    const [id, setId] = React.useState(0)
    const [keyword, setKeyword] = React.useState("")
    const [productTitle, setProductTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [productPrice, setProductPrice] = React.useState("");
    const [productMoq, setProductMoq] = React.useState("");
    const [keywords, setKeywords] = React.useState([])
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false)
    const [alertTitle, setAlertTitle] = React.useState("");

    //function

    const Ref = React.useRef()

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }

    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }



    const AddCatalogue = async () => {




        if (!productTitle) {
            setAlertTitle("Invalid Details")
            setAlertText("Please Enter product Title")
            toggleCustomAlertVisibility()
        }
        else if (!description) {
            setAlertTitle("Invalid Details")

            setAlertText("Please Enter Description")
            toggleCustomAlertVisibility()
        }
        else if (!productPrice) {
            setAlertTitle("Invalid Details")

            setAlertText("Please Enter Product price")
            toggleCustomAlertVisibility()
        }
        else if (!productMoq) {
            setAlertTitle("Invalid Details")

            setAlertText("Please Enter Product MOQ")
            toggleCustomAlertVisibility()
        }
        else if (productImages == [] || productImages == `` || productImages == null) {
            setAlertTitle("Invalid Details")

            setAlertText("Please Add Image")
            toggleCustomAlertVisibility()
        }
        else if (keywords.length <= 0) {
            setAlertTitle("Invalid Details")

            setAlertText("Please Add Keywords")
            toggleCustomAlertVisibility()
        }
        else {
            const postData = {
                userId: userId,
                productTitle: productTitle,
                description: description,
                productPrice: productPrice,
                productMoq: productMoq,
                keywords: keywords
            }
            // const response = await axios.post(`${Server.BASE_URL}/productCatalogues`, postData)

            const uri = `/productCatalogues`
            const body = postData
            postRequest(uri, body).then((response) => {
                if (response.code == 200) {
                    var data = new FormData();
                    for (let i = 0; i < productImages.length; i++) {
                        let path = productImages[i].imagePath
                        data.append('otherImages', { uri: path, type: productImages[i].imageMime, name: path.slice(path.lastIndexOf('/'), path.length) });
                    }
                    // const responseImage = await axios.post(`${Server.BASE_URL}/productCatalogues/${response.data}/otherImages`, data)
                    const uri = `/productCatalogues/${response.data}/otherImages`
                    const body = data
                    postRequest(uri, body).then((response) => {
                        if (response.code == 200) {
                            if (route.params.flag == 1) {
                                route.params.getUserDetails();
                            } else {
                                route.params.getProductCatalogue();
                            }
                            navigation.pop()
                        } else {
                            setAlertTitle("Alert")
                            setAlertText(response.message)
                            toggleCustomAlertVisibility()
                        }
                    })

                } else {
                    setAlertTitle("Alert")
                    setAlertText(response.message)
                    toggleCustomAlertVisibility()
                }
            })
        }
    }

    const openCamera = async () => {
        try {

            let value2 = await ImagePicker.openCamera({
                width: 400,
                height: 400,
                cropping: true,

            }).then(image => {

                setProductImages([...productImages, {
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
                // showCropFrame: true
                // multiple: true
            }).then(image => {
                // setSelectAvatarSource(image.path)
                setProductImages([...productImages, {
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
        setUploadImagePicker(!UploadImagePicker)
    }

    const handleRemoveImage = (item) => {
        const newImages = productImages.filter(e => e.id != item)
        setProductImages(newImages)
    };

    const addKeyword = (text) => {
        if (text.indexOf(' ') >= 0) {
            setKeywords([...keywords, text.slice(0, -1)])
            setKeyword("")
        } else {
            setKeyword(text)
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE }} behavior={Platform.OS == "android" ? null : "padding"}>
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
                <Headers name="Add Catalogue" backgroundColor={true} />
                <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 30, paddingVertical: 10, paddingBottom: 20 }}>
                    <Image source={{ uri: `${Server.BASE_URL}/users/${userId}/${userImage}/thumbnailImage` }} style={{ height: 40, width: 40, borderRadius: 50 }} />
                    <View style={{ flex: 0.9 }}>

                        <Text style={[styles.font1, { marginLeft: 10 }]}>{name}</Text>
                    </View>
                </View>
            </View>
            <ScrollView style={{ flex: 1, backgroundColor: Colors.WHITE }}>


                <View style={{ flexDirection: "row", marginHorizontal: 20, marginVertical: 20, marginTop: 30 }}>
                    <TouchableOpacity
                        onPress={_toggleUploadImage}
                        style={styles.uploadstyle}>
                        <Text style={[styles.font1, { marginRight: 7 }]}>Upload</Text>
                        <UploadSvg />
                    </TouchableOpacity>
                    {/* <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                        {
                            Array.isArray(ImageExtenstion)
                            &&
                            (
                                ImageExtenstion.map(e => <View style={{ marginBottom: 10 }}>
                                    <Text style={{ fontSize: 16, fontFamily: Fonts.REGULAR, color: Colors.ONYXOpacity, marginLeft: 7 }}>{e.name}</Text>
                                </View>)
                            )
                        }
                    </View> */}
                </View>

                <FlatList data={productImages}
                    style={{ paddingHorizontal: 10 }}

                    numColumns={3}
                    keyExtractor={(item) => `Image${item.id}`}
                    renderItem={({ item, index }) => (


                        <View style={{ backgroundColor: Colors.WHITE }}>

                            <View style={{ height: 100, width: SCREEN_WIDTH / 3 - 27, backgroundColor: "red", borderRadius: 5, marginHorizontal: 10, marginVertical: 10 }}>
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
                    )} />

                <TextInput
                    placeholderTextColor={Colors.BLACK}

                    onChangeText={text => setProductTitle(text)}
                    placeholder="Product/Service Tilte" style={styles.ServiceTitle}>{productTitle}</TextInput>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => Ref.current.focus()}>

                    <View style={styles.AddPostInput}>
                        <TextInput
                            ref={Ref}
                            placeholderTextColor={Colors.BLACK}

                            onChangeText={text => setDescription(text)}

                            multiline placeholder="Write Description"
                            style={{ paddingHorizontal: 20, fontSize: 16, fontFamily: Fonts.REGULAR }}>
                            {description}</TextInput>
                    </View>
                </TouchableOpacity>

                <View style={{ flexDirection: "row", marginHorizontal: 20, marginVertical: 10, alignItems: "center" }}>
                    <Text style={styles.font2}>Price of Product</Text>
                    <TextInput
                        keyboardType="number-pad"
                        placeholderTextColor={Colors.BLACK}


                        onChangeText={text => setProductPrice(text)}

                        style={styles.priceProduct} placeholder="E.g. ₹100">{productPrice}</TextInput>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 20, marginVertical: 5 }}>
                    <Text style={styles.font2}>MOQ of Product</Text>
                    <TextInput
                        placeholderTextColor={Colors.BLACK}

                        keyboardType="number-pad"

                        onChangeText={text => setProductMoq(text)}
                        style={styles.priceProduct} placeholder="E.g. 50">
                        {productMoq}
                    </TextInput>
                </View>

                <View style={{ marginHorizontal: 20 }}>
                    <Text style={[styles.font2, { marginVertical: 20 }]}>Add Keywords</Text>
                    <View style={{ flex: 1, backgroundColor: Colors.SOMKEWHITE, borderRadius: 20, maxHeight: 150 }}>
                        {
                            keywords.length == 0 ?
                                <TextInput
                                    placeholderTextColor={Colors.BLACK}
                                    onChangeText={text => addKeyword(text)}
                                    style={{ ...styles.priceProduct }}
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
                </View>


                <View style={{ flexDirection: "row", marginBottom: 20, marginTop: 30 }}>
                    <View style={{ flex: 1, paddingLeft: 20, paddingRight: 10 }}>
                        <TouchableOpacity
                            onPress={() => AddCatalogue()}
                            style={[styles.filterMemberBtn, { backgroundColor: Colors.PRIMARY }]}>
                            <Text style={styles.fontFilterBtn}>Add</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </ScrollView>


            {/* <LikesModal _toggleLikeMemberModal={_toggleLikeMemberModal} likes={likes} /> */}

            <EditProfileModal openLibrary={openLibrary} openCamera={openCamera} _toggleUploadImage={_toggleUploadImage} SelectIamgepicker={UploadImagePicker} />
            <CustomAlert
                title={alertTitle}
                desc={alertText}
                leftButtonText={"Ok"}
                leftButtonFunction={leftButtonFunction}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility}
                customAlertVisible={customAlertVisible}
            />
        </KeyboardAvoidingView >

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

export default connect(mapStateToProps, mapDispatchToProps)(AddCatalogueScreen)
