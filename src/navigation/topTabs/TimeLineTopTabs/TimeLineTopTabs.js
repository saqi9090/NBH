



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

function MyTabBar({ state, descriptors, navigation, position }) {
    return (
        <View style={{ flexDirection: 'row', backgroundColor: "red", height: 40, borderBottomWidth: 2, borderBottomLeftRadius: 10, borderBottomLeftRadius: 10 }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
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
                const opacity = Animated.interpolate(position, {
                    inputRange,
                    outputRange: inputRange.map(i => (i === index ? 1 : 0)),
                });

                return (

                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, alignItems: "center", backgroundColor: isFocused ? Colors.WARNING : Colors.ONYX_60, borderBottomWidth: 1, height: 30, borderBottomColor: isFocused ? Colors.PRIMARY : Colors.ONYX_60 }}
                    >
                        <Animated.Text style={{ opacity, color: isFocused ? Colors.PRIMARY : Colors.ONYX_60, }}>
                            {label}
                        </Animated.Text>
                    </TouchableOpacity>

                );
            })}
        </View>
    );
}

// ...




const TimeLineTopTabs = () => {

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
        </Tab.Navigator>

    );
}


export default TimeLineTopTabs;