import axios from 'axios';
import React from 'react'
import { FlatList, RefreshControl, StyleSheet, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import AddButton from '../../components/AddButton/AddButton';
import CustomAlert from '../../components/CustomAlert/CusomAlert';
import { feedsSaveddata } from '../../components/DummyData/DummyDataScreen';
// import FeedCard from '../../components/FeedCard/FeedCard';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Header from '../../components/Header/Header';
import MyTimeLine from '../../components/MyTimeLine/MyTimeLine';
import { Colors, ScreenNames, Server } from '../../global';
import { getService } from '../../services/getService';
import { styles } from "./MyTimeLineStyle";

const MyTimeLineScreen = ({ navigation, userId }) => {
    //state 

    const [timeLine, setTimeLine] = React.useState(null)
    const [refreshing, setRefreshing] = React.useState(false);
    const [alertTitle, setAlertTitle] = React.useState("");
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false);

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }

    const getTimeLineById = async () => {
        const req = `/posts/getByUserId/${userId}`
        getService(req).then((response) => {
            if (response.code == 200) {
                setTimeLine(response.data)
            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })
    }



    React.useEffect(() => {
        getTimeLineById()
    }, [])
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <View style={styles.headerstyle}>
                <Header name={"My Timeline"} backgroundColor={true} />
            </View>
            {
                timeLine
                &&
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                    />}
                >
                    <FlatList
                        data={timeLine}
                        inverted
                        style={{ marginHorizontal: 20, marginVertical: 0 }}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => `postId${item.postId}`}
                        renderItem={({ item, index }) => {
                            return (
                                <MyTimeLine item={item} getTimeLineById={getTimeLineById} />
                            )
                        }
                        } />
                </ScrollView>
            }

            <View style={{ position: "absolute", right: 30, bottom: 50 }}>

                <AddButton onpressFun={() => navigation.navigate(ScreenNames.ADDPOST_SCREEN,
                    { HeaderName: "Add Post", getTimeLineById, Edit: 0 })} />
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


const mapStateToProps = state => ({
    name: state.user.name,
    email: state.user.email,
    phNo: state.user.phNo,
    userImage: state.user.thumbnailImage,
    userId: state.user.userId
});

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(mapStateToProps, mapDispatchToProps)(MyTimeLineScreen);

// export default MyTimeLineScreen

