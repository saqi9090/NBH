import React from 'react'
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import SearchSvg from "../../assets/svg/magnifying-glass 1.svg";
import DropDown from "../../assets/svg/caret-down (1) 3.svg";
import { Colors, Fonts } from '../../global';
import { memberplane, Pincode14 } from '../DummyData/DummyDataScreen';


const FilterSearch = ({ FilterModalOnpress, placeholderValue, valueofTextInput, dataOfFiltert, setdata, _toggleFilterModal1 }) => {
    //state 
    const [textInputValue, setTextInputValue] = React.useState("")
    const [FilterModal, setFilterModal] = React.useState(false);

    const _toggleFilterModal = () => {
        setFilterModal(!FilterModal)
    }
    return (
        <View>
            <View style={styles.searchContainer}>

                <View style={{ flex: 10, alignItems: "center" }}>

                    <SearchSvg />
                </View>
                <View style={{ flex: 80 }}>

                    <TextInput
                        placeholderTextColor={Colors.BLACK}

                        placeholder={placeholderValue}
                        //  onChangeText={text => valueofTextInput(text)}
                        style={styles.TextInputStyle}>{textInputValue}

                    </TextInput>
                </View>

                <View style={{ flex: 10, alignItems: "center", paddingLeft: 10 }}>
                    <TouchableOpacity
                        style={{ padding: 4 }}
                        onPress={_toggleFilterModal}>
                        <DropDown />
                    </TouchableOpacity>
                </View>
            </View>

            {
                FilterModal ?
                    <View style={styles.confirmContainer}>
                        <FlatList data={dataOfFiltert}
                            style={{ marginVertical: 0, height: 80, }}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        // _toggleMemberPlaneModal()
                                        setdata(item.pincode)
                                        _toggleFilterModal()
                                        _toggleFilterModal1()
                                        setTextInputValue(item.pincode)
                                    }}
                                    style={{ elevation: 3, }}>
                                    <View style={{ flex: 1, marginVertical: 12, paddingHorizontal: 20 }}>
                                        <Text style={{ fontSize: 12, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK }}>{item.pincode}</Text>
                                    </View>
                                    <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View>
                                </TouchableOpacity>
                            )} />
                    </View>
                    : null

            }


        </View>
    )
}

export default FilterSearch

const styles = StyleSheet.create({
    searchContainer: {
        height: 35,
        width: "100%",
        backgroundColor: "#F7F7F7",
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        alignItems: "center"

    },
    TextInputStyle: {
        // width:"100%"
        fontFamily: Fonts.REGULAR,
        fontSize: 12,
        color: Colors.JUNGLE_BLACK
    },
    modalContainer: {
        // flex: 1,
        // height:200
        // backgroundColor: '#00000050',
        // justifyContent: 'flex-end'
    },
    confirmContainer: {
        // flex: 0.25,
        // flex:1,
        // height:200,
        marginTop: 10,
        elevation: 5,
        backgroundColor: Colors.WHITE,
        // paddingBottom: 20,
    },
    confirmHeader: {
        backgroundColor: Colors.PRIMARY,
        flexDirection: 'row',
        height: 66,
        justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal: 20
    },
})
