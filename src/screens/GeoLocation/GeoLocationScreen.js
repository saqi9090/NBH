import React, { useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Animated,
	Image,
	TouchableOpacity,
	Dimensions,
	Platform,
	StatusBar,
	Linking,
	PermissionsAndroid
} from "react-native";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { markers, mapStandardSilverStyle, mapStandardStyle } from './mapData';
import { useTheme } from '@react-navigation/native';

import Pin from '../../assets/svg/Pin';

import Svg, { Path, Circle } from 'react-native-svg';
import { WINDOW_WIDTH } from '../../global/constants';
import { Colors, Fonts, Server } from '../../global';

// import LocationSvg from '../../assets/svg/Location_Icon'
import LocationSvg from '../../assets/svg/DeliveryUserLocation';
import CallSvg from '../../assets/svg/call'
import AssignSvg from '../../assets/svg/whatsapp'
import axios from 'axios';
import GeoLocationUserCard from '../../components/GeoLocationUserCard/GeoLocationUserCard';
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, request } from 'react-native-permissions';
import { connect } from 'react-redux';
import { getService } from '../../services/getService';
import CustomAlert from '../../components/CustomAlert/CusomAlert';



const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 100;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const AssignDeliveryUserScreen = ({ userId, name }) => {
	const theme = useTheme();
	const [alertTitle, setAlertTitle] = React.useState("");
	const [alertText, setAlertText] = React.useState('');
	const [customAlertVisible, setCustomAlertVisible] = React.useState(false);

	const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
	const leftButtonFunction = () => {
		toggleCustomAlertVisibility()
	}


	const initialMapState = {
		markers,
		categories: [
			{
				name: 'Fastfood Center',
			},
			{
				name: 'Restaurant',
			},
			{
				name: 'Dineouts',
			},
			{
				name: 'Snacks Corner',
			},
			{
				name: 'Hotel',
			},
		],
		region: {
			latitude: 19.317237,
			longitude: 73.055115,
			latitudeDelta: 0.04864195044303443,
			longitudeDelta: 0.040142817690068,
		},
	};

	const getGeoLocationUsers = async () => {

		const req = `/users/getAllGeoVO`
		getService(req).then((response) => {

			if (response.code == 200) {


				const resp = response.data.filter(e => e.coordinate.latitude != null)

				setState({
					markers: resp,
					categories: [
						{
							name: 'Fastfood Center',
						},
						{
							name: 'Restaurant',
						},
						{
							name: 'Dineouts',
						},
						{
							name: 'Snacks Corner',
						},
						{
							name: 'Hotel',
						},
					],
					region: {
						latitude: 19.317237,
						longitude: 73.055115,
						latitudeDelta: 0.04864195044303443,
						longitudeDelta: 0.040142817690068,
					},
				})

			} else {
				setAlertTitle("Alert")
				setAlertText(response.message)
				toggleCustomAlertVisibility()
			}
		})

	}

	const requestPermission = async () => {
		const isAndroid = Platform.OS == 'android';

		if (isAndroid) {
			const result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
			if (result) {
				getGeoLocationUsers()
			}
			else {
				const isGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
				if (isGranted == PermissionsAndroid.RESULTS.GRANTED) {
					getGeoLocationUsers()
				}
				else if (isGranted == 'never_ask_again') {
					getGeoLocationUsers()
				}
				else {
					getGeoLocationUsers()
					return null;
				}
			}
		} else {
			await request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
				if (result == "granted") {
					getGeoLocationUsers()
				}
			});
		}
	}
	React.useEffect(() => {
		requestPermission()
	}, [])
	const [state, setState] = React.useState(initialMapState);

	let mapIndex = 0;
	let mapAnimation = new Animated.Value(0);

	useEffect(() => {
		mapAnimation.addListener(({ value }) => {
			let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
			if (index >= state.markers.length) {
				index = state.markers.length - 1;
			}
			if (index <= 0) {
				index = 0;
			}
			clearTimeout(regionTimeout);
			const regionTimeout = setTimeout(() => {
				if (mapIndex !== index) {
					mapIndex = index;
					const { coordinate } = state.markers[index];
					_map.current.animateToRegion(
						{
							...coordinate,
							latitudeDelta: state.region.latitudeDelta,
							longitudeDelta: state.region.longitudeDelta,
						},
						350
					);
				}
			}, 10);
		});
	}, [state]);

	const interpolations = state.markers.map((marker, index) => {
		const inputRange = [
			(index - 1) * CARD_WIDTH,
			index * CARD_WIDTH,
			((index + 1) * CARD_WIDTH),
		];


		const scale = mapAnimation.interpolate({
			inputRange,
			outputRange: [1, 1.5, 1],
			extrapolate: "clamp"
		});

		return { scale };
	});

	const onMarkerPress = (mapEventData) => {
		const markerID = mapEventData._targetInst.return.key;

		let x = (markerID * CARD_WIDTH) + (markerID * 20);
		if (Platform.OS === 'ios') {
			x = x - SPACING_FOR_CARD_INSET;
		}

		_scrollView.current.scrollTo({ x: x, y: 0, animated: true });
	}

	const _map = React.useRef(null);
	const _scrollView = React.useRef(null);

	const TempSvg = <Svg width="100%" height="100%" viewBox="0 0 76 100" fill="none" xmlns="http://www.w3.org/2000/svg">
		<Path d="M38 0C17.3213 0 0.5 16.8232 0.5 37.5C0.5 65.1652 35.0988 98.0469 36.5719 99.4344C36.9746 99.8107 37.4873 100 38 100C38.5127 100 39.0254 99.8107 39.4283 99.4344C40.9012 98.0469 75.5 65.1652 75.5 37.5C75.5 16.8232 58.6787 0 38 0ZM38 58.3334C26.5131 58.3334 17.1666 48.9869 17.1666 37.5C17.1666 26.0131 26.5133 16.6666 38 16.6666C49.4867 16.6666 58.8334 26.0133 58.8334 37.5C58.8334 48.9867 49.4869 58.3334 38 58.3334Z" fill="black" />
		<Circle cx="38" cy="37" r="25" fill="#C4C4C4" />
	</Svg>;
	return (
		<View style={styles.container}>
			<StatusBar barStyle="dark-content" backgroundColor='transparent' translucent={true} />
			<MapView
				ref={_map}
				initialRegion={state.region}
				style={styles.container}
				provider={PROVIDER_GOOGLE}
				customMapStyle={false}
			>
				{state.markers.map((marker, index) => {
					const scaleStyle = {
						transform: [
							{
								scale: interpolations[index].scale,
							},
						],
					};
					return (
						<MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e)}>
							<Animated.View style={[styles.markerWrap]}>
								<Animated.View style={{ ...scaleStyle, height: 85, width: 80, justifyContent: 'center', alignItems: 'center', }} >
									<View style={{ height: 25, width: 25, borderRadius: 15, borderWidth: 3, borderColor: '#040404', marginTop: 2 }}>
										<Image
											source={{ uri: `${Server.BASE_URL}/users/${marker.id}/${marker.image}/thumbnailImage` }}
											style={[styles.marker]}
											resizeMode="cover"
										/>
									</View>
									<View>
										<View
											style={{
												...scaleStyle,
												width: 0,
												height: 0,
												borderLeftWidth: 8,
												borderRightWidth: 8,
												borderBottomWidth: 8,
												marginTop: -3,
												borderStyle: 'solid',
												backgroundColor: 'transparent',
												borderLeftColor: 'transparent',
												borderRightColor: 'transparent',
												borderBottomColor: '#040404',
												transform: [{ rotate: "180deg" }],
												marginLeft: -0.5
												// position: 'absolute',
												// bottom: -10,
												// left: 4.2
											}}
										>
										</View>
									</View>
								</Animated.View>

								{/* </View> */}


								{/* </Animated.View> */}
								{/* <Animated.Image
                  source={require('../assets/image/MeguinaboxImages/location3.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                /> */}
								{/* </Animated.View> */}

							</Animated.View>
						</MapView.Marker>
					);
				})}
			</MapView>
			{/* <View style={styles.searchBox}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{ flex: 1, padding: 0 }}
        />
      </View> */}
			{/* <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{ // iOS only
          top: 0,
          left: 0,
          bottom: 0,
          right: 20
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 20 : 0
        }}
      >
        {state.categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.chipsItem}>
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView> */}
			<Animated.ScrollView
				ref={_scrollView}
				horizontal
				pagingEnabled
				scrollEventThrottle={1}
				showsHorizontalScrollIndicator={false}
				snapToInterval={CARD_WIDTH + 20}
				snapToAlignment="center"
				style={styles.scrollView}
				contentInset={{
					top: 0,
					left: SPACING_FOR_CARD_INSET,
					bottom: 0,
					right: SPACING_FOR_CARD_INSET
				}}
				contentContainerStyle={{
					paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
				}}
				onScroll={Animated.event(
					[
						{
							nativeEvent: {
								contentOffset: {
									x: mapAnimation,
								}
							},
						},
					],
					{ useNativeDriver: true }
				)}
			>
				{state.markers.map((marker, index) => (
					<GeoLocationUserCard marker={marker} index={index} userName={name} />
				))}
			</Animated.ScrollView>

			<CustomAlert
				title={alertTitle}
				desc={alertText}
				leftButtonText={"Ok"}
				leftButtonFunction={leftButtonFunction}
				toggleCustomAlertVisibility={toggleCustomAlertVisibility}
				customAlertVisible={customAlertVisible}
			/>
		</View >
	);
};

