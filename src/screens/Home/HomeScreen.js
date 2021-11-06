import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList, TouchableOpacity, PermissionsAndroid, Platform, BackHandler, Linking } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors, Fonts, ScreenNames, Server } from '../../global';
import { styles } from "./HomeStyles";
import Headers from "../../components/Header/Header";
import GeoLocation from "../../assets/svg/locationHome.svg"
import MyFollowings from "../../assets/svg/foloowing2.svg"
import FreeShops from "../../assets/svg/Free Shops.svg"
import ViewProducts from "../../assets/svg/View Products.svg"
import MyAskList from "../../assets/svg/My Ask List.svg"
import FindMember from "../../assets/svg/Find members.svg"
import MyTimeLine from "../../assets/svg/My Timeline.svg"
import CommonPost from "../../assets/svg/Common Posts.svg"
import PostAd from "../../assets/svg/Post Ad.svg"
import MyClient from "../../assets/svg/My Client.svg"
import YoutubeSvg from "../../assets/svg/YoutubeSvg.svg"
import FaceBookSvg from "../../assets/svg/FaceBookSvg.svg"


import UtilityDesk from "../../assets/svg/Utility Desk.svg"
import Carousel, {
	Pagination,
	autoplay
} from 'react-native-x-carousel';
//service 
import * as service from "./HomeService";
import Geolocation from 'react-native-geolocation-service';
import { SCREEN_WIDTH } from '../../global/constants';
import axios from 'axios';
import { connect } from 'react-redux';
import CarouselItem from '../../components/Carousel/CarouselItem';
import { PERMISSIONS, request } from 'react-native-permissions';
import { useFocusEffect } from '@react-navigation/native';
import CustomAlert from '../../components/CustomAlert/CusomAlert';
import CheckLogin from '../../components/CheckLogin';
// import { encryptToken } from '../../../App';
import { getService } from '../../services/getService';

