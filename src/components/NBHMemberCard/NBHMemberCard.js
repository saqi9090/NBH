import React from 'react'
import { View, Text, FlatList, Image, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Fonts, ScreenNames, Server } from '../../global';
import { SCREEN_WIDTH } from '../../global/constants';
import ChatSvg from "../../assets/svg/chat.svg";
import CallSvg from "../../assets/svg/call.svg";
import BuildingSvg from "../../assets/svg/building.svg";
import ServicesSvg from "../../assets/svg/services.svg";
import WhatAppSvg from "../../assets/svg/whatsappsmall.svg";
import database from '@react-native-firebase/database'
import { SIZE_12, SIZE_14 } from '../../global/typography';
import { BASE_URL } from '../../global/server';
import axios from 'axios';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import CustomAlert from '../CustomAlert/CusomAlert';
import moment from 'moment';
import * as UserActions from '../../redux/actions/userActions';
import { PutService } from '../../services/PutService';
import { getService } from '../../services/getService';
import { deleteService } from '../../services/deleteService';

const NBHMemberCard = ({ data, item, userId, name, blockState, updatedBlockUserId, updatedBlockOtherUserId, dispatch, updatedFollowingOtherUserId, updatedFollowingUserId, followingState }) => {



	const navigation = useNavigation();
	const [isFollowing, setIsFollowing] = React.useState(data.following)
	const [isBlocked, setIsBlocked] = React.useState(data.blocked)
	const [isLoading, setIsLoading] = React.useState(false)
	const [alertText, setAlertText] = React.useState('');
	const [customAlertVisible, setCustomAlertVisible] = React.useState(false)

	//function 

	const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }

	const goMemberDetail = async (userId) => {
		// const response = await axios.put(`${Server.BASE_URL}/users/addRecentlyViewed/${userId}/${data.userId}/${data.name}/${data.thumbnailImage}`)

		const uri = `/users/addRecentlyViewed/${userId}/${data.userId}/${data.name}/${data.thumbnailImage}`
		const body = null
		PutService(uri, body)

		navigation.navigate(ScreenNames.NBHMEMBERDETAIL_SCREEN, {
			userId: data.userId,
		})
	}

	const leftButtonFunction = () => {
		toggleCustomAlertVisibility()
	}

	const toggleFollowing = async () => {
		try {
			setIsLoading(true)
			if (isFollowing) {
				// await axios.delete(`${Server.BASE_URL}/users/removeFollowing/${userId}/${data.userId}`)
				const deletereq = `/users/removeFollowing/${userId}/${data.userId}`
				deleteService(deletereq).then((response) => {
					if (response.code == 200) {
						dispatch(UserActions.setFollowing({ userId: userId, otherUserId: data.userId }))
						setIsFollowing(!isFollowing)
					} else {
						setAlertText(response.message)
						toggleCustomAlertVisibility()
					}
					// console.warn("res3", res.data);
				})
			} else {
				// await axios.put(`${Server.BASE_URL}/users/addFollowing/${userId}/${data.userId}`)
				const uri = `/users/addFollowing/${userId}/${data.userId}`
				const body = null
				PutService(uri, body).then((response) => {
					if (response.code == 200) {
						dispatch(UserActions.setFollowing({ userId: userId, otherUserId: data.userId }))
						setIsFollowing(!isFollowing)
					} else {
						setAlertText(response.message)
						toggleCustomAlertVisibility()
					}

				})
			}
			setIsLoading(false)
		} catch (error) {
			if (error.response.data = "You have blocked this account, unblock it to perform the operation") {
				setAlertText("You are blocked by this member")
				toggleCustomAlertVisibility()
			}
			setIsLoading(false)
		}
	}

	const toggleBlock = async () => {
		try {
			setIsLoading(true)
			if (isBlocked) {
				// await axios.delete(`${Server.BASE_URL}/users/removeBlock/${userId}/${data.userId}`)

				const deletereq = `/users/removeBlock/${userId}/${data.userId}`
				deleteService(deletereq).then((response) => {
					if (response.code == 200) {
						dispatch(UserActions.setBlock({ userId: userId, otherUserId: data.userId }))
						setIsBlocked(!isBlocked)
					} else {
						setAlertText(response.message)
						toggleCustomAlertVisibility()
					}
					// console.warn("res5", res.data);
				})
			} else {
				// await axios.put(`${Server.BASE_URL}/users/addBlock/${userId}/${data.userId}`)
				const uri = `/users/addBlock/${userId}/${data.userId}`
				const body = null
				PutService(uri, body).then((response) => {
					if (response.code == 200) {
						dispatch(UserActions.setBlock({ userId: userId, otherUserId: data.userId }))
						setIsBlocked(!isBlocked)
					} else {
						setAlertText(response.message)
						toggleCustomAlertVisibility()
					}
				})
			}
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			console.warn(error.response);
		}
	}
	const addUser = () => {
		database().ref('FriendShip').child((userId.toString() + data.userId).toString()).set({
			userId: userId,
			otherUserId: data.userId,
			otherUserName: data.name,
			userName: name,
			time: Date.now(),
			date: moment(Date.now()).format('l'),
		})
		return null;
	}

	const createFriendShipNode = () => {
		database().ref('FriendShip').child((userId.toString() + data.userId).toString()).once('value', (Users) => {
			if (!Users.exists()) {
				database().ref('FriendShip').child((data.userId.toString() + userId).toString()).once('value', (User) => {
					if (!User.exists()) {
						addUser()
					}
				})
				// setFlag(false)
			} else {
				const User = Users.forEach(element => {
					if (userId === element.val().userId) {
						return true
					}
				});
				if (!User) {
					addUser()
				}
				// if (flag == false) {
				//     console.warn("flag", flag);
				// }
			}
		})
		navigation.navigate(ScreenNames.CHAT_SCREEN, {
			thumbnailImage: data.thumbnailImage,
			otherUserId: data.userId.toString(),
			otherUserName: data.firstName + data.lastName,
			otherUserPhno: data.phone
		})

	}
	const gotoChat = () => {
		createFriendShipNode()
	}

	const goToWhatsapp = () => {

		const url = `whatsapp://send?text=Hiii My Self ${name}&phone=91${data.whatsAppNumber}`
		Linking.openURL(url)
	}

	const getUserFollowing = async () => {
		// const response = await axios.get(`${Server.BASE_URL}/users/check/following/${userId}/${data.userId}`);
		// setIsFollowing(response.data)

		const req = `/users/check/following/${userId}/${data.userId}`
		getService(req).then((response) => {
			setIsFollowing(response.data)
		})
	}

	const getUserBlock = async () => {
		// const response = await axios.get(`${Server.BASE_URL}/users/check/block/${userId}/${data.userId}`)
		// setIsBlocked(response.data)

		const req = `/users/check/block/${userId}/${data.userId}`
		getService(req).then((response) => {
			setIsBlocked(response.data)
		})
	}

	React.useEffect(() => {
		getUserBlock()
	}, [blockState, updatedBlockOtherUserId, updatedBlockUserId])

	React.useEffect(() => {
		getUserFollowing()
	}, [updatedFollowingOtherUserId, updatedFollowingUserId, followingState])

	return (
		<View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
			<View

				style={styles.memberCardContainer}>
				<TouchableOpacity style={{ alignItems: "center", flexDirection: "row", padding: 10 }}
					activeOpacity={0.8}
					onPress={() => goMemberDetail(userId)}>
					<View style={{ height: 40, width: 40, borderRadius: 50, marginRight: 15 }}>
						<Image source={{ uri: `${BASE_URL}/users/${data.userId}/${data.thumbnailImage}/thumbnailImage` }} style={{ height: "100%", width: "100%", borderRadius: 100 }} />
					</View>
					<View >
						<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
							<Text style={[styles.nameOfMember, { backgroundColor: null }]} numberOfLines={1} >{data.firstName} {data.lastName}</Text>
							<View style={{ flexDirection: "row", position: "relative", right: -1, }}>
								{/* <TouchableOpacity style={{ marginRight: 10 }}
									onPress={goToWhatsapp}>
									<WhatAppSvg />
								</TouchableOpacity> */}
								<TouchableOpacity onPress={gotoChat} style={styles.chatStyle}>
									<View

									>
										<ChatSvg />
									</View>
									<View style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: 5 }}>
										<Text style={[styles.font1], { color: "#F45858", fontSize: 13, fontFamily: Fonts.BOLD }}>Messenger</Text>
									</View>
								</TouchableOpacity>
							</View>
						</View>
						<View style={{ flexDirection: "row", alignItems: "center", marginVertical: 3 }}>
							<BuildingSvg />
							<Text
								numberOfLines={1}
								style={{
									fontSize: SIZE_12,
									fontFamily: Fonts.SEMIBOLD,
									color: Colors.JUNGLE_BLACK,
									marginLeft: 7,
									opacity: 0.6,



								}}>{data.businessName}</Text>
						</View>
						<View style={{ flexDirection: "row", alignItems: "center", marginVertical: 3 }}>
							<ServicesSvg />
							<View style={{ flex: 1 }}>
								<Text
									numberOfLines={1}
									style={{
										fontSize: SIZE_12,
										fontFamily: Fonts.SEMIBOLD,
										color: Colors.JUNGLE_BLACK,
										marginLeft: 7,
										opacity: 0.4,

									}}>{data.category}- {data.subCategory}</Text>
							</View>
						</View>

					</View>




				</TouchableOpacity>
				<View style={{ height: 1.7, width: SCREEN_WIDTH - 80, backgroundColor: "#97979975", marginHorizontal: 20 }}></View>

				<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

					<TouchableOpacity style={{ marginLeft: 20, flexDirection: "row", alignItems: "center" }}
						onPress={goToWhatsapp}>
						<WhatAppSvg />
						<Text style={styles.WhatsappStyle}> WhatsApp</Text>
					</TouchableOpacity>
					<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end", paddingVertical: 10 }}>


						<View style={{ marginRight: 20 }}>
							<TouchableOpacity
								style={styles.followButton}
								onPress={toggleFollowing}
								disabled={isLoading}
							>
								<Text style={styles.font1}>{isFollowing ? "Following" : "Follow"}</Text>
							</TouchableOpacity>
						</View>

						<View style={{ marginRight: 20 }}>
							<TouchableOpacity style={[styles.followButton, { backgroundColor: Colors.JUNGLE_BLACK }]}
								onPress={toggleBlock}
								disabled={isLoading}>
								<Text style={[styles.font1, { color: Colors.PRIMARY }]}>{isBlocked ? "Unblock" : "Block"}</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>

			</View>
			<CustomAlert
				title={"Alert"}
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
	userId: state.user.userId,
	updatedBlockUserId: state.user.updatedBlockUserId,
	updatedBlockOtherUserId: state.user.updatedBlockOtherUserId,
	blockState: state.user.blockState,
	updatedFollowingOtherUserId: state.user.updatedFollowingOtherUserId,
	updatedFollowingUserId: state.user.updatedFollowingUserId,
	followingState: state.user.followingState
});

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(mapStateToProps, mapDispatchToProps)(NBHMemberCard);

// export default NBHMemberCard

const styles = StyleSheet.create({
	nameOfMember: {
		fontSize: SIZE_14,
		fontFamily: Fonts.SEMIBOLD,
		color: Colors.JUNGLE_BLACK,
		width: SCREEN_WIDTH - 225,
		marginRight: 10
	},

	memberCardContainer: {
		borderRadius: 10, shadowColor: "#000",
		backgroundColor: Colors.WHITE,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
		marginHorizontal: 10,
		marginVertical: 10
	},
	followButton: {
		height: 28,
		width: 90,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.PRIMARY,
		borderRadius: 10
	},
	font1: { fontSize: 12, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK },
	WhatsappStyle: { fontSize: 17, fontFamily: Fonts.BOLD, color: "#016201" },

	chatStyle: {
		// borderWidth: 1,
		// borderColor: "#F45858",
		borderRadius: 5,
		flexDirection: "row",
		// alignItems: "center"
	}

})


