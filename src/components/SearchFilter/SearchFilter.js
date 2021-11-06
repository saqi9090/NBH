import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Colors, Fonts, Server } from '../../global';
import SearchSvg from "../../assets/svg/searchfind1.svg";
import { SCREEN_WIDTH } from '../../global/constants';
import axios from 'axios';

const SearchFilter = ({ setSearchResults, data, searchBy, placeholder = "Search", withApi = false, api = "" }) => {

    const getSearchResults = async (text) => {
        const results = data.filter(e => e.toUpperCase().includes(text.toUpperCase()))
        setSearchResults(results)
    }

    const serachRef = React.useRef()


    return (
        <TouchableOpacity
            activeOpacity={1} onPress={() => serachRef.current.focus()}
        >
            <View style={{
                height: 45, shadowColor: "#000",
                backgroundColor: Colors.WHITE,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 2,
                marginHorizontal: 10,
                borderRadius: 50,
                marginVertical: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <View style={{ paddingLeft: 10, }}>

                    <TextInput
                        ref={serachRef}
                        placeholderTextColor={Colors.BLACK}
                        onChangeText={(text) => getSearchResults(text)}
                        style={{ width: SCREEN_WIDTH - 70, fontFamily: Fonts.REGULAR, fontSize: 16 }}
                        placeholder={placeholder} />
                </View>
                <SearchSvg />
            </View>
        </TouchableOpacity>
    )
}

export default SearchFilter