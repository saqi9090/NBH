import React, { useState } from 'react';

import {
	View,
	Text,
	StatusBar,
	Image,
	ScrollView,
	TextInput,
	TouchableOpacity,
	Modal,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	FlatList,
	Alert,
	Dimensions,
	Platform,
	PermissionsAndroid,
} from 'react-native';
import BackSvg from '../../assets/svg/c-back icon.svg';
import SendSvg from '../../assets/svg/c-send.svg';
import MenuSvg from '../../assets/svg/c- three dots.svg';
import { styles } from './ChatScreenCodeStyle';
import UpArrowSvg from '../../assets/svg/c-uparrow.svg';
import BlockSvg from '../../assets/svg/c-block.svg';
import PhoneSvg from '../../assets/svg/c-call.svg';
import CalendarSvg from '../../assets/svg/c-calendar.svg';
import CameraSvg from '../../assets/svg/c-camera.svg';
import GallerySvg from '../../assets/svg/c-gallery.svg';
import DocSvg from '../../assets/svg/c-doc.svg';
import LocationSvg from '../../assets/svg/c-location.svg';
import ContactSvg from '../../assets/svg/c-contact.svg';
import LinearGradient from 'react-native-linear-gradient';
import Msgbox from '../../components/MessageBox/MessageBox';
import { Colors, Fonts, ScreenNames, Server } from '../../global';
import database from '@react-native-firebase/database'
import { firebase, } from '@react-native-firebase/auth';
import { connect } from 'react-redux';
import moment from 'moment';
import SendBox from '../../components/SendBox/SendBox';
import EditProfileModal from '../../components/EditProfileModal/EditProfileModal';
import ImagePicker from 'react-native-image-crop-picker';
import ChatHeader from "./ChatHeader"
import ChatModal from '../../components/ChatModal/ChatModal';
import ImageLoader from '../../components/ImageLoader/ImageLoader';
import { useNavigation } from '@react-navigation/core';
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import { SCREEN_WIDTH } from '../../global/constants';
import { Pdf } from 'react-native-openanything';
import { postRequest } from '../../services/postService';
import CustomAlert from '../../components/CustomAlert/CusomAlert';

