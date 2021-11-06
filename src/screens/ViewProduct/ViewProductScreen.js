import React from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Header from "../../components/Header/Header";
import { Colors, ScreenNames, Server } from '../../global';
import SearchComponent from "../../components/SearchComponent/SearchComponent"
import { SCREEN_WIDTH } from '../../global/constants';
import { ProductCatalogueData, registerdata } from '../../components/DummyData/DummyDataScreen';
import MyAsklist from '../../components/MyAsklist/MyAsklist';
import MyCatalogueCard from '../../components/MyCatalogueCard/MyCatalogueCard';
import AddButton from '../../components/AddButton/AddButton';
import { styles } from "./ViewProductStyles";
import CatalogueFilterModal from '../../components/CatalogueFilterModal/CatalogueFilterModal'
import axios from 'axios';
import { getService } from '../../services/getService';
import CustomAlert from '../../components/CustomAlert/CusomAlert';

const ViewProductScreen = ({ navigation }) => {

    //state
    const [filterMyAskList, setFilterMyAskList] = React.useState(false);
    const [productCatalogues, setProductCatalogues] = React.useState(null)
    const [searchResults, setSearchResults] = React.useState(null)

    //function 
    const [selectedPincode, setSelectedPincode] = React.useState(0);
    const [selectedMemberId, setSelectedMemberId] = React.useState(0);

    const [alertTitle, setAlertTitle] = React.useState("");
    const [alertText, setAlertText] = React.useState('');
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false);

    const toggleCustomAlertVisibility = () => { setCustomAlertVisible(!customAlertVisible) }
    const leftButtonFunction = () => {
        toggleCustomAlertVisibility()
    }
    const _toggleFilterMyAskList = () => {
        setFilterMyAskList(!filterMyAskList)
    }
    const getProductCatalogues = async () => {
        const req = `/productCatalogues/filter/userId/${selectedMemberId}/pincode/${selectedPincode}`
        getService(req).then((response) => {
            if (response.code == 200) {
                setProductCatalogues(response.data)
            } else {
                setAlertTitle("Alert")
                setAlertText(response.message)
                toggleCustomAlertVisibility()
            }
        })
    }

    React.useEffect(() => {
        getProductCatalogues()
    }, [selectedMemberId, selectedPincode])
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <View style={{ flex: 1 }}>
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

                    <Header name={"View Products"} backgroundColor={true} FilterIcon={true}
                        filterOnpress={_toggleFilterMyAskList}
                    />

                    <View style={{ marginTop: 20, marginBottom: 20 }}>
                        <SearchComponent setSearchResults={setSearchResults} data={productCatalogues && productCatalogues} searchBy={"productTitle"} placeholder={"Search by Product Name"} withApi={true} api={`productCatalogues/searchByTitleAndKeyword/`} />
                    </View>
                </View>

                <FlatList
                    data={searchResults && searchResults.length > 0 ? searchResults : productCatalogues}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    style={{ marginVertical: 20, marginHorizontal: 10 }}
                    renderItem={({ item, index }) => (
                        <MyCatalogueCard item={item} edit={false} />
                    )}
                />
            </View>
            {/* <View style={{ position: "absolute", right: 30, bottom: 50 }}>

            <AddButton onpressFun={() => navigation.navigate(ScreenNames.ADDCATALOGUE_SCREEN,{navigation:navigation})} />
        </View> */}

            <CustomAlert
                title={alertTitle}
                // Invalid Details
                desc={alertText}
                leftButtonText={"Ok"}
                leftButtonFunction={leftButtonFunction}
                toggleCustomAlertVisibility={toggleCustomAlertVisibility}
                customAlertVisible={customAlertVisible}
            />
            <CatalogueFilterModal
                _toggleFilterMyAskList={_toggleFilterMyAskList}
                filterMyAskList={filterMyAskList}
                setSelectedMemberId={setSelectedMemberId}
                selectedMemberId={selectedMemberId}
                selectedPincode={selectedPincode}
                setSelectedPincode={setSelectedPincode} />
        </View>
    )
}
export default ViewProductScreen
