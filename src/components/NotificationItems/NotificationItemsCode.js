import React from 'react';
import { Text, View, StyleSheet, Platform, Pressable } from 'react-native';
import { Fonts, Colors, Server, Constants } from '../../global';

//my imports
import CheckBox from '@react-native-community/checkbox';
import { connect } from 'react-redux';
import { styles } from './NotificationItemStyles'
import moment from 'moment'
const NotificationItems = ({ item, index, notificationId, setNotificationId, setCheckBoxVisible, checkBoxVisible, notifications }) => {
    const date = new Date();
    const [isChecked, setCheck] = React.useState(false);
    const isAndroid = Platform.OS == 'android';

    const toggleCheck = () => setCheck(!isChecked);

    function removeclick(a) {
        return a != item.notificationId;
    }

    const setCheckVisible = () => {
        setCheckBoxVisible(true)
        setCheck(true)
        setNotificationId([...notificationId, item.notificationId])
    }

    React.useEffect(() => {
        if (checkBoxVisible == false) {
            setCheck(false)
        }
    }, [checkBoxVisible])
    return (
        <Pressable
            activeOpacity={1}
            disabled={checkBoxVisible}
            onLongPress={setCheckVisible}
            style={styles.rowFront}
        >
            {
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {
                        checkBoxVisible
                        &&
                        <View style={{ marginLeft: 20, }}>
                            {
                                isAndroid
                                    ?
                                    <CheckBox
                                        value={isChecked}
                                        onChange={toggleCheck}
                                        boxType="circle"
                                        tintColors={{ true: Colors.PRIMARY, false: Colors.PRIMARY }}
                                        onValueChange={(value) => {
                                            if (value) {
                                                setNotificationId([...notificationId, item.notificationId])
                                            } else if (!value) {
                                                setNotificationId(notificationId.filter(removeclick))

                                            }
                                        }} />
                                    :
                                    <CheckBox
                                        onAnimationType='one-stroke'
                                        offAnimationType='one-stroke'
                                        value={isChecked}
                                        boxType="circle"
                                        onValueChange={(value) => {
                                            if (value) {
                                                setNotificationId([...notificationId, item.notificationId])
                                            } else if (!value) {
                                                setNotificationId(notificationId.filter(removeclick))

                                            }
                                        }}
                                        onChange={toggleCheck}
                                        onCheckColor={Colors.PRIMARY}
                                        tintColor={Colors.PRIMARY}
                                        onFillColor={Colors.WHITE}
                                        onTintColor={Colors.PRIMARY}
                                    />

                            }
                        </View>
                    }
                    <View style={{ flex: 1, }}>
                        <Text
                            maxFontSizeMultiplier={1}
                            numberOfLines={1} style={[styles.notificationText, { paddingHorizontal: 20, color: Colors.PRIMARY }]}>{item.title}</Text>
                        <Text
                            maxFontSizeMultiplier={1}
                            numberOfLines={2} style={[styles.notificationText, { paddingHorizontal: 20, }]}>{item.notificationText}</Text>
                        <Text
                            maxFontSizeMultiplier={1}
                            numberOfLines={1} style={[styles.notificationText, { paddingHorizontal: 20, color: Colors.GRAY_DARK }]}>{moment(item.createdDate.toString()).startOf('minutes').fromNow()}</Text>
                    </View>
                </View>
            }
            <View>
                {/* <Text numberOfLines={1} style={[styles.notificationDes, { paddingHorizontal: 20, color: Fonts.BLACK }]}>{new Date(item.createdDate) > new Date(date.setDate(date.getDate() - 30)) ? moment(item.createdDate.toString()).startOf('minutes').fromNow() : moment(item.createdDate.toString()).format('D MMM YYYY, h:mm')}</Text> */}
                <View style={{ height: 1, backgroundColor: "#0000000D", width: Constants.SCREEN_WIDTH, marginTop: 20 }} />
            </View>
        </Pressable>
    )
};

export default React.memo(NotificationItems);