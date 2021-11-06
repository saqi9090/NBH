import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { Colors, Fonts, Server } from '../../global';
import SearchSvg from "../../assets/svg/searchfind.svg";
import { SCREEN_WIDTH } from '../../global/constants';
import axios from 'axios';

const SearchComponent = ({ setSearchResults, data, searchBy, placeholder = "Search", withApi = false, api = "" }) => {

    const getSearchResults = async (text) => {
        if (withApi) {
            if (text == "") {
                setSearchResults([])
            } else {
                const response = await axios.get(`${Server.BASE_URL}/` + api + text)
                setSearchResults(response.data)
            }
        } else {
            const results = data.filter(e => e[searchBy].toUpperCase().includes(text.toUpperCase()))
            setSearchResults(results)
        }
    }
    return (
        <View>
            <View style={{
                height: 46, shadowColor: "#000",
                backgroundColor: Colors.WHITE,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 2,
                marginHorizontal: 30,
                borderRadius: 50,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <View style={{ paddingLeft: 10, }}>

                    <TextInput
                        placeholderTextColor={Colors.BLACK}
                        onChangeText={(text) => getSearchResults(text)}
                        style={{ width: SCREEN_WIDTH - 120, fontFamily: Fonts.REGULAR, fontSize: 16 }}
                        placeholder={placeholder} />
                </View>
                <SearchSvg />
            </View>
        </View>
    )
}

export default SearchComponent
