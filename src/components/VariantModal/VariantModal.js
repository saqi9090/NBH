import { View, Text, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, TextInput, FlatList, Image } from 'react-native'
import { styles } from "./VariantModalStyles";
import React from 'react'
import { Colors, Fonts, ScreenNames } from '../../global';
import DropdownSvg from "../../assets/svg/dropdown.svg"
import FocusAwareStatusBar from '../FocusAwareStatusBar';
import CrossSvg from "../../assets/svg/cross.svg"
import { feedsSaveddata, quickLinkData } from '../DummyData/DummyDataScreen';
import { globalStyles } from '../../global/globalStyles';

const VariantModal = ({ _toggleAddVariantModal, AddVariant, navigation }) => {


    //state

    const [selectVariant, setSelectVariant] = React.useState()

    return (

        <Modal
            animationType={'fade'}
            visible={AddVariant}
            // onRequestClose={toggleModal}
            transparent={true}
        // statusBarTranslucent={true}
        >
            <View style={styles.modalContainer}>

                <KeyboardAvoidingView behavior={Platform.OS == "android" ? null : "padding"}>
                    <View style={styles.confirmContainer}>
                        <View style={styles.confirmHeader}>
                            <Text style={styles.confirmDeliveryText}
                                maxFontSizeMultiplier={1}>Add Varaint</Text>
                            <TouchableOpacity
                                onPress={() => _toggleAddVariantModal()}
                                // style={styles.closeButton}
                                hitSlop={{top:20,right:20,bottom:20,left:20}}
                                >
                                <CrossSvg />
                            </TouchableOpacity>
                        </View>

                        <FlatList data={feedsSaveddata}
                            horizontal={true}
                            style={{ marginVertical: 10, marginLeft: 20 }}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity onPress={() => setSelectVariant(index)}>
                                    <View style={[styles.Variant, { backgroundColor: selectVariant == index ? Colors.PRIMARY : Colors.WHITE, borderWidth: selectVariant == index ? 0 : 1 }]}>
                                        <Text style={{ fontSize: 14, fontFamily: Fonts.SEMIBOLD, color: selectVariant == index ? Colors.JUNGLE_BLACK : Colors.ONYX_60 }}>12 - 18 m</Text>
                                    </View>
                                </TouchableOpacity>

                            )} />

                        <TouchableOpacity style={globalStyles.button}>
                            <Text style={[globalStyles.buttonText, { fontFamily: Fonts.SEMIBOLD }]}>Add to Cart</Text>
                        </TouchableOpacity>


                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>

    )
}

export default VariantModal
