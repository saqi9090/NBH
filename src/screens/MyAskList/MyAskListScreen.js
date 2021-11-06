import React from 'react'
import { View, Text, Image, FlatList, RefreshControl } from 'react-native'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { styles } from "./MyAskListStyles";
import Header from "../../components/Header/Header";
import { Colors, Server } from '../../global';
import SearchComponent from "../../components/SearchComponent/SearchComponent"
import { SCREEN_WIDTH } from '../../global/constants';
import { registerdata, myAskListData } from '../../components/DummyData/DummyDataScreen';
import MyAsklist from '../../components/MyAsklist/MyAsklist';
import CatalogueFilterModal from '../../components/CatalogueFilterModal/CatalogueFilterModal';
import MyAskListFilterModal from '../../components/MyAskListFilterModal/MyAskListFilterModal';
import axios from 'axios';
import { connect } from 'react-redux';
import { postRequest } from '../../services/postService';
import CustomAlert from '../../components/CustomAlert/CusomAlert';


const MyAskListScreen = ({ navigation, userId }) => {
    //state

    const [filterMyAskList, setFilterMyAskList] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [filterData, setFilterData] = React.useState({
        "companyName": "",
        "companyState": "",
        "companyCity": "",
        "companyArea": "",
        "companyContactPerson": "",
        "companyContactPersonDesignation": ""

    });

    const [myClientsList, setMyClientsList] = React.useState(null)
    const [searchResults, setSearchResults] = React.useState(null)
    const [alertTitle, setAlertTitle] = React.useState("");
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false)

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }

    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }
    const getMyCLientsList = async () => {
        const uri = `/clients/filter`
        const body = filterData
        postRequest(uri, body).then((response) => {
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
    }, [filterData])
    //function 
    const _toggleFilterMyAskList = () => {
        setFilterMyAskList(!filterMyAskList)
    }
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <View style={{ flex: 1 }}>
                <View style={{
                    backgroundColor: Colors.WHITE, borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
                    shadowColor: "#Bababa",
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.32,
                    shadowRadius: 5.46,

                    elevation: 9
                }}>

                    <Header name={"My Ask List"} backgroundColor={true} FilterIcon={true}
                        filterOnpress={() => _toggleFilterMyAskList()}
                    />

                    <View style={{ marginTop: 20, marginBottom: 20 }}>
                        <SearchComponent setSearchResults={setSearchResults}
                            data={myClientsList && myClientsList}
                            searchBy={"companyName"} placeholder={"Search by Company Name"}
                            withApi={true} api={`clients/searchNameAndContactPerson/`} />
                    </View>
                </View>


                <FlatList data={searchResults && searchResults.length > 0 ? searchResults : myClientsList}
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                    />}
                    showsVerticalScrollIndicator={false}
                    style={{ marginHorizontal: 20, width: SCREEN_WIDTH - 40, marginVertical: 20 }}
                    renderItem={({ item, index }) => (
                        <MyAsklist item={item} />
                    )}
                />


            </View>
            {/* <CatalogueFilterModal _toggleFilterMyAskList={_toggleFilterMyAskList} filterMyAskList={filterMyAskList}/> */}
            <MyAskListFilterModal _toggleFilterMemberModal={_toggleFilterMyAskList} filterMyAskList={filterMyAskList} setFilterData={setFilterData} />
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

export default connect(mapStateToProps, mapDispatchToProps)(MyAskListScreen)



