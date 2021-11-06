import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, Fonts, ScreenNames, Server } from '../../global'
import { keyworddata } from '../DummyData/DummyDataScreen';
import MoreVertical from "../../assets/svg/more-vertical1.svg";
import { deleteService } from '../../services/deleteService';
import CustomAlert from '../CustomAlert/CusomAlert';


const MyAsklist = ({ item, getMyCLientsList, getMyCLientsListHome, header }) => {
    //function

    const [clientToggle, setClientToggle] = React.useState(false)
    const toggleClient = () => setClientToggle(!clientToggle)

    const [alertTitle, setAlertTitle] = React.useState("");
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false);

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }

    const navigation = useNavigation()
    const gotoMemberDetail = () => {
        navigation.navigate(ScreenNames.NBHMEMBERDETAIL_SCREEN, { userId: item.userId })
    }

    const editClient = () => {
        navigation.navigate(ScreenNames.ADDCLIENTS_SCREEN, {
            clientId: item.clientId, Edit: 1,
            getMyCLientsList: getMyCLientsList, getMyCLientsListHome: getMyCLientsListHome, toggleClient: toggleClient
        })
    }


    const deleteClient = () => {
        const deletereq = `/clients/${item.clientId}`
        deleteService(deletereq).then((response) => {
            if (response.code == 200) {
                getMyCLientsList()
                getMyCLientsListHome()
            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })
    }



    return (
        <View>
            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 20 }}>
                <View style={[styles.imageBox]}>
                    <Image source={{ uri: `${Server.BASE_URL}/clients/${item.clientId}/${item.clientThumbnailImage}/thumbnailImage` }} style={{ height: "100%", width: "100%" }} />
                </View>
                <View style={{ flex: 1 }}>

                    <View>
                        {
                            header == "My Client" ?
                                <TouchableOpacity
                                    onPress={toggleClient}
                                    activeOpacity={0.7} style={{ marginBottom: 3, flexDirection: "row-reverse" }}>
                                    <MoreVertical />
                                </TouchableOpacity>
                                :
                                null
                        }

                        {
                            clientToggle == true ?
                                <View style={[styles.ViewBox, { alignItems: "flex-end", marginRight: 5 }]}>
                                    <TouchableOpacity
                                        onPress={editClient}
                                        // hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                        activeOpacity={0.7} style={[styles.clientStyle, { top: 5, right: 30, zIndex: 1 }]}>
                                        <Text style={[styles.font2, { marginTop: 2, fontSize: 12 }]}>Edit</Text>
                                        {/* <Report /> */}
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={deleteClient}
                                        // hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                        activeOpacity={0.7} style={[styles.clientStyle, { top: 30, right: 20, zIndex: 1 }]}>
                                        <Text style={[styles.font2, { marginTop: 2, fontSize: 12 }]}>Delete</Text>
                                        {/* <Report /> */}
                                    </TouchableOpacity>
                                </View>
                                :
                                null


                        }
                    </View>

                    <TouchableOpacity
                        onPress={gotoMemberDetail}
                        style={{ flex: 1, flexDirection: "row", alignItems: "center", paddingBottom: 10 }}>


                        <Image source={{ uri: `${Server.BASE_URL}/users/${item.userId}/${item.userThumbnailImage}/thumbnailImage` }} style={{ height: 40, width: 40, borderRadius: 50 }} />
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.font1, { marginLeft: 10 }]}>{item.userName}</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ flex: 1 }}>

                        <Text style={styles.font2}>{item.companyName}</Text>

                        <Text style={[styles.font5, { marginTop: 5 }]}>{item.companyContactPerson}</Text>

                        <Text style={[styles.font3, { marginVertical: 5 }]}>{item.companyContactPersonDesignation}</Text>

                        <Text style={styles.font4}>{item.companyState}, {item.companyCity}, {item.companyArea}</Text>
                    </View>



                </View>
            </View>

            <CustomAlert
                title={alertTitle}
                desc={alertText}
                leftButtonText={"Ok"}
                leftButtonFunction={leftButtonFunction}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility}
                customAlertVisible={customAlertVisible}
            />
        </View>
    )
}

export default MyAsklist

const styles = StyleSheet.create({
    imageBox: { height: 130, width: 108, marginRight: 20 },
    font1: { fontSize: 14, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYXOpacity },
    font2: { fontSize: 16, fontFamily: Fonts.SEMIBOLD, color: Colors.JUNGLE_BLACK },
    font3: { fontSize: 13, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYX_60 },
    font4: { fontSize: 12, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYX_60 },
    font5: { fontSize: 14, fontFamily: Fonts.SEMIBOLD, color: Colors.ONYX_60 },
    clientStyle: {
        // position: "absolute",

        // flexDirection: "row",
        // alignItems: "center"
        // justifyContent: "center"
        // top: 20,
        // right: 10,
        position: "absolute",

    },
    ViewBox: {
        position: "absolute",
        top: 20,
        right: 10,
        zIndex: 1,
        alignItems: "center",
        height: 48, width: 79, borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 2, backgroundColor: Colors.WHITE,
        marginVertical: 5,
        marginRight: 4
    }




})



// {/* <View style={{marginHorizontal:20}}>

// <View style={{flexDirection:"row",alignItems:"center"}}>
//         <View>
//         <View style={{height:130,width:108,backgroundColor:Colors.PRIMARY}}>
//         {/* <Image source={require("../../assets/images/3.png")} style={{flex:1}} /> */}
//         </View>
//         </View>


//     </View> */}

// </View>