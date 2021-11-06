import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Header from "../../components/Header/Header";
import { Colors, Constants, Server } from '../../global';
import Carousel, {
    Pagination
} from 'react-native-x-carousel';
import { generateScrollingConfig } from './utils';
import SmallImage from './SmallImage';
import LargeImage from './LargeImage';

const PostImageScreen = ({ image, route, params }) => {
    const flatListRef = React.useRef(null);
    const flatListRef1 = React.useRef(null);
    const renderLargeProductImage = ({ item, index }) => {
        console.warn("route.params.postSize", route.params.postSize);
        return <LargeImage scrollToImageIndex={scrollToImageIndex1} index={index} item={item} postId={route.params.postId} postSize={route.params.postSize} />
    };

    const renderSmallProductImage = ({ item, index }) => {
        return <SmallImage onPress={scrollToImageIndex} index={index} item={item} postId={route.params.postId} />

    };

    const scrollToImageIndex = (index) => {
        flatListRef.current.scrollToIndex(generateScrollingConfig(true, index));
    };
    const scrollToImageIndex1 = (index) => {
        // console.warn(index);
        // flatListRef1.current.scrollToIndex(generateScrollingConfig1(true, index));
    };
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <Header name={"Post"} backgroundColor={true} />
            <ScrollView style={{ flex: 1, }}>

                <FlatList
                    ref={flatListRef}
                    // scrollEnabled={false}
                    data={route.params.image}
                    horizontal={true}
                    renderItem={renderLargeProductImage}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => `productLargeImage${index}`}
                />
                <FlatList
                    data={route.params.image}
                    horizontal={true}
                    ref={flatListRef1}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: 20 }}
                    style={{ flexGrow: 0, marginBottom: 20 }}
                    renderItem={renderSmallProductImage}
                    keyExtractor={(_, index) => `productSmallImages${index + 100}`}
                />
            </ScrollView>
        </View>
    )
}

export default PostImageScreen

const styles = StyleSheet.create({})
