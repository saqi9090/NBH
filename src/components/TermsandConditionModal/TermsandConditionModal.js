import { View, Text, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, TextInput, FlatList, Image, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
// import { Colors, Fonts, ScreenNames } from '../../global';
// import DropdownSvg from "../../assets/svg/dropdown.svg"
// import FocusAwareStatusBar from '../FocusAwareStatusBar';
import CrossSvg from "../../assets/svg/cross.svg"
import { selectaddressdata, Reportdata } from '../DummyData/DummyDataScreen';
// import CheckSvg from "../../assets/svg/check-filled.svg";
import { Colors, Fonts } from '../../global';
import ReportCheckBox from '../ReportCheckBox/ReportCheckBox';
import { globalStyles } from '../../global/globalStyles';
import { SCREEN_WIDTH } from '../../global/constants';
import CheckBox from '@react-native-community/checkbox';






const TermsandConditionModal = ({ _toggleTermsAndCondition, termsCondition, navigation }) => {
    //state
    const [isSelected, setSelection] = React.useState(false);




    return (

        <Modal
            animationType={'fade'}
            visible={termsCondition}
            // onRequestClose={toggleModal}
            transparent={true}
        // statusBarTranslucent={true}
        >
            <View style={styles.modalContainer}>

                <KeyboardAvoidingView behavior={Platform.OS == "android" ? null : "padding"}>
                    <View style={styles.confirmContainer}>
                        <View style={styles.confirmHeader}>
                            <Text style={styles.confirmDeliveryText}
                                maxFontSizeMultiplier={1}>Terms and Conditions</Text>
                            <TouchableOpacity
                                onPress={() => _toggleTermsAndCondition()}
                                // style={styles.closeButton}
                                hitSlop={{top:20,right:20,bottom:20,left:20}}
                                >
                                <CrossSvg />
                            </TouchableOpacity>
                        </View>
                        <ScrollView>

                            <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                                <Text style={styles.font2}>
                                    Lorem Ipsum is simply dummy Lorem Ipsum i simply dummy text of the printing and simply typeset text of the printing and typesetsimply dummy text of the printing and simply typeset
                                    Lorem Ipsum is simply dummy Lorem Ipsum i simply dummy text of the printing and simply typeset text of the printing and typesetsimply dummy text of the printing and simply typeset
                             </Text>
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 30, marginHorizontal: 10 }}>
                                <CheckBox
                                    value={isSelected}
                                    onTintColor="#202228"
                                    onValueChange={setSelection}
                                    style={{ marginRight: 5 }}
                                    tintColors={{ true: Colors.PRIMARY, false: Colors.WARNING }}
                                // onFillColor={{ true: Colors.WARNING, false: Colors.PRIMARY }}
                                // style={styles.checkbox}

                                />
                                <Text style={styles.font1}>Agree to our Privacy, Terms & Conditions</Text>
                            </View>

                        </ScrollView>
                        <TouchableOpacity style={globalStyles.button}>
                            <Text style={globalStyles.buttonText}>Continue to pay</Text>
                        </TouchableOpacity>



                    </View>







                </KeyboardAvoidingView>
            </View>
        </Modal >

    )
}

export default TermsandConditionModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#00000050',
        justifyContent: 'flex-end'
    },
    confirmContainer: {
        // flex: 0.25,
        backgroundColor: Colors.WHITE,
        paddingBottom: 20,
    },
    confirmHeader: {
        backgroundColor: Colors.PRIMARY,
        flexDirection: 'row',
        height: 66,
        justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal: 20
    },
    confirmDeliveryText: {
        // paddingLeft: 20,
        paddingTop: 15,
        paddingBottom: 15,
        fontFamily: Fonts.SEMIBOLD,
        fontSize: Fonts.SIZE_18,
        color: Colors.JUNGLE_BLACK,
        letterSpacing: 0.2,

    },
    font1: { fontSize: 14, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK, marginVertical: 10 },

    font2: { fontSize: 15, fontFamily: Fonts.REGULAR, color: Colors.JUNGLE_BLACK, },
    font3: { fontSize: 14, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK, },
    font4: { fontSize: 13, fontFamily: Fonts.BOLD, color: Colors.ONYXOpacity, },
    font5: { fontSize: 12, fontFamily: Fonts.BOLD, color: Colors.JUNGLE_BLACK, },
    font6: { fontSize: 12, fontFamily: Fonts.BOLD, color: Colors.ONYX_60, },
    font7: { fontSize: 14, fontFamily: Fonts.BOLD, color: Colors.ONYX_60, },
    quantity: { height: 30, width: 68, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 4, backgroundColor: Colors.PRIMARY, borderRadius: 5 }




})