const HomeScreen = ({ navigation, userId }) => {


	//states
	const [CarouselData, setCarouselData] = useState([])
	const [myClientsList, setMyClientsList] = React.useState(null)

	const [customAlertVisible, setCustomAlertVisible] = React.useState(false)
	const [alertText, setAlertText] = React.useState('');


	const [customAlertVisible2, setCustomAlertVisible2] = React.useState(false)
	// const [loading, setLoading] = React.useState(false)
	const [alertText2, setAlertText2] = React.useState('');



	const toggleCustomAlertVisibility2 = () => { setCustomAlertVisible2(!customAlertVisible2) }

	const leftButtonFunction2 = () => {
		toggleCustomAlertVisibility2()
	}


	const leftButtonFunction = () => {
		toggleCustomAlertVisibility()
		// setBackNavigator(true)
	}
	const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
	const rightButtonFunction = () => {
		// console.warn("2");
		toggleCustomAlertVisibility()
		BackHandler.exitApp()
		// setBackNavigator(false)
	}
	// const toggleCustomAlertVisibility1 = () => { setCustomAlertVisible1(!customAlertVisible1) }
	// const [customAlertVisible1, setCustomAlertVisible1] = React.useState(false);


	useFocusEffect(
		React.useCallback(() => {
			const onBackPress = () => {
				// Do Whatever you want to do on back button click
				// Return true to stop default back navigaton
				// Return false to keep default back navigaton
				// alert("ffd")
				// setAlertText("Please Fill all Details")
				toggleCustomAlertVisibility()
				return true

			};

			BackHandler.addEventListener(
				'hardwareBackPress', onBackPress
			);

			return () =>
				BackHandler.removeEventListener(
					'hardwareBackPress', onBackPress
				);
		}, [])
	);





	const HomepageData = [
		{
			key: 1,
			name: "Find Members",
			svgIcon: <FindMember />
		},
		{
			key: 2,
			name: "Geo Locations",
			svgIcon: <GeoLocation />
		},
		{
			key: 3,
			name: "My Timeline",
			svgIcon: <MyTimeLine />
		},
		{
			key: 4,
			name: "My Followings",
			svgIcon: <MyFollowings />
		},
		{
			key: 5,
			name: "Common Posts",
			svgIcon: <CommonPost />
		},
		{
			key: 6,
			name: "Free Shops",
			svgIcon: <FreeShops />
		},

		{
			key: 7,
			name: "Promote Business",
			svgIcon: <PostAd />
		},
		{
			key: 8,
			name: "View Products",
			svgIcon: <ViewProducts />
		},
		{
			key: 9,
			name: "My Client",
			svgIcon: <MyClient />
		},
		{
			key: 10,
			name: "My Ask List",
			svgIcon: <MyAskList />
		},
		{
			key: 11,
			name: "Utility Desk",
			svgIcon: <UtilityDesk />
		},
		// {
		// 	key: 12,
		// 	name: "Deep Link",
		// 	svgIcon: <UtilityDesk />
		// },
		// {
		// 	key: 12,
		// 	name: "BackImage",
		// 	svgIcon: null
		// },



	]

	const [userAddresses, setUserAddresses] = React.useState([])
	React.useEffect(() => {
		setUserAddresses(
			[
				{
					key: 1,
					addressType: "HOME"
				},
				{
					key: 2,
					addressType: "OFFICE"
				}
			]
		)
	}, [])

	const goNavigation = async (index,) => {
		if (index == 0) {
			navigation.navigate(ScreenNames.NBHMEMBER_SCREEN)
		}
		else if (index == 1) {
			const isAndroid = Platform.OS == 'android';

			if (isAndroid) {
				const result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
				console.log("result", result);
				if (result) {
					Geolocation.getCurrentPosition(
						({ coords }) => {
							navigation.navigate(ScreenNames.GEO_LOCATION_SCREEN)
						},
						(err) => {
							// if (err.code==3) {
							// }
							console.warn("getCurrentPosition Error", err);
						},
						{ enableHighAccuracy: true, } //ten meters not in the document
					);
				}
				else {
					const isGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
					if (isGranted == PermissionsAndroid.RESULTS.GRANTED) {
					}
					else if (isGranted == 'never_ask_again') {
					}
					else {
						return null;
					}
				}
			} else {
				await request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
					console.log("LOCATION_ALWAYS", result);
					if (result == "granted") {
						Geolocation.getCurrentPosition(
							async ({ coords }) => {
								navigation.navigate(ScreenNames.GEO_LOCATION_SCREEN)
							},
							(err) => {
								// if (err.code==3) {
								// }
								console.warn("getCurrentPosition Error",);
							},
							{
								enableHighAccuracy: true,
								timeout: 15000,
								maximumAge: 10000,
							} //ten meters not in the document
						);
					}
				});
			}
			// alert("This is Screen Under development")
		}
		else if (index == 2) {
			navigation.navigate(ScreenNames.MYTIMELINE_SCREEN)
		}
		else if (index == 3) {
			navigation.navigate(ScreenNames.MYFOLLOWING_SCREEN, { headerName: "Followings", heartShow: true })
		}
		else if (index == 4) {
			navigation.navigate(ScreenNames.MYFOLLOWING_SCREEN, { headerName: "Common Post", heartShow: true })
		}
		else if (index == 5) {
			navigation.navigate(ScreenNames.FREESHOPS_SCREEN)
		}
		else if (index == 6) {
			navigation.navigate(ScreenNames.ADVETISEPRODUCT_SCREEN)
		}
		else if (index == 7) {
			navigation.navigate(ScreenNames.VIEWPRODUCT_SCREEN)
		}

		else if (index == 8) {
			navigation.navigate(ScreenNames.MYCLIENT_SCREEN, { getMyCLientsListHome })
		}

		else if (index == 9) {
			navigation.navigate(ScreenNames.MYASKLIST_SCREEEN)
		}

		else if (index == 10) {
			navigation.navigate(ScreenNames.UTILITYDESK_SCREEN)
		}
		else {
			// navigation.navigate(ScreenNames.DEEPLINK)
			null
		}
	}

	const goprofileAdDetail = () => {
		navigation.navigate(ScreenNames.POSTADDETAIL_SCREEN)
	}
	//function : service function
	const getTodayAd = async () => {
		const req = `/premiumPost/todaysPost`
		getService(req).then((response) => {
			if (response.code == 200) {
				setCarouselData(response.data)
			}
			else {
				setCarouselData([])
				setAlertText2(response.message)
				toggleCustomAlertVisibility2()
			}
		})
	}


	const getMyCLientsListHome = async () => {
		const req = `/clients/userId/${userId}`
		getService(req).then((response) => {
			if (response.code == 200) {
				setMyClientsList(response.data)
			} else {
				setAlertText2(response.message)
				toggleCustomAlertVisibility2()
			}
		})
	}
	//useEffect
	useEffect(() => {
		getTodayAd()
		getMyCLientsListHome()
	}, [])

	const renderItem = (item) => <CarouselItem item={item} key={JSON.stringify(item)} />;


	const youTubeUrl = (uri) => {
		Linking.openURL(uri)
	}

	const FaceBookUrl = (uri) => {
		Linking.openURL(uri)
	}

	// let myClientsList = [1, 2, 3, 4, 5, 6]
	//UI
	return (
		<View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
			<View style={{
				shadowColor: "#000",
				shadowOffset: {
					width: 0,
					height: 1,
				},
				shadowOpacity: 0.22,
				shadowRadius: 2.22,

				elevation: 3, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, marginBottom: 10, backgroundColor: Colors.WHITE
			}}>
				<FocusAwareStatusBar isLightBar={false} isTopSpace={true} isTransparent={false} />
				<View style={{ paddingVertical: 20, }}>
					<View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
						<Image source={require("../../assets/images/NBH.png")} style={{ height: 40, width: 94, marginLeft: 20 }} />
						<View style={{
							marginLeft: 20, marginRight: 20, flexDirection: "row", alignItems: "center"
						}}>
							<TouchableOpacity
								onPress={() => youTubeUrl(`https://www.youtube.com/channel/UC-mNsCk6o_awXi1W6skopew`)}
								hitSlop={{ top: 10, bottom: 10, left: 20, right: 10 }}
								style={{ marginRight: 10 }}>

								<YoutubeSvg />
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => FaceBookUrl(`https://www.facebook.com/NBHSOLUTIONPVTLTD/`)}
								hitSlop={{ top: 10, bottom: 10, left: 10, right: 20 }}
							>

								<FaceBookSvg />
							</TouchableOpacity>
						</View>

					</View>
					{
						CarouselData.length > 0
							?
							<Carousel
								pagination={Pagination}
								renderItem={renderItem}
								autoplay={true}

								data={CarouselData}
							/>
							:
							null
					}
					{/* <View style={styles.carcosal}>
						<TouchableOpacity onPress={goprofileAdDetail}>
							<Image source={require("../../assets/images/i13.png")} style={{ height: "100%", width: "100%" }} />
						</TouchableOpacity>
					</View> */}

				</View>
			</View>
			<View style={{ flex: 1, marginHorizontal: 10, backgroundColor: Colors.WHITE }}>
				<FlatList
					showsVerticalScrollIndicator={false}
					numColumns={2}
					data={HomepageData}
					renderItem={({ item, index }) => (
						<View>

							<TouchableOpacity
								onPress={() => goNavigation(index)}
								activeOpacity={0.7}
								style={{
									width: SCREEN_WIDTH / 2 - 30
									, backgroundColor: Colors.WHITE, borderRadius: 10,
									flexDirection: "row", alignItems: "center", paddingHorizontal: 10, marginVertical: 15, marginHorizontal: 10, paddingVertical: 20,
									shadowColor: "#000",
									shadowOffset: {
										width: 0,
										height: 1,
									},
									shadowOpacity: 0.22,
									shadowRadius: 2.22,

									elevation: 2,
									// zIndex: 0
								}}>
								<View style={{ marginRight: 15 }}>
									{item.svgIcon}
								</View>
								<View style={{ flex: 1 }}>
									<Text style={styles.font2}>{item.name}</Text>
								</View>

								{item.key == 9 ?
									<View style={[styles.indicator,
									{ backgroundColor: myClientsList && (myClientsList.length >= 0 && myClientsList.length < 5) ? "red" : "green" }]}>
										<Text style={[styles.font1, { fontSize: 14 }]}>{myClientsList && myClientsList.length}</Text>
									</View>
									:
									null
								}
							</TouchableOpacity>


						</View>
					)}
				/>
			</View>
			<CheckLogin />
			<CustomAlert
				title={"Exit"}
				desc={"Are you sure you want to exit?"}
				leftButtonText={"No"}
				rightButtonText={"Yes"}
				toggleCustomAlertVisibility={toggleCustomAlertVisibility}
				leftButtonFunction={leftButtonFunction}
				rightButtonFunction={rightButtonFunction}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
// export default HomeScreen
