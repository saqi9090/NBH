
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
	StyleSheet,
	Linking,
	Platform,
} from 'react-native';
import React, { useState } from 'react';


import UpArrowSvg from '../../assets/svg/c-uparrow.svg';
import CameraSvg from '../../assets/svg/c-camera.svg';
import GallerySvg from '../../assets/svg/c-gallery.svg';
import DocSvg from '../../assets/svg/c-doc.svg';
import LocationSvg from '../../assets/svg/c-location.svg';
import ContactSvg from '../../assets/svg/c-contact.svg';
import { Colors, Constants, Fonts } from '../../global';
// import UpArrowSvg from '../../assets/svg/c-uparrow.svg';


const ChatModal = ({ shows, toggleModal, openCamera, openLibrary, openDocument, otherUserPhno }) => {

	const dialCall = (number) => {
		let phoneNumber = '';
		if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
		else { phoneNumber = `telprompt:${number}`; }
		Linking.openURL(phoneNumber);
	};


	const Data = [
		{
			key: 1,
			Svg: <CameraSvg />
		},
		{
			key: 2,
			Svg: <GallerySvg />
		},
		{
			key: 3,
			Svg: <DocSvg />
		},
		{
			key: 4,
			Svg: <LocationSvg />
		},
		{
			key: 5,
			Svg: <ContactSvg />
		},
		{
			key: 6,
			Svg: <UpArrowSvg />
		},

	]

	// const onpressFun = (index) => {

	//   if (index == 0) {
	//     openCamera()
	//   }
	//   else if(index == 1){
	//     openLibrary()

	//   }

	//   else if(index == 5){
	//     // _toggle()
	//     toggleModal()
	//     null
	//   }
	//    else {
	//     null
	//   }

	// }
	return (
		<Modal
			// focusable={true}
			animationType="slide"
			transparent={true}
			visible={shows}
			style={{ height: 300, width: 300 }}>
			<View
				style={{
					backgroundColor: Colors.WHITE,
					height: 90,
					width: 230,
					margin: 20,
					top: Constants.SCREEN_HEIGHT / 1.6,
					borderRadius: 10,
					padding: 10,
					// marginBottom: 100
				}}>
				<View
					style={{
						flexDirection: 'row',
					}}>
					<TouchableOpacity
						onPress={() => openCamera()}
						style={{ margin: 10 }}>
						<CameraSvg />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => openLibrary()}
						style={{ margin: 10 }}>
						<GallerySvg />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => openDocument()}
						style={{ margin: 10 }}>
						<DocSvg />
					</TouchableOpacity>
				</View>
				{/* <View
					style={{
						flexDirection: 'row',
					}}> */}
				{/* <TouchableOpacity style={{ margin: 10 }}>
						<LocationSvg />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => dialCall(otherUserPhno && otherUserPhno)}
						style={{ margin: 10 }}>
						<ContactSvg />
					</TouchableOpacity> */}
				{/* <TouchableOpacity
						onPress={toggleModal}
						style={{ margin: 10 }}>
						<UpArrowSvg
							height={50}
							width={30}
							style={{ transform: [{ rotate: '180deg' }] }}
						/>
					</TouchableOpacity> */}
				{/* </View> */}

			</View>

			<View style={{ position: "absolute", bottom: 70 }}>

				<TouchableOpacity
					onPress={toggleModal}
					style={{ marginHorizontal: 20, }}
				>
					<UpArrowSvg height={50} width={50} />
				</TouchableOpacity>
			</View>

			{/* <TouchableOpacity
						onPress={toggleModal}
						style={{ margin: 10 }}>
						<UpArrowSvg
							height={30}
							width={30}
							style={{ transform: [{ rotate: '180deg' }] }}
						/>
					</TouchableOpacity> */}
		</Modal>
	)
}

export default (ChatModal)

const styles = StyleSheet.create({
	container: {
		height: Dimensions.get("screen").height,
		width: Dimensions.get("screen").width,
	},
	circleAvtar: {
		width: 65,
		height: 65,
		borderRadius: 65 / 2,
		backgroundColor: "#bababa",
	},

	sendContain: {
		marginVertical: 40,
		flexDirection: 'row',
	},

	sendbtn: {
		right: 80,
		justifyContent: 'center',
		alignContent: 'center',
	},
});
