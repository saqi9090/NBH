import React from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { styles } from "./ScheduleMeetUpStyles";
import Headers from "../../components/Header/Header";
import { Colors, Fonts } from '../../global';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import DropDown from "../../assets/svg/dropdown.svg"
import { globalStyles } from '../../global/globalStyles';



const ScheduleMeetUpScreen = () => {
    //function
    const datesWhitelist = [
        // // single date (today)
        moment(),
        // date range
        {
            start: (moment()),
            end: (moment().add(30, 'days'))
        }
    ];
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} isTransparent={true} />
            <View style={styles.elevation}>
                <Headers name="Schedule Meet Up" backgroundColor={false} HomeIcon={true} />
                <View style={styles.scheduleMeetConatiner}>
                    <Image source={require("../../assets/images/3.png")} style={{ height: 55, width: 55, borderRadius: 50 }} />
                    <View >

                        <Text style={[styles.font1, { marginLeft: 10 }]}>Mansi Kansara</Text>
                        <Text style={[styles.font2, { marginLeft: 10 }]}>Bhavesh Vora</Text>

                    </View>
                </View>


            </View>
            <ScrollView>
                <View>
                    {/* <CalendarStrip
                        calendarHeaderPosition={'above'}
                        disabledDateNameStyle={false}
                        // customDatesStyles={customDatesStyles}
                        // datesBlacklist={datesBlacklistFunc}
                        calendarAnimation={{ type: 'parallel', duration: 0 }}
                        // highlightColor={{ background: Colors.PRIMARY }}
                        daySelectionAnimation={{ type: 'background', duration: 0, borderWidth: 1, borderHighlightColor: 'red', highlightColor: Colors.PRIMARY, }}
                        scrollable={true}
                        iconLeft={false}
                        iconRight={false}
                        // getSelectedDate={(date) => {
                        //   console.warn(date)
                        // }}
                        // maxDayComponentSize={}
                        showMonth={true}
                        shouldAllowFontScaling={false}
                        showDayName={true}
                        // startingDate={moment().add(1, 'months').endOf('month')
                        // }
                        responsiveSizingOffset={29}
                        // innerStyle={{ padding: 5, margin: 5, height: 300, backgroundColor: 'red', borderRadius: 5, borderColor: 'yellow', borderWidth: 2 }}
                        calendarHeaderFormat={'MMMM'}
                        style={{ height: 150, }}
                        calendarColor={'#fff'}
                        calendarHeaderStyle={{ color: '#444', alignSelf: 'flex-start', fontSize: 18, marginLeft: 15, marginTop: 15 }}
                        dateNumberStyle={{ color: '#313955', fontSize: 14, marginTop: 8, }}
                        dateNameStyle={{ color: '#313955', fontSize: 14, fontWeight: 'bold' }}
                        selectedDate={moment().format('YYYY MM DD')}
                        // markedDatesStyle={markedDatesFunc}
                        disabledDateNameStyle={{ color: 'grey', marginBottom: 8, fontSize: 12, }}
                        disabledDateNumberStyle={{ color: 'grey', fontSize: 12, }}
                        datesWhitelist={datesWhitelist}
                        highlightDateNameStyle={{ color: Colors.PRIMARY, marginBottom: 8, fontSize: 14, }}
                        highlightDateNumberStyle={{ color: Colors.PRIMARY, fontSize: 14, }}
                        minDate={moment()}
                        updateWeek={false}
                        useIsoWeekday={false}
                    /> */}
                    <CalendarStrip
                        calendarAnimation={{ type: 'sequence', duration: 30 }}
                        // daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, height: 70 }}

                        // style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
                        style={{ height: 150, backgroundColor: Colors.PRIMARY, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
                        calendarHeaderStyle={{ color: 'white' }}
                        // calendarHeaderContainerStyle={{}}
                        // highlightDateContainerStyle={{}}

                        calendarColor={'#ffd648'}
                        calendarHeaderStyle={{ color: Colors.JUNGLE_BLACK, fontFamily: Fonts.BOLD, fontSize: 18, marginLeft: 15, marginTop: 15, alignSelf: "flex-start" }}
                        dateNumberStyle={{ color: Colors.JUNGLE_BLACK, fontSize: 14, paddingTop: 0, fontFamily: Fonts.BOLD }}
                        dateNameStyle={{ color: Colors.JUNGLE_BLACK, fontSize: 14, fontFamily: Fonts.BOLD }}
                        highlightDateNumberStyle={{ color: Colors.ONYX_80, fontSize: 14, paddingTop: 0, fontFamily: Fonts.BOLD }}
                        highlightDateNameStyle={{ color: Colors.ONYX_80, fontSize: 14, paddingTop: 0, fontFamily: Fonts.BOLD }}
                        disabledDateNameStyle={{ color: Colors.WHITE, fontSize: 14, paddingTop: 0, fontFamily: Fonts.BOLD }}
                        disabledDateNumberStyle={{ color: 'grey' }}
                        dateContainerStyle={{ color: Colors.WHITE }}
                        calendarAnimation={{ type: 'parallel', duration: 0 }}
                        // dateContainerStyle={{ backgroundColor: `#${(`#00000${(Math.random() * (1 << 24) | 0).toString(16)}`).slice(-6)}` }}
                        // datesWhitelist={datesWhitelist}
                        // datesBlacklist={datesBlacklist}
                        // iconLeft={require('./img/left-arrow.png')}
                        // iconRight={require('./img/right-arrow.png')}
                        // daySelectionAnimation={{ type: "border", duration: 300, borderWidth: 1, }}
                        // innerStyle={{ height: 10, backgroundColor: "white", }}
                        // dayComponentHeight={{ height: 70 }}
                        innerStyle={{ flex: 1, backgroundColor: "#ffd648" }}
                        calendarHeaderFormat={'MMMM'}
                        iconContainer={{ flex: 0.1, }}
                        iconLeft={false}
                        iconRight={false}
                        scrollable={true}
                        showMonth={true}
                        shouldAllowFontScaling={false}
                        showDayName={true}
                        dayComponentHeight={60}
                        updateWeek={false}
                        showMonth={true}
                        useIsoWeekday={true}
                        maxDayComponentSize={80}
                        scrollerPaging={true}
                    // datesWhitelist={datesWhitelist}
                    />
                </View>
                <View style={{ flexDirection: "row", flex: 1, marginHorizontal: 20, alignItems: "center", justifyContent: "space-between", marginTop: 30 }}>
                    <View style={{ flex: 0.30, marginRight: 5 }}>
                        <TextInput
                        placeholderTextColor={Colors.BLACK}
                            style={styles.memberDeatilInput}
                            placeholder="Set Time"></TextInput>
                        <View style={styles.sectionLine}></View>
                    </View>
                    <View style={{ flex: 0.17, marginRight: 5 }}>
                        <TextInput
                        placeholderTextColor={Colors.BLACK}
                            style={[styles.memberDeatilInput, { alignSelf: "center" }]}
                            placeholder="12" keyboardType="number-pad"></TextInput>
                        <View style={styles.sectionLine}></View>
                    </View>
                    <View style={{ flex: 0.0, marginHorizontal: 4 }}>
                        <Text style={styles.font3}>:</Text>
                    </View>
                    <View style={{ flex: 0.17 }}>
                        <TextInput
                        placeholderTextColor={Colors.BLACK}
                            style={[styles.memberDeatilInput, { alignSelf: "center" }]}
                            placeholder="17" keyboardType="number-pad"></TextInput>
                        <View style={styles.sectionLine}></View>
                    </View>
                    <TouchableOpacity style={{ flex: 0.30, marginLeft: 10 }}>
                        <View
                            style={[styles.memberDeatilInput, { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 12 }]}
                        >
                            <Text style={[styles.font3, { marginRight: 10 }]}>
                                PM</Text>
                            <DropDown />
                        </View>
                        <View style={styles.sectionLine}></View>
                    </TouchableOpacity>
                </View>

                <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
                    <TextInput
                    placeholderTextColor={Colors.BLACK}
                        style={styles.memberDeatilInput}
                        placeholder="Meeting Agenda*"></TextInput>
                    <View style={styles.sectionLine}></View>
                </View>
                <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
                    <TextInput
                    placeholderTextColor={Colors.BLACK}
                        style={styles.memberDeatilInput}
                        placeholder="Meeting Place"></TextInput>
                    <View style={styles.sectionLine}></View>
                </View>
            </ScrollView>
            <TouchableOpacity style={globalStyles.button}>
                <Text style={globalStyles.buttonText}>Send Invitation</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ScheduleMeetUpScreen
