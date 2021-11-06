import React from 'react';
import { Animated, Text, View } from 'react-native';
import { SCREEN_WIDTH } from '../../global/constants';

//styles
import { styles } from './CarouselStyle';

//global

const Dots = ({
	scrollX,
	index
}) => {

	const inputRange = [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH];

	const opacity = scrollX.interpolate({
		inputRange,
		outputRange: [0.3, 1, 0.3],
		extrapolate: 'clamp',
	});

	const scale = scrollX.interpolate({
		inputRange,
		outputRange: [0.7, 1, 0.7],
		extrapolate: 'clamp',
	});

	const backgroundColor = scrollX.interpolate({
		inputRange,
		outputRange: ["rgba(29, 53, 87, 0.8)", "rgba(29, 53, 87, 1)", "rgba(29, 53, 87, 0.8)"],
	});

	return (
		<Animated.View style={[styles.circle, { opacity, backgroundColor, transform: [{ scale }] }]} />
	);
}

export default React.memo(Dots);