const mapStateToProps = state => ({
	name: state.user.name,
	email: state.user.email,
	phNo: state.user.phNo,
	userImage: state.user.thumbnailImage,
	userId: state.user.userId
});

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(mapStateToProps, mapDispatchToProps)(AssignDeliveryUserScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	searchBox: {
		position: 'absolute',
		marginTop: Platform.OS === 'ios' ? 40 : 20,
		flexDirection: "row",
		backgroundColor: '#fff',
		width: '90%',
		alignSelf: 'center',
		borderRadius: 5,
		padding: 10,
		shadowColor: '#ccc',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 10,
	},
	chipsScrollView: {
		position: 'absolute',
		top: Platform.OS === 'ios' ? 90 : 80,
		paddingHorizontal: 10
	},
	chipsIcon: {
		marginRight: 5,
	},
	chipsItem: {
		flexDirection: "row",
		backgroundColor: '#fff',
		borderRadius: 20,
		padding: 8,
		paddingHorizontal: 20,
		marginHorizontal: 10,
		height: 35,
		shadowColor: '#ccc',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 10,
	},
	scrollView: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		paddingVertical: 10,
		marginBottom: 5
	},
	endPadding: {
		paddingRight: width - CARD_WIDTH,
	},
	card: {
		// padding: 10,
		elevation: 8,
		backgroundColor: "#FFF",
		// borderTopLeftRadius: 10,
		// borderTopRightRadius: 10,
		borderRadius: 10,
		marginHorizontal: 10,
		shadowColor: "#000",
		shadowRadius: 5,
		shadowOpacity: 0.3,
		shadowOffset: { x: 2, y: -2 },
		height: CARD_HEIGHT,
		width: CARD_WIDTH,
		overflow: "hidden",
		marginBottom: 20
	},
	cardImage: {
		flex: 3,
		width: "100%",
		height: "100%",
		alignSelf: "center",
	},
	textContent: {
		flex: 2,
		padding: 10,
	},
	cardtitle: {
		fontSize: 12,
		// marginTop: 5,
		fontWeight: "bold",
	},
	cardDescription: {
		fontSize: 12,
		color: "#444",
	},
	markerWrap: {
		alignItems: "center",
		justifyContent: "center",
		width: 50,
		height: 50,
	},
	marker: {
		width: "100%",
		height: "100%",
		borderRadius: 10
	},
	button: {
		alignItems: 'center',
		marginTop: 5
	},
	signIn: {
		width: '100%',
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 3
	},
	textSign: {
		fontSize: 14,
		fontWeight: 'bold'
	},
	mapContainer: {
		width: WINDOW_WIDTH,
		height: WINDOW_WIDTH + (WINDOW_WIDTH / 8.92),
	},
	sideHeading: {
		paddingHorizontal: 20,
		marginTop: 20,
		fontFamily: Fonts.SEMIBOLD,
		fontSize: Fonts.SIZE_16,
		color: Fonts.BLACK,
	},
	deliveryUserContaienr: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 20
	},
	deliveryUserCards: {
		flex: 1,
		position: "relative",
		flexDirection: "row",
		padding: 15,
		borderRadius: 10,
		backgroundColor: Colors.WHITE,
		zIndex: 1
	},
	deliveryUserImage: {
		width: 77,
		height: 70,
		borderRadius: 10
	},
	deliveryUserDetail: {
		paddingLeft: 15,
		justifyContent: "space-between"
	},
	fontMedium: {
		fontFamily: Fonts.SEMIBOLD,
		fontSize: Fonts.SIZE_14,
		color: Fonts.BLACK,
	},
	fontMediumOuterSpace: {
		fontFamily: Fonts.SEMIBOLD,
		fontSize: Fonts.SIZE_12,
		color: Fonts.OUTER_SPACE,
	},
	deliveryUserLocation: {
		flexDirection: 'row',
		alignItems: "center"
	}
});