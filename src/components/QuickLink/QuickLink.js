import { useNavigation } from '@react-navigation/core'
import axios from 'axios'
import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
// import { connect } from 'react-redux'
import { Colors, Fonts, ScreenNames, Server } from '../../global'
import { SCREEN_WIDTH } from '../../global/constants'
import { BASE_URL } from '../../global/server'
import { PutService } from '../../services/PutService'

const QuickLink = ({ data, onpress, userId }) => {



    const navigation = useNavigation()
    // function
    const goMemberDetail = async (userId) => {
        // const response = await axios.put(`${Server.BASE_URL}/users/addRecentlyViewed/${userId}/${data.userId}/${data.name}/${data.thumbnailImage}`)
        const uri = `/users/addRecentlyViewed/${userId}/${data.userId}/${data.userName}/${data.thumbnailImage}`
        const body = null
        PutService(uri, body)
        navigation.navigate(ScreenNames.NBHMEMBERDETAIL_SCREEN, { userId: data.userId })
    }

    return (
        <TouchableOpacity
            onPress={() => goMemberDetail(userId)}
            activeOpacity={0.7}

            style={{ flex: 1, alignItems: "center", marginHorizontal: 5 }}>
            <View style={{ height: 55, width: 55, borderRadius: 50 }}>
                <Image source={{ uri: `${BASE_URL}/users/${data.userId}/${data.thumbnailImage}/thumbnailImage` }} style={{ height: "100%", width: "100%", borderRadius: 100 }} />
            </View>
            <Text numberOfLines={2} style={{ width: SCREEN_WIDTH / 5, fontFamily: Fonts.SEMIBOLD, fontSize: 12, color: Colors.JUNGLE_BLACK, textAlign: "center", marginTop: 5 }}>
                {data.userName}
            </Text>
        </TouchableOpacity>
    )
}


// const mapStateToProps = state => ({
//     name: state.user.name,
//     email: state.user.email,
//     phNo: state.user.phNo,
//     userImage: state.user.thumbnailImage,
//     userId: state.user.userId
// });

// const mapDispatchToProps = (dispatch) => ({ dispatch, });

// export default connect(mapStateToProps, mapDispatchToProps)(QuickLink);
export default QuickLink;

const styles = StyleSheet.create({})
