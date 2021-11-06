import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, FlatList, Linking } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Header from "../../components/Header/Header";
import CallSvg from "../../assets/svg/call.svg";
import MessageSvg from "../../assets/svg/chatlarge.svg";
import WhatappSvg from "../../assets/svg/whatsapp.svg";
import LikeSvg from "../../assets/svg/like - filled.svg";
import { styles } from "./NBHMemberDetailStyles"
import { Colors, Fonts, ScreenNames, Server } from '../../global';
import Location from "../../assets/svg/location.svg";
import EmailSvg from "../../assets/svg/email.svg";
import AddSvg1 from "../../assets/svg/add1.svg";
import Download from "../../assets/svg/download1.svg";
import { PaymentType, NBHmemberdata, keyworddata, registerdata, NbHMemberDetailData, MemberdetailData, ProductCatalogueData } from '../../components/DummyData/DummyDataScreen';

import { globalStyles } from '../../global/globalStyles';
import { SCREEN_WIDTH } from '../../global/constants';
import ProductCatalogue from '../../components/ProductCatalogue/ProductCatalogue';
import MemberAchievement from '../../components/MemberAchievement/MemberAchievement';
import MemberInductedModal from '../../components/MemberInductedModal/MemberInductedModal';
import MyProfileProductCatalogue from '../../components/MyProfileProductCatalogue/MyProfileProductCatalogue';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import { connect } from 'react-redux';
import CustomAlert from '../../components/CustomAlert/CusomAlert';
import * as UserActions from '../../redux/actions/userActions';
import { PutService } from '../../services/PutService';
import { getService } from '../../services/getService';
import { deleteService } from '../../services/deleteService';




