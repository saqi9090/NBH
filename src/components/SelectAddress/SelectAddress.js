import { View, Text, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, TextInput, FlatList, Image, StyleSheet } from 'react-native'
import { styles } from "./SelectAddressStyles";
import React from 'react'
// import { Colors, Fonts, ScreenNames } from '../../global';
// import DropdownSvg from "../../assets/svg/dropdown.svg"
// import FocusAwareStatusBar from '../FocusAwareStatusBar';
import CrossSvg from "../../assets/svg/cross.svg"
import { selectaddressdata } from '../DummyData/DummyDataScreen';
import CheckSvg from "../../assets/svg/check-filled.svg";
import { Colors, Fonts } from '../../global';





const SelectAddress = ({ _toggleLikeMemberModal, likes, navigation }) => {
    //state
    const [selectAddressType, setSelectAddressType] = React.useState(0)


    return (

        <Modal
            animationType={'fade'}
            visible={true}
            // onRequestClose={toggleModal}
            transparent={true}
        // statusBarTranslucent={true}
        >
            <View style={styles.modalContainer}>

                <KeyboardAvoidingView behavior={Platform.OS == "android" ? null : "padding"}>
                    <View style={styles.confirmContainer}>
                        <View style={styles.confirmHeader}>
                            <Text style={styles.confirmDeliveryText}
                                maxFontSizeMultiplier={1}>Select an Address</Text>
                            <TouchableOpacity
                                onPress={() => _toggleLikeMemberModal()}
                                // style={styles.closeButton}
                                hitSlop={{top:20,right:20,bottom:20,left:20}}
                                >
                                <CrossSvg />
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginHorizontal: 19, marginVertical: 30 }}>
                            <View>
                                <Text style={{ fontSize: 18, fontFamily: Fonts.BOLD, color: Colors.PRIMARY, marginBottom: 10 }} >+ Add Address</Text>
                            </View>
                            <Text style={styles.font1}>Saved Addresses</Text>

                            <View>
                                <Text style={styles.font5} >DELIVERS TO</Text>
                                <View style={{ marginTop: 10 }}>
                                    <FlatList data={selectaddressdata}
                                        renderItem={({ item, index }) => (

                                            <View>
                                                <View style={{ flexDirection: "row", marginBottom: 25 }}>
                                                    <TouchableOpacity onPress={() => setSelectAddressType(index)} style={{ marginRight: 10 }}>
                                                        {selectAddressType == index ?
                                                            <CheckSvg />
                                                            :
                                                            <View style={{ height: 16, width: 16, borderRadius: 100, borderWidth: 1, borderColor: Colors.JUNGLE_BLACK, alignItems: "center", justifyContent: "center" }} />
                                                        }
                                                    </TouchableOpacity>
                                                    <View>
                                                        <Text style={[styles.font5, { marginBottom: 5 }]}>{item.type}</Text>
                                                        <View>
                                                            <Text style={styles.font6}>{item.address}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>


                                        )}
                                    />

                                </View>

                            </View>

                        </View>







                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>

    )
}

export default SelectAddress


