//react components
import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';

//styles
import { styles } from './CarouselStyle';

//global
import { useNavigation } from '@react-navigation/native';
import { Constants, Server } from '../../global';
import CarouselModal from '../modal/CarouselModal/CarouselModal';


const CarouselItem = ({ item }) => {

	console.warn(Constants.SCREEN_WIDTH);
	//states
	const [showCarouelModal, setShowCarouelModal] = useState(false);
	const navigation = useNavigation();
	const imageUrl = `${Server.BASE_URL}/premiumPost/${item?.premiumPostId}/${item.postImage}/postImage`;

	const handleOnPress = () => {
		setShowCarouelModal(true);
		// navigation.navigate()
	};

	return (
		<TouchableOpacity
			onPress={handleOnPress}
			activeOpacity={0.8}
			style={styles.itemCon}>
			<Image
				resizeMode="cover"
				source={{ uri: imageUrl }}
				style={{
					width: '100%',
					height: '100%',
					borderRadius: 20,
				}}
			/>
			<CarouselModal
				showCarouelModal={showCarouelModal}
				setShowCarouelModal={setShowCarouelModal}
				item={item}
			/>
		</TouchableOpacity>
	);
};
export default React.memo(CarouselItem);