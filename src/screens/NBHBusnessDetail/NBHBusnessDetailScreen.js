import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import ProfileSvg from "../../assets/svg/profile.svg";
import Brochure from "../../assets/svg/brochure.svg";
import Download from "../../assets/svg/download.svg";

import { Colors, Fonts } from '../../global';
import {styles} from "./NBHBusnessDetailStyles"
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

const NBHBusnessDetailScreen = () => {
    return (
        <View style={{flex:1,backgroundColor:Colors.WHITE}}>
           <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
        <View style={{flexDirection:"row",elevation:3,backgroundColor:Colors.WHITE,borderRadius:10,alignItems:"center",padding:20,marginHorizontal:20,marginTop:10}}>
        <View style={{marginRight:20}}>
        <Image source={require("../../assets/images/3.png")} style={{height:90,width:90,borderRadius:50}}/>
        </View>
            <View>
                <View style={{flexDirection:"row" ,alignItems:"center",marginVertical:5}}>
                <ProfileSvg/>
                    <Text style={styles.BusnessProfile}>Profile</Text>
                    <TouchableOpacity>
                    <Download/>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection:"row",alignItems:"center",marginVertical:5}}>
                <Brochure/>
                    <Text style={styles.BusnessProfile}>Brochure</Text>
                </View>
            </View>
        </View>

        <View style={{ marginHorizontal: 20, marginVertical: 20 ,marginTop:30}}>
                            <Text style={{ fontSize: 16, fontFamily: Fonts.BOLD, color: Colors.ONYX_60 }}>Bussness Name</Text>
                            <TextInput
                                style={styles.memberDeatilInput}
                                placeholder="Rohan"></TextInput>
                            <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View>
                        </View>
                        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                            <Text style={{ fontSize: 16, fontFamily: Fonts.BOLD, color: Colors.ONYX_60 }}>Office Number</Text>
                            <TextInput 
                                style={styles.memberDeatilInput}
                                placeholder="57896459459"></TextInput>
                            <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View>
                        </View>
                        <View>
                        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                            <TextInput 
                                style={styles.memberDeatilInput}
                                placeholder="Email ID"></TextInput>
                            <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View>
                        </View>
                        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                            <TextInput 
                                style={styles.memberDeatilInput}
                                placeholder="GST NO."></TextInput>
                            <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View>
                        </View>
                        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                            <TextInput 
                                style={styles.memberDeatilInput}
                                placeholder="Website"></TextInput>
                            <View style={{ height: 1, width: "100%", backgroundColor: Colors.ONYX_60 }}></View>
                        </View>
                        </View>
        </View>
    )
}

export default NBHBusnessDetailScreen