const ChatScreen = ({ uid, userId, userName, route, params }) => {

	//state
	const [show, setShow] = React.useState('');
	const [text, setText] = useState('');
	const [block, setBlock] = React.useState(false);
	const [userMessage, setUserMessage] = React.useState(null);
	const [messages, setMessages] = React.useState(null);
	const [profileImage, setProfileImage] = React.useState(``);
	const [userImage, setUserImage] = React.useState('')
	const [selectIamgepicker, setSelectIamgepicker] = React.useState(false)
	const [messageNode, setMessageNode] = React.useState(null);
	const [documentData, setDocumentData] = React.useState('')
	const [alertTitle, setAlertTitle] = React.useState("");
	const [alertText, setAlertText] = React.useState('');
	const [customAlertVisible, setCustomAlertVisible] = React.useState(false);

	const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
	const leftButtonFunction = () => {
		toggleCustomAlertVisibility()
	}

	//useref
	const emailRef = React.useRef(null);
	const passwordRef = React.useRef(null);
	const password = React.useRef(``);



	//navigation 
	const navigation = useNavigation()


	//Image Download ==================
	const downloadImage = () => {
		if (profileImage) {

			var date = new Date();
			var url = `https://${profileImage.imagePath}`;
			var ext = getExtention(url);
			ext = "." + ext[0];
			const { config, fs } = RNFetchBlob;
			let PictureDir = fs.dirs.PictureDir
			let options = {
				fileCache: true,
				addAndroidDownloads: {
					useDownloadManager: true,
					notification: true,
					path: PictureDir + "/image_" + Math.floor(date.getTime()
						+ date.getSeconds() / 2) + ext,
					description: 'Image'
				}
			}
			config(options).fetch('GET', url).then((res) => {
				Alert.alert("Download Success !");
			});

		}
		else {
			alert("Image is undefine", profileImage.imagePath)
		}
	}
	const getExtention = (filename) => {
		return (
			(/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined
		)
	}


	React.useEffect(() => {
		setMessageNode(userId.toString() + route?.params?.otherUserId)
	}, [])






	// ================================


	///=========doc==========

	let DownloadDir = Platform.OS == "ios" ? RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.DownloadDir;

	const pdfDownload = () => {
		RNFetchBlob
			.config({
				// add this option that makes response data to be stored as a file,
				// this is much more performant.
				fileCache: true,
				addAndroidDownloads: {
					useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
					notification: true,
					path: `${DownloadDir}/NBH${route.params.orderId}.pdf`, // this is the path where your downloaded file will live in
					description: 'NBH Invoice',
					// title: `SM_Invoice${Date.now()}.pdf`,
					title: `NBH${Orderid}.pdf`,
					mime: 'application/pdf',
					mediaScannable: true
				}
			})
			.fetch('GET', `${Server.BASE_URL}/order/${route.params.orderId}/generatedPdf`)
			.then((resp) => {
				// setLoading(false);
				// setCustomToast(true)
				// dispatch(UserActions.showToast(`Downloaded To ${DownloadDir}`));
			})
			.catch((error) => {
				// setLoading(false);
				console.warn("=>>", error.message);
			})
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


	React.useEffect(() => {
		askPermission()
	}, [])

	React.useEffect(() => {
		database().ref('Messages').on('value', messages => {
			if (!messages.exists()) {

			} else {
				database().ref('Messages').child(route?.params?.otherUserId + userId.toString()).on('value', element => {
					if (!element.exists()) {
						database().ref('Messages').child(userId.toString() + route?.params?.otherUserId).on('value', element => {
							if (!element.exists()) {
							}
							else {
								setMessageNode(userId.toString() + route?.params?.otherUserId)
								let abc = Object.values(element.val())
								setMessages(abc.sort(function (a, b) {
									return new Date(b.time) - new Date(a.time)
								}))
							}

						})
					} else {
						setMessageNode(route?.params?.otherUserId + userId.toString())
						let abc = Object.values(element.val())
						setMessages(abc.sort(function (a, b) {
							return new Date(b.time) - new Date(a.time)
						}))
					}
				})
			}
		})
	}, [])


	const _toggle = () => { setShow(!show) }

	const addMessage = async (userId, userName, imageName, message, flag) => {
		if (userMessage || imageName) {
			database().ref("Messages").child(messageNode).push({
				userId: userId,
				message: imageName ? message == null ? "" : message : userMessage,
				date: moment(Date.now()).format('l'),
				time: Date.now(),
				imageUrl: flag == 0 ? imageName : "",
				DocumentUrl: flag == 0 ? "" : imageName,
				isSeen: false,
				value: "this"
			})
			emailRef.current.clear()
			setUserMessage('');
			setProfileImage(``)
			if (imageName != "") {
				navigation.pop()
			}

		} else {
			return null;

		}


		const Data = {
			"notificationText": `You have recived message from ${userName}`,
			"referenceId": parseInt(route?.params?.otherUserId),
			"title": "New Message",
			"key": "ADMIN"
		}



		const uri = `/notifications`
		const body = Data
		postRequest(uri, body).then((response) => {
			if (response.code == 200) {
			} else {
				setAlertTitle("Alert")
				setAlertText(response.message)
				toggleCustomAlertVisibility()
			}
		})


	}

	const sendMessage = (imageName, message, flag) => {
		database().ref('Message').once('value', messages => {
			addMessage(userId, userName, imageName, message, flag)
		})
	}

	const addImageMessage = async (message, path, mime) => {
		var datathumbnail = new FormData();
		let paththumbnail = path;
		datathumbnail.append('data', { uri: paththumbnail, type: mime, name: paththumbnail.slice(paththumbnail.lastIndexOf('/'), datathumbnail.length) });
		// const resp = await axios.post(`${Server.BASE_URL}/dataDownload`, datathumbnail);
		const uri = `/dataDownload`
		const body = datathumbnail
		postRequest(uri, body).then((response) => {
			if (response.code == 200) {
				let flag = 0;
				sendMessage(response.data, message, flag)
			} else {
				setAlertTitle("Alert")
				setAlertText(response.message)
				toggleCustomAlertVisibility()
			}

		})

	}

	const addDocumentMessage = async (message, documentData) => {
		let imageData = new FormData();
		let path = documentData.uri;
		// console.warn("path", path);
		// imageData.append('data', { uri: documentData.uri, type: documentData.type, name: path.slice(path.lastIndexOf('/'), path.length) });
		imageData.append('data',
			{
				uri: documentData.uri,
				type: documentData.type,
				name: documentData.name,
				// path.length) 
			})
		try {
			// const resp = await axios.post(`${Server.BASE_URL}/dataDownload`, imageData);
			// console.warn(resp.data);
			// let flag = 1;
			// sendMessage(resp.data, message, flag)

			const uri = `/dataDownload`
			const body = imageData
			postRequest(uri, body).then((response) => {

				if (response.code == 200) {
					let flag = 1;
					sendMessage(response.data, message, flag)
				} else {
					setAlertTitle("Alert")
					setAlertText(response.message)
					toggleCustomAlertVisibility()
				}

			})

		} catch (error) {
			console.log("error in addDocumentMessage", error);
		}



	}
	const openDocument = async () => {
		try {
			const writeExtStoPer = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
			const readExtStoPer = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
			const res = await DocumentPicker.pick({
				type: [DocumentPicker.types.pdf, DocumentPicker.types.xlsx, DocumentPicker.types.doc],
			});
			setDocumentData(res);
			_toggle();
			gotoDocumentViewScreen(res);
		} catch (error) {
			console.warn(error.response);
		}
	}


	// =====================

	// const actualDownload = () => {
	// 	const { dirs } = RNFetchBlob.fs;
	// 	RNFetchBlob.config({
	// 		fileCache: true,
	// 		addAndroidDownloads: {
	// 			useDownloadManager: true,
	// 			notification: true,
	// 			mediaScannable: true,
	// 			title: `test.pdf`,
	// 			path: `${dirs.DownloadDir}/test.pdf`,
	// 		},
	// 	})
	// 		.fetch('GET', 'http://www.africau.edu/images/default/sample.pdf', {})
	// 		.then((res) => {
	// 			console.log('The file saved to ', res.path());
	// 		})
	// 		.catch((e) => {
	// 			console.log(e)
	// 		});
	// }

	// const downloadFile = async () => {
	// 	try {
	// 		const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
	// 		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
	// 			this.actualDownload();
	// 		} else {
	// 			Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
	// 		}
	// 	} catch (err) {
	// 	}
	// }


	//====================
	const openCamera = async () => {
		try {
			let value2 = await ImagePicker.openCamera({
				width: 400,
				height: 400,
				cropping: true,

			}).then(image => {
				setProfileImage(image)
				_toggle()
				goImagePage(image)
			});
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
				setProfileImage(image)
				_toggle()
				// console.warn(image);
				goImagePage(image)

			});
		}
		catch (error) {
			console.warn(error);
		}
	}
	const gotoDocumentViewScreen = (documentData) => {
		navigation.navigate(ScreenNames.DOCUMENT_VIEW_SCREEN,
			{
				documentData: documentData,
				addDocumentMessage: addDocumentMessage
			}
		)
	}
	const goImagePage = (profileImage) => {
		// console.warn(profileImage);
		navigation.navigate(ScreenNames.CHATIMAGE_SCREEN,
			{
				ImagePath: profileImage.path,
				ImageMime: profileImage.mime,
				_toggle: _toggle,
				addImageMessage: addImageMessage,
				setUserMessage
			}
		)
	}

	const renderItem = ({ item, index }) => (
		<Msgbox
			item={item}
			userName={userName}
			checkPermission={downloadImage}
			pdfDownload={pdfDownload} />)
	return (
		<LinearGradient colors={['#ffeaa7', '#ecf0f1']} style={styles.container}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'android' ? null : 'padding'} style={{ flex: 1 }}>
				<StatusBar
					animated={true}
					barStyle="dark-content"
					showHideTransition="none"
				/>
				{/* <View style={{flex:1}}> */}
				<ChatHeader
					thumbnailImage={route.params.thumbnailImage}
					otherUserId={route.params.otherUserId}
					otherUserName={route.params.otherUserName}
					otherUserPhno={route.params.otherUserPhno} />
				<View style={{ flex: 1 }}>

					<View style={{ flex: 1 }}>

						<View style={{
							paddingVertical: 20,
							paddingHorizontal: 20,
						}}>
							<FlatList
								data={messages}
								inverted={true}
								// extraData={messages}
								showsVerticalScrollIndicator={false}
								renderItem={renderItem} />
						</View>
						{/* <ImageLoader/> */}
					</View>
				</View>
				{/* <View style={{ flex: 1, backgroundColor: "red", position: "relative", bottom: 50 }}> */}

				{/* </View> */}
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: "center" }}>

					<TouchableOpacity
						onPress={_toggle}
						style={{ marginHorizontal: 20, }}
					>
						<UpArrowSvg height={50} width={50} />
					</TouchableOpacity>
					<View style={styles.sendContain}>
						<TextInput
							placeholderTextColor="#c8d6e5"
							placeholder="Write a message"
							onChangeText={(e) => { setUserMessage(e); }}
							ref={emailRef}
							defaultValue={text}
							style={{
								color: 'black',
								width: SCREEN_WIDTH - 120,
								marginRight: 40,
								paddingHorizontal: 20,
								borderRadius: 25,
								height: 50,
								backgroundColor: 'white',
								fontFamily: Fonts.BOLD,
								fontSize: 16,
							}}
						/>
						<TouchableOpacity
							onPress={() => sendMessage("")}
							style={styles.sendbtn}>
							<SendSvg height={47} width={47} />
						</TouchableOpacity>
					</View>
				</View>
				{/* <View style={{ backgroundColor: "red", flex: 1 }}> */}

				<ChatModal
					shows={show}
					toggleModal={_toggle}
					openCamera={openCamera}
					openLibrary={openLibrary}
					openDocument={openDocument}
					otherUserPhno={route.params.otherUserPhno}
				/>

				<CustomAlert
					title={alertTitle}
					desc={alertText}
					leftButtonText={"Ok"}
					leftButtonFunction={leftButtonFunction}
					toggleCustomAlertVisibility={toggleCustomAlertVisibility}
					customAlertVisible={customAlertVisible}
				/>
				{/* </View> */}
				{/* </View> */}
			</KeyboardAvoidingView>
		</LinearGradient>
	);
};


const mapStateToProps = state => ({
	token: state.user.token,
	uid: state.user.uid,
	userId: state.user.userId,
	userName: state.user.name

});
let mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
// export default ChatScreen;