const NBHMemberDetailScreen = ({ navigation, route, params, dispatch, userId, name, blockState, updatedBlockUserId, updatedBlockOtherUserId, updatedFollowingOtherUserId, updatedFollowingUserId, followingState }) => {

	//state
	const [follow, setFollow] = React.useState(false);
	const [block, setBlock] = React.useState(false);
	const [memberIndicate, setMemberIndicate] = React.useState(false);
	const [productCatalogues, setProductCatalogues] = React.useState(null)
	const [userDetails, setUserDetails] = React.useState(null)
	const [memberAchievements, setMemberAchievements] = React.useState(null)
	const [userImage, setUserImage] = React.useState('')
	const [isLoading, setIsLoading] = React.useState(false)
	const [alertText, setAlertText] = React.useState('');
	const [memberAddress, setMemberAddress] = React.useState(null)
	const [memberInducted, setMemberInducted] = React.useState(null)
	const [alertTitle, setAlertTitle] = React.useState("");



	const dialCall = (number) => {
		let phoneNumber = '';
		if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
		else { phoneNumber = `telprompt:${number}`; }
		Linking.openURL(phoneNumber);
	};

	const getUserFollowing = async () => {
		const req = `/users/check/following/${userId}/${route.params.userId}`
		getService(req).then((response) => {
			if (response.code == 200) {
				setFollow(response.data)
			} else {
				setAlertTitle("Alert")
				setAlertText(response.message)
				toggleCustomAlertVisibility()
			}
		})
	}

	const getUserBlock = async () => {
		const req = `/users/check/block/${userId}/${route.params.userId}`
		getService(req).then((response) => {
			if (response.code == 200) {
				setBlock(response.data)
			} else {
				setAlertTitle("Alert")
				setAlertText(response.message)
				toggleCustomAlertVisibility()
			}
		})
	}



	//function
	const _toggleFollowBtn = () => {
		setFollow(!follow)

	}

	const _toggleBlockBtn = () => {
		setBlock(!block)
	}

	const leftButtonFunction = () => {
		toggleCustomAlertVisibility()
	}

	const [customAlertVisible, setCustomAlertVisible] = React.useState(false)


	//function 

	const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }



	const toggleFollowing = async () => {
		// try {
		setIsLoading(true)
		if (follow) {
			const deletereq = `/users/removeFollowing/${userId}/${route.params.userId}`
			deleteService(deletereq).then((response) => {
				if (response.code == 200) {
					dispatch(UserActions.setFollowing({ userId: userId, otherUserId: route.params.userId }))
					setFollow(!follow)
				} else {
					setAlertTitle("Alert")
					setAlertText(response.message)
					toggleCustomAlertVisibility()
				}
			})
		} else {
			// await axios.put(`${Server.BASE_URL}/users/addFollowing/${userId}/${route.params.userId}`)

			const uri = `/users/addFollowing/${userId}/${route.params.userId}`
			const body = null
			PutService(uri, body).then((response) => {
				if (response.code == 200) {
					dispatch(UserActions.setFollowing({ userId: userId, otherUserId: route.params.userId }))
					setFollow(!follow)
				} else {
					setAlertTitle("Alert")
					setAlertText(response.message)
					toggleCustomAlertVisibility()
				}
			})
		}
		setIsLoading(false)
		// } catch (error) {
		// 	console.warn("eee", error.response.data);
		// 	if (error.response.data = "You have blocked this account, unblock it to perform the operation") {
		// 		setAlertText("You are blocked by this member")
		// 		toggleCustomAlertVisibility()
		// 	}
		// 	setIsLoading(false)
		// }
	}

	const toggleBlock = async () => {
		// try {
		setIsLoading(true)
		if (block) {
			const deletereq = `/users/removeBlock/${userId}/${route.params.userId}`
			deleteService(deletereq).then((response) => {
				if (response.code == 200) {
					dispatch(UserActions.setBlock({ userId: userId, otherUserId: route.params.userId }))
					setBlock(!block)
				} else {
					setAlertTitle("Alert")
					setAlertText(response.message)
					toggleCustomAlertVisibility()
				}

			})
		} else {
			const uri = `/users/addBlock/${userId}/${route.params.userId}`
			const body = null
			PutService(uri, body).then((response) => {
				if (response.code == 200) {
					dispatch(UserActions.setBlock({ userId: userId, otherUserId: route.params.userId }))
					setBlock(!block)
				} else {
					setAlertTitle("Alert")
					setAlertText(response.message)
					toggleCustomAlertVisibility()
				}
			})

		}
		setIsLoading(false)
	}


	const _toggleMemberInductedModal = () => {
		setMemberIndicate(!memberIndicate)
	}

	//Api 

	React.useEffect(() => {
		getNBHMemberDetail()
	}, [])

	const getNBHMemberDetail = async () => {
		try {
			let userDetails = {};
			if (userId != null) {
				userDetails = await axios.get(`${Server.BASE_URL}/users/getByIdV2/userId/${userId}/otherUserId/${route.params.userId}`);  // chnfe
			} else {
				userDetails = await axios.get(`${Server.BASE_URL}/users/${route.params.userId}`);  // chnfe
			}
			const req = `/productCatalogues/userId/${route.params.userId}`
			getService(req).then((response) => {
				if (response.code == 200) {
					setProductCatalogues(response.data)
				} else {
					setAlertTitle("Alert")
					setAlertText(response.message)
					toggleCustomAlertVisibility()
				}

			})


			const req1 = `/users/${route.params.userId}/allAddress`
			getService(req1).then((response) => {
				if (response.code == 200) {
					setMemberAddress(response.data)
				} else {
					setAlertTitle("Alert")
					setAlertText(response.message)
					toggleCustomAlertVisibility()
				}
			})


			const req2 = `/users/getMembersIncepted/${route.params.userId}`
			getService(req2).then((response) => {
				if (response.code == 200) {
					setMemberInducted(response.data)
				} else {
					setAlertTitle("Alert")
					setAlertText(response.message)
					toggleCustomAlertVisibility()
				}
			})



			setUserDetails(userDetails.data)
			setBlock(userDetails.data.blocked)
			setMemberAchievements(userDetails.data.memberAchivementsOtherImages)

			setUserImage({ uri: `${Server.BASE_URL}/users/${route.params.userId}/${userDetails.data.thumbnailImage}/thumbnailImage` })
		} catch (error) {
			console.warn(error.message);
		}
	}

	React.useEffect(() => {
		getUserFollowing()
	}, [updatedFollowingOtherUserId, updatedFollowingUserId, followingState])
	React.useEffect(() => {
		getUserBlock()
	}, [blockState, updatedBlockOtherUserId, updatedBlockUserId])



	const OpenWEB = (url) => {
		let containsHttp = url.toString().includes('http')
		//modified created date
		Linking.openURL(containsHttp ? url : "http://" + url)
	};



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
				.fetch('GET', `${Server.BASE_URL}/users/${route.params.userId}/${pdfName}/${pdfType}`)
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
				.fetch('GET', `${Server.BASE_URL}/users/${route.params.userId}/${pdfName}/${pdfType}`, {})
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

	const goToChatScreen = () => {
		navigation.navigate(ScreenNames.CHAT_SCREEN,
			{
				thumbnailImage: userDetails.thumbnailImage,
				otherUserId: userDetails.userId,
				otherUserName: userDetails.firstName + userDetails.lastName,
				otherUserPhno: userDetails.phone
			})
	}

	const goToWhatsapp = () => {

		const url = `whatsapp://send?text=Hiii My Self ${name}&phone=91${userDetails.whatsAppNumber}`
		Linking.openURL(url)
	}
	return (
		<View style={{ flex: 1 }}>
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
			<Header name={"Member Detail"} backgroundColor={true} YellowHomeIcon={true}
				YellowHomeOnpress={() => navigation.navigate(ScreenNames.HOME_SCREEN)}

			/>
			<View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
				<ScrollView>

					<View style={[styles.containerMemberDetail, { borderRadius: 20, marginHorizontal: 20, marginTop: 10 }]}>
						<View style={{ marginBottom: 10, marginHorizontal: 30, marginTop: 20, marginBottom: 20 }}>
							<View style={{ alignSelf: "center" }}>
								<Image source={userImage} style={{ height: 70, width: 70, borderRadius: 100 }} />
							</View>

							<View style={{ marginTop: 10 }}>
								<View style={{ width: SCREEN_WIDTH / 1 - 100 }}>

									<Text style={styles.memberuserName}>{userDetails && userDetails.name}</Text>
									<Text style={[styles.memberService, { marginVertical: 5 }]}>{userDetails && userDetails.businessName}</Text>
									<Text style={styles.memberOccupation}>{userDetails && userDetails.category}</Text>
									<Text style={[styles.memberOccupation, { marginVertical: 5 }]}>{userDetails && userDetails.subCategory}</Text>
								</View>
								<View style={{ flexDirection: "row", marginTop: 5 }}>
									<TouchableOpacity style={{ marginRight: 10 }}>
										<EmailSvg />
									</TouchableOpacity>
									<View style={{ width: SCREEN_WIDTH / 1 - 120 }}>

										<Text style={styles.memberPhoneNumber1}>{userDetails && userDetails.email}</Text>
									</View>
								</View>
								<View style={{ flexDirection: "row", marginTop: 10 }}>
									<TouchableOpacity
										onPress={() => dialCall(userDetails && userDetails.phone)}
										style={{ marginRight: 10 }}>
										<CallSvg />
									</TouchableOpacity>
									<Text style={styles.memberPhoneNumber}>{userDetails && userDetails.phone}</Text>
								</View>

							</View>
							<View >
								{/* <View style={{ height: 70, width: 70 ,backgroundColor:"red" ,borderRadius:100}}> */}
								{/* </View> */}
								<View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
									<TouchableOpacity
										onPress={goToChatScreen}
										style={styles.memberSvg}><MessageSvg /></TouchableOpacity>
									<TouchableOpacity onPress={goToWhatsapp} style={styles.memberSvg}><WhatappSvg /></TouchableOpacity>

								</View>
							</View>
						</View>
						{/* <View style={styles.sectionLine}></View> */}

					</View>
					<View style={{ marginBottom: 10 }}>

						<View style={{ flexDirection: "row", alignItems: "center", marginVertical: 20, justifyContent: "space-around", marginHorizontal: 20 }}>
							<View style={[styles.containerMemberDetail1, { alignItems: "center", width: SCREEN_WIDTH / 4, borderRadius: 10 }]}>
								<Text style={styles.Followerquantity}>{userDetails && userDetails.followers.length}</Text>
								<Text style={styles.Follower}>Followers</Text>
							</View>
							<View style={[styles.containerMemberDetail1, { alignItems: "center", width: SCREEN_WIDTH / 4, borderRadius: 10 }]}>
								<Text style={styles.Followerquantity}>{userDetails && userDetails.following.length}</Text>
								<Text style={styles.Follower}>Following</Text>
							</View>
							<View style={[styles.containerMemberDetail1, { alignItems: "center", width: SCREEN_WIDTH / 4, borderRadius: 10 }]}>
								<Text style={styles.Followerquantity}>{userDetails && userDetails.postCount}</Text>
								<Text style={styles.Follower}>Posts</Text>
							</View>
							{/* <View style={{ alignItems: "center" }}>
                                <Text style={styles.Followerquantity}>20</Text>
                                <Text style={styles.Follower}>Likes</Text>
                            </View> */}
						</View>
						<View style={[styles.containerMemberDetail1, { flexDirection: "row", marginTop: 10, borderRadius: 10, paddingVertical: 10, marginHorizontal: 20 }]}>
							<View style={{ flex: 0.5, paddingLeft: 20, paddingRight: 10 }}>
								<TouchableOpacity
									onPress={() => toggleFollowing()}
									disabled={isLoading}

									style={[styles.filterMemberBtn, { backgroundColor: Colors.PRIMARY }]}>
									<Text style={styles.fontFilterBtn}>{follow ? "Following" : "Follow"}</Text>
								</TouchableOpacity>
							</View>
							<View style={{ flex: 0.5, paddingRight: 20, paddingLeft: 10 }}>
								<TouchableOpacity
									disabled={isLoading}

									onPress={() => toggleBlock()}
									style={[styles.filterMemberBtn, { backgroundColor: Colors.JUNGLE_BLACK }]}>
									<Text style={[styles.fontFilterBtn, { color: Colors.WHITE }]}>{block ? "Unblock" : "Block"}</Text>
								</TouchableOpacity>
							</View>
						</View>

					</View>



					<View style={[styles.containerMemberDetail1, { marginHorizontal: 20, marginVertical: 20, borderRadius: 10, padding: 5 }]}>
						<Text style={{ fontSize: 16, fontFamily: Fonts.BOLD, color: Colors.ONYX_60 }}>Members Incepted</Text>
						<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 5 }}>
							<View >
								<Text
									// editable={false}
									style={{ color: Colors.BLACK, fontFamily: Fonts.BOLD, fontSize: 16 }}
								// placeholder="5"
								>{memberInducted && memberInducted.length}</Text>
							</View>
							<TouchableOpacity
								onPress={_toggleMemberInductedModal}
								hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
								style={{ height: 30, width: 30, alignItems: "center", justifyContent: "center" }}>
								<AddSvg1 />
							</TouchableOpacity>


						</View>
						{/* <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View> */}
					</View>
					<View style={[styles.containerMemberDetail1, { borderRadius: 10, marginHorizontal: 20, padding: 5, marginTop: 10 }]}>
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

					{
						userDetails && userDetails.userKeywords.length > 0 ?

							<View style={[styles.containerMemberDetail1, { marginTop: 20, borderRadius: 10, marginHorizontal: 20, padding: 5, }]}>

								<Text style={[styles.Address, { fontSize: 16, marginLeft: 20 }]}>Keywords</Text>
								<FlatList data={userDetails && userDetails.userKeywords}
									style={{ marginVertical: 10, marginHorizontal: 10 }}
									showsHorizontalScrollIndicator={false}
									horizontal={true}
									renderItem={({ item }) => {
										return (

											<View>
												<View style={{ height: 40, alignItems: "center", justifyContent: "center", backgroundColor: "#FFD64820", borderRadius: 10, paddingHorizontal: 10, marginHorizontal: 10 }}>
													<Text style={{ fontSize: 14, fontFamily: Fonts.BOLD, color: Colors.ONYX_60 }}>{item}</Text>
												</View>
											</View>
										)
									}}
								/>
							</View>

							:
							null
					}
					<View style={[styles.containerMemberDetail1, { marginHorizontal: 20, marginVertical: 10, borderRadius: 10, padding: 5 }]}>
						<Text style={{ fontSize: 16, fontFamily: Fonts.BOLD, color: Colors.ONYX_60 }}>About Member</Text>
						<Text
							style={{ color: Colors.BLACK, fontFamily: Fonts.BOLD, fontSize: 16, marginTop: 10 }}
						// style={styles.memberDeatilInput}
						// placeholderTextColor={Colors.BLACK}
						// placeholder="Not Available"
						>{userDetails && userDetails.aboutMember}</Text>
						{/* <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View> */}
					</View>

					<View style={[styles.containerMemberDetail1, { marginHorizontal: 20, marginVertical: 0, marginBottom: 10, borderRadius: 10, padding: 5 }]}>
						<Text style={{ fontSize: 16, fontFamily: Fonts.BOLD, color: Colors.ONYX_60 }}>GST No.</Text>
						<Text
							style={{ color: Colors.BLACK, fontFamily: Fonts.BOLD, fontSize: 16, marginTop: 10 }}
						// style={styles.memberDeatilInput}
						// placeholderTextColor={Colors.BLACK}
						// placeholder="Not Available"

						>{userDetails && userDetails.gstNo}</Text>
					</View>
					<View
						style={[styles.containerMemberDetail1, { marginHorizontal: 20, marginVertical: 0, marginBottom: 10, borderRadius: 10, padding: 5 }]}>

						<Text style={[styles.Address, { fontSize: 16, marginLeft: 0, marginBottom: 10 }]}>Website </Text>
						<TouchableOpacity
							hitSlop={{ top: 30, bottom: 30 }}
							activeOpacity={0.3}
							onPress={() => OpenWEB(userDetails.website)}
						>
							<Text style={styles.font1}>{userDetails && userDetails.website}</Text>
						</TouchableOpacity>
					</View>


					<View style={[styles.containerMemberDetail1, { marginHorizontal: 20, marginVertical: 0, marginBottom: 10, borderRadius: 10, padding: 5 }]}>
						<Text style={{ fontSize: 16, fontFamily: Fonts.BOLD, color: Colors.ONYX_60 }}>Office Contact No.</Text>
						<Text
							style={{ color: Colors.BLACK, fontFamily: Fonts.BOLD, fontSize: 16, marginTop: 10 }}
						// style={styles.memberDeatilInput}
						// placeholderTextColor={Colors.BLACK}
						// placeholder="Not Available"
						>{userDetails && userDetails.officeContactNo}</Text>
					</View>

					<View style={[styles.containerMemberDetail1, { marginHorizontal: 20, marginVertical: 0, marginBottom: 10, borderRadius: 10, padding: 5 }]}>
						<Text style={{ fontSize: 16, fontFamily: Fonts.BOLD, color: Colors.ONYX_60 }}>GEO Location</Text>
						{
							userDetails ?
								<Text
									// style={styles.memberDeatilInput}
									// placeholderTextColor={Colors.BLACK}
									// placeholder="Not Available"
									style={{ color: Colors.BLACK, fontFamily: Fonts.BOLD, fontSize: 16, marginTop: 10 }}>{userDetails.officeBuilding} ,{userDetails.officeFlatNo},{userDetails.officeFloor},{userDetails.officeLandmark},{userDetails.officeCity},{userDetails.officePincode}</Text>
								:
								null
						}
					</View>

					<View style={{ marginHorizontal: 20, marginBottom: 20 }}>
						{
							userDetails && userDetails.businessProfile
							&&
							<TouchableOpacity
								onPress={() => downloadInvoice(userDetails.businessProfile, "businessProfile")}
								style={[styles.containerMemberDetail1, { alignItems: "center", flexDirection: "row", marginVertical: 5, padding: 5, borderRadius: 5 }]}>
								<Download />
								<Text style={[styles.font1, { marginLeft: 10 }]}>Download Business Profile</Text>
							</TouchableOpacity>
						}
						{
							userDetails && userDetails.businessBrochure
							&&
							<TouchableOpacity
								onPress={() => downloadInvoice(userDetails.businessBrochure, "businessBrochure")}
								style={[styles.containerMemberDetail1, { alignItems: "center", flexDirection: "row", marginVertical: 5, padding: 5, borderRadius: 5 }]}>
								<Download />
								<Text style={[styles.font1, { marginLeft: 10 }]}>Download Business Brochure</Text>
							</TouchableOpacity>

						}
					</View>

					{


					}

					{memberAchievements && memberAchievements.length > 0 ?

						<View style={[styles.containerMemberDetail1, { borderRadius: 10, paddingVertical: 10, marginHorizontal: 20, marginBottom: 20 }]}>
							<Text style={[styles.Address, { fontSize: 16, marginLeft: 20, marginBottom: 15 }]}>Testimonial Wall</Text>
							<View >
								<FlatList data={memberAchievements}
									showsHorizontalScrollIndicator={false}
									horizontal={true}
									style={{ backgroundColor: Colors.WHITE, paddingVertical: 5, marginHorizontal: 10, width: SCREEN_WIDTH - 70 }}
									renderItem={({ item, index }) => (
										<View style={{ flex: 1 }}>
											<MemberAchievement item={item} index={index} userId={route.params.userId} />
										</View>
									)}
								/>
							</View>
						</View>

						:
						null
					}
					{productCatalogues && productCatalogues.length > 0 ?

						<View style={[styles.containerMemberDetail1, { borderRadius: 10, paddingVertical: 10, marginHorizontal: 20, marginBottom: 20 }]}>
							<Text style={[styles.Address, { fontSize: 16, marginLeft: 20 }]}>Product Catalogue</Text>

							<View style={{ marginTop: 10 }}>
								<FlatList
									data={productCatalogues}
									horizontal={true}
									showsHorizontalScrollIndicator={false}
									style={{ marginHorizontal: 20, width: SCREEN_WIDTH - 70 }}
									renderItem={({ item, index }) => (
										<MyProfileProductCatalogue item={item} />
									)}
								/>

							</View>
						</View>
						:
						null
					}
					{/* 
                    <TouchableOpacity style={[globalStyles.button, { marginTop: 25 }]}>
                        <Text style={globalStyles.buttonText}>Block Contact</Text>
                    </TouchableOpacity> */}

				</ScrollView>

			</View>

			<CustomAlert
				title={alertTitle}
				desc={alertText}
				leftButtonText={"Ok"}
				leftButtonFunction={leftButtonFunction}
				toggleCustomAlertVisibility={toggleCustomAlertVisibility}
				customAlertVisible={customAlertVisible}
			/>

			<MemberInductedModal _toggleMemberInductedModal={_toggleMemberInductedModal}
				memberIndicate={memberIndicate} memberInducted={memberInducted} userId={route.params.userId} />

		</View>
	)
}


const mapStateToProps = state => ({
	name: state.user.name,
	email: state.user.email,
	phNo: state.user.phNo,
	userImage: state.user.thumbnailImage,
	userId: state.user.userId,
	updatedBlockUserId: state.user.updatedBlockUserId,
	updatedBlockOtherUserId: state.user.updatedBlockOtherUserId,
	blockState: state.user.blockState,
	updatedFollowingOtherUserId: state.user.updatedFollowingOtherUserId,
	updatedFollowingUserId: state.user.updatedFollowingUserId,
	followingState: state.user.followingState
});

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(mapStateToProps, mapDispatchToProps)(NBHMemberDetailScreen);



