import React from 'react'
import { View, Text, Image, FlatList, RefreshControl } from 'react-native'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { styles } from "./MyClientStyles";
import Header from "../../components/Header/Header";
import { Colors, ScreenNames, Server } from '../../global';
import SearchComponent from "../../components/SearchComponent/SearchComponent"
import { SCREEN_WIDTH } from '../../global/constants';
import { myAskListData, registerdata } from '../../components/DummyData/DummyDataScreen';
import MyAsklist from '../../components/MyAsklist/MyAsklist';
import AddButton from '../../components/AddButton/AddButton';
import axios from 'axios';
import { connect } from 'react-redux';
import { getService } from '../../services/getService';
import CustomAlert from '../../components/CustomAlert/CusomAlert';
// import { styles } from '../Home/HomeStyle';


const MyClientScreen = ({ navigation, userId, route, params }) => {


    const [myClientsList, setMyClientsList] = React.useState(null)
    const [refreshing, setRefreshing] = React.useState(false);

    const [searchResults, setSearchResults] = React.useState(null)

    const [alertTitle, setAlertTitle] = React.useState("");
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false);

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }
    const getMyCLientsList = async () => {
        // const response = await axios.get(`${Server.BASE_URL}/clients/userId/${userId}`)
        // setMyClientsList(response.data)

        const req = `/clients/userId/${userId}`
        getService(req).then((response) => {

            // console.warn("asfasf", response.data);
            if (response.code == 200) {
                setMyClientsList(response.data)

            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })
    }

    React.useEffect(() => {
        getMyCLientsList()
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
                <View style={styles.MyClientContainer}>
                    <Header name={"My Client"} backgroundColor={true} FilterIcon={false} />
                    <View style={{ marginTop: 20, marginBottom: 20 }}>
                        <SearchComponent setSearchResults={setSearchResults} data={myClientsList && myClientsList} searchBy={"companyName"} placeholder={"Search by Company Name"} withApi={true} api={`clients/userId/${userId}/searchNameAndContactPerson/`} />
                    </View>
                </View>
                {/* {console.warn(searchResults && searchResults.length)} */}
                <FlatList
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                    />}
                    //  data={myAskListData}
                    data={searchResults && searchResults.length > 0 ? searchResults : myClientsList}
                    showsVerticalScrollIndicator={false}
                    style={{ marginHorizontal: 20, width: SCREEN_WIDTH - 40, marginVertical: 20 }}
                    renderItem={({ item, index }) => (
                        <MyAsklist item={item}
                            getMyCLientsList={getMyCLientsList} getMyCLientsListHome={route.params.getMyCLientsListHome}
                            header={"My Client"}
                        />
                    )}
                />
            </View>

            <View style={{ position: "absolute", right: 30, bottom: 50 }}>
                <AddButton onpressFun={() => navigation.navigate(ScreenNames.ADDCLIENTS_SCREEN, {
                    getMyCLientsList: getMyCLientsList,
                    getMyCLientsListHome: route.params.getMyCLientsListHome, Edit: 0
                })} />
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

export default connect(mapStateToProps, mapDispatchToProps)(MyClientScreen);
