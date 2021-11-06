import { useNavigation } from '@react-navigation/core';
import React from 'react'
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
} from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Headers from "../../components/Header/Header";
import { Colors, Constants, Fonts, ScreenNames } from '../../global';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../global/constants';
import SendSvg from '../../assets/svg/c-send.svg';
import { styles } from './ChatScreenCodeStyle';


const DocumentViewScreen = ({ route, params }) => {

	const navigation = useNavigation()
	const [message, setMessage] = React.useState(null)

	// console.warn("documentData", route?.params?.documentData);
	const goNavigation = () => {

		// route.params.addImageMessage(message, route.params.ImagePath, route.params.ImageMime)

		route.params.addDocumentMessage(message, route?.params?.documentData)

		// navigation.navigate(ScreenNames.CHAT_SCREEN)
	}

	return (
		<View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
			<Headers name={"chaImage"} backgroundColor={true} />
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Image
					source={{ uri: "https://xflower-software.com/files/Blog/HU/document.png" }}
					resizeMode="contain"
					style={{ height: SCREEN_HEIGHT / 2, width: SCREEN_WIDTH / 2 }} />
				<Text style={{ color: Colors.BLACK, fontFamily: Fonts.BOLD, position: "absolute", bottom: SCREEN_HEIGHT / 9 }}>
					{route?.params?.documentData?.name}
				</Text>

			</View>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginHorizontal: 10 }}>
				<TextInput
					placeholderTextColor="#c8d6e5"
					placeholder="Write a message"
					onChangeText={(e) => { setMessage(e); }}
					style={{
						color: 'black',
						width: "85%",
						paddingHorizontal: 20,
						borderRadius: 25,
						height: 50,
						elevation: 2,
						alignSelf: "center",
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 1,
						},
						shadowOpacity: 0.20,
						shadowRadius: 1.41,
						backgroundColor: 'white',
						fontFamily: Fonts.BOLD,
						fontSize: 16,
					}}
				>
					{message}
				</TextInput>
				<TouchableOpacity
					onPress={() => goNavigation()}
				>
					<SendSvg height={50} width={50} />
				</TouchableOpacity>

			</View>


		</View>
	)
}

export default DocumentViewScreen;

