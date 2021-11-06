import React from 'react'
import { Text, View, Platform, TouchableOpacity } from 'react-native';
//global
import { Colors, Fonts } from '../../global';
import CheckBox from '@react-native-community/checkbox';

const ReportCheckBox = ({ item, setReasonId, reasonId }) => {

    //state
    const [toggleCheckBox, setToggleCheckBox] = React.useState(false)
    const [toggle, setToggle] = React.useState(true)
    const togglState = () => { setToggle(!toggle) }
    //function
    const _toggleFilter = () => {
        setToggleCheckBox(!toggleCheckBox)

    }
    const removereasonId = (id) => {
        return id.reasonId !== item.reasonId;
    }

    const reasonToReportModal = () => {
        if (toggle) {
            setReasonId([...reasonId, { "reasonId": item.reasonId }]);
            togglState()
            _toggleFilter()
        } else if (!toggle) {
            setReasonId(reasonId.filter(removereasonId));
            togglState()
            _toggleFilter()
        }
    }

    console.warn("reasonId", reasonId);
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity
                onPress={reasonToReportModal}
                activeOpacity={0.5}
                style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
                <View
                    style={{ marginRight: 10 }}>
                    {
                        Platform.OS == "android"
                            ?
                            <CheckBox
                                tintColors={{ true: "#1d3557", false: "#bababa" }}
                                tintColor={"#1d3557"}
                                onTintColor={"#baba"}
                                lineWidth={2.0}
                                value={toggleCheckBox}
                                onChange={_toggleFilter}
                                onValueChange={(newValue) => {
                                    console.warn("newValue", newValue);
                                    if (newValue) {
                                        setReasonId([...reasonId, { "reasonId": item.reasonId }]);
                                    } else if (!newValue) {
                                        setReasonId(reasonId.filter(removereasonId));

                                    }
                                }}
                            />
                            :
                            <CheckBox
                                onAnimationType='one-stroke'
                                offAnimationType='one-stroke'
                                onChange={_toggleFilter}
                                onValueChange={(newValue) => {
                                    if (newValue) {
                                        setReasonId([...reasonId, { "reasonId": item.reasonId }]);
                                    } else if (!newValue) {
                                        setReasonId(reasonId.filter(removereasonId));
                                    }
                                }}
                                value={toggleCheckBox}
                                style={{ transform: [{ scale: 0.7 }] }}
                                boxType='square'
                                onCheckColor={Colors.PRIMARY}
                                tintColor={Colors.PRIMARY}
                                onFillColor={Colors.WHITE}
                                onTintColor={Colors.PRIMARY}
                            />
                    }
                </View>

                <Text style={{ fontFamily: Fonts.SEMIBOLD, color: Colors.BLACK, fontSize: 16 }}>{item.reason}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ReportCheckBox

