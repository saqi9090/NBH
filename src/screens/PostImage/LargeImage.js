import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Constants, Server } from '../../global';

const LargeImage = ({
	productId,
	index,
	postId,
	item,
	postSize
}) => {

	const imageUri = `${Server.BASE_URL}/posts/${postId}/${item}/postImage`;

	return (
		<View style={[styles.imageContainer, { height: postSize / 1.8 }]}>
			<Image
				resizeMode="stretch"
				style={styles.image}
				source={{ uri: imageUri }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	imageContainer: {
		width: Constants.SCREEN_WIDTH,

		marginTop: 20,
		marginBottom: 20
	},
	image: {
		height: '100%',
		width: '100%',
	}
});

export default React.memo(LargeImage);
