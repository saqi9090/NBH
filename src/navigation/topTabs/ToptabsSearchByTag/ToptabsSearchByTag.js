
// export default ToptabsSearchByTag

import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { Colors, Fonts } from '../../../global';
import Animated from 'react-native-reanimated';
import SearchbytagquicklinkScreen from '../../../screens/SearchByTagQuickLink/SearchbytagquicklinkScreen';




const Tab = createMaterialTopTabNavigator();
let width = [];
let offset = [];

function MyTabBar({ state, descriptors, navigation, position, scrollOffset }) {
    //Variables
    const ref = React.useRef(null)

    //States
    const [testOffset, settestOffset] = React.useState(0)

    //UseEffects
    React.useEffect(() => {
        setTimeout(() => {
            ref.current.scrollToIndex({ animated: true, index: state.index, viewPosition: 0.5 });
        }, 400);

        // ref.current.scrollTo({ x: (offset[state.index] - (Dimensions.get('window').width - 40) / 2) + (width[state.index] / 2), y: 0, animated: true })
    }, [state.index]);

    return (
        <View
            style={{ flexDirection: 'row', marginTop: 20, marginBottom: 10, backgroundColor: "#fff", marginLeft: 80 }}>
            <FlatList
                ref={ref}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={state.routes}
                renderItem={({ item, index }) => {
                    const route = item;
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = (native) => {
                        ref.current.scrollToIndex({ animated: true, index: index, viewPosition: 0.5 })
                        settestOffset(native.pageX)
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }

                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    const inputRange = state.routes.map((_, i) => i);
                    // const opacity = Animated.interpolate(position, {
                    // 	inputRange,
                    // 	outputRange: inputRange.map(i => (i === index ? 1 : 1)),
                    // });

                    return (
                        <TouchableOpacity
                            activeOpacity={1}
                            key={index}
                            accessibilityRole="button"
                            accessibilityStates={isFocused ? ['selected'] : []}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={({ nativeEvent }) => onPress(nativeEvent)}
                            onLongPress={onLongPress}
                            style={{ flexGrow: 1, alignItems: 'center', marginRight: 20, height: 35, borderRadius: 7, backgroundColor: isFocused ? Colors.PRIMARY : "#ffd64840", justifyContent: "center", paddingHorizontal: 15 }}
                            onLayout={({ nativeEvent }) => { width.push(nativeEvent.layout.width); offset.push(nativeEvent.layout.x) }}

                        >
                            <Animated.Text style={{
                                opacity: state.routes.length > 1 ?
                                    Animated.interpolate(position, {
                                        inputRange,
                                        outputRange: inputRange.map(i => (i === index ? 1 : 1)),
                                    }) : 1,
                                fontSize: Fonts.SIZE_14,
                                color: isFocused ? "#20222890" : Colors.GRAY_DARK,
                                fontFamily: Fonts.SEMIBOLD,
                            }}>
                                {label}
                            </Animated.Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}

// ...




const ToptabsSearchByTag = () => {

    return (

        <Tab.Navigator
            // initialRouteName={initialRoute}
            tabBar={props => <MyTabBar {...props} />}
            swipeEnabled={true}
            // sceneContainerStyle={{ backgroundColor: "#ffffff00" }}
            lazy={true}
        >


            <Tab.Screen name={"All"} component={SearchbytagquicklinkScreen} />
            <Tab.Screen name={"Textture"} component={SearchbytagquicklinkScreen} />
            <Tab.Screen name={"Virtual Events"} component={SearchbytagquicklinkScreen} />
            <Tab.Screen name={"Body Guard"} component={SearchbytagquicklinkScreen} />


        </Tab.Navigator>

    );
}


export default ToptabsSearchByTag;