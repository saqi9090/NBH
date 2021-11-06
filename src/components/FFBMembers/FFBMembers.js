import axios from 'axios';
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux';
import { Colors, Fonts, Server } from '../../global'
import { SCREEN_WIDTH } from '../../global/constants';
import { BASE_URL } from '../../global/server';
import { deleteService } from '../../services/deleteService';

const FFBMembers = ({ FollowingMember, name1, name2, gotoMemberDetail, _toggleModal, data,
    memberState, toggleMemberState, userId, edit,
    getAllMemberData,
    setData
}) => {
    // const [memberState, setMemberState] = React.useState(false)



    // const Update = () => {
    //     updateFollowing()
    //     toggleMemberState()
    // }

    // const updateFollowing = async () => {
    //     if (edit == 0) {
    //         // if (memberState) {
    //         //     const response = await axios.delete(`${BASE_URL}/users/addFollowing/${userId}/${data.userId}`)
    //         //     console.warn("response1", response.data);
    //         //     setData([response.data])
    //         // } else {
    //         //     getAllMemberData()
    //         // }
    //     }
    //     else if (edit == 1) {
    //         if (memberState) {
    //             const response = await axios.delete(`${BASE_URL}/users/addFollowing/${userId}/${data.userId}`)
    //             console.warn("response1", response.data);
    //             setData([response.data])
    //         } else {
    //             getAllMemberData()
    //         }
    //     }
    //     else {

    //         if (memberState) {
    //             const response = await axios.delete(`${BASE_URL}/users/addBlock/${userId}/${data.userId}`)
    //             console.warn("response1", response.data);
    //             setData([response.data])
    //         } else {
    //             getAllMemberData()
    //         }

    //     }

    // }

    const toggleUnfollow = async () => {
        try {
            const deletereq = `/users/removeFollowing/${userId}/${data.userId}`
            deleteService(deletereq).then((res) => {
                // console.warn("res1", res.data);
                FollowingMember()
            })
            // await axios.delete(`${Server.BASE_URL}/users/removeFollowing/${userId}/${data.userId}`);
        } catch (error) {
            console.warn(error);
        }
    }
    const toggleUnblock = async () => {
        try {
            // await axios.delete(`${Server.BASE_URL}/users/removeBlock/${userId}/${data.userId}`)
            const deletereq = `/users/removeBlock/${userId}/${data.userId}`
            deleteService(deletereq).then((res) => {
                // console.warn("res2", res.data);
                FollowingMember()
            })
        } catch (error) {
            console.warn(error);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {
                data &&

                <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10, justifyContent: "space-between" }}>


                    <TouchableOpacity
                        onPress={() => {
                            gotoMemberDetail(
                                data
                            )
                            _toggleModal()
                        }}
                        style={{ flexDirection: "row", alignItems: "center" }}>
                        {
                            data &&
                            <Image source={{ uri: `${Server.BASE_URL}/users/${data.userId}/${data.thumbnailImage}/thumbnailImage` }}
                                style={{ height: 50, width: 50, borderRadius: 50 }} />
                        }

                        {/* <Image source={{ uri: data &&  }} style={{ height: 50, width: 50, borderRadius: 50 }} /> */}

                        <View style={{ marginLeft: 20 }}>
                            <View style={{ width: SCREEN_WIDTH / 2.7 }}>
                                <Text numberOfLines={1} style={styles.font1}>{data && data.userName}</Text>
                            </View>
                            <Text style={styles.font2}>Bussiness Owner</Text>
                        </View>
                    </TouchableOpacity>

                    {
                        edit === 0 ? null :

                            (edit === 1 ?
                                <View>
                                    <TouchableOpacity
                                        onPress={toggleUnfollow}
                                        style={{ height: 32, width: 82, borderRadius: 10, backgroundColor: memberState ? Colors.PRIMARY : "#FFD64860", alignItems: "center", justifyContent: "center", marginLeft: 2 }}>
                                        <Text style={styles.font3}>
                                            Unfollow
                                        </Text>
                                    </TouchableOpacity>
                                </View> : <View>
                                    <TouchableOpacity
                                        onPress={toggleUnblock}
                                        style={{ height: 32, width: 82, borderRadius: 10, backgroundColor: memberState ? Colors.PRIMARY : "#FFD64860", alignItems: "center", justifyContent: "center", marginLeft: 2 }}>
                                        <Text style={styles.font3}>
                                            Unblock
                                        </Text>
                                    </TouchableOpacity>
                                </View>)
                    }
                </View>
            }
        </View>
    )
}

const mapStateToProps = state => ({
    name: state.user.name,
    email: state.user.email,
    phNo: state.user.phNo,
    userImage: state.user.thumbnailImage,
    userId: state.user.userId
});

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(mapStateToProps, mapDispatchToProps)(FFBMembers);
// export default FollowingsMembers

const styles = StyleSheet.create({
    font1: { fontSize: 18, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK, },
    font2: { fontSize: 15, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYX_80, },
    font3: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK, },
})
