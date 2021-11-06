import React from 'react'
import { Dimensions, Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, Constants, Fonts, Server } from '../../global';
import DownloadSvg from "../../assets/svg/download11.svg"
import ImageLoader from '../ImageLoader/ImageLoader';
import RNFetchBlob from 'rn-fetch-blob';
import * as OpenAnything from 'react-native-openanything'
import ViewFoodMenuImagesModal from '../ViewFoodMenuImagesModal/ViewFoodMenuImagesModal';
import FileViewer from 'react-native-file-viewer';
import DocSvg from "../../assets/svg/Document1.svg";
import ExcelSvg from "../../assets/svg/Execel1.svg";

const SendBox = ({ item, userName, imagePath, checkPermission }) => {

	const [toggleBTN, setToggleBTN] = React.useState(false);
	const [isVisible, setVisibility] = React.useState(false);
	const [index, setIndex] = React.useState(0);
	const [imageUrl, setImageUrl] = React.useState('');


	const PdfCheck = (item.DocumentUrl).slice(item.DocumentUrl && item.DocumentUrl.length - 3)


	const showModal = () => {
		setVisibility(true);
	};

	const hideModal = () => {
		setVisibility(false);
	};
	const _toggleLoader = () => { setToggleBTN(!toggleBTN) }
	const downloadPdf = async () => {
		let extension = (item.imageUrl ? item?.imageUrl : item?.DocumentUrl).split(".")
		let DownloadDir = Platform.OS == "ios" ? RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.DownloadDir;
		const exist = await RNFetchBlob.fs.exists(`${DownloadDir}/NBH/Downloads/${extension[0]}.${extension[1]}`)
		setImageUrl(`${Server.BASE_URL}/dataDownload/${item?.imageUrl}/true`)
		if (!exist) {
			console.warn("extension", extension);
			const { dirs } = RNFetchBlob.fs;
			const dirToSave = Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir
			const configfb = {
				fileCache: true,
				useDownloadManager: true,
				notification: true,
				mediaScannable: true,
				title: "NBH",
				path: `${dirToSave}/${extension[0]}.${extension[1]}`,
			}
			const configOptions = Platform.select({
				ios: {
					fileCache: configfb.fileCache,
					title: configfb.title,
					path: configfb.path,
					appendExt: extension[1],
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
							path: `${DownloadDir}/NBH/Downloads/${extension[0]}.${extension[1]}`, // this is the path where your downloaded file will live in
							description: 'NBH Invoice',
							// title: `SM_Invoice${Date.now()}.pdf`,
							title: `${extension[0]}.${extension[1]}`,
							mime: `application/${extension[1]}`,
							mediaScannable: true
						}
					})
					.fetch('GET', `${Server.BASE_URL}/dataDownload/${item.imageUrl ? item?.imageUrl : item?.DocumentUrl}/false`)
					.then((resp) => {
						// setLoading(false);
						if (item.imageUrl) {
							showModal()
						} else {
							console.warn(`${DownloadDir}/NBH/Downloads/${extension[0]}.${extension[1]}`);
							FileViewer.open(`${DownloadDir}/NBH/Downloads/${extension[0]}.${extension[1]}`)
						}
						// setCustomToast(true)
						// dispatch(UserActions.showToast(`Downloaded To ${DownloadDir}`));
					})
					.catch((error) => {
						// setLoading(false);
						console.warn(error.message);
					})
				:
				RNFetchBlob.config(configOptions)
					.fetch('GET', `${Server.BASE_URL}/dataDownload/${item.imageUrl ? item?.imageUrl : item?.DocumentUrl}/false`, {})
					.then((res) => {
						if (Platform.OS === "ios") {
							RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
							RNFetchBlob.ios.previewDocument(configfb.path);
						}
						console.log('The file saved to ', res);
					})
					.catch((e) => {
						console.log('The file saved to ERROR', e.message)
					});
		} else {
			if (item.DocumentUrl) {
				FileViewer.open(`${DownloadDir}/NBH/Downloads/${extension[0]}.${extension[1]}`)
			} else {
				showModal()
			}
		}
	}

	// console.warn("item.imageUrl ", item.imageUrl);
	// console.warn("eee", PdfCheck);
	return (
		<View style={{ flex: 1, borderWidth: 2, borderRadius: 10, borderColor: "#fff0bc", backgroundColor: "#fff0bc" }}>

			<TouchableOpacity
				onPress={() => { _toggleLoader(), downloadPdf() }}
				activeOpacity={0.9}
				style={{
					borderTopLeftRadius: 10, borderTopRightRadius: 10, borderRadius: item.message != "" ? 0 : 10,
					height: Constants.SCREEN_WIDTH / 2, width: Constants.SCREEN_WIDTH / 2, overflow: "hidden"
				}}>






				<ImageBackground
					source={
						item.imageUrl ?
							{ uri: `${Server.BASE_URL}/dataDownload/${item?.imageUrl}/true` }
							:
							PdfCheck == "pdf" ?
								require(`../../assets/images/Pdff.png`)
								:
								PdfCheck == "lsx" ?
									require(`../../assets/images/Execell.png`)
									:
									PdfCheck == "doc" ?
										require(`../../assets/images/Docc.png`)
										:
										null
					}
					style={{ height: PdfCheck == "pdf" || PdfCheck == "lsx" || PdfCheck == "doc" ? Constants.SCREEN_WIDTH / 3 : Constants.SCREEN_WIDTH / 2, width: Constants.SCREEN_WIDTH / 2, borderRadius: 10, marginTop: PdfCheck == "pdf" || PdfCheck == "lsx" || PdfCheck == "doc" ? 20 : 0 }}
					resizeMode="contain" >

				</ImageBackground>




			</TouchableOpacity>
			{
				item.DocumentUrl
					?
					<Text style={{ ...styles.font2, textAlign: "center", paddingBottom: 5 }}>{item?.DocumentUrl}</Text>
					:
					null
			}
			{
				item.message != ""
					?
					<View style={{
						flexDirection: "row",
						alignItems: "center", justifyContent: "flex-end",
						width: Constants.SCREEN_WIDTH / 2,
						borderBottomRightRadius: 10,
						borderBottomLeftRadius: 10,
						paddingHorizontal: 5,
						backgroundColor: "#fff0bc", paddingVertical: 6
					}}>
						<Text style={styles.font2}>{item?.message}</Text>

					</View>
					:
					null
			}
			<ViewFoodMenuImagesModal
				visible={isVisible}
				hideModal={hideModal}
				index={index}
				route={0}
				otherImageNames={[imageUrl]} />
		</View >
	)
}

export default SendBox

const styles = StyleSheet.create({
	downloadBox: {
		padding: 10,
		paddingTop: 12,
		height: 30,
		borderRadius: 100,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#00000099",
		flexDirection: "row"
		// zIndex: 2
	},
	font1: {
		fontSize: 14,
		fontFamily: Fonts.BOLD,
		color: Colors.WHITE
	},
	font2: {
		fontSize: 14,
		fontFamily: Fonts.BOLD,
		color: Colors.BLACK
	}
})
