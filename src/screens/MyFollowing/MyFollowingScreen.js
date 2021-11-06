import React from 'react'
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import FeedCard from '../../components/FeedCard/FeedCard';
import { styles } from "./MyFollowingStyles";
import { feedsPostdata } from "../../components/DummyData/DummyDataScreen"
import { Colors, Server } from '../../global';
import AddButton from '../../components/AddButton/AddButton';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Header from '../../components/Header/Header';
import axios from 'axios';
import { connect } from 'react-redux';
import { getService } from '../../services/getService';
import CustomAlert from '../../components/CustomAlert/CusomAlert';
// import ReportModal from '../../components/ReportModal/ReportModal';


const MyFollowingScreen = ({ navigation, route, params, headerName, userId }) => {

    // usestate 
    const [commonPosts, setCommonPosts] = React.useState(null)
    const [refreshing, setRefreshing] = React.useState(false);
    const [alertTitle, setAlertTitle] = React.useState("");
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false);

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }



    const getCommonPosts = async () => {
        if (route.params.headerName == "Followings") {
            const req = `/posts/getByUserIdFollwing/${userId}`
            getService(req).then((response) => {
                if (response.code == 200) {
                    setCommonPosts(response.data)
                } else {
                    setAlertTitle("Alert")
                    setAlertText(response.message)
                    toggleCustomAlertVisibility()
                }
            })

        } else if (route.params.headerName == "Common Post") {
            const req = `/posts/getByUserIdV2/${userId}`
            getService(req).then((response) => {
                if (response.code == 200) {
                    setCommonPosts(response.data)
                } else {
                    setAlertTitle("Alert")
                    setAlertText(response.message)
                    toggleCustomAlertVisibility()
                }
            })
        } else if (route.params.headerName == "Interested Posts") {
            const req = `/users/getInterestedPost/userId/${userId}`
            getService(req).then((response) => {
                if (response.code == 200) {
                    setCommonPosts(response.data)
                } else {
                    setAlertTitle("Alert")
                    setAlertText(response.message)
                    toggleCustomAlertVisibility()
                }
            })
        }
    }



    React.useEffect(() => {
        getCommonPosts()
    }, [])
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <View style={styles.headerstyle}>
                <Header name={route.params.headerName} backgroundColor={true} />
            </View>
            {
                commonPosts
                &&
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                    />}
                >
                    <FlatList
                        data={commonPosts}
                        style={{ marginHorizontal: 20, marginTop: 2 }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <FeedCard
                                headerName={route.params.headerName}
                                heartShow={route.params.heartShow}
                                data={feedsPostdata} item={item} index={index} />
                        )} />
                </ScrollView>

            }
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

export default connect(mapStateToProps, mapDispatchToProps)(MyFollowingScreen)

