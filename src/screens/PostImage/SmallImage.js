import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Server } from '../../global';

import PropTypes from 'prop-types';

const SmallImage = ({
	onPress,
	postId,
	index,
	item
}) => {

	const handleOnPress = () => {
		if (typeof onPress === 'function') {
			onPress(index);
		}
	};

	return (
		<TouchableOpacity
			onPress={handleOnPress}
			style={styles.imageContainer}>
			<Image style={styles.image}
				resizeMode={'cover'}
				source={{ uri: `${Server.BASE_URL}/posts/${postId}/${item}/postImage` }}
			/>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	imageContainer: {
		height: 82,
		width: 92,
		marginRight: 15,
		borderRadius: 10
	},
	image: {
		borderRadius: 10,
		height: '100%',
		width: '100%'
	}
});

SmallImage.propTypes = {
	productId: PropTypes.number.isRequired,
	index: PropTypes.number.isRequired,
	onPress: PropTypes.func.isRequired,
};

export default SmallImage;
