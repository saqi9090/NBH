import React from 'react'
import { View, Text, FlatList, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { styles } from "./NBHMemberStyles";
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import NBHMemberHeader from './NBHMemberHeader';
import { Colors, Fonts, ScreenNames, Server } from '../../global';
import { NBHmemberdata, NBHmemberCardData } from "../../components/DummyData/DummyDataScreen"
import { SCREEN_WIDTH } from '../../global/constants';
import NBHMemberCard, { NBHmemberCard } from "../../components/NBHMemberCard/NBHMemberCard";
import FilterMemberModal from '../../components/FilterMemberModal/FilterMemberModal';
import SearchComponent from "../../components/SearchComponent/SearchComponent"
import axios from 'axios';
import { connect } from 'react-redux';
import { BASE_URL } from '../../global/server';
import QuickLink from '../../components/QuickLink/QuickLink';
import FilterSelectedModal from '../../components/FilterSelectedModal/FilterSelectedModal';
import { getService } from '../../services/getService';
import { postRequest } from '../../services/postService';
import CustomAlert from '../../components/CustomAlert/CusomAlert';

const NBHMemberScreen = ({ navigation, userId }) => {

    //state
    const [filterMember, setFilterMember] = React.useState(false)
    const [filterData, setFilterData] = React.useState({
        "name": "",
        "phone": "",
        "businessName": "",
        "category": "",
        "officeCity": ""
    })
    const [searchResults, setSearchResults] = React.useState(null)
    const [membersList, setMembersList] = React.useState(null)
    const [quickLink, setQuickLink] = React.useState(null)
    const [refreshing, setRefreshing] = React.useState(false);

    const [memberBussinessName, setMemberBussinessName] = React.useState(false);
    const [memberBussness, setMemberBussness] = React.useState(false);
    const [memberCity, setMemberCity] = React.useState(false);
    const [allBussinessDetail, setAllBussinessDetail] = React.useState(null);
    const [bussinessName, setBussinessName] = React.useState("")
    const [bussnessText, setBussnessText] = React.useState("");
    const [subCategory, setSubCategory] = React.useState("");

    const [memberName, setMemberName] = React.useState("");
    const [memberPhoneNumber, setMemberPhoneNumber] = React.useState("");
    const [alertTitle, setAlertTitle] = React.useState("");
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false);
    //function


    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }


    const _toggleFilterMemberModal = () => {
        setFilterMember(!filterMember)
    }

    const _toggleMemberBussness = () => {
        setMemberBussness(!memberBussness)
        _toggleFilterMemberModal()

    }

    const _toggleMemberCity = () => {
        setMemberCity(!memberCity)
        _toggleFilterMemberModal()

    }
    const _toggleMemberBussnessName = () => {
        setMemberBussinessName(!memberBussinessName)
        _toggleFilterMemberModal()
    }

    React.useEffect(() => {
        setMemberName(filterData.name)
        setMemberPhoneNumber(filterData.phone)
        setBussinessName(filterData.businessName)
        setBussnessText(filterData.category)
        setSubCategory(filterData.officeCity)
    }, [])

    const searchByTag = () => {
        setFilterData(
            {
                name: memberName,
                phone: memberPhoneNumber,
                businessName: bussinessName == "None" ? "" : bussinessName,
                category: bussnessText == "None" ? "" : bussnessText,
                subCategory: subCategory == "None" ? "" : subCategory
            }
        )
        _toggleFilterMemberModal()
    }


    const AllBussinessDetail = async () => {
        const req = `/users/getAllBusinessDetails`
        getService(req).then((response) => {
            if (response.code == 200) {
                setAllBussinessDetail(response.data)
            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })
    }


    const getMemberList = async () => {
        const uri = `/users/filterUser/${userId}`
        const body = filterData
        postRequest(uri, body).then((response) => {
            if (response.code == 200) {
                setMembersList(response.data)
            }
            else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })
    }

    const getQuickLink = async () => {
        const req = `/users/getRecentlyViewed/${userId}`
        getService(req).then((response) => {
            if (response.code == 200) {
                setQuickLink(response.data)
            }
            else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })
    }
    React.useEffect(() => {
        setSearchResults([])
        getMemberList()
    }, [filterData])

    React.useEffect(() => {
        getQuickLink()
    }, [])

    const onRefresh = () => {
        getMemberList()
    }
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <View style={{
                backgroundColor: Colors.WHITE, borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 3,
            }}>
                <View style={{ marginHorizontal: 10 }}>
                    <NBHMemberHeader _toggleFilterMemberModal={_toggleFilterMemberModal} />
                </View>
                <View style={{ marginTop: 20, marginBottom: 20 }}>
                    <SearchComponent setSearchResults={setSearchResults} data={membersList && membersList} searchBy={"name"}
                        withApi={true} api={"users/nameOrKeyword/"} />
                </View>
            </View>
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>

                <Text style={{ fontSize: 14, fontFamily: Fonts.SEMIBOLD, marginHorizontal: 20, marginTop: 20 }}>Recently Viewed</Text>
                <View style={{ marginBottom: 20 }}>

                    <FlatList data={quickLink} horizontal={true}
                        style={{ marginHorizontal: 10, marginTop: 20 }}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <QuickLink data={item} userId={userId} />
                        )}
                    />
                </View>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={searchResults && searchResults.length > 0 ? searchResults : membersList}
                    style={{ paddingHorizontal: 10 }}
                    keyExtractor={(item) => `userId${item.userId}`}

                    renderItem={({ item, index }) => (
                        <NBHMemberCard
                            data={item} index={index} userId={userId}
                        />
                    )} />
            </ScrollView>


            <FilterMemberModal
                searchByTag={searchByTag}
                memberPhoneNumber={memberPhoneNumber}
                memberName={memberName}
                setMemberPhoneNumber={setMemberPhoneNumber}
                setMemberName={setMemberName}
                bussinessName={bussinessName}
                bussnessText={bussnessText}
                subCategory={subCategory}
                setBussnessText={setBussnessText}
                setSubCategory={setSubCategory}
                setBussinessName={setBussinessName}
                filterMember={filterMember}
                _toggleMemberBussnessName={_toggleMemberBussnessName}
                _toggleMemberBussness={_toggleMemberBussness}
                _toggleMemberCity={_toggleMemberCity}
                AllBussinessDetail={AllBussinessDetail}
                _toggleFilterMemberModal={_toggleFilterMemberModal}
                setFilterData={setFilterData} filterData={filterData}
            />



            <FilterSelectedModal
                _toggleFilterMemberModal={_toggleFilterMemberModal}
                _toggleSelectedModal={_toggleMemberBussnessName}
                memberPlane={memberBussinessName}
                data={allBussinessDetail && allBussinessDetail.businessNames}
                setMemberPlaneTextValue={setBussinessName} memberHeader={"Business Name"}
            />
            <FilterSelectedModal
                _toggleFilterMemberModal={_toggleFilterMemberModal}
                _toggleSelectedModal={_toggleMemberBussness}
                memberPlane={memberBussness}
                data={allBussinessDetail && allBussinessDetail.categories}
                setMemberPlaneTextValue={setBussnessText} memberHeader={"Business Category"}
            />
            <FilterSelectedModal
                _toggleFilterMemberModal={_toggleFilterMemberModal}
                _toggleSelectedModal={_toggleMemberCity}
                memberPlane={memberCity}
                data={allBussinessDetail && allBussinessDetail.subCategories}
                setMemberPlaneTextValue={setSubCategory} memberHeader={"Bussiness Sub Category"}
            />

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

export default connect(mapStateToProps, mapDispatchToProps)(NBHMemberScreen);

// export default NBHMemberScreen
